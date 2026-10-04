import { concepts, type Concept } from "@/lib/concepts";
import { articleConceptIds } from "@/lib/knowledge";
import { allArticles, editions, getSource, type Article } from "@/lib/news";
import type { ModelPacket } from "@/lib/search-brief";

export type BriefingConcept = {
  id: string;
  name: string;
  category: string;
  reason: string;
};

export type BriefingArticle = {
  date: string;
  id: string;
  title: string;
  sourceName: string;
  topic: string;
  note: string;
};

export type Briefing = {
  query: string;
  title: string;
  paragraphs: string[];
  concepts: BriefingConcept[];
  articles: BriefingArticle[];
  coverage: "direct" | "thin";
};

const SPLIT = /[\s,，。、“”「」『』！？!?；;：:、（）()[\]【】—\-·./]+/u;

function termsOf(query: string): string[] {
  const raw = query.trim();
  const parts = raw
    .split(SPLIT)
    .map((part) => part.trim())
    .filter((part) => part.length >= 2);
  return [...new Set([raw, ...parts])].filter((part) => part.length >= 2).slice(0, 8);
}

function hits(haystack: string, terms: string[]): number {
  const lower = haystack.toLowerCase();
  let count = 0;
  for (const term of terms) {
    const needle = term.toLowerCase();
    let from = 0;
    let local = 0;
    while (local < 4) {
      const index = lower.indexOf(needle, from);
      if (index < 0) break;
      local += 1;
      count += 1;
      from = index + needle.length;
    }
  }
  return count;
}

function aliasScore(concept: Concept, terms: string[]): { score: number; alias: string | null; kind: "exact" | "within" | "wider" } {
  let score = 0;
  let alias: string | null = null;
  let kind: "exact" | "within" | "wider" = "wider";
  const candidates = [concept.name, ...concept.aliases];
  for (const term of terms) {
    const folded = term.toLowerCase();
    for (const name of candidates) {
      if (name.length < 2) continue;
      const nameFolded = name.toLowerCase();
      if (nameFolded === folded) {
        score += 40;
        kind = "exact";
        alias = alias && alias.length >= name.length ? alias : name;
      } else if (folded.includes(nameFolded) && name.length >= 3 && name.length >= folded.length * 0.6) {
        score += 18;
        if (kind !== "exact") kind = "within";
        alias = alias ?? name;
      } else if (nameFolded.includes(folded) && folded.length >= 2) {
        score += 4;
        alias = alias ?? name;
      }
    }
  }
  return { score, alias, kind };
}

function sentences(text: string): string[] {
  return text
    .split(/(?<=[。！？])/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length >= 16);
}

function bestSentence(article: Article, terms: string[]): string {
  const pool = article.paragraphs.flatMap(sentences);
  let best = pool[0] ?? article.paragraphs[0] ?? "";
  let bestScore = -1;
  for (const sentence of pool) {
    const score = hits(sentence, terms) * 5 + (sentence.length < 90 ? 1 : 0);
    if (score > bestScore) {
      best = sentence;
      bestScore = score;
    }
  }
  return best.length > 150 ? `${best.slice(0, 148)}…` : best;
}

function dateLabel(date: string): string {
  const [, month, day] = date.split("-");
  return `${Number(month)}月${Number(day)}日`;
}

function link(id: string, name: string): string {
  return `[[${id}|${name}]]`;
}

type RankedConcept = { concept: Concept; score: number; alias: string | null; kind: "exact" | "within" | "wider" };
type RankedArticle = { article: Article; score: number; conceptIds: string[]; sentence: string };

export function searchSite(query: string): { briefing: Briefing; packet: ModelPacket | null } {
  const trimmed = query.trim().slice(0, 80);
  const terms = termsOf(trimmed);
  if (terms.length === 0) {
    return {
      briefing: {
        query: trimmed,
        title: "再写具体一点",
        paragraphs: ["请用至少两个字。可以是一个词条、一家机构，或一句你记得的说法。"],
        concepts: [],
        articles: [],
        coverage: "thin",
      },
      packet: null,
    };
  }

  const rankedConcepts: RankedConcept[] = concepts
    .map((concept) => {
      const matched = aliasScore(concept, terms);
      const score = matched.score + hits(concept.summary, terms) * 2 + Math.min(hits(concept.detail, terms), 4);
      return { concept, score, alias: matched.alias, kind: matched.kind };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.concept.name.length - a.concept.name.length);

  const conceptById = new Map(rankedConcepts.map((item) => [item.concept.id, item]));

  const rankedArticles: RankedArticle[] = allArticles
    .map((article) => {
      const conceptIds = articleConceptIds(article);
      const fromConcepts = conceptIds.reduce((sum, id) => sum + Math.min(conceptById.get(id)?.score ?? 0, 20), 0);
      const score = hits(article.title, terms) * 8 + hits(article.paragraphs.join("\n"), terms) * 2 + fromConcepts * 0.15;
      return { article, score, conceptIds, sentence: bestSentence(article, terms) };
    })
    .filter((item) => item.score >= 4)
    .sort((a, b) => b.score - a.score || b.article.date.localeCompare(a.article.date));

  const primary = rankedConcepts.filter((item) => item.kind === "exact" || item.kind === "within");
  const conceptLookup = new Map(concepts.map((concept) => [concept.id, concept]));
  const leadArticle = rankedArticles[0];
  const alongside: RankedConcept[] = (leadArticle?.conceptIds ?? [])
    .filter((id) => !primary.some((picked) => picked.concept.id === id))
    .slice(0, 2)
    .flatMap((id) => {
      const concept = conceptLookup.get(id);
      if (!concept) return [];
      return [{ concept, score: conceptById.get(id)?.score ?? 0, alias: null, kind: "wider" as const }];
    });
  const mentions = rankedConcepts.filter((item) => item.kind === "wider" && item.score >= 6).slice(0, 2);
  const pickedConcepts = [...primary, ...alongside, ...mentions]
    .filter((item, index, list) => list.findIndex((other) => other.concept.id === item.concept.id) === index)
    .slice(0, 5);
  const pickedArticles = rankedArticles.slice(0, 6);
  const direct = (pickedConcepts[0]?.score ?? 0) >= 8 || (pickedArticles[0]?.score ?? 0) >= 8;
  const span = `${dateLabel(editions[editions.length - 1].date)}到${dateLabel(editions[0].date)}`;

  const conceptsOut: BriefingConcept[] = pickedConcepts.map((item) => ({
    id: item.concept.id,
    name: item.concept.name,
    category: item.concept.category,
    reason: item.alias
      ? `检索词里的「${item.alias}」对上这个词条。`
      : "相关报道把这个词条和这个问题放在同一篇里。",
  }));

  const articlesOut: BriefingArticle[] = pickedArticles.map((item) => ({
    date: item.article.date,
    id: item.article.id,
    title: item.article.title,
    sourceName: getSource(item.article.source).name,
    topic: item.article.topic,
    note: item.sentence,
  }));

  const paragraphs: string[] = [];
  if (!direct) {
    paragraphs.push(
      `「${trimmed}」在${span}的${editions.length}期里没有成为某篇报道的主题，下面只列出词面最接近的材料，没有补写站内没有的事实。`,
    );
  } else if (conceptsOut.length > 0) {
    const leadNames = (primary.length > 0 ? primary : pickedConcepts).slice(0, 3);
    const names = leadNames.map((item) => link(item.concept.id, item.concept.name)).join("、");
    const topics = [...new Set(articlesOut.map((item) => item.topic))].slice(0, 3).join("、");
    paragraphs.push(
      topics
        ? `围绕「${trimmed}」，这几期主要把它放在${topics}里。知识库里直接对上的词条是${names}。`
        : `围绕「${trimmed}」，知识库里直接对上的词条是${names}。`,
    );
  } else {
    paragraphs.push(`「${trimmed}」出现在下面几篇报道的正文里。知识库没有同名词条，整理只引用报道原句。`);
  }

  for (const item of pickedConcepts.slice(0, 3)) {
    const cited = pickedArticles
      .filter((article) => article.conceptIds.includes(item.concept.id))
      .slice(0, 2)
      .map((article) => `${dateLabel(article.article.date)}《${article.article.title}》`);
    const cite = cited.length > 0 ? `提到它的报道有${cited.join("、")}。` : "这几期的入选报道里还没有把它写进深度学习词条。";
    paragraphs.push(`${item.concept.summary}词条见${link(item.concept.id, item.concept.name)}。${cite}`);
  }

  const quotes = pickedArticles.slice(0, 3).filter((item) => hits(item.sentence, terms) > 0 || direct);
  if (quotes.length > 0) {
    const lines = quotes
      .map((item) => `${dateLabel(item.article.date)}${getSource(item.article.source).name}写「${item.sentence}」`)
      .join("");
    paragraphs.push(`报道原句是：${lines}`);
  }

  if (paragraphs.length === 1 && conceptsOut.length === 0 && articlesOut.length === 0) {
    paragraphs.push("可以从知识库按机构、政策或技术往下翻，或换一个报道里出现过的说法。");
  }

  const title = direct
    ? conceptsOut[0]
      ? `${conceptsOut[0].name}：站内怎么写`
      : `「${trimmed}」在这几期里`
    : `站内没有展开「${trimmed.slice(0, 18)}」`;

  const briefing: Briefing = {
    query: trimmed,
    title: title.slice(0, 42),
    paragraphs: paragraphs.slice(0, 4),
    concepts: conceptsOut,
    articles: articlesOut,
    coverage: direct ? "direct" : "thin",
  };

  const packet: ModelPacket | null = direct
    ? {
        query: trimmed,
        concepts: conceptsOut.slice(0, 5).map((item) => ({
          id: item.id,
          name: item.name,
          summary: pickedConcepts.find((ranked) => ranked.concept.id === item.id)?.concept.summary ?? item.reason,
        })),
        articles: pickedArticles.slice(0, 4).map((item) => ({
          date: item.article.date,
          id: item.article.id,
          title: item.article.title,
          excerpt: item.sentence,
        })),
      }
    : null;

  return { briefing, packet };
}

import { concepts, type Concept } from "@/lib/concepts";
import { allArticles, editions, type Article } from "@/lib/news";
import type { Study } from "@/lib/study";

export type Segment = string | { conceptId: string; text: string };

const conceptMap = new Map(concepts.map((c) => [c.id, c]));
const LINK_RE = /\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g;

export function articleKey(article: Pick<Article, "date" | "id">): string {
  return `${article.date}/${article.id}`;
}

export function getConcept(id: string): Concept | undefined {
  return conceptMap.get(id);
}

export function getStudy(article: Pick<Article, "date" | "id">): Study | undefined {
  return editions.find((edition) => edition.date === article.date)?.studies[article.id];
}

export function parseLinks(text: string): Segment[] {
  const out: Segment[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push(text.slice(last, idx));
    const concept = conceptMap.get(m[1]);
    const label = m[2] ?? concept?.name ?? m[1];
    out.push(concept ? { conceptId: concept.id, text: label } : label);
    last = idx + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function extractRefs(text: string): string[] {
  return [...text.matchAll(LINK_RE)].map((m) => m[1]);
}

function uniq<T>(xs: T[]): T[] {
  return [...new Set(xs)];
}

/** All concepts an article links to: its study terms plus inline refs in the background. */
export function articleConceptIds(article: Pick<Article, "date" | "id">): string[] {
  const study = getStudy(article);
  if (!study) return [];
  return uniq([...study.terms, ...study.background.flatMap(extractRefs)]).filter((id) =>
    conceptMap.has(id),
  );
}

const articleConceptIndex = new Map(
  allArticles.map((article) => [articleKey(article), articleConceptIds(article)]),
);

export function conceptOutgoing(id: string): Concept[] {
  const c = conceptMap.get(id);
  if (!c) return [];
  return uniq(extractRefs(c.detail))
    .filter((ref) => ref !== id)
    .map((ref) => conceptMap.get(ref))
    .filter((x): x is Concept => !!x);
}

export function conceptBacklinks(id: string): { articles: Article[]; concepts: Concept[] } {
  return {
    articles: allArticles
      .filter((article) => articleConceptIndex.get(articleKey(article))?.includes(id))
      .sort((a, b) => b.date.localeCompare(a.date) || Number(a.id) - Number(b.id)),
    concepts: concepts.filter((c) => c.id !== id && extractRefs(c.detail).includes(id)),
  };
}

export function conceptMentionCount(id: string): number {
  return allArticles.filter((article) => articleConceptIndex.get(articleKey(article))?.includes(id))
    .length;
}

export function relatedByConcepts(
  article: Article,
  limit = 6,
): { article: Article; shared: Concept[] }[] {
  const mine = new Set(articleConceptIndex.get(articleKey(article)) ?? []);
  return allArticles
    .filter((item) => articleKey(item) !== articleKey(article))
    .map((item) => ({
      article: item,
      shared: (articleConceptIndex.get(articleKey(item)) ?? [])
        .filter((id) => mine.has(id))
        .map((id) => conceptMap.get(id)!),
    }))
    .filter((item) => item.shared.length > 0)
    .sort((a, b) => {
      const sameA = a.article.date === article.date ? 1 : 0;
      const sameB = b.article.date === article.date ? 1 : 0;
      if (sameA !== sameB) return sameB - sameA;
      if (b.shared.length !== a.shared.length) return b.shared.length - a.shared.length;
      return b.article.date.localeCompare(a.article.date) || Number(a.article.id) - Number(b.article.id);
    })
    .slice(0, limit);
}

/** Auto-link the first mention of each of the article's concepts in its body paragraphs. */
export function linkifyArticle(article: Article): Segment[][] {
  const pending = new Set(articleConceptIndex.get(articleKey(article)) ?? []);
  const aliasList = [...pending]
    .flatMap((id) => conceptMap.get(id)!.aliases.map((alias) => ({ id, alias })))
    .sort((a, b) => b.alias.length - a.alias.length);

  return article.paragraphs.map((paragraph) => {
    const segments: Segment[] = [];
    let rest = paragraph;
    while (rest.length > 0) {
      let best: { id: string; alias: string; index: number } | null = null;
      for (const { id, alias } of aliasList) {
        if (!pending.has(id)) continue;
        const index = rest.indexOf(alias);
        if (index !== -1 && (best === null || index < best.index)) {
          best = { id, alias, index };
        }
      }
      if (!best) {
        segments.push(rest);
        break;
      }
      if (best.index > 0) segments.push(rest.slice(0, best.index));
      segments.push({ conceptId: best.id, text: best.alias });
      pending.delete(best.id);
      rest = rest.slice(best.index + best.alias.length);
    }
    return segments;
  });
}

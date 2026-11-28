import { concepts } from "../src/lib/concepts";
import { allArticles, editions } from "../src/lib/news";
import { getStudy } from "../src/lib/knowledge";

const ids = new Set(concepts.map((c) => c.id));
const errors: string[] = [];
const refRe = /\[\[([a-z0-9-]+)(?:\|[^\]]+)?\]\]/g;
const refsIn = (text: string) => [...text.matchAll(refRe)].map((m) => m[1]);

if (ids.size !== concepts.length) errors.push("存在重复的概念 id");
if (new Set(editions.map((edition) => edition.date)).size !== editions.length) {
  errors.push("存在重复的日期");
}

for (const c of concepts) {
  for (const ref of refsIn(c.detail)) {
    if (!ids.has(ref)) errors.push(`概念 ${c.id} 的 detail 引用了不存在的 ${ref}`);
  }
}

for (const article of allArticles) {
  const study = getStudy(article);
  const label = `${article.date}/${article.id}`;
  if (!study) {
    // Brief items are headline and standfirst only. Full articles still need a study.
    if (!article.brief) errors.push(`文章 ${label} 缺少深度学习内容`);
    continue;
  }
  for (const term of study.terms) if (!ids.has(term)) errors.push(`文章 ${label} 的术语 ${term} 不存在`);
  for (const paragraph of study.background) {
    for (const ref of refsIn(paragraph)) {
      if (!ids.has(ref)) errors.push(`文章 ${label} 背景引用了不存在的 ${ref}`);
    }
  }
}

const used = new Set(
  allArticles.flatMap((article) => {
    const study = getStudy(article);
    if (!study) return [];
    return [...study.terms, ...study.background.flatMap(refsIn)];
  }),
);

// A term the editions keep stopping to define, still absent from the catalog.
// Patterns are the glosses writers actually use: quoted term plus an English
// parenthesis, 所谓…即, 即X（English）, or a short term right after a break and before ——即.
const DEFINITION_RES = [
  /[「“"]([\u4e00-\u9fff]{4,10})[」”"][（(][^）)]*[A-Za-z][^）)]*[）)]/g,
  /所谓([\u4e00-\u9fff]{4,10})(?:（[A-Za-z0-9][^）)]{0,24}）)?(?:——即|，即)/g,
  /即([\u4e00-\u9fff]{4,10})（[A-Za-z][^）)]{0,40}）/g,
  /(?:^|[^\u4e00-\u9fff])([\u4e00-\u9fff]{4,8})(?:（[A-Za-z0-9][^）)]{0,24}）)?——即/g,
];
const MIN_DEFINED_EDITIONS = 3;

function labelCovers(term: string): boolean {
  for (const concept of concepts) {
    for (const label of [concept.name, ...concept.aliases]) {
      if (label.length < 4) continue;
      if (label === term || label.includes(term) || term.includes(label)) return true;
    }
  }
  return false;
}

const definedIn = new Map<string, Set<string>>();
for (const edition of editions) {
  const studyBits = Object.values(edition.studies).flatMap((study) => [
    ...study.background,
    ...study.timeline.flatMap((item) => [item.time, item.event]),
    ...study.questions,
  ]);
  const corpus = [
    edition.highlight,
    ...edition.articles.flatMap((article) => [article.title, ...article.paragraphs]),
    ...studyBits,
  ].join("\n");
  const found = new Set<string>();
  for (const re of DEFINITION_RES) {
    re.lastIndex = 0;
    for (const match of corpus.matchAll(re)) found.add(match[1]);
  }
  for (const term of found) {
    if (labelCovers(term)) continue;
    const dates = definedIn.get(term) ?? new Set<string>();
    dates.add(edition.date);
    definedIn.set(term, dates);
  }
}
for (const [term, dates] of definedIn) {
  if (dates.size >= MIN_DEFINED_EDITIONS) {
    const list = [...dates].sort().join("、");
    errors.push(`术语「${term}」在 ${dates.size} 期里被下了定义（${list}），知识库却没有对应词条`);
  }
}

for (const concept of concepts) {
  if (concept.name.length < 4 || used.has(concept.id)) continue;
  const mentioned = allArticles.some((article) => {
    const study = getStudy(article);
    const blob = [
      article.title,
      ...article.paragraphs,
      ...(study?.background ?? []),
      ...(study?.questions ?? []),
      ...(study?.timeline.map((item) => item.event) ?? []),
    ].join("\n");
    return blob.includes(concept.name);
  });
  if (mentioned) {
    errors.push(`概念 ${concept.id}（${concept.name}）已在报道中出现，但没有深度学习条目链接到它`);
  }
}

const orphans = concepts.filter(
  (c) => !used.has(c.id) && !concepts.some((other) => refsIn(other.detail).includes(c.id)),
);

console.log(`概念 ${concepts.length} 个，期数 ${editions.length}，文章 ${allArticles.length} 篇`);
if (orphans.length) console.log(`无任何反向链接的概念：${orphans.map((c) => c.id).join(", ")}`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("所有双向链接均有效");

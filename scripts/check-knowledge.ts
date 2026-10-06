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

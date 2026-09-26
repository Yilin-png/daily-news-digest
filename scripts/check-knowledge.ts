import { concepts } from "../src/lib/concepts";
import { articles } from "../src/lib/news";
import { studies } from "../src/lib/study";

const ids = new Set(concepts.map((c) => c.id));
const errors: string[] = [];
const refRe = /\[\[([a-z0-9-]+)(?:\|[^\]]+)?\]\]/g;
const refsIn = (text: string) => [...text.matchAll(refRe)].map((m) => m[1]);

if (ids.size !== concepts.length) errors.push("存在重复的概念 id");

for (const c of concepts) {
  for (const ref of refsIn(c.detail)) {
    if (!ids.has(ref)) errors.push(`概念 ${c.id} 的 detail 引用了不存在的 ${ref}`);
  }
}

for (const a of articles) {
  const s = studies[a.id];
  if (!s) {
    errors.push(`文章 ${a.id} 缺少深度学习内容`);
    continue;
  }
  for (const t of s.terms) if (!ids.has(t)) errors.push(`文章 ${a.id} 的术语 ${t} 不存在`);
  for (const p of s.background)
    for (const ref of refsIn(p)) if (!ids.has(ref)) errors.push(`文章 ${a.id} 背景引用了不存在的 ${ref}`);
}

const used = new Set(
  Object.values(studies).flatMap((s) => [...s.terms, ...s.background.flatMap(refsIn)]),
);
const orphans = concepts.filter(
  (c) => !used.has(c.id) && !concepts.some((o) => refsIn(o.detail).includes(c.id)),
);

console.log(`概念 ${concepts.length} 个，文章 ${articles.length} 篇`);
if (orphans.length) console.log(`无任何反向链接的概念：${orphans.map((c) => c.id).join(", ")}`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("所有双向链接均有效");

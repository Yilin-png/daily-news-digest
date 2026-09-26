import type { Metadata } from "next";
import Link from "next/link";
import { ConceptDirectory } from "@/components/concept-directory";
import { conceptCategories, concepts } from "@/lib/concepts";
import { conceptMentionCount, extractRefs, getConcept } from "@/lib/knowledge";
import { articles } from "@/lib/news";

export const metadata: Metadata = {
  title: "知识库",
  description: "今日 24 条新闻涉及的历史事件、政策、机构与关键术语，全部以双向链接相连。",
};

export default function LearnPage() {
  const items = concepts.map((c) => ({
    id: c.id,
    name: c.name,
    category: c.category,
    summary: c.summary,
    aliases: c.aliases,
    mentions: conceptMentionCount(c.id),
  }));
  const linkCount = concepts.reduce((n, c) => n + extractRefs(c.detail).length, 0);
  const hubs = [...items].sort((a, b) => b.mentions - a.mentions).slice(0, 8);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <section className="border-b py-10 sm:py-14">
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">Knowledge Base</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">知识库</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          今日报道背后的历史事件、政策、机构与术语。每个词条都记录了它链接到哪里、又被哪些报道和词条引用，可以顺着链接一路读下去。
        </p>
        <dl className="mt-8 grid max-w-xl grid-cols-3 gap-4">
          {[
            { label: "词条", value: concepts.length },
            { label: "报道", value: articles.length },
            { label: "词条间链接", value: linkCount },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border bg-card p-4">
              <dt className="text-xs text-muted-foreground">{s.label}</dt>
              <dd className="mt-1 font-heading text-2xl font-black">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="py-10">
        <h2 className="text-xl font-black">今日枢纽词条</h2>
        <p className="mt-1 text-sm text-muted-foreground">被最多报道引用的概念，是串联今日新闻的关键节点</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {hubs.map((h) => (
            <Link
              key={h.id}
              href={`/concept/${h.id}`}
              className="inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-sm transition-colors hover:border-brand hover:text-brand"
            >
              {getConcept(h.id)!.name}
              <span className="rounded-full bg-brand/10 px-1.5 text-xs text-brand">{h.mentions}</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <ConceptDirectory items={items} categories={conceptCategories} />
      </section>
    </div>
  );
}

import Link from "next/link";
import { ArrowRightIcon, BookOpenTextIcon, LibraryIcon, NewspaperIcon } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { SourceLabel } from "@/components/source-label";
import { buttonVariants } from "@/components/ui/button";
import { concepts } from "@/lib/concepts";
import { conceptMentionCount } from "@/lib/knowledge";
import {
  allArticles,
  articleHref,
  editionHref,
  editionShortLabel,
  editions,
  latestEdition,
  sources,
  topics,
  type Edition,
} from "@/lib/news";
import { SITE_NAME } from "@/lib/site";

const steps = [
  {
    icon: NewspaperIcon,
    title: "先读今日看点",
    body: "一段话串起当天各家报道的共同线索，再按来源、主题挑着读。",
  },
  {
    icon: BookOpenTextIcon,
    title: "再读全文总结",
    body: "每篇都是对原报道的中文深度总结，末尾附原站链接，事实以原文为准。",
  },
  {
    icon: LibraryIcon,
    title: "最后进深度学习",
    body: "历史背景、时间线、关键术语和思考题。术语是双向链接，可以跨日期追下去。",
  },
];

function topicCounts(edition: Edition) {
  return topics
    .map((topic) => ({ topic, count: edition.articles.filter((a) => a.topic === topic).length }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count);
}

export function SiteHome() {
  const latest = latestEdition;
  const picks = latest.articles.filter((_, i) => i % 3 === 0).slice(0, 6);
  const archive = editions.slice(1);
  const hubs = [...concepts]
    .map((concept) => ({ concept, n: conceptMentionCount(concept.id) }))
    .sort((a, b) => b.n - a.n)
    .slice(0, 10);
  const stats = [
    { value: editions.length, label: "期简报" },
    { value: allArticles.length, label: "篇深度总结" },
    { value: sources.length, label: "家媒体" },
    { value: concepts.length, label: "个知识库词条" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <section className="py-12 text-center sm:py-20">
        <BrandMark className="mx-auto size-16 rounded-2xl shadow-sm sm:size-20" />
        <h1 className="mt-6 text-4xl font-black tracking-tight text-balance sm:text-6xl">{SITE_NAME}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground text-balance sm:text-lg">
          每天从八家中外媒体各选三篇，写成 24 条中文深度总结。每篇附原站链接，也配一份深度学习，讲清背景、来龙去脉和关键术语。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={editionHref(latest.date)} className={buttonVariants({ size: "lg" })}>
            阅读最新一期 · {editionShortLabel(latest)} <ArrowRightIcon />
          </Link>
          <Link href="/learn" className={buttonVariants({ variant: "outline", size: "lg" })}>
            进入知识库
          </Link>
        </div>
        <dl className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border bg-card px-4 py-4">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-heading text-3xl font-black">{stat.value}</dd>
              <dd className="mt-1 text-xs text-muted-foreground">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="latest-title" className="border-t pt-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-brand">LATEST</p>
            <h2 id="latest-title" className="mt-1 text-2xl font-black sm:text-3xl">
              最新一期 · {latest.label}
            </h2>
          </div>
          <Link
            href={editionHref(latest.date)}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            查看全部 {latest.articles.length} 条 <ArrowRightIcon className="size-4" />
          </Link>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Link
            href={`${editionHref(latest.date)}#highlight`}
            className="group relative block overflow-hidden rounded-2xl bg-dusk p-6 text-dusk-foreground sm:p-8"
          >
            <div className="absolute inset-y-0 left-0 w-1.5 bg-brand" aria-hidden />
            <p className="text-xs font-semibold tracking-[0.25em] text-dusk-foreground/65">今日看点</p>
            <p className="reading reading-lead mt-4 font-heading font-semibold">{latest.highlight}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {topicCounts(latest).map((item) => (
                <span
                  key={item.topic}
                  className="rounded-full border border-dusk-foreground/25 px-3 py-1 text-xs text-dusk-foreground/80"
                >
                  {item.topic} · {item.count}
                </span>
              ))}
            </div>
          </Link>
          <ol className="divide-y rounded-2xl border bg-card">
            {picks.map((article) => (
              <li key={article.id}>
                <Link href={articleHref(article)} className="group block px-5 py-4">
                  <SourceLabel id={article.source} className="text-xs text-muted-foreground" />
                  <span className="mt-1 line-clamp-2 block leading-snug font-semibold group-hover:text-brand">
                    {article.title}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {archive.length > 0 && (
        <section aria-labelledby="archive-title" className="pt-16">
          <p className="text-xs font-semibold tracking-[0.25em] text-brand">ARCHIVE</p>
          <h2 id="archive-title" className="mt-1 text-2xl font-black sm:text-3xl">往期简报</h2>
          <p className="mt-1 text-sm text-muted-foreground">每一期都完整保留，按日期倒序排列</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {archive.map((edition) => (
              <Link
                key={edition.date}
                href={editionHref(edition.date)}
                className="group flex flex-col rounded-2xl border bg-card p-5 transition-colors hover:border-foreground/30"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-heading text-xl font-black">{editionShortLabel(edition)}</span>
                  <span className="text-xs text-muted-foreground">{edition.articles.length} 条</span>
                </div>
                <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
                  {edition.highlight}
                </p>
                <p className="mt-4 line-clamp-2 text-sm font-semibold leading-snug group-hover:text-brand">
                  头条：{edition.articles[0].title}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs text-muted-foreground group-hover:text-foreground">
                  阅读这一期 <ArrowRightIcon className="size-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="how-title" className="pt-16">
        <h2 id="how-title" className="text-2xl font-black sm:text-3xl">怎么读</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border bg-card p-5">
              <Icon className="size-5 text-brand" />
              <p className="mt-3 font-heading font-bold">{title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="sources-title" className="pt-16">
        <h2 id="sources-title" className="text-2xl font-black sm:text-3xl">八家来源</h2>
        <p className="mt-1 text-sm text-muted-foreground">每期每家各三篇，点来源直接筛出最新一期的报道</p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {sources.map((source) => (
            <Link
              key={source.id}
              href={`${editionHref(latest.date)}?source=${source.id}#all`}
              className="rounded-xl border bg-card px-4 py-3 transition-colors hover:border-foreground/30"
            >
              <SourceLabel id={source.id} className="text-sm" />
              <span className="mt-1 block truncate text-xs text-muted-foreground">{source.en}</span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="learn-title" className="pt-16">
        <div className="grid gap-6 rounded-2xl border bg-card p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-brand">KNOWLEDGE</p>
            <h2 id="learn-title" className="mt-1 text-2xl font-black sm:text-3xl">知识库</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {concepts.length} 个词条串起全部 {editions.length} 期报道。下面是被引用最多的词条，数字是提及它的报道篇数。
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {hubs.map(({ concept, n }) => (
                <Link
                  key={concept.id}
                  href={`/concept/${concept.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm hover:border-brand hover:text-brand"
                >
                  {concept.name}
                  <span className="text-xs text-muted-foreground">{n}</span>
                </Link>
              ))}
            </div>
          </div>
          <Link href="/learn" className={buttonVariants({ size: "lg" })}>
            浏览全部词条
          </Link>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { NewsExplorer } from "@/components/news-explorer";
import { SourceLabel } from "@/components/source-label";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { concepts } from "@/lib/concepts";
import { conceptMentionCount } from "@/lib/knowledge";
import {
  articles,
  edition,
  getArticle,
  getSource,
  highlight,
  readingMinutes,
  sources,
  topics,
} from "@/lib/news";

export default async function Home({ searchParams }: PageProps<"/">) {
  const { source } = await searchParams;
  const lead = getArticle("1")!;
  const summit = articles.filter((a) => a.topic === "中美峰会" && a.id !== lead.id);
  const hubs = [...concepts]
    .map((c) => ({ c, n: conceptMentionCount(c.id) }))
    .sort((a, b) => b.n - a.n)
    .slice(0, 6);
  const topicStats = topics
    .map((t) => ({ topic: t, count: articles.filter((a) => a.topic === t).length }))
    .filter((t) => t.count > 0);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <section className="border-b py-10 text-center sm:py-14">
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
          Daily News Digest · {edition.date}
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">每日聚合新闻</h1>
        <p className="mt-4 text-sm text-muted-foreground sm:text-base">
          {edition.label} · 共 {articles.length} 条 · 八源各 3 篇 · 全文深度总结
        </p>
        <div className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-x-5 gap-y-2">
          {sources.map((s) => (
            <SourceLabel key={s.id} id={s.id} className="text-muted-foreground" />
          ))}
        </div>
      </section>

      <section id="highlight" className="scroll-mt-20 py-10">
        <div className="relative overflow-hidden rounded-2xl bg-foreground p-6 text-background sm:p-10">
          <div className="absolute inset-y-0 left-0 w-1.5 bg-brand" aria-hidden />
          <p className="text-xs font-semibold tracking-[0.25em] text-background/60">今日看点</p>
          <p className="mt-4 font-heading text-lg leading-relaxed font-semibold sm:text-2xl sm:leading-relaxed">
            {highlight}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {topicStats.map((t) => (
              <span
                key={t.topic}
                className="rounded-full border border-background/20 px-3 py-1 text-xs text-background/80"
              >
                {t.topic} · {t.count}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="lead" className="scroll-mt-20 grid gap-8 py-4 lg:grid-cols-[1.6fr_1fr]">
        <article className="flex flex-col">
          <div className="flex items-center gap-3">
            <Badge className="bg-brand text-white">头条</Badge>
            <SourceLabel id={lead.source} />
            <span className="text-xs text-muted-foreground">约 {readingMinutes(lead)} 分钟</span>
          </div>
          <Link href={`/article/${lead.id}`} className="group mt-4">
            <h2 className="text-3xl leading-tight font-black text-balance group-hover:text-brand sm:text-4xl">
              {lead.title}
            </h2>
          </Link>
          <div className="mt-5 space-y-4 text-[15px] leading-8 text-foreground/85">
            <p>{lead.paragraphs[0]}</p>
            <p className="hidden sm:block">{lead.paragraphs[1]}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/article/${lead.id}`} className={buttonVariants({ size: "lg" })}>
              阅读全文
            </Link>
            <a
              href={lead.url}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              财新原文 <ArrowUpRightIcon />
            </a>
          </div>
        </article>

        <aside className="rounded-2xl border bg-card p-5">
          <p className="font-heading text-base font-bold">峰会 · 多方视角</p>
          <p className="mt-1 text-xs text-muted-foreground">
            同一场白宫会晤，{summit.length + 1} 家媒体的不同解读
          </p>
          <Separator className="my-4" />
          <ol className="space-y-4">
            {summit.map((a, i) => (
              <li key={a.id}>
                <Link href={`/article/${a.id}`} className="group flex gap-3">
                  <span className="font-heading text-2xl leading-none font-black text-muted-foreground/40">
                    {i + 1}
                  </span>
                  <span className="space-y-1">
                    <SourceLabel id={a.source} className="text-muted-foreground" />
                    <span className="block leading-snug font-semibold group-hover:text-brand">
                      {a.title}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      <section className="pt-14">
        <div className="grid gap-6 rounded-2xl border bg-card p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-brand">DEEP LEARNING</p>
            <h2 className="mt-1 text-2xl font-black sm:text-3xl">每篇新闻都有深度学习</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              历史背景、来龙去脉时间线、关键术语和思考题。{concepts.length} 个知识库词条以双向链接串起今日 {articles.length} 条报道：从一篇新闻跳到一个概念，再从概念找到所有提及它的报道。
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {hubs.map(({ c, n }) => (
                <Link
                  key={c.id}
                  href={`/concept/${c.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm hover:border-brand hover:text-brand"
                >
                  {c.name}
                  <span className="text-xs text-muted-foreground">{n}</span>
                </Link>
              ))}
            </div>
          </div>
          <Link href="/learn" className={buttonVariants({ size: "lg" })}>
            进入知识库
          </Link>
        </div>
      </section>

      <section id="all" className="scroll-mt-20 pt-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black sm:text-3xl">全部新闻</h2>
            <p className="mt-1 text-sm text-muted-foreground">按来源、主题筛选，或直接搜索关键词</p>
          </div>
        </div>
        <NewsExplorer initialSource={typeof source === "string" ? source : undefined} />
      </section>

      <section id="links" className="scroll-mt-20 pt-16">
        <h2 className="text-2xl font-black sm:text-3xl">原站链接</h2>
        <p className="mt-1 text-sm text-muted-foreground">所有摘要均附原报道地址，部分站点可能需要订阅</p>
        <ol className="mt-6 divide-y rounded-2xl border bg-card">
          {articles.map((a, i) => (
            <li key={a.id} className="flex items-start gap-3 px-4 py-3 sm:items-center sm:px-5">
              <span className="w-6 shrink-0 pt-0.5 text-right font-mono text-xs text-muted-foreground sm:pt-0">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1 sm:flex sm:items-center sm:gap-3">
                <span className="text-xs font-semibold text-muted-foreground sm:w-28 sm:shrink-0">
                  {getSource(a.source).name}
                </span>
                <Link href={`/article/${a.id}`} className="line-clamp-2 text-sm hover:text-brand sm:line-clamp-1">
                  {a.title}
                </Link>
              </div>
              <a
                href={a.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                aria-label={`打开原文：${a.title}`}
              >
                原文 <ArrowUpRightIcon className="size-3.5" />
              </a>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

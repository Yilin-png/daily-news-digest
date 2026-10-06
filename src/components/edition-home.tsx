import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { DateSwitcher } from "@/components/date-switcher";
import { NewsExplorer } from "@/components/news-explorer";
import { SourceLabel } from "@/components/source-label";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { concepts } from "@/lib/concepts";
import { conceptMentionCount } from "@/lib/knowledge";
import {
  INFORMATION_BRIEF_DISCLAIMER,
  articleHref,
  editions,
  getSource,
  readingMinutes,
  sources,
  type Edition,
} from "@/lib/news";
import { SITE_NAME } from "@/lib/site";

export function EditionHome({ edition }: { edition: Edition }) {
  const lead = edition.articles[0];
  const briefCount = edition.articles.filter((article) => article.brief).length;
  const fullCount = edition.articles.length - briefCount;
  const summit = edition.articles.filter((article) => article.topic === "中美峰会" && article.id !== lead.id);
  const hubs = [...concepts]
    .map((concept) => ({ concept, n: conceptMentionCount(concept.id) }))
    .sort((a, b) => b.n - a.n)
    .slice(0, 6);
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <section className="border-b py-10 text-center sm:py-14">
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
          Daily News Digest · {edition.date}
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-balance sm:text-6xl">{SITE_NAME}</h1>
        <p className="mt-4 text-sm text-muted-foreground sm:text-base">
          {briefCount > 0
            ? `${edition.label} · 共 ${edition.articles.length} 条 · ${fullCount} 篇全文深度总结 · The Information ${briefCount} 条导语快讯`
            : `${edition.label} · 共 ${edition.articles.length} 条 · 八源各 3 篇 · 全文深度总结`}
        </p>
        <DateSwitcher current={edition.date} className="mt-5 flex justify-center" />
        <p className="mt-3 text-xs text-muted-foreground">已收录 {editions.length} 期</p>
        <div className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-x-5 gap-y-2">
          {sources.map((source) => (
            <SourceLabel key={source.id} id={source.id} className="text-muted-foreground" />
          ))}
        </div>
      </section>

      <section id="lead" className="scroll-mt-20 grid gap-8 py-10 lg:grid-cols-[1.6fr_1fr]">
        <article className="flex flex-col">
          <div className="flex items-center gap-3">
            <Badge className="bg-brand text-white">头条</Badge>
            <SourceLabel id={lead.source} />
            <span className="text-xs text-muted-foreground">约 {readingMinutes(lead)} 分钟</span>
          </div>
          <Link href={articleHref(lead)} className="group mt-4">
            <h2 className="reading-title leading-tight font-black text-balance group-hover:text-brand">
              {lead.title}
            </h2>
          </Link>
          <div className="reading reading-lead mt-5 space-y-4 text-foreground/85">
            <p>{lead.paragraphs[0]}</p>
            <p className="hidden sm:block">{lead.paragraphs[1]}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={articleHref(lead)} className={buttonVariants({ size: "lg" })}>
              阅读全文
            </Link>
            <a
              href={lead.url}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              {getSource(lead.source).name}原文 <ArrowUpRightIcon />
            </a>
          </div>
        </article>

        <aside className="rounded-2xl border bg-card p-5">
          <p className="font-heading text-base font-bold">峰会 · 多方视角</p>
          <p className="mt-1 text-xs text-muted-foreground">
            同一场白宫会晤，{summit.length + (lead.topic === "中美峰会" ? 1 : 0)} 家媒体的不同解读
          </p>
          <Separator className="my-4" />
          <ol className="space-y-4">
            {summit.map((article, index) => (
              <li key={article.id}>
                <Link href={articleHref(article)} className="group flex gap-3">
                  <span className="font-heading text-2xl leading-none font-black text-muted-foreground/40">
                    {index + 1}
                  </span>
                  <span className="space-y-1">
                    <SourceLabel id={article.source} className="text-muted-foreground" />
                    <span className="block leading-snug font-semibold group-hover:text-brand">
                      {article.title}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      <section id="all" className="scroll-mt-20 pt-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black sm:text-3xl">全部新闻</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {edition.label} · 按来源、主题筛选，或直接搜索关键词
            </p>
          </div>
        </div>
        {briefCount > 0 && (
          <p className="mb-4 rounded-xl border border-dashed bg-card px-4 py-3 text-sm leading-relaxed text-muted-foreground">
            The Information：{INFORMATION_BRIEF_DISCLAIMER}
          </p>
        )}
        <NewsExplorer articles={edition.articles} />
      </section>

      <section id="links" className="scroll-mt-20 pt-16">
        <h2 className="text-2xl font-black sm:text-3xl">原站链接</h2>
        <p className="mt-1 text-sm text-muted-foreground">所有摘要均附原报道地址，部分站点可能需要订阅</p>
        <ol className="mt-6 divide-y rounded-2xl border bg-card">
          {edition.articles.map((article, index) => (
            <li key={article.id} className="flex items-start gap-3 px-4 py-3 sm:items-center sm:px-5">
              <span className="w-6 shrink-0 pt-0.5 text-right font-mono text-xs text-muted-foreground sm:pt-0">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1 sm:flex sm:items-center sm:gap-3">
                <span className="text-xs font-semibold text-muted-foreground sm:w-28 sm:shrink-0">
                  {getSource(article.source).name}
                </span>
                <Link href={articleHref(article)} className="line-clamp-2 text-sm hover:text-brand sm:line-clamp-1">
                  {article.title}
                </Link>
              </div>
              <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                aria-label={`打开原文：${article.title}`}
              >
                原文 <ArrowUpRightIcon className="size-3.5" />
              </a>
            </li>
          ))}
        </ol>
      </section>

      <section className="pt-16">
        <div className="grid gap-6 rounded-2xl border bg-card p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-brand">DEEP LEARNING</p>
            <h2 className="mt-1 text-2xl font-black sm:text-3xl">
              {briefCount > 0 ? "全文报道附有深度学习" : "每篇新闻都有深度学习"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {briefCount > 0
                ? `历史背景、来龙去脉时间线、关键术语和思考题写在 ${fullCount} 篇全文之后。The Information 的 ${briefCount} 条只有公开标题与导语，没有深度学习。${concepts.length} 个知识库词条以双向链接串起全部 ${editions.length} 期报道：从一篇新闻跳到一个概念，再从概念找到各日期提及它的报道。`
                : `历史背景、来龙去脉时间线、关键术语和思考题。${concepts.length} 个知识库词条以双向链接串起全部 ${editions.length} 期报道：从一篇新闻跳到一个概念，再从概念找到各日期提及它的报道。`}
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
            进入知识库
          </Link>
        </div>
      </section>
    </div>
  );
}

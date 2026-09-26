import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { Segments } from "@/components/rich-text";
import { StudySection, studyAnchors } from "@/components/study-section";
import { SourceLabel } from "@/components/source-label";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getConcept, getStudy, linkifyArticle } from "@/lib/knowledge";
import { articles, edition, getArticle, getSource, readingMinutes } from "@/lib/news";

export function generateStaticParams() {
  return articles.map((a) => ({ id: a.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/article/[id]">): Promise<Metadata> {
  const { id } = await params;
  const article = getArticle(id);
  if (!article) return { title: "未找到文章" };
  return {
    title: article.title,
    description: article.paragraphs[0].slice(0, 120),
  };
}

export default async function ArticlePage({ params }: PageProps<"/article/[id]">) {
  const { id } = await params;
  const article = getArticle(id);
  if (!article) notFound();

  const source = getSource(article.source);
  const index = articles.findIndex((a) => a.id === article.id);
  const prev = articles[index - 1];
  const next = articles[index + 1];
  const sameSource = articles.filter((a) => a.source === article.source && a.id !== article.id);
  const study = getStudy(article.id);
  const linked = linkifyArticle(article);
  const related = articles
    .filter((a) => a.topic === article.topic && a.source !== article.source)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="py-6">
        <Link
          href="/#all"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" /> 返回全部新闻
        </Link>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article>
          <div className="flex flex-wrap items-center gap-3">
            <SourceLabel id={article.source} className="text-sm" />
            <Badge variant="secondary">{article.topic}</Badge>
            <span className="text-xs text-muted-foreground">
              {edition.date} · 约 {readingMinutes(article)} 分钟读完
            </span>
          </div>
          <h1 className="mt-4 text-3xl leading-tight font-black text-balance sm:text-[2.6rem] sm:leading-[1.2]">
            {article.title}
          </h1>
          <div className="mt-6 h-1 w-16 rounded-full" style={{ backgroundColor: source.color }} />

          <div className="mt-8 space-y-6 text-base leading-8 text-foreground/90 sm:text-[17px] sm:leading-9">
            {linked.map((segments, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "first-letter:float-left first-letter:mr-2 first-letter:font-heading first-letter:text-5xl first-letter:leading-none first-letter:font-black first-letter:text-brand"
                    : undefined
                }
              >
                <Segments segments={segments} />
              </p>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            虚线下划线为知识库词条，悬停可预览释义，点击查看词条与反向链接。
          </p>

          <div className="mt-10 rounded-2xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">
              以上为对 {source.en} 报道的中文深度总结，完整内容请阅读原文。
            </p>
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ className: "mt-4" })}
            >
              前往{source.name}原文 <ArrowUpRightIcon />
            </a>
            <p className="mt-3 font-mono text-xs break-all text-muted-foreground/80">
              {article.url}
            </p>
          </div>

          {study && <StudySection article={article} study={study} />}

          <nav className="mt-10 grid gap-3 sm:grid-cols-2" aria-label="上一篇与下一篇">
            {prev ? (
              <Link
                href={`/article/${prev.id}`}
                className="group rounded-xl border p-4 transition-colors hover:bg-card"
              >
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ArrowLeftIcon className="size-3.5" /> 上一篇 · {getSource(prev.source).name}
                </span>
                <span className="mt-1 line-clamp-2 block font-semibold group-hover:text-brand">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
            {next && (
              <Link
                href={`/article/${next.id}`}
                className="group rounded-xl border p-4 text-right transition-colors hover:bg-card"
              >
                <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                  下一篇 · {getSource(next.source).name} <ArrowRightIcon className="size-3.5" />
                </span>
                <span className="mt-1 line-clamp-2 block font-semibold group-hover:text-brand">
                  {next.title}
                </span>
              </Link>
            )}
          </nav>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
          {study && (
            <div className="rounded-2xl border bg-card p-5">
              <p className="font-heading font-bold">深度学习</p>
              <Separator className="my-3" />
              <ul className="space-y-1">
                {studyAnchors.map(({ id, label, icon: Icon }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <Icon className="size-4" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {study.terms.map((id) => (
                  <Link
                    key={id}
                    href={`/concept/${id}`}
                    className="rounded-md bg-brand/8 px-2 py-0.5 text-xs text-brand hover:bg-brand/15"
                  >
                    {getConcept(id)!.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div className="rounded-2xl border bg-card p-5">
            <p className="font-heading font-bold">{source.name}今日另两篇</p>
            <Separator className="my-3" />
            <ul className="space-y-3">
              {sameSource.map((a) => (
                <li key={a.id}>
                  <Link href={`/article/${a.id}`} className="block text-sm leading-snug font-medium hover:text-brand">
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={`/?source=${source.id}#all`}
              className="mt-4 inline-block text-xs text-muted-foreground hover:text-foreground"
            >
              只看{source.name} →
            </Link>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="pt-16">
          <h2 className="text-xl font-black sm:text-2xl">相关报道 · {article.topic}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

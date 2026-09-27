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
import { articleHref, editionHref, getArticle, getEdition, getSource, readingMinutes } from "@/lib/news";

export function ArticleView({ date, id }: { date: string; id: string }) {
  const article = getArticle(date, id);
  if (!article) notFound();

  const source = getSource(article.source);
  const siblings = getEdition(date)?.articles ?? [];
  const index = siblings.findIndex((item) => item.id === article.id);
  const prev = siblings[index - 1];
  const next = siblings[index + 1];
  const sameSource = siblings.filter((item) => item.source === article.source && item.id !== article.id);
  const study = getStudy(article);
  const linked = linkifyArticle(article);
  const related = siblings
    .filter((item) => item.topic === article.topic && item.source !== article.source)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="py-6">
        <Link
          href={`${editionHref(date)}#all`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" /> 返回{date}全部新闻
        </Link>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article>
          <div className="flex flex-wrap items-center gap-3">
            <SourceLabel id={article.source} className="text-sm" />
            <Badge variant="secondary">{article.topic}</Badge>
            <span className="text-xs text-muted-foreground">
              {date} · 约 {readingMinutes(article)} 分钟读完
            </span>
          </div>
          <h1 className="mt-4 text-3xl leading-tight font-black text-balance sm:text-[2.6rem] sm:leading-[1.2]">
            {article.title}
          </h1>
          <div className="mt-6 h-1 w-16 rounded-full" style={{ backgroundColor: source.color }} />

          <div className="reading mt-8 space-y-6 text-base leading-8 text-foreground/90 sm:text-[17px] sm:leading-9">
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
            <p className="mt-3 font-mono text-xs break-all text-muted-foreground/80">{article.url}</p>
          </div>

          {study && <StudySection article={article} study={study} />}

          <nav className="mt-10 grid gap-3 sm:grid-cols-2" aria-label="上一篇与下一篇">
            {prev ? (
              <Link
                href={articleHref(prev)}
                className="group rounded-xl border p-4 transition-colors hover:bg-card"
              >
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ArrowLeftIcon className="size-3.5" /> 上一篇 · {getSource(prev.source).name}
                </span>
                <span className="mt-1 line-clamp-2 block font-semibold group-hover:text-brand">{prev.title}</span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
            {next && (
              <Link
                href={articleHref(next)}
                className="group rounded-xl border p-4 text-right transition-colors hover:bg-card"
              >
                <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                  下一篇 · {getSource(next.source).name} <ArrowRightIcon className="size-3.5" />
                </span>
                <span className="mt-1 line-clamp-2 block font-semibold group-hover:text-brand">{next.title}</span>
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
                {studyAnchors.map(({ id: anchor, label, icon: Icon }) => (
                  <li key={anchor}>
                    <a
                      href={`#${anchor}`}
                      className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <Icon className="size-4" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {study.terms.map((termId) => (
                  <Link
                    key={termId}
                    href={`/concept/${termId}`}
                    className="rounded-md bg-brand/8 px-2 py-0.5 text-xs text-brand hover:bg-brand/15"
                  >
                    {getConcept(termId)!.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div className="rounded-2xl border bg-card p-5">
            <p className="font-heading font-bold">{source.name}本期另两篇</p>
            <Separator className="my-3" />
            <ul className="space-y-3">
              {sameSource.map((item) => (
                <li key={item.id}>
                  <Link href={articleHref(item)} className="block text-sm leading-snug font-medium hover:text-brand">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={`${editionHref(date)}?source=${source.id}#all`}
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
            {related.map((item) => (
              <ArticleCard key={item.id} article={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

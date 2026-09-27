import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon, CornerDownLeftIcon, CornerUpRightIcon } from "lucide-react";
import { RichText } from "@/components/rich-text";
import { SourceLabel } from "@/components/source-label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { concepts } from "@/lib/concepts";
import { conceptBacklinks, conceptOutgoing, getConcept, getStudy } from "@/lib/knowledge";
import { articleHref } from "@/lib/news";

export function generateStaticParams() {
  return concepts.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: PageProps<"/concept/[id]">): Promise<Metadata> {
  const { id } = await params;
  const c = getConcept(id);
  if (!c) return { title: "未找到词条" };
  return { title: `${c.name}｜知识库`, description: c.summary };
}

function ConceptChip({ id }: { id: string }) {
  const c = getConcept(id)!;
  return (
    <Link
      href={`/concept/${c.id}`}
      className="group flex flex-col rounded-xl border bg-card p-3.5 transition-colors hover:border-foreground/25"
    >
      <span className="flex items-center justify-between gap-2">
        <span className="font-semibold group-hover:text-brand">{c.name}</span>
        <span className="text-[11px] text-muted-foreground">{c.category}</span>
      </span>
      <span className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{c.summary}</span>
    </Link>
  );
}

export default async function ConceptPage({ params }: PageProps<"/concept/[id]">) {
  const { id } = await params;
  const concept = getConcept(id);
  if (!concept) notFound();

  const outgoing = conceptOutgoing(concept.id);
  const back = conceptBacklinks(concept.id);
  const outIds = new Set(outgoing.map((c) => c.id));
  const mutual = back.concepts.filter((c) => outIds.has(c.id));

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <div className="py-6">
        <Link
          href="/learn"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" /> 返回知识库
        </Link>
      </div>

      <header>
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-brand text-white">{concept.category}</Badge>
          <span className="text-xs text-muted-foreground">
            被 {back.articles.length} 篇报道、{back.concepts.length} 个词条引用
          </span>
        </div>
        <h1 className="reading-title mt-4 font-black text-balance">{concept.name}</h1>
        <p className="reading reading-display mt-5 font-heading font-semibold text-foreground/85">
          {concept.summary}
        </p>
      </header>

      <Separator className="my-8" />

      <section>
        <h2 className="text-lg font-black">详细解释</h2>
        <p className="reading reading-body mt-3 text-foreground/90">
          <RichText text={concept.detail} />
        </p>
        {concept.aliases.length > 0 && (
          <p className="mt-4 text-xs text-muted-foreground">
            文中常见写法：{concept.aliases.map((a) => `「${a.replace(/[「」]/g, "")}」`).join("")}
          </p>
        )}
      </section>

      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-lg font-black">
          <CornerDownLeftIcon className="size-5 text-brand" />
          反向链接 · 提及本词条的报道
        </h2>
        {back.articles.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {back.articles.map((a) => {
              const study = getStudy(a);
              const inTerms = study?.terms.includes(concept.id);
              return (
                <li key={`${a.date}-${a.id}`}>
                  <Link
                    href={articleHref(a, "#study")}
                    className="group flex items-start justify-between gap-4 rounded-xl border bg-card p-4 transition-colors hover:border-foreground/25"
                  >
                    <span>
                      <span className="flex flex-wrap items-center gap-2">
                        <SourceLabel id={a.source} className="text-muted-foreground" />
                        <span className="text-[11px] text-muted-foreground">{a.date}</span>
                        <span className="text-[11px] text-muted-foreground">
                          {inTerms ? "关键术语" : "背景中提及"}
                        </span>
                      </span>
                      <span className="mt-1 block leading-snug font-semibold group-hover:text-brand">
                        {a.title}
                      </span>
                    </span>
                    <ArrowRightIcon className="mt-1 size-4 shrink-0 text-muted-foreground" />
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-4 rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
            各期报道中暂未直接提及，本词条通过其他词条进入知识网络。
          </p>
        )}
      </section>

      <section className="mt-12 grid gap-10 sm:grid-cols-2">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-black">
            <CornerUpRightIcon className="size-5 text-brand" />
            本词条链接到
          </h2>
          {outgoing.length > 0 ? (
            <div className="mt-4 grid gap-2.5">
              {outgoing.map((c) => (
                <ConceptChip key={c.id} id={c.id} />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">暂无。</p>
          )}
        </div>
        <div>
          <h2 className="flex items-center gap-2 text-lg font-black">
            <CornerDownLeftIcon className="size-5 text-brand" />
            链接到本词条的词条
          </h2>
          {back.concepts.length > 0 ? (
            <div className="mt-4 grid gap-2.5">
              {back.concepts.map((c) => (
                <ConceptChip key={c.id} id={c.id} />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">暂无。</p>
          )}
        </div>
      </section>

      {mutual.length > 0 && (
        <p className="mt-6 text-sm text-muted-foreground">
          双向互链：
          {mutual.map((c, i) => (
            <span key={c.id}>
              {i > 0 && "、"}
              <Link href={`/concept/${c.id}`} className="text-brand hover:underline">
                {c.name}
              </Link>
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

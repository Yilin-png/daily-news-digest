import Link from "next/link";
import { BookOpenIcon, HistoryIcon, LightbulbIcon, NetworkIcon, TagsIcon } from "lucide-react";
import { RichText } from "@/components/rich-text";
import { SourceLabel } from "@/components/source-label";
import { Badge } from "@/components/ui/badge";
import {
  articleConceptIds,
  conceptMentionCount,
  getConcept,
  relatedByConcepts,
} from "@/lib/knowledge";
import type { Article } from "@/lib/news";
import type { Study } from "@/lib/study";

export const studyAnchors = [
  { id: "study-background", label: "历史背景", icon: HistoryIcon },
  { id: "study-timeline", label: "来龙去脉", icon: BookOpenIcon },
  { id: "study-terms", label: "关键术语", icon: TagsIcon },
  { id: "study-network", label: "知识网络", icon: NetworkIcon },
  { id: "study-questions", label: "思考题", icon: LightbulbIcon },
];

function SectionTitle({
  id,
  icon: Icon,
  children,
  hint,
}: {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div id={id} className="scroll-mt-20">
      <h3 className="flex items-center gap-2 text-xl font-black">
        <Icon className="size-5 text-brand" />
        {children}
      </h3>
      {hint && <p className="mt-1 text-sm text-muted-foreground">{hint}</p>}
    </div>
  );
}

function ConceptOrbit({ article, ids }: { article: Article; ids: string[] }) {
  const nodes = ids.slice(0, 10).map((id, i, arr) => {
    const angle = (i / arr.length) * Math.PI * 2 - Math.PI / 2;
    return { concept: getConcept(id)!, x: 50 + Math.cos(angle) * 38, y: 50 + Math.sin(angle) * 38 };
  });

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden>
        <circle cx="50" cy="50" r="38" className="fill-none stroke-border" strokeDasharray="1 1.5" strokeWidth="0.3" />
        {nodes.map((n) => (
          <line
            key={n.concept.id}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            className="stroke-brand/35"
            strokeWidth="0.35"
          />
        ))}
      </svg>
      <div className="absolute top-1/2 left-1/2 w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-foreground p-2.5 text-center text-background shadow-lg">
        <p className="text-[10px] text-background/60">本文</p>
        <p className="line-clamp-3 text-[11px] leading-snug font-semibold sm:text-xs">{article.title}</p>
      </div>
      {nodes.map((n) => (
        <Link
          key={n.concept.id}
          href={`/concept/${n.concept.id}`}
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
          className="absolute w-max max-w-[6.5rem] -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-card px-2 py-1 text-center text-[11px] leading-tight font-medium shadow-sm transition-colors hover:border-brand hover:text-brand sm:max-w-[8rem] sm:text-xs"
        >
          {n.concept.name}
        </Link>
      ))}
    </div>
  );
}

export function StudySection({ article, study }: { article: Article; study: Study }) {
  const ids = articleConceptIds(article.id);
  const related = relatedByConcepts(article.id);
  const terms = study.terms.map((id) => getConcept(id)!);

  return (
    <section id="study" className="mt-14 scroll-mt-20 rounded-3xl border bg-secondary/40 p-5 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] text-brand">DEEP LEARNING</p>
          <h2 className="mt-1 text-2xl font-black sm:text-3xl">深度学习</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            这条新闻从哪里来、为什么重要、读懂它需要哪些概念。虚线下划线的词条都可以悬停预览，点击进入知识库，每个词条页都列出了引用它的报道和词条。
          </p>
        </div>
      </div>

      <nav className="mt-5 flex gap-2 overflow-x-auto pb-1" aria-label="深度学习目录">
        {studyAnchors.map(({ id, label, icon: Icon }) => (
          <a
            key={id}
            href={`#${id}`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon className="size-3.5" />
            {label}
          </a>
        ))}
      </nav>

      <div className="mt-8 space-y-12">
        <div>
          <SectionTitle id="study-background" icon={HistoryIcon}>
            历史背景
          </SectionTitle>
          <div className="mt-4 space-y-4 text-[15px] leading-8 text-foreground/90">
            {study.background.map((p, i) => (
              <p key={i}>
                <RichText text={p} />
              </p>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle id="study-timeline" icon={BookOpenIcon} hint="按时间顺序梳理事件脉络">
            来龙去脉
          </SectionTitle>
          <ol className="relative mt-5 space-y-5 border-l-2 border-border pl-6">
            {study.timeline.map((item, i) => {
              const last = i === study.timeline.length - 1;
              return (
                <li key={i} className="relative">
                  <span
                    className={
                      "absolute top-1.5 -left-[31px] size-3 rounded-full ring-4 ring-secondary " +
                      (last ? "bg-brand" : "bg-foreground/60")
                    }
                    aria-hidden
                  />
                  <p className="font-mono text-xs font-semibold text-muted-foreground">{item.time}</p>
                  <p className={"mt-0.5 leading-relaxed " + (last ? "font-semibold" : "")}>{item.event}</p>
                </li>
              );
            })}
          </ol>
        </div>

        <div>
          <SectionTitle id="study-terms" icon={TagsIcon} hint={`理解本文需要的 ${terms.length} 个关键概念`}>
            关键术语
          </SectionTitle>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {terms.map((c) => {
              const count = conceptMentionCount(c.id);
              return (
                <Link
                  key={c.id}
                  href={`/concept/${c.id}`}
                  className="group flex flex-col rounded-xl border bg-card p-4 transition-colors hover:border-foreground/25"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-heading font-bold group-hover:text-brand">{c.name}</span>
                    <Badge variant="outline" className="font-normal">
                      {c.category}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.summary}</p>
                  <p className="mt-auto pt-3 text-xs text-muted-foreground/80">
                    {count > 1 ? `今日共 ${count} 篇报道涉及 · 查看反向链接 →` : "查看词条详情 →"}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <SectionTitle
            id="study-network"
            icon={NetworkIcon}
            hint="本文链接到的概念，以及通过共同概念与本文双向相连的其他报道"
          >
            知识网络
          </SectionTitle>
          <div className="mt-5 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <ConceptOrbit article={article} ids={ids} />
            <div>
              <p className="text-sm font-semibold">相互链接的报道</p>
              {related.length > 0 ? (
                <ul className="mt-3 space-y-3">
                  {related.map(({ article: a, shared }) => (
                    <li key={a.id} className="rounded-xl border bg-card p-3.5">
                      <SourceLabel id={a.source} className="text-muted-foreground" />
                      <Link
                        href={`/article/${a.id}#study`}
                        className="mt-1 block leading-snug font-semibold hover:text-brand"
                      >
                        {a.title}
                      </Link>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {shared.map((c) => (
                          <Link
                            key={c.id}
                            href={`/concept/${c.id}`}
                            className="rounded-md bg-brand/8 px-1.5 py-0.5 text-[11px] text-brand hover:bg-brand/15"
                          >
                            {c.name}
                          </Link>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
                  今日暂无其他报道与本文共享概念，可从上方词条进入知识库继续探索。
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <SectionTitle id="study-questions" icon={LightbulbIcon}>
            思考题
          </SectionTitle>
          <ol className="mt-4 space-y-3">
            {study.questions.map((q, i) => (
              <li key={i} className="flex gap-3 rounded-xl bg-background p-4">
                <span className="font-heading text-lg leading-none font-black text-brand">{i + 1}</span>
                <span className="leading-relaxed">{q}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

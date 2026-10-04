"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { RichText } from "@/components/rich-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { articleHref } from "@/lib/news";
import { sanitizeBrief, type ModelBrief } from "@/lib/search-brief";
import { searchSite, type Briefing } from "@/lib/search";

const EXAMPLES = ["英伟达", "霍尔木兹海峡", "人工智能泡沫", "房贷贴息"];

export function SiteSearch() {
  const params = useSearchParams();
  const router = useRouter();
  const initial = params.get("q")?.trim() ?? "";
  const initialResult = initial ? searchSite(initial) : null;
  const [draft, setDraft] = useState(initial);
  const [active, setActive] = useState(initial);
  const [briefing, setBriefing] = useState<Briefing | null>(initialResult?.briefing ?? null);
  const [phase, setPhase] = useState<"idle" | "writing" | "model" | "local">(
    initialResult?.packet ? "writing" : initialResult ? "local" : "idle",
  );
  const [error, setError] = useState("");
  const request = useRef(0);

  useEffect(() => {
    const packet = initialResult?.packet;
    if (!packet) return;
    const id = ++request.current;
    void rewrite(packet, id);
    // Only the URL query on first render is rewritten here. Later searches call run().
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function rewrite(packet: NonNullable<ReturnType<typeof searchSite>["packet"]>, id: number) {
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(packet),
      });
      if (!response.ok) throw new Error(String(response.status));
      const brief = sanitizeBrief((await response.json()) as ModelBrief, packet.concepts.map((item) => item.id));
      if (!brief) throw new Error("brief");
      if (id !== request.current) return;
      setBriefing((current) =>
        current && current.query === packet.query ? { ...current, title: brief.title, paragraphs: brief.paragraphs } : current,
      );
      setPhase("model");
    } catch {
      if (id !== request.current) return;
      setPhase("local");
      setError("模型这次没有写成，下面仍是按词条和报道原句整理的结果。");
    }
  }

  async function run(query: string) {
    const next = query.trim();
    setDraft(next);
    setActive(next);
    setError("");
    const url = next ? `/search?q=${encodeURIComponent(next)}` : "/search";
    router.replace(url, { scroll: false });
    if (!next) {
      setBriefing(null);
      setPhase("idle");
      return;
    }
    const { briefing: local, packet } = searchSite(next);
    setBriefing(local);
    if (!packet) {
      setPhase("local");
      return;
    }
    const id = ++request.current;
    setPhase("writing");
    await rewrite(packet, id);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <section className="border-b py-10 sm:py-14">
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">Search</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">站内检索</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          问一个说法，站点先找出相关词条和报道，再整理成一段带知识库链接的说明。对得上的材料会交给模型重写；对不上就不编。
        </p>
        <form
          className="mt-8 flex flex-col gap-3 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            void run(draft);
          }}
        >
          <div className="relative min-w-0 flex-1">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="例如：英伟达、霍尔木兹海峡、人工智能泡沫"
              aria-label="检索问题"
              className="h-11 bg-card pl-9"
              maxLength={80}
            />
          </div>
          <Button type="submit" className="h-11 px-6">
            检索
          </Button>
        </form>
        <div className="mt-4 flex flex-wrap gap-2">
          {EXAMPLES.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => void run(example)}
              className="rounded-full border bg-card px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              {example}
            </button>
          ))}
        </div>
      </section>

      {briefing && (
        <section className="py-10" aria-live="polite">
          <div className="relative overflow-hidden rounded-2xl border bg-card p-6 sm:p-10">
            <div className="absolute inset-y-0 left-0 w-1.5 bg-brand" aria-hidden />
            <p className="text-xs font-semibold tracking-[0.25em] text-muted-foreground">
              {phase === "writing" ? "模型正在重写" : phase === "model" ? "模型根据站内材料整理" : "按词条和报道整理"}
            </p>
            <h2 className="mt-3 font-heading text-2xl font-black text-balance sm:text-3xl">{briefing.title}</h2>
            <div className="reading reading-body mt-5 space-y-4 text-foreground/90">
              {briefing.paragraphs.map((paragraph, index) => (
                <p key={index}>
                  <RichText text={paragraph} />
                </p>
              ))}
            </div>
            {error && <p className="mt-4 text-sm text-muted-foreground">{error}</p>}
          </div>

          {briefing.concepts.length > 0 && (
            <div className="mt-10">
              <h3 className="text-xl font-black">知识库</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {briefing.concepts.map((concept) => (
                  <li key={concept.id}>
                    <Link
                      href={`/concept/${concept.id}`}
                      className="block h-full rounded-xl border bg-card p-4 transition-colors hover:border-brand"
                    >
                      <span className="text-xs text-muted-foreground">{concept.category}</span>
                      <span className="mt-1 block font-semibold">{concept.name}</span>
                      <span className="mt-2 block text-sm text-muted-foreground">{concept.reason}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {briefing.articles.length > 0 && (
            <div className="mt-10">
              <h3 className="text-xl font-black">依据的报道</h3>
              <ul className="mt-4 space-y-3">
                {briefing.articles.map((article) => (
                  <li key={`${article.date}-${article.id}`}>
                    <Link
                      href={articleHref(article)}
                      className="block rounded-xl border bg-card p-4 transition-colors hover:border-brand"
                    >
                      <span className="text-xs text-muted-foreground">
                        {article.date} · {article.sourceName} · {article.topic}
                      </span>
                      <span className="mt-1 block font-semibold">{article.title}</span>
                      <span className="mt-2 block text-sm text-muted-foreground">{article.note}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!active ? null : (
            <p className="mt-8 text-xs text-muted-foreground">
              虚线下划线进入知识库。整理只覆盖已收录的各期，原报道以各篇里的原站链接为准。
            </p>
          )}
        </section>
      )}
    </div>
  );
}

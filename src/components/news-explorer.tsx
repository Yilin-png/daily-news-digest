"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  articles,
  sources,
  topics,
  type SourceId,
  type Topic,
} from "@/lib/news";

type SourceFilter = SourceId | "all";
type TopicFilter = Topic | "all";

const SOURCE_EVENT = "news-source-filter";

function readSource(): SourceFilter {
  const param = new URLSearchParams(window.location.search).get("source");
  return sources.some((s) => s.id === param) ? (param as SourceId) : "all";
}

function syncUrl(source: SourceFilter) {
  const url = new URL(window.location.href);
  if (source === "all") url.searchParams.delete("source");
  else url.searchParams.set("source", source);
  window.history.replaceState(null, "", url);
  window.dispatchEvent(new Event(SOURCE_EVENT));
}

function subscribeSource(onChange: () => void) {
  window.addEventListener(SOURCE_EVENT, onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener(SOURCE_EVENT, onChange);
    window.removeEventListener("popstate", onChange);
  };
}

function Chip({
  active,
  onClick,
  children,
  count,
  color,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  count?: number;
  color?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors",
        active
          ? "border-foreground bg-foreground text-background"
          : "bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground",
      )}
    >
      {color && (
        <span
          aria-hidden
          className="size-2 rounded-full ring-1 ring-background/60"
          style={{ backgroundColor: color }}
        />
      )}
      {children}
      {count !== undefined && (
        <span className={cn("text-xs", active ? "text-background/70" : "text-muted-foreground/70")}>
          {count}
        </span>
      )}
    </button>
  );
}

export function NewsExplorer() {
  const source = useSyncExternalStore(subscribeSource, readSource, () => "all" as SourceFilter);
  const [topic, setTopic] = useState<TopicFilter>("all");
  const [query, setQuery] = useState("");

  const pickSource = (next: SourceFilter) => {
    syncUrl(next);
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      if (source !== "all" && a.source !== source) return false;
      if (topic !== "all" && a.topic !== topic) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.paragraphs.some((p) => p.toLowerCase().includes(q))
      );
    });
  }, [source, topic, query]);

  const topicCounts = useMemo(() => {
    const scoped = articles.filter((a) => source === "all" || a.source === source);
    return Object.fromEntries(
      topics.map((t) => [t, scoped.filter((a) => a.topic === t).length]),
    ) as Record<Topic, number>;
  }, [source]);

  const filtered = source !== "all" || topic !== "all" || query.trim() !== "";

  const reset = () => {
    pickSource("all");
    setTopic("all");
    setQuery("");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4 rounded-2xl border bg-card/60 p-4 sm:p-5">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索标题或正文，如「稀土」「Gemini」「加息」"
            className="h-10 bg-background pr-9 pl-9"
            aria-label="搜索新闻"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
              aria-label="清空搜索"
            >
              <XIcon className="size-4" />
            </button>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">来源</p>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap">
            <Chip active={source === "all"} onClick={() => pickSource("all")} count={articles.length}>
              全部
            </Chip>
            {sources.map((s) => (
              <Chip
                key={s.id}
                active={source === s.id}
                onClick={() => pickSource(s.id)}
                color={s.color}
              >
                {s.name}
              </Chip>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">主题</p>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap">
            <Chip active={topic === "all"} onClick={() => setTopic("all")}>
              全部主题
            </Chip>
            {topics
              .filter((t) => topicCounts[t] > 0 || topic === t)
              .map((t) => (
                <Chip key={t} active={topic === t} onClick={() => setTopic(t)} count={topicCounts[t]}>
                  {t}
                </Chip>
              ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground" aria-live="polite">
        <span>
          {filtered ? `筛选出 ${results.length} 条` : `全部 ${results.length} 条`}
        </span>
        {filtered && (
          <Button variant="ghost" size="sm" onClick={reset}>
            清除筛选
          </Button>
        )}
      </div>

      {results.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed px-6 py-16 text-center">
          <p className="font-heading text-lg font-bold">没有找到匹配的新闻</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            换个关键词，或放宽来源与主题筛选试试。
          </p>
          <Button variant="outline" onClick={reset}>
            查看全部 {articles.length} 条
          </Button>
        </div>
      )}
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { ConceptCategory } from "@/lib/concepts";

export interface DirectoryItem {
  id: string;
  name: string;
  category: ConceptCategory;
  summary: string;
  aliases: string[];
  mentions: number;
}

type Sort = "mentions" | "name";

export function ConceptDirectory({
  items,
  categories,
}: {
  items: DirectoryItem[];
  categories: ConceptCategory[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ConceptCategory | "all">("all");
  const [sort, setSort] = useState<Sort>("mentions");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((c) => category === "all" || c.category === category)
      .filter(
        (c) =>
          !q ||
          c.name.toLowerCase().includes(q) ||
          c.summary.toLowerCase().includes(q) ||
          c.aliases.some((a) => a.toLowerCase().includes(q)),
      )
      .sort((a, b) =>
        sort === "mentions"
          ? b.mentions - a.mentions || a.name.localeCompare(b.name, "zh-CN")
          : a.name.localeCompare(b.name, "zh-CN"),
      );
  }, [items, query, category, sort]);

  return (
    <div className="space-y-6">
      <div className="space-y-4 rounded-2xl border bg-card/60 p-4 sm:p-5">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索词条，如「稀土」「后训练」「照付不议」"
            className="h-10 bg-background pl-9"
            aria-label="搜索词条"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {(["all", ...categories] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                aria-pressed={category === cat}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-sm transition-colors",
                  category === cat
                    ? "border-foreground bg-foreground text-background"
                    : "bg-card text-muted-foreground hover:text-foreground",
                )}
              >
                {cat === "all" ? "全部" : cat}
                <span className="ml-1 text-xs opacity-60">
                  {cat === "all" ? items.length : items.filter((i) => i.category === cat).length}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-muted-foreground">排序</span>
            <Button variant={sort === "mentions" ? "secondary" : "ghost"} size="sm" onClick={() => setSort("mentions")}>
              引用数
            </Button>
            <Button variant={sort === "name" ? "secondary" : "ghost"} size="sm" onClick={() => setSort("name")}>
              名称
            </Button>
          </div>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((c) => (
            <Link
              key={c.id}
              href={`/concept/${c.id}`}
              className="group flex flex-col rounded-xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md"
            >
              <span className="flex items-center justify-between gap-2">
                <span className="font-heading font-bold group-hover:text-brand">{c.name}</span>
                <span className="shrink-0 text-[11px] text-muted-foreground">{c.category}</span>
              </span>
              <span className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{c.summary}</span>
              <span className="mt-auto pt-3 text-xs text-muted-foreground/80">
                {c.mentions > 0 ? `${c.mentions} 篇报道引用` : "经由其他词条关联"}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed px-6 py-14 text-center">
          <p className="font-heading text-lg font-bold">没有找到相关词条</p>
          <p className="text-sm text-muted-foreground">试试更短的关键词，或切换到「全部」分类。</p>
          <Button
            variant="outline"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
          >
            重置
          </Button>
        </div>
      )}
    </div>
  );
}

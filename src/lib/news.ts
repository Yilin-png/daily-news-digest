import * as edition0924 from "@/lib/editions/2026-09-24";
import * as edition0925 from "@/lib/editions/2026-09-25";
import * as edition0926 from "@/lib/editions/2026-09-26";
import * as edition1003 from "@/lib/editions/2026-10-03";
import * as edition1002 from "@/lib/editions/2026-10-02";
import * as edition1001 from "@/lib/editions/2026-10-01";
import * as edition0930 from "@/lib/editions/2026-09-30";
import * as edition0929 from "@/lib/editions/2026-09-29";
import * as edition0928 from "@/lib/editions/2026-09-28";
import * as edition0927 from "@/lib/editions/2026-09-27";
import type { Study } from "@/lib/study";

export type SourceId =
  | "caixin"
  | "ft"
  | "wsj"
  | "bloomberg"
  | "economist"
  | "nyt"
  | "initium"
  | "information";

export type Topic =
  | "中美峰会"
  | "人工智能"
  | "能源产业"
  | "宏观经济"
  | "俄乌战争"
  | "国际政治"
  | "生物医药"
  | "公共健康"
  | "文化传媒";

export interface Source {
  id: SourceId;
  name: string;
  en: string;
  color: string;
}

/** Article fields stored in an edition file, before the date is attached. */
export type ArticleInput = {
  id: string;
  source: SourceId;
  topic: Topic;
  title: string;
  paragraphs: string[];
  url: string;
};

export interface Article extends ArticleInput {
  date: string;
}

export interface Edition {
  date: string;
  weekday: string;
  label: string;
  highlight: string;
  articles: Article[];
  studies: Record<string, Study>;
}

export const sources: Source[] = [
  { id: "caixin", name: "财新", en: "Caixin", color: "#c8102e" },
  { id: "ft", name: "FT", en: "Financial Times", color: "#d9822b" },
  { id: "wsj", name: "华尔街日报", en: "The Wall Street Journal", color: "#1f2937" },
  { id: "bloomberg", name: "Bloomberg", en: "Bloomberg", color: "#6d28d9" },
  { id: "economist", name: "经济学人", en: "The Economist", color: "#e3120b" },
  { id: "nyt", name: "纽约时报", en: "The New York Times", color: "#111827" },
  { id: "initium", name: "端传媒", en: "Initium Media", color: "#0f766e" },
  { id: "information", name: "The Information", en: "The Information", color: "#2563eb" },
];

export const topics: Topic[] = [
  "中美峰会",
  "人工智能",
  "能源产业",
  "宏观经济",
  "俄乌战争",
  "国际政治",
  "生物医药",
  "公共健康",
  "文化传媒",
];

function pack(mod: {
  meta: { date: string; weekday: string; label: string };
  highlight: string;
  articles: ArticleInput[];
  studies: Record<string, Study>;
}): Edition {
  return {
    date: mod.meta.date,
    weekday: mod.meta.weekday,
    label: mod.meta.label,
    highlight: mod.highlight,
    articles: mod.articles.map((article) => ({ ...article, date: mod.meta.date })),
    studies: mod.studies,
  };
}

/** Newest first. Add a module under src/lib/editions and register it here. */
export const editions: Edition[] = [pack(edition1003), pack(edition1002), pack(edition1001), pack(edition0930), pack(edition0929), pack(edition0928), pack(edition0927), pack(edition0926), pack(edition0925), pack(edition0924)].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export const latestEdition = editions[0];

export const allArticles: Article[] = editions.flatMap((edition) => edition.articles);

const sourceMap = new Map(sources.map((s) => [s.id, s]));

export function getSource(id: SourceId): Source {
  return sourceMap.get(id)!;
}

export function getEdition(date: string): Edition | undefined {
  return editions.find((edition) => edition.date === date);
}

export function getArticle(date: string, id: string): Article | undefined {
  return getEdition(date)?.articles.find((article) => article.id === id);
}

export function readingMinutes(article: Article): number {
  const chars = article.paragraphs.join("").length;
  return Math.max(1, Math.round(chars / 450));
}

export function articleHref(article: Pick<Article, "date" | "id">, hash = ""): string {
  return `/d/${article.date}/article/${article.id}${hash}`;
}

export function editionHref(date: string): string {
  return `/d/${date}`;
}

export function editionShortLabel(edition: Pick<Edition, "date" | "weekday">): string {
  const [, month, day] = edition.date.split("-");
  return `${Number(month)}月${Number(day)}日 · 周${edition.weekday.slice(1)}`;
}

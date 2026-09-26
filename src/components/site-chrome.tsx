import Link from "next/link";
import { articles, edition, sources } from "@/lib/news";

const nav = [
  { href: "/#highlight", label: "今日看点" },
  { href: "/#lead", label: "头条" },
  { href: "/#all", label: "全部新闻" },
  { href: "/#links", label: "原站链接" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-heading text-lg font-black tracking-tight sm:text-xl">
            每日聚合新闻
          </span>
          <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
            {edition.date}
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground max-sm:[&:nth-child(n+3)]:hidden"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-secondary/60">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-sm text-muted-foreground sm:grid-cols-2 sm:px-6">
        <div className="space-y-2">
          <p className="font-heading text-base font-bold text-foreground">每日聚合新闻</p>
          <p>
            {edition.label} · 共 {articles.length} 条 · 八源各 3 篇 · 标题全中文 · 全文深度总结
          </p>
          <p>本站内容为对原报道的中文摘要整理，观点与事实以原站为准。</p>
        </div>
        <div className="flex flex-wrap content-start gap-x-4 gap-y-2 sm:justify-end">
          {sources.map((s) => (
            <Link key={s.id} href={`/?source=${s.id}#all`} className="hover:text-foreground">
              {s.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { DateSwitcher } from "@/components/date-switcher";
import { FooterSourceLinks } from "@/components/footer-sources";
import { HeaderNav } from "@/components/header-nav";
import { editions } from "@/lib/news";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" className="shrink-0 font-heading text-lg font-black tracking-tight sm:text-xl">
            每日聚合新闻
          </Link>
          <DateSwitcher className="hidden md:flex" />
        </div>
        <HeaderNav />
      </div>
      <div className="border-t px-4 py-2 md:hidden">
        <DateSwitcher />
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
            已收录 {editions.length} 期 · 每期 {editions[0]?.articles.length ?? 0} 条 · 八源各 3 篇 · 标题全中文 ·
            全文深度总结
          </p>
          <p>按日期切换阅读，往期内容会保留。</p>
          <p>本站内容为对原报道的中文摘要整理，观点与事实以原站为准。</p>
        </div>
        <FooterSourceLinks />
      </div>
    </footer>
  );
}

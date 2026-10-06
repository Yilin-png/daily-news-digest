import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { DateSwitcher } from "@/components/date-switcher";
import { FooterSourceLinks } from "@/components/footer-sources";
import { HeaderNav } from "@/components/header-nav";
import { ReadingMenu } from "@/components/reading-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { editions } from "@/lib/news";
import { SITE_NAME } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" className="flex min-w-0 items-center gap-2 font-heading text-[15px] font-black tracking-tight whitespace-nowrap sm:text-lg">
            <BrandMark className="size-8 shrink-0 sm:size-9" />
            <span className="truncate">{SITE_NAME}</span>
          </Link>
          <DateSwitcher className="hidden shrink-0 flex-nowrap md:flex" />
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <HeaderNav />
          <ReadingMenu />
          <ThemeToggle />
        </div>
      </div>
      <div className="flex items-center gap-2 border-t px-4 py-2 md:hidden">
        <DateSwitcher className="min-w-0" />
        <Link href="/" className="ml-auto shrink-0 rounded-md px-2 py-1 text-sm text-muted-foreground sm:hidden">
          首页
        </Link>
        <Link href="/search" className="shrink-0 rounded-md px-2 py-1 text-sm text-muted-foreground sm:hidden">
          检索
        </Link>
        <Link href="/learn" className="shrink-0 rounded-md px-2 py-1 text-sm text-muted-foreground sm:hidden">
          知识库
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-secondary/60">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-sm text-muted-foreground sm:grid-cols-2 sm:px-6">
        <div className="space-y-2">
          <p className="flex items-center gap-2 font-heading text-base font-bold text-foreground">
            <BrandMark className="size-7" />
            {SITE_NAME}
          </p>
          <p>
            {editions.every(
              (edition) =>
                edition.articles.length === editions[0]?.articles.length &&
                edition.articles.every((article) => !article.brief),
            )
              ? `已收录 ${editions.length} 期 · 每期 ${editions[0]?.articles.length ?? 0} 条 · 八源各 3 篇 · 标题全中文 · 全文深度总结`
              : `已收录 ${editions.length} 期 · 标题全中文 · 全文深度总结`}
          </p>
          <p>按日期切换阅读，往期内容会保留。</p>
          <p>本站内容为对原报道的中文摘要整理，观点与事实以原站为准。</p>
        </div>
        <FooterSourceLinks />
      </div>
    </footer>
  );
}

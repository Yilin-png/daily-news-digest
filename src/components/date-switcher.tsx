"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { editionHref, editionShortLabel, editions, latestEdition } from "@/lib/news";

export function activeEditionDate(pathname: string): string | null {
  const dated = pathname.match(/^\/d\/(\d{4}-\d{2}-\d{2})(?:\/|$)/);
  if (dated) return dated[1];
  if (pathname === "/" || pathname.startsWith("/article/")) return latestEdition.date;
  return null;
}

export function DateSwitcher({
  current,
  className,
}: {
  current?: string | null;
  className?: string;
}) {
  const pathname = usePathname();
  const active = current === undefined ? activeEditionDate(pathname) : current;

  return (
    <nav aria-label="按日期切换" className={cn("flex flex-wrap items-center gap-2", className)}>
      {editions.map((edition) => {
        const on = edition.date === active;
        return (
          <Link
            key={edition.date}
            href={editionHref(edition.date)}
            aria-current={on ? "page" : undefined}
            className={cn(
              "rounded-full border px-3 py-1 text-sm transition-colors",
              on
                ? "border-foreground bg-foreground text-background"
                : "bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground",
            )}
          >
            {editionShortLabel(edition)}
          </Link>
        );
      })}
    </nav>
  );
}

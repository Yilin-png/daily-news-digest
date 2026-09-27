"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { activeEditionDate } from "@/components/date-switcher";
import { editionHref, latestEdition } from "@/lib/news";

export function HeaderNav() {
  const pathname = usePathname();
  const base = editionHref(activeEditionDate(pathname) ?? latestEdition.date);
  const nav = [
    { href: "/", label: "首页" },
    { href: `${base}#all`, label: "全部新闻" },
    { href: "/learn", label: "知识库" },
    { href: `${base}#highlight`, label: "今日看点" },
    { href: `${base}#lead`, label: "头条" },
    { href: `${base}#links`, label: "原站链接" },
  ];

  return (
    <nav className="hidden items-center gap-1 text-sm sm:flex">
      {nav.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="rounded-md px-2 py-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground max-lg:[&:nth-child(n+3)]:hidden"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
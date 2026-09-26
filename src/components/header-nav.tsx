"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { activeEditionDate } from "@/components/date-switcher";
import { editionHref } from "@/lib/news";

export function HeaderNav() {
  const pathname = usePathname();
  const date = activeEditionDate(pathname);
  const base = date ? editionHref(date) : "/";
  const nav = [
    { href: `${base}#all`, label: "全部新闻" },
    { href: "/learn", label: "知识库" },
    { href: `${base}#highlight`, label: "今日看点" },
    { href: `${base}#lead`, label: "头条" },
    { href: `${base}#links`, label: "原站链接" },
  ];

  return (
    <nav className="flex items-center gap-1 text-sm">
      {nav.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="rounded-md px-2 py-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground max-sm:[&:nth-child(n+3)]:hidden"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
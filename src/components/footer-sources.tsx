"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { activeEditionDate } from "@/components/date-switcher";
import { editionHref, latestEdition, sources } from "@/lib/news";

export function FooterSourceLinks() {
  const pathname = usePathname();
  const date = activeEditionDate(pathname) ?? latestEdition.date;

  return (
    <div className="flex flex-wrap content-start gap-x-4 gap-y-2 sm:justify-end">
      {sources.map((source) => (
        <Link
          key={source.id}
          href={`${editionHref(date)}?source=${source.id}#all`}
          className="hover:text-foreground"
        >
          {source.name}
        </Link>
      ))}
    </div>
  );
}

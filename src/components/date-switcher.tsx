"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDownIcon } from "lucide-react";
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
  const activeEdition = editions.find((edition) => edition.date === active);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className={className}>
    <div ref={rootRef} className="relative inline-flex">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-sm text-foreground"
      >
        {activeEdition ? editionShortLabel(activeEdition) : "选择日期"}
        <ChevronDownIcon className={cn("size-3.5 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label="按日期切换"
          className="absolute top-[calc(100%+0.4rem)] left-0 z-50 max-h-72 w-max min-w-full overflow-y-auto rounded-xl border bg-popover p-1 text-popover-foreground shadow-lg"
        >
          {editions.map((edition) => {
            const on = edition.date === active;
            return (
              <Link
                key={edition.date}
                href={editionHref(edition.date)}
                role="menuitem"
                aria-current={on ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm whitespace-nowrap",
                  on ? "bg-foreground text-background" : "hover:bg-muted",
                )}
              >
                {editionShortLabel(edition)}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
    </div>
  );
}

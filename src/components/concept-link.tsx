"use client";

import Link from "next/link";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export function ConceptLink({
  id,
  text,
  name,
  category,
  summary,
}: {
  id: string;
  text: string;
  name: string;
  category: string;
  summary: string;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger
        delay={150}
        render={
          <Link
            href={`/concept/${id}`}
            className="rounded-sm text-foreground underline decoration-brand/50 decoration-dotted decoration-2 underline-offset-[5px] transition-colors hover:bg-brand/8 hover:decoration-brand"
          />
        }
      >
        {text}
      </HoverCardTrigger>
      <HoverCardContent className="w-72 p-4" side="top">
        <p className="text-[11px] font-medium tracking-wider text-brand">{category}</p>
        <p className="mt-1 font-heading text-base font-bold">{name}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{summary}</p>
        <p className="mt-3 text-xs text-muted-foreground/80">点击查看词条与反向链接 →</p>
      </HoverCardContent>
    </HoverCard>
  );
}

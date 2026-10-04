import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteSearch } from "@/components/site-search";

export const metadata: Metadata = {
  title: "站内检索",
  description: "按问题检索已收录的报道和知识库，整理成带词条链接的说明。",
};

export default function SearchPage() {
  return (
    <Suspense>
      <SiteSearch />
    </Suspense>
  );
}

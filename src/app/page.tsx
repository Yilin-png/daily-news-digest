import type { Metadata } from "next";
import { SiteHome } from "@/components/site-home";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: SITE_NAME },
  description: "八家中外媒体每日各选三篇，中文深度总结按日期归档，每篇附原站链接与深度学习。",
};

export default function Home() {
  return <SiteHome />;
}

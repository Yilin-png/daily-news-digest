import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditionHome } from "@/components/edition-home";
import { editions, getEdition } from "@/lib/news";

export function generateStaticParams() {
  return editions.map((edition) => ({ date: edition.date }));
}

export async function generateMetadata({
  params,
}: PageProps<"/d/[date]">): Promise<Metadata> {
  const { date } = await params;
  const edition = getEdition(date);
  if (!edition) return { title: "未找到这一期" };
  const briefCount = edition.articles.filter((article) => article.brief).length;
  return {
    title: edition.label,
    description:
      briefCount > 0
        ? `${edition.label}，共 ${edition.articles.length} 条，${edition.articles.length - briefCount} 篇全文深度总结，The Information ${briefCount} 条仅标题与导语。`
        : `${edition.label}，共 ${edition.articles.length} 条，八源各 3 篇。`,
  };
}

export default async function EditionPage({ params }: PageProps<"/d/[date]">) {
  const { date } = await params;
  const edition = getEdition(date);
  if (!edition) notFound();
  return <EditionHome edition={edition} />;
}

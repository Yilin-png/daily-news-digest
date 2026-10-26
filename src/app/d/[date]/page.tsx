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
  const sourceCount = new Set(edition.articles.map((article) => article.source)).size;
  const balanced =
    sourceCount > 0 &&
    [...new Set(edition.articles.map((article) => article.source))].every(
      (id) => edition.articles.filter((article) => article.source === id).length === 3,
    );
  const balanceLabel =
    balanced && sourceCount === 8 ? "八源各 3 篇" : balanced && sourceCount === 7 ? "七源各 3 篇" : null;
  return {
    title: edition.label,
    description:
      briefCount > 0
        ? `${edition.label}，共 ${edition.articles.length} 条，${edition.articles.length - briefCount} 篇全文深度总结，The Information ${briefCount} 条仅标题与导语。`
        : balanceLabel
          ? `${edition.label}，共 ${edition.articles.length} 条，${balanceLabel}。`
          : `${edition.label}，共 ${edition.articles.length} 条。`,
  };
}

export default async function EditionPage({ params }: PageProps<"/d/[date]">) {
  const { date } = await params;
  const edition = getEdition(date);
  if (!edition) notFound();
  return <EditionHome edition={edition} />;
}

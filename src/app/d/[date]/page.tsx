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
  return {
    title: edition.label,
    description: edition.highlight.slice(0, 140),
  };
}

export default async function EditionPage({ params }: PageProps<"/d/[date]">) {
  const { date } = await params;
  const edition = getEdition(date);
  if (!edition) notFound();
  return <EditionHome edition={edition} />;
}

import type { Metadata } from "next";
import { ArticleView } from "@/components/article-view";
import { editions, getArticle } from "@/lib/news";

export function generateStaticParams() {
  return editions.flatMap((edition) =>
    edition.articles.map((article) => ({ date: edition.date, id: article.id })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/d/[date]/article/[id]">): Promise<Metadata> {
  const { date, id } = await params;
  const article = getArticle(date, id);
  if (!article) return { title: "未找到文章" };
  return {
    title: article.title,
    description: article.paragraphs[0].slice(0, 120),
  };
}

export default async function DatedArticlePage({
  params,
}: PageProps<"/d/[date]/article/[id]">) {
  const { date, id } = await params;
  return <ArticleView date={date} id={id} />;
}

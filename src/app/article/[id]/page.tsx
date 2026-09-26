import type { Metadata } from "next";
import { ArticleView } from "@/components/article-view";
import { getArticle, latestEdition } from "@/lib/news";

export function generateStaticParams() {
  return latestEdition.articles.map((article) => ({ id: article.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/article/[id]">): Promise<Metadata> {
  const { id } = await params;
  const article = getArticle(latestEdition.date, id);
  if (!article) return { title: "未找到文章" };
  return {
    title: article.title,
    description: article.paragraphs[0].slice(0, 120),
  };
}

export default async function ArticlePage({ params }: PageProps<"/article/[id]">) {
  const { id } = await params;
  return <ArticleView date={latestEdition.date} id={id} />;
}

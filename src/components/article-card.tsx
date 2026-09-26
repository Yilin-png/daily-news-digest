import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SourceLabel } from "@/components/source-label";
import { readingMinutes, type Article } from "@/lib/news";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/article/${article.id}`}
      className="group flex h-full flex-col rounded-xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <SourceLabel id={article.source} />
        <Badge variant="secondary" className="font-normal">
          {article.topic}
        </Badge>
      </div>
      <h3 className="text-lg leading-snug font-bold text-balance group-hover:text-brand">
        {article.title}
      </h3>
      <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
        {article.paragraphs[0]}
      </p>
      <div className="mt-auto flex items-center justify-between pt-4 text-xs text-muted-foreground">
        <span>约 {readingMinutes(article)} 分钟读完</span>
        <span className="font-medium text-foreground/70 transition-transform group-hover:translate-x-0.5">
          阅读全文 →
        </span>
      </div>
    </Link>
  );
}

import Link from "next/link";
import { MoonWater } from "@/components/moon-water";
import { buttonVariants } from "@/components/ui/button";
import { editionHref, latestEdition } from "@/lib/news";

export function SiteHome() {
  return (
    <div className="mx-auto flex min-h-[calc(100dvh-8.5rem)] max-w-3xl flex-col items-center justify-center px-4 py-8 sm:px-6">
      <MoonWater />
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href={editionHref(latestEdition.date)} className={buttonVariants({ size: "lg" })}>
          阅读最新一期
        </Link>
        <Link href="/learn" className={buttonVariants({ variant: "outline", size: "lg" })}>
          进入知识库
        </Link>
      </div>
    </div>
  );
}

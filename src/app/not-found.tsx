import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-3 text-3xl font-black">这条新闻不存在</h1>
      <p className="mt-3 text-muted-foreground">链接可能有误，或该条目不在已收录的各期之中。</p>
      <Link href="/" className={buttonVariants({ className: "mt-8", size: "lg" })}>
        回到今日首页
      </Link>
    </div>
  );
}

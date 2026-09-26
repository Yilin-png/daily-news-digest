import type { Metadata, Viewport } from "next";
import { Geist_Mono, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { edition } from "@/lib/news";
import "./globals.css";

const sans = Noto_Sans_SC({
  variable: "--font-noto-sans",
  weight: ["400", "500", "700"],
  preload: false,
  display: "swap",
});

const serif = Noto_Serif_SC({
  variable: "--font-noto-serif",
  weight: ["600", "700", "900"],
  preload: false,
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `每日聚合新闻｜${edition.date}`,
    template: "%s｜每日聚合新闻",
  },
  description:
    "八家国际与华文媒体各选三篇，24 条中文深度总结：中美峰会、人工智能、能源、宏观经济与俄乌战事。",
};

export const viewport: Viewport = {
  themeColor: "#faf7f2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      className={`${sans.variable} ${serif.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

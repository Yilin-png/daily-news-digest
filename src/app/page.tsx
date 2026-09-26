import type { Metadata } from "next";
import { EditionHome } from "@/components/edition-home";
import { latestEdition } from "@/lib/news";

export const metadata: Metadata = {
  title: latestEdition.label,
  description: latestEdition.highlight.slice(0, 140),
};

export default function Home() {
  return <EditionHome edition={latestEdition} />;
}

import { ConceptLink } from "@/components/concept-link";
import { getConcept, parseLinks, type Segment } from "@/lib/knowledge";

export function Segments({ segments }: { segments: Segment[] }) {
  return (
    <>
      {segments.map((seg, i) => {
        if (typeof seg === "string") return <span key={i}>{seg}</span>;
        const c = getConcept(seg.conceptId)!;
        return (
          <ConceptLink
            key={i}
            id={c.id}
            text={seg.text}
            name={c.name}
            category={c.category}
            summary={c.summary}
          />
        );
      })}
    </>
  );
}

export function RichText({ text }: { text: string }) {
  return <Segments segments={parseLinks(text)} />;
}

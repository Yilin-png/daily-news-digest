import { cn } from "@/lib/utils";
import { getSource, type SourceId } from "@/lib/news";

export function SourceLabel({
  id,
  className,
}: {
  id: SourceId;
  className?: string;
}) {
  const source = getSource(id);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide",
        className,
      )}
    >
      <span
        aria-hidden
        className="size-2 rounded-full"
        style={{ backgroundColor: source.color }}
      />
      {source.name}
    </span>
  );
}

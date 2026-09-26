import { cn } from "@/lib/utils";

/** 朱红方印，中间是「日」。小尺寸仍能辨认，对应每日一刊。 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("shrink-0", className)}
      aria-hidden
      focusable="false"
    >
      <rect width="32" height="32" rx="8" fill="#C4452D" />
      <path
        fill="#F7F3EC"
        d="M8 8h16v3.2H8V8zm0 6.4h16v3.2H8v-3.2zm0 6.4h16V24H8v-3.2zM8 8h3.2v16H8V8zm12.8 0H24v16h-3.2V8z"
      />
    </svg>
  );
}

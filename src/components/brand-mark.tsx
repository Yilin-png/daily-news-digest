import { cn } from "@/lib/utils";

/** 金黄日轮。漆面般的两层金色，中间是一笔写成的「日」。 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={cn("shrink-0", className)}
      aria-hidden
      focusable="false"
    >
      <circle cx="32" cy="32" r="31.5" fill="#E2AE34" />
      <circle cx="32" cy="32" r="28" fill="#F6D56A" />
      <circle cx="32" cy="32" r="27.4" stroke="#C8922A" strokeWidth="0.8" opacity="0.65" />
      <path
        d="M18.5 24.5A16.5 16.5 0 0 1 33 14"
        stroke="#FFF8E4"
        strokeWidth="2.3"
        strokeLinecap="round"
        opacity="0.8"
      />
      <rect
        x="20.6"
        y="18.2"
        width="22.8"
        height="27.6"
        rx="1.6"
        stroke="#3C2912"
        strokeWidth="3.15"
        strokeLinejoin="round"
      />
      <path
        d="M23.1 32.2h17.8"
        stroke="#3C2912"
        strokeWidth="3.15"
        strokeLinecap="round"
      />
    </svg>
  );
}

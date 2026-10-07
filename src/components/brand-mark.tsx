import { cn } from "@/lib/utils";

/** 水中月：天上一个圆月，下面是断开的波光。 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("shrink-0", className)}
      aria-hidden
      focusable="false"
    >
      <rect width="64" height="64" fill="#F7F2E8" />
      <circle cx="32" cy="16.5" r="8.2" fill="#F6E4A8" />
      <path d="M24 33.2 Q32 31.6 40 33.2" fill="none" stroke="#F3DCA6" strokeWidth="2.3" strokeLinecap="round" />
      <path d="M27 37.4 Q33 35.8 39 37.4" fill="none" stroke="#E7C57A" strokeWidth="2" strokeLinecap="round" />
      <path d="M23 41.6 Q29.5 40 36 41.6" fill="none" stroke="#F0D49A" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M28 45.6 Q32.5 44 37 45.6" fill="none" stroke="#E2BC74" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M26 49.4 Q30 47.8 34 49.4" fill="none" stroke="#EBD29A" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M29 53.2 Q32 51.6 35 53.2" fill="none" stroke="#E8C98A" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

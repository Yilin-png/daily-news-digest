import { useId } from "react";

/** 首页的水中月：圆月、碎开的倒影，和一圈圈散开的波纹。 */
export function MoonWater() {
  const uid = useId().replace(/:/g, "");
  const sky = `${uid}-sky`;
  const glow = `${uid}-glow`;
  const water = `${uid}-water`;

  return (
    <svg
      viewBox="0 0 640 420"
      className="moon-water w-full"
      role="img"
      aria-label="水中月"
    >
      <defs>
        <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" className="mw-sky-top" />
          <stop offset="58%" className="mw-sky-mid" />
          <stop offset="100%" className="mw-sky-low" />
        </linearGradient>
        <radialGradient id={glow} cx="50%" cy="50%" r="50%">
          <stop offset="0%" className="mw-glow-core" />
          <stop offset="70%" className="mw-glow-fade" />
          <stop offset="100%" stopColor="#f6e4a8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={water} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" className="mw-water-top" />
          <stop offset="100%" className="mw-water-low" />
        </linearGradient>
        <clipPath id={`${uid}-below`}>
          <rect x="0" y="214" width="640" height="206" />
        </clipPath>
      </defs>

      <rect width="640" height="420" fill={`url(#${sky})`} />

      <g className="mw-moon">
        <circle cx="320" cy="108" r="78" fill={`url(#${glow})`} className="mw-halo" />
        <circle cx="320" cy="108" r="34" className="mw-disc" />
      </g>

      <rect y="214" width="640" height="206" fill={`url(#${water})`} />

      <g clipPath={`url(#${uid}-below)`}>
        <g className="mw-shards">
          <path d="M286 236 Q320 228 354 236" />
          <path d="M296 252 Q322 246 348 252" />
          <path d="M278 270 Q318 260 358 270" />
          <path d="M304 288 Q326 282 348 288" />
          <path d="M290 306 Q320 298 350 306" />
          <path d="M308 324 Q328 318 346 324" />
        </g>
        <g className="mw-rings">
          <ellipse cx="320" cy="248" rx="46" ry="10" />
          <ellipse cx="320" cy="248" rx="78" ry="16" />
          <ellipse cx="320" cy="248" rx="118" ry="22" />
        </g>
      </g>

      <g className="mw-surface">
        <path d="M-80 214 Q 40 204 160 214 T 400 214 T 640 214 T 880 214" />
        <path d="M-120 214 Q 20 224 140 214 T 380 214 T 620 214 T 860 214" />
      </g>
    </svg>
  );
}

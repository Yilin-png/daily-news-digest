import { useId } from "react";
import { cn } from "@/lib/utils";

/** 中秋满月，月面上是「聚」。柔光圆面，没有金属描边。 */
export function BrandMark({ className }: { className?: string }) {
  const raw = useId().replace(/:/g, "");
  const halo = `${raw}-halo`;
  const moon = `${raw}-moon`;
  const shade = `${raw}-shade`;
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("shrink-0", className)}
      aria-hidden
      focusable="false"
    >
      <defs>
        <radialGradient id={halo} cx="50%" cy="48%" r="50%">
          <stop offset="62%" stopColor="#F6E3A4" stopOpacity="0" />
          <stop offset="78%" stopColor="#F4D98A" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#F4D98A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={moon} cx="40%" cy="36%" r="72%">
          <stop offset="0%" stopColor="#FFF8E6" />
          <stop offset="48%" stopColor="#FBE6A4" />
          <stop offset="100%" stopColor="#E8C56A" />
        </radialGradient>
        <radialGradient id={shade} cx="72%" cy="76%" r="60%">
          <stop offset="0%" stopColor="#C9A05A" stopOpacity="0.2" />
          <stop offset="75%" stopColor="#C9A05A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="31.2" fill={`url(#${halo})`} />
      <circle cx="32" cy="32" r="22.2" fill={`url(#${moon})`} />
      <circle cx="32" cy="32" r="22.2" fill={`url(#${shade})`} />
      <path fill="#4A3018" transform="translate(15.854 43.565) scale(0.032292 -0.032292)" d="M567 -56Q567 -62 536.0 -78.0Q505 -94 449 -94H422V337L567 346ZM856 310Q847 303 829.0 304.0Q811 305 786 315Q716 309 629.5 304.5Q543 300 448.0 297.5Q353 295 257.5 295.0Q162 295 73 298L71 314Q155 323 248.0 336.0Q341 349 432.5 365.5Q524 382 604.0 399.5Q684 417 741 433ZM467 71Q463 64 454.5 61.0Q446 58 429 62Q383 34 320.0 9.0Q257 -16 185.5 -34.5Q114 -53 39 -62L32 -51Q90 -23 146.0 15.5Q202 54 247.5 95.5Q293 137 321 174ZM436 215Q432 208 423.5 206.0Q415 204 398 208Q356 188 300.0 170.5Q244 153 181.0 140.5Q118 128 55 122L48 133Q97 156 146.0 187.0Q195 218 237.0 251.5Q279 285 305 313ZM558 326Q582 261 625.0 214.5Q668 168 724.0 136.5Q780 105 844.0 85.0Q908 65 975 52L974 40Q890 19 864 -85Q782 -47 719.0 4.0Q656 55 613.5 131.0Q571 207 547 320ZM918 203Q914 196 905.5 192.5Q897 189 880 193Q848 182 808.5 171.5Q769 161 726.5 152.0Q684 143 644 136L635 146Q660 170 687.0 200.0Q714 230 737.0 259.5Q760 289 773 310ZM25 481Q77 482 166.0 485.5Q255 489 367.5 495.0Q480 501 604 508V494Q528 469 412.0 440.0Q296 411 122 371Q118 362 110.0 356.5Q102 351 94 349ZM257 786V438L127 422V786ZM493 406Q492 402 463.5 390.5Q435 379 384 379H360V786H493ZM471 866Q471 866 491.5 851.0Q512 836 540.5 814.5Q569 793 592 774Q588 758 564 758H50L42 786H404ZM402 588V560H180V588ZM402 686V658H180V686ZM552 643Q674 631 751.0 603.5Q828 576 868.0 542.0Q908 508 918.5 475.0Q929 442 918.0 417.5Q907 393 881.5 384.5Q856 376 825 392Q807 423 768.0 464.5Q729 506 673.0 550.0Q617 594 548 631ZM762 731 830 797 945 702Q937 689 907 686Q856 585 755.0 511.0Q654 437 511 399L505 411Q606 465 675.5 549.5Q745 634 773 731ZM815 731V703H525L516 731Z" />
    </svg>
  );
}

export const READING_KEY = "reading-prefs";
export const READING_EVENT = "reading-prefs";

export type ReadingFont = "sans" | "serif";
export type ReadingSize = "sm" | "md" | "lg" | "xl";
export type ReadingLeading = "tight" | "md" | "loose";
export type ReadingTracking = "tight" | "md" | "wide";
export type ReadingAlign = "justify" | "start";

export type ReadingPrefs = {
  font: ReadingFont;
  size: ReadingSize;
  leading: ReadingLeading;
  tracking: ReadingTracking;
  align: ReadingAlign;
};

export const defaultReading: ReadingPrefs = {
  font: "serif",
  size: "md",
  leading: "tight",
  tracking: "tight",
  align: "justify",
};

const fonts = new Set<ReadingFont>(["sans", "serif"]);
const sizes = new Set<ReadingSize>(["sm", "md", "lg", "xl"]);
const leadings = new Set<ReadingLeading>(["tight", "md", "loose"]);
const trackings = new Set<ReadingTracking>(["tight", "md", "wide"]);
const aligns = new Set<ReadingAlign>(["justify", "start"]);

export function normalizeReading(value: Partial<ReadingPrefs> | null | undefined): ReadingPrefs {
  return {
    font: fonts.has(value?.font as ReadingFont) ? (value?.font as ReadingFont) : defaultReading.font,
    size: sizes.has(value?.size as ReadingSize) ? (value?.size as ReadingSize) : defaultReading.size,
    leading: leadings.has(value?.leading as ReadingLeading) ? (value?.leading as ReadingLeading) : defaultReading.leading,
    tracking: trackings.has(value?.tracking as ReadingTracking)
      ? (value?.tracking as ReadingTracking)
      : defaultReading.tracking,
    align: aligns.has(value?.align as ReadingAlign) ? (value?.align as ReadingAlign) : defaultReading.align,
  };
}

export function readReadingPrefs(): ReadingPrefs {
  try {
    const raw = localStorage.getItem(READING_KEY);
    if (!raw) return defaultReading;
    return normalizeReading(JSON.parse(raw) as Partial<ReadingPrefs>);
  } catch {
    return defaultReading;
  }
}

function writeDataset(prefs: ReadingPrefs) {
  const root = document.documentElement;
  const set = (key: string, value: string, standard: string) => {
    if (value === standard) delete root.dataset[key];
    else root.dataset[key] = value;
  };
  set("font", prefs.font, defaultReading.font);
  set("size", prefs.size, defaultReading.size);
  set("leading", prefs.leading, defaultReading.leading);
  set("tracking", prefs.tracking, defaultReading.tracking);
  set("align", prefs.align, defaultReading.align);
}

export function applyReadingPrefs(prefs: ReadingPrefs) {
  if (typeof document === "undefined") return;
  writeDataset(normalizeReading(prefs));
}

export function saveReadingPrefs(prefs: ReadingPrefs) {
  const next = normalizeReading(prefs);
  try {
    localStorage.setItem(READING_KEY, JSON.stringify(next));
  } catch {
    /* private mode */
  }
  applyReadingPrefs(next);
  window.dispatchEvent(new Event(READING_EVENT));
  return next;
}

export const readingBootScript =
  '(()=>{try{var r=localStorage.getItem("reading-prefs");if(!r)return;var p=JSON.parse(r);var d=document.documentElement;if(p.font==="sans")d.dataset.font="sans";if(p.size==="sm"||p.size==="lg"||p.size==="xl")d.dataset.size=p.size;if(p.leading==="md"||p.leading==="loose")d.dataset.leading=p.leading;if(p.tracking==="md"||p.tracking==="wide")d.dataset.tracking=p.tracking;if(p.align==="start")d.dataset.align="start";}catch(e){}})();';

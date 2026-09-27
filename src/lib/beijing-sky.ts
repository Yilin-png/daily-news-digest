/** Beijing (39.9042°N, 116.4074°E). Night runs from sunset until the next sunrise. */

export type SkyPhase = {
  night: boolean;
  /** Milliseconds until the next sunrise or sunset. */
  nextMs: number;
};

function rad(deg: number) {
  return (deg * Math.PI) / 180;
}

function degFromRad(radian: number) {
  return (radian * 180) / Math.PI;
}

function wrap(value: number, span: number) {
  return ((value % span) + span) % span;
}

function dayOfYear(year: number, month: number, day: number) {
  const n1 = Math.floor((275 * month) / 9);
  const n2 = Math.floor((month + 9) / 12);
  const n3 = 1 + Math.floor((year - 4 * Math.floor(year / 4) + 2) / 3);
  return n1 - n2 * n3 + day - 30;
}

function addCalendarDays(year: number, month: number, day: number, delta: number) {
  const next = new Date(Date.UTC(year, month - 1, day + delta));
  return {
    year: next.getUTCFullYear(),
    month: next.getUTCMonth() + 1,
    day: next.getUTCDate(),
  };
}

/** Hours after Beijing midnight. NOAA solar calculator. */
function sunLocalHours(year: number, month: number, day: number, rising: boolean) {
  const lat = 39.9042;
  const lng = 116.4074;
  const zenith = 90.833;
  const n = dayOfYear(year, month, day);
  const lngHour = lng / 15;
  const t = n + ((rising ? 6 : 18) - lngHour) / 24;
  const mean = 0.9856 * t - 3.289;
  const ecliptic = wrap(
    mean + 1.916 * Math.sin(rad(mean)) + 0.02 * Math.sin(rad(2 * mean)) + 282.634,
    360,
  );
  let rightAsc = wrap(degFromRad(Math.atan(0.91764 * Math.tan(rad(ecliptic)))), 360);
  const eclipticQuad = Math.floor(ecliptic / 90) * 90;
  const ascQuad = Math.floor(rightAsc / 90) * 90;
  rightAsc = (rightAsc + (eclipticQuad - ascQuad)) / 15;
  const sinDec = 0.39782 * Math.sin(rad(ecliptic));
  const cosDec = Math.cos(Math.asin(sinDec));
  let cosHour =
    (Math.cos(rad(zenith)) - sinDec * Math.sin(rad(lat))) / (cosDec * Math.cos(rad(lat)));
  cosHour = Math.min(1, Math.max(-1, cosHour));
  const hourAngle = (rising ? 360 - degFromRad(Math.acos(cosHour)) : degFromRad(Math.acos(cosHour))) / 15;
  const universal = wrap(hourAngle + rightAsc - 0.06571 * t - 6.622 - lngHour, 24);
  return wrap(universal + 8, 24);
}

function beijingParts(now: Date) {
  const bag: Record<string, string> = {};
  for (const part of new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now)) {
    if (part.type !== "literal") bag[part.type] = part.value;
  }
  return {
    year: Number(bag.year),
    month: Number(bag.month),
    day: Number(bag.day),
    hour: Number(bag.hour),
    minute: Number(bag.minute),
    second: Number(bag.second),
  };
}

function beijingInstant(year: number, month: number, day: number, hours: number) {
  return Date.UTC(year, month - 1, day) - 8 * 3600 * 1000 + hours * 3600 * 1000;
}

export function skyPhase(now: Date = new Date()): SkyPhase {
  const today = beijingParts(now);
  const sunrise = beijingInstant(
    today.year,
    today.month,
    today.day,
    sunLocalHours(today.year, today.month, today.day, true),
  );
  const sunset = beijingInstant(
    today.year,
    today.month,
    today.day,
    sunLocalHours(today.year, today.month, today.day, false),
  );
  const stamp = now.getTime();
  let next = sunset;
  if (stamp < sunrise) next = sunrise;
  else if (stamp >= sunset) {
    const tomorrow = addCalendarDays(today.year, today.month, today.day, 1);
    next = beijingInstant(
      tomorrow.year,
      tomorrow.month,
      tomorrow.day,
      sunLocalHours(tomorrow.year, tomorrow.month, tomorrow.day, true),
    );
  }
  return { night: stamp < sunrise || stamp >= sunset, nextMs: Math.max(1000, next - stamp + 1000) };
}

function readThemeChoice(): "light" | "dark" | null {
  try {
    if (typeof localStorage === "undefined") return null;
    const saved = localStorage.getItem("sky-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* private mode */
  }
  return null;
}

/** Toggles `.dark` on `<html>`. A saved choice wins; otherwise Beijing sunrise and sunset. */
export function applySkyTheme(now: Date = new Date()): SkyPhase {
  const phase = skyPhase(now);
  const choice = readThemeChoice();
  const night = choice === "dark" ? true : choice === "light" ? false : phase.night;
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", night);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", night ? "#3d342c" : "#faf7f2");
  }
  return { night, nextMs: phase.nextMs };
}

export function setThemeChoice(choice: "light" | "dark") {
  try {
    localStorage.setItem("sky-theme", choice);
  } catch {
    /* private mode */
  }
  return applySkyTheme();
}

export function beijingSunLabel(year: number, month: number, day: number) {
  const fmt = (hours: number) => {
    const total = Math.round(hours * 60);
    const h = Math.floor(total / 60) % 24;
    const m = total % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };
  return {
    sunrise: fmt(sunLocalHours(year, month, day, true)),
    sunset: fmt(sunLocalHours(year, month, day, false)),
  };
}

type BootFn = { toString(): string; name: string };
const bootFns: Array<[string, BootFn]> = [
  ["rad", rad],
  ["degFromRad", degFromRad],
  ["wrap", wrap],
  ["dayOfYear", dayOfYear],
  ["addCalendarDays", addCalendarDays],
  ["sunLocalHours", sunLocalHours],
  ["beijingParts", beijingParts],
  ["beijingInstant", beijingInstant],
  ["skyPhase", skyPhase],
  ["readThemeChoice", readThemeChoice],
  ["applySkyTheme", applySkyTheme],
];

function bootStatement(fallback: string, fn: BootFn) {
  const src = fn.toString().trim();
  if (/^function\s*\(/.test(src)) {
    const name = fn.name || fallback;
    return { name, src: src.replace(/^function\s*\(/, `function ${name}(`) };
  }
  const named = src.match(/^function\s+([A-Za-z0-9_$]+)\s*\(/);
  return { name: named?.[1] ?? fallback, src };
}

const bootParts = bootFns.map(([name, fn]) => bootStatement(name, fn));

export const skyBootScript = `(()=>{${bootParts.map((part) => part.src).join("\n")};${bootParts[bootParts.length - 1]?.name ?? "applySkyTheme"}();})();`;

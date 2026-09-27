"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { TypeIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  READING_EVENT,
  READING_KEY,
  defaultReading,
  normalizeReading,
  readReadingPrefs,
  saveReadingPrefs,
  type ReadingFont,
  type ReadingLeading,
  type ReadingPrefs,
  type ReadingSize,
  type ReadingTracking,
} from "@/lib/reading-prefs";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(READING_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(READING_EVENT, onStoreChange);
  };
}

function snapshot() {
  return localStorage.getItem(READING_KEY) ?? "";
}

export function ReadingMenu() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => "");
  const prefs = prefsFromRaw(raw);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function update(patch: Partial<ReadingPrefs>) {
    saveReadingPrefs({ ...readReadingPrefs(), ...patch });
  }

  return (
    <div ref={rootRef} className="relative z-50">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="调整字体和间距"
        onClick={() => setOpen((value) => !value)}
        className="flex size-7 items-center justify-center rounded-full border border-border bg-background text-foreground"
      >
        <TypeIcon className="size-3.5" />
      </button>
      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label="阅读排版"
          className="absolute top-[calc(100%+0.5rem)] right-0 w-64 rounded-xl border bg-popover p-3 text-popover-foreground shadow-lg"
        >
          <p className="px-1 text-xs font-semibold tracking-[0.16em] text-muted-foreground">阅读排版</p>
          <p
            className="mt-2 px-1"
            style={{
              fontFamily: prefs.font === "serif" ? "var(--font-serif), Songti SC, serif" : undefined,
              fontSize: prefs.size === "sm" ? "13px" : prefs.size === "lg" ? "16px" : prefs.size === "xl" ? "18px" : "14px",
              lineHeight: prefs.leading === "tight" ? 1.65 : prefs.leading === "loose" ? 2.2 : 1.9,
              letterSpacing: prefs.tracking === "tight" ? "-0.02em" : prefs.tracking === "wide" ? "0.08em" : "0",
            }}
          >
            水中月，疏影横斜。
          </p>
          <Choice
            label="字体"
            value={prefs.font}
            options={[
              ["sans", "黑体"],
              ["serif", "宋体"],
            ]}
            onChange={(font) => update({ font: font as ReadingFont })}
          />
          <Choice
            label="字号"
            value={prefs.size}
            options={[
              ["sm", "小"],
              ["md", "标准"],
              ["lg", "大"],
              ["xl", "特大"],
            ]}
            onChange={(size) => update({ size: size as ReadingSize })}
          />
          <Choice
            label="行距"
            value={prefs.leading}
            options={[
              ["tight", "紧"],
              ["md", "标准"],
              ["loose", "松"],
            ]}
            onChange={(leading) => update({ leading: leading as ReadingLeading })}
          />
          <Choice
            label="字距"
            value={prefs.tracking}
            options={[
              ["tight", "紧"],
              ["md", "标准"],
              ["wide", "松"],
            ]}
            onChange={(tracking) => update({ tracking: tracking as ReadingTracking })}
          />
          <button
            type="button"
            onClick={() => saveReadingPrefs(defaultReading)}
            className="mt-3 w-full rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            恢复默认
          </button>
        </div>
      ) : null}
    </div>
  );
}

function prefsFromRaw(raw: string): ReadingPrefs {
  if (!raw) return defaultReading;
  try {
    return normalizeReading(JSON.parse(raw) as Partial<ReadingPrefs>);
  } catch {
    return defaultReading;
  }
}

function Choice({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<[string, string]>;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mt-3">
      <p className="px-1 text-xs text-muted-foreground">{label}</p>
      <div className="mt-1 flex rounded-lg bg-muted p-0.5">
        {options.map(([id, name]) => (
          <button
            key={id}
            type="button"
            aria-pressed={value === id}
            onClick={() => onChange(id)}
            className={cn(
              "flex-1 rounded-md px-1 py-1 text-xs",
              value === id ? "bg-background font-semibold text-foreground shadow-sm" : "text-muted-foreground",
            )}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}

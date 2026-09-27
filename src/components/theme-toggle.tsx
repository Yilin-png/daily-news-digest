"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { setThemeChoice } from "@/lib/beijing-sky";

function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  window.addEventListener("storage", onStoreChange);
  return () => {
    observer.disconnect();
    window.removeEventListener("storage", onStoreChange);
  };
}

function snapshot() {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeToggle() {
  const mode = useSyncExternalStore(subscribe, snapshot, () => "light");
  const dark = mode === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={dark ? "深色模式，点击切换浅色" : "浅色模式，点击切换深色"}
      onClick={() => setThemeChoice(dark ? "light" : "dark")}
      className="relative h-7 w-12 shrink-0 rounded-full border border-border bg-muted"
    >
      <span
        className={
          "absolute top-0.5 flex size-5 items-center justify-center rounded-full bg-background text-foreground shadow-sm transition-transform " +
          (dark ? "translate-x-6" : "translate-x-0.5")
        }
      >
        {dark ? <MoonIcon className="size-3" /> : <SunIcon className="size-3" />}
      </span>
    </button>
  );
}

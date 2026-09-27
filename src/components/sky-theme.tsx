"use client";

import { useEffect } from "react";
import { applySkyTheme } from "@/lib/beijing-sky";

/** Keeps the theme in step with the next Beijing sunrise or sunset. */
export function SkyTheme() {
  useEffect(() => {
    let timer = 0;
    const arm = () => {
      window.clearTimeout(timer);
      const { nextMs } = applySkyTheme();
      timer = window.setTimeout(arm, Math.min(nextMs, 2_147_000_000));
    };
    arm();
    const onVisible = () => {
      if (document.visibilityState === "visible") arm();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);
  return null;
}

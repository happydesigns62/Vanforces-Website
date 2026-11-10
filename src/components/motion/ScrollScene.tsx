"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { sceneProgress, subscribeScroll, type SceneMode } from "./scroll";

/**
 * Wraps content and keeps a CSS variable, `--p`, between 0 and 1 as the wrapper scrolls through the screen.
 * The look itself lives in CSS (the `scene-*` classes), so only transform and opacity ever change.
 * With reduced motion, `--p` is fixed at the finished state, and nothing moves.
 */
export function ScrollScene({
  mode = "entry",
  className = "",
  children,
}: {
  mode?: SceneMode;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      element.style.setProperty("--p", mode === "exit" ? "0" : "1");
      return;
    }
    return subscribeScroll(() => {
      element.style.setProperty("--p", sceneProgress(element, mode).toFixed(4));
    });
  }, [mode]);

  return (
    <div ref={ref} className={`scene ${className}`} suppressHydrationWarning>
      {children}
    </div>
  );
}

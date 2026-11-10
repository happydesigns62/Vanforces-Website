"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { setScrollEngine } from "./scroll";

/**
 * Gentle, eased page scrolling. It is switched off for visitors who ask their device for reduced motion,
 * and touch screens keep their own native scrolling. Anchor links glide to their target below the sticky header.
 * Anything that scrolls on its own (like the mobile menu) opts out with a `data-lenis-prevent` attribute.
 */
export function SmoothScroll() {
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;

    const start = () => {
      if (lenis || query.matches) return;
      lenis = new Lenis({ autoRaf: true, lerp: 0.1, wheelMultiplier: 0.95, anchors: { offset: -96 } });
      setScrollEngine(lenis);
    };
    const stop = () => {
      lenis?.destroy();
      lenis = null;
      setScrollEngine(null);
    };
    const onChange = () => (query.matches ? stop() : start());

    start();
    query.addEventListener("change", onChange);
    return () => {
      query.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  return null;
}

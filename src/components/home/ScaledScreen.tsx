"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Shows a screen built at a fixed design size, scaled to fit whatever width it is given. Because the screen is made of real text
 * and shapes, it stays sharp at any size and when zoomed. It is hidden for screen readers, and described by `label` instead.
 */
export function ScaledScreen({ width, height, label, className = "", children }: { width: number; height: number; label: string; className?: string; children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setScale(el.clientWidth / width));
    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div ref={box} role="img" aria-label={label} className={`relative w-full overflow-hidden ${className}`} style={{ height: height * scale, opacity: scale ? 1 : 0 } as CSSProperties}>
      <div aria-hidden="true" style={{ width, height, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        {children}
      </div>
    </div>
  );
}

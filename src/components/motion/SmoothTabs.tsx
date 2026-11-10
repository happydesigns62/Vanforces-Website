"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type TabItem = { id: string; label: string; panel: ReactNode };

/**
 * Accessible tabs with a sliding indicator. All panels share one grid cell, so the layout
 * height stays stable and switching only fades content in place.
 */
export function SmoothTabs({ items, label, className = "" }: { items: TabItem[]; label: string; className?: string }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  const placeIndicator = useCallback(() => {
    const button = buttonRefs.current[active];
    const indicator = indicatorRef.current;
    if (!button || !indicator) return;
    indicator.style.width = `${button.offsetWidth}px`;
    indicator.style.height = `${button.offsetHeight}px`;
    indicator.style.transform = `translate3d(${button.offsetLeft}px, ${button.offsetTop}px, 0)`;
    indicator.style.opacity = "1";
  }, [active]);

  useEffect(() => {
    placeIndicator();
    const list = listRef.current;
    const button = buttonRefs.current[active];
    if (list && button && list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: button.offsetLeft - 16, behavior: "smooth" });
    }
    const observer = new ResizeObserver(placeIndicator);
    if (list) observer.observe(list);
    return () => observer.disconnect();
  }, [active, placeIndicator]);

  function onKeyDown(event: KeyboardEvent) {
    const last = items.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (event.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next !== null) {
      event.preventDefault();
      setActive(next);
      buttonRefs.current[next]?.focus();
    }
  }

  return (
    <div className={className}>
      <div
        ref={listRef}
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="no-scrollbar relative -mx-5 flex gap-1 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:justify-center md:px-0"
      >
        <span
          ref={indicatorRef}
          aria-hidden="true"
          className="absolute left-0 top-0 rounded-full bg-navy opacity-0 transition-[transform,width,height] duration-500 ease-[var(--ease-soft)]"
        />
        {items.map((item, index) => (
          <button
            key={item.id}
            ref={(node) => {
              buttonRefs.current[index] = node;
            }}
            id={`${baseId}-tab-${item.id}`}
            role="tab"
            type="button"
            aria-selected={active === index}
            aria-controls={`${baseId}-panel-${item.id}`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            className={`relative z-10 min-h-11 shrink-0 cursor-pointer whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
              active === index ? "text-white" : "text-muted hover:text-navy"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-10 grid">
        {items.map((item, index) => (
          <div
            key={item.id}
            id={`${baseId}-panel-${item.id}`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${item.id}`}
            inert={active !== index}
            className={`col-start-1 row-start-1 min-w-0 transition-[opacity,transform,visibility] duration-500 ease-[var(--ease-soft)] ${
              active === index ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"
            }`}
          >
            {item.panel}
          </div>
        ))}
      </div>
    </div>
  );
}

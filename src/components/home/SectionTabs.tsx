"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";

/**
 * Two or more sections that share the same space on the page, switched by tabs. Every panel is rendered on the server and only
 * hidden here, so none is hidden from search or loaded late. Used to keep the home page from getting longer.
 */
export function SectionTabs({ label, tabs }: { label: string; tabs: { label: string; panel: ReactNode }[] }) {
  const [active, setActive] = useState(0);
  const id = useId();

  function onKeyDown(event: KeyboardEvent) {
    let next: number | null = null;
    if (event.key === "ArrowRight") next = (active + 1) % tabs.length;
    if (event.key === "ArrowLeft") next = (active - 1 + tabs.length) % tabs.length;
    if (next !== null) {
      event.preventDefault();
      setActive(next);
      document.getElementById(`${id}-tab-${next}`)?.focus();
    }
  }

  return (
    <div className="bg-mist">
      <div className="wrap flex justify-center pt-16 md:pt-24">
        <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className="inline-flex max-w-full gap-1.5 overflow-x-auto rounded-full bg-white p-1.5 shadow-[0_1px_2px_rgb(41_59_71/0.06)]">
          {tabs.map((tab, index) => {
            const selected = index === active;
            return (
              <button
                key={tab.label}
                type="button"
                role="tab"
                id={`${id}-tab-${index}`}
                aria-selected={selected}
                aria-controls={`${id}-panel-${index}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                className={`min-h-11 shrink-0 cursor-pointer rounded-full px-5 py-2 text-[14.5px] font-semibold transition-colors duration-300 ${selected ? "bg-navy-deep text-white" : "text-muted hover:text-navy-deep"}`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      {tabs.map((tab, index) => (
        <div key={tab.label} id={`${id}-panel-${index}`} role="tabpanel" aria-labelledby={`${id}-tab-${index}`} hidden={index !== active}>
          {tab.panel}
        </div>
      ))}
    </div>
  );
}

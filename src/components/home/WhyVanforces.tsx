"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";

const tabs = ["Business value", "How we compare"] as const;

/**
 * One section with two tabs, so Business Value and the BeatRoute comparison share the same space on the page. Both panels
 * are rendered on the server and switched here, so neither is hidden from search or loaded late.
 */
export function WhyVanforces({ value, compare }: { value: ReactNode; compare: ReactNode }) {
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
    <div>
      <div className="wrap flex justify-center pt-16 md:pt-24">
        <div role="tablist" aria-label="Why Vanforces" onKeyDown={onKeyDown} className="inline-flex gap-1.5 rounded-full bg-mist p-1.5">
          {tabs.map((label, index) => {
            const selected = index === active;
            return (
              <button
                key={label}
                type="button"
                role="tab"
                id={`${id}-tab-${index}`}
                aria-selected={selected}
                aria-controls={`${id}-panel-${index}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                className={`min-h-11 cursor-pointer rounded-full px-5 py-2 text-[14.5px] font-semibold transition-colors duration-300 ${selected ? "bg-navy-deep text-white" : "text-muted hover:text-navy-deep"}`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
      <div id={`${id}-panel-0`} role="tabpanel" aria-labelledby={`${id}-tab-0`} hidden={active !== 0}>
        {value}
      </div>
      <div id={`${id}-panel-1`} role="tabpanel" aria-labelledby={`${id}-tab-1`} hidden={active !== 1}>
        {compare}
      </div>
    </div>
  );
}

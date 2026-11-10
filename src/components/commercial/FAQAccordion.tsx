"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";
import type { Faq } from "@/data/modules";

/** Accessible accordion. The grid-row technique animates height without layout measuring. */
export function FAQAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="border-t border-line">
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-q${index}`;
        const panelId = `${baseId}-a${index}`;
        return (
          <div key={item.q} className="border-b border-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-6 py-4 text-left text-[17px] font-semibold transition-colors hover:text-teal-deep"
              >
                {item.q}
                <Plus aria-hidden="true" size={20} className={`shrink-0 text-teal-deep transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-soft)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <p className="body max-w-3xl pb-5">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FaqSection({ items, title = "Frequently asked questions" }: { items: Faq[]; title?: string }) {
  return (
    <section className="section-tight">
      <div className="wrap grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        <h2 className="t-section !text-[clamp(1.75rem,1.5rem+1vw,2.5rem)]">{title}</h2>
        <FAQAccordion items={items} />
      </div>
    </section>
  );
}

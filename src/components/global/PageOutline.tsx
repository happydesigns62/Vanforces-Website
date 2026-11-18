"use client";

import { useEffect, useState, type CSSProperties } from "react";

type Item = { id: string; text: string };

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);

/**
 * An "On this page" card for the editorial hero. It lists the page's own section headings, so it is always accurate and never invented.
 * It appears only on wide screens, and only when the page has at least three headings. Each heading gets an id, so the links jump to it.
 */
export function PageOutline() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const heads = [...document.querySelectorAll<HTMLElement>("main h2")].filter((h) => (h.textContent ?? "").trim().length > 2);
      const used = new Set<string>();
      const list: Item[] = heads.slice(0, 7).map((h, i) => {
        let id = h.id || slug(h.textContent ?? "") || `section-${i}`;
        while (used.has(id)) id += "-x";
        used.add(id);
        h.id = id;
        return { id, text: (h.textContent ?? "").replace(/\s+/g, " ").trim() };
      });
      setItems(list.length >= 3 ? list : []);
    }, 400);
    return () => window.clearTimeout(timer);
  }, []);

  if (items.length === 0) return null;
  return (
    <nav
      aria-label="On this page"
      className="seq-shot hidden rounded-[24px] border border-cyan-line bg-white/80 p-6 shadow-[0_24px_50px_-36px_rgb(8_60_66/0.4)] backdrop-blur lg:block"
      style={{ "--d": "260ms" } as CSSProperties}
    >
      <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-teal-deep">On this page</p>
      <ol className="mt-4 space-y-1">
        {items.map((it, i) => (
          <li key={it.id}>
            <a href={`#${it.id}`} className="group flex items-start gap-3 rounded-xl px-2 py-2 text-[14px] leading-snug text-navy transition-colors hover:bg-cyan-soft hover:text-navy-deep">
              <span className="mt-px w-5 shrink-0 text-[12px] font-semibold tabular-nums text-teal-deep/70">{String(i + 1).padStart(2, "0")}</span>
              {it.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

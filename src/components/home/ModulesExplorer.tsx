"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useId, useState, type KeyboardEvent } from "react";
import { moduleFamilies } from "@/data/module-families";

/**
 * The platform as three families of modules. Three large selector cards (SFA, DMS, REM) sit on top, and the chosen family's
 * modules open underneath as a grid of cards, each with its own icon. Every module is shown the same way. A module links to
 * its page where the site has one. The grid is plain text and links, so it reads well on a phone.
 */
export function ModulesExplorer() {
  const [active, setActive] = useState(0);
  const id = useId();
  const family = moduleFamilies[active];

  function onKeyDown(event: KeyboardEvent) {
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (active + 1) % moduleFamilies.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (active - 1 + moduleFamilies.length) % moduleFamilies.length;
    if (next !== null) {
      event.preventDefault();
      setActive(next);
      document.getElementById(`${id}-tab-${moduleFamilies[next].id}`)?.focus();
    }
  }

  return (
    <div className="mt-14 md:mt-16">
      <div role="tablist" aria-label="Vanforces module families" onKeyDown={onKeyDown} className="grid gap-3 md:grid-cols-3">
        {moduleFamilies.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`${id}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              className={`group flex cursor-pointer items-center gap-4 rounded-[24px] border p-4 text-left transition-[background-color,border-color,box-shadow,transform] duration-300 sm:p-5 ${
                selected ? "border-cyan-line bg-white shadow-[0_24px_50px_-30px_rgb(8_60_66/0.45)]" : "border-transparent bg-white/60 hover:bg-white"
              }`}
            >
              <span className={`flex size-14 shrink-0 items-center justify-center rounded-2xl text-[15px] font-bold tracking-wide ${item.tile} ${selected ? "scale-100" : "scale-95 opacity-85"} transition-transform duration-300`}>{item.code}</span>
              <span className="min-w-0">
                <span className="block text-[1.0625rem] font-semibold leading-snug text-navy-deep">{item.name}</span>
                <span className="mt-0.5 block text-[13.5px] leading-snug text-muted">{item.modules.length} modules</span>
              </span>
            </button>
          );
        })}
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${family.id}`} className="mt-4 rounded-[28px] bg-white p-4 shadow-[0_1px_2px_rgb(41_59_71/0.05),0_30px_60px_-44px_rgb(8_60_66/0.35)] sm:p-6 lg:p-8">
        <p className="px-1 pb-5 text-[1.0625rem] leading-relaxed text-muted sm:text-[1.125rem]">{family.line}</p>
        <ul key={family.id} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {family.modules.map((module, index) => {
            const Icon = module.icon;
            const body = (
              <>
                <span aria-hidden="true" className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${family.chip}`}>
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-start justify-between gap-2">
                    <span className="text-[15.5px] font-semibold leading-snug text-navy-deep">{module.name}</span>
                    {module.href ? <ArrowUpRight aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-muted transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-deep" /> : null}
                  </span>
                  <span className="mt-1 block text-[14px] leading-relaxed text-muted">{module.line}</span>
                </span>
              </>
            );
            const classes = "group flex items-start gap-3.5 rounded-2xl border border-line bg-mist/50 p-4 transition-[background-color,border-color,transform,box-shadow] duration-300";
            return (
              <li key={module.name} className="module-in" style={{ animationDelay: `${index * 40}ms` }}>
                {module.href ? (
                  <Link href={module.href} className={`${classes} h-full hover:-translate-y-0.5 hover:border-cyan-line hover:bg-white hover:shadow-lift`}>
                    {body}
                  </Link>
                ) : (
                  <div className={`${classes} h-full`}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

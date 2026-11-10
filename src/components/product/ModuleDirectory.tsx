"use client";

import { useState } from "react";
import { moduleDirectory } from "@/data/modules";
import { ModuleCard } from "./Cards";

/** Interactive module directory with a category filter. */
export function ModuleDirectory() {
  const [active, setActive] = useState<string>("All");
  const filters = ["All", ...moduleDirectory.map((group) => group.category)];
  const groups = active === "All" ? moduleDirectory : moduleDirectory.filter((group) => group.category === active);

  return (
    <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
      <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
        <div role="group" aria-label="Filter modules by category" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:gap-1 lg:px-0">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              aria-pressed={active === filter}
              onClick={() => setActive(filter)}
              className={`min-h-11 shrink-0 cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-left text-[14.5px] font-semibold transition-colors lg:rounded-xl ${
                active === filter ? "bg-navy-deep text-white" : "bg-mist text-muted hover:text-navy lg:bg-transparent lg:hover:bg-mist"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className="min-w-0 space-y-12">
        {groups.map((group) => (
          <section key={group.category} className="seq">
            <h2 className="t-card !text-[22px]">{group.category}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {group.items.map((item) => (
                <ModuleCard key={item.label} title={item.label} body={item.body} href={item.href} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

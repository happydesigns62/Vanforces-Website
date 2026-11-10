"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, ClipboardList, HandCoins, Package, ShoppingCart, Truck } from "lucide-react";
import { useState } from "react";
import { Mascot } from "@/components/global/Mascot";
import type { ArtKey } from "@/data/media";

const stages: { name: string; icon: typeof ClipboardList; mascot: ArtKey; body: string; detail: string; href: string; link: string }[] = [
  { name: "PLAN", icon: ClipboardList, mascot: "location", body: "Prepare routes, visits and targets.", detail: "The day begins before the first stop, with journeys assigned and customers ready.", href: "/platform/routes", link: "Routes" },
  { name: "STOCK", icon: Package, mascot: "supplyChain", body: "Load and manage inventory.", detail: "Warehouse teams prepare products, and vehicle loads become the stock field teams sell from.", href: "/platform/inventory", link: "Inventory" },
  { name: "SELL", icon: ShoppingCart, mascot: "business", body: "Visit customers, take orders and invoice.", detail: "Field users work with customer context and create the applicable documents at the stop.", href: "/platform/field-sales", link: "Field Sales" },
  { name: "DELIVER", icon: Truck, mascot: "operations", body: "Move orders to customers.", detail: "Delivery activity stays alongside the order, including any differences in actual quantities.", href: "/platform/delivery", link: "Delivery" },
  { name: "COLLECT", icon: HandCoins, mascot: "review", body: "Record payments and manage outstanding balances.", detail: "Applicable payments are recorded against the customer and reviewed through settlements.", href: "/platform/collections", link: "Collections" },
  { name: "ANALYSE", icon: BarChart3, mascot: "inspector", body: "Understand the day's performance.", detail: "Connected records become the views managers use to plan what happens next.", href: "/business-command-center", link: "Business Command Center" },
];

export function ConnectedJourney() {
  const [active, setActive] = useState(0);
  const current = stages[active];
  const progress = (active / (stages.length - 1)) * 100;

  return (
    <div>
      <div className="relative">
        {/* Connection line that follows the selected stage on wide screens. */}
        <div aria-hidden="true" className="absolute left-[8.33%] right-[8.33%] top-7 hidden h-0.5 bg-line lg:block">
          <div className="h-full origin-left bg-teal transition-transform duration-700 ease-[var(--ease-soft)]" style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
        <ol className="relative grid grid-cols-1 gap-1 lg:grid-cols-6 lg:gap-0">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const selected = index === active;
            const reached = index <= active;
            return (
              <li key={stage.name} data-reveal="" suppressHydrationWarning style={{ "--d": `${index * 90}ms` } as React.CSSProperties}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                  className={`flex w-full cursor-pointer items-center gap-4 rounded-[24px] p-3 text-left transition-colors lg:flex-col lg:gap-3 lg:bg-transparent lg:p-0 lg:text-center ${selected ? "bg-cyan-soft" : "hover:bg-mist lg:hover:bg-transparent"}`}
                >
                  <span
                    className={`relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border-2 transition-[background-color,border-color,color,transform] duration-500 ease-[var(--ease-soft)] ${
                      selected ? "scale-110 border-teal bg-teal text-navy-deep" : reached ? "border-teal bg-white text-teal-deep" : "border-line bg-white text-muted"
                    }`}
                  >
                    <Icon aria-hidden="true" size={22} />
                  </span>
                  <span>
                    <span className="block text-[13px] font-extrabold tracking-[0.12em]">{stage.name}</span>
                    <span className="mt-1 block text-[14px] leading-snug text-muted lg:mx-auto lg:max-w-[170px]">{stage.body}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div aria-live="polite" className="mt-10 flex flex-col justify-between gap-4 rounded-[24px] border border-line bg-white p-6 md:flex-row md:items-center md:p-8">
        <div key={current.name} className="seq flex items-center gap-5 md:gap-7">
          <Mascot name={current.mascot} sizes="130px" className="w-24 shrink-0 md:w-32" />
          <div>
            <p className="eyebrow">{current.name}</p>
            <p className="mt-2 max-w-2xl text-[17px] leading-relaxed">{current.detail}</p>
          </div>
        </div>
        <Link href={current.href} className="link-arrow inline-flex shrink-0 items-center gap-1.5 text-[15px] font-semibold text-teal-deep hover:text-navy">
          Explore {current.link} <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { BarChart3, Package, Route as RouteIcon, Users, Wallet, type LucideIcon } from "lucide-react";
import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Button } from "@/components/global/Button";
import { Vignette, type VignetteKind } from "@/components/illustration/Vignettes";
import { clamp01, scrollToY, subscribeScroll } from "@/components/motion/scroll";
import type { CSSProperties } from "react";
import { phone as phones, web as webs, type ArtKey, type PhoneKey, type WebKey } from "@/data/media";

type Visual = { kind: "web"; shot: WebKey } | { kind: "phone"; shot: PhoneKey };

type Area = {
  id: string;
  label: string;
  heading: string;
  items: string[];
  href: string;
  icon: LucideIcon;
  /** Soft tile colour from the accent family. Written out in full so the styles are generated. */
  tile: string;
  visual: Visual;
  /** Plain name of the real screen shown, so the picture is always described honestly. */
  caption: string;
  /** The small illustrated scene shown under the open item. */
  scene: VignetteKind;
  /** The mascot that belongs to this area of work. */
  mascot: ArtKey;
};

// Content is the existing homepage content. Each area keeps one screen, so the stage never feels crowded.
const areas: Area[] = [
  {
    id: "sales",
    label: "Sales & Customers",
    heading: "Walk Into Every Visit Prepared.",
    items: ["Customers", "Pricing", "Orders", "Invoices"],
    href: "/platform/customers",
    icon: Users,
    tile: "bg-accent-blue text-white",
    visual: { kind: "web", shot: "products" },
    caption: "Product list",
    scene: "sell",
    mascot: "business",
  },
  {
    id: "routes",
    label: "Routes & Field Operations",
    heading: "Know the Next Stop. Make Every Visit Count.",
    items: ["Journey Planning", "Customer Visits", "Route Progress"],
    href: "/platform/routes",
    icon: RouteIcon,
    tile: "bg-teal-deep text-white",
    visual: { kind: "phone", shot: "route" },
    caption: "Route Journey Plan, mobile app",
    scene: "deliver",
    mascot: "location",
  },
  {
    id: "inventory",
    label: "Inventory & Delivery",
    heading: "From Warehouse Loading to Customer Handover.",
    items: ["Warehouse Stock", "Van Inventory", "Deliveries"],
    href: "/platform/inventory",
    icon: Package,
    tile: "bg-accent-green text-white",
    visual: { kind: "phone", shot: "transactions" },
    caption: "Transaction menu, mobile app",
    scene: "stock",
    mascot: "supplyChain",
  },
  {
    id: "finance",
    label: "Finance & Collections",
    heading: "Know What's Due Before the Next Conversation.",
    items: ["Customer Balances", "Collections", "Settlements"],
    href: "/platform/collections",
    icon: Wallet,
    tile: "bg-accent-orange text-white",
    visual: { kind: "web", shot: "cxoTrends" },
    caption: "Sales and collection trends",
    scene: "collect",
    mascot: "review",
  },
  {
    id: "planning",
    label: "Planning & Performance",
    heading: "Give the Day a Direction. See How It Went.",
    items: ["Targets", "Daily Readiness", "Reports"],
    href: "/platform/intelligence",
    icon: BarChart3,
    tile: "bg-accent-violet text-white",
    visual: { kind: "web", shot: "heroDashboard" },
    caption: "Dashboard",
    scene: "analyse",
    mascot: "confirm",
  },
];

/**
 * A real screen that assembles itself: the same picture is cut into horizontal bands, and the bands arrive from top to
 * bottom, so the top tiles land first, then the charts, then the tables. Once built, the bands line up into the whole screen.
 */
function BuildBands({ src, alt, sizes, bands, className }: { src: string; alt: string; sizes: string; bands: number; className?: string }) {
  return (
    <>
      {Array.from({ length: bands }, (_, band) => (
        <div
          key={band}
          className="build-band absolute inset-0"
          style={{ clipPath: `inset(${Math.max(0, (band / bands) * 100 - 0.2)}% 0 ${Math.max(0, 100 - ((band + 1) / bands) * 100 - 0.2)}% 0)`, "--i": band } as CSSProperties}
        >
          <Image src={src} alt={band === 0 ? alt : ""} fill sizes={sizes} className={className} />
        </div>
      ))}
    </>
  );
}

/** How much scrolling each area gets while the stage is pinned, as a share of the screen height. */
const STEP_VH = 40;
/** Distance from the top of the screen at which the pinned block sits. Matches `top-24`. */
const PIN_TOP = 96;

/**
 * Explore Vanforces. On wide screens the list and the stage stay pinned while the page scrolls, and the scroll steps
 * through the five areas one by one. Choosing an area scrolls to its step. On phones, tablets held upright and for
 * visitors who prefer less motion, nothing is pinned and the list simply works by tapping.
 */
export function ExploreShowcase({ intro }: { intro: ReactNode }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const activeRef = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  // The first screen builds when the stage scrolls into view, not while it is still off screen.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    return subscribeScroll(() => {
      const track = trackRef.current;
      const pin = pinRef.current;
      const fill = fillRef.current;
      if (!track || !pin) return;
      if (!wide.matches || calm.matches) {
        if (fill) fill.style.transform = `scaleY(${(activeRef.current + 1) / areas.length})`;
        return;
      }
      const rect = track.getBoundingClientRect();
      const range = Math.max(rect.height - pin.offsetHeight, 1);
      const progress = clamp01((PIN_TOP - rect.top) / range);
      if (fill) fill.style.transform = `scaleY(${progress})`;
      const next = Math.min(areas.length - 1, Math.floor(progress * areas.length));
      if (next !== activeRef.current) {
        activeRef.current = next;
        setActive(next);
      }
    });
  }, []);

  function choose(index: number) {
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const track = trackRef.current;
    const pin = pinRef.current;
    if (wide && !calm && track && pin) {
      const top = track.getBoundingClientRect().top + window.scrollY;
      const range = Math.max(track.offsetHeight - pin.offsetHeight, 1);
      scrollToY(top - PIN_TOP + ((index + 0.5) / areas.length) * range);
    } else {
      activeRef.current = index;
      setActive(index);
    }
  }

  function onKeyDown(event: KeyboardEvent) {
    const last = areas.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowDown") next = active === last ? 0 : active + 1;
    if (event.key === "ArrowUp") next = active === 0 ? last : active - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next !== null) {
      event.preventDefault();
      choose(next);
      document.getElementById(`${id}-tab-${areas[next].id}`)?.focus();
    }
  }

  return (
    <div>
      {intro}
      <div
        ref={trackRef}
        style={{ "--pin": "min(600px, calc(100vh - 8rem))", "--track": `calc(var(--pin) + ${(areas.length - 1) * STEP_VH}vh)` } as React.CSSProperties}
        className="mt-10 lg:mt-14 lg:motion-safe:h-[var(--track)]"
      >
        <div ref={pinRef} className="grid items-center gap-12 lg:motion-safe:sticky lg:motion-safe:top-24 lg:motion-safe:h-[var(--pin)] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
          <div className="relative">
            {/* Progress line, running down behind the icon tiles. */}
            <span aria-hidden="true" className="absolute bottom-8 left-5 top-8 hidden w-px bg-line lg:block">
              <span ref={fillRef} className="block h-full origin-top bg-teal" style={{ transform: "scaleY(0.2)" }} />
            </span>
            <div role="tablist" aria-orientation="vertical" aria-label="Explore Vanforces by area of work" onKeyDown={onKeyDown} className="border-b border-line">
              {areas.map((area, index) => {
                const selected = index === active;
                const Icon = area.icon;
                return (
                  <div key={area.id} className="border-t border-line">
                    <button
                      type="button"
                      role="tab"
                      id={`${id}-tab-${area.id}`}
                      aria-selected={selected}
                      aria-controls={`${id}-stage`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => choose(index)}
                      className="group relative flex min-h-[64px] w-full cursor-pointer items-center gap-4 py-3 text-left"
                    >
                      <span
                        className={`relative flex size-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-500 ease-[var(--ease-soft)] ${area.tile} ${selected ? "scale-100" : "scale-90 opacity-80 group-hover:scale-95"}`}
                      >
                        <Icon aria-hidden="true" size={19} strokeWidth={1.9} />
                      </span>
                      <span className={`text-[1.0625rem] font-semibold transition-colors duration-300 ${selected ? "text-navy-deep" : "text-muted group-hover:text-navy"}`}>
                        {area.label}
                      </span>
                    </button>
                    <div
                      aria-hidden={!selected}
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-soft)] ${selected ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-6 pl-14" inert={!selected}>
                          <p className="max-w-[26rem] text-[1.375rem] font-medium leading-[1.25] tracking-[-0.025em] text-navy-deep">{area.heading}</p>
                          <p className="mt-3 text-[15px] leading-relaxed text-muted">{area.items.join("  ·  ")}</p>
                          <Vignette kind={area.scene} className="mt-3 h-[66px] w-[96px]" />
                          <Button href={area.href} variant="text" className="mt-2">
                            See {area.label}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div id={`${id}-stage`} role="tabpanel" aria-labelledby={`${id}-tab-${areas[active].id}`}>
            <div ref={stageRef} className="stage-soft relative aspect-[4/4.6] overflow-hidden rounded-[28px] border border-cyan-line sm:aspect-[16/12.5]">
              {areas.map((area, index) => {
                const selected = index === active;
                return (
                  <div
                    key={area.id}
                    aria-hidden={!selected}
                    inert={!selected}
                    className={`absolute inset-0 transition-opacity duration-500 ease-[var(--ease-soft)] ${selected ? "opacity-100" : "opacity-0"} ${selected && seen ? "is-built" : ""}`}
                  >
                    {/* One screen, centred in the stage. The caption sits centred under it. */}
                    <div className="absolute inset-x-[6%] bottom-[15%] top-[6%] flex items-center justify-center">
                      {area.visual.kind === "web" ? (
                        <figure className="w-full overflow-hidden rounded-[14px] border border-line bg-white shadow-[0_40px_80px_-30px_rgb(8_60_66/0.45),0_8px_20px_-10px_rgb(8_60_66/0.25)]">
                          <div aria-hidden="true" className="flex h-9 items-center gap-1.5 border-b border-line bg-mist px-3.5">
                            <span className="size-2.5 rounded-full bg-line" />
                            <span className="size-2.5 rounded-full bg-line" />
                            <span className="size-2.5 rounded-full bg-line" />
                            <span className="ml-3 truncate rounded-md bg-white px-3 py-0.5 text-[11px] font-medium text-muted">{webs[area.visual.shot].title}</span>
                          </div>
                          <div className="relative bg-white" style={{ aspectRatio: `${webs[area.visual.shot].width} / ${webs[area.visual.shot].height}` }}>
                            <BuildBands src={webs[area.visual.shot].src} alt={webs[area.visual.shot].alt} sizes="(max-width: 1024px) 90vw, 600px" bands={4} className="object-cover object-left-top" />
                          </div>
                        </figure>
                      ) : (
                        <>
                          <span aria-hidden="true" className="capsule left-[-4%] top-[28%] h-[44%] w-[108%] border border-white/70 bg-white/50" />
                          <figure className="relative aspect-[720/1456] h-full rounded-[28px] bg-navy-deep p-[6px] shadow-[0_40px_80px_-30px_rgb(8_60_66/0.55)]">
                            <div className="relative h-full overflow-hidden rounded-[22px] bg-white">
                              <BuildBands src={phones[area.visual.shot].src} alt={phones[area.visual.shot].alt} sizes="280px" bands={5} className="object-cover object-top" />
                            </div>
                          </figure>
                        </>
                      )}
                    </div>
                    <p className="absolute bottom-[5%] left-1/2 max-w-[90%] -translate-x-1/2 whitespace-nowrap rounded-full bg-white/90 px-3.5 py-1 text-[12px] font-medium leading-snug text-navy/80 shadow-[0_1px_2px_rgb(41_59_71/0.08)]">
                      Screen shown: {area.caption}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


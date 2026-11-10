"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, ClipboardList, HandCoins, Package, ShoppingCart, Truck, type LucideIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Mascot } from "@/components/global/Mascot";
import { Vignette, type VignetteKind } from "@/components/illustration/Vignettes";

type Stage = {
  name: string;
  icon: LucideIcon;
  /** Accent classes, written out in full so the styles are generated. */
  dot: string;
  tile: string;
  text: string;
  body: string;
  detail: string;
  href: string;
  link: string;
  scene: VignetteKind;
};

// Content is the existing Connected Journey content. Colours follow the approved accent family, cool to warm, as solid tiles.
const stages: Stage[] = [
  { name: "Plan", icon: ClipboardList, dot: "bg-teal", tile: "bg-teal-deep text-white", text: "text-teal-deep", body: "Prepare routes, visits and targets.", detail: "The day begins before the first stop, with journeys assigned and customers ready.", href: "/platform/routes", link: "Routes", scene: "plan" },
  { name: "Stock", icon: Package, dot: "bg-accent-green", tile: "bg-accent-green text-white", text: "text-accent-green-deep", body: "Load and manage inventory.", detail: "Warehouse teams prepare products, and vehicle loads become the stock field teams sell from.", href: "/platform/inventory", link: "Inventory", scene: "stock" },
  { name: "Sell", icon: ShoppingCart, dot: "bg-accent-blue", tile: "bg-accent-blue text-white", text: "text-accent-blue-deep", body: "Visit customers, take orders and invoice.", detail: "Field users work with customer context and create the applicable documents at the stop.", href: "/platform/field-sales", link: "Field Sales", scene: "sell" },
  { name: "Deliver", icon: Truck, dot: "bg-accent-amber", tile: "bg-accent-amber text-navy-deep", text: "text-accent-amber-deep", body: "Move orders to customers.", detail: "Delivery activity stays alongside the order, including any differences in actual quantities.", href: "/platform/delivery", link: "Delivery", scene: "deliver" },
  { name: "Collect", icon: HandCoins, dot: "bg-accent-orange", tile: "bg-accent-orange text-white", text: "text-accent-orange-deep", body: "Record payments and manage outstanding balances.", detail: "Applicable payments are recorded against the customer and reviewed through settlements.", href: "/platform/collections", link: "Collections", scene: "collect" },
  { name: "Analyse", icon: BarChart3, dot: "bg-accent-violet", tile: "bg-accent-violet text-white", text: "text-accent-violet-deep", body: "Understand the day's performance.", detail: "Connected records become the views managers use to plan what happens next.", href: "/business-command-center", link: "Business Command Center", scene: "analyse" },
];

/** How long the mascot stays on each stop before hopping to the next one. */
const DWELL = 3400;

/**
 * The workflow row from the Features design, as a guided journey. The map-and-pin mascot stands above the active stop and
 * hops along from Plan to Analyse, the line fills up to it, the stop pops as it lands, and the sentence underneath changes.
 * It plays by itself while the row is on screen, pauses when pointed at, and every stop can be chosen directly.
 * With reduced motion it does not play by itself, and the stops still work.
 */
export function JourneyRail() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [seen, setSeen] = useState(false);
  const [calm, setCalm] = useState(false);
  const [rider, setRider] = useState({ x: 0, y: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const current = stages[active];

  // Where the mascot stands: above the active stop on wide screens, beside it on narrow ones.
  const place = useCallback(() => {
    const wrap = wrapRef.current;
    const item = itemRefs.current[active];
    if (!wrap || !item) return;
    const wrapBox = wrap.getBoundingClientRect();
    const itemBox = item.getBoundingClientRect();
    if (window.matchMedia("(min-width: 1024px)").matches) {
      setRider({ x: itemBox.left - wrapBox.left + itemBox.width / 2, y: 0 });
    } else {
      setRider({ x: wrapBox.width - 46, y: itemBox.top - wrapBox.top });
    }
  }, [active]);

  useEffect(() => {
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [place]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setCalm(query.matches);
    update();
    query.addEventListener("change", update);
    const wrap = wrapRef.current;
    const observer = new IntersectionObserver(([entry]) => setSeen(entry.isIntersecting), { threshold: 0.7 });
    if (wrap) observer.observe(wrap);
    return () => {
      query.removeEventListener("change", update);
      observer.disconnect();
    };
  }, []);

  const playing = seen && !held && !calm;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setActive((value) => (value + 1) % stages.length), DWELL);
    return () => window.clearTimeout(timer);
  }, [playing, active]);

  const reach = active / (stages.length - 1);

  return (
    <div>
      <div
        ref={wrapRef}
        className="relative lg:pt-[96px]"
        onPointerEnter={() => setHeld(true)}
        onPointerLeave={() => setHeld(false)}
        onFocusCapture={() => setHeld(true)}
        onBlurCapture={() => setHeld(false)}
      >
        {/* Line: horizontal across the dots on wide screens, vertical behind the tiles on narrow ones. It fills up to the active stop. */}
        <div
          aria-hidden="true"
          className="absolute bottom-7 left-[27px] top-7 w-px bg-line lg:bottom-auto lg:left-[8.333%] lg:right-[8.333%] lg:top-[101px] lg:h-[2px] lg:w-auto"
        >
          <div
            style={{ "--f": reach } as CSSProperties}
            className="h-full w-full origin-top scale-y-[var(--f)] bg-[linear-gradient(180deg,var(--color-teal),var(--color-brand-orange))] transition-transform duration-[700ms] ease-[var(--ease-soft)] lg:origin-left lg:scale-x-[var(--f)] lg:scale-y-100 lg:bg-[linear-gradient(90deg,var(--color-teal),var(--color-brand-orange))]"
          />
        </div>

        {/* The mascot. It moves to each stop in turn, and hops as it lands. */}
        <div
          aria-hidden="true"
          style={{ left: rider.x, top: rider.y }}
          className="pointer-events-none absolute z-20 hidden w-[72px] -translate-x-1/2 transition-[left,top] duration-[800ms] ease-[var(--ease-soft)] lg:block lg:w-[92px]"
        >
          <div key={active} className="rider-hop">
            <Mascot name="location" sizes="92px" className="w-full" />
          </div>
        </div>

        <ol className="relative grid grid-cols-1 gap-7 lg:grid-cols-6 lg:gap-0">
          {stages.map((stage, index) => {
            const selected = index === active;
            return (
              <li
                key={stage.name}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                data-reveal=""
                style={{ "--d": `${index * 80}ms` } as CSSProperties}
                suppressHydrationWarning
              >
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className="group flex w-full cursor-pointer items-start gap-5 text-left lg:flex-col lg:items-center lg:gap-4 lg:text-center"
                >
                  <span aria-hidden="true" className={`relative z-10 hidden size-3 rounded-full ring-4 ring-white lg:block ${stage.dot}`} />
                  <span
                    className={`relative z-10 block h-[84px] w-[122px] shrink-0 overflow-hidden rounded-2xl border bg-white transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-soft)] ${
                      selected ? "scale-[1.06] border-teal shadow-lift" : "border-line shadow-[0_8px_18px_-12px_rgb(41_59_71/0.4)] group-hover:scale-[1.03]"
                    }`}
                  >
                    <Vignette kind={stage.scene} className="h-full w-full p-1" />
                  </span>
                  <span className="min-w-0 pt-1 lg:pt-0">
                    <span className={`block text-[1.0625rem] font-semibold transition-colors duration-300 ${selected ? stage.text : "text-navy-deep"}`}>{stage.name}</span>
                    <span className="mt-1 block text-[14.5px] leading-snug text-muted lg:mx-auto lg:max-w-[10.5rem]">{stage.body}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div aria-live="polite" className="mx-auto mt-14 max-w-[40rem] text-center">
        <div key={current.name} className="seq">
          <p className="text-pretty text-[1.1875rem] leading-[1.6] text-navy-deep">{current.detail}</p>
          <Link href={current.href} className="link-arrow mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-teal-deep hover:text-navy">
            Explore {current.link} <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

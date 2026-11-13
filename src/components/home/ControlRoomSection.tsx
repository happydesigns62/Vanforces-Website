"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/global/Button";
import { ScrollReveal } from "@/components/motion/Reveal";
import { useCalm } from "@/components/motion/useCalm";
import { ControlRoomScreen, SAMPLE_NOTE, type ScreenKey } from "./ControlRoomScreens";

type Monitor = { key: Exclude<ScreenKey, "launcher">; title: string; refresh: string; copy: string; points: string[] };

export const monitors: Monitor[] = [
  {
    key: "executive",
    title: "Executive Overview",
    refresh: "Refreshes every 120s",
    copy: "Sales, collections, credits, customer additions and revenue trends in one management view.",
    points: ["Four headline cards", "A dated revenue trend", "Order and delivery report panels"],
  },
  {
    key: "liveOps",
    title: "Live Operations",
    refresh: "Refreshes every 30s",
    copy: "Regularly refreshed sales, collection, order and delivery snapshots with route status and recent activity.",
    points: ["Live summary cards", "Route status board and activity feed", "Live routes table"],
  },
  {
    key: "attendance",
    title: "Attendance & Movement",
    refresh: "Refreshes every 60s",
    copy: "Work-status records, salesman location logs and route maps in one field-supervision view.",
    points: ["Work status grid", "Salesman log map", "Live routes map"],
  },
  {
    key: "orderDelivery",
    title: "Order & Delivery Control",
    refresh: "Refreshes every 45s",
    copy: "Pending orders, order-status distribution, delivery-run information and reporting panels together.",
    points: ["Pending order and delivery run snapshots", "Order funnel by status", "Order and delivery reports"],
  },
];

/**
 * Control Room Monitoring as one large screen with a switcher. The four screens are listed on the left like the launcher's own
 * cards; the one chosen is shown large on the right, and the choice rotates by itself until the visitor takes over. Every screen is
 * redrawn with synthetic sample data and labelled so. Copy avoids unproven claims: screens are "regularly refreshed", never
 * instant, and there are no tracking, optimisation, prediction or alert-rule promises.
 */
export function ControlRoomSection() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const calm = useCalm();
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || calm || !inView) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % monitors.length), 5500);
    return () => window.clearTimeout(t);
  }, [auto, calm, inView, active]);

  const pick = useCallback((i: number) => {
    setActive(i);
    setAuto(false);
  }, []);

  const current = monitors[active];

  return (
    <section className="section bg-mist">
      <div className="wrap">
        <div className="mx-auto max-w-[46rem] text-center">
          <ScrollReveal>
            <p className="eyebrow justify-center">Control Room Monitoring</p>
          </ScrollReveal>
          <h2 className="mt-5 text-balance text-[clamp(1.875rem,1.5rem+1.4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.04em] text-navy-deep">
            Your Business Operations, <span className="text-ink-soft">Together on One Command Screen.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[38rem] text-pretty text-[1rem] leading-[1.7] text-muted">
            Bring sales, collections, field activity, attendance, orders and deliveries into focused monitoring screens, so management and operations teams share one view of the day.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/book-demo" arrow className="!min-h-[46px] !px-6 !text-[14.5px]">
              Book a Control Room Demo
            </Button>
            <Button href="/control-room" variant="secondary" className="!min-h-[46px] !px-6 !text-[14.5px]">
              Explore the Monitoring Screens
            </Button>
          </div>
        </div>

        <ScrollReveal delay={100} className="mt-12">
          <div ref={box} className="grid gap-5 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-8">
            <div className="flex flex-col">
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-teal-deep">Control Room Launcher</p>
              <ul role="tablist" aria-label="Monitoring screens" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
                {monitors.map((m, i) => {
                  const on = i === active;
                  return (
                    <li key={m.key} className="shrink-0 lg:shrink">
                      <button
                        type="button"
                        role="tab"
                        aria-selected={on}
                        onClick={() => pick(i)}
                        className={`relative w-full cursor-pointer overflow-hidden rounded-2xl border px-4 py-3.5 text-left transition-colors ${on ? "border-cyan-line bg-white shadow-[0_1px_2px_rgb(41_59_71/0.06),0_18px_36px_-26px_rgb(8_60_66/0.45)]" : "border-transparent hover:bg-white/60"}`}
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span className="text-[15px] font-semibold text-navy-deep">{m.title}</span>
                          <span className={`rounded-full px-2 py-px text-[10.5px] font-semibold ${on ? "bg-teal text-white" : "bg-white text-muted"}`}>On</span>
                        </span>
                        <span className="mt-0.5 hidden text-[12.5px] text-muted lg:block">{m.refresh}</span>
                        {on && auto && !calm ? <span key={`${i}-bar`} aria-hidden="true" className="cr-progress absolute bottom-0 left-0 h-[3px] w-full bg-teal" /> : null}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-5 hidden lg:block">
                <p className="text-[14.5px] leading-relaxed text-muted">{current.copy}</p>
                <ul className="mt-3 space-y-1.5">
                  {current.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2 text-[13.5px] font-medium text-navy-deep">
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-teal" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div role="tabpanel" aria-label={current.title}>
              <div key={current.key} className="cr-swap">
                <ControlRoomScreen kind={current.key} />
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-muted lg:hidden">{current.copy}</p>
            </div>
          </div>
          <p className="mt-6 text-center text-[12.5px] leading-relaxed text-navy/65">{SAMPLE_NOTE} Screens refresh at set intervals. Available widgets depend on your account and configuration.</p>
        </ScrollReveal>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/global/Button";
import { ScrollReveal } from "@/components/motion/Reveal";
import { useCalm } from "@/components/motion/useCalm";
import { ControlRoomScreen, SAMPLE_NOTE, type ScreenKey } from "./ControlRoomScreens";

type Item = { key: ScreenKey; title: string; refresh?: string };

// The launcher sits in the middle of the row, with two monitoring screens on each side.
const items: Item[] = [
  { key: "executive", title: "Executive Overview", refresh: "120s" },
  { key: "liveOps", title: "Live Operations", refresh: "30s" },
  { key: "launcher", title: "Control Room Launcher" },
  { key: "attendance", title: "Attendance & Movement", refresh: "60s" },
  { key: "orderDelivery", title: "Order & Delivery Control", refresh: "45s" },
];

// The monitoring screens take turns in the large view. The launcher is chosen by the visitor.
const rotation: ScreenKey[] = ["executive", "liveOps", "attendance", "orderDelivery"];

/**
 * Control Room Monitoring as a command wall with one screen in focus. On a deep navy stage, the chosen screen is shown large and sharp
 * with a soft glow; below it a row of five thumbnails shows the whole room, with the launcher in the middle and two monitoring
 * screens either side. The large screen changes by itself every few seconds until the visitor picks one. Every screen is an anonymised copy of
 * page elements to match the the real product screens, and labelled as illustration.
 * Wording avoids unproven claims: screens are "regularly refreshed", never instant.
 */
export function ControlRoomSection() {
  const calm = useCalm();
  const [active, setActive] = useState<ScreenKey>("executive");
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (calm || !inView || !auto) return;
    const t = window.setTimeout(() => {
      const i = rotation.indexOf(active);
      setActive(rotation[(i + 1) % rotation.length]);
    }, 5500);
    return () => window.clearTimeout(t);
  }, [calm, inView, auto, active]);

  const current = items.find((i) => i.key === active) ?? items[0];

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
          <div ref={box} className="relative mx-auto max-w-[1080px] overflow-hidden rounded-[32px] bg-[radial-gradient(60%_70%_at_50%_0%,#12575c,transparent_70%),linear-gradient(180deg,#0c2f3a,#0a1f2b)] px-4 pb-6 pt-8 sm:px-8 sm:pb-8 sm:pt-10">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-[15%] top-0 h-40 rounded-full bg-teal/25 blur-3xl" />

            <p className="relative text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-white/70">{current.title}{current.refresh ? ` · refreshes every ${current.refresh}` : ""}</p>

            <div className="relative mx-auto mt-4 max-w-[880px] [perspective:1800px]">
              <div className="aspect-[1920/1023]">
                <div key={active} className="cr-swap origin-top [transform:rotateX(2deg)]">
                  <ControlRoomScreen kind={active} className="!rounded-xl !border-white/20 !shadow-[0_50px_90px_-30px_rgb(0_0_0/0.7),0_0_0_1px_rgb(255_255_255/0.08)]" priority />
                </div>
              </div>
            </div>

            <ul role="tablist" aria-label="Control Room screens" className="relative mt-5 grid grid-cols-5 items-end gap-2 sm:gap-4">
              {items.map((it) => {
                const on = it.key === active;
                const launcher = it.key === "launcher";
                return (
                  <li key={it.key} className={launcher ? "-mb-1" : ""}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={on}
                      aria-label={`Show ${it.title} sample screen`}
                      onClick={() => {
                        setActive(it.key);
                        setAuto(false);
                      }}
                      className={`group relative block w-full cursor-pointer rounded-lg text-left transition-[opacity,transform,box-shadow] duration-300 ${on ? "opacity-100 ring-2 ring-teal ring-offset-2 ring-offset-[#0b2530]" : "opacity-60 hover:-translate-y-0.5 hover:opacity-100"}`}
                    >
                      <ControlRoomScreen kind={it.key} sizes="200px" className="!rounded-md !border-white/15 !shadow-none" />
                      {on && auto && !calm && !launcher ? <span key={`${it.key}-bar`} aria-hidden="true" className="cr-progress absolute -bottom-2 left-0 h-[3px] w-full rounded-full bg-teal" /> : null}
                    </button>
                    <span className={`mt-2.5 hidden text-center text-[11.5px] font-semibold leading-tight sm:block ${on ? "text-white" : "text-white/60"}`}>{it.title}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <p className="mt-6 text-center text-[13.5px] font-medium text-navy-deep">One central Control Room. Multiple monitoring views. Pick any screen to see it large.</p>
          <p className="mt-2 text-center text-[12.5px] leading-relaxed text-navy/65">{SAMPLE_NOTE} Screens refresh at set intervals. Available widgets depend on your account and configuration.</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
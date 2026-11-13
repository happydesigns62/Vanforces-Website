"use client";

import Image from "next/image";
import { BarChart3, Boxes, ClipboardList, Minus, Check, Route as RouteIcon, Wallet, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/global/Button";
import { SectionHeading } from "@/components/global/Common";
import { ScrollReveal } from "@/components/motion/Reveal";
import { useCalm } from "@/components/motion/useCalm";

// Plain descriptions of everyday tasks. No figures anywhere, because there are no confirmed figures yet.
const tasks: { hour: number; clock: string; time: string; task: string; Icon: LucideIcon; without: string; with: string }[] = [
  { hour: 8, clock: "8:00 AM", time: "Morning", task: "Planning the day", Icon: RouteIcon, without: "Routes shared by phone and message.", with: "Routes and visits planned in one place." },
  { hour: 10.5, clock: "10:30 AM", time: "Midday", task: "Taking orders", Icon: ClipboardList, without: "Notes on paper, typed in later.", with: "Orders captured on the phone, during the visit." },
  { hour: 13, clock: "1:00 PM", time: "Afternoon", task: "Checking stock", Icon: Boxes, without: "Calling the warehouse to ask.", with: "Warehouse and van stock visible to the team." },
  { hour: 15.5, clock: "3:30 PM", time: "Evening", task: "Collecting payments", Icon: Wallet, without: "Cash and cheques tracked in notebooks.", with: "Collections recorded against each invoice." },
  { hour: 18, clock: "6:00 PM", time: "End of day", task: "Reporting", Icon: BarChart3, without: "Reports pieced together at the end of the week.", with: "Reports drawn from the same connected data." },
];

const START = 8;
const END = 18;
/** The lane without a connected system is drawn running behind, to show the waiting. It is an illustration, not a measurement. */
const LAG = 0.55;
const pct = (hour: number) => `${((hour - START) / (END - START)) * 100}%`;

const clockLabel = (hour: number) => {
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h > 12 ? h - 12 : h;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
};

/**
 * Business Value as one working day. A clock runs from 8 AM to 6 PM along two lanes: one with Vanforces, which keeps up with the day,
 * and one without a connected system, which falls behind and waits. The five tasks sit along the lanes and light up as the day reaches
 * them, and the card underneath shows the same task both ways. It plays by itself while on screen, can be dragged, and shows the
 * finished day still for reduced motion. No invented figures. The lanes are an illustration and are labelled as one.
 */
export function ValueSection() {
  const calm = useCalm();
  const [hour, setHour] = useState(END);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // One clock moves the day from morning to evening, rests, and begins again, until the visitor takes over.
  useEffect(() => {
    if (calm || !inView || !auto) return;
    const RUN = 11000;
    const REST = 2600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = (now - start) % (RUN + REST);
      setHour(START + (Math.min(t, RUN) / RUN) * (END - START));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [calm, inView, auto]);

  const reached = tasks.filter((t) => hour >= t.hour - 0.001);
  const current = reached[reached.length - 1] ?? tasks[0];
  const lagHour = START + (hour - START) * LAG;
  const lagReached = tasks.filter((t) => lagHour >= t.hour - 0.001).length;

  function jump(next: number) {
    setAuto(false);
    setHour(next);
  }

  return (
    <section className="section">
      <div className="wrap max-w-[1120px]">
        <SectionHeading
          variant="fine"
          align="center"
          eyebrow="Make every workday count"
          title="The Same Workday,"
          titleMuted="Made Simpler."
          description="Follow one day from morning to close, and see how the same five tasks go when your team, stock and collections are connected."
        />

        <ScrollReveal delay={100} className="mt-12">
          <div ref={box} className="overflow-hidden rounded-[32px] border border-cyan-line bg-[radial-gradient(70%_90%_at_10%_0%,rgb(28_178_187/0.12),transparent),linear-gradient(180deg,#f3fbfc,#ffffff)] p-5 sm:p-9">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-muted">One working day</p>
              <p className="rounded-full bg-white px-4 py-1.5 text-[15px] font-semibold tabular-nums text-navy-deep shadow-[0_1px_2px_rgb(41_59_71/0.07)]" aria-live="off">
                {clockLabel(hour)}
              </p>
            </div>

            {/* The two lanes. On narrow screens the station names are hidden and the card below carries the detail. */}
            <div className="mt-8 space-y-7">
              {[
                { name: "With Vanforces", now: hour, count: reached.length, on: true },
                { name: "Without a connected system", now: lagHour, count: lagReached, on: false },
              ].map((lane) => (
                <div key={lane.name}>
                  <p className={`mb-3 text-[13px] font-semibold ${lane.on ? "text-teal-deep" : "text-muted"}`}>{lane.name}</p>
                  <div className="relative mx-5 h-11 sm:mx-8">
                    <span className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-navy/10" />
                    <span
                      className={`absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full ${lane.on ? "bg-gradient-to-r from-teal to-teal-deep" : "bg-[repeating-linear-gradient(90deg,rgb(41_59_71/0.4)_0_6px,transparent_6px_12px)]"}`}
                      style={{ width: pct(lane.now) }}
                    />
                    {tasks.map((t, i) => {
                      const lit = i < lane.count;
                      return (
                        <span key={t.task} className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: pct(t.hour) }}>
                          <span
                            className={`flex size-9 items-center justify-center rounded-full border-2 bg-white transition-colors duration-500 ${
                              lit ? (lane.on ? "border-teal text-teal-deep" : "border-navy/35 text-navy/60") : "border-navy/15 text-navy/25"
                            }`}
                          >
                            <t.Icon aria-hidden="true" size={16} />
                          </span>
                        </span>
                      );
                    })}
                    {lane.on ? (
                      <span className="pointer-events-none absolute top-1/2 z-10 flex size-9 -translate-x-1/2 -translate-y-[130%] items-center justify-center rounded-full bg-white shadow-[0_8px_16px_-6px_rgb(8_60_66/0.5)]" style={{ left: pct(lane.now) }}>
                        <Image src="/brand/vanforces-mark.svg" alt="" width={60} height={56} className="h-4 w-auto" />
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            <label className="mt-6 block">
              <span className="sr-only">Move through the working day</span>
              <input
                type="range"
                min={START}
                max={END}
                step={0.05}
                value={hour}
                onChange={(event) => jump(Number(event.target.value))}
                className="h-2 w-full cursor-pointer"
                style={{ accentColor: "#0e7f86" }}
              />
            </label>

            <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1fr)] md:items-stretch">
              <div className="flex items-center gap-3.5 rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgb(41_59_71/0.05)]">
                <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-cyan-soft text-teal-deep">
                  <current.Icon size={20} />
                </span>
                <div>
                  <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted">
                    {current.time} · {current.clock}
                  </p>
                  <p className="text-[17px] font-semibold text-navy-deep">{current.task}</p>
                </div>
              </div>
              <div key={`${current.task}-without`} className="cr-swap flex items-start gap-2.5 rounded-2xl border border-line bg-white/60 p-4 text-[14.5px] leading-snug text-muted">
                <span aria-hidden="true" className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-mist text-navy/60">
                  <Minus size={12} strokeWidth={3} />
                </span>
                <span>
                  <span className="mb-0.5 block text-[11.5px] font-semibold uppercase tracking-[0.1em]">Without</span>
                  {current.without}
                </span>
              </div>
              <div key={`${current.task}-with`} className="cr-swap flex items-start gap-2.5 rounded-2xl border border-cyan-line bg-white p-4 text-[14.5px] font-medium leading-snug text-navy-deep shadow-[0_18px_36px_-28px_rgb(8_60_66/0.5)]">
                <span aria-hidden="true" className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-teal text-navy-deep">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span>
                  <span className="mb-0.5 block text-[11.5px] font-semibold uppercase tracking-[0.1em] text-teal-deep">With Vanforces</span>
                  {current.with}
                </span>
              </div>
            </div>

            <ul className="mt-4 flex flex-wrap justify-center gap-2" aria-label="Jump to a task">
              {tasks.map((t) => (
                <li key={t.task}>
                  <button
                    type="button"
                    onClick={() => jump(t.hour)}
                    aria-pressed={current.task === t.task}
                    className={`min-h-9 cursor-pointer rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors ${current.task === t.task ? "border-teal bg-teal text-navy-deep" : "border-line bg-white text-muted hover:border-teal hover:text-navy-deep"}`}
                  >
                    {t.time}
                  </button>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-center text-[12.5px] text-navy/65">An illustration of the day, not a measured result.</p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/roi" arrow>
                Estimate Your Potential ROI
              </Button>
              <Button href="#plans" variant="secondary">
                Explore Pricing
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

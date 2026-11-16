"use client";

import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/global/Button";
import { SectionHeading } from "@/components/global/Common";
import { Vignette, type VignetteKind } from "@/components/illustration/Vignettes";
import { ScrollReveal } from "@/components/motion/Reveal";
import { useCalm } from "@/components/motion/useCalm";

type Role = { id: string; name: string; start: string; scene: VignetteKind; stage: string; tag: string; before: string; outcomes: string[] };

// Plain descriptions of what each role does with Vanforces. No figures anywhere, because there are no confirmed figures yet.
const roles: Role[] = [
  {
    id: "sales",
    name: "Field salesperson",
    start: "Starts the day with routes ready",
    scene: "sell",
    stage: "bg-[#d3f0f3]",
    tag: "text-teal-deep",
    before: "Instead of routes shared by message and orders written on paper.",
    outcomes: ["Opens today's routes and visits on the phone", "Takes the order during the visit", "Keeps working when the signal drops, in supported workflows"],
  },
  {
    id: "warehouse",
    name: "Warehouse team",
    start: "Knows what is in stock and on each van",
    scene: "stock",
    stage: "bg-[#fde9d3]",
    tag: "text-accent-amber-deep",
    before: "Instead of phone calls to ask what is left.",
    outcomes: ["Sees warehouse and van stock in one place", "Loads and unloads vans against a plan", "Reviews stock with the van at the end of the day"],
  },
  {
    id: "driver",
    name: "Delivery driver",
    start: "Gets the day's deliveries in order",
    scene: "deliver",
    stage: "bg-[#d3e6fa]",
    tag: "text-accent-blue-deep",
    before: "Instead of paper lists and handwritten receipts.",
    outcomes: ["Sees the deliveries for the day", "Confirms each delivery on the spot", "Records payment at the door"],
  },
  {
    id: "finance",
    name: "Finance manager",
    start: "Sees what has been collected",
    scene: "collect",
    stage: "bg-[#e4d9f7]",
    tag: "text-accent-violet-deep",
    before: "Instead of cash and cheques tracked in notebooks.",
    outcomes: ["Sees collections recorded against each invoice", "Reviews settlements in one place", "Gets reports from the same connected data"],
  },
  {
    id: "owner",
    name: "Business owner",
    start: "Follows the whole day on one screen",
    scene: "analyse",
    stage: "bg-[#d6f0dc]",
    tag: "text-accent-green-deep",
    before: "Instead of reports pieced together at the end of the week.",
    outcomes: ["Follows sales, routes and collections together", "Spots what needs attention", "Asks Entaura to explain the numbers"],
  },
];

/**
 * Business Value, told by role. Five people who work in a distribution business, each with a short picture of their day with
 * Vanforces: a scene, what they no longer do by hand, and three things they do instead. The choice rotates by itself while on screen
 * and stops once the visitor picks a role. There are no invented figures. Reduced motion keeps the first role still.
 */
export function ValueSection() {
  const calm = useCalm();
  const [active, setActive] = useState(0);
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

  useEffect(() => {
    if (calm || !inView || !auto) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % roles.length), 6500);
    return () => window.clearTimeout(t);
  }, [calm, inView, auto, active]);

  const role = roles[active];

  return (
    <section className="section">
      <div className="wrap max-w-[1120px]">
        <SectionHeading
          variant="fine"
          align="center"
          eyebrow="Make every workday count"
          title="The ROI of a"
          titleMuted="Better Workday."
          description="See what changes for each role, then estimate the return on the time your team gets back."
        />

        <ScrollReveal delay={100} className="mt-12">
          <div ref={box} className="grid gap-5 lg:grid-cols-[minmax(0,4.5fr)_minmax(0,7.5fr)] lg:gap-8">
            <ul role="tablist" aria-label="Roles" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
              {roles.map((r, i) => {
                const on = i === active;
                return (
                  <li key={r.id} className="shrink-0 lg:shrink">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => {
                        setActive(i);
                        setAuto(false);
                      }}
                      className={`relative w-full cursor-pointer overflow-hidden rounded-2xl border px-5 py-4 text-left transition-[background-color,border-color,box-shadow] duration-300 ${on ? "border-cyan-line bg-white shadow-[0_18px_36px_-26px_rgb(8_60_66/0.5)]" : "border-transparent bg-mist/70 hover:bg-mist"}`}
                    >
                      <span className={`block text-[16px] font-semibold ${on ? "text-navy-deep" : "text-navy"}`}>{r.name}</span>
                      <span className="mt-0.5 hidden text-[13.5px] leading-snug text-muted lg:block">{r.start}</span>
                      {on && auto && !calm ? <span key={`${i}-bar`} aria-hidden="true" className="cr-progress absolute bottom-0 left-0 h-[3px] w-full bg-teal" style={{ animationDuration: "6.5s" }} /> : null}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div role="tabpanel" aria-label={role.name} className="overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_1px_2px_rgb(41_59_71/0.05)]">
              <div key={role.id} className="cr-swap">
                <div className={`relative flex h-[230px] items-center justify-center overflow-hidden sm:h-[260px] ${role.stage}`}>
                  <span aria-hidden="true" className="capsule left-[-12%] top-[32%] h-[40%] w-[124%] bg-white/55" />
                  <Vignette kind={role.scene} className="relative h-[210px] w-[310px] max-w-full" />
                  <p className="absolute left-5 top-5 rounded-full bg-white/90 px-3.5 py-1.5 text-[13px] font-semibold text-navy-deep">{role.name}</p>
                </div>
                <div className="p-6 sm:p-8">
                  <p className={`text-[13px] font-semibold ${role.tag}`}>A day with Vanforces</p>
                  <ul className="mt-4 space-y-3">
                    {role.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-3 text-[16px] font-medium leading-snug text-navy-deep">
                        <span aria-hidden="true" className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-teal text-navy-deep">
                          <Check size={14} strokeWidth={3} />
                        </span>
                        {o}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 border-t border-line pt-4 text-[14px] leading-relaxed text-muted">{role.before}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/roi" arrow>
              Estimate Your Potential ROI
            </Button>
            <Button href="#plans" variant="secondary">
              Explore Pricing
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

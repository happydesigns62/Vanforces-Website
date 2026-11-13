"use client";

import { BarChart3, Boxes, ClipboardList, Route as RouteIcon, Wallet, type LucideIcon } from "lucide-react";
import { useId, useState } from "react";
import { Button } from "@/components/global/Button";
import { SectionHeading } from "@/components/global/Common";
import { ScrollReveal } from "@/components/motion/Reveal";

// Plain descriptions of everyday tasks. No figures anywhere, because there are no confirmed figures yet.
const tasks: { time: string; task: string; Icon: LucideIcon; without: string; with: string }[] = [
  { time: "Morning", task: "Planning the day", Icon: RouteIcon, without: "Routes shared by phone and message.", with: "Routes and visits planned in one place." },
  { time: "Midday", task: "Taking orders", Icon: ClipboardList, without: "Notes on paper, typed in later.", with: "Orders captured on the phone, during the visit." },
  { time: "Afternoon", task: "Checking stock", Icon: Boxes, without: "Calling the warehouse to ask.", with: "Warehouse and van stock visible to the team." },
  { time: "Evening", task: "Collecting payments", Icon: Wallet, without: "Cash and cheques tracked in notebooks.", with: "Collections recorded against each invoice." },
  { time: "End of day", task: "Reporting", Icon: BarChart3, without: "Reports pieced together at the end of the week.", with: "Reports drawn from the same connected data." },
];

/**
 * Business Value as one working day on a timeline, with a switch. Five tasks run from morning to the end of the day. With the
 * switch off they read as the scattered, manual way; switched on, the same tiles turn teal and show the Vanforces way. It uses no
 * invented figures and leads to the ROI estimate. Without scripts the "with Vanforces" view is shown.
 */
export function ValueSection() {
  const [on, setOn] = useState(true);
  const id = useId();

  return (
    <section className="section">
      <div className="wrap max-w-[1180px]">
        <SectionHeading
          variant="fine"
          align="center"
          eyebrow="Make every workday count"
          title="The Same Workday,"
          titleMuted="Made Simpler."
          description="Five everyday tasks from morning to close, and how they change when your team, stock and collections are connected."
        />

        <ScrollReveal delay={100} className="mt-12">
          <div className="overflow-hidden rounded-[32px] border border-cyan-line bg-[radial-gradient(70%_90%_at_10%_0%,rgb(28_178_187/0.12),transparent),linear-gradient(180deg,#f3fbfc,#ffffff)] p-5 sm:p-8">
            <div className="flex flex-col items-center gap-3">
              <div className="inline-flex items-center gap-3 rounded-full bg-white p-1.5 shadow-[0_1px_2px_rgb(41_59_71/0.07)]">
                <span id={`${id}-off`} className={`px-3 text-[13.5px] font-semibold transition-colors ${on ? "text-muted" : "text-navy-deep"}`}>
                  Without a connected system
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={on}
                  aria-label="Show the day with Vanforces"
                  onClick={() => setOn((v) => !v)}
                  className={`relative h-8 w-14 shrink-0 cursor-pointer rounded-full transition-colors duration-300 ${on ? "bg-teal" : "bg-navy/25"}`}
                >
                  <span className={`absolute top-1 size-6 rounded-full bg-white shadow transition-[left] duration-300 ${on ? "left-7" : "left-1"}`} />
                </button>
                <span className={`px-3 text-[13.5px] font-semibold transition-colors ${on ? "text-teal-deep" : "text-muted"}`}>With Vanforces</span>
              </div>
            </div>

            <div className="relative mt-9">
              <span aria-hidden="true" className="absolute left-[10%] right-[10%] top-[22px] hidden h-0.5 lg:block">
                <span className={`block h-full rounded-full transition-colors duration-500 ${on ? "bg-teal" : "border-t-2 border-dashed border-navy/25"}`} />
              </span>
              <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {tasks.map((t, i) => (
                  <li key={t.task} className="flex flex-col items-center text-center">
                    <span className={`relative z-10 flex size-11 items-center justify-center rounded-full border-2 bg-white transition-colors duration-500 ${on ? "border-teal text-teal-deep" : "border-navy/25 text-navy/50"}`}>
                      <t.Icon aria-hidden="true" size={19} />
                    </span>
                    <p className="mt-2 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted">{t.time}</p>
                    <div
                      className={`mt-3 w-full flex-1 rounded-2xl border p-4 text-left transition-[background-color,border-color,box-shadow] duration-500 ${
                        on ? "border-cyan-line bg-white shadow-[0_18px_36px_-26px_rgb(8_60_66/0.5)]" : "border-line bg-white/55"
                      }`}
                    >
                      <p className="text-[15.5px] font-semibold text-navy-deep">{t.task}</p>
                      <p key={on ? "with" : "without"} aria-live="polite" className={`cr-swap mt-2 text-[14px] leading-snug ${on ? "font-medium text-navy-deep" : "text-muted"}`} style={{ animationDelay: `${i * 40}ms` }}>
                        {on ? t.with : t.without}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
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

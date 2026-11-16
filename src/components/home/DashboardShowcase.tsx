import { ScrollReveal } from "@/components/motion/Reveal";
import { ScrollScene } from "@/components/motion/ScrollScene";
import { HeroDashboard } from "./HeroDashboard";
import { PhoneApp } from "./PhoneApp";

const callouts = [
  { text: "Start of day", top: "6%" },
  { text: "Punch in", top: "26%" },
  { text: "Cash collected", top: "50%" },
];

/**
 * The Vanforces dashboard, with the field app on a phone at its top right: the team runs the day on the phone, and management follows
 * it on the dashboard. On wide screens the phone overlaps the dashboard's top right corner, which holds only small controls, with
 * three short callouts. On narrow screens the phone sits below the dashboard. Both are redrawn as page elements and stay sharp.
 */
export function DashboardShowcase() {
  return (
    <section className="section overflow-clip bg-white">
      <div className="wrap">
        <ScrollReveal className="mx-auto max-w-[44rem] text-center">
          <p className="eyebrow justify-center">See it running</p>
          <h2 className="mt-5 text-balance text-[clamp(1.875rem,1.5rem+1.4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.04em] text-navy-deep">
            From the Field <span className="text-ink-soft">to the Office.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[36rem] text-pretty text-[1rem] leading-[1.7] text-muted">
            Your team runs the day on the phone. You follow it on the dashboard, with sales, collections, routes and stock together.
          </p>
        </ScrollReveal>

        <div className="relative mx-auto mt-12 max-w-[1200px] md:mt-24">
          <div className="md:w-[88%]">
            <ScrollScene mode="entry" className="scene-stage">
              <HeroDashboard />
            </ScrollScene>
          </div>

          {/* Wide screens: the phone overlaps the top right corner. */}
          <ScrollReveal delay={200} className="pointer-events-none absolute -right-[1%] -top-[72px] z-10 hidden w-[25%] min-w-[250px] md:block">
            <div className="[rotate:3deg]">
              <PhoneApp />
            </div>
          </ScrollReveal>
          <ul aria-hidden="true" className="pointer-events-none absolute right-[26%] top-0 z-10 hidden h-full w-48 md:block">
            {callouts.map((c, i) => (
              <li key={c.text} className="absolute right-0 flex items-center gap-1.5" style={{ top: c.top }}>
                <span className="whitespace-nowrap rounded-full bg-navy-deep px-3 py-1.5 text-[12px] font-semibold text-white shadow-[0_10px_20px_-10px_rgb(8_20_30/0.6)]">{c.text}</span>
                <span className="h-px w-8 bg-navy-deep/60" />
                <span className="size-1.5 rounded-full bg-teal" style={{ animationDelay: `${i * 120}ms` }} />
              </li>
            ))}
          </ul>

          {/* Narrow screens: the phone below the dashboard. */}
          <div className="mx-auto mt-8 w-[min(78%,300px)] md:hidden">
            <PhoneApp />
            <ul className="mt-5 flex flex-wrap justify-center gap-2">
              {callouts.map((c) => (
                <li key={c.text} className="rounded-full bg-mist px-3 py-1.5 text-[12.5px] font-semibold text-navy-deep">
                  {c.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

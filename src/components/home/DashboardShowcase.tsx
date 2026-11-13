import { ScrollReveal } from "@/components/motion/Reveal";
import { ScrollScene } from "@/components/motion/ScrollScene";
import { HeroDashboard } from "./HeroDashboard";

/** The Vanforces dashboard, shown after the plans as the proof of what the platform looks like running. */
export function DashboardShowcase() {
  return (
    <section className="section overflow-clip bg-white">
      <div className="wrap">
        <ScrollReveal className="mx-auto max-w-[44rem] text-center">
          <p className="eyebrow justify-center">See it running</p>
          <h2 className="mt-5 text-balance text-[clamp(1.875rem,1.5rem+1.4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.04em] text-navy-deep">
            The Whole Operation, <span className="text-ink-soft">On One Screen.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[36rem] text-pretty text-[1rem] leading-[1.7] text-muted">
            Sales, collections, routes and stock together on the Vanforces dashboard, so management sees the day without chasing reports.
          </p>
        </ScrollReveal>
        <div className="mx-auto mt-12 max-w-[1200px]">
          <ScrollScene mode="entry" className="scene-stage">
            <HeroDashboard />
          </ScrollScene>
        </div>
      </div>
    </section>
  );
}
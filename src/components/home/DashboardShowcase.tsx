import { ScrollReveal } from "@/components/motion/Reveal";
import { ScrollScene } from "@/components/motion/ScrollScene";
import { HeroDashboard } from "./HeroDashboard";
import { PhoneApp } from "./PhoneApp";

/**
 * The Vanforces dashboard, with the field app on a phone at its top right: the team runs the day on the phone, and management follows
 * it on the dashboard. The phone is kept small and sits over the dashboard's top right corner, which holds only small controls, so
 * the key numbers and the chart stay visible. On narrow screens the phone sits below the dashboard. Both are redrawn as page
 * elements and stay sharp.
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

        <div className="relative mx-auto mt-12 max-w-[1120px] md:mt-20">
          <ScrollScene mode="entry" className="scene-stage">
            <HeroDashboard />
          </ScrollScene>

          {/* Wide screens: a small phone over the top right corner. */}
          <ScrollReveal delay={200} className="absolute -right-[4%] -top-[54px] z-10 hidden w-[17%] min-w-[190px] md:block">
            <div className="drop-shadow-[0_26px_28px_rgb(8_20_30/0.32)]">
              <PhoneApp />
            </div>
            <p className="mt-3 text-center">
              <span className="inline-flex rounded-full bg-navy-deep px-3.5 py-1.5 text-[12px] font-semibold text-white shadow-[0_10px_20px_-10px_rgb(8_20_30/0.6)]">Field app</span>
            </p>
          </ScrollReveal>

          {/* Narrow screens: the phone below the dashboard. */}
          <div className="mx-auto mt-8 w-[min(62%,240px)] md:hidden">
            <div className="drop-shadow-[0_22px_24px_rgb(8_20_30/0.3)]">
              <PhoneApp />
            </div>
            <p className="mt-3 text-center">
              <span className="inline-flex rounded-full bg-navy-deep px-3.5 py-1.5 text-[12px] font-semibold text-white">Field app</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
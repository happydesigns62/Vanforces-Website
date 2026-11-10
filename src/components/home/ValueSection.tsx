import { Button } from "@/components/global/Button";
import { SectionHeading } from "@/components/global/Common";
import { Vignette } from "@/components/illustration/Vignettes";
import { ScrollReveal, StaggerReveal } from "@/components/motion/Reveal";

type Benefit = { label: string; title: string; body: string; scene: "relax" | "map" | "read"; stage: string; tag: string };

// Existing Business Value content. No figures anywhere, because there are no confirmed figures yet.
const benefits: Benefit[] = [
  { label: "Time", title: "Less Manual Coordination.", body: "Keep daily activities and information together.", scene: "relax", stage: "bg-[#d3f0f3]", tag: "text-teal-deep" },
  { label: "Control", title: "Know What's Happening.", body: "Stay closer to routes, stock and collections.", scene: "map", stage: "bg-[#d3e6fa]", tag: "text-accent-blue-deep" },
  { label: "Clarity", title: "Make Decisions With Context.", body: "Understand performance without piecing together separate reports.", scene: "read", stage: "bg-[#e4d9f7]", tag: "text-accent-violet-deep" },
];

/**
 * Business Value / ROI. The heading and its two actions stay in place on the left while three wide cards pass on the right.
 * Each card has a coloured stage with the mascot in front of the slanted capsule from the logo, and the stage changes side
 * from card to card, so the section does not read as three equal boxes.
 */
export function ValueSection() {
  return (
    <section className="section">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            variant="fine"
            eyebrow="Make every workday count"
            title="What Could Your Team Do"
            titleMuted="With Time Back?"
            description="Less time checking, calling and following up. More time focusing on customers and the work that moves the business forward."
          />
          <ScrollReveal delay={120} className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/roi" arrow>
              Estimate Your Potential ROI
            </Button>
            <Button href="#plans" variant="secondary">
              Explore Pricing
            </Button>
          </ScrollReveal>
        </div>

        <StaggerReveal step={120} className="grid gap-5">
          {benefits.map((benefit, index) => {
            const flip = index % 2 === 1;
            return (
              <article
                key={benefit.title}
                className="group grid overflow-hidden rounded-[28px] border border-line bg-white p-3 shadow-[0_1px_2px_rgb(41_59_71/0.05)] transition-[transform,box-shadow] duration-500 ease-[var(--ease-soft)] hover:-translate-y-1 hover:shadow-lift sm:grid-cols-2"
              >
                <div className={`relative flex h-[220px] items-center justify-center overflow-hidden rounded-[20px] ${benefit.stage} ${flip ? "sm:order-2" : ""}`}>
                  <span aria-hidden="true" className="capsule left-[-12%] top-[30%] h-[40%] w-[124%] bg-white/55" />
                  <Vignette kind={benefit.scene} className="relative h-[196px] w-[290px] max-w-full" />
                </div>
                <div className={`flex flex-col justify-center px-4 py-6 md:px-6 ${flip ? "sm:order-1" : ""}`}>
                  <p className={`text-[13px] font-semibold ${benefit.tag}`}>
                    <span className="tabular-nums">0{index + 1}</span> · {benefit.label}
                  </p>
                  <h3 className="mt-2 text-[clamp(1.375rem,1.15rem+0.8vw,1.75rem)] font-medium leading-[1.14] tracking-[-0.03em] text-navy-deep">{benefit.title}</h3>
                  <p className="mt-3 text-pretty text-[1rem] leading-[1.65] text-muted">{benefit.body}</p>
                </div>
              </article>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
}

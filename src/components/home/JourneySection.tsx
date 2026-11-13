import { Button } from "@/components/global/Button";
import { SectionHeading } from "@/components/global/Common";
import { ScrollReveal } from "@/components/motion/Reveal";
import { JourneyRail } from "./JourneyRail";

/** The Connected Distribution Journey section. Hidden from the homepage for now (kept here, unchanged, so it can come back or move to the Platform page). */
export function JourneySection() {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHeading
          variant="fine"
          align="center"
          eyebrow="One operation. From start to finish."
          title="A Sale Doesn't Happen"
          titleMuted="in Isolation."
          description={
            <>
              <p>What happens before the invoice matters just as much as what happens after.</p>
              <p className="mt-1">Vanforces connects the steps that keep distribution moving.</p>
            </>
          }
        />
        <div className="mt-16">
          <JourneyRail />
        </div>
        <ScrollReveal className="mt-16 flex flex-col items-center justify-center gap-5 border-t border-line pt-10 text-center">
          <p className="text-[1.25rem] font-medium tracking-[-0.02em] text-navy-deep">From the first plan to the final report. All connected.</p>
          <Button href="/platform" arrow>
            See How Vanforces Works
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}

import { Button } from "@/components/global/Button";
import { SectionHeading } from "@/components/global/Common";
import { ScrollReveal } from "@/components/motion/Reveal";
import { ScrollScene } from "@/components/motion/ScrollScene";
import { Globe } from "./Globe";

/** The closing card before the footer: the words and buttons, centred, with the turning globe rising from the bottom edge. */
export function ClosingPanel() {
  return (
    <section className="px-3 pb-6 pt-10 md:px-6 md:pb-10 md:pt-14">
      <ScrollScene mode="entry" className="scene-panel mx-auto max-w-[1320px]">
        <div className="mesh-soft relative overflow-hidden rounded-[32px] pt-14 md:rounded-[40px] md:pt-20">
          <span aria-hidden="true" className="capsule -right-24 -top-16 h-52 w-[620px] bg-white/40" />
          <div className="relative px-6 text-center">
            <SectionHeading
              variant="fine"
              align="center"
              className="!max-w-[54rem]"
              title="Ready to Connect"
              titleMuted="Your Operation?"
              description="Find the right plan, or see how Vanforces fits into your business before making a decision."
            />
            <ScrollReveal delay={200} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/get-started" arrow className="!min-h-[50px] !px-7 !text-[15px]">
                Get Started
              </Button>
              <Button href="/book-demo" variant="secondary" className="!min-h-[50px] !px-7 !text-[15px]">
                Book a Demo
              </Button>
            </ScrollReveal>
          </div>
          <Globe className="mt-8 h-[270px] md:mt-10 lg:h-[350px]" />
        </div>
      </ScrollScene>
    </section>
  );
}

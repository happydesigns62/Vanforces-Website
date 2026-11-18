import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/global/Common";
import { ScrollReveal } from "@/components/motion/Reveal";
import { EcosystemBoard } from "./EcosystemBoard";

/**
 * Connected systems, as a blueprint board around the Vanforces mark (see EcosystemBoard). One link and a short note say the rest.
 */
export function EcosystemSection() {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHeading
          variant="fine"
          align="center"
          eyebrow="Connected systems"
          title="Works With the Systems"
          titleMuted="You Already Use."
          description="ERP, accounting, messaging and e-invoicing tools, connected to the daily field operation."
        />

        <ScrollReveal delay={100} className="mt-14 md:mt-20">
          <EcosystemBoard />
        </ScrollReveal>

        <ScrollReveal delay={160} className="mt-12 flex flex-col items-center gap-2 text-center">
          <Link href="/integrations" className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-teal-deep hover:text-navy">
            Explore all integrations
            <ArrowRight aria-hidden="true" size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <p className="max-w-[40rem] text-[12.5px] leading-relaxed text-muted">Scope depends on the connector and the implementation. Names and logos belong to their owners and are shown only to name the systems Vanforces can work alongside.</p>
        </ScrollReveal>
      </div>
    </section>
  );
}

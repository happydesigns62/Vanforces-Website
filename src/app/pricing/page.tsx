import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/global/Button";
import { CTASection, PageHero, SectionHeading } from "@/components/global/Common";
import { ScrollReveal } from "@/components/motion/Reveal";
import { TrustedStrip } from "@/components/customers/CustomerProof";
import { FaqSection } from "@/components/commercial/FAQAccordion";
import { PlanComparison, PricingPlans } from "@/components/commercial/Pricing";
import { art } from "@/data/media";
import { pricingFaqs } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Compare Vanforces plans and find the one that fits your team and your next stage of growth.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Choose what works for you"
        title="A Plan for the Way You Operate."
        description="Every distribution business works differently. Find a plan that fits your team and your next stage of growth."
        crumbs={[{ label: "Pricing" }]}
        layout="split"
        visual={<Image src={art.pricing.src} alt="The Vanforces box mascot inspecting a large price tag with a magnifying glass." width={art.pricing.width} height={art.pricing.height} sizes="(max-width: 1024px) 70vw, 420px" priority className="mx-auto h-auto w-full max-w-[360px]" />}
      />
      <section className="px-3 pb-6 pt-4 md:px-6">
        <div className="plan-panel mx-auto max-w-[1320px] rounded-[32px] px-5 py-12 md:rounded-[40px] md:py-16 lg:px-14">
          <div className="mx-auto max-w-[1120px]">
            <PricingPlans onPanel />
          </div>
        </div>
      </section>

      <TrustedStrip />

      <section id="compare" className="section scroll-mt-20 bg-band-cyan">
        <div className="wrap">
          <SectionHeading variant="fine" eyebrow="Compare plans" title="See What Each Plan" titleMuted="Brings Together." className="mb-10" />
          <ScrollReveal>
            <PlanComparison />
          </ScrollReveal>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <ScrollReveal className="grid gap-5 rounded-[28px] bg-white border border-line p-7 shadow-[0_1px_2px_rgb(41_59_71/0.05)] md:grid-cols-[minmax(0,8fr)_auto] md:items-center md:p-9">
            <div>
              <h2 className="t-card !text-[22px]">Wondering whether it&apos;s worth it?</h2>
              <p className="body mt-1.5">Estimate the value of time saved, using your own numbers.</p>
            </div>
            <Button href="/roi" variant="secondary" arrow>
              Open the ROI Calculator
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <FaqSection items={pricingFaqs} title="Pricing questions" />
      <CTASection title="Not sure which plan fits?" description="See how Vanforces fits into your business before making a decision." primary={{ label: "Book a Demo", href: "/book-demo" }} secondary={{ label: "Get Started", href: "/get-started" }} />
    </>
  );
}

import type { Metadata } from "next";
import { Button } from "@/components/global/Button";
import { SectionHeading } from "@/components/global/Common";
import { ScrollReveal } from "@/components/motion/Reveal";
import { ClosingPanel } from "@/components/home/ClosingPanel";
import { CommandCenter } from "@/components/home/CommandCenter";
import { ControlRoomSection } from "@/components/home/ControlRoomSection";
import { SectionTabs } from "@/components/home/SectionTabs";
import { ModulesExplorer } from "@/components/home/ModulesExplorer";
import { HomeHero } from "@/components/home/HomeHero";
import { ComparePreview } from "@/components/home/ComparePreview";
import { EcosystemSection } from "@/components/home/EcosystemSection";
import { EntauraShowcase } from "@/components/home/EntauraShowcase";
import { PricingSelector } from "@/components/home/PricingSelector";
import { SolutionFinder } from "@/components/home/SolutionFinder";
import { StoriesSection } from "@/components/home/StoriesSection";
import { ValueSection } from "@/components/home/ValueSection";
import { WhyVanforces } from "@/components/home/WhyVanforces";

export const metadata: Metadata = {
  title: { absolute: "Vanforces | Connect Your Entire Distribution Operation" },
  description:
    "From the warehouse to the road and back to the office, Vanforces keeps your teams, transactions and business information connected.",
};

function Explore() {
  return (
    <section className="section bg-mist">
      <div className="wrap">
        <SectionHeading
          variant="fine"
          eyebrow="Find your fit"
          title="Tell Us"
          titleMuted="What You Need."
          description="Describe your operation in a few words. We'll point you to the Vanforces solutions that fit."
        />
        <SolutionFinder />
        <div className="mt-24 md:mt-28">
          <SectionHeading
            variant="fine"
            eyebrow="Explore the platform"
            title="Every Part of"
            titleMuted="the Job, Covered."
            description="Browse the modules for sales, distribution and retail execution, and open any one for details."
          />
        </div>
        <ModulesExplorer />
        <ScrollReveal className="mt-16 flex flex-col items-start justify-between gap-5 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="text-[1.25rem] font-medium tracking-[-0.02em] text-navy-deep">Made for the field. Connected to the office.</p>
          <Button href="/platform/modules" variant="secondary" arrow>
            Explore All Features
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
export default function Home() {
  return (
    <>
      <HomeHero />
      <Explore />
      <PricingSelector />
      <SectionTabs
        label="Business views"
        tabs={[
          { label: "Business Command Center", panel: <CommandCenter /> },
          { label: "Control Room Monitoring", panel: <ControlRoomSection /> },
        ]}
      />
      <EntauraShowcase />
      <StoriesSection />
      <WhyVanforces value={<ValueSection />} compare={<ComparePreview />} />
      <EcosystemSection />
      <ClosingPanel />
    </>
  );
}


import type { Metadata } from "next";
import { CTASection, PageHero, SectionHeading } from "@/components/global/Common";
import { Mascot } from "@/components/global/Mascot";
import { ScrollReveal } from "@/components/motion/Reveal";
import { ModuleCard } from "@/components/product/Cards";
import { ModuleDirectory } from "@/components/product/ModuleDirectory";

export const metadata: Metadata = {
  title: "All Modules",
  description: "Explore the Vanforces capabilities supporting salespeople, warehouse operations, customer transactions, deliveries, finance and business management.",
};

export default function ModulesPage() {
  return (
    <>
      <PageHero
        eyebrow="All Modules"
        title="Find the Tools Behind Your Operation."
        description="Explore the capabilities supporting salespeople, warehouse operations, customer transactions, deliveries, finance and business management."
        crumbs={[{ label: "Platform", href: "/platform" }, { label: "All Modules" }]}
        layout="split"
        visual={<Mascot name="signpost" priority sizes="(max-width: 1024px) 70vw, 420px" className="mx-auto w-full max-w-[400px]" />}
      />
      <section className="pb-12 pt-4 md:pb-16">
        <div className="wrap">
          <ModuleDirectory />
        </div>
      </section>
      <section className="section bg-paper">
        <div className="wrap">
          <SectionHeading eyebrow="Beyond the core modules" title="Also worth a look." />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <ScrollReveal className="h-full">
              <ModuleCard title="Operations Control Room" href="/platform/control-room" body="Available operational widgets and activity information in a focused review." />
            </ScrollReveal>
            <ScrollReveal delay={80} className="h-full">
              <ModuleCard title="Business Intelligence" href="/platform/intelligence" body="Understand customers, products, sales, collections and performance." />
            </ScrollReveal>
            <ScrollReveal delay={160} className="h-full">
              <ModuleCard title="SpeakOrder" badge="Product Preview" href="/platform/b2b-ordering" body="A proposed dedicated ordering experience connected with Vanforces." />
            </ScrollReveal>
          </div>
        </div>
      </section>
      <CTASection
        title="Not sure where to start?"
        description="Begin with the work you want to improve, and we'll point you to the modules behind it."
        primary={{ label: "See Use Cases", href: "/platform/use-cases" }}
        secondary={{ label: "Book a Demo", href: "/book-demo" }}
      />
    </>
  );
}

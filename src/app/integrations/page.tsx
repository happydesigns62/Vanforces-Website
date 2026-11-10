import type { Metadata } from "next";
import { CTASection, PageHero, SectionHeading } from "@/components/global/Common";
import { Mascot } from "@/components/global/Mascot";
import { ScrollReveal } from "@/components/motion/Reveal";
import { FaqSection } from "@/components/commercial/FAQAccordion";
import { ModuleCard } from "@/components/product/Cards";
import { ConnectionHub } from "@/components/home/IntegrationsSection";
import { WorkflowDiagram } from "@/components/product/Diagrams";
import { integrationPillars, integrations } from "@/data/integrations";

export const metadata: Metadata = {
  title: "Integrations",
  description: "Bring supported business data closer to the people using it in daily distribution. Explore ERP, Zoho Books and Odoo integration topics.",
};

export default function IntegrationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Integrations"
        title="Your ERP. Your Field Teams. One Connected Operation."
        description="Bring supported business data closer to the people using it in daily distribution."
        crumbs={[{ label: "Integrations" }]}
        ctas={[
          { label: "Discuss an Integration", href: "/contact", arrow: true },
          { label: "ERP Integration API", href: "/integrations/erp-api", variant: "secondary" },
        ]}
        layout="split"
        visual={<Mascot name="company" priority sizes="(max-width: 1024px) 70vw, 420px" className="mx-auto w-full max-w-[400px]" />}
      />
      <section className="pb-10">
        <div className="wrap">
          <div className="pt-8">
            <ConnectionHub />
          </div>
          <p className="mt-3 text-center text-[12.5px] text-muted">Illustration of the data flow. Exact capabilities depend on the connector and implementation scope.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="What moves between systems" title="Four things every integration has to handle." className="mb-10" />
          <div className="grid gap-4 md:grid-cols-2">
            {integrationPillars.map((pillar, index) => (
              <div key={pillar.title} data-reveal="" suppressHydrationWarning style={{ "--d": `${index * 80}ms` } as React.CSSProperties} className={`rounded-[28px] p-8 ${index === 0 || index === 3 ? "bg-cyan-soft" : "border border-line"}`}>
                <h3 className="text-[clamp(1.375rem,1.2rem+0.6vw,1.75rem)] font-bold tracking-tight">{pillar.title}</h3>
                <p className="body mt-2">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="wrap">
          <SectionHeading eyebrow="How a project usually runs" title="Start with the data, then connect the systems." className="mb-10" />
          <WorkflowDiagram steps={["Review requirements", "Agree data ownership", "Map records", "Test the exchange", "Review exceptions"]} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="Explore further" title="Integration topics by system." className="mb-10" />
          <div className="grid gap-4 md:grid-cols-3">
            {integrations.map((item, index) => (
              <ScrollReveal key={item.slug} delay={index * 80} className="h-full">
                <ModuleCard title={item.name} body={item.heading} href={`/integrations/${item.slug}`} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FaqSection
        items={[
          { q: "Can Vanforces connect with an existing ERP?", a: "Vanforces supports integration approaches for applicable business systems. Exact capabilities depend on the connector and implementation scope." },
          { q: "How does data synchronization work?", a: "Supported business records are exchanged through configured integration workflows, with available statuses and exception handling." },
          { q: "What if our system isn't listed?", a: "Share your requirements through the contact form so they can be reviewed." },
        ]}
      />
      <CTASection title="Let's talk about your systems." description="Tell us what you run today and what you'd like field teams to work from." primary={{ label: "Discuss an Integration", href: "/contact" }} secondary={{ label: "Become a Partner", href: "/partners" }} />
    </>
  );
}

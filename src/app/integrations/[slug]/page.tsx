import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckSquare } from "lucide-react";
import { CTASection, DemoNotice, PageHero, SectionHeading } from "@/components/global/Common";
import { Mascot } from "@/components/global/Mascot";
import { ScrollReveal } from "@/components/motion/Reveal";
import { FaqSection } from "@/components/commercial/FAQAccordion";
import { RelatedModules } from "@/components/product/Cards";
import { IntegrationDiagram } from "@/components/product/Diagrams";
import { FeatureSet } from "@/components/product/FeatureSet";
import { integrationBySlug, integrations } from "@/data/integrations";

type Props = { params: Promise<{ slug: string }> };

export const instant = false;

export function generateStaticParams() {
  return integrations.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = integrationBySlug(slug);
  if (!page) return {};
  return { title: page.name.includes("Integration") ? page.name : `${page.name} Integration`, description: page.description, openGraph: { title: page.heading, description: page.description } };
}

export default async function IntegrationDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = integrationBySlug(slug);
  if (!page) notFound();
  const others = integrations.filter((i) => i.slug !== page.slug);

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.heading}
        description={page.description}
        crumbs={[{ label: "Integrations", href: "/integrations" }, { label: page.name }]}
        ctas={[
          { label: page.cta.label, href: page.cta.href, arrow: true },
          { label: "All Integrations", href: "/integrations", variant: "secondary" },
        ]}
      />
      <section className="pb-8">
        <div className="wrap">
          <IntegrationDiagram left={page.leftNode} />
          <DemoNotice className="mt-5">{page.scopeNote}</DemoNotice>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="What to work through" title={page.sectionHeading} className="mb-10" />
          <FeatureSet layout={page.layout} features={page.sections} />
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <ScrollReveal className="grid gap-6 rounded-[24px] bg-band-cyan p-7 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:p-12">
            <div>
              <h2 className="t-section !text-[clamp(1.26rem,1.092rem+0.84vw,1.89rem)]">Before the first conversation</h2>
              <p className="body mt-3">Having these ready usually makes a requirements discussion more useful.</p>
              <Mascot name="confirm" sizes="220px" className="mt-5 w-44 md:w-52" />
            </div>
            <ul className="space-y-3">
              {page.checklist.map((item) => (
                <li key={item} className="flex gap-3 text-[16px] font-medium">
                  <CheckSquare aria-hidden="true" size={20} className="mt-0.5 shrink-0 text-teal-deep" />
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <FaqSection items={page.faqs} />
      <RelatedModules
        title="Related topics"
        items={[
          ...others.map((o) => ({ label: o.name, href: `/integrations/${o.slug}`, body: o.heading })),
          { label: "IT & ERP Teams", href: "/solutions/it-erp", body: "How Vanforces supports technology teams." },
        ]}
      />
      <CTASection title="Share your integration requirements." description="We'll look at your systems, your data and what you need field teams to work from." primary={page.cta} secondary={{ label: "Deployment & Adoption", href: "/company/deployment" }} />
    </>
  );
}

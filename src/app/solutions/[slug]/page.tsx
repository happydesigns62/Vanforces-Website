import type { Metadata } from "next";
import { ScenePhoto } from "@/components/product/ScenePhoto";
import { TrustedStrip } from "@/components/customers/CustomerProof";
import { notFound } from "next/navigation";
import { CTASection, PageHero, SectionHeading } from "@/components/global/Common";
import { ScrollReveal } from "@/components/motion/Reveal";
import { FaqSection } from "@/components/commercial/FAQAccordion";
import { RelatedModules } from "@/components/product/Cards";
import { IntegrationDiagram, WorkflowDiagram } from "@/components/product/Diagrams";
import { FeatureSet } from "@/components/product/FeatureSet";
import { HeroVisualView } from "@/components/product/Visuals";
import { Mascot } from "@/components/global/Mascot";
import { mascots } from "@/data/media";
import { solutionBySlug, solutions } from "@/data/solutions";

type Props = { params: Promise<{ slug: string }> };

export const instant = false;

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = solutionBySlug(slug);
  if (!s) return {};
  return { title: `${s.role}: ${s.heading}`, description: s.description, openGraph: { title: s.heading, description: s.description } };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const s = solutionBySlug(slug);
  if (!s) notFound();

  return (
    <>
      <PageHero
        eyebrow={s.eyebrow}
        title={s.heading}
        description={s.description}
        crumbs={[{ label: "Solutions", href: "/solutions" }, { label: s.role }]}
        layout={s.visual.kind === "phones" ? "split" : "stacked"}
        ctas={[
          { label: s.cta.label, href: s.cta.href, arrow: true },
          { label: "All Solutions", href: "/solutions", variant: "secondary" },
        ]}
        visual={<HeroVisualView visual={s.visual} />}
      />
      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="How Vanforces helps" title={s.sectionHeading} className="mb-12" />
          <FeatureSet layout={s.layout} features={s.sections} visual={s.featureVisual} />
        </div>
      </section>
      {s.slug === "it-erp" ? (
        <section className="section-tight">
          <div className="wrap">
            <SectionHeading title="A simple view of the architecture" className="mb-8" />
            <IntegrationDiagram />
          </div>
        </section>
      ) : null}
      <section className="section-tight">
        <div className="wrap">
          <div className="rounded-[24px] bg-band-cyan p-7 md:p-12">
            <ScrollReveal className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h2 className="t-section max-w-3xl !text-[clamp(1.365rem,1.176rem+0.84vw,2.1rem)]">{s.dayInLife.heading}</h2>
                <p className="lede mt-4 max-w-3xl">{s.dayInLife.body}</p>
              </div>
              <Mascot name={mascots.solutions[s.slug] ?? "business"} sizes="240px" className="w-44 shrink-0 md:w-56" />
            </ScrollReveal>
            <div className="mt-10">
              <WorkflowDiagram steps={s.dayInLife.steps} />
            </div>
          </div>
        </div>
      </section>
      <ScenePhoto slug={s.slug} />
      <FaqSection items={s.faqs} />
      <RelatedModules items={s.related} title="Where to go next" />
      <TrustedStrip />
      <CTASection
        title="See what this looks like for your team."
        description="Share how your team works today, and we'll focus the conversation on the relevant workflows."
        primary={s.cta}
        secondary={{ label: "Explore Pricing", href: "/pricing" }}
      />
    </>
  );
}

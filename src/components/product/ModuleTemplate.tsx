import { X } from "lucide-react";
import { ScenePhoto } from "@/components/product/ScenePhoto";
import { TrustedStrip } from "@/components/customers/CustomerProof";
import { CTASection, DemoNotice, PageHero, SectionHeading } from "@/components/global/Common";
import { ScrollReveal } from "@/components/motion/Reveal";
import { FaqSection } from "@/components/commercial/FAQAccordion";
import { RelatedModules } from "./Cards";
import { WorkflowDiagram } from "./Diagrams";
import { FeatureSet } from "./FeatureSet";
import { HeroVisualView } from "./Visuals";
import { Mascot } from "@/components/global/Mascot";
import { mascots } from "@/data/media";
import type { Module } from "@/data/modules";

/** Full product page. The composition changes with module.layout and module.heroLayout. */
export function ModuleTemplate({ module: m }: { module: Module }) {
  const [, exampleMascot] = mascots.modules[m.slug] ?? (["business", "signpost"] as const);
  return (
    <>
      <PageHero
        eyebrow={m.eyebrow}
        title={m.heading}
        description={m.description}
        crumbs={[{ label: "Platform", href: "/platform" }, { label: m.name }]}
        layout={m.heroLayout}
        tag={m.status ? <span className="sample-tag">{m.status}</span> : undefined}
        ctas={[
          { label: m.cta.label, href: m.cta.href, arrow: true },
          { label: "Explore Plans & Pricing", href: "/pricing", variant: "secondary" },
        ]}
        visual={<HeroVisualView visual={m.visual} />}
      />

      {m.availabilityNote ? (
        <div className="wrap">
          <DemoNotice>{m.availabilityNote}</DemoNotice>
        </div>
      ) : null}

      <section className="section-tight">
        <div className="wrap">
          <div className="grid gap-6 rounded-[24px] bg-paper p-6 md:p-9 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
            <div>
              <ScrollReveal>
                <p className="eyebrow">The business challenge</p>
                <h2 className="t-section mt-4 !text-[clamp(1.625rem,1.4rem+1vw,2.5rem)]">{m.challenge.heading}</h2>
                <p className="lede mt-4">{m.challenge.body}</p>
              </ScrollReveal>
            </div>
            <ul className="self-center">
              {m.challenge.points.map((point, index) => (
                <li key={point} data-reveal="" suppressHydrationWarning style={{ "--d": `${index * 90}ms` } as React.CSSProperties} className="flex items-start gap-3 border-b border-line py-4 text-[15.5px] font-medium last:border-b-0">
                  <X aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-muted" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ScenePhoto slug={m.slug} />

      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="What Vanforces supports" title={m.featureHeading} />
          <div className="mt-12" />
          <FeatureSet layout={m.layout} features={m.features} visual={m.featureVisual} />
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="relative isolate overflow-hidden rounded-[24px] bg-navy-deep p-7 text-white md:p-12">
            <span aria-hidden="true" className="capsule -right-16 -top-24 -z-10 h-56 w-[460px] border-2 border-white/10" />
            <ScrollReveal>
              <h2 className="t-section max-w-3xl !text-[clamp(1.625rem,1.4rem+1vw,2.5rem)]">{m.workflow.heading}</h2>
              <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-white/75">{m.workflow.body}</p>
            </ScrollReveal>
            <div className="mt-10">
              <WorkflowDiagram steps={m.workflow.steps} dark />
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <ScrollReveal>
            <p className="eyebrow">Operational example</p>
            <Mascot name={exampleMascot} sizes="240px" className="mt-5 w-44 md:w-56" />
          </ScrollReveal>
          <ScrollReveal delay={90}>
            <p className="text-[clamp(1.25rem,1.1rem+0.7vw,1.75rem)] font-medium leading-snug tracking-tight">{m.example}</p>
          </ScrollReveal>
        </div>
      </section>

      <FaqSection items={m.faqs} />
      <RelatedModules slugs={m.related} />
      <TrustedStrip />
      <CTASection
        title={m.cta.label.startsWith("Book") ? "See it with your own workflows." : "Let's look at how this fits your operation."}
        description="Share how your team works today, and focus the conversation on the workflows that matter to you."
        primary={m.cta}
        secondary={{ label: "Explore Pricing", href: "/pricing" }}
        mascot="pointer"
      />
    </>
  );
}

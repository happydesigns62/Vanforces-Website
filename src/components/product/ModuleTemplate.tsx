import { ScenePhoto } from "@/components/product/ScenePhoto";
import { TrustedStrip } from "@/components/customers/CustomerProof";
import { CTASection, DemoNotice, PageHero, SectionHeading } from "@/components/global/Common";
import { ScrollReveal } from "@/components/motion/Reveal";
import { FaqSection } from "@/components/commercial/FAQAccordion";
import { RelatedModules } from "./Cards";
import { FeatureSet } from "./FeatureSet";
import { HeroVisualView } from "./Visuals";
import { Vignette, type VignetteKind } from "@/components/illustration/Vignettes";
import type { Module } from "@/data/modules";

// The small scene drawn for each step of a module's workflow. Modules not listed use the default order.
const stepScenes: Record<string, VignetteKind[]> = {
  "field-sales": ["plan", "map", "sell", "collect", "analyse"],
  "van-sales": ["stock", "deliver", "sell", "collect", "stock", "analyse"],
  routes: ["plan", "plan", "map", "read", "analyse"],
  customers: ["read", "plan", "sell", "collect", "plan"],
  orders: ["stock", "sell", "plan", "read", "sell"],
  inventory: ["stock", "stock", "deliver", "stock", "analyse"],
  delivery: ["plan", "plan", "deliver", "stock", "analyse"],
  collections: ["read", "collect", "collect", "collect", "analyse"],
  offline: ["stock", "map", "plan", "stock", "analyse"],
  "b2b-ordering": ["read", "sell", "plan", "deliver"],
  intelligence: ["read", "analyse", "analyse", "plan", "analyse"],
  "control-room": ["map", "analyse", "read", "plan", "analyse"],
};
const defaultScenes: VignetteKind[] = ["plan", "stock", "sell", "deliver", "collect", "analyse"];

/** Full product page. The composition changes with module.layout and module.heroLayout. */
export function ModuleTemplate({ module: m }: { module: Module }) {
  const scenes = stepScenes[m.slug] ?? defaultScenes;
  const exampleScene = scenes[Math.min(2, scenes.length - 1)];
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
                <h2 className="t-section mt-4 !text-[clamp(1.365rem,1.176rem+0.84vw,2.1rem)]">{m.challenge.heading}</h2>
                <p className="lede mt-4">{m.challenge.body}</p>
              </ScrollReveal>
            </div>
            <ul className="grid gap-3 self-center">
              {m.challenge.points.map((point, index) => (
                <li
                  key={point}
                  data-reveal=""
                  suppressHydrationWarning
                  style={{ "--d": `${index * 90}ms` } as React.CSSProperties}
                  className="flex items-start gap-3.5 rounded-[18px] bg-white px-5 py-4 text-[15.5px] font-medium leading-snug shadow-[0_1px_2px_rgb(41_59_71/0.06)]"
                >
                  <span aria-hidden="true" className="mt-[7px] size-2.5 shrink-0 rounded-full bg-brand-orange" />
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
          <div className="rounded-[28px] bg-band-cyan p-6 md:p-10">
            <ScrollReveal>
              <h2 className="t-section max-w-3xl !text-[clamp(1.365rem,1.176rem+0.84vw,2.1rem)]">{m.workflow.heading}</h2>
              <p className="lede mt-4 max-w-3xl">{m.workflow.body}</p>
            </ScrollReveal>
            <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr">
              {m.workflow.steps.map((step, index) => (
                <li
                  key={step}
                  data-reveal=""
                  suppressHydrationWarning
                  style={{ "--d": `${index * 90}ms` } as React.CSSProperties}
                  className="rounded-[22px] bg-white p-2.5 shadow-[0_1px_2px_rgb(41_59_71/0.06)]"
                >
                  <Vignette kind={scenes[index % scenes.length]} className="h-[104px] w-full rounded-[14px] bg-paper" />
                  <div className="px-2 pb-2 pt-3">
                    <span className="text-[12px] font-bold tabular-nums text-teal-deep">{String(index + 1).padStart(2, "0")}</span>
                    <p className="mt-0.5 text-[15px] font-semibold leading-snug text-navy-deep">{step}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="grid items-center gap-6 rounded-[28px] border border-line bg-white p-6 shadow-[0_1px_2px_rgb(41_59_71/0.05)] md:p-10 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-10">
            <ScrollReveal>
              <p className="eyebrow">Operational example</p>
              <p className="mt-5 text-pretty text-[clamp(1.05rem,0.924rem+0.588vw,1.47rem)] font-medium leading-snug tracking-[-0.025em] text-navy-deep">{m.example}</p>
            </ScrollReveal>
            <Vignette kind={exampleScene} className="mx-auto h-[190px] w-full max-w-[280px] rounded-[20px] bg-band-cyan p-2" />
          </div>
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

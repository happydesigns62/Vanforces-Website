import type { Metadata } from "next";
import { ScenePhoto } from "@/components/product/ScenePhoto";
import { TrustedStrip } from "@/components/customers/CustomerProof";
import { notFound } from "next/navigation";
import { CTASection, PageHero, SectionHeading } from "@/components/global/Common";
import { ScrollReveal } from "@/components/motion/Reveal";
import { FaqSection } from "@/components/commercial/FAQAccordion";
import { RelatedModules } from "@/components/product/Cards";
import { ChainDiagram, WorkflowDiagram } from "@/components/product/Diagrams";
import { PrivacyCaption, WebScreenshotFrame } from "@/components/product/Frames";
import { PhoneDuo } from "@/components/product/Visuals";
import { Mascot } from "@/components/global/Mascot";
import { mascots, web } from "@/data/media";
import { industries, industryBySlug, type Industry } from "@/data/industries";

type Props = { params: Promise<{ slug: string }> };

export const instant = false;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const i = industryBySlug(slug);
  if (!i) return {};
  return { title: `${i.name}: ${i.heading}`, description: i.description, openGraph: { title: i.heading, description: i.description } };
}

/** Each industry has its own way of showing its challenges and workflow. */
function Challenges({ industry }: { industry: Industry }) {
  const delay = (i: number) => ({ "--d": `${i * 80}ms` }) as React.CSSProperties;
  if (industry.composition === "outlets") {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {industry.challenges.map((c, i) => (
          <div key={c.title} data-reveal="" suppressHydrationWarning style={delay(i)} className={`rounded-[28px] p-7 ${i === 0 || i === 3 ? "bg-cyan-soft" : "border border-line"}`}>
            <h3 className="t-card">{c.title}</h3>
            <p className="body mt-2">{c.body}</p>
          </div>
        ))}
      </div>
    );
  }
  if (industry.composition === "chain") {
    return (
      <ol className="border-t border-navy/80">
        {industry.challenges.map((c, i) => (
          <li key={c.title} data-reveal="" suppressHydrationWarning style={delay(i)} className="grid gap-2 border-b border-line py-6 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
            <h3 className="t-card">{c.title}</h3>
            <p className="body">{c.body}</p>
          </li>
        ))}
      </ol>
    );
  }
  if (industry.composition === "cycle") {
    return (
      <div className="grid gap-px overflow-hidden rounded-[28px] bg-line md:grid-cols-3">
        {industry.challenges.map((c, i) => (
          <div key={c.title} data-reveal="" suppressHydrationWarning style={delay(i)} className="bg-navy-deep p-8 text-white">
            <h3 className="t-card">{c.title}</h3>
            <p className="mt-2 leading-relaxed text-white/75">{c.body}</p>
          </div>
        ))}
      </div>
    );
  }
  return (
    <ul className="grid gap-x-10 md:grid-cols-2">
      {industry.challenges.map((c, i) => (
        <li key={c.title} data-reveal="" suppressHydrationWarning style={delay(i)} className="border-t-2 border-teal py-6">
          <h3 className="t-card">{c.title}</h3>
          <p className="body mt-2">{c.body}</p>
        </li>
      ))}
    </ul>
  );
}

function Workflow({ industry }: { industry: Industry }) {
  if (industry.composition === "cycle") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-4">
        {industry.workflow.map((step, i) => (
          <span key={step} className="flex items-center gap-3" data-reveal="" suppressHydrationWarning style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
            <span className="flex size-28 items-center justify-center rounded-full border-2 border-teal bg-white p-2 text-center text-[14px] font-bold leading-tight md:size-32 md:text-[15px]">{step}</span>
            {i < industry.workflow.length - 1 ? <span aria-hidden="true" className="text-xl text-teal">→</span> : null}
          </span>
        ))}
      </div>
    );
  }
  if (industry.composition === "chain") return <ChainDiagram steps={industry.workflow} />;
  return <WorkflowDiagram steps={industry.workflow} />;
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const i = industryBySlug(slug);
  if (!i) notFound();

  return (
    <>
      <PageHero
        eyebrow={i.eyebrow}
        title={i.heading}
        description={i.description}
        crumbs={[{ label: "Industries", href: "/industries" }, { label: i.name }]}
        layout={i.web ? "stacked" : "split"}
        ctas={[
          { label: i.cta.label, href: i.cta.href, arrow: true },
          { label: "All Industries", href: "/industries", variant: "secondary" },
        ]}
        visual={
          <>
            {i.web ? <WebScreenshotFrame shot={web[i.web]} priority /> : i.phones ? <PhoneDuo phones={i.phones} priority /> : null}
            <PrivacyCaption className={`mt-3 ${i.web ? "" : "text-center"}`} />
          </>
        }
      />

      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="Main challenges" title={i.challengesHeading} className="mb-10" />
          <Challenges industry={i} />
        </div>
      </section>

      <section className="section bg-paper">
        <div className="wrap">
          <SectionHeading eyebrow="Vanforces workflow" title={i.workflowHeading} description={i.workflowIntro} className="mb-10" />
          <Workflow industry={i} />
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <ScrollReveal className="h-full rounded-[28px] border border-line p-8 md:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow">Example scenario</p>
            </div>
            <p className="mt-4 text-[clamp(1.05rem,0.924rem+0.588vw,1.47rem)] font-medium leading-snug tracking-[-0.03em]">{i.scenario}</p>
            <p className="body mt-4">{i.scenarioDetail}</p>
          </ScrollReveal>
          <ScrollReveal delay={90} className="h-full rounded-[28px] bg-band-cyan p-8 md:p-10">
            <p className="eyebrow">Business value</p>
            <p className="mt-4 text-[clamp(1.05rem,0.882rem+0.42vw,1.26rem)] font-semibold leading-snug tracking-tight">{i.value}</p>
            <Mascot name={mascots.industries[i.slug] ?? "business"} sizes="230px" className="mt-6 w-44 md:w-56" />
          </ScrollReveal>
        </div>
      </section>

      <ScenePhoto slug={i.slug} />
      <FaqSection items={i.faqs} />
      <RelatedModules items={i.modules} title="Relevant modules" />
      <TrustedStrip />
      <CTASection
        title={`See what Vanforces looks like for ${i.name}.`}
        description="Tell us how your products reach customers, and we'll focus on the workflows that matter to you."
        primary={i.cta}
        secondary={{ label: "See Customer Stories", href: "/customers" }}
      />
    </>
  );
}

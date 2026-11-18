import Link from "next/link";
import { CTASection, PageHero, SectionHeading } from "@/components/global/Common";
import { ScreenshotReveal, ScrollReveal } from "@/components/motion/Reveal";
import { WorkflowDiagram } from "@/components/product/Diagrams";
import { PrivacyCaption, WebScreenshotFrame } from "@/components/product/Frames";
import { PhoneDuo } from "@/components/product/Visuals";
import { customerStories, testimonials, type CustomerStory } from "@/data/customers";
import { Mascot } from "@/components/global/Mascot";
import { mascots, web } from "@/data/media";
import { CustomerStoryCard, TestimonialCard, TrustedStrip } from "./CustomerProof";

export function CaseStudyLayout({ story }: { story: CustomerStory }) {
  const others = customerStories.filter((s) => s.slug !== story.slug).slice(0, 2);
  const sections = [
    { label: "Business Context", body: story.context },
    { label: "Operational Challenge", body: story.challenge },
    { label: "Vanforces Workflow", body: story.workflow },
    { label: "Business Value", body: story.value },
  ];

  return (
    <>
      <PageHero
        eyebrow={`Customer story · ${story.industry}`}
        title={story.title}
        description={story.company}
        crumbs={[{ label: "Customers", href: "/customers" }, { label: story.company }]}
        layout="split"
        visual={<Mascot name={mascots.stories[story.slug] ?? "business"} priority sizes="(max-width: 1024px) 70vw, 360px" className="mx-auto w-full max-w-[340px]" />}
      />

      <section className="section-tight">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-14">
          <div className="space-y-10">
            {sections.map((section, index) => (
              <ScrollReveal key={section.label} delay={index * 40}>
                <h2 className="eyebrow">{section.label}</h2>
                <p className="mt-3 text-[clamp(1.05rem,0.924rem+0.588vw,1.47rem)] font-medium leading-snug tracking-tight">{section.body}</p>
              </ScrollReveal>
            ))}
          </div>
          <aside className="self-start rounded-[28px] bg-band-cyan p-6 lg:sticky lg:top-24">
            <dl className="space-y-4 text-[15px]">
              <div>
                <dt className="text-[13px] text-muted">Company</dt>
                <dd className="font-semibold">{story.company}</dd>
              </div>
              <div>
                <dt className="text-[13px] text-muted">Industry</dt>
                <dd className="font-semibold">{story.industry}</dd>
              </div>
              <div>
                <dt className="text-[13px] text-muted">Relevant modules</dt>
                <dd className="mt-1.5">
                  <ul className="flex flex-wrap gap-1.5">
                    {story.modules.map((module) => (
                      <li key={module.label}>
                        <Link href={module.href} className="block rounded-full border border-line bg-white px-3 py-1.5 text-[13.5px] font-medium transition-colors hover:border-teal hover:text-teal-deep">
                          {module.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="section bg-band-cyan">
        <div className="wrap">
          <SectionHeading eyebrow="How the day could flow" title="The workflow, step by step." className="mb-10" />
          <WorkflowDiagram steps={story.dayFlow} />
          <ScreenshotReveal className="mt-10">
            {story.web ? <WebScreenshotFrame shot={web[story.web]} sizes="(max-width: 1320px) 100vw, 1216px" /> : story.phones ? <PhoneDuo phones={story.phones} /> : null}
            <PrivacyCaption className={`mt-4 ${story.web ? "" : "text-center"}`} />
          </ScreenshotReveal>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap max-w-4xl">
          <ScrollReveal>
            <TestimonialCard item={testimonials[story.quoteIndex]} large />
          </ScrollReveal>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <SectionHeading title="More stories" className="mb-8" />
          <div className="grid gap-5 md:grid-cols-2">
            {others.map((other) => (
              <ScrollReveal key={other.slug}>
                <CustomerStoryCard story={other} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <TrustedStrip />`n`n      <CTASection title="What would your story look like?" description="Tell us about your operation, and we'll look at the workflows that apply." primary={{ label: "Book a Demo", href: "/book-demo" }} secondary={{ label: "All Customer Stories", href: "/customers" }} />
    </>
  );
}

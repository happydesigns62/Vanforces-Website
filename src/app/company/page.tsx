import type { Metadata } from "next";
import { FieldPhotos } from "@/components/home/FieldPhotos";
import Image from "next/image";
import { CTASection, PageHero, SectionHeading } from "@/components/global/Common";
import { ScreenshotReveal, ScrollReveal } from "@/components/motion/Reveal";
import { ChainDiagram } from "@/components/product/Diagrams";
import { MobileScreenshotFrame } from "@/components/product/Frames";
import { art, phone } from "@/data/media";

export const metadata: Metadata = {
  title: "About Vanforces",
  description: "Distribution Simplified. Vanforces is built around bringing everyday working questions, and the information behind them, closer together.",
};

const questions = ["Which customer comes next?", "What stock is available?", "Has the order been delivered?", "What's still to collect?"];

const beliefs = [
  { title: "Technology That Supports the Working Day", body: "Software should help salespeople complete visits, warehouse teams manage stock, finance teams review payments and managers understand operations." },
  { title: "Connected Across the Business", body: "Sales, stock, delivery, collections and business reporting are connected parts of a larger operation." },
  { title: "Built for Practical Workflows", body: "Vanforces supports real distribution routines instead of presenting technology as an end in itself." },
];

export default function CompanyPage() {
  return (
    <>
      <PageHero
        eyebrow="About Vanforces"
        title="Distribution Simplified."
        description={
          <>
            <p>A distribution business is made up of countless everyday decisions.</p>
            <p className="mt-3">Vanforces is built around bringing these working questions and the information behind them closer together.</p>
          </>
        }
        crumbs={[{ label: "Company" }]}
        layout="split"
        ctas={[
          { label: "Explore Vanforces", href: "/platform", arrow: true },
          { label: "Contact Us", href: "/contact", variant: "secondary" },
        ]}
        visual={<Image src={art.about.src} alt="The Vanforces box mascot walking between a delivery truck and an open shop." width={art.about.width} height={art.about.height} priority className="mx-auto h-auto w-full max-w-[560px]" />}
      />

      <section className="section-tight bg-paper">
        <div className="wrap">
          <ul className="grid gap-x-8 gap-y-5 md:grid-cols-2 lg:grid-cols-4">
            {questions.map((question, index) => (
              <li key={question} data-reveal="" suppressHydrationWarning style={{ "--d": `${index * 90}ms` } as React.CSSProperties} className="border-l-2 border-teal pl-4 text-[clamp(1.125rem,1.05rem+0.4vw,1.375rem)] font-medium leading-snug tracking-[-0.03em]">
                {question}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Why Vanforces exists" title="The work is connected. The tools often aren't." description="Distribution activities often involve separate teams, systems and operational records. Vanforces focuses on connecting the workflows behind daily work." />
            <ScrollReveal delay={150} className="mt-8">
              <ChainDiagram steps={["Warehouse", "Field sales", "Customer", "Back office"]} />
            </ScrollReveal>
          </div>
          <ScreenshotReveal>
            <MobileScreenshotFrame shot={phone.splash} className="mx-auto max-w-[280px]" />
          </ScreenshotReveal>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="grid gap-px overflow-hidden rounded-[28px] border border-line bg-line lg:grid-cols-3">
            {beliefs.map((belief, index) => (
              <div key={belief.title} data-reveal="" suppressHydrationWarning style={{ "--d": `${index * 90}ms` } as React.CSSProperties} className="bg-white p-8 md:p-10">
                <h2 className="text-[clamp(1.25rem,1.1rem+0.6vw,1.625rem)] font-medium leading-tight tracking-[-0.03em]">{belief.title}</h2>
                <p className="body mt-3">{belief.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FieldPhotos />
      <CTASection title="See what connected work looks like." description="Explore the platform, or tell us about your operation." primary={{ label: "Explore Vanforces", href: "/platform" }} secondary={{ label: "Deployment & Adoption", href: "/company/deployment" }} />
    </>
  );
}

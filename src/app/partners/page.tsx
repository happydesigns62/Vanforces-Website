import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, SectionHeading } from "@/components/global/Common";
import { ScrollReveal } from "@/components/motion/Reveal";
import { PartnerForm } from "@/components/commercial/Forms";
import { art } from "@/data/media";

export const metadata: Metadata = {
  title: "Partners",
  description: "Build a better distribution experience together. Explore partnership opportunities for ERP, implementation, consulting and distribution specialists.",
};

const types = [
  { title: "ERP & Technology Partners", body: "Connect supported business systems with operational workflows." },
  { title: "Implementation Partners", body: "Bring technical and process expertise to deployment projects." },
  { title: "Consulting Partners", body: "Support distribution businesses in improving operational processes." },
  { title: "Distribution Specialists", body: "Explore collaboration opportunities around field sales and distribution software." },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partnerships"
        title="Build a Better Distribution Experience Together."
        description="Distribution businesses often rely on several specialists. If you work with ERP systems, deployments or field operations, we'd be glad to talk."
        crumbs={[{ label: "Partners" }]}
        layout="split"
        ctas={[{ label: "Discuss a Partnership", href: "#partner-form", arrow: true }]}
        visual={<Image src={art.partners.src} alt="Two Vanforces box mascots high-fiving among documents and symbols." width={art.partners.width} height={art.partners.height} sizes="(max-width: 1024px) 80vw, 520px" priority className="mx-auto h-auto w-full max-w-[500px]" />}
      />
      <section className="section-tight">
        <div className="wrap">
          <SectionHeading title="Ways to work together" className="mb-8" />
          <div className="grid gap-4 md:grid-cols-2">
            {types.map((type, index) => (
              <div key={type.title} data-reveal="" suppressHydrationWarning style={{ "--d": `${(index % 2) * 80}ms` } as React.CSSProperties} className="rounded-[28px] border border-line p-7 md:p-8">
                <h3 className="t-card">{type.title}</h3>
                <p className="body mt-2">{type.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="partner-form" className="section scroll-mt-20">
        <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <ScrollReveal>
            <h2 className="t-section !text-[clamp(1.75rem,1.5rem+1vw,2.5rem)]">Tell us about your organization.</h2>
            <p className="lede mt-4">Share who you work with, and where you think a collaboration could help.</p>
          </ScrollReveal>
          <ScrollReveal delay={90} className="rounded-[28px] border border-line p-6 md:p-9">
            <PartnerForm />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

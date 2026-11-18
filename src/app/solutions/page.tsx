import type { Metadata } from "next";
import { CTASection, PageHero, SectionHeading } from "@/components/global/Common";
import { Mascot } from "@/components/global/Mascot";
import { ScrollReveal } from "@/components/motion/Reveal";
import { ChainDiagram } from "@/components/product/Diagrams";
import { HeroVisualView } from "@/components/product/Visuals";
import { RoleSelector } from "@/components/product/RoleSelector";
import { solutions } from "@/data/solutions";

export const metadata: Metadata = {
  title: "Solutions by Role",
  description: "How Vanforces supports field teams, managers, finance teams and IT teams across one distribution operation.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions by role"
        title="Different Jobs. One Operation."
        description="A salesperson wants the next stop. A manager wants to know how the day is going. Finance wants to know what came in. IT wants the systems to agree. Vanforces supports each of them with the same connected records."
        crumbs={[{ label: "Solutions" }]}
        layout="split"
        visual={<Mascot name="company" priority sizes="(max-width: 1024px) 70vw, 420px" className="mx-auto w-full max-w-[400px]" />}
      />
      <section className="pb-12 pt-4 md:pb-16">
        <div className="wrap">
          <RoleSelector
            roles={solutions.map((solution) => ({
              id: solution.slug,
              label: solution.role,
              heading: solution.heading,
              body: solution.selectorBody,
              points: solution.sections.map((section) => section.title),
              href: `/solutions/${solution.slug}`,
              visual: <HeroVisualView visual={solution.visual} priority={false} />,
            }))}
          />
        </div>
      </section>
      <section className="section bg-paper">
        <div className="wrap">
          <SectionHeading eyebrow="Why it matters" title="A record made by one team becomes the starting point for another." description="When each role works in its own system, every handoff needs a call or a spreadsheet. When records connect, the next person can begin from what already happened." className="mb-10" />
          <ScrollReveal>
            <ChainDiagram steps={["Salesperson records a sale", "Warehouse sees the stock movement", "Finance reviews the collection", "Manager reads the report"]} />
          </ScrollReveal>
        </div>
      </section>
      <CTASection
        title="Bring your teams into the conversation."
        description="A demo works best when the people who do the work can see their part of it."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "Explore Modules", href: "/platform/modules" }}
      />
    </>
  );
}

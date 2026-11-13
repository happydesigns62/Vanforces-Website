import type { Metadata } from "next";
import { CTASection, PageHero, SectionHeading } from "@/components/global/Common";
import { Mascot } from "@/components/global/Mascot";
import { ScrollReveal } from "@/components/motion/Reveal";
import { FaqSection } from "@/components/commercial/FAQAccordion";
import { ROICalculator } from "@/components/commercial/ROICalculator";

export const metadata: Metadata = {
  title: "ROI Calculator",
  description: "Estimate the potential value of reducing time spent on manual coordination and repetitive administrative work. Illustrative estimates only.",
};

const reductions = [
  { title: "Calling for updates", body: "Asking the field where things stand instead of reviewing recorded activity." },
  { title: "Re-entering paper", body: "Typing up orders, receipts or stock notes after the fact." },
  { title: "Matching records", body: "Comparing separate lists of sales, stock and collections." },
  { title: "Preparing reports", body: "Assembling the same figures by hand for regular reviews." },
];

export default function RoiPage() {
  return (
    <>
      <PageHero
        eyebrow="Make every workday count"
        title="What Could a Better-Run Day Give Back?"
        description="Estimate the potential value of reducing time spent on manual coordination and repetitive administrative work."
        crumbs={[{ label: "Resources", href: "/resources" }, { label: "ROI Calculator" }]}
        layout="split"
        visual={<Mascot name="review" priority sizes="(max-width: 1024px) 70vw, 380px" className="mx-auto w-full max-w-[360px]" />}
      />
      <section className="pb-14">
        <div className="wrap">
          <ScrollReveal>
            <ROICalculator />
          </ScrollReveal>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="Where the minutes tend to go" title="Think about these when choosing your numbers." description="Your own estimate should reflect how your team really works. These are common places to look." className="mb-10" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reductions.map((item, index) => (
              <li key={item.title} data-reveal="" suppressHydrationWarning style={{ "--d": `${index * 80}ms` } as React.CSSProperties} className="rounded-[24px] bg-paper p-6">
                <h3 className="t-card">{item.title}</h3>
                <p className="body mt-2 !text-[15px]">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FaqSection
        items={[
          { q: "Is this a guarantee of savings?", a: "No. These are illustrative estimates based on your inputs, not guaranteed savings or financial returns." },
          { q: "Does it include subscription costs?", a: "No. It only estimates the value of time based on the inputs you provide." },
          { q: "What should I use for hourly staff cost?", a: "Use a figure that reflects your own staff costs. The $12 default is only an example." },
        ]}
      />
      <CTASection title="Put your estimate in context." description="Compare the plans, or discuss your numbers with us." primary={{ label: "Explore Pricing", href: "/pricing" }} secondary={{ label: "Book a Demo", href: "/book-demo" }} />
    </>
  );
}

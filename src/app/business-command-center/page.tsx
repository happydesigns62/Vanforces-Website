import type { Metadata } from "next";
import { CTASection, PageHero, SectionHeading } from "@/components/global/Common";
import { Vignette, type VignetteKind } from "@/components/illustration/Vignettes";
import { ScreenshotReveal, ScrollReveal } from "@/components/motion/Reveal";
import { FaqSection } from "@/components/commercial/FAQAccordion";
import { RelatedModules } from "@/components/product/Cards";
import { WorkflowDiagram } from "@/components/product/Diagrams";
import { PrivacyCaption, WebScreenshotFrame } from "@/components/product/Frames";
import { web } from "@/data/media";

export const metadata: Metadata = {
  title: "Business Command Center",
  description: "Bring sales, collections, customer balances and operational reporting into a clearer management perspective with the CXO Business Command Center.",
};

const questions: { q: string; a: string; scene: VignetteKind }[] = [
  { q: "What Is Selling?", a: "Sales, products and customer performance.", scene: "sell" },
  { q: "What Is Coming In?", a: "Collections and payment activity.", scene: "collect" },
  { q: "What Is Outstanding?", a: "Customer receivables and account balances.", scene: "read" },
  { q: "What Needs Attention?", a: "Trends, exceptions and relevant operational information.", scene: "analyse" },
];

const perspectives = [
  { name: "Finance", body: "Sales, collections, adjustments and settlement performance." },
  { name: "Customers", body: "Customer-level activity and account balances." },
  { name: "Routes", body: "How activity compares across routes." },
  { name: "Products", body: "What is moving across the product range." },
  { name: "Distributors", body: "A view of activity across distributors." },
];

export default function CommandCenterPage() {
  return (
    <>
      <PageHero
        eyebrow="CXO Business Command Center"
        title="The Day Is Happening Everywhere. See the Bigger Picture."
        description="Bring sales, collections, customer balances and operational reporting into a clearer management perspective."
        crumbs={[{ label: "Platform", href: "/platform" }, { label: "Business Command Center" }]}
        layout="stacked"
        ctas={[
          { label: "Book an Executive Demo", href: "/book-demo", arrow: true },
          { label: "Explore Business Intelligence", href: "/platform/intelligence", variant: "secondary" },
        ]}
        visual={
          <>
            <WebScreenshotFrame shot={web.cxoFinance} priority sizes="(max-width: 1320px) 100vw, 1216px" />
            <PrivacyCaption className="mt-3" />
          </>
        }
      />

      <section className="section-tight">
        <div className="wrap grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <ScrollReveal>
            <p className="eyebrow">The business challenge</p>
            <h2 className="t-section mt-4 !text-[clamp(1.625rem,1.4rem+1vw,2.5rem)]">By the time the numbers are together, the day has moved on.</h2>
          </ScrollReveal>
          <ScrollReveal delay={90}>
            <p className="lede">
              Sales, stock, delivery and collections usually live in different reports owned by different people. Leadership reviews often begin with reconciling the numbers instead of discussing what they mean. A shared view gives that conversation a better starting point.
            </p>
            <Vignette kind="analyse" className="mt-4 h-[120px] w-[174px] rounded-2xl bg-band-cyan" />
          </ScrollReveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="Four questions" title="What every leader wants to know." className="mb-10" />
          <dl className="grid gap-px overflow-hidden rounded-[28px] border border-line bg-line md:grid-cols-2">
            {questions.map((item, index) => (
              <div key={item.q} data-reveal="" suppressHydrationWarning style={{ "--d": `${index * 70}ms` } as React.CSSProperties} className="bg-white p-7 md:p-10">
                <Vignette kind={item.scene} className="mb-4 h-[76px] w-[110px] rounded-2xl bg-band-cyan" />
                <dt className="text-[clamp(1.5rem,1.3rem+0.8vw,2.125rem)] font-medium tracking-[-0.03em] text-navy-deep">{item.q}</dt>
                <dd className="body mt-2">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="wrap">
          <SectionHeading
            eyebrow="Order-to-cash"
            title="Follow the money from quotation to settlement."
            description="The funnel on the Finance view follows activity from quotations and orders through deliveries, sales, collections, expenses and settlements."
            className="mb-10"
          />
          <WorkflowDiagram steps={["Quotation", "Order", "Delivery", "Sales", "Collection", "Expenses", "Settlement"]} />
          <ScreenshotReveal className="mt-14">
            <WebScreenshotFrame shot={web.cxoTrends} sizes="(max-width: 1320px) 100vw, 1216px" />
            <PrivacyCaption className="mt-3" />
          </ScreenshotReveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="Business perspectives" title="One business. Five ways to look at it." className="mb-10" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {perspectives.map((item, index) => (
              <li key={item.name} data-reveal="" suppressHydrationWarning style={{ "--d": `${index * 70}ms` } as React.CSSProperties} className="rounded-[24px] bg-band-cyan p-6">
                <h3 className="t-card">{item.name}</h3>
                <p className="body mt-2 !text-[15px]">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FaqSection
        items={[
          { q: "Who is the Command Center for?", a: "Business owners, CEOs and CXOs, along with senior managers who review performance across the business." },
          { q: "Can we switch between views?", a: "Yes. The Command Center offers Finance, Customer, Route, Product and Distributor perspectives, with date filters and daily or monthly options." },
          { q: "Which plan includes it?", a: "It appears in the Enterprise plan." },
        ]}
      />
      <RelatedModules slugs={["intelligence", "collections", "control-room"]} />
      <CTASection
        title="See the bigger picture with your own questions."
        description="Tell us what you review each week, and we'll focus the conversation on the views that matter."
        primary={{ label: "Book an Executive Demo", href: "/book-demo" }}
        secondary={{ label: "Explore Pricing", href: "/pricing" }}
      />
    </>
  );
}

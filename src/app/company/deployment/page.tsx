import type { Metadata } from "next";
import { CTASection, PageHero } from "@/components/global/Common";
import { Mascot } from "@/components/global/Mascot";
import { ScrollReveal, ScreenshotReveal } from "@/components/motion/Reveal";
import { FaqSection } from "@/components/commercial/FAQAccordion";
import { WebScreenshotFrame, PrivacyCaption } from "@/components/product/Frames";
import { web } from "@/data/media";

export const metadata: Metadata = {
  title: "Deployment & Adoption",
  description: "A good system has to fit the way you work. See the five steps of a Vanforces deployment, from understanding the operation to review and improvement.",
};

const steps = [
  { title: "Understand the Operation", body: "Review branches, routes, customers, inventory, users and transaction workflows.", detail: "Useful inputs: your route list, a sample of customers and products, and how a typical day runs." },
  { title: "Configure the Platform", body: "Set up available modules, users, pricing and business rules.", detail: "Company settings cover items such as working days, currencies and languages." },
  { title: "Connect Business Data", body: "Plan supported data exchange and ERP integration where needed.", detail: "Agree the source of truth for each record type before any data moves." },
  { title: "Prepare the Team", body: "Introduce the mobile and administrative workflows.", detail: "Field users, supervisors and office teams each need to see their part of the process." },
  { title: "Review & Improve", body: "Check configured processes and address identified issues.", detail: "Early reviews show which settings and habits need adjusting." },
];

export default function DeploymentPage() {
  return (
    <>
      <PageHero
        eyebrow="Deployment & Adoption"
        title="A Good System Has to Fit the Way You Work."
        description="Rolling out a distribution platform is as much about people and routines as it is about software. This is how the work typically comes together."
        crumbs={[{ label: "Company", href: "/company" }, { label: "Deployment" }]}
        layout="split"
        visual={<Mascot name="company" priority sizes="(max-width: 1024px) 70vw, 420px" className="mx-auto w-full max-w-[400px]" />}
      />
      <section className="pb-12 md:pb-16">
        <div className="wrap">
          <ol className="relative">
            <span aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-px bg-cyan-line md:left-[23px]" />
            {steps.map((step, index) => (
              <li key={step.title} className="relative grid gap-3 pb-10 pl-14 last:pb-0 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-10 md:pl-20">
                <span className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-full bg-navy-deep text-[14px] font-bold text-white md:size-12">{index + 1}</span>
                <ScrollReveal>
                  <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-teal-deep">Step {String(index + 1).padStart(2, "0")}</p>
                  <h2 className="mt-1.5 text-[clamp(1.26rem,1.092rem+0.672vw,1.785rem)] font-medium leading-tight tracking-[-0.03em]">{step.title}</h2>
                </ScrollReveal>
                <ScrollReveal delay={80} className="md:pt-6">
                  <p className="lede !text-navy">{step.body}</p>
                  <p className="body mt-2">{step.detail}</p>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section-tight bg-paper">
        <div className="wrap">
          <ScreenshotReveal>
            <WebScreenshotFrame shot={web.settings} sizes="(max-width: 1320px) 100vw, 1216px" />
            <PrivacyCaption className="mt-3" />
          </ScreenshotReveal>
        </div>
      </section>
      <div className="pt-8">
        <FaqSection
          items={[
            { q: "How long does a deployment take?", a: "It depends on your operation, data readiness and integration scope. A realistic plan can be discussed once these are understood." },
            { q: "Do we need an ERP integration from the start?", a: "Not necessarily. Whether to include it at the start can be reviewed as part of planning." },
            { q: "Who should be involved from our side?", a: "Usually someone from sales or operations, someone from finance, and whoever manages your business systems." },
          ]}
        />
      </div>
      <CTASection title="Plan your rollout around how you work." description="Tell us about your routes, teams and systems." primary={{ label: "Plan Your Vanforces Deployment", href: "/book-demo" }} secondary={{ label: "IT & ERP Teams", href: "/solutions/it-erp" }} />
    </>
  );
}

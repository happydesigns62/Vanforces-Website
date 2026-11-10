import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, HelpCircle } from "lucide-react";
import { CTASection, PageHero } from "@/components/global/Common";
import { ScrollReveal } from "@/components/motion/Reveal";
import { Mascot, MascotBadge } from "@/components/global/Mascot";
import { mascots } from "@/data/media";
import { guides } from "@/data/resources";

export const metadata: Metadata = {
  title: "Resources",
  description: "Educational guides on van sales, route planning, ERP connections, collections, stock movement and business reporting.",
};

export default function ResourcesPage() {
  const [lead, ...rest] = guides;
  return (
    <>
      <PageHero eyebrow="Vanforces Resources" title="Find the Detail When You Need It." description="Practical guides on the everyday work of distribution, plus answers and tools to help you think through your next step." crumbs={[{ label: "Resources" }]} layout="split" visual={<Mascot name="inspector" priority sizes="(max-width: 1024px) 70vw, 420px" className="mx-auto w-full max-w-[400px]" />} />

      <section className="pb-14 md:pb-20">
        <div className="wrap">
          <ScrollReveal>
            <Link href={`/resources/guides/${lead.slug}`} className="link-arrow group grid gap-6 rounded-[24px] bg-navy-deep p-8 text-white transition-transform duration-300 hover:-translate-y-0.5 md:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] md:items-end md:p-12">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-teal">{lead.topic}</span>
                </div>
                <h2 className="t-section mt-4">{lead.title}</h2>
                <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-white/75">{lead.summary}</p>
              </div>
              <span className="flex flex-col gap-5 font-semibold md:items-end">
                <MascotBadge name={mascots.guides[lead.slug] ?? "operations"} className="w-40 md:w-52" sizes="208px" />
                <span className="inline-flex items-center gap-2">
                  Read guide · {lead.readTime} <ArrowRight aria-hidden="true" size={17} />
                </span>
              </span>
            </Link>
          </ScrollReveal>

          <ul className="mt-5 grid gap-5 md:grid-cols-2">
            {rest.map((guide, index) => (
              <li key={guide.slug} data-reveal="" suppressHydrationWarning style={{ "--d": `${(index % 2) * 80}ms` } as React.CSSProperties}>
                <Link href={`/resources/guides/${guide.slug}`} className="link-arrow group flex h-full flex-col rounded-[28px] border border-line p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-teal/50 hover:shadow-lift">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-teal-deep">{guide.topic}</span>
                  </div>
                  <div className="mt-3 flex flex-1 items-start justify-between gap-4">
                    <div>
                      <h2 className="t-card !text-[22px]">{guide.title}</h2>
                      <p className="body mt-2">{guide.summary}</p>
                    </div>
                    <Mascot name={mascots.guides[guide.slug] ?? "business"} sizes="120px" className="w-24 shrink-0 md:w-28" />
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-deep">
                    Read guide · {guide.readTime} <ArrowRight aria-hidden="true" size={15} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-tight bg-paper">
        <div className="wrap grid gap-5 md:grid-cols-2">
          {[
            { href: "/resources/faq", icon: HelpCircle, title: "Frequently Asked Questions", body: "Answers about the platform, offline work, ERP, pricing and more." },
            { href: "/roi", icon: Calculator, title: "ROI Calculator", body: "Estimate the value of time saved, using your own numbers." },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.href}>
                <Link href={item.href} className="link-arrow flex items-start gap-5 rounded-[28px] bg-white p-7 transition-shadow hover:shadow-lift">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-cyan-soft text-teal-deep">
                    <Icon aria-hidden="true" size={22} />
                  </span>
                  <span>
                    <span className="t-card block">{item.title}</span>
                    <span className="body mt-1 block">{item.body}</span>
                  </span>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      <div className="pt-12">
        <CTASection title="Would you rather talk it through?" description="Tell us what you're trying to improve, and we'll point you in the right direction." primary={{ label: "Book a Demo", href: "/book-demo" }} secondary={{ label: "Contact Us", href: "/contact" }} />
      </div>
    </>
  );
}

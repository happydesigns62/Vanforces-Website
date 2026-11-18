import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/global/Common";
import { ScrollReveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/commercial/Forms";
import { art } from "@/data/media";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us what you're working on. Contact Vanforces about product and sales, integrations, partnerships or support.",
};

const reasons = [
  { title: "Product & Sales", body: "Learn about Vanforces and available plans." },
  { title: "Integrations", body: "Discuss ERP and business system requirements." },
  { title: "Partnerships", body: "Introduce collaboration opportunities." },
  { title: "Support", body: "Get directed to the appropriate customer support channel." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Tell Us What You're Working On." description="Choose what you'd like to talk about, and share a little context so the conversation starts in the right place." crumbs={[{ label: "Contact" }]} />
      <section className="pb-12 md:pb-16">
        <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div>
            <dl className="border-t border-line">
              {reasons.map((reason, index) => (
                <div key={reason.title} data-reveal="" suppressHydrationWarning style={{ "--d": `${index * 70}ms` } as React.CSSProperties} className="border-b border-line py-5">
                  <dt className="t-card">{reason.title}</dt>
                  <dd className="body mt-1">{reason.body}</dd>
                </div>
              ))}
            </dl>
            <ScrollReveal className="mt-8">
              <Image src={art.contact.src} alt="Two Vanforces box mascots filling out a contact form on a large envelope." width={art.contact.width} height={art.contact.height} className="h-auto w-full max-w-[420px]" />
            </ScrollReveal>
          </div>
          <ScrollReveal delay={90} className="self-start rounded-[28px] border border-line p-6 md:p-9">
            <ContactForm />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

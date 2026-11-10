import type { Metadata } from "next";
import Image from "next/image";
import { CTASection, PageHero } from "@/components/global/Common";
import { ScrollReveal } from "@/components/motion/Reveal";
import { FAQAccordion } from "@/components/commercial/FAQAccordion";
import { faqCategories } from "@/data/faqs";
import { art } from "@/data/media";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers about the Vanforces platform, offline work, ERP integration, pricing, routes, inventory, delivery, collections and more.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Frequently asked questions"
        title="The Things Worth Knowing Before You Begin."
        description="Short answers to common questions. If yours isn't here, we'd be glad to help."
        crumbs={[{ label: "Resources", href: "/resources" }, { label: "FAQs" }]}
        layout="split"
        visual={<Image src={art.faq.src} alt="The Vanforces box mascot looking through a magnifying glass beside a large question mark." width={art.faq.width} height={art.faq.height} priority className="mx-auto h-auto w-full max-w-[460px]" />}
      />
      <section className="pb-16 pt-6 md:pb-24">
        <div className="wrap grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="FAQ categories" className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <ul className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:gap-0.5 lg:px-0">
              {faqCategories.map((category) => (
                <li key={category.id} className="shrink-0">
                  <a href={`#${category.id}`} className="block whitespace-nowrap rounded-full bg-mist px-4 py-2 text-[14px] font-medium text-muted transition-colors hover:text-navy lg:rounded-lg lg:bg-transparent lg:px-3 lg:py-1.5 lg:hover:bg-mist">
                    {category.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="min-w-0 space-y-14">
            {faqCategories.map((category) => (
              <ScrollReveal key={category.id} as="section" id={category.id} className="scroll-mt-24">
                <h2 className="t-card mb-4 !text-[24px]">{category.title}</h2>
                <FAQAccordion items={category.items} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <CTASection title="Still have a question?" description="Tell us what you're working on, and we'll help you find the answer." primary={{ label: "Contact Us", href: "/contact" }} secondary={{ label: "Book a Demo", href: "/book-demo" }} />
    </>
  );
}

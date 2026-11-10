import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CTASection, PageHero, SectionHeading } from "@/components/global/Common";
import { ScrollReveal } from "@/components/motion/Reveal";
import { ChainDiagram } from "@/components/product/Diagrams";
import { MobileScreenshotFrame, WebScreenshotFrame } from "@/components/product/Frames";
import { art, phone, web } from "@/data/media";
import { industries } from "@/data/industries";

export const metadata: Metadata = {
  title: "Industries",
  description: "Different products, familiar distribution challenges. See how Vanforces supports FMCG, food and beverage, wholesale and direct store delivery businesses.",
};

export default function IndustriesPage() {
  const [fmcg, food, wholesale, dsd] = industries;
  const card = "link-arrow group block h-full overflow-hidden rounded-[24px] transition-[transform,box-shadow] duration-300 ease-[var(--ease-soft)] hover:-translate-y-0.5 hover:shadow-lift";
  const more = (
    <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold">
      Explore <ArrowRight aria-hidden="true" size={16} />
    </span>
  );
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Different Products. Familiar Distribution Challenges."
        description="Whether the product is a soft drink or a building supply, the day has similar questions. Who comes next? What stock is available? What was delivered? What is still due?"
        crumbs={[{ label: "Industries" }]}
        layout="split"
        visual={<Image src={art.supplyChain.src} alt="The Vanforces box mascot pointing along a chain from factory to warehouse to shop." width={art.supplyChain.width} height={art.supplyChain.height} sizes="(max-width: 1024px) 80vw, 480px" priority className="mx-auto h-auto w-full max-w-[440px]" />}
      />

      <section className="pb-16 pt-4 md:pb-24">
        <div className="wrap grid gap-5 lg:grid-cols-12">
          <ScrollReveal className="lg:col-span-7">
            <Link href={`/industries/${fmcg.slug}`} className={`${card} bg-navy-deep p-8 text-white md:p-11`}>
              <div className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_170px] sm:items-center">
                <div>
                  <h2 className="t-section !text-[clamp(1.625rem,1.4rem+1vw,2.5rem)]">{fmcg.name}</h2>
                  <p className="mt-4 text-[16.5px] leading-relaxed text-white/75">{fmcg.short}</p>
                  {more}
                </div>
                <MobileScreenshotFrame shot={phone.route} sizes="170px" className="mx-auto w-40 sm:w-full" />
              </div>
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={90} className="lg:col-span-5">
            <Link href={`/industries/${food.slug}`} className={`${card} bg-cyan-soft p-8 md:p-11`}>
              <h2 className="t-section !text-[clamp(1.5rem,1.3rem+1vw,2.25rem)]">{food.name}</h2>
              <p className="body mt-4">{food.short}</p>
              {more}
              <div className="mt-8">
                <ChainDiagram steps={["Warehouse", "Vehicle", "Customer"]} />
              </div>
            </Link>
          </ScrollReveal>
          <ScrollReveal className="lg:col-span-5">
            <Link href={`/industries/${dsd.slug}`} className={`${card} border border-line bg-white p-8 md:p-11`}>
              <h2 className="t-section !text-[clamp(1.5rem,1.3rem+1vw,2.25rem)]">{dsd.name}</h2>
              <p className="body mt-4">{dsd.short}</p>
              <p className="mt-6 text-[clamp(1.25rem,1rem+1vw,1.625rem)] font-medium leading-snug tracking-[-0.03em] text-teal-deep">Load. Visit. Sell. Collect. Reconcile.</p>
              {more}
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={90} className="lg:col-span-7">
            <Link href={`/industries/${wholesale.slug}`} className={`${card} bg-mist p-8 md:p-11`}>
              <h2 className="t-section !text-[clamp(1.5rem,1.3rem+1vw,2.25rem)]">{wholesale.name}</h2>
              <p className="body mt-4">{wholesale.short}</p>
              {more}
              <WebScreenshotFrame shot={web.products} sizes="(max-width: 1024px) 90vw, 640px" className="mt-8" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <SectionHeading align="center" title="Don't see your exact business?" description="The underlying workflows are shared by many distribution businesses. Tell us what you sell and how it reaches your customers." />
        </div>
      </section>
      <CTASection title="Tell us how your products reach customers." primary={{ label: "Book a Demo", href: "/book-demo" }} secondary={{ label: "See Customer Stories", href: "/customers" }} />
    </>
  );
}

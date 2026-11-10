import type { Metadata } from "next";
import { CTASection, PageHero, SectionHeading } from "@/components/global/Common";
import { Mascot } from "@/components/global/Mascot";
import { ScrollReveal, StaggerReveal } from "@/components/motion/Reveal";
import { CustomerLogoGrid, CustomerStoryCard, TestimonialCard, VideoShowcase } from "@/components/customers/CustomerProof";
import { customerStories, testimonials } from "@/data/customers";

export const metadata: Metadata = {
  title: "Customer Stories",
  description: "The distribution teams that trust Vanforces, with stories, reviews and a closer look at their daily work.",
};

export default function CustomersPage() {
  const [lead, ...rest] = customerStories;
  return (
    <>
      <PageHero
        eyebrow="Customer stories"
        title="The People Behind the Operations."
        description="Every distribution business has its own challenges. These examples show how teams could use Vanforces to manage their everyday work."
        crumbs={[{ label: "Customers" }]}
        layout="split"
        visual={<Mascot name="partners" priority sizes="(max-width: 1024px) 80vw, 420px" className="mx-auto w-full max-w-[400px]" />}
      />

      <section className="section bg-band-cyan mt-14">
        <div className="wrap">
          <SectionHeading variant="fine" align="center" eyebrow="Trusted by distribution teams" title="Businesses That Run" titleMuted="on Vanforces." className="mb-12" />
          <CustomerLogoGrid className="mx-auto max-w-[960px]" />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHeading variant="fine" eyebrow="Customer stories" title="How the Working Day" titleMuted="Could Look." className="mb-12" />
          <div className="grid gap-5 lg:grid-cols-12">
            <ScrollReveal className="lg:col-span-7">
              <CustomerStoryCard story={lead} featured />
            </ScrollReveal>
            <ScrollReveal delay={90} className="lg:col-span-5">
              <CustomerStoryCard story={rest[0]} />
            </ScrollReveal>
            <ScrollReveal className="lg:col-span-5">
              <CustomerStoryCard story={rest[1]} />
            </ScrollReveal>
            <ScrollReveal delay={90} className="lg:col-span-7">
              <CustomerStoryCard story={rest[2]} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section bg-band-cyan">
        <div className="wrap">
          <SectionHeading variant="fine" eyebrow="Video stories" title="A Closer Look" titleMuted="at the Work." className="mb-10" />
          <VideoShowcase />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHeading variant="fine" eyebrow="Reviews" title="In Their" titleMuted="Own Words." className="mb-12" />
          <StaggerReveal step={70} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => (
              <TestimonialCard key={item.topic} item={item} tag={item.topic} />
            ))}
          </StaggerReveal>
        </div>
      </section>

      <CTASection
        title="Tell us about your distribution day."
        description="Your challenges may look different, which is exactly why we start by listening."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "Explore the Platform", href: "/platform" }}
      />
    </>
  );
}

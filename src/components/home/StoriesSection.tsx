import Image from "next/image";
import { Quote } from "lucide-react";
import { Button } from "@/components/global/Button";
import { SectionHeading } from "@/components/global/Common";
import { ScrollReveal, StaggerReveal } from "@/components/motion/Reveal";
import { ScrollScene } from "@/components/motion/ScrollScene";
import { homeReviews } from "@/data/customers";

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

/**
 * Customer Stories. One large image-led card that stands in for the customer video, with two quieter quote cards beside it.
 * The photo and the quotes are sample content until real customer stories are available.
 */
export function StoriesSection() {
  return (
    <section className="section bg-band-cyan">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <SectionHeading variant="fine" eyebrow="Customer Stories" title="The People Behind" titleMuted="the Operations." />
          <ScrollReveal delay={100}>
            <p className="text-pretty text-[1.0625rem] leading-[1.7] text-muted sm:text-[1.125rem]">Every distribution business has its own challenges. See how teams use Vanforces to manage their everyday work.</p>
          </ScrollReveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <ScrollReveal className="lg:order-2">
            <div className="group relative isolate aspect-[4/3] overflow-hidden rounded-[24px] bg-navy-deep sm:aspect-video">
              <div className="absolute -inset-y-[7%] inset-x-0 -z-10">
                <ScrollScene mode="pass" className="scene-drift relative h-full">
                  <Image
                    src="/photos/stories-van.webp"
                    alt="A white Vanforces delivery van on a palm-lined city street at sunset, with a driver in a Vanforces polo checking a tablet beside it."
                    fill
                    sizes="(max-width: 1024px) 94vw, 720px"
                    className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-soft)] group-hover:scale-[1.03]"
                  />
                </ScrollScene>
              </div>
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep/90 via-navy-deep/30 to-navy-deep/10" />

              <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
                <p className="max-w-[15rem] text-[clamp(1.375rem,1.1rem+1.3vw,2rem)] font-medium leading-[1.15] tracking-[-0.03em] text-white">A Closer Look at Life With Vanforces.</p>
              </div>
            </div>
            <p className="mt-4 max-w-xl text-[1rem] leading-relaxed text-muted">
              Hear directly from a customer about their field operations, daily challenges and experience using Vanforces.
            </p>
          </ScrollReveal>

          <StaggerReveal start={120} step={110} className="grid gap-5 lg:order-1">
            {homeReviews.map((review) => (
              <figure key={review.topic} className="flex h-full flex-col rounded-[24px] border border-line bg-white p-6 transition-[transform,box-shadow] duration-500 ease-[var(--ease-soft)] hover:-translate-y-0.5 hover:shadow-lift md:p-8">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-cyan-soft text-teal-deep">
                    <Quote aria-hidden="true" size={16} />
                  </span>
                </div>
                <blockquote className="mt-5 flex-1 text-[1.1875rem] font-medium leading-[1.5] tracking-[-0.015em] text-navy-deep">“{review.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-full bg-mist text-[13px] font-semibold text-muted">
                    {initials(review.person)}
                  </span>
                  <span>
                    <span className="block text-[14.5px] font-semibold text-navy-deep">{review.person}</span>
                    <span className="mt-0.5 block text-[13px] leading-snug text-muted">{review.company}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </StaggerReveal>
        </div>

        <ScrollReveal className="mt-8">
          <Button href="/customers" variant="secondary" arrow>
            Explore Customer Stories
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}

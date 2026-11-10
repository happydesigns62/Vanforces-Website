import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import {
  SAMPLE_LOGO_LABEL,
  VIDEO_LABEL,
  sampleCompanies,
  videos,
  type CustomerStory,
  type SampleCompany,
  type Testimonial,
} from "@/data/customers";
import { trustedLogos } from "@/data/trusted-logos";

/** Original abstract marks. They deliberately avoid resembling any real brand. */
function LogoMark({ mark }: { mark: SampleCompany["mark"] }) {
  const common = { width: 22, height: 22, viewBox: "0 0 22 22", "aria-hidden": true, className: "shrink-0" };
  switch (mark) {
    case "bar":
      return <svg {...common}><rect x="3" y="3" width="4" height="16" fill="currentColor" /><rect x="10" y="8" width="4" height="11" fill="currentColor" /><rect x="17" y="13" width="3" height="6" fill="currentColor" /></svg>;
    case "ring":
      return <svg {...common}><circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" strokeWidth="3" /></svg>;
    case "steps":
      return <svg {...common}><path d="M2 19h6v-6h6V7h6" fill="none" stroke="currentColor" strokeWidth="2.5" /></svg>;
    case "dot":
      return <svg {...common}><circle cx="6" cy="16" r="4" fill="currentColor" /><circle cx="15" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="2" /></svg>;
    case "slant":
      return <svg {...common}><path d="M4 19 12 3h6l-8 16z" fill="currentColor" /></svg>;
    case "wave":
      return <svg {...common}><path d="M2 8c3-3 6-3 9 0s6 3 9 0M2 15c3-3 6-3 9 0s6 3 9 0" fill="none" stroke="currentColor" strokeWidth="2.2" /></svg>;
    case "split":
      return <svg {...common}><path d="M11 2a9 9 0 0 1 0 18z" fill="currentColor" /><path d="M11 2a9 9 0 0 0 0 18" fill="none" stroke="currentColor" strokeWidth="2" /></svg>;
  }
}

export function SampleLogo({ company }: { company: SampleCompany }) {
  return (
    <span className="flex items-center gap-2.5 whitespace-nowrap text-[19px] text-navy/70">
      <LogoMark mark={company.mark} />
      <span className={company.style}>{company.name}</span>
    </span>
  );
}

/** Slow seamless marquee. The list is duplicated once, and the track moves exactly half its width. */
export function LogoMarquee() {
  return (
    <div>
      <div className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee-track flex">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} aria-label={copy === 0 ? SAMPLE_LOGO_LABEL : undefined} className="flex shrink-0 items-center">
              {sampleCompanies.map((company) => (
                <li key={company.slug} className="px-8 py-2 md:px-11">
                  <SampleLogo company={company} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <p className="mt-4 text-center">
        <span className="sample-tag">{SAMPLE_LOGO_LABEL}</span>
      </p>
    </div>
  );
}

/** The real customer logos, on white tiles. The owner confirmed permission to show them. */
export function CustomerLogoGrid({ className = "" }: { className?: string }) {
  return (
    <ul className={`grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 ${className}`}>
      {trustedLogos.map((logo) => (
        <li key={logo.name} className="group flex h-28 items-center justify-center rounded-[24px] border border-line bg-white px-6 shadow-[0_1px_2px_rgb(41_59_71/0.05)] transition-[transform,box-shadow] duration-500 ease-[var(--ease-soft)] hover:-translate-y-1 hover:shadow-lift md:h-36">
          <Image src={logo.src} alt={logo.name} width={logo.width} height={logo.height} sizes="180px" className={`${logo.className} object-contain transition-transform duration-500 ease-[var(--ease-soft)] group-hover:scale-105`} />
        </li>
      ))}
    </ul>
  );
}

/** A slim "trusted by" row of the real logos, for pages where a full wall would be too much. */
export function TrustedStrip() {
  return (
    <section className="section-tight">
      <div className="wrap">
        <p className="text-center text-[13px] font-semibold uppercase tracking-[0.14em] text-navy/75">Trusted by distribution teams</p>
        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {trustedLogos.map((logo) => (
            <li key={logo.name} className="flex h-16 items-center">
              <Image src={logo.src} alt={logo.name} width={logo.width} height={logo.height} sizes="150px" className={`${logo.className} object-contain`} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function TestimonialCard({ item, tag = "", large = false }: { item: Testimonial; tag?: string; large?: boolean }) {
  return (
    <figure className={`flex h-full flex-col rounded-[28px] border border-line bg-white shadow-[0_1px_2px_rgb(41_59_71/0.05)] ${large ? "p-8 md:p-10" : "p-6 md:p-7"}`}>
      <div className="flex items-center justify-between gap-3">
        <Quote aria-hidden="true" size={22} className="text-teal" />
        {tag ? <span className="text-[12px] font-semibold text-teal-deep">{tag}</span> : null}
      </div>
      <blockquote className={`mt-4 flex-1 font-medium leading-relaxed ${large ? "text-[20px]" : "text-[16.5px]"}`}>“{item.quote}”</blockquote>
      <figcaption className="mt-5 border-t border-line pt-4">
        <span className="block text-[14.5px] font-bold">{item.person}</span>
        <span className="mt-0.5 block text-[13px] leading-snug text-muted">{item.company}</span>
      </figcaption>
    </figure>
  );
}

/** A clearly labelled 16:9 placeholder. It has no play button, because there is no video to play yet. */
export function VideoPlaceholder({
  title,
  label = VIDEO_LABEL,
  tone = "bg-navy-deep",
  large = false,
}: {
  title: string;
  label?: string;
  tone?: string;
  large?: boolean;
}) {
  return (
    <div className={`relative isolate aspect-video overflow-hidden rounded-[24px] text-white ${tone}`}>
      <span aria-hidden="true" className="capsule -right-10 -top-14 -z-10 h-32 w-[58%] border-2 border-white/15" />
      <span aria-hidden="true" className="capsule -bottom-16 right-[22%] -z-10 h-32 w-[58%] border-2 border-teal/50" />
      <div className="flex h-full flex-col justify-between p-5 md:p-7">
        <span className="self-start rounded-full bg-white px-3 py-1 text-[11.5px] font-bold text-navy">{label}</span>
        <p className={`max-w-md font-medium leading-tight tracking-[-0.03em] ${large ? "text-[clamp(1.25rem,1rem+1.4vw,2rem)]" : "text-[19px]"}`}>{title}</p>
      </div>
    </div>
  );
}

export function VideoShowcase() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {videos.map((video, index) => (
        <article key={video.title} data-reveal="" suppressHydrationWarning style={{ "--d": `${index * 90}ms` } as React.CSSProperties}>
          <VideoPlaceholder title={video.title} tone={video.tone} />
          <p className="mt-4 text-[13px] font-semibold text-teal-deep">{video.company}</p>
          <p className="body mt-1 !text-[15px]">{video.description}</p>
        </article>
      ))}
    </div>
  );
}

export function CustomerStoryCard({ story, featured = false }: { story: CustomerStory; featured?: boolean }) {
  return (
    <Link
      href={`/customers/stories/${story.slug}`}
      className={`link-arrow group flex h-full flex-col justify-between rounded-[28px] p-7 transition-[transform,box-shadow] duration-500 ease-[var(--ease-soft)] hover:-translate-y-0.5 hover:shadow-lift md:p-9 ${
        featured ? "bg-navy-deep text-white" : "border border-line bg-white shadow-[0_1px_2px_rgb(41_59_71/0.05)]"
      }`}
    >
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-[12px] font-bold uppercase tracking-[0.12em] ${featured ? "text-teal" : "text-teal-deep"}`}>{story.industry}</span>
        </div>
        <h3 className={`mt-4 font-medium leading-tight tracking-[-0.03em] ${featured ? "text-[clamp(1.5rem,1.3rem+1vw,2.25rem)]" : "text-[clamp(1.25rem,1.1rem+0.5vw,1.5rem)]"}`}>{story.title}</h3>
        <p className={`mt-3 text-[15.5px] leading-relaxed ${featured ? "text-white/75" : "text-muted"}`}>{story.excerpt}</p>
      </div>
      <p className={`mt-6 flex items-center justify-between gap-3 border-t pt-4 text-[14px] font-semibold ${featured ? "border-white/15" : "border-line"}`}>
        {story.company}
        <ArrowRight aria-hidden="true" size={17} />
      </p>
    </Link>
  );
}

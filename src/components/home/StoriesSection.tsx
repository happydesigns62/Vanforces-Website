"use client";

import Image from "next/image";
import { Quote as QuoteIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/global/Button";
import { SectionHeading } from "@/components/global/Common";
import { ScrollReveal } from "@/components/motion/Reveal";
import { useCalm } from "@/components/motion/useCalm";
import { cards, featured, type LogoName, type Quote } from "@/data/home-testimonials";
import { trustedLogos } from "@/data/trusted-logos";

const initials = (name: string) =>
  name
    .replace(/Al-/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

const tints = ["#d3f0f3", "#fde9d3", "#d3e6fa", "#e4d9f7", "#d6f0dc", "#fbe0e8"];

function Logo({ name, className }: { name: LogoName; className: string }) {
  const logo = trustedLogos.find((l) => l.name === name);
  if (!logo) return null;
  return <Image src={logo.src} alt={name} width={logo.width} height={logo.height} sizes="120px" className={`${className} object-contain`} />;
}

function Avatar({ name, i }: { name: string; i: number }) {
  return (
    <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-navy-deep" style={{ background: tints[i % tints.length] }}>
      {initials(name)}
    </span>
  );
}

function Card({ q, i }: { q: Quote; i: number }) {
  return (
    <figure className="rounded-[20px] border border-line bg-white p-5 shadow-[0_1px_2px_rgb(41_59_71/0.05),0_16px_30px_-26px_rgb(8_60_66/0.35)]">
      <blockquote className="text-[14.5px] leading-[1.6] text-navy-deep">{q.text}</blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <Avatar name={q.name} i={i} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13.5px] font-semibold text-navy-deep">{q.name}</span>
          <span className="block truncate text-[12px] text-muted">{q.role}</span>
        </span>
        <Logo name={q.company} className="h-6 w-auto max-w-[64px] shrink-0 opacity-90" />
      </figcaption>
    </figure>
  );
}

/** One scrolling column. The list is drawn twice so the loop has no seam; the second copy is hidden from assistive tech. */
function Column({ items, dir, offset }: { items: Quote[]; dir: "up" | "down"; offset: number }) {
  return (
    <div className="testi-col h-[560px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)]">
      <div className={dir === "up" ? "testi-up" : "testi-down"}>
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1 || undefined} className="space-y-4 pb-4">
            {items.map((q, i) => (
              <Card key={`${copy}-${q.name}`} q={q} i={i + offset} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Customer Stories as a flowing wall of reviews, on white. On the left, one large quote at a time with the client's logo, changing on
 * its own with a thin progress line. On the right, two columns of short reviews drift in opposite directions and slow to a stop under
 * the pointer. Reduced motion shows the cards still. The quotes are placeholders (see data/home-testimonials.ts).
 */
export function StoriesSection() {
  const calm = useCalm();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (calm || !inView || !auto) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % featured.length), 6000);
    return () => window.clearTimeout(t);
  }, [calm, inView, auto, active]);

  const q = featured[active];
  const left = cards.filter((_, i) => i % 2 === 0);
  const right = cards.filter((_, i) => i % 2 === 1);

  return (
    <section className="section bg-mist">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <SectionHeading variant="fine" eyebrow="Customer Stories" title="Trusted by" titleMuted="Distribution Teams." />
          <ScrollReveal delay={100}>
            <p className="text-pretty text-[1.0625rem] leading-[1.7] text-muted sm:text-[1.125rem]">Every distribution business has its own challenges. See how teams use Vanforces to manage their everyday work.</p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={100} className="mt-12">
          <div ref={box} className="relative overflow-hidden rounded-[32px] border border-line bg-[radial-gradient(60%_70%_at_8%_0%,rgb(28_178_187/0.12),transparent),linear-gradient(180deg,#ffffff,#f7fbfc)] p-5 shadow-[0_40px_80px_-50px_rgb(8_60_66/0.4)] sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
              <div className="flex flex-col justify-between lg:min-h-[560px]">
                <div>
                  <span className="flex size-11 items-center justify-center rounded-full bg-cyan-soft text-teal-deep">
                    <QuoteIcon aria-hidden="true" size={19} />
                  </span>
                  <div key={active} className="cr-swap mt-6">
                    <Logo name={q.company} className="h-9 w-auto max-w-[150px] mix-blend-multiply" />
                    <blockquote className="mt-7 max-w-[30rem] text-pretty text-[clamp(1.125rem,1rem+0.55vw,1.4375rem)] font-normal leading-[1.5] tracking-[-0.012em] text-navy-deep/90">“{q.text}”</blockquote>
                    <div className="mt-8 flex items-center gap-3 border-t border-line/70 pt-5">
                      <Avatar name={q.name} i={active} />
                      <span>
                        <span className="block text-[15px] font-semibold text-navy-deep">{q.name}</span>
                        <span className="block text-[13.5px] text-muted">
                          {q.role}, {q.company}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-2" role="tablist" aria-label="Featured quotes">
                  {featured.map((f, i) => (
                    <button
                      key={f.name}
                      type="button"
                      role="tab"
                      aria-selected={i === active}
                      aria-label={`Show quote from ${f.name}`}
                      onClick={() => {
                        setActive(i);
                        setAuto(false);
                      }}
                      className="relative h-6 flex-1 cursor-pointer"
                    >
                      <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-navy/10">
                        {i === active ? (
                          auto && !calm ? <span key={`${active}-bar`} className="cr-progress block h-full w-full bg-teal" style={{ animationDuration: "6s" }} /> : <span className="block h-full w-full bg-teal" />
                        ) : null}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative grid gap-4 sm:grid-cols-2">
                <Column items={left} dir="up" offset={0} />
                <div className="hidden sm:block">
                  <Column items={right} dir="down" offset={3} />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-8">
          <Button href="/customers" variant="secondary" arrow>
            Explore Customer Stories
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { moduleBySlug } from "@/data/modules";
import { moduleIcons, moduleScenes } from "@/data/nav-extras";
import { Vignette, type VignetteKind } from "@/components/illustration/Vignettes";
import { ScrollReveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/global/Common";

export function ModuleCard({ title, body, href, badge }: { title: string; body: string; href: string; badge?: string }) {
  const key = href.split(/[/#]/).filter(Boolean).pop() ?? "";
  const Icon = moduleIcons[key];
  const scene = moduleScenes[key] as VignetteKind | undefined;
  return (
    <Link
      href={href}
      className="link-arrow group flex h-full flex-col rounded-[24px] border border-line bg-white p-6 shadow-[0_1px_2px_rgb(41_59_71/0.05)] transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-soft)] hover:-translate-y-1 hover:border-teal/40 hover:shadow-lift md:p-7"
    >
      {badge ? <span className="sample-tag mb-3 self-start">{badge}</span> : null}
      {scene ? (
        <Vignette kind={scene} className="mb-4 h-[92px] w-full rounded-[16px] bg-band-cyan transition-colors duration-300 group-hover:bg-cyan-soft" />
      ) : Icon ? (
        <span className="mb-4 flex size-10 items-center justify-center rounded-xl bg-cyan-soft text-teal-deep transition-colors duration-300 group-hover:bg-teal-deep group-hover:text-white">
          <Icon aria-hidden="true" size={19} strokeWidth={1.9} />
        </span>
      ) : null}
      <span className="t-card">{title}</span>
      <span className="body mt-2 flex-1 !text-[15px]">{body}</span>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-deep">
        Learn more <ArrowRight aria-hidden="true" size={15} />
      </span>
    </Link>
  );
}

export function RelatedModules({
  slugs,
  items,
  title = "Related modules",
}: {
  slugs?: string[];
  items?: { label: string; href: string; body?: string }[];
  title?: string;
}) {
  const cards =
    items ??
    (slugs ?? [])
      .map((slug) => moduleBySlug(slug))
      .filter((m) => m !== undefined)
      .map((m) => ({ label: m.name, href: `/platform/${m.slug}`, body: m.summary }));

  return (
    <section className="section-tight">
      <div className="wrap">
        <SectionHeading title={title} />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {cards.map((card, index) => (
            <ScrollReveal key={card.href + card.label} delay={index * 80} className="h-full">
              <ModuleCard title={card.label} body={card.body ?? "Explore how this connects to your daily operation."} href={card.href} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

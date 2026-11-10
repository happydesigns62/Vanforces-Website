import Link from "next/link";
import { ChevronRight, Info } from "lucide-react";
import type { ReactNode } from "react";
import { Button, type ButtonProps } from "@/components/global/Button";
import type { ArtKey } from "@/data/media";
import { ScrollReveal } from "@/components/motion/Reveal";
import { Words, wordCount } from "@/components/motion/Words";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-[13px] text-muted">
        <li>
          <Link href="/" className="hover:text-navy">
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1">
            <ChevronRight aria-hidden="true" size={14} className="opacity-50" />
            {item.href ? (
              <Link href={item.href} className="hover:text-navy">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-navy">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Section title block. The default style is used across the site. `variant="fine"` is the refined homepage style:
 * a small dot label, a medium-weight title and a narrower, calmer text line.
 */
export function SectionHeading({
  eyebrow,
  title,
  titleMuted,
  description,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  /** Fine variant only: a second part of the title, shown in a quiet grey. */
  titleMuted?: string;
  description?: ReactNode;
  align?: "left" | "center";
  variant?: "default" | "fine";
  className?: string;
}) {
  const center = align === "center";
  const fine = true;
  return (
    <div className={`${center ? `mx-auto ${fine ? "max-w-[44rem]" : "max-w-3xl"} text-center` : fine ? "max-w-[38rem]" : "max-w-3xl"} ${className}`}>
      {eyebrow ? (
        <ScrollReveal>
          {fine ? (
            <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-cyan-line bg-white/80 px-3.5 py-1.5 text-[13px] font-semibold text-teal-deep shadow-[0_1px_2px_rgb(41_59_71/0.05)]">
              <span aria-hidden="true" className="h-3 w-[5px] shrink-0 rotate-[30deg] rounded-full bg-teal" />
              {eyebrow}
            </p>
          ) : (
            <p className="eyebrow">{eyebrow}</p>
          )}
        </ScrollReveal>
      ) : null}
      {fine ? (
        <h2 data-reveal="words" suppressHydrationWarning className={`t-fine ${eyebrow ? "mt-5" : ""}`}>
          {typeof title === "string" ? <Words text={title} /> : title}
          {titleMuted ? (
            <>
              {" "}
              <Words text={titleMuted} className="text-ink-soft" start={typeof title === "string" ? wordCount(title) : 0} />
            </>
          ) : null}
        </h2>
      ) : (
        <ScrollReveal delay={70}>
          <h2 className={`t-section ${eyebrow ? "mt-4" : ""}`}>{title}</h2>
        </ScrollReveal>
      )}
      {description ? (
        <ScrollReveal delay={140}>
          <div className={`${fine ? "text-pretty text-[1.0625rem] leading-[1.7] text-muted sm:text-[1.125rem]" : "lede"} mt-5 ${center ? "mx-auto" : ""}`}>{description}</div>
        </ScrollReveal>
      ) : null}
    </div>
  );
}

export type Cta = Omit<ButtonProps, "children" | "className"> & { label: string };

export function CtaRow({ items, className = "" }: { items: Cta[]; className?: string }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${className}`}>
      {items.map(({ label, ...props }) => (
        <Button key={label} {...props}>
          {label}
        </Button>
      ))}
    </div>
  );
}

/**
 * Inner page hero, in the homepage style: a soft wash behind a pill label, a medium-weight title and a calm text line.
 * With a visual beside the text (split) the text stays on the left. Otherwise the text is centred and the visual sits
 * below it on a light stage.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  ctas,
  visual,
  layout = visual ? "split" : "plain",
  tag,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  crumbs?: Crumb[];
  ctas?: Cta[];
  visual?: ReactNode;
  layout?: "split" | "stacked" | "plain";
  tag?: ReactNode;
}) {
  const centred = layout !== "split";
  const text = (
    <>
      {crumbs ? (
        <div className={`seq mb-8 ${centred ? "flex justify-center" : ""}`} style={{ "--d": "0ms" } as React.CSSProperties}>
          <Breadcrumbs items={crumbs} />
        </div>
      ) : null}
      <div className={`seq flex flex-wrap items-center gap-3 ${centred ? "justify-center" : ""}`} style={{ "--d": "40ms" } as React.CSSProperties}>
        <p className="eyebrow">{eyebrow}</p>
        {tag}
      </div>
      <h1 className={`t-page seq mt-6 ${centred ? "mx-auto max-w-[22ch]" : ""}`} style={{ "--d": "110ms" } as React.CSSProperties}>
        {title}
      </h1>
      {description ? (
        <div className={`lede seq mt-6 max-w-2xl ${centred ? "mx-auto" : ""}`} style={{ "--d": "200ms" } as React.CSSProperties}>
          {description}
        </div>
      ) : null}
      {ctas ? (
        <div className={`seq mt-9 ${centred ? "flex justify-center" : ""}`} style={{ "--d": "290ms" } as React.CSSProperties}>
          <CtaRow items={ctas} className={centred ? "items-center justify-center" : ""} />
        </div>
      ) : null}
    </>
  );

  if (layout === "split") {
    return (
      <section className="hero-wash relative overflow-hidden pb-14 pt-10 md:pb-20 md:pt-16">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
          <div>{text}</div>
          <div className="seq-shot min-w-0" style={{ "--d": "260ms" } as React.CSSProperties}>
            <div className="stage-soft rounded-[28px] border border-cyan-line p-5 sm:rounded-[32px] sm:p-8">{visual}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-wash relative overflow-hidden pb-14 pt-10 md:pb-20 md:pt-16">
      <div className="wrap">
        <div className="mx-auto max-w-4xl text-center">{text}</div>
        {visual ? (
          <div className="seq-shot mt-14 min-w-0" style={{ "--d": "300ms" } as React.CSSProperties}>
            <div className="stage-soft rounded-[28px] border border-cyan-line p-3 sm:rounded-[32px] sm:p-8 lg:p-12">{visual}</div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

/** Closing panel for inner pages. The same soft Vanforces panel as the homepage, with the words on the left and a mascot on the right. */
export function CTASection({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  mascot?: ArtKey;
}) {
  return (
    <section className="px-3 pb-6 pt-10 md:px-6 md:pb-10 md:pt-14">
      <ScrollReveal>
        <div className="mesh-soft relative mx-auto max-w-[1320px] overflow-hidden rounded-[32px] px-6 py-16 text-center md:rounded-[40px] md:py-20">
          <span aria-hidden="true" className="capsule -right-24 -top-16 h-52 w-[620px] bg-white/40" />
          <div className="relative mx-auto max-w-[46rem]">
            <h2 className="t-fine text-balance">{title}</h2>
            {description ? <p className="mx-auto mt-5 max-w-[38rem] text-pretty text-[1.0625rem] leading-[1.7] text-muted md:text-[1.125rem]">{description}</p> : null}
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={primary.href} arrow className="!min-h-[50px] !px-7 !text-[15px]">
                {primary.label}
              </Button>
              {secondary ? (
                <Button href={secondary.href} variant="secondary" className="!min-h-[50px] !px-7 !text-[15px]">
                  {secondary.label}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

export function DemoNotice({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      role="note"
      className={`flex gap-3 rounded-xl border border-amber-line bg-amber-soft px-4 py-3 text-sm leading-relaxed text-amber-note ${className}`}
    >
      <Info aria-hidden="true" size={18} className="mt-0.5 shrink-0" />
      <div>{children}</div>
    </div>
  );
}

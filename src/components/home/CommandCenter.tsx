import Image from "next/image";
import type { CSSProperties } from "react";
import { Button } from "@/components/global/Button";
import { ScrollReveal } from "@/components/motion/Reveal";
import { Words, wordCount } from "@/components/motion/Words";
import { web } from "@/data/media";

const TITLE = "The Day Is Happening Everywhere.";
const TITLE_MUTED = "See the Bigger Picture.";

const views = ["Finance", "Customers", "Routes", "Products", "Distributors"];

// Three questions leaders ask, each shown with a real crop of the Finance Command Center screen. The crops are made from the
// same masked screenshot by scripts/crop-command-center.mjs. The questions are the section's existing wording.
const questions = [
  { question: "What's selling?", note: "Executive KPIs at a glance.", image: "/product/cc-kpis.png", width: 384, height: 130, alt: "Command Center KPI cards for average order value, average sales value, profit and target achievement." },
  { question: "What's collected? What's outstanding?", note: "Order-to-cash, from quotation onward.", image: "/product/cc-funnel.png", width: 520, height: 86, alt: "Command Center order-to-cash funnel showing quotations and orders." },
  { question: "What needs attention?", note: "Insights that point to the next step.", image: "/product/cc-insights.png", width: 462, height: 80, alt: "Command Center insight card about collection efficiency." },
];

const reveal = (ms: number) => ({ "data-reveal": "", suppressHydrationWarning: true, style: { "--d": `${ms}ms` } as CSSProperties });

/**
 * Business Command Center as a light bento. One large card holds the real Finance Command Center screen, and three smaller
 * cards each answer one leadership question with a real crop of that same screen. It sits on the page's own light
 * background, so it follows the hero and the sections around it.
 */
export function CommandCenter() {
  return (
    <section className="section bg-mist">
      <div className="wrap">
        <div className="mx-auto max-w-[44rem] text-center">
          <ScrollReveal>
            <p className="eyebrow">Business Command Center</p>
          </ScrollReveal>
          <h2 data-reveal="words" suppressHydrationWarning className="t-fine mt-5">
            <Words text={TITLE} /> <Words text={TITLE_MUTED} className="text-ink-soft" start={wordCount(TITLE)} />
          </h2>
          <ScrollReveal delay={140}>
            <p className="mx-auto mt-5 max-w-[36rem] text-pretty text-[1.0625rem] leading-[1.7] text-muted sm:text-[1.125rem]">
              Sales are happening on the road. Stock is moving. Payments are coming in. Vanforces brings the numbers and activities that matter into one business view.
            </p>
          </ScrollReveal>
        </div>

        <div className="mt-14 grid gap-4 md:mt-16 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]">
          <div {...reveal(0)} className="flex flex-col rounded-[32px] bg-white p-4 shadow-[0_1px_2px_rgb(41_59_71/0.05),0_30px_60px_-40px_rgb(8_60_66/0.3)] sm:p-6">
            <figure className="overflow-hidden rounded-[16px] border border-line bg-white shadow-[0_20px_40px_-26px_rgb(8_60_66/0.35)]">
              <div aria-hidden="true" className="flex h-9 items-center gap-1.5 border-b border-line bg-mist px-3.5">
                <span className="size-2.5 rounded-full bg-line" />
                <span className="size-2.5 rounded-full bg-line" />
                <span className="size-2.5 rounded-full bg-line" />
                <span className="ml-3 truncate rounded-md bg-white px-3 py-0.5 text-[11px] font-medium text-muted">{web.heroCxo.title}</span>
              </div>
              <Image src={web.heroCxo.src} alt={web.heroCxo.alt} width={web.heroCxo.width} height={web.heroCxo.height} sizes="(max-width: 1024px) 92vw, 760px" className="block h-auto w-full" />
            </figure>
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <ul className="flex flex-wrap gap-2" aria-label="Views">
                {views.map((view) => (
                  <li key={view} className="rounded-full bg-cyan-soft px-3.5 py-1.5 text-[13.5px] font-medium text-teal-deep">
                    {view}
                  </li>
                ))}
              </ul>
              <Button href="/business-command-center" arrow className="shrink-0 whitespace-nowrap">
                Explore the Command Center
              </Button>
            </div>
          </div>

          <ul className="grid gap-4">
            {questions.map((item, index) => (
              <li key={item.question} {...reveal(100 + index * 90)} className="flex flex-col rounded-[28px] bg-white p-5 shadow-[0_1px_2px_rgb(41_59_71/0.05)] sm:p-6">
                <h3 className="text-[1.125rem] font-medium leading-snug tracking-[-0.02em] text-navy-deep">{item.question}</h3>
                <p className="mt-1 text-[14px] text-muted">{item.note}</p>
                <div className="mt-4 overflow-hidden rounded-xl border border-line bg-mist">
                  <Image src={item.image} alt={item.alt} width={item.width} height={item.height} sizes="(max-width: 1024px) 88vw, 360px" className="block h-auto w-full" />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-center text-[12.5px] text-muted">Real product screens. Names and sensitive details are masked for privacy.</p>
      </div>
    </section>
  );
}

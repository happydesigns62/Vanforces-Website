import Image from "next/image";
import type { CSSProperties } from "react";
import { Button } from "@/components/global/Button";
import { ScrollReveal } from "@/components/motion/Reveal";
import { Words, wordCount } from "@/components/motion/Words";
import { web } from "@/data/media";

const TITLE = "The Day Is Happening Everywhere.";
const TITLE_MUTED = "See the Bigger Picture.";

const views = ["Finance", "Customers", "Routes", "Products", "Distributors"];

const down = "text-[#d6342b]";
const up = "text-[#2b8a3e]";

// The values below are the ones shown, masked, on the real Finance Command Center screen. The cards are redrawn from that screen
// as live page elements, so their text stays sharp at any size.
const kpis = [
  { label: "Average Order Value", value: "SR 4.47K", changes: [{ text: "-97.7% QoQ", tone: down }] },
  { label: "Average Sales Value", value: "SR 2.73K", changes: [{ text: "-100.0% QoQ", tone: down }, { text: "+111.3% YoY", tone: up }] },
  { label: "Profit", value: "SR 1.02M", changes: [{ text: "-100.0% QoQ", tone: down }, { text: "+1763.9% YoY", tone: up }] },
  { label: "Target Achievement", value: "0.7%", changes: [{ text: "-100.0 pp QoQ", tone: down }] },
];

const float = (delay: string) => ({ "--float-delay": delay }) as CSSProperties;

/**
 * Business Command Center on a soft layered stage. The real Finance Command Center screen sits large in the middle, and three
 * cards redrawn from that same screen float over its right edge, each answering one leadership question. Redrawing them as page
 * elements keeps every number crisp. The cards drift gently, and stop for visitors who prefer less motion.
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

        <ScrollReveal delay={100} className="mt-14 md:mt-16">
          <div className="relative isolate overflow-hidden rounded-[36px] border border-cyan-line bg-[radial-gradient(55%_70%_at_12%_8%,rgb(28_178_187/0.2),transparent),radial-gradient(50%_60%_at_92%_92%,rgb(236_152_80/0.18),transparent),linear-gradient(180deg,#f2fbfc,#ffffff)] p-4 sm:p-8 lg:p-12">
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(rgb(14_127_134/0.16)_1px,transparent_1.2px)] [background-size:18px_18px] [mask-image:linear-gradient(180deg,#000,transparent_85%)]" />

            <div className="grid items-center gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-0">
              <figure className="relative overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_50px_90px_-40px_rgb(8_60_66/0.5),0_10px_24px_-12px_rgb(8_60_66/0.2)] lg:mr-[-72px]">
                <div aria-hidden="true" className="flex h-9 items-center gap-1.5 border-b border-line bg-mist px-3.5">
                  <span className="size-2.5 rounded-full bg-line" />
                  <span className="size-2.5 rounded-full bg-line" />
                  <span className="size-2.5 rounded-full bg-line" />
                  <span className="ml-3 truncate rounded-md bg-white px-3 py-0.5 text-[11px] font-medium text-muted">{web.heroCxo.title}</span>
                </div>
                <Image src={web.heroCxo.src} alt={web.heroCxo.alt} width={web.heroCxo.width} height={web.heroCxo.height} quality={95} sizes="(max-width: 1024px) 94vw, 900px" className="block h-auto w-full" />
              </figure>

              <div className="relative z-10 grid gap-4 lg:gap-5">
                {/* What's selling? */}
                <div style={float("0s")} className="cc-float rounded-[22px] bg-white p-4 shadow-[0_24px_50px_-26px_rgb(8_60_66/0.5),0_2px_6px_rgb(41_59_71/0.06)]">
                  <p className="text-[13px] font-semibold text-navy-deep">What&apos;s selling?</p>
                  <ul className="mt-3 grid grid-cols-2 gap-2">
                    {kpis.map((kpi) => (
                      <li key={kpi.label} className="rounded-xl border border-line bg-mist/60 px-3 py-2.5">
                        <p className="text-[11px] font-medium leading-tight text-muted">{kpi.label}</p>
                        <p className="mt-1 text-[1.0625rem] font-semibold leading-none tracking-[-0.02em] text-navy-deep">{kpi.value}</p>
                        <p className="mt-1.5 flex flex-wrap gap-x-2 text-[10.5px] font-semibold leading-tight">
                          {kpi.changes.map((change) => (
                            <span key={change.text} className={change.tone}>
                              {change.text}
                            </span>
                          ))}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What's collected? What's outstanding? */}
                <div style={float("-2.4s")} className="cc-float rounded-[22px] bg-white p-4 shadow-[0_24px_50px_-26px_rgb(8_60_66/0.5),0_2px_6px_rgb(41_59_71/0.06)] lg:ml-6">
                  <p className="text-[13px] font-semibold text-navy-deep">What&apos;s collected? What&apos;s outstanding?</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 rounded-xl bg-[linear-gradient(135deg,#17a2ab,#1fb7bf)] px-3 py-2.5 text-white">
                      <p className="text-[11px] font-medium">Quotations</p>
                      <p className="mt-0.5 text-[1.0625rem] font-semibold leading-none tracking-[-0.02em]">SR 126.80K</p>
                      <p className="mt-1.5 inline-block rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-navy-deep">71 records</p>
                    </div>
                    <span aria-hidden="true" className="text-[12px] text-teal-deep">
                      ▸
                    </span>
                    <div className="flex-1 rounded-xl bg-[linear-gradient(135deg,#1fb0b9,#2ec3cb)] px-3 py-2.5 text-white">
                      <p className="text-[11px] font-medium">Orders</p>
                      <p className="mt-0.5 text-[1.0625rem] font-semibold leading-none tracking-[-0.02em]">SR 420.61K</p>
                      <p className="mt-1.5 inline-block rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-navy-deep">94 records</p>
                    </div>
                  </div>
                </div>

                {/* What needs attention? */}
                <div style={float("-4.8s")} className="cc-float rounded-[22px] bg-white p-4 shadow-[0_24px_50px_-26px_rgb(8_60_66/0.5),0_2px_6px_rgb(41_59_71/0.06)]">
                  <p className="text-[13px] font-semibold text-navy-deep">What needs attention?</p>
                  <div className="mt-3 rounded-xl border border-[#cfe8c8] bg-[#f1faee] px-3.5 py-3">
                    <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.1em] text-[#4a6b43]">
                      <span>Protect</span>
                      <span className="text-[13px] normal-case tracking-normal text-navy-deep">129.3%</span>
                    </div>
                    <p className="mt-1 text-[14px] font-semibold text-navy-deep">Collection efficiency</p>
                    <p className="mt-1 text-[11.5px] leading-snug text-[#4a6b43]">Collection efficiency is based on realized collection value divided by sales value.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <ul className="flex flex-wrap gap-2" aria-label="Views">
                {views.map((view) => (
                  <li key={view} className="rounded-full bg-white/85 px-3.5 py-1.5 text-[13.5px] font-medium text-teal-deep shadow-[0_1px_2px_rgb(41_59_71/0.06)]">
                    {view}
                  </li>
                ))}
              </ul>
              <Button href="/business-command-center" arrow className="shrink-0 whitespace-nowrap">
                Explore the Command Center
              </Button>
            </div>
          </div>
          <p className="mt-5 text-center text-[12.5px] text-muted">Real product screen. Names and sensitive details are masked for privacy. The cards on the right are redrawn from the same screen so they stay sharp.</p>
        </ScrollReveal>
      </div>
    </section>
  );
}

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
const kpiMain = [
  { label: "Average Order Value", value: "SR 4.47K", changes: [{ text: "-97.7% QoQ", tone: down }] },
  { label: "Average Sales Value", value: "SR 2.73K", changes: [{ text: "-100.0% QoQ", tone: down }, { text: "+111.3% YoY", tone: up }] },
];
const kpiBack = [
  { label: "Profit", value: "SR 1.02M", changes: [{ text: "-100.0% QoQ", tone: down }, { text: "+1763.9% YoY", tone: up }] },
  { label: "Target Achievement", value: "0.7%", changes: [{ text: "-100.0 pp QoQ", tone: down }] },
];

const lift = (delay: string) => ({ "--float-delay": delay }) as CSSProperties;
const reveal = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const paper = "rounded-[20px] bg-white shadow-[0_26px_50px_-24px_rgb(8_60_66/0.55),0_2px_6px_rgb(41_59_71/0.07)]";

function Kpi({ label, value, changes }: (typeof kpiMain)[number]) {
  return (
    <li className="rounded-xl border border-line bg-mist/60 px-3.5 py-3">
      <p className="text-[11.5px] font-medium leading-tight text-muted">{label}</p>
      <p className="mt-1.5 text-[1.25rem] font-semibold leading-none tracking-[-0.02em] text-navy-deep">{value}</p>
      <p className="mt-2 flex flex-wrap gap-x-2 text-[11px] font-semibold leading-tight">
        {changes.map((change) => (
          <span key={change.text} className={change.tone}>
            {change.text}
          </span>
        ))}
      </p>
    </li>
  );
}

/**
 * Business Command Center as a bento, in the manner of layered product cards on soft gradients. A wide card holds the real
 * Finance Command Center screen. Under it, three cards each answer one leadership question: a title, one line, and a gradient
 * stage with crisp cards that overlap and drift gently. The cards are redrawn from the same real screen as page elements so
 * their numbers stay sharp. The drift stops for visitors who prefer less motion.
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

        <div className="mt-14 grid gap-4 md:mt-16">
          {/* The real screen, large. */}
          <article data-reveal="" suppressHydrationWarning style={reveal(0)} className="grid overflow-hidden rounded-[32px] border border-line bg-white lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
            <div className="flex flex-col justify-center p-6 sm:p-9">
              <h3 className="text-[1.625rem] font-medium leading-tight tracking-[-0.035em] text-navy-deep">Finance Command Center</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-muted">Executive insights, KPIs and the order-to-cash funnel on one real screen.</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Views">
                {views.map((view) => (
                  <li key={view} className="rounded-full bg-cyan-soft px-3.5 py-1.5 text-[13.5px] font-medium text-teal-deep">
                    {view}
                  </li>
                ))}
              </ul>
              <Button href="/business-command-center" arrow className="mt-7 self-start whitespace-nowrap">
                Explore the Command Center
              </Button>
            </div>
            <div className="relative overflow-hidden bg-[radial-gradient(60%_80%_at_15%_10%,rgb(28_178_187/0.28),transparent),radial-gradient(55%_70%_at_95%_95%,rgb(236_152_80/0.22),transparent),linear-gradient(135deg,#d9f3f5,#f3fbfc)] px-4 pt-8 sm:px-8 sm:pt-10 lg:pl-10 lg:pr-0">
              <figure className="relative overflow-hidden rounded-t-[16px] border border-b-0 border-white/80 bg-white shadow-[0_40px_80px_-30px_rgb(8_60_66/0.55)]">
                <div aria-hidden="true" className="flex h-9 items-center gap-1.5 border-b border-line bg-mist px-3.5">
                  <span className="size-2.5 rounded-full bg-line" />
                  <span className="size-2.5 rounded-full bg-line" />
                  <span className="size-2.5 rounded-full bg-line" />
                  <span className="ml-3 truncate rounded-md bg-white px-3 py-0.5 text-[11px] font-medium text-muted">{web.heroCxo.title}</span>
                </div>
                <Image src={web.heroCxo.src} alt={web.heroCxo.alt} width={web.heroCxo.width} height={web.heroCxo.height} quality={95} sizes="(max-width: 1024px) 94vw, 760px" className="block h-auto w-full" />
              </figure>
            </div>
          </article>

          {/* Three questions, each on a gradient stage with layered cards. */}
          <div className="grid gap-4 lg:grid-cols-3">
            {/* What's selling? */}
            <article data-reveal="" suppressHydrationWarning style={reveal(80)} className="flex flex-col overflow-hidden rounded-[28px] border border-line bg-white">
              <div className="p-6 sm:p-7">
                <h3 className="text-[1.25rem] font-medium leading-snug tracking-[-0.025em] text-navy-deep">What&apos;s selling?</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">Executive KPIs at a glance.</p>
              </div>
              <div className="relative mt-auto h-[300px] overflow-hidden bg-[linear-gradient(135deg,#bfeaee,#e6f7f8_55%,#fde8d6)]">
                <div style={lift("-3.2s")} className={`cc-float absolute left-[14%] top-[150px] w-[80%] ${paper} p-3`}>
                  <ul className="grid grid-cols-2 gap-2">
                    {kpiBack.map((kpi) => (
                      <Kpi key={kpi.label} {...kpi} />
                    ))}
                  </ul>
                </div>
                <div style={lift("0s")} className={`cc-float absolute left-[6%] top-[18px] w-[80%] ${paper} p-3`}>
                  <ul className="grid grid-cols-2 gap-2">
                    {kpiMain.map((kpi) => (
                      <Kpi key={kpi.label} {...kpi} />
                    ))}
                  </ul>
                </div>
              </div>
            </article>

            {/* What's collected? What's outstanding? */}
            <article data-reveal="" suppressHydrationWarning style={reveal(160)} className="flex flex-col overflow-hidden rounded-[28px] border border-line bg-white">
              <div className="p-6 sm:p-7">
                <h3 className="text-[1.25rem] font-medium leading-snug tracking-[-0.025em] text-navy-deep">What&apos;s collected? What&apos;s outstanding?</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">Order-to-cash, from quotation onward.</p>
              </div>
              <div className="relative mt-auto h-[300px] overflow-hidden bg-[linear-gradient(135deg,#c8e9f2,#dff4f2_50%,#e5f6e9)]">
                <div aria-hidden="true" className="absolute left-[10%] top-[44px] h-[170px] w-[80%] rounded-[22px] border border-white/80 bg-white/50" />
                <div aria-hidden="true" className="absolute left-[5%] top-[30px] h-[170px] w-[90%] rounded-[22px] border border-white/90 bg-white/70" />
                <div style={lift("-1.6s")} className={`cc-float absolute left-[3%] top-[56px] w-[94%] ${paper} p-3.5`}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">Order-to-Cash Funnel</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 rounded-xl bg-[linear-gradient(135deg,#17a2ab,#1fb7bf)] px-3 py-3 text-white">
                      <p className="text-[11px] font-medium">Quotations</p>
                      <p className="mt-1 text-[1.125rem] font-semibold leading-none tracking-[-0.02em]">SR 126.80K</p>
                      <p className="mt-2 inline-block rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-navy-deep">71 records</p>
                    </div>
                    <span aria-hidden="true" className="text-[12px] text-teal-deep">
                      ▸
                    </span>
                    <div className="flex-1 rounded-xl bg-[linear-gradient(135deg,#1fb0b9,#2ec3cb)] px-3 py-3 text-white">
                      <p className="text-[11px] font-medium">Orders</p>
                      <p className="mt-1 text-[1.125rem] font-semibold leading-none tracking-[-0.02em]">SR 420.61K</p>
                      <p className="mt-2 inline-block rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-navy-deep">94 records</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* What needs attention? */}
            <article data-reveal="" suppressHydrationWarning style={reveal(240)} className="flex flex-col overflow-hidden rounded-[28px] border border-line bg-white">
              <div className="p-6 sm:p-7">
                <h3 className="text-[1.25rem] font-medium leading-snug tracking-[-0.025em] text-navy-deep">What needs attention?</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">Insights that point to the next step.</p>
              </div>
              <div className="relative mt-auto h-[300px] overflow-hidden bg-[linear-gradient(135deg,#d3f0f3,#e8f6ec_55%,#fdf0d9)]">
                <div aria-hidden="true" className="absolute left-[10%] top-[44px] h-[170px] w-[80%] rounded-[22px] border border-white/80 bg-white/50" />
                <div aria-hidden="true" className="absolute left-[5%] top-[30px] h-[170px] w-[90%] rounded-[22px] border border-white/90 bg-white/70" />
                <div style={lift("-4.4s")} className={`cc-float absolute left-[3%] top-[56px] w-[94%] ${paper} p-3.5`}>
                  <div className="rounded-xl border border-[#cfe8c8] bg-[#f1faee] px-3.5 py-3.5">
                    <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.1em] text-[#4a6b43]">
                      <span>Protect</span>
                      <span className="text-[15px] normal-case tracking-normal text-navy-deep">129.3%</span>
                    </div>
                    <p className="mt-1.5 text-[15px] font-semibold text-navy-deep">Collection efficiency</p>
                    <p className="mt-1.5 text-[12px] leading-snug text-[#4a6b43]">Collection efficiency is based on realized collection value divided by sales value.</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <p className="mt-5 text-center text-[12.5px] text-muted">Real product screen. Names and sensitive details are masked for privacy. The cards are redrawn from the same screen so they stay sharp.</p>
      </div>
    </section>
  );
}

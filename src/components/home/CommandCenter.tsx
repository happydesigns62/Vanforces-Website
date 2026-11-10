import Image from "next/image";
import type { CSSProperties } from "react";
import { Button } from "@/components/global/Button";
import { ScrollReveal, StaggerReveal } from "@/components/motion/Reveal";
import { ScrollScene } from "@/components/motion/ScrollScene";
import { Words, wordCount } from "@/components/motion/Words";
import { web } from "@/data/media";
import { ENTAURA_URL } from "@/data/navigation";

const TITLE = "The Day Is Happening Everywhere.";
const TITLE_MUTED = "See the Bigger Picture.";

const highlights = ["Executive KPIs", "Order-to-Cash", "Business Trends"];
const views = ["Finance", "Customers", "Routes", "Products", "Distributors"];

// Pointing labels, placed on the real Finance Command Center screen. Positions are percentages of the picture.
// The questions are the section's existing wording.
const callouts = [
  { text: "What's selling?", x: 9, y: 46 },
  { text: "What needs attention?", x: 38, y: 36 },
  { text: "What's collected? What's outstanding?", x: 62, y: 76 },
];

// The three Entaura products. The topics and lines are Entaura's own wording from entaura.ai, copied as written.
// Watch has no separate line, so it shows its topic only.
const products = [
  { name: "Entaura Ask", logo: "/brand/entaura-ask.png", width: 720, height: 104, topic: "Knowledge", line: "Ask the question. See the proof.", glow: "hover:shadow-[0_18px_40px_-22px_rgb(32_130_220/0.55)]" },
  { name: "Entaura Insight", logo: "/brand/entaura-insight.png", width: 720, height: 92, topic: "Smart & trusted analytics", line: "Live ERP numbers you can check.", glow: "hover:shadow-[0_18px_40px_-22px_rgb(70_170_50/0.55)]" },
  { name: "Entaura Watch", logo: "/brand/entaura-watch.png", width: 720, height: 93, topic: "Alerts from your answers", line: "", glow: "hover:shadow-[0_18px_40px_-22px_rgb(190_90_240/0.5)]" },
];

function Chips({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60">{label}</p>
      <ul className="mt-2.5 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className="rounded-full border border-white/25 bg-white/5 px-3.5 py-1.5 text-[13.5px] text-white/90">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Business Command Center and Entaura, in the one dark panel on the page. A short heading, then the real dashboard on a
 * stage with pointing labels that appear one after another. The stage has a floor: the inspector mascot stands on it at
 * the left, with the highlights, the views and the button beside him, so nothing covers the screen.
 */
export function CommandCenter() {
  return (
    <section className="px-3 pb-16 pt-24 md:px-6 md:pb-28 md:pt-32">
      <ScrollScene mode="entry" className="scene-panel mx-auto max-w-[1320px]">
        <div className="relative isolate overflow-hidden rounded-[32px] bg-navy-deep px-5 pb-6 pt-16 text-white sm:px-10 md:rounded-[40px] md:pb-10 md:pt-24 lg:px-14">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-[radial-gradient(60%_70%_at_50%_100%,rgb(28_178_187/0.28),transparent)]" />

          <div className="mx-auto max-w-[1120px]">
            <div className="mx-auto max-w-[44rem] text-center">
              <ScrollReveal>
                <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[13px] font-semibold text-white">
                  <span aria-hidden="true" className="h-3 w-[5px] shrink-0 rotate-[30deg] rounded-full bg-teal" />
                  Business Command Center
                </p>
              </ScrollReveal>
              <h2 data-reveal="words" suppressHydrationWarning className="t-fine mt-5 !text-white">
                <Words text={TITLE} /> <Words text={TITLE_MUTED} className="text-white/60" start={wordCount(TITLE)} />
              </h2>
              <ScrollReveal delay={140}>
                <p className="mx-auto mt-5 max-w-[36rem] text-pretty text-[1.0625rem] leading-[1.7] text-white/80 sm:text-[1.125rem]">
                  Sales are happening on the road. Stock is moving. Payments are coming in. Vanforces brings the numbers and activities that matter into one business view.
                </p>
              </ScrollReveal>
            </div>

            <div className="mt-14 md:mt-20">
              <ScrollScene mode="entry" className="scene-stage">
                <div className="stage-dark relative rounded-[28px] border border-white/15 p-3 sm:p-8 lg:p-12">
                  <figure className="overflow-hidden rounded-[14px] border border-white/10 bg-white shadow-frame">
                    <div aria-hidden="true" className="flex h-9 items-center gap-1.5 border-b border-line bg-mist px-3.5">
                      <span className="size-2.5 rounded-full bg-line" />
                      <span className="size-2.5 rounded-full bg-line" />
                      <span className="size-2.5 rounded-full bg-line" />
                      <span className="ml-3 truncate rounded-md bg-white px-3 py-0.5 text-[11px] font-medium text-muted">{web.heroCxo.title}</span>
                    </div>
                    <div className="relative">
                      <Image src={web.heroCxo.src} alt={web.heroCxo.alt} width={web.heroCxo.width} height={web.heroCxo.height} sizes="(max-width: 1200px) 88vw, 1040px" className="block h-auto w-full" />
                      <ScrollScene mode="late" className="pointer-events-none absolute inset-0 hidden md:block">
                        {callouts.map((callout, index) => (
                          <div
                            key={callout.text}
                            style={{ left: `${callout.x}%`, top: `${callout.y}%`, "--i": index } as CSSProperties}
                            className="scene-callout absolute flex items-center"
                          >
                            <span aria-hidden="true" className="relative flex size-3.5 shrink-0">
                              <span className="relative size-3.5 rounded-full border-2 border-white bg-teal shadow-[0_0_0_1px_rgb(28_178_187)]" />
                            </span>
                            <span className="ml-2 whitespace-nowrap rounded-full bg-navy-deep px-3.5 py-1.5 text-[13px] font-semibold text-white shadow-[0_10px_24px_-10px_rgb(8_20_30/0.7)]">
                              {callout.text}
                            </span>
                          </div>
                        ))}
                      </ScrollScene>
                    </div>
                  </figure>

                  {/* The stage floor. */}
                  <div className="mt-7 flex flex-col gap-6 border-t border-white/15 pt-6 lg:mt-9 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
                    <div className="grid gap-6 sm:grid-cols-2 lg:gap-12">
                      <Chips label="Highlights" items={highlights} />
                      <Chips label="Views" items={views} />
                    </div>
                    <Button href="/business-command-center" variant="teal" arrow className="shrink-0 self-start whitespace-nowrap lg:self-end">
                      Explore the Business Command Center
                    </Button>
                  </div>
                </div>
              </ScrollScene>
            </div>

            {/* The same questions, listed, for screens too small to carry labels on the picture. */}
            <ul className="mt-8 flex flex-wrap justify-center gap-2 md:hidden">
              {callouts.map((callout) => (
                <li key={callout.text} className="rounded-full bg-white/15 px-3.5 py-1.5 text-[13.5px] font-medium text-white">
                  {callout.text}
                </li>
              ))}
            </ul>
          </div>

          <ScrollReveal className="mx-auto mt-12 max-w-[1120px] md:mt-16">
            <div className="grid overflow-hidden rounded-[28px] bg-white text-navy shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
              <div className="flex flex-col items-start p-7 md:p-10">
                <Image src="/brand/entaura-logo.svg" alt="Entaura.ai" width={545} height={122} className="h-6 w-auto" />
                <h2 className="mt-6 text-[clamp(1.5rem,1.15rem+1.1vw,2rem)] font-medium leading-[1.14] tracking-[-0.035em] text-navy-deep">Your Business Data Has More to Say.</h2>
                <p className="mt-4 max-w-[26rem] text-pretty text-[1rem] leading-[1.65] text-muted">
                  Ask questions. Discover insights. Stay informed. Meet Entaura, an AI-powered platform for exploring business information.
                </p>
                <Button href={ENTAURA_URL} variant="ink" className="mt-7 !min-h-[46px] !px-6 !text-[14.5px]">
                  Explore Entaura.ai
                </Button>
              </div>

              <StaggerReveal step={110} className="flex flex-col justify-center divide-y divide-line border-t border-line bg-mist/70 lg:border-l lg:border-t-0">
                {products.map((product) => (
                  <div key={product.name} className="grid items-center gap-x-6 gap-y-2 px-7 py-5 sm:grid-cols-[110px_minmax(0,1fr)] md:px-10">
                    <Image src={product.logo} alt={product.name} width={product.width} height={product.height} sizes="110px" className="h-auto w-[104px]" />
                    <div>
                      <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted">{product.topic}</p>
                      {product.line ? <p className="mt-0.5 text-[14.5px] leading-snug text-navy-deep">{product.line}</p> : null}
                    </div>
                  </div>
                ))}
              </StaggerReveal>
            </div>
          </ScrollReveal>
        </div>
      </ScrollScene>
    </section>
  );
}

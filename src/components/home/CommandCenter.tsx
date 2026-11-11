import Image from "next/image";
import type { CSSProperties } from "react";
import { Button } from "@/components/global/Button";
import { ScrollReveal } from "@/components/motion/Reveal";
import { ScrollScene } from "@/components/motion/ScrollScene";
import { Words, wordCount } from "@/components/motion/Words";
import { web } from "@/data/media";
import { EntauraShowcase } from "./EntauraShowcase";

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

          <EntauraShowcase />
        </div>
      </ScrollScene>
    </section>
  );
}

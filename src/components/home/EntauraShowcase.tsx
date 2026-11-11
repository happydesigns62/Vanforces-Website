"use client";

import Image from "next/image";
import { useId, useState, type KeyboardEvent } from "react";
import { Button } from "@/components/global/Button";
import { ScrollReveal } from "@/components/motion/Reveal";
import { ENTAURA_URL } from "@/data/navigation";

type Product = {
  id: string;
  name: string;
  logo: string;
  width: number;
  height: number;
  topic: string;
  points: string[];
  exampleLabel: string;
  example: string;
  steps?: string[];
};

// Capabilities as described by the Vanforces team and on entaura.ai. The examples are illustrations of the kind of question
// or alert, not screens from the product.
const products: Product[] = [
  {
    id: "ask",
    name: "Entaura Ask",
    logo: "/brand/entaura-ask.png",
    width: 720,
    height: 104,
    topic: "Ask the question. See the proof.",
    points: ["Natural-language questions", "Authorized knowledge retrieval", "Source-backed answers"],
    exampleLabel: "A manager could ask",
    example: "Which sales routes are falling behind their targets this week?",
    steps: ["Understands the question", "Retrieves authorized information", "Analyzes performance", "Answers with supporting data"],
  },
  {
    id: "insight",
    name: "Entaura Insight",
    logo: "/brand/entaura-insight.png",
    width: 720,
    height: 92,
    topic: "Smart & trusted analytics",
    points: ["Business information analysis", "Performance comparisons", "Trends, charts and explanations"],
    exampleLabel: "A manager could ask",
    example: "How do this month's collections compare with last month?",
  },
  {
    id: "watch",
    name: "Entaura Watch",
    logo: "/brand/entaura-watch.png",
    width: 720,
    height: 93,
    topic: "Alerts from your answers",
    points: ["Configured monitoring", "Scheduled summaries", "Alerts and important business updates"],
    exampleLabel: "A team could set up",
    example: "A morning summary of overdue invoices, sent on a schedule.",
  },
];

/**
 * Entaura showcase, inside the Command Center panel. Ask, Insight and Watch are tabs, each with its capabilities and one
 * example. The section is clear that Entaura is a separate platform and that its connection to Vanforces data depends on
 * configuration. No product screens are invented: the examples are text only.
 */
export function EntauraShowcase() {
  const [active, setActive] = useState(0);
  const id = useId();
  const current = products[active];

  function onKeyDown(event: KeyboardEvent) {
    let next: number | null = null;
    if (event.key === "ArrowRight") next = (active + 1) % products.length;
    if (event.key === "ArrowLeft") next = (active - 1 + products.length) % products.length;
    if (next !== null) {
      event.preventDefault();
      setActive(next);
      document.getElementById(`${id}-tab-${products[next].id}`)?.focus();
    }
  }

  return (
    <ScrollReveal className="mx-auto mt-12 max-w-[1120px] md:mt-16">
      <div id="entaura" className="grid scroll-mt-28 overflow-hidden rounded-[28px] bg-white text-navy shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="flex flex-col items-start p-7 md:p-10">
          <Image src="/brand/entaura-logo.svg" alt="Entaura.ai" width={545} height={122} className="h-6 w-auto" />
          <h2 className="mt-6 text-[clamp(1.5rem,1.15rem+1.1vw,2rem)] font-medium leading-[1.14] tracking-[-0.035em] text-navy-deep">Intelligence for Better Business Decisions.</h2>
          <p className="mt-4 max-w-[26rem] text-pretty text-[1rem] leading-[1.65] text-muted">
            Vanforces connects the operation. Entaura helps make sense of the information. Ask questions, explore business knowledge, discover insights and monitor important changes.
          </p>
          <div className="mt-6 rounded-2xl bg-cyan-soft px-4 py-3 text-[13.5px] leading-relaxed text-navy">
            <span className="font-semibold">Agentic capabilities.</span> Authorized multi-step workflows across connected tools, data sources and business applications.
          </div>
          <Button href={ENTAURA_URL} variant="ink" className="mt-7 !min-h-[46px] !px-6 !text-[14.5px]">
            Explore Entaura.ai
          </Button>
          <p className="mt-4 max-w-[26rem] text-[12.5px] leading-relaxed text-muted">
            Entaura is a separate platform and is not included in every Vanforces subscription. How it connects to your Vanforces data depends on configuration.
          </p>
        </div>

        <div className="border-t border-line bg-mist/70 p-5 sm:p-7 md:p-9 lg:border-l lg:border-t-0">
          <div role="tablist" aria-label="Entaura products" onKeyDown={onKeyDown} className="flex gap-1.5 rounded-[20px] bg-white p-1.5 shadow-[0_1px_2px_rgb(41_59_71/0.06)]">
            {products.map((product, index) => {
              const selected = index === active;
              return (
                <button
                  key={product.id}
                  type="button"
                  role="tab"
                  id={`${id}-tab-${product.id}`}
                  aria-selected={selected}
                  aria-controls={`${id}-panel`}
                  aria-label={product.name}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  className={`flex min-h-12 flex-1 cursor-pointer items-center justify-center rounded-2xl px-3 transition-colors duration-300 ${selected ? "bg-mist" : "opacity-60 hover:opacity-100"}`}
                >
                  <Image src={product.logo} alt="" width={product.width} height={product.height} sizes="110px" className="h-auto w-[92px] sm:w-[104px]" />
                </button>
              );
            })}
          </div>

          <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${current.id}`} className="mt-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">{current.topic}</p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-3">
              {current.points.map((point) => (
                <li key={point} className="rounded-2xl bg-white px-4 py-3 text-[14.5px] font-medium leading-snug text-navy-deep shadow-[0_1px_2px_rgb(41_59_71/0.05)]">
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl border border-line bg-white p-4 sm:p-5">
              <p className="text-[12px] font-semibold text-muted">{current.exampleLabel} (example)</p>
              <p className="mt-1.5 rounded-xl bg-cyan-soft px-4 py-3 text-[15.5px] font-medium leading-snug text-navy-deep">&ldquo;{current.example}&rdquo;</p>
              {current.steps ? (
                <ol className="mt-4 flex flex-wrap gap-2">
                  {current.steps.map((step, index) => (
                    <li key={step} className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[13px] text-navy">
                      <span className="flex size-5 items-center justify-center rounded-full bg-navy-deep text-[11px] font-semibold text-white">{index + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

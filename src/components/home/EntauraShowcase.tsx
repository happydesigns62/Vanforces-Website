"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useId, useState, type KeyboardEvent } from "react";
import { Button } from "@/components/global/Button";
import { SectionHeading } from "@/components/global/Common";
import { ScrollReveal } from "@/components/motion/Reveal";
import { ENTAURA_URL } from "@/data/navigation";

type Product = {
  id: string;
  name: string;
  logo: string;
  width: number;
  height: number;
  topic: string;
  lead: string;
  points: string[];
  exampleLabel: string;
  example: string;
  steps: string[];
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
    lead: "Ask in plain language and get answers that point back to their source.",
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
    lead: "Turn business information into comparisons, trends and plain explanations.",
    points: ["Business information analysis", "Performance comparisons", "Trends, charts and explanations"],
    exampleLabel: "A manager could ask",
    example: "How do this month's collections compare with last month?",
    steps: ["Reads the question", "Pulls the relevant figures", "Compares the periods", "Explains what changed"],
  },
  {
    id: "watch",
    name: "Entaura Watch",
    logo: "/brand/entaura-watch.png",
    width: 720,
    height: 93,
    topic: "Alerts from your answers",
    lead: "Keep an eye on what matters, without checking reports by hand.",
    points: ["Configured monitoring", "Scheduled summaries", "Alerts and important business updates"],
    exampleLabel: "A team could set up",
    example: "A morning summary of overdue invoices, sent on a schedule.",
    steps: ["Choose what to watch", "Set a schedule or a threshold", "Entaura checks for you", "A summary or alert arrives"],
  },
];

/**
 * Entaura, in its own section in the Vanforces light theme. Ask, Insight and Watch are the three tabs. Each shows the
 * capabilities, one example in a chat-style bubble and the steps behind it. The section says clearly that Entaura is a
 * separate platform and that its connection to Vanforces data depends on configuration. No product screens are invented:
 * the examples are text only.
 */
export function EntauraShowcase() {
  const [active, setActive] = useState(0);
  const id = useId();
  const current = products[active];

  function onKeyDown(event: KeyboardEvent) {
    let next: number | null = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (active + 1) % products.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (active - 1 + products.length) % products.length;
    if (next !== null) {
      event.preventDefault();
      setActive(next);
      document.getElementById(`${id}-tab-${products[next].id}`)?.focus();
    }
  }

  return (
    <section id="entaura" className="section scroll-mt-24">
      <div className="wrap">
        <Image src="/brand/entaura-logo.svg" alt="Entaura.ai" width={545} height={122} className="mx-auto mb-6 h-8 w-auto" />
        <SectionHeading
          variant="fine"
          align="center"
          eyebrow="Meet Entaura"
          title="Intelligence for"
          titleMuted="Better Business Decisions."
          description="Vanforces connects the operation. Entaura helps make sense of the information: ask questions, explore business knowledge, discover insights and monitor important changes."
        />

        <ScrollReveal delay={100} className="mt-14 md:mt-16">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
            <div role="tablist" aria-label="Entaura products" aria-orientation="vertical" onKeyDown={onKeyDown} className="grid gap-3">
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
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(index)}
                    className={`cursor-pointer rounded-[24px] border p-5 text-left transition-[background-color,border-color,box-shadow] duration-300 ${
                      selected ? "border-cyan-line bg-cyan-soft shadow-[0_18px_40px_-26px_rgb(8_60_66/0.45)]" : "border-line bg-white hover:border-cyan-line hover:bg-mist"
                    }`}
                  >
                    <Image src={product.logo} alt={product.name} width={product.width} height={product.height} sizes="130px" className="h-auto w-[116px]" />
                    <p className="mt-3 text-[15px] font-semibold text-navy-deep">{product.topic}</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-muted">{product.lead}</p>
                  </button>
                );
              })}
            </div>

            <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${current.id}`} className="rounded-[28px] bg-cyan-soft p-5 sm:p-8 lg:p-10">
              <ul className="grid gap-2.5 sm:grid-cols-3">
                {current.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 rounded-2xl bg-white px-4 py-3.5 text-[14.5px] font-medium leading-snug text-navy-deep shadow-[0_1px_2px_rgb(41_59_71/0.05)]">
                    <span aria-hidden="true" className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-teal text-navy-deep">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-[22px] bg-white p-5 shadow-[0_1px_2px_rgb(41_59_71/0.05)] sm:p-6">
                <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">{current.exampleLabel} (example)</p>
                <p className="mt-3 max-w-[34rem] rounded-2xl rounded-tl-md bg-mist px-4 py-3 text-[16px] font-medium leading-snug text-navy-deep">&ldquo;{current.example}&rdquo;</p>
                <ol className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                  {current.steps.map((step, index) => (
                    <li key={step} className="rounded-2xl border border-line px-3.5 py-3">
                      <span className="flex size-6 items-center justify-center rounded-full bg-navy-deep text-[12px] font-semibold text-white">{index + 1}</span>
                      <p className="mt-2 text-[14px] font-medium leading-snug text-navy-deep">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <div className="mt-5 grid items-center gap-5 rounded-[28px] border border-line bg-white p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10">
            <div>
              <p className="text-[15.5px] leading-relaxed text-navy-deep">
                <span className="font-semibold">Agentic capabilities.</span> Authorized multi-step workflows across connected tools, data sources and business applications.
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">Entaura is a separate platform and is not included in every Vanforces subscription. How it connects to your Vanforces data depends on configuration.</p>
            </div>
            <Button href={ENTAURA_URL} variant="ink" arrow className="!min-h-[48px] justify-self-start !px-6 !text-[14.5px] lg:justify-self-end">
              Explore Entaura.ai
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

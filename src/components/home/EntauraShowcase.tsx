"use client";

import Image from "next/image";
import { ArrowUp, Bell, Check, LineChart, MessageSquare } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/global/Button";
import { ScrollReveal } from "@/components/motion/Reveal";
import { ENTAURA_URL } from "@/data/navigation";

type Mode = "ask" | "insight" | "watch";

type Chat = {
  mode: Mode;
  label: string;
  hint: string;
  Icon: typeof MessageSquare;
  question: string;
  steps: string[];
  answer: ReactNode;
};

/** Sample bars. The values are made up for illustration and are labelled as sample data. */
function Bars({ rows, unit }: { rows: { label: string; value: number; tone?: "teal" | "muted" }[]; unit: string }) {
  return (
    <ul className="mt-3 space-y-2.5">
      {rows.map((r) => (
        <li key={r.label} className="grid grid-cols-[5.5rem_minmax(0,1fr)_2.75rem] items-center gap-3 text-[13px]">
          <span className="truncate font-medium text-navy-deep">{r.label}</span>
          <span className="h-2.5 overflow-hidden rounded-full bg-mist">
            <span className={`block h-full rounded-full ${r.tone === "muted" ? "bg-navy/30" : "bg-teal"}`} style={{ width: `${r.value}%` }} />
          </span>
          <span className="text-right font-semibold tabular-nums text-navy-deep">
            {r.value}
            {unit}
          </span>
        </li>
      ))}
    </ul>
  );
}

const chats: Chat[] = [
  {
    mode: "ask",
    label: "Ask",
    hint: "Questions in plain words",
    Icon: MessageSquare,
    question: "Which routes are behind target this week?",
    steps: ["Reading this week's route targets", "Comparing visits and sales to plan", "Ranking the routes furthest behind"],
    answer: (
      <>
        <p className="text-[14.5px] leading-relaxed text-navy-deep">Three routes are behind their weekly target. Route C is furthest behind, mostly because of fewer completed visits.</p>
        <Bars
          unit="%"
          rows={[
            { label: "Route C", value: 62 },
            { label: "Route F", value: 71 },
            { label: "Route A", value: 78 },
          ]}
        />
        <p className="mt-2 text-[12px] text-muted">Share of weekly target reached.</p>
      </>
    ),
  },
  {
    mode: "insight",
    label: "Insight",
    hint: "Trends and comparisons",
    Icon: LineChart,
    question: "How do collections compare with last month?",
    steps: ["Gathering this month's collections", "Matching them to last month", "Writing a short explanation"],
    answer: (
      <>
        <p className="text-[14.5px] leading-relaxed text-navy-deep">Collections are up on last month. Most of the increase came from customers paying earlier in the month.</p>
        <Bars
          unit=""
          rows={[
            { label: "Last month", value: 78, tone: "muted" },
            { label: "This month", value: 91 },
          ]}
        />
        <p className="mt-2 text-[12px] text-muted">Indexed amounts, illustrative.</p>
      </>
    ),
  },
  {
    mode: "watch",
    label: "Watch",
    hint: "Monitoring that tells you",
    Icon: Bell,
    question: "Tell me when a van returns with unreconciled stock.",
    steps: ["Understanding the condition", "Choosing what to check", "Setting up the watch"],
    answer: (
      <>
        <p className="text-[14.5px] leading-relaxed text-navy-deep">Here is the watch it would set up for you:</p>
        <dl className="mt-3 divide-y divide-line rounded-xl border border-line text-[13px]">
          {[
            ["Watches", "Van return reconciliation"],
            ["When", "Stock does not match at day end"],
            ["Tells", "The operations manager"],
          ].map(([k, v]) => (
            <div key={k} className="grid grid-cols-[5rem_minmax(0,1fr)] gap-3 px-3.5 py-2.5">
              <dt className="text-muted">{k}</dt>
              <dd className="font-semibold text-navy-deep">{v}</dd>
            </div>
          ))}
        </dl>
      </>
    ),
  },
];

/**
 * Entaura as a working chat. A small workspace window in the style of entaura.ai: a sidebar with Ask, Insight and Watch, and a
 * conversation beside it. Choosing a mode types the question, shows the steps of reasoning one at a time, then the answer.
 * Everything here is an illustration with sample data and is labelled so. Entaura is a separate platform and is not in every plan.
 */
export function EntauraShowcase() {
  const [active, setActive] = useState(0);
  const [stage, setStage] = useState(3); // 0 asking, 1-2 reasoning, 3 answered. Starts answered so the first view is complete.
  const timers = useRef<number[]>([]);
  const chat = chats[active];

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  function play(index: number) {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setActive(index);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage(3);
      return;
    }
    setStage(0);
    [500, 1100, 1700].forEach((ms, i) => timers.current.push(window.setTimeout(() => setStage(i + 1), ms)));
  }

  return (
    <section id="entaura" className="section scroll-mt-24">
      <div className="wrap">
        <ScrollReveal className="mx-auto max-w-[44rem] text-center">
          <p className="eyebrow justify-center">Meet entaura.ai</p>
          <h2 className="mt-5 text-balance text-[clamp(1.875rem,1.5rem+1.4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.04em] text-navy-deep">
            AI Agents for <span className="text-ink-soft">Intelligent Monitoring and Business Insights.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[36rem] text-pretty text-[1rem] leading-[1.7] text-muted">
            Vanforces connects the operation. Entaura helps make sense of it: ask questions in plain words, see trends explained, and have important changes watched for you.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={ENTAURA_URL} variant="entaura" arrow className="!min-h-[46px] !px-6 !text-[14.5px]">
              Explore Entaura.ai
            </Button>
            <Button href="/contact" variant="secondary" className="!min-h-[46px] !px-6 !text-[14.5px]">
              Ask about Entaura
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100} className="mt-12">
          <div className="mx-auto max-w-[1000px] overflow-hidden rounded-[24px] border border-line bg-white shadow-[0_50px_90px_-44px_rgb(8_60_66/0.4),0_10px_24px_-12px_rgb(8_60_66/0.14)]">
            <div aria-hidden="true" className="flex h-9 items-center gap-1.5 border-b border-line bg-mist px-3.5">
              <span className="size-2.5 rounded-full bg-line" />
              <span className="size-2.5 rounded-full bg-line" />
              <span className="size-2.5 rounded-full bg-line" />
              <span className="ml-3 rounded-md bg-white px-3 py-0.5 text-[11px] font-medium text-muted">Entaura workspace, sample</span>
            </div>
            <div className="grid md:grid-cols-[15rem_minmax(0,1fr)]">
              <div className="border-b border-line bg-mist/70 p-4 md:border-b-0 md:border-r">
                <Image src="/brand/entaura-logo.svg" alt="Entaura.ai" width={545} height={122} className="hidden h-6 w-auto md:block" />
                <p className="mt-0 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted md:mt-5">Try a mode</p>
                <ul className="mt-2 grid grid-cols-3 gap-2 md:grid-cols-1">
                  {chats.map((c, i) => (
                    <li key={c.mode}>
                      <button
                        type="button"
                        onClick={() => play(i)}
                        aria-pressed={i === active}
                        className={`flex w-full cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-colors ${
                          i === active ? "border-cyan-line bg-white shadow-[0_1px_2px_rgb(41_59_71/0.06)]" : "border-transparent hover:bg-white/70"
                        }`}
                      >
                        <span className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${i === active ? "bg-cyan-soft text-teal-deep" : "bg-white text-navy"}`}>
                          <c.Icon aria-hidden="true" size={16} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[14px] font-semibold text-navy-deep">{c.label}</span>
                          <span className="hidden text-[12px] leading-snug text-muted md:block">{c.hint}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex min-h-[380px] flex-col p-5 sm:p-7" aria-live="polite">
                <div className="flex-1 space-y-5">
                  <div className="flex justify-end">
                    <p className="max-w-[85%] rounded-2xl rounded-br-md bg-navy-deep px-4 py-2.5 text-[14.5px] leading-snug text-white">{chat.question}</p>
                  </div>

                  {stage >= 1 ? (
                    <div className="max-w-[92%]">
                      <p className="flex items-center gap-2 text-[12.5px] font-semibold text-muted">
                        {stage >= 3 ? <Check aria-hidden="true" size={14} className="text-teal-deep" /> : <span className="size-2 animate-pulse rounded-full bg-teal" />}
                        {stage >= 3 ? "Reasoned in 3 steps" : "Reasoning"}
                      </p>
                      <ol className="mt-2 space-y-1.5 border-l-2 border-cyan-line pl-3.5">
                        {chat.steps.slice(0, stage >= 3 ? 3 : stage).map((s) => (
                          <li key={s} className="text-[13px] text-muted">
                            {s}
                          </li>
                        ))}
                      </ol>
                    </div>
                  ) : null}

                  {stage >= 3 ? <div className="max-w-[92%] rounded-2xl rounded-tl-md border border-line bg-white p-4 shadow-[0_1px_2px_rgb(41_59_71/0.04)]">{chat.answer}</div> : null}
                </div>

                <div className="mt-5 flex items-center gap-3 rounded-full border border-line bg-white py-1.5 pl-4 pr-1.5">
                  <span className="min-w-0 flex-1 truncate text-[13.5px] text-muted">Ask about routes, collections, stock or teams</span>
                  <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#0b0b0b] text-white">
                    <ArrowUp size={15} />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <p className="mx-auto mt-4 max-w-[44rem] text-center text-[12.5px] leading-relaxed text-navy/65">
            An illustration with sample data, not a screen from a customer. Entaura is a separate platform and is not included in every Vanforces subscription. What it can answer depends on how it is connected to your data.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

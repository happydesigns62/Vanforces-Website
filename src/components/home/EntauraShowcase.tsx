"use client";

import Image from "next/image";
import { ArrowUp, Check, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/global/Button";
import { ScrollReveal } from "@/components/motion/Reveal";
import { useCalm } from "@/components/motion/useCalm";
import { ENTAURA_URL } from "@/data/navigation";

type Mode = "insight" | "watch";
type Turn = { question: string; steps: string[]; answer: ReactNode };

/** Sample bars. The values are made up for illustration and are labelled as sample data. */
function Bars({ rows, unit = "" }: { rows: { label: string; value: number; muted?: boolean }[]; unit?: string }) {
  return (
    <ul className="mt-3 space-y-2.5">
      {rows.map((r) => (
        <li key={r.label} className="grid grid-cols-[5.5rem_minmax(0,1fr)_2.75rem] items-center gap-3 text-[13px]">
          <span className="truncate font-medium text-navy-deep">{r.label}</span>
          <span className="h-2.5 overflow-hidden rounded-full bg-mist">
            <span className={`block h-full rounded-full ${r.muted ? "bg-navy/30" : "bg-teal"}`} style={{ width: `${r.value}%` }} />
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

function Facts({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="mt-3 divide-y divide-line rounded-xl border border-line text-[13px]">
      {rows.map(([k, v]) => (
        <div key={k} className="grid grid-cols-[5rem_minmax(0,1fr)] gap-3 px-3.5 py-2.5">
          <dt className="text-muted">{k}</dt>
          <dd className="font-semibold text-navy-deep">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

const p = "text-[14.5px] leading-relaxed text-navy-deep";

const threads: Record<Mode, Turn[]> = {
  insight: [
    {
      question: "How do collections compare with last month?",
      steps: ["Gathering this month's collections", "Matching them to last month", "Writing a short explanation"],
      answer: (
        <>
          <p className={p}>Collections are up on last month, with most of the rise coming from earlier payments.</p>
          <Bars rows={[{ label: "Last month", value: 78, muted: true }, { label: "This month", value: 91 }]} />
          <p className="mt-2 text-[12px] text-muted">Indexed amounts, illustrative.</p>
        </>
      ),
    },
    {
      question: "Which customers paid later than usual?",
      steps: ["Checking payment dates", "Comparing with each customer's usual pattern", "Ranking the biggest delays"],
      answer: (
        <>
          <p className={p}>Three customers paid later than their usual pattern.</p>
          <Bars unit="d" rows={[{ label: "Customer A", value: 12 }, { label: "Customer B", value: 9 }, { label: "Customer C", value: 6 }]} />
          <p className="mt-2 text-[12px] text-muted">Days later than usual, illustrative.</p>
        </>
      ),
    },
    {
      question: "Show that by route.",
      steps: ["Grouping the delays by route", "Totalling each route", "Preparing the comparison"],
      answer: (
        <>
          <p className={p}>Route C accounts for most of the delay.</p>
          <Bars rows={[{ label: "Route C", value: 64 }, { label: "Route A", value: 38 }, { label: "Route F", value: 21 }]} />
          <p className="mt-2 text-[12px] text-muted">Share of total delay, illustrative.</p>
        </>
      ),
    },
  ],
  watch: [
    {
      question: "Tell me when a van returns with unreconciled stock.",
      steps: ["Understanding the condition", "Choosing what to check", "Setting up the watch"],
      answer: (
        <>
          <p className={p}>Here is the watch it would set up for you:</p>
          <Facts rows={[["Watches", "Van return reconciliation"], ["When", "Stock does not match at day end"], ["Tells", "The operations manager"]]} />
        </>
      ),
    },
    {
      question: "Also send me overdue invoices every morning.",
      steps: ["Finding overdue invoices", "Choosing a schedule", "Adding the summary"],
      answer: (
        <>
          <p className={p}>Added a second watch, as a scheduled summary:</p>
          <Facts rows={[["Watches", "Overdue invoices"], ["When", "Every morning"], ["Tells", "The finance manager"]]} />
        </>
      ),
    },
    {
      question: "Show me my active watches.",
      steps: ["Listing your watches", "Checking their status", "Preparing the list"],
      answer: (
        <>
          <p className={p}>You have two active watches:</p>
          <ul className="mt-3 space-y-2">
            {["Van return reconciliation", "Overdue invoices, every morning"].map((w) => (
              <li key={w} className="flex items-center justify-between rounded-xl border border-line px-3.5 py-2.5 text-[13px] font-semibold text-navy-deep">
                {w}
                <span className="rounded-full bg-accent-green-soft px-2.5 py-0.5 text-[11.5px] font-semibold text-accent-green-deep">Active</span>
              </li>
            ))}
          </ul>
        </>
      ),
    },
  ],
};

const modes: { id: Mode; logo: string; w: number; h: number; hint: string; name: string }[] = [
  { id: "insight", logo: "/brand/entaura-insight.png", w: 720, h: 92, hint: "Trends and comparisons", name: "Entaura Insight" },
  { id: "watch", logo: "/brand/entaura-watch.png", w: 720, h: 93, hint: "Monitoring that tells you", name: "Entaura Watch" },
];

/**
 * Entaura as a conversation that keeps going. Two modes, Insight and Watch. When the section is on screen, a question is typed into
 * the input, sent, reasoned through step by step and answered, then the next question follows, and the thread scrolls up as it grows.
 * It can be replayed, and shows the whole thread still for reduced motion. Every figure is sample data and labelled.
 */
export function EntauraShowcase() {
  const [mode, setMode] = useState<Mode>("insight");
  const [turn, setTurn] = useState(0);
  const [stage, setStage] = useState(4); // 0 typing, 1-3 reasoning steps, 4 answered
  const [typed, setTyped] = useState("");
  const [fading, setFading] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const calm = useCalm();
  const box = useRef<HTMLDivElement>(null);
  const turns = threads[mode];

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // The whole conversation is driven by one clock, so typing, reasoning and answers keep an even pace and never drift.
  const [run, setRun] = useState(0);
  const restart = useCallback((next: Mode) => {
    setMode(next);
    setRun((r) => r + 1);
  }, []);

  useEffect(() => {
    if (calm || !inView) return;
    const list = threads[mode];
    const TYPE_MS = (turnIndex: number) => (turnIndex === 0 ? 48 : 30);
    const lengths = list.map((t, i) => t.question.length * TYPE_MS(i));
    const GAP = 500;
    const STEP = 800;
    const HOLD = 3000;
    const total = list.reduce((sum, _t, i) => sum + lengths[i] + GAP + STEP * 3 + HOLD, 0);
    const FADE = 600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = now - start;
      if (t >= total + FADE) {
        setFading(false);
        setRun((r) => r + 1);
        return;
      }
      if (t >= total) {
        setFading(true);
      } else {
        let offset = 0;
        for (let i = 0; i < list.length; i++) {
          const dur = lengths[i] + GAP + STEP * 3 + HOLD;
          if (t < offset + dur) {
            const local = t - offset;
            const q = list[i].question;
            setTurn(i);
            if (local < lengths[i]) {
              setStage(0);
              setTyped(q.slice(0, Math.floor(local / TYPE_MS(i))));
            } else if (local < lengths[i] + GAP) {
              setStage(0);
              setTyped(q);
            } else {
              const s = local - lengths[i] - GAP;
              setStage(s < STEP ? 1 : s < STEP * 2 ? 2 : s < STEP * 3 ? 3 : 4);
              setTyped("");
            }
            break;
          }
          offset += dur;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [calm, inView, mode, run]);
  // Keep the newest message in view, scrolling smoothly as the thread grows.
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [turn, stage]);

  // With reduced motion the whole thread is shown at once.
  const shownTurns = calm ? turns.length : Math.min(turn + 1, turns.length);
  const typing = !calm && stage === 0 && turn < turns.length;

  return (
    <section id="entaura" className="section scroll-mt-24">
      <div className="wrap">
        <ScrollReveal className="mx-auto max-w-[44rem] text-center">
          <p className="eyebrow justify-center">Meet entaura.ai</p>
          <h2 className="mt-5 text-balance text-[clamp(1.875rem,1.5rem+1.4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.04em] text-navy-deep">
            AI Agents for <span className="text-ink-soft">Intelligent Monitoring and Business Insights.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[36rem] text-pretty text-[1rem] leading-[1.7] text-muted">
            Vanforces connects the operation. Entaura helps make sense of it: see trends explained, and have important changes watched for you.
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
          <div
            ref={box}
            className="mx-auto max-w-[1000px] overflow-hidden rounded-[24px] border border-line bg-white shadow-[0_50px_90px_-44px_rgb(8_60_66/0.4),0_10px_24px_-12px_rgb(8_60_66/0.14)]"
          >
            <div aria-hidden="true" className="flex h-9 items-center gap-1.5 border-b border-line bg-mist px-3.5">
              <span className="size-2.5 rounded-full bg-line" />
              <span className="size-2.5 rounded-full bg-line" />
              <span className="size-2.5 rounded-full bg-line" />
              <span className="ml-3 rounded-md bg-white px-3 py-0.5 text-[11px] font-medium text-muted">Entaura workspace, sample</span>
            </div>
            <div className="grid md:grid-cols-[15rem_minmax(0,1fr)]">
              <div className="border-b border-line bg-mist/70 p-4 md:border-b-0 md:border-r">
                <Image src="/brand/entaura-logo.svg" alt="Entaura.ai" width={545} height={122} className="hidden h-6 w-auto md:block" />
                <ul className="grid grid-cols-2 gap-2 md:mt-6 md:grid-cols-1">
                  {modes.map((m) => (
                    <li key={m.id}>
                      <button
                        type="button"
                        onClick={() => restart(m.id)}
                        aria-pressed={m.id === mode}
                        className={`w-full cursor-pointer rounded-xl border px-3.5 py-3 text-left transition-colors ${m.id === mode ? "border-cyan-line bg-white shadow-[0_1px_2px_rgb(41_59_71/0.06)]" : "border-transparent hover:bg-white/70"}`}
                      >
                        <Image src={m.logo} alt={m.name} width={m.w} height={m.h} sizes="140px" className="h-auto w-[104px]" />
                        <span className="mt-1.5 hidden text-[12px] leading-snug text-muted md:block">{m.hint}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => restart(mode)}
                  className="mt-3 hidden cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-semibold text-muted transition-colors hover:text-navy-deep md:inline-flex"
                >
                  <RotateCcw aria-hidden="true" size={13} />
                  Replay
                </button>
              </div>

              <div className="flex h-[460px] flex-col p-5 sm:p-7">
                <div ref={scroller} aria-live="off" className={`min-h-0 flex-1 overflow-y-auto transition-opacity duration-500 [mask-image:linear-gradient(to_bottom,transparent,black_10%)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${fading ? "opacity-0" : "opacity-100"}`}>
                  <div className="flex min-h-full flex-col justify-end space-y-5">
                  {!calm && turn === 0 && stage === 0 ? (
                    <p className="cr-swap pb-2 text-center text-[13.5px] text-muted">Ask Entaura about your operation. Here is how it answers.</p>
                  ) : null}
                  {turns.slice(0, shownTurns).map((t, i) => {
                    const last = i === shownTurns - 1 && !calm;
                    const s = last ? stage : 4;
                    return (
                      <div key={t.question} className="space-y-4">
                        {s >= 1 ? (
                          <div className="cr-swap flex justify-end">
                            <p className="max-w-[85%] rounded-2xl rounded-br-md bg-navy-deep px-4 py-2.5 text-[14.5px] leading-snug text-white">{t.question}</p>
                          </div>
                        ) : null}
                        {s >= 1 ? (
                          <div className="cr-swap max-w-[92%]">
                            <p className="flex items-center gap-2 text-[12.5px] font-semibold text-muted">
                              {s >= 4 ? <Check aria-hidden="true" size={14} className="text-teal-deep" /> : <span className="size-2 animate-pulse rounded-full bg-teal" />}
                              {s >= 4 ? "Reasoned in 3 steps" : "Reasoning"}
                            </p>
                            <ol className="mt-2 space-y-1.5 border-l-2 border-cyan-line pl-3.5">
                              {t.steps.slice(0, s >= 4 ? 3 : s).map((st) => (
                                <li key={st} className="cr-swap text-[13px] text-muted">
                                  {st}
                                </li>
                              ))}
                            </ol>
                          </div>
                        ) : null}
                        {s >= 4 ? <div className="cr-swap max-w-[92%] rounded-2xl rounded-tl-md border border-line bg-white p-4 shadow-[0_1px_2px_rgb(41_59_71/0.04)]">{t.answer}</div> : null}
                      </div>
                    );
                  })}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3 rounded-full border border-line bg-white py-1.5 pl-4 pr-1.5">
                  <span className={`min-w-0 flex-1 truncate text-[13.5px] ${typing && typed ? "text-navy-deep" : "text-muted"}`}>
                    {typing && typed ? typed : "Ask a follow-up about routes, collections or stock"}
                    {typing && typed ? <span aria-hidden="true" className="ml-px inline-block h-4 w-px translate-y-0.5 animate-pulse bg-navy-deep" /> : null}
                  </span>
                  <span aria-hidden="true" className={`flex size-8 shrink-0 items-center justify-center rounded-full text-white transition-colors ${typing && typed ? "bg-[#0b0b0b]" : "bg-[#0b0b0b]/40"}`}>
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

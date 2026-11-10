"use client";

import { Check } from "lucide-react";
import { useId, useState, type KeyboardEvent } from "react";
import { BillingToggle } from "@/components/commercial/Pricing";
import { Button } from "@/components/global/Button";
import { ScrollReveal } from "@/components/motion/Reveal";
import { ScrollScene } from "@/components/motion/ScrollScene";
import { Words, wordCount } from "@/components/motion/Words";
import { formatINR, plans, type Billing } from "@/data/pricing";

const TITLE = "A Plan for the Way";
const TITLE_MUTED = "You Operate.";

/**
 * Pricing teaser: the three plans as a short list on a deep-teal panel, and the chosen plan's details on a white card.
 * Amounts are the existing demo prices from the pricing data, and the demo notice stays visible.
 */
export function PricingSelector() {
  const [selected, setSelected] = useState(1);
  const [billing, setBilling] = useState<Billing>("annual");
  const id = useId();
  const plan = plans[selected];
  const annual = billing === "annual";
  const amount = annual ? plan.annualMonthly : plan.monthly;
  const href = plan.id === "enterprise" ? plan.cta.href : `${plan.cta.href}&billing=${billing}`;

  function onKeyDown(event: KeyboardEvent) {
    const last = plans.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = selected === last ? 0 : selected + 1;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = selected === 0 ? last : selected - 1;
    if (next !== null) {
      event.preventDefault();
      setSelected(next);
      document.getElementById(`${id}-plan-${plans[next].id}`)?.focus();
    }
  }

  return (
    <section id="plans" className="scroll-mt-20 px-3 pb-6 pt-16 md:px-6 md:pb-10 md:pt-24">
      <div className="relative mx-auto max-w-[1320px]">
        <ScrollScene mode="entry" className="scene-panel">
        <div className="plan-panel relative rounded-[32px] px-5 py-14 text-white sm:px-10 md:rounded-[40px] md:py-20 lg:px-14">
          <div className="mx-auto grid max-w-[1120px] gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
            <div>
              <ScrollReveal>
                <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[13px] font-semibold text-white/90">
                  <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-white" />
                  Choose what works for you
                </p>
              </ScrollReveal>
              <h2 data-reveal="words" suppressHydrationWarning className="t-fine mt-5 !text-white">
                <Words text={TITLE} /> <Words text={TITLE_MUTED} className="text-white/55" start={wordCount(TITLE)} />
              </h2>
              <ScrollReveal delay={140}>
                <p className="mt-5 text-pretty text-[1.0625rem] leading-[1.7] text-white/80 sm:text-[1.125rem]">
                  Every distribution business works differently. Find a plan that fits your team and your next stage of growth.
                </p>
              </ScrollReveal>

              <div className="mt-8">
                <BillingToggle billing={billing} onChange={setBilling} />
              </div>

              <div role="radiogroup" aria-label="Plan" onKeyDown={onKeyDown} className="mt-6 space-y-2.5">
                {plans.map((item, index) => {
                  const active = index === selected;
                  return (
                    <button
                      key={item.id}
                      id={`${id}-plan-${item.id}`}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      tabIndex={active ? 0 : -1}
                      onClick={() => setSelected(index)}
                      className={`flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-[background-color,border-color,transform] duration-300 ease-[var(--ease-soft)] ${
                        active ? "border-white/40 bg-white/15" : "border-white/15 hover:border-white/30 hover:bg-white/[0.07]"
                      }`}
                    >
                      <span>
                        <span className="block text-[1.0625rem] font-semibold">{item.name}</span>
                        <span className="mt-0.5 block text-[14px] text-white/70">{item.tagline}</span>
                      </span>
                      <span aria-hidden="true" className={`flex size-6 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${active ? "bg-white text-teal-deep" : "border border-white/30"}`}>
                        {active ? <Check size={14} strokeWidth={3} /> : null}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:pt-6">
              <div key={plan.id} className="seq rounded-[28px] bg-white p-7 text-navy shadow-[0_30px_60px_-30px_rgb(8_60_66/0.6)] md:p-9">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[13px] font-semibold text-teal-deep">{plan.name}</p>
                </div>
                <p className="mt-3 text-[1.5rem] font-medium leading-[1.2] tracking-[-0.03em] text-navy-deep">{plan.tagline}</p>
                <div className="mt-6 flex flex-wrap items-baseline gap-x-2">
                  <span className="text-[2.75rem] font-medium leading-none tracking-[-0.04em] text-navy-deep tabular-nums">{formatINR(amount)}</span>
                  <span className="text-[14px] text-muted">/ user / month</span>
                </div>
                <p className="mt-2 min-h-10 text-[13.5px] leading-snug text-muted">
                  {annual ? `Billed annually. Annual total per user: ${formatINR(plan.annualTotal)}.` : "Billed monthly."}
                </p>
                <ul className="mt-6 grid gap-x-6 gap-y-2.5 border-t border-line pt-6 text-[14.5px] sm:grid-cols-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 leading-snug">
                      <Check aria-hidden="true" size={16} strokeWidth={2.75} className="mt-0.5 shrink-0 text-teal-deep" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button href={href} arrow>
                    {plan.cta.label}
                  </Button>
                  <Button href="/pricing#compare" variant="text" className="sm:ml-2">
                    Compare Plans &amp; Features
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </ScrollScene>

      </div>
    </section>
  );
}

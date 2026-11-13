"use client";

import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { useState } from "react";
import { comparison, formatUSD, plans, type Billing, type ComparisonCell, type Plan } from "@/data/pricing";
import { Button } from "@/components/global/Button";

export function BillingToggle({ billing, onChange }: { billing: Billing; onChange: (billing: Billing) => void }) {
  return (
    <div role="radiogroup" aria-label="Billing cycle" className="relative inline-grid grid-cols-2 rounded-full border border-line bg-mist p-1">
      <span
        aria-hidden="true"
        className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-navy-deep transition-transform duration-500 ease-[var(--ease-soft)] ${billing === "annual" ? "translate-x-full" : ""}`}
      />
      {(["monthly", "annual"] as const).map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={billing === option}
          onClick={() => onChange(option)}
          className={`relative z-10 min-h-11 min-w-28 cursor-pointer rounded-full px-5 text-sm font-semibold capitalize transition-colors duration-300 ${billing === option ? "text-white" : "text-muted hover:text-navy"}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export function PricingCard({ plan, billing, compact = false }: { plan: Plan; billing: Billing; compact?: boolean }) {
  const annual = billing === "annual";
  const amount = annual ? plan.annualMonthly : plan.monthly;
  const href = plan.id === "enterprise" ? plan.cta.href : `${plan.cta.href}&billing=${billing}`;
  const featured = plan.highlighted;

  return (
    <article className={`relative flex h-full flex-col rounded-[28px] p-7 md:p-9 ${featured ? "bg-navy-deep text-white shadow-[0_30px_60px_-30px_rgb(4_30_34/0.7)]" : "border border-line bg-white text-navy shadow-[0_30px_60px_-36px_rgb(8_60_66/0.5)]"}`}>
      <div className="flex items-center justify-between gap-3">
        <h3 className={`text-[1.0625rem] font-semibold ${featured ? "text-white" : "text-teal-deep"}`}>{plan.name}</h3>
      </div>
      <p className={`mt-3 text-[1.375rem] font-medium leading-[1.2] tracking-[-0.03em] ${featured ? "text-white" : "text-navy-deep"}`}>{plan.tagline}</p>
      <div className="mt-5 flex flex-wrap items-baseline gap-x-1.5">
        <span className={`text-[2.75rem] font-medium leading-none tracking-[-0.04em] tabular-nums ${featured ? "text-white" : "text-navy-deep"}`}>{formatUSD(amount)}</span>
        <span className={`text-[14px] ${featured ? "text-white/70" : "text-muted"}`}>/ user / month</span>
      </div>
      <p className={`mt-2 min-h-10 text-[13.5px] leading-snug ${featured ? "text-white/70" : "text-muted"}`}>
        {annual ? `Billed annually. Annual total per user: ${formatUSD(plan.annualTotal)}, excluding tax.` : "Billed monthly, excluding tax."}
      </p>
      {!compact ? <p className={`mt-4 text-[15px] leading-relaxed ${featured ? "text-white/80" : "text-muted"}`}>{plan.description}</p> : null}
      <Button href={href} variant={featured ? "teal" : "secondary"} className="mt-6 w-full">
        {plan.cta.label}
      </Button>
      <ul className={`mt-6 space-y-2.5 border-t pt-6 text-[14.5px] ${featured ? "border-white/15" : "border-line"}`}>
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-2.5 leading-snug">
            <Check aria-hidden="true" size={16} strokeWidth={2.75} className={`mt-0.5 shrink-0 ${featured ? "text-teal" : "text-teal-deep"}`} />
            {feature}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function PricingPlans({ compact = false, initial = "annual", onPanel = false }: { compact?: boolean; initial?: Billing; onPanel?: boolean }) {
  const [billing, setBilling] = useState<Billing>(initial);
  return (
    <div>
      <div className="flex flex-col items-center gap-3">
        <BillingToggle billing={billing} onChange={setBilling} />
        <p className={`text-[13.5px] ${onPanel ? "text-white/80" : "text-muted"}`}>
          {billing === "annual" ? "Showing the lower per-user rate, billed once a year." : "Showing the standard monthly rate per user."}
        </p>
      </div>
      <div className="mt-9 grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} billing={billing} compact={compact} />
        ))}
      </div>
    </div>
  );
}

function Cell({ value, label }: { value: ComparisonCell; label: string }) {
  if (value === true) {
    return (
      <>
        <Check aria-hidden="true" size={18} strokeWidth={2.75} className="mx-auto text-teal-deep" />
        <span className="sr-only">{label}: included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <Minus aria-hidden="true" size={16} className="mx-auto text-line" />
        <span className="sr-only">{label}: not included</span>
      </>
    );
  }
  return <span className="text-[13px] font-medium leading-tight">{value}</span>;
}

export function PlanComparison() {
  return (
    <div>
      <p className="mb-4">
        <span className="ml-2 inline-block text-[13px] text-muted md:hidden">Swipe the table to see all plans.</span>
      </p>
      <div className="relative overflow-x-auto rounded-[24px] border border-line bg-white" tabIndex={0} role="region" aria-label="Plan comparison table, scrollable">
        <table className="w-full min-w-[620px] border-collapse text-[14.5px]">
          <caption className="sr-only">Feature comparison between Basic, Premium and Enterprise</caption>
          <thead>
            <tr className="bg-band-cyan">
              <th scope="col" className="sticky left-0 z-10 bg-band-cyan p-4 text-left font-bold">Feature</th>
              {plans.map((plan) => (
                <th key={plan.id} scope="col" className="w-[21%] p-4 text-center">
                  <span className="block font-bold">{plan.name}</span>
                  <Link href={plan.id === "enterprise" ? plan.cta.href : plan.cta.href} className="mt-0.5 block text-[12.5px] font-semibold text-teal-deep hover:text-navy">
                    {plan.cta.label}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.map((row) => (
              <tr key={row.feature} className="border-t border-line">
                <th scope="row" className="sticky left-0 z-10 bg-white p-4 text-left font-medium">{row.feature}</th>
                <td className="p-4 text-center"><Cell value={row.basic} label="Basic" /></td>
                <td className="bg-band-cyan/50 p-4 text-center"><Cell value={row.premium} label="Premium" /></td>
                <td className="p-4 text-center"><Cell value={row.enterprise} label="Enterprise" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

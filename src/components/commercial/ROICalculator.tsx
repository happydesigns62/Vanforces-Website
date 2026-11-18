"use client";

import { useId, useState } from "react";
import { formatUSD } from "@/data/pricing";
import { DemoNotice } from "@/components/global/Common";

type Inputs = { users: number; minutes: number; days: number; rate: number };

const fields: { key: keyof Inputs; label: string; min: number; max: number; step: number; prefix?: string; suffix?: string }[] = [
  { key: "users", label: "Users", min: 1, max: 500, step: 1 },
  { key: "minutes", label: "Potential minutes saved per user per day", min: 0, max: 120, step: 1, suffix: "min" },
  { key: "days", label: "Working days per month", min: 1, max: 31, step: 1, suffix: "days" },
  { key: "rate", label: "Hourly staff cost", min: 0, max: 200, step: 1, prefix: "$" },
];

function InputRow({
  field,
  value,
  onChange,
}: {
  field: (typeof fields)[number];
  value: number;
  onChange: (next: number) => void;
}) {
  const id = useId();
  const percent = ((Math.min(value, field.max) - field.min) / (field.max - field.min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={id} className="text-[15px] font-semibold leading-snug">
          {field.label}
        </label>
        <div className="flex shrink-0 items-center gap-1 rounded-lg border border-line bg-white px-2.5 focus-within:border-teal-deep">
          {field.prefix ? <span aria-hidden="true" className="text-sm text-muted">{field.prefix}</span> : null}
          <input
            id={id}
            type="number"
            inputMode="numeric"
            min={field.min}
            max={field.max}
            step={field.step}
            value={Number.isNaN(value) ? "" : value}
            onChange={(event) => onChange(event.target.value === "" ? NaN : Number(event.target.value))}
            onBlur={() => {
              const safe = Number.isNaN(value) ? field.min : Math.min(field.max, Math.max(field.min, value));
              if (safe !== value) onChange(safe);
            }}
            className="h-10 w-16 bg-transparent text-right text-[15px] font-bold tabular-nums outline-none"
          />
          {field.suffix ? <span aria-hidden="true" className="text-[13px] text-muted">{field.suffix}</span> : null}
        </div>
      </div>
      <input
        type="range"
        aria-label={`${field.label} slider`}
        min={field.min}
        max={field.max}
        step={field.step}
        value={Number.isNaN(value) ? field.min : Math.min(value, field.max)}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 h-2 w-full cursor-pointer"
        style={{ accentColor: "#0e7f86", backgroundSize: `${percent}% 100%` }}
      />
    </div>
  );
}

export function ROICalculator() {
  const [inputs, setInputs] = useState<Inputs>({ users: 20, minutes: 15, days: 22, rate: 12 });
  const safe = (n: number) => (Number.isNaN(n) ? 0 : n);

  const monthlyHours = (safe(inputs.users) * safe(inputs.minutes) * safe(inputs.days)) / 60;
  const annualHours = monthlyHours * 12;
  const monthlyValue = monthlyHours * safe(inputs.rate);
  const annualValue = annualHours * safe(inputs.rate);
  const workdaysEquivalent = annualHours / 8;

  return (
    <div className="grid overflow-hidden rounded-[26px] border border-line lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <form className="space-y-7 bg-mist p-6 md:p-9" onSubmit={(event) => event.preventDefault()} aria-label="ROI inputs">
        <h2 className="text-[17px] font-bold">Your inputs</h2>
        {fields.map((field) => (
          <InputRow key={field.key} field={field} value={inputs[field.key]} onChange={(next) => setInputs((prev) => ({ ...prev, [field.key]: next }))} />
        ))}
        <button
          type="button"
          onClick={() => setInputs({ users: 20, minutes: 15, days: 22, rate: 12 })}
          className="cursor-pointer text-[14px] font-semibold text-teal-deep underline-offset-4 hover:underline"
        >
          Reset to example values
        </button>
      </form>

      <div className="bg-navy-deep p-6 text-white md:p-9" aria-live="polite">
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-teal">Illustrative estimate</p>
        <p className="mt-3 text-[15px] text-white/70">Illustrative annual time value</p>
        <p className="mt-1 text-[clamp(2.1rem,1.68rem+2.1vw,3.57rem)] font-bold leading-none tracking-tight tabular-nums">{formatUSD(annualValue)}</p>

        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[24px] bg-white/15">
          {[
            ["Monthly hours", `${Math.round(monthlyHours).toLocaleString("en-US")} hours`],
            ["Annual hours", `${Math.round(annualHours).toLocaleString("en-US")} hours`],
            ["Monthly time value", formatUSD(monthlyValue)],
            ["About the same as", `${Math.round(workdaysEquivalent).toLocaleString("en-US")} 8-hour days a year`],
          ].map(([label, value]) => (
            <div key={label} className="bg-navy-deep p-4 md:p-5">
              <dt className="text-[13px] text-white/65">{label}</dt>
              <dd className="mt-1 text-[clamp(1.05rem,0.84rem+0.42vw,1.155rem)] font-bold leading-tight tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 text-[13.5px] font-semibold">Accumulated hours over a year</p>
        <div aria-hidden="true" className="mt-3 flex h-28 items-end gap-1 md:gap-1.5">
          {Array.from({ length: 12 }, (_, index) => (
            <div key={index} className="flex h-full flex-1 flex-col justify-end">
              <div
                className="w-full origin-bottom rounded-t-md bg-teal transition-[height] duration-500 ease-[var(--ease-soft)]"
                style={{ height: monthlyHours > 0 ? `${((index + 1) / 12) * 100}%` : "2%", opacity: 0.45 + ((index + 1) / 12) * 0.55 }}
              />
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="mt-1.5 flex justify-between text-[11.5px] text-white/60">
          <span>Month 1</span>
          <span>Month 12</span>
        </div>
      </div>

      <div className="border-t border-line p-5 md:p-7 lg:col-span-2">
        <DemoNotice>These are illustrative estimates based on your inputs, not guaranteed savings or financial returns.</DemoNotice>
        <p className="mt-4 text-[13.5px] leading-relaxed text-muted">
          How it works: monthly hours = users × minutes × days ÷ 60. Annual hours = monthly hours × 12. Time value = hours × hourly staff cost.
        </p>
      </div>
    </div>
  );
}

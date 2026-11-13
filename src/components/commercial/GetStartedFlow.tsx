"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DemoNotice } from "@/components/global/Common";
import { art } from "@/data/media";
import { formatUSD, plans, type Billing, type PlanId } from "@/data/pricing";
import { BillingToggle } from "./Pricing";

const STORAGE_KEY = "vf-demo-registration";
const steps = ["Choose Plan", "Your Details", "Your Business", "Review"];
const stepArt = [art.signpost, art.company, art.business, art.confirm];

type Data = {
  plan: PlanId;
  billing: Billing;
  users: string;
  name: string;
  email: string;
  company: string;
  country: string;
  branches: string;
  businessType: string;
  teamSize: string;
  challenge: string;
  operations: string[];
};

const blank: Data = {
  plan: "premium",
  billing: "annual",
  users: "10",
  name: "",
  email: "",
  company: "",
  country: "",
  branches: "",
  businessType: "",
  teamSize: "",
  challenge: "",
  operations: [],
};

const operationOptions = ["Field Sales", "Van Sales", "Route Planning", "Warehouse Inventory", "Delivery", "Collections", "Reporting", "ERP Integration"];

type Errors = Partial<Record<keyof Data | "password", string>>;

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-[14.5px] font-semibold">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${name}-error`} className="mt-1.5 text-[13.5px] text-[#a42e25]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function GetStartedFlow() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(blank);
  // The demo password stays in memory only and is never written to browser storage.
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [loaded, setLoaded] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let saved: Partial<Data> & { step?: number } = {};
    try {
      saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}");
    } catch {
      saved = {};
    }
    // The chosen plan arrives in the web address from pricing buttons, and takes priority over saved entries.
    const params = new URLSearchParams(window.location.search);
    const fromUrl: Partial<Data> = {};
    const plan = params.get("plan");
    const billing = params.get("billing");
    if (plan === "basic" || plan === "premium" || plan === "enterprise") fromUrl.plan = plan;
    if (billing === "monthly" || billing === "annual") fromUrl.billing = billing;
    const { step: savedStep, ...savedData } = saved;
    // Restoring browser-only state has to happen after hydration, so it runs here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData({ ...blank, ...savedData, ...fromUrl });
    // The password isn't stored, so a reload can only resume up to the Create Account step.
    if (typeof savedStep === "number" && savedStep > 0) setStep(1);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, step }));
    } catch {
      // Storage can be unavailable in private windows. The flow still works without it.
    }
  }, [data, step, loaded]);

  const update = <K extends keyof Data>(key: K, value: Data[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const selected = plans.find((p) => p.id === data.plan) ?? plans[1];
  const rate = data.billing === "annual" ? selected.annualMonthly : selected.monthly;
  const userCount = Math.max(1, Number(data.users) || 1);

  function validate(): Errors {
    const next: Errors = {};
    if (step === 0 && !(Number(data.users) >= 1)) next.users = "Please enter at least 1 user.";
    if (step === 1) {
      if (!data.name.trim()) next.name = "Please enter your full name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) next.email = "Please enter a valid email address, like name@company.com.";
      if (password.length < 8) next.password = "Please use at least 8 characters. This is a demo, so don't use a real password.";
      if (!data.company.trim()) next.company = "Please enter a company name.";
      if (!data.country.trim()) next.country = "Please enter a country.";
    }
    if (step === 2) {
      if (!data.businessType) next.businessType = "Please select a business type.";
      if (!data.teamSize) next.teamSize = "Please select a field team size.";
    }
    if (step === 2 && data.operations.length === 0) next.operations = "Please choose at least one area.";
    return next;
  }

  function go(next: number) {
    setStep(next);
    setErrors({});
    requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true });
      headingRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    });
  }

  function onNext() {
    const found = validate();
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    go(step + 1);
  }

  const fieldProps = (name: keyof Data | "password") => ({
    id: name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    className: "field",
  });

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <p className="mb-2 text-[14px] font-semibold lg:hidden">
          Step {step + 1} of {steps.length}: {steps[step]}
        </p>
        <div className="h-1.5 overflow-hidden rounded-full bg-line lg:hidden" aria-hidden="true">
          <div className="h-full rounded-full bg-teal transition-[width] duration-500" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
        <ol className="hidden lg:block">
          {steps.map((label, index) => {
            const done = index < step;
            const current = index === step;
            return (
              <li key={label} className="relative pb-5 pl-11 last:pb-0" aria-current={current ? "step" : undefined}>
                {index < steps.length - 1 ? <span aria-hidden="true" className={`absolute left-[13px] top-7 h-[calc(100%-28px)] w-0.5 ${done ? "bg-teal" : "bg-line"}`} /> : null}
                <span className={`absolute left-0 top-0 flex size-7 items-center justify-center rounded-full text-[12.5px] font-bold transition-colors ${done ? "bg-teal text-navy-deep" : current ? "bg-navy-deep text-white" : "bg-mist text-muted"}`}>
                  {done ? <Check aria-hidden="true" size={15} strokeWidth={3} /> : index + 1}
                </span>
                {done ? (
                  <button type="button" onClick={() => go(index)} className="cursor-pointer text-left text-[14.5px] font-medium leading-tight text-navy hover:text-teal-deep">
                    {label}
                  </button>
                ) : (
                  <span className={`block text-[14.5px] leading-tight ${current ? "font-bold" : "text-muted"}`}>{label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </aside>

      <div className="min-w-0 rounded-[24px] border border-line p-6 md:p-10">
        <DemoNotice className="mb-7">Demo registration experience — no account will be created.</DemoNotice>

        <div key={step} className="seq">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="eyebrow">Step {step + 1}</p>
              <h2 ref={headingRef} tabIndex={-1} className="t-section mt-2 !text-[clamp(1.625rem,1.4rem+1vw,2.25rem)] outline-none">
                {steps[step]}
              </h2>
            </div>
            <Image src={stepArt[step].src} alt="" width={120} height={120} className="hidden size-24 shrink-0 sm:block md:size-28" />
          </div>

          <div className="mt-7">
            {step === 0 ? (
              <div className="space-y-6">
                <div role="radiogroup" aria-label="Plan" className="grid gap-3 md:grid-cols-3">
                  {plans.map((plan) => {
                    const on = data.plan === plan.id;
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() => update("plan", plan.id)}
                        className={`cursor-pointer rounded-[24px] border-2 p-5 text-left transition-colors ${on ? "border-navy bg-cyan-soft" : "border-line hover:border-navy/30"}`}
                      >
                        <span className="block text-[13px] font-extrabold uppercase tracking-[0.12em]">{plan.name}</span>
                        <span className="mt-2 block text-[24px] font-bold tracking-tight tabular-nums">{formatUSD(data.billing === "annual" ? plan.annualMonthly : plan.monthly)}</span>
                        <span className="block text-[13px] text-muted">/ user / month</span>
                        <span className="mt-2 block text-[13.5px] font-medium leading-snug">{plan.tagline}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex flex-wrap items-end justify-between gap-5">
                  <div>
                    <p className="mb-1.5 text-[14.5px] font-semibold">Billing cycle</p>
                    <BillingToggle billing={data.billing} onChange={(billing) => update("billing", billing)} />
                  </div>
                  <div className="w-36">
                    <Field label="Number of users" name="users" error={errors.users}>
                      <input {...fieldProps("users")} type="number" min={1} inputMode="numeric" value={data.users} onChange={(e) => update("users", e.target.value)} />
                    </Field>
                  </div>
                </div>
              </div>
            ) : null}

            {step === 1 ? (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" name="name" error={errors.name}>
                  <input {...fieldProps("name")} autoComplete="name" value={data.name} onChange={(e) => update("name", e.target.value)} />
                </Field>
                <Field label="Work email" name="email" error={errors.email}>
                  <input {...fieldProps("email")} type="email" autoComplete="email" value={data.email} onChange={(e) => update("email", e.target.value)} />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Choose a demo password" name="password" error={errors.password}>
                    <input
                      {...fieldProps("password")}
                      type="password"
                      autoComplete="off"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                      }}
                    />
                  </Field>
                  <p className="mt-1.5 text-[13px] text-muted">Please don&apos;t use a real password. It isn&apos;t saved or sent anywhere.</p>
                </div>
              </div>
            ) : null}

            {step === 1 ? (
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Field label="Company name" name="company" error={errors.company}>
                  <input {...fieldProps("company")} autoComplete="organization" value={data.company} onChange={(e) => update("company", e.target.value)} />
                </Field>
                <Field label="Country" name="country" error={errors.country}>
                  <input {...fieldProps("country")} autoComplete="country-name" value={data.country} onChange={(e) => update("country", e.target.value)} />
                </Field>
                <Field label="Number of branches (optional)" name="branches">
                  <input {...fieldProps("branches")} type="number" min={0} inputMode="numeric" value={data.branches} onChange={(e) => update("branches", e.target.value)} />
                </Field>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Business type" name="businessType" error={errors.businessType}>
                  <select {...fieldProps("businessType")} value={data.businessType} onChange={(e) => update("businessType", e.target.value)}>
                    <option value="">Select an option</option>
                    {["FMCG Distribution", "Food & Beverage Distribution", "Wholesale Distribution", "Direct Store Delivery", "Other"].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Field team size" name="teamSize" error={errors.teamSize}>
                  <select {...fieldProps("teamSize")} value={data.teamSize} onChange={(e) => update("teamSize", e.target.value)}>
                    <option value="">Select an option</option>
                    {["1–10", "11–50", "51–200", "More than 200"].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </Field>
                <div className="sm:col-span-2">
                  <Field label="What would you most like to improve? (optional)" name="challenge">
                    <textarea {...fieldProps("challenge")} rows={3} value={data.challenge} onChange={(e) => update("challenge", e.target.value)} />
                  </Field>
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <fieldset className="mt-6" aria-describedby={errors.operations ? "operations-error" : undefined}>
                <legend className="mb-3 text-[15px] font-semibold">Which parts of your operation matter most?</legend>
                <div className="flex flex-wrap gap-2">
                  {operationOptions.map((option, index) => {
                    const on = data.operations.includes(option);
                    return (
                      <label key={option} className={`flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-[14px] font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-teal-deep ${on ? "border-navy bg-navy-deep text-white" : "border-line hover:border-navy/40"}`}>
                        <input
                          id={index === 0 ? "operations" : undefined}
                          type="checkbox"
                          className="sr-only"
                          checked={on}
                          onChange={() => update("operations", on ? data.operations.filter((item) => item !== option) : [...data.operations, option])}
                        />
                        {option}
                      </label>
                    );
                  })}
                </div>
                {errors.operations ? (
                  <p id="operations-error" className="mt-2 text-[13.5px] text-[#a42e25]">
                    {errors.operations}
                  </p>
                ) : null}
              </fieldset>
            ) : null}

            {step === 3 ? (
              <div>
                <dl className="divide-y divide-line rounded-[24px] border border-line">
                  {[
                    ["Plan", selected.name],
                    ["Billing", data.billing === "annual" ? "Annual" : "Monthly"],
                    ["Rate", `${formatUSD(rate)} / user / month`],
                    ["Users", String(userCount)],
                    [data.billing === "annual" ? "Annual total" : "Monthly total", formatUSD(data.billing === "annual" ? selected.annualTotal * userCount : selected.monthly * userCount)],
                    ["Company", data.company || "Not provided"],
                    ["Contact", data.email || "Not provided"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-5 px-5 py-3.5">
                      <dt className="text-[14.5px] text-muted">{label}</dt>
                      <dd className="text-right text-[15px] font-semibold tabular-nums">{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-[13.5px] leading-relaxed text-muted">No payment is requested or processed here.</p>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="mt-6">
                <div className="rounded-[24px] bg-paper p-6">
                  <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-amber-note">Preview only</p>
                  <h3 className="t-card mt-2">This is where activation would happen.</h3>
                  <p className="body mt-2">
                    No account was created, no email was sent and no payment was taken. In the live product, {data.company || "your company"} would continue with onboarding here.
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link href="/book-demo" className="inline-flex min-h-12 items-center justify-center rounded-full bg-navy-deep px-6 text-[15px] font-semibold text-white transition-colors hover:bg-navy-deep">
                    Book a Demo
                  </Link>
                  <Link href="/pricing" className="inline-flex min-h-12 items-center justify-center rounded-full border border-line px-6 text-[15px] font-semibold transition-colors hover:border-navy/40">
                    Back to Pricing
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-9 flex items-center justify-between gap-3 border-t border-line pt-6">
          {step > 0 ? (
            <button type="button" onClick={() => go(step - 1)} className="inline-flex min-h-12 cursor-pointer items-center rounded-full border border-line px-6 text-[15px] font-semibold transition-colors hover:border-navy/40">
              Back
            </button>
          ) : (
            <span />
          )}
          {step < steps.length - 1 ? (
            <button type="button" onClick={onNext} className="inline-flex min-h-12 cursor-pointer items-center rounded-full bg-navy-deep px-7 text-[15px] font-semibold text-white transition-[transform,background-color] duration-300 hover:-translate-y-px hover:bg-navy-deep">
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setData(blank);
                setPassword("");
                go(0);
              }}
              className="cursor-pointer text-[14.5px] font-semibold text-teal-deep underline-offset-4 hover:underline"
            >
              Start the demo again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { Info } from "lucide-react";
import { useId, useRef, useState, type FormEvent } from "react";
import { DemoNotice } from "@/components/global/Common";

export type FieldConfig = {
  name: string;
  label: string;
  type?: "text" | "email" | "textarea" | "select" | "checks";
  options?: string[];
  required?: boolean;
  autoComplete?: string;
  full?: boolean;
};

type Values = Record<string, string | string[]>;
type Errors = Record<string, string>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(fields: FieldConfig[], values: Values): Errors {
  const errors: Errors = {};
  for (const field of fields) {
    const value = values[field.name];
    const empty = Array.isArray(value) ? value.length === 0 : !value?.trim();
    if (field.required && empty) {
      errors[field.name] = field.type === "checks" ? "Please choose at least one option." : `Please enter your ${field.label.toLowerCase()}.`;
      if (field.type === "select") errors[field.name] = `Please select ${field.label.toLowerCase()}.`;
    } else if (field.type === "email" && !empty && !EMAIL.test(String(value))) {
      errors[field.name] = "Please enter a valid email address, like name@company.com.";
    }
  }
  return errors;
}

/** Shared form with frontend validation. Nothing here leaves the browser. */
export function DemoFormShell({
  fields,
  submitLabel,
  demoNotice,
  afterTitle,
  afterBody,
}: {
  fields: FieldConfig[];
  submitLabel: string;
  demoNotice: string;
  afterTitle: string;
  afterBody: string;
}) {
  const baseId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  const set = (name: string, value: string | string[]) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const next = validate(fields, values);
    setErrors(next);
    const first = fields.find((field) => next[field.name]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${first.name}"]`)?.focus();
      return;
    }
    setDone(true);
    requestAnimationFrame(() => resultRef.current?.focus());
  }

  if (done) {
    return (
      <div ref={resultRef} tabIndex={-1} className="rounded-[24px] border border-amber-line bg-amber-soft p-7 outline-none">
        <div className="flex items-center gap-2.5 text-amber-note">
          <Info aria-hidden="true" size={20} />
          <p className="text-[13px] font-bold uppercase tracking-[0.1em]">Demo mode</p>
        </div>
        <h3 className="t-card mt-3">{afterTitle}</h3>
        <p className="body mt-2 !text-navy/80">{afterBody}</p>
        <button
          type="button"
          onClick={() => {
            setDone(false);
            setValues({});
          }}
          className="mt-5 cursor-pointer text-[14.5px] font-semibold text-teal-deep underline-offset-4 hover:underline"
        >
          Try the form again
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <DemoNotice className="sm:col-span-2">{demoNotice}</DemoNotice>
      {fields.map((field) => {
        const id = `${baseId}-${field.name}`;
        const errorId = `${id}-error`;
        const error = errors[field.name];
        const describedBy = error ? errorId : undefined;
        const common = {
          id,
          "data-field": field.name,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": describedBy,
          "aria-required": field.required,
          className: "field",
        };
        const span = field.full || field.type === "textarea" || field.type === "checks" ? "sm:col-span-2" : "";

        if (field.type === "checks") {
          const selected = (values[field.name] as string[]) ?? [];
          return (
            <fieldset key={field.name} className={span} aria-describedby={describedBy}>
              <legend className="mb-2 text-[14.5px] font-semibold">
                {field.label} {field.required ? <span className="text-[#c0362c]">*</span> : null}
              </legend>
              <div className="flex flex-wrap gap-2">
                {field.options?.map((option, index) => {
                  const on = selected.includes(option);
                  return (
                    <label
                      key={option}
                      className={`flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-[14px] font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-teal-deep ${
                        on ? "border-navy bg-navy-deep text-white" : "border-line bg-white hover:border-navy/40"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        data-field={index === 0 ? field.name : undefined}
                        checked={on}
                        onChange={() => set(field.name, on ? selected.filter((item) => item !== option) : [...selected, option])}
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
              {error ? <p id={errorId} className="mt-1.5 text-[13.5px] text-[#a42e25]">{error}</p> : null}
            </fieldset>
          );
        }

        return (
          <div key={field.name} className={span}>
            <label htmlFor={id} className="mb-1.5 block text-[14.5px] font-semibold">
              {field.label} {field.required ? <span aria-hidden="true" className="text-[#c0362c]">*</span> : null}
            </label>
            {field.type === "textarea" ? (
              <textarea {...common} rows={4} value={(values[field.name] as string) ?? ""} onChange={(e) => set(field.name, e.target.value)} />
            ) : field.type === "select" ? (
              <select {...common} value={(values[field.name] as string) ?? ""} onChange={(e) => set(field.name, e.target.value)}>
                <option value="">Select an option</option>
                {field.options?.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input {...common} type={field.type ?? "text"} autoComplete={field.autoComplete} value={(values[field.name] as string) ?? ""} onChange={(e) => set(field.name, e.target.value)} />
            )}
            {error ? <p id={errorId} className="mt-1.5 text-[13.5px] text-[#a42e25]">{error}</p> : null}
          </div>
        );
      })}
      <div className="sm:col-span-2">
        <button type="submit" className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-full bg-navy-deep px-7 text-[15px] font-semibold text-white transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-px hover:bg-navy-deep hover:shadow-lift sm:w-auto">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

const person: FieldConfig[] = [
  { name: "name", label: "Full Name", required: true, autoComplete: "name" },
  { name: "email", label: "Work Email", type: "email", required: true, autoComplete: "email" },
  { name: "company", label: "Company", required: true, autoComplete: "organization" },
  { name: "country", label: "Country", required: true, autoComplete: "country-name" },
];

export function ContactForm() {
  return (
    <DemoFormShell
      fields={[
        ...person,
        { name: "inquiry", label: "Inquiry Type", type: "select", required: true, full: true, options: ["Product & Sales", "Integrations", "Partnerships", "Support"] },
        { name: "message", label: "Message", type: "textarea", required: true },
      ]}
      submitLabel="Send Inquiry"
      demoNotice="Demo mode: this form checks your entries, but nothing is sent to Vanforces."
      afterTitle="Your entries look good, but no inquiry was sent."
      afterBody="This is a frontend prototype, so nothing has left your browser and nobody will contact you from this form."
    />
  );
}

export function PartnerForm() {
  return (
    <DemoFormShell
      fields={[
        ...person,
        { name: "type", label: "Partner Type", type: "select", required: true, full: true, options: ["ERP & Technology Partner", "Implementation Partner", "Consulting Partner", "Distribution Specialist"] },
        { name: "message", label: "Message", type: "textarea", required: true },
      ]}
      submitLabel="Discuss a Partnership"
      demoNotice="Frontend demo only: nothing is submitted from this form."
      afterTitle="Your entries look good, but nothing was submitted."
      afterBody="This is a frontend prototype, so no partnership request has been created and nobody will contact you from this form."
    />
  );
}

export function DemoForm() {
  return (
    <DemoFormShell
      fields={[
        { name: "name", label: "Full Name", required: true, autoComplete: "name" },
        { name: "email", label: "Business Email", type: "email", required: true, autoComplete: "email" },
        { name: "company", label: "Company", required: true, autoComplete: "organization" },
        { name: "country", label: "Country", required: true, autoComplete: "country-name" },
        { name: "business", label: "Business Type", type: "select", required: true, full: true, options: ["FMCG Distribution", "Food & Beverage Distribution", "Wholesale Distribution", "Direct Store Delivery", "ERP or Technology Partner", "Other"] },
        { name: "interests", label: "Areas of Interest", type: "checks", required: true, options: ["Field Sales", "Van Sales", "Routes", "Inventory", "Delivery", "Collections", "Reporting", "ERP Integration"] },
        { name: "message", label: "Message", type: "textarea" },
      ]}
      submitLabel="Request a Demo"
      demoNotice="This is a frontend prototype. No demo will be booked and nothing is sent."
      afterTitle="Your entries look good, but no demo was requested."
      afterBody="This prototype doesn't send requests, so no booking exists and nobody will contact you from this form. On the live site, this is where a real request would be sent."
    />
  );
}

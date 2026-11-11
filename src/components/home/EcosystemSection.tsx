"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useId, useState, type KeyboardEvent } from "react";
import { SectionHeading } from "@/components/global/Common";
import { ScrollReveal } from "@/components/motion/Reveal";

type Partner = {
  name: string;
  mark: string;
  headline: string;
  body: string;
  points: string[];
  status: string;
  href: string;
  cta: string;
};

type Category = { id: string; label: string; intro: string; partners: Partner[] };

// Wording follows the product descriptions supplied by the Vanforces team. Capability lists name integration areas, not
// a confirmation that every feature is live, and the status chips are deliberately cautious.
const categories: Category[] = [
  {
    id: "erp",
    label: "ERP & Accounting",
    intro: "Connect supported business records with distribution workflows through configured data synchronization.",
    partners: [
      {
        name: "Odoo",
        mark: "O",
        headline: "Odoo Integration",
        body: "Connect supported Odoo business records with Vanforces distribution workflows through configured data synchronization.",
        points: ["Customers and products", "Units and packaging", "Sales orders and invoices", "Collection receipts", "Retry and duplicate handling"],
        status: "Configured per project",
        href: "/integrations/odoo",
        cta: "See Odoo integration",
      },
      {
        name: "Zoho Books",
        mark: "Z",
        headline: "Zoho Books Integration",
        body: "Connect supported customer, product, invoice and payment information between Vanforces and Zoho Books.",
        points: ["Customers and contacts", "Items and products", "Invoices", "Customer payments", "Sync monitoring and retries"],
        status: "Configured per project",
        href: "/integrations/zoho-books",
        cta: "See Zoho Books integration",
      },
    ],
  },
  {
    id: "communication",
    label: "Business Communication",
    intro: "Keep customer conversations organised alongside the distribution day.",
    partners: [
      {
        name: "Whatasol",
        mark: "W",
        headline: "Smarter Business Conversations",
        body: "Organize customer conversations, manage team communication and streamline WhatsApp engagement through shared inboxes, automation and campaigns.",
        points: ["Shared team inbox", "Message templates and campaigns", "Automated responses and workflows", "Communication analytics", "APIs and supported integrations"],
        status: "Related solution",
        href: "/contact",
        cta: "Ask about Whatasol",
      },
    ],
  },
  {
    id: "compliance",
    label: "E-Invoicing & Compliance",
    intro: "Regional invoicing requirements, handled through configured workflows.",
    partners: [
      {
        name: "ZATCA",
        mark: "Z",
        headline: "Saudi E-Invoicing Support",
        body: "Support applicable Saudi e-invoicing requirements through configured invoice processing, validation and integration workflows.",
        points: ["Electronic invoice processing", "Invoice validation", "XML and QR code handling", "Fatoora integration workflows", "Submission and error handling"],
        status: "Configured per project",
        href: "/contact",
        cta: "Ask about Saudi e-invoicing",
      },
    ],
  },
];

/**
 * Ecosystem. Odoo, Zoho Books, Whatasol and ZATCA in one compact tabbed panel instead of four sections. Each card keeps its
 * wording cautious: integration areas, a plain status chip and one link. Partner marks are neutral lettermarks until logo
 * permissions are confirmed.
 */
export function EcosystemSection() {
  const [active, setActive] = useState(0);
  const id = useId();
  const current = categories[active];

  function onKeyDown(event: KeyboardEvent) {
    let next: number | null = null;
    if (event.key === "ArrowRight") next = (active + 1) % categories.length;
    if (event.key === "ArrowLeft") next = (active - 1 + categories.length) % categories.length;
    if (next !== null) {
      event.preventDefault();
      setActive(next);
      document.getElementById(`${id}-tab-${categories[next].id}`)?.focus();
    }
  }

  return (
    <section className="px-3 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-[1320px] rounded-[32px] bg-mist px-5 py-16 sm:px-10 md:rounded-[40px] md:py-24 lg:px-14">
        <SectionHeading
          variant="fine"
          align="center"
          eyebrow="Work with what you already have"
          title="Your ERP. Your Field Teams."
          titleMuted="One Connected Operation."
          description="Connect your existing business systems with daily field sales, inventory, delivery and collection activities through Vanforces."
        />

        <ScrollReveal delay={100} className="mx-auto mt-12 max-w-[1120px] md:mt-16">
          <div role="tablist" aria-label="Connected systems" onKeyDown={onKeyDown} className="mx-auto flex w-full max-w-[640px] flex-wrap justify-center gap-1.5 rounded-[22px] bg-white p-1.5 shadow-[0_1px_2px_rgb(41_59_71/0.06)] sm:flex-nowrap sm:rounded-full">
            {categories.map((category, index) => {
              const selected = index === active;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  id={`${id}-tab-${category.id}`}
                  aria-selected={selected}
                  aria-controls={`${id}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  className={`min-h-11 flex-1 cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-[14px] font-semibold transition-colors duration-300 ${selected ? "bg-navy-deep text-white" : "text-muted hover:text-navy-deep"}`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${current.id}`} className="mt-8">
            <p className="mx-auto max-w-[36rem] text-center text-[1.0625rem] leading-relaxed text-muted">{current.intro}</p>
            <ul className={`mt-8 grid gap-4 ${current.partners.length > 1 ? "md:grid-cols-2" : "mx-auto max-w-[620px]"}`}>
              {current.partners.map((partner) => (
                <li key={partner.name} className="flex flex-col rounded-[24px] bg-white p-6 shadow-[0_1px_2px_rgb(41_59_71/0.05)] md:p-8">
                  <div className="flex items-center justify-between gap-3">
                    <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-2xl bg-cyan-soft text-[18px] font-semibold text-teal-deep">
                      {partner.mark}
                    </span>
                    <span className="rounded-full border border-cyan-line bg-cyan-soft px-3 py-1 text-[12px] font-semibold text-teal-deep">{partner.status}</span>
                  </div>
                  <h3 className="mt-5 text-[1.375rem] font-medium leading-tight tracking-[-0.03em] text-navy-deep">{partner.headline}</h3>
                  <p className="mt-2.5 text-pretty text-[15.5px] leading-relaxed text-muted">{partner.body}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {partner.points.map((point) => (
                      <li key={point} className="rounded-full bg-mist px-3 py-1 text-[13px] text-navy">
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link href={partner.href} className="group mt-6 inline-flex items-center gap-1.5 self-start text-[15px] font-semibold text-teal-deep hover:text-navy">
                    {partner.cta}
                    <ArrowRight aria-hidden="true" size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mx-auto mt-8 max-w-[44rem] text-center text-[13px] leading-relaxed text-muted">
              Integration areas shown here describe what can be configured, not a promise that every feature is available in every setup. Scope depends on the connector and the implementation.{" "}
              <Link href="/integrations" className="font-semibold text-teal-deep underline-offset-2 hover:underline">
                Explore all integrations
              </Link>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

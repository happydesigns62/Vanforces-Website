import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/global/Common";
import type { CSSProperties } from "react";
import { ScrollReveal } from "@/components/motion/Reveal";

type Partner = {
  name: string;
  logo: string;
  width: number;
  height: number;
  headline: string;
  body: string;
  points: string[];
  status: string;
  href: string;
  cta: string;
};

// Wording follows the product descriptions supplied by the Vanforces team. Capability lists name integration areas, not a
// confirmation that every feature is live, and the status chips are deliberately cautious. The logos are the files supplied
// by the Vanforces team, trimmed and resized for the web.
const odoo: Partner = {
  name: "Odoo",
  logo: "/brand/partners/odoo.png",
  width: 623,
  height: 199,
  headline: "Odoo Integration",
  body: "Connect supported Odoo business records with Vanforces distribution workflows through configured data synchronization.",
  points: ["Customers and products", "Units and packaging", "Sales orders and invoices", "Collection receipts", "Retry and duplicate handling"],
  status: "Configured per project",
  href: "/integrations/odoo",
  cta: "See Odoo integration",
};

const zoho: Partner = {
  name: "Zoho Books",
  logo: "/brand/partners/zoho.png",
  width: 640,
  height: 276,
  headline: "Zoho Books Integration",
  body: "Connect supported customer, product, invoice and payment information between Vanforces and Zoho Books.",
  points: ["Customers and contacts", "Items and products", "Invoices", "Customer payments", "Sync monitoring and retries"],
  status: "Configured per project",
  href: "/integrations/zoho-books",
  cta: "See Zoho Books integration",
};

const whatasol: Partner = {
  name: "Whatasol",
  logo: "/brand/partners/whatasol.png",
  width: 640,
  height: 130,
  headline: "Smarter Business Conversations",
  body: "Organize customer conversations, manage team communication and streamline WhatsApp engagement through shared inboxes, automation and campaigns.",
  points: ["Shared team inbox", "Message templates and campaigns", "Automated responses and workflows", "Communication analytics", "APIs and supported integrations"],
  status: "Related solution",
  href: "/contact",
  cta: "Ask about Whatasol",
};

const zatca: Partner = {
  name: "Al Mawasil",
  logo: "/brand/partners/al-mawasil.png",
  width: 640,
  height: 85,
  headline: "Saudi E-Invoicing Support",
  body: "Support applicable Saudi e-invoicing requirements through configured invoice processing, validation and integration workflows.",
  points: ["Electronic invoice processing", "Invoice validation", "XML and QR code handling", "Fatoora integration workflows", "Submission and error handling"],
  status: "Configured per project",
  href: "/contact",
  cta: "Ask about Saudi e-invoicing",
};

function Status({ label }: { label: string }) {
  return <span className="rounded-full border border-cyan-line bg-white px-3 py-1 text-[12px] font-semibold text-teal-deep">{label}</span>;
}

function Points({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {items.map((point) => (
        <li key={point} className="rounded-full border border-line bg-white px-3 py-1 text-[13px] text-navy">
          {point}
        </li>
      ))}
    </ul>
  );
}

function CardLink({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href} className="group mt-6 inline-flex items-center gap-1.5 self-start text-[15px] font-semibold text-teal-deep hover:text-navy">
      {children}
      <ArrowRight aria-hidden="true" size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
    </Link>
  );
}

const reveal = (ms: number) => ({ "data-reveal": "", suppressHydrationWarning: true, style: { "--d": `${ms}ms` } as CSSProperties });

function PartnerCard({ partner, logoClass, className = "", delay }: { partner: Partner; logoClass: string; className?: string; delay?: number }) {
  return (
    <article {...(delay === undefined ? {} : reveal(delay))} className={`flex flex-col rounded-[28px] bg-mist p-6 md:p-8 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-14 items-center">
          <Image src={partner.logo} alt={partner.name} width={partner.width} height={partner.height} sizes="200px" className={`w-auto ${logoClass}`} />
        </div>
        <Status label={partner.status} />
      </div>
      <h3 className="mt-6 text-[1.375rem] font-medium leading-tight tracking-[-0.03em] text-navy-deep">{partner.headline}</h3>
      <p className="mt-2.5 text-pretty text-[15.5px] leading-relaxed text-muted">{partner.body}</p>
      <Points items={partner.points} />
      <CardLink href={partner.href}>{partner.cta}</CardLink>
    </article>
  );
}

/**
 * Ecosystem. Odoo, Zoho Books, Whatasol and ZATCA (with Al Mawasil) as one bento of cards, each led by its real logo, with
 * cautious wording, a plain status chip and one link. A last card points to all integrations.
 */
export function EcosystemSection() {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHeading
          variant="fine"
          align="center"
          eyebrow="Work with what you already have"
          title="Your ERP. Your Field Teams."
          titleMuted="One Connected Operation."
          description="Connect your existing business systems with daily field sales, inventory, delivery and collection activities through Vanforces."
        />

        <div className="mt-14 grid gap-4 md:mt-16 lg:grid-cols-3">
          <div {...reveal(0)} className="rounded-[32px] bg-cyan-soft p-4 sm:p-5 lg:col-span-2">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-2 pb-4 pt-2 sm:px-3">
              <h3 className="text-[1.0625rem] font-semibold text-navy-deep">ERP &amp; Accounting</h3>
              <p className="text-[14px] text-muted">Supported business records, kept in step through configured data synchronization.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <PartnerCard partner={odoo} logoClass="h-9" className="bg-white" />
              <PartnerCard partner={zoho} logoClass="h-12" className="bg-white" />
            </div>
          </div>

          <PartnerCard partner={whatasol} logoClass="h-9" delay={90} />

          <article {...reveal(120)} className="flex flex-col rounded-[28px] bg-mist p-6 md:p-8 lg:col-span-2">
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-14 items-center gap-4">
                <span className="rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold tracking-[0.04em] text-navy-deep">ZATCA</span>
                <Image src={zatca.logo} alt={zatca.name} width={zatca.width} height={zatca.height} sizes="220px" className="h-7 w-auto" />
              </div>
              <Status label={zatca.status} />
            </div>
            <h3 className="mt-6 text-[1.375rem] font-medium leading-tight tracking-[-0.03em] text-navy-deep">{zatca.headline}</h3>
            <p className="mt-2.5 max-w-[40rem] text-pretty text-[15.5px] leading-relaxed text-muted">{zatca.body}</p>
            <Points items={zatca.points} />
            <CardLink href={zatca.href}>{zatca.cta}</CardLink>
          </article>

          <article {...reveal(180)} className="flex flex-col justify-between rounded-[28px] bg-cyan-soft p-6 md:p-8">
            <div>
              <Image src="/brand/vanforces-mark.svg" alt="Vanforces" width={60} height={56} className="h-10 w-auto" />
              <h3 className="mt-5 text-[1.375rem] font-medium leading-tight tracking-[-0.03em] text-navy-deep">Data That Moves Both Ways.</h3>
              <p className="mt-2.5 text-[15.5px] leading-relaxed text-muted">Customers · Products · Pricing · Orders · Sales · Collections</p>
            </div>
            <CardLink href="/integrations">Explore all integrations</CardLink>
          </article>
        </div>

        <ScrollReveal delay={120}>
          <p className="mx-auto mt-8 max-w-[46rem] text-center text-[13px] leading-relaxed text-muted">
            Integration areas shown here describe what can be configured, not a promise that every feature is available in every setup. Scope depends on the connector and the implementation. Product names and logos belong to their owners and are shown only to name the systems Vanforces can work alongside.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

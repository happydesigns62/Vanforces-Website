import type { Metadata } from "next";
import Image from "next/image";
import { CTASection, PageHero } from "@/components/global/Common";
import { CompareTable } from "@/components/home/CompareTable";
import { StatusBadge } from "@/components/home/StatusBadge";
import { checkedOn, focusCards, groups, platforms, rows, sources, vanforcesConfirmed, type Status } from "@/data/comparison";

export const metadata: Metadata = {
  title: "Platform Comparison",
  description: "A neutral, feature-by-feature comparison of Vanforces, Mirnah RoutePro, SalesBuzz and BeatRoute, based on each vendor's published pages.",
  // Kept out of search engines until the Vanforces team has confirmed its column.
  robots: vanforcesConfirmed ? undefined : { index: false, follow: false },
};

const statuses: Status[] = ["Available", "Limited / Configured", "In Development", "Not Available", "Not Verified"];
const groupTitles = Object.fromEntries(groups.map((g, i) => [g.id, `${String.fromCharCode(65 + i)}. ${g.title}`]));

export default function ComparePage() {
  return (
    <>
      <PageHero
        eyebrow="Platform Comparison"
        title="Four Platforms. One Clear Comparison."
        description="A plain comparison of what each platform says it supports. It is not written to favor any product."
        crumbs={[{ label: "Compare" }]}
        layout="plain"
      />

      <section className="section-tight">
        <div className="wrap max-w-[1180px]">
          {!vanforcesConfirmed ? (
            <div role="note" className="mb-8 rounded-2xl border border-accent-amber-deep/30 bg-accent-amber-soft px-5 py-4 text-[14.5px] leading-relaxed text-navy-deep">
              <strong>Draft.</strong> The Vanforces column is awaiting confirmation by the Vanforces product team and may change before this page is published.
            </div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {platforms.map((p) => (
              <article key={p.id} className={`rounded-2xl border p-5 ${p.id === "vanforces" ? "border-cyan-line bg-cyan-soft" : "border-line bg-white"}`}>
                <Image src={p.logo} alt={p.name} width={p.width} height={p.height} className="h-7 w-auto max-w-[130px] object-contain object-left" />
                <p className="mt-3 text-[14px] font-semibold text-navy-deep">{p.name}</p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{p.blurb}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-[28px] bg-cyan-soft p-6 md:p-8">
            <h2 className="text-[1.25rem] font-semibold text-navy-deep">How to read this</h2>
            <p className="mt-2 max-w-[46rem] text-[15px] leading-relaxed text-muted">
              Competitor information comes from each vendor&apos;s own public pages, reviewed on {checkedOn}. &ldquo;Not Verified&rdquo; means we could not confirm a feature, which is different from the feature not existing.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {statuses.map((status) => (
                <li key={status}>
                  <StatusBadge status={status} />
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <CompareTable rows={rows} showNotes groupTitles={groupTitles} />
            <p className="mt-3 text-[13px] text-muted sm:hidden">Swipe the table sideways to see every platform.</p>
          </div>

          <h2 className="mt-14 text-[1.5rem] font-semibold tracking-[-0.02em] text-navy-deep">Different Platforms. Different Operational Strengths.</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {focusCards.map((c) => (
              <div key={c.id} className="rounded-2xl border border-line bg-white p-5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-teal-deep">{c.name}</p>
                <p className="mt-2 text-[15.5px] font-semibold text-navy-deep">{c.focus}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-12 text-[1.25rem] font-semibold text-navy-deep">Sources</h2>
          <ul className="mt-3 space-y-1.5 text-[14.5px]">
            {sources.map((source) => (
              <li key={source.href}>
                <a href={source.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-deep underline-offset-2 hover:underline">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[13px] leading-relaxed text-muted">
            Vendor pages describe vendor claims and were not independently tested. Product names and logos belong to their owners and are used here only to identify the products being compared. This page is informational and may not reflect recent changes by any vendor.
          </p>
        </div>
      </section>

      <CTASection
        title="See how Vanforces fits your operation."
        description="Tell us how your team works today, and we'll walk through what applies to you."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "Explore Integrations", href: "/integrations" }}
      />
    </>
  );
}

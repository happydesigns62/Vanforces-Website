import type { Metadata } from "next";
import { CTASection, PageHero } from "@/components/global/Common";
import { StatusBadge } from "@/components/home/StatusBadge";
import { checkedOn, rows, sources, summarize, vanforcesConfirmed, type Status } from "@/data/comparison";

export const metadata: Metadata = {
  title: "Vanforces and BeatRoute Compared",
  description: "A neutral, feature-by-feature comparison of Vanforces and BeatRoute, based on each product's published pages.",
  // Kept out of search engines until the Vanforces team has confirmed its column.
  robots: vanforcesConfirmed ? undefined : { index: false, follow: false },
};

const statuses: Status[] = ["Available", "Limited / Configured", "In Development", "Not Available", "Not Verified"];

function Group({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgb(41_59_71/0.05)]">
      <h3 className="text-[15px] font-semibold text-navy-deep">{title}</h3>
      <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{items.length ? items.join(" · ") : "None in the pages reviewed."}</p>
    </div>
  );
}

export default function ComparePage() {
  const groups = summarize();
  return (
    <>
      <PageHero
        eyebrow="Compare"
        title="Vanforces and BeatRoute, Feature by Feature."
        description="A plain comparison of what each platform says it supports. It is not written to favor either product."
        crumbs={[{ label: "Compare" }]}
        layout="plain"
      />

      <section className="section-tight">
        <div className="wrap max-w-[1040px]">
          {!vanforcesConfirmed ? (
            <div role="note" className="mb-8 rounded-2xl border border-accent-amber-deep/30 bg-accent-amber-soft px-5 py-4 text-[14.5px] leading-relaxed text-navy-deep">
              <strong>Draft.</strong> The Vanforces column is awaiting confirmation by the Vanforces product team and may change before this page is published.
            </div>
          ) : null}

          <div className="rounded-[24px] bg-cyan-soft p-6 md:p-8">
            <h2 className="text-[1.25rem] font-semibold text-navy-deep">How to read this</h2>
            <p className="mt-2 max-w-[44rem] text-[15px] leading-relaxed text-muted">
              BeatRoute information comes from its own public pages, checked on {checkedOn}. &ldquo;Not Verified&rdquo; means we could not confirm a feature, which is different from the feature not existing.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {statuses.map((status) => (
                <li key={status}>
                  <StatusBadge status={status} />
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 overflow-hidden rounded-[24px] border border-line bg-white">
            <div className="hidden grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1.3fr)] gap-5 border-b border-line bg-mist px-6 py-3 text-[13px] font-semibold text-navy-deep md:grid">
              <span>Feature area</span>
              <span>Vanforces</span>
              <span>BeatRoute</span>
            </div>
            <ul className="divide-y divide-line">
              {rows.map((row) => (
                <li key={row.area} className="grid gap-3 px-5 py-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1.3fr)] md:gap-5 md:px-6">
                  <h3 className="text-[15.5px] font-semibold text-navy-deep">{row.area}</h3>
                  <div>
                    <p className="mb-1 text-[12px] font-semibold text-muted md:hidden">Vanforces</p>
                    <StatusBadge status={row.vanforces} />
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{row.vanforcesNote}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-[12px] font-semibold text-muted md:hidden">BeatRoute</p>
                    <StatusBadge status={row.beatroute} />
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{row.beatrouteNote}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <h2 className="mt-12 text-[1.25rem] font-semibold text-navy-deep">What the comparison shows</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Group title="Both products list as available" items={groups.both} />
            <Group title="Only Vanforces, if confirmed" items={groups.onlyVanforces} />
            <Group title="Only BeatRoute lists as available" items={groups.onlyBeatRoute} />
            <Group title="Limited or configuration-dependent" items={groups.limited} />
            <Group title="Not verified for either product" items={groups.unverified} />
          </div>
          <p className="mt-4 text-[13.5px] leading-relaxed text-muted">
            BeatRoute lists several AI agents of its own, so AI is a comparison row here and not a Vanforces advantage. Entaura, which provides Vanforces&apos; AI assistance, is a separate platform that is not included in every Vanforces subscription.
          </p>

          <h2 className="mt-12 text-[1.25rem] font-semibold text-navy-deep">BeatRoute sources</h2>
          <ul className="mt-3 space-y-1.5 text-[14.5px]">
            {sources.map((source) => (
              <li key={source.href}>
                <a href={source.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-deep underline-offset-2 hover:underline">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[13px] text-muted">Vendor pages describe vendor claims. They were not independently tested.</p>
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

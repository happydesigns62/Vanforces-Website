import type { Metadata } from "next";
import { Button } from "@/components/global/Button";
import { CTASection, PageHero } from "@/components/global/Common";
import { Mascot } from "@/components/global/Mascot";
import { useCases } from "@/data/modules";
import { Vignette, type VignetteKind } from "@/components/illustration/Vignettes";

const caseScenes: Record<string, VignetteKind> = {
  "field-sales-execution": "sell",
  "direct-store-delivery": "deliver",
  "customer-route-visits": "map",
  "order-to-cash": "collect",
  "warehouse-stock-control": "stock",
  "offline-field-work": "plan",
  "executive-visibility": "analyse",
};

export const metadata: Metadata = {
  title: "Use Cases",
  description: "Start with the work you need to improve: field sales, route visits, direct store delivery, order-to-cash, stock control, offline work and executive visibility.",
};

export default function UseCasesPage() {
  return (
    <>
      <PageHero
        eyebrow="Use Cases"
        title="Start With the Work You Need to Improve."
        description="Most teams don't begin by asking for a module. They begin with a daily problem. Find the situation closest to yours and see where Vanforces connects."
        crumbs={[{ label: "Platform", href: "/platform" }, { label: "Use Cases" }]}
        layout="split"
        visual={<Mascot name="business" priority sizes="(max-width: 1024px) 70vw, 420px" className="mx-auto w-full max-w-[400px]" />}
      />
      <section className="pb-16 md:pb-24">
        <div className="wrap">
          <ol className="border-t border-navy/80">
            {useCases.map((useCase, index) => (
              <li
                key={useCase.id}
                id={useCase.id}
                data-reveal="" suppressHydrationWarning
                className="grid scroll-mt-24 gap-5 border-b border-line py-9 md:grid-cols-[64px_minmax(0,4fr)_minmax(0,6fr)] md:gap-8 md:py-12"
              >
                <span aria-hidden="true" className="text-[14px] font-bold tabular-nums text-teal-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="t-section !text-[clamp(1.5rem,1.3rem+0.8vw,2.125rem)]">{useCase.title}</h2>
                  <Vignette kind={caseScenes[useCase.id] ?? "plan"} className="mt-4 h-[84px] w-[122px] rounded-2xl bg-band-cyan" />
                  <Button href={useCase.link.href} variant="text" className="mt-3">
                    {useCase.link.label}
                  </Button>
                </div>
                <dl className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] bg-paper p-5">
                    <dt className="text-[13px] font-bold">The situation</dt>
                    <dd className="body mt-1.5 !text-[15px]">{useCase.situation}</dd>
                  </div>
                  <div className="rounded-[24px] bg-band-cyan p-5">
                    <dt className="text-[13px] font-bold text-teal-deep">How Vanforces connects</dt>
                    <dd className="body mt-1.5 !text-[15px]">{useCase.approach}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CTASection
        title="Recognize your situation?"
        description="Tell us what your day looks like, and we'll focus the demonstration on what matters to you."
        primary={{ label: "Book a Demo", href: "/book-demo" }}
        secondary={{ label: "Explore All Modules", href: "/platform/modules" }}
      />
    </>
  );
}

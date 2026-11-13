import { Button } from "@/components/global/Button";
import { SectionHeading } from "@/components/global/Common";
import { ScrollReveal } from "@/components/motion/Reveal";
import { previewAreas, rows } from "@/data/comparison";
import { CompareTable } from "./CompareTable";

/** A short, neutral four-platform preview: six rows, the same status words as the full page, and a link to it. */
export function ComparePreview() {
  const shown = rows.filter((row) => previewAreas.includes(row.area));
  return (
    <section className="section">
      <div className="wrap">
        <div className="rounded-[36px] bg-cyan-soft/50 p-6 sm:p-10 lg:p-14">
          <SectionHeading
            variant="fine"
            eyebrow="Compare Platforms"
            title="See How"
            titleMuted="Vanforces Compares."
            description="Vanforces, Mirnah RoutePro, SalesBuzz and BeatRoute, side by side. Where something can't be confirmed, it says so."
          />
          <ScrollReveal delay={100} className="mt-8">
            <CompareTable rows={shown} />
          </ScrollReveal>
          <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="max-w-[40rem] text-[13.5px] leading-relaxed text-muted">
              &ldquo;Not Verified&rdquo; means we could not confirm it from public pages, not that it is missing. The Vanforces column is awaiting final confirmation by the product team.
            </p>
            <Button href="/compare" arrow>
              View Full Comparison
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

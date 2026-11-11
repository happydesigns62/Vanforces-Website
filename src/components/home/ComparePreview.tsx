import { Button } from "@/components/global/Button";
import { SectionHeading } from "@/components/global/Common";
import { previewAreas, rows } from "@/data/comparison";
import { StatusBadge } from "./StatusBadge";

/**
 * A short, neutral Vanforces and BeatRoute preview. Six rows, the same status words as the full page, and a link to it.
 * BeatRoute already offers several AI and distribution features, so this section does not claim an advantage.
 */
export function ComparePreview() {
  const shown = rows.filter((row) => previewAreas.includes(row.area));
  return (
    <section className="section">
      <div className="wrap">
        <SectionHeading
          variant="fine"
          align="center"
          eyebrow="Compare with confidence"
          title="Vanforces and BeatRoute,"
          titleMuted="Side by Side."
          description="A plain feature comparison based on each product's own published pages. Where something can't be confirmed, it says so."
        />
        <div className="mx-auto mt-12 max-w-[860px] overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_1px_2px_rgb(41_59_71/0.05)]">
          <div className="hidden grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] gap-4 border-b border-line bg-mist px-6 py-3 text-[13px] font-semibold text-navy-deep sm:grid">
            <span>Feature area</span>
            <span>Vanforces</span>
            <span>BeatRoute</span>
          </div>
          <ul className="divide-y divide-line">
            {shown.map((row) => (
              <li key={row.area} className="grid gap-2 px-5 py-4 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] sm:items-center sm:gap-4 sm:px-6">
                <span className="text-[15px] font-semibold text-navy-deep">{row.area}</span>
                <span className="flex items-center gap-2 sm:block">
                  <span className="text-[12px] font-semibold text-muted sm:hidden">Vanforces</span>
                  <StatusBadge status={row.vanforces} />
                </span>
                <span className="flex items-center gap-2 sm:block">
                  <span className="text-[12px] font-semibold text-muted sm:hidden">BeatRoute</span>
                  <StatusBadge status={row.beatroute} />
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mx-auto mt-6 flex max-w-[860px] flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="max-w-[34rem] text-[13px] leading-relaxed text-muted">
            &ldquo;Not Verified&rdquo; means we could not confirm it, not that it is missing. The Vanforces column is awaiting final confirmation by the product team.
          </p>
          <Button href="/compare" variant="secondary" arrow>
            See the full comparison
          </Button>
        </div>
      </div>
    </section>
  );
}

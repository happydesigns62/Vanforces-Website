import Image from "next/image";
import { Sparkles, Receipt, Truck, Users, Wallet, Workflow, type LucideIcon } from "lucide-react";
import { Button } from "@/components/global/Button";
import { SectionHeading } from "@/components/global/Common";
import { ScrollReveal } from "@/components/motion/Reveal";
import { previewAreas, rows } from "@/data/comparison";
import { StatusBadge } from "./StatusBadge";

const icons: Record<string, LucideIcon> = {
  "Field Sales": Users,
  "Van Sales": Truck,
  Collections: Wallet,
  "AI Assistants": Sparkles,
  "ERP Integrations": Workflow,
  "Saudi E-Invoicing": Receipt,
};

/**
 * A short, neutral Vanforces and BeatRoute preview. Six rows, the same status words as the full page, and a link to it.
 * BeatRoute already offers several AI and distribution features, so this section does not claim an advantage.
 */
export function ComparePreview() {
  const shown = rows.filter((row) => previewAreas.includes(row.area));
  return (
    <section className="section">
      <div className="wrap">
        <div className="grid items-center gap-10 rounded-[36px] bg-cyan-soft p-6 sm:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 lg:p-14">
          <div>
            <SectionHeading
              variant="fine"
              eyebrow="Compare with confidence"
              title="Vanforces and BeatRoute,"
              titleMuted="Side by Side."
              description="A plain feature comparison based on each product's own published pages. Where something can't be confirmed, it says so."
            />
            <p className="mt-6 text-[13.5px] leading-relaxed text-muted">
              &ldquo;Not Verified&rdquo; means we could not confirm it, not that it is missing. The Vanforces column is awaiting final confirmation by the product team.
            </p>
            <ScrollReveal delay={120} className="mt-7">
              <Button href="/compare" arrow>
                See the full comparison
              </Button>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={100}>
            <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_1px_2px_rgb(41_59_71/0.05),0_30px_60px_-36px_rgb(8_60_66/0.35)]">
              <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)] items-center gap-3 border-b border-line px-4 py-4 sm:px-6">
                <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">Feature area</span>
                <span className="flex items-center gap-2 text-[14px] font-semibold text-navy-deep">
                  <Image src="/brand/vanforces-mark.svg" alt="" width={60} height={56} className="h-5 w-auto" />
                  Vanforces
                </span>
                <span className="text-[14px] font-semibold text-navy-deep">BeatRoute</span>
              </div>
              <ul className="divide-y divide-line">
                {shown.map((row) => {
                  const Icon = icons[row.area] ?? Workflow;
                  return (
                    <li key={row.area} className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)] items-center gap-3 px-4 py-3.5 sm:px-6">
                      <span className="flex items-center gap-3 text-[14.5px] font-semibold text-navy-deep">
                        <span aria-hidden="true" className="hidden size-9 shrink-0 items-center justify-center rounded-xl bg-cyan-soft text-teal-deep sm:flex">
                          <Icon size={17} strokeWidth={1.9} />
                        </span>
                        {row.area}
                      </span>
                      <span>
                        <StatusBadge status={row.vanforces} />
                      </span>
                      <span>
                        <StatusBadge status={row.beatroute} />
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

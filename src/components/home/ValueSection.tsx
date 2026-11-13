import { Check, Minus } from "lucide-react";
import { Button } from "@/components/global/Button";
import { SectionHeading } from "@/components/global/Common";
import { ScrollReveal } from "@/components/motion/Reveal";

// Plain descriptions of everyday tasks. No figures anywhere, because there are no confirmed figures yet.
const tasks = [
  { task: "Planning the day", without: "Routes shared by phone and message.", with: "Routes and visits planned in one place." },
  { task: "Taking orders", without: "Notes on paper, typed in later.", with: "Orders captured on the phone, during the visit." },
  { task: "Checking stock", without: "Calling the warehouse to ask.", with: "Warehouse and van stock visible to the team." },
  { task: "Collecting payments", without: "Cash and cheques tracked in notebooks.", with: "Collections recorded against each invoice." },
  { task: "Reporting", without: "Reports pieced together at the end of the week.", with: "Reports drawn from the same connected data." },
];

/**
 * Business Value, shown as one working day told two ways. The same five tasks appear twice: how they often go without a
 * connected system, and how they go with Vanforces. It reads in seconds, uses no invented figures, and leads to the ROI estimate.
 */
export function ValueSection() {
  return (
    <section className="section">
      <div className="wrap max-w-[1040px]">
        <SectionHeading
          variant="fine"
          align="center"
          eyebrow="Make every workday count"
          title="The Same Workday,"
          titleMuted="Made Simpler."
          description="Five everyday tasks, and how they change when your team, stock and collections are connected."
        />

        <ScrollReveal delay={100} className="mt-12">
          <div className="hidden grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1fr)] gap-4 px-5 pb-3 text-[12px] font-semibold uppercase tracking-[0.12em] md:grid">
            <span className="text-muted">The task</span>
            <span className="text-muted">Without a connected system</span>
            <span className="text-teal-deep">With Vanforces</span>
          </div>
          <ul className="space-y-3">
            {tasks.map((t) => (
              <li key={t.task} className="grid gap-3 rounded-2xl border border-line bg-white p-4 shadow-[0_1px_2px_rgb(41_59_71/0.04)] md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1fr)] md:items-center md:gap-4 md:px-5">
                <p className="text-[16px] font-semibold text-navy-deep">{t.task}</p>
                <p className="flex items-start gap-2.5 text-[14.5px] leading-snug text-muted">
                  <span aria-hidden="true" className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-mist text-navy/60">
                    <Minus size={12} strokeWidth={3} />
                  </span>
                  <span>
                    <span className="mb-0.5 block text-[11.5px] font-semibold uppercase tracking-[0.1em] md:hidden">Without</span>
                    {t.without}
                  </span>
                </p>
                <p className="flex items-start gap-2.5 rounded-xl bg-cyan-soft/70 px-3 py-2.5 text-[14.5px] font-medium leading-snug text-navy-deep">
                  <span aria-hidden="true" className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-teal text-navy-deep">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span>
                    <span className="mb-0.5 block text-[11.5px] font-semibold uppercase tracking-[0.1em] text-teal-deep md:hidden">With Vanforces</span>
                    {t.with}
                  </span>
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/roi" arrow>
              Estimate Your Potential ROI
            </Button>
            <Button href="#plans" variant="secondary">
              Explore Pricing
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

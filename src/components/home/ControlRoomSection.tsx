import { Button } from "@/components/global/Button";
import { ScrollReveal } from "@/components/motion/Reveal";
import { ControlRoomScreen, SAMPLE_NOTE, type ScreenKey } from "./ControlRoomScreens";

export const monitors: { key: Exclude<ScreenKey, "launcher">; title: string; copy: string }[] = [
  { key: "executive", title: "Executive Overview", copy: "Sales, collections, credits, customer additions and revenue trends in one management view." },
  { key: "liveOps", title: "Live Operations", copy: "Regularly refreshed sales, collection, order and delivery snapshots with route status and recent activity." },
  { key: "attendance", title: "Attendance & Movement", copy: "Work-status records, salesman location logs and route maps in a field-supervision view." },
  { key: "orderDelivery", title: "Order & Delivery Control", copy: "Pending orders, order-status distribution, delivery-run information and reporting panels." },
];

/**
 * Control Room Monitoring, shown as a hub: the launcher on top, with the four monitoring screens it opens beneath it. Every
 * screen is redrawn with synthetic sample data and labelled so. No real customer screen is published. Copy follows the
 * Control Room brief and avoids unproven claims: screens are "regularly refreshed", never instant, and there are no tracking,
 * optimisation, prediction or alert-rule promises.
 */
export function ControlRoomSection() {
  return (
    <section className="section bg-mist">
      <div className="wrap">
        <div className="mx-auto max-w-[46rem] text-center">
          <ScrollReveal>
            <p className="eyebrow justify-center">Control Room Monitoring</p>
          </ScrollReveal>
          <h2 className="mt-5 text-balance text-[clamp(1.875rem,1.5rem+1.4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.04em] text-navy-deep">
            Your Business Operations, <span className="text-ink-soft">Together on One Command Screen.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[38rem] text-pretty text-[1rem] leading-[1.7] text-muted">
            Bring sales, collections, field activity, attendance, orders and deliveries into focused monitoring screens, so management and operations teams share one view of the day.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/book-demo" arrow className="!min-h-[46px] !px-6 !text-[14.5px]">
              Book a Control Room Demo
            </Button>
            <Button href="/control-room" variant="secondary" className="!min-h-[46px] !px-6 !text-[14.5px]">
              Explore the Monitoring Screens
            </Button>
          </div>
        </div>

        <ScrollReveal delay={100} className="mt-12">
          <div className="mx-auto max-w-[760px]">
            <p className="mb-3 text-center text-[12.5px] font-semibold uppercase tracking-[0.12em] text-teal-deep">One launch point</p>
            <ControlRoomScreen kind="launcher" />
          </div>
          <div aria-hidden="true" className="mx-auto h-8 w-px border-l-2 border-dashed border-cyan-line" />
          <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0">
            {monitors.map((m) => (
              <li key={m.key} className="w-[86%] shrink-0 snap-center sm:w-auto">
                <ControlRoomScreen kind={m.key} />
                <h3 className="mt-3 text-[16px] font-semibold text-navy-deep">{m.title}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-muted">{m.copy}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-[12.5px] leading-relaxed text-navy/65">{SAMPLE_NOTE} Screens refresh at set intervals. Available widgets depend on your account and configuration.</p>
        </ScrollReveal>
      </div>
    </section>
  );
}

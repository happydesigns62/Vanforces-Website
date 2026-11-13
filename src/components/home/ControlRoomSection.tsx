import Link from "next/link";
import type { CSSProperties } from "react";
import { Button } from "@/components/global/Button";
import { ScrollReveal } from "@/components/motion/Reveal";
import { ControlRoomScreen, SAMPLE_NOTE, type ScreenKey } from "./ControlRoomScreens";

type Spot = { key: Exclude<ScreenKey, "launcher">; title: string; refresh: string; place: string; tilt: number };

// Four monitors in the corners, each overlapping the launcher a little. The side screens turn slightly toward the middle.
const spots: Spot[] = [
  { key: "executive", title: "Executive Overview", refresh: "120s", place: "left-0 top-0", tilt: 5 },
  { key: "liveOps", title: "Live Operations", refresh: "30s", place: "right-0 top-0", tilt: -5 },
  { key: "attendance", title: "Attendance & Movement", refresh: "60s", place: "left-0 bottom-0", tilt: 5 },
  { key: "orderDelivery", title: "Order & Delivery Control", refresh: "45s", place: "right-0 bottom-0", tilt: -5 },
];

const tilt = (deg: number) => ({ "--tilt": `${deg}deg` }) as CSSProperties;

function Label({ title, refresh, right }: { title: string; refresh: string; right?: boolean }) {
  return (
    <span className={`pointer-events-none absolute -bottom-2.5 z-10 ${right ? "right-3" : "left-3"} inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-1 text-[11px] font-semibold text-navy-deep shadow-[0_6px_14px_-8px_rgb(8_60_66/0.5)]`}>
      <span aria-hidden="true" className="size-1.5 rounded-full bg-teal" />
      {title}
      <span className="font-medium text-muted">· {refresh}</span>
    </span>
  );
}

/**
 * Control Room Monitoring as one compact monitoring wall: the launcher in the middle, the four monitoring screens around it, all
 * layered with soft shadows and a slight turn toward the centre. Every screen is redrawn as page elements with synthetic sample data
 * (no real customer screen is published) so it stays sharp at any size, and is labelled as sample data. Wording avoids unproven claims:
 * screens are "regularly refreshed", never instant. On narrow screens the launcher leads and the four screens sit in a 2 by 2 grid.
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
          {/* Wide screens: the connected wall. */}
          <div className="relative mx-auto hidden max-w-[980px] pb-4 [perspective:1600px] md:block">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-[8%] inset-y-[6%] rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_50%,rgb(28_178_187/0.16),transparent_72%)]" />
            <div className="relative aspect-[980/520]">
              {spots.map((s) => (
                <Link
                  key={s.key}
                  href="/control-room"
                  aria-label={`${s.title}, sample screen`}
                  style={tilt(s.tilt)}
                  className={`cr-wall-screen absolute w-[39%] ${s.place}`}
                >
                  <ControlRoomScreen kind={s.key} className="!rounded-lg" />
                  <Label title={s.title} refresh={s.refresh} right={s.place.startsWith("right")} />
                </Link>
              ))}
              <div className="absolute left-1/2 top-1/2 z-20 w-[44%] -translate-x-1/2 -translate-y-1/2">
                <ControlRoomScreen kind="launcher" className="!rounded-xl shadow-[0_40px_70px_-30px_rgb(8_60_66/0.55),0_8px_20px_-8px_rgb(8_60_66/0.2)]" />
                <span className="pointer-events-none absolute -bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-navy-deep px-3 py-1 text-[11px] font-semibold text-white shadow">Control Room Launcher</span>
              </div>
            </div>
          </div>

          {/* Narrow screens: launcher first, then the four screens in a grid. */}
          <div className="mx-auto max-w-[520px] md:hidden">
            <ControlRoomScreen kind="launcher" />
            <p className="mt-2 text-center text-[12px] font-semibold text-navy-deep">Control Room Launcher</p>
            <div aria-hidden="true" className="mx-auto h-5 w-px border-l-2 border-dashed border-cyan-line" />
            <ul className="grid grid-cols-2 gap-x-3 gap-y-5">
              {spots.map((s) => (
                <li key={s.key}>
                  <Link href="/control-room" aria-label={`${s.title}, sample screen`}>
                    <ControlRoomScreen kind={s.key} className="!rounded-md" />
                    <span className="mt-1.5 block text-[12px] font-semibold leading-tight text-navy-deep">{s.title}</span>
                    <span className="text-[11px] text-muted">Refreshes every {s.refresh}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 text-center text-[13.5px] font-medium text-navy-deep">One central Control Room. Multiple monitoring views.</p>
          <p className="mt-2 text-center text-[12.5px] leading-relaxed text-navy/65">{SAMPLE_NOTE} Screens refresh at set intervals. Available widgets depend on your account and configuration.</p>
        </ScrollReveal>
      </div>
    </section>
  );
}

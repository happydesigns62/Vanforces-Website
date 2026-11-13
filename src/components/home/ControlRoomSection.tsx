"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Button } from "@/components/global/Button";
import { ScrollReveal } from "@/components/motion/Reveal";
import { ControlRoomScreen, SAMPLE_NOTE, type ScreenKey } from "./ControlRoomScreens";

type MonitorKey = Exclude<ScreenKey, "launcher">;
type Spot = { key: MonitorKey; title: string; refresh: string; place: string; tilt: number; crop: number };

// Four monitors in the corners, each overlapping the launcher a little. The side screens turn slightly toward the middle.
// Each shows the top part of its screen so the panels read larger; clicking one opens the whole screen.
const spots: Spot[] = [
  { key: "executive", title: "Executive Overview", refresh: "120s", place: "left-0 top-0", tilt: 4, crop: 560 },
  { key: "liveOps", title: "Live Operations", refresh: "30s", place: "right-0 top-0", tilt: -4, crop: 560 },
  { key: "attendance", title: "Attendance & Movement", refresh: "60s", place: "left-0 bottom-0", tilt: 4, crop: 560 },
  { key: "orderDelivery", title: "Order & Delivery Control", refresh: "45s", place: "right-0 bottom-0", tilt: -4, crop: 560 },
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

/** One screen opened large, in the browser's own modal dialog, so every panel can be read. */
function Viewer({ open, onClose }: { open: ScreenKey | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
      aria-label="Control Room screen, full size"
      className="m-auto w-[min(1180px,94vw)] max-w-none rounded-2xl border-0 bg-transparent p-0 backdrop:bg-navy-deep/70 backdrop:backdrop-blur-sm"
    >
      {open ? (
        <div className="relative">
          <button type="button" onClick={onClose} aria-label="Close" className="absolute -top-11 right-0 flex size-9 cursor-pointer items-center justify-center rounded-full bg-white text-navy-deep shadow">
            <X size={18} />
          </button>
          <ControlRoomScreen kind={open} className="!rounded-xl" />
          <p className="mt-3 text-center text-[12.5px] text-white/85">{SAMPLE_NOTE}</p>
        </div>
      ) : null}
    </dialog>
  );
}

/**
 * Control Room Monitoring as one compact monitoring wall: the launcher in the middle, the four monitoring screens around it, layered
 * with soft shadows and a slight turn toward the centre. Every screen is redrawn as page elements to match the real product screens,
 * with synthetic sample data (no real customer screen is published), and labelled so. Clicking a screen opens it at full size. Wording
 * avoids unproven claims: screens are "regularly refreshed", never instant. On narrow screens the launcher leads and the four
 * screens sit in a 2 by 2 grid.
 */
export function ControlRoomSection() {
  const [open, setOpen] = useState<ScreenKey | null>(null);

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
          <div className="relative mx-auto hidden max-w-[1180px] pb-4 [perspective:1800px] md:block">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-[6%] inset-y-[6%] rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_50%,rgb(28_178_187/0.16),transparent_72%)]" />
            <div className="relative aspect-[1180/490]">
              {spots.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setOpen(s.key)}
                  aria-label={`Open ${s.title} sample screen full size`}
                  style={tilt(s.tilt)}
                  className={`cr-wall-screen absolute w-[41%] cursor-zoom-in text-left ${s.place}`}
                >
                  <ControlRoomScreen kind={s.key} crop={s.crop} className="!rounded-lg" />
                  <Label title={s.title} refresh={s.refresh} right={s.place.startsWith("right")} />
                </button>
              ))}
              <button
                type="button"
                onClick={() => setOpen("launcher")}
                aria-label="Open Control Room Launcher sample screen full size"
                className="absolute left-1/2 top-1/2 z-20 w-[42%] -translate-x-1/2 -translate-y-1/2 cursor-zoom-in text-left"
              >
                <ControlRoomScreen kind="launcher" className="!rounded-xl shadow-[0_40px_70px_-30px_rgb(8_60_66/0.55),0_8px_20px_-8px_rgb(8_60_66/0.2)]" />
                <span className="pointer-events-none absolute -bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-navy-deep px-3 py-1 text-[11px] font-semibold text-white shadow">Control Room Launcher</span>
              </button>
            </div>
          </div>

          {/* Narrow screens: launcher first, then the four screens in a grid. */}
          <div className="mx-auto max-w-[520px] md:hidden">
            <button type="button" onClick={() => setOpen("launcher")} className="block w-full cursor-zoom-in text-left" aria-label="Open Control Room Launcher sample screen full size">
              <ControlRoomScreen kind="launcher" />
            </button>
            <p className="mt-2 text-center text-[12px] font-semibold text-navy-deep">Control Room Launcher</p>
            <div aria-hidden="true" className="mx-auto h-5 w-px border-l-2 border-dashed border-cyan-line" />
            <ul className="grid grid-cols-2 gap-x-3 gap-y-5">
              {spots.map((s) => (
                <li key={s.key}>
                  <button type="button" onClick={() => setOpen(s.key)} className="block w-full cursor-zoom-in text-left" aria-label={`Open ${s.title} sample screen full size`}>
                    <ControlRoomScreen kind={s.key} crop={s.crop} className="!rounded-md" />
                    <span className="mt-1.5 block text-[12px] font-semibold leading-tight text-navy-deep">{s.title}</span>
                    <span className="text-[11px] text-muted">Refreshes every {s.refresh}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 text-center text-[13.5px] font-medium text-navy-deep">One central Control Room. Multiple monitoring views. Tap any screen to see it full size.</p>
          <p className="mt-2 text-center text-[12.5px] leading-relaxed text-navy/65">{SAMPLE_NOTE} Screens refresh at set intervals. Available widgets depend on your account and configuration.</p>
        </ScrollReveal>
      </div>
      <Viewer open={open} onClose={() => setOpen(null)} />
    </section>
  );
}

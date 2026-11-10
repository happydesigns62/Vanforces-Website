"use client";

import { useEffect, useRef, useState } from "react";

// SAMPLE FIGURES. These numbers are placeholders for the design only. They are not verified and must be replaced with
// confirmed figures (or the card removed) before the site goes live. The card says so in plain words.
const stats = [
  { value: 120, suffix: "+", label: "Routes planned for the day, every day" },
  { value: 45, suffix: "k+", label: "Orders recorded at the customer's door" },
  { value: 98, suffix: "%", label: "Deliveries confirmed at handover" },
  { value: 2.5, suffix: "M+", label: "In collections recorded and reconciled", decimals: 1 },
];

function Count({ value, suffix, decimals = 0, run }: { value: number; suffix: string; decimals?: number; run: boolean }) {
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const start = performance.now();
    const length = 1400;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / length);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(value * eased); // first frame is t=0, so it starts from zero
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, value]);

  return (
    <span className="tabular-nums">
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/**
 * A band of four large numbers on the Vanforces teal gradient, with a faint ring on the right. The numbers count up once
 * when the band scrolls into view. The figures are samples and are labelled as such.
 */
export function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="px-3 py-4 md:px-6 md:py-6">
      <div ref={ref} className="stats-band relative mx-auto max-w-[1320px] overflow-hidden rounded-[32px] px-6 py-8 text-white md:rounded-[32px] md:px-12 md:py-10 lg:px-16">
        <span aria-hidden="true" className="capsule -right-20 -top-10 h-36 w-[520px] border-[26px] border-white/[0.08]" />
        <span aria-hidden="true" className="capsule -bottom-16 right-28 h-36 w-[520px] border-[26px] border-white/[0.05]" />
        <dl className="relative mx-auto grid max-w-[1120px] grid-cols-2 gap-x-6 gap-y-7 lg:grid-cols-4 lg:gap-0">
          {stats.map((stat, index) => (
            <div key={stat.label} className={`lg:px-8 ${index > 0 ? "lg:border-l lg:border-dashed lg:border-white/30" : "lg:pl-0"}`}>
              <dt className="text-[clamp(1.875rem,1.5rem+1.7vw,2.75rem)] font-medium leading-none tracking-[-0.045em]">
                <Count value={stat.value} suffix={stat.suffix} decimals={stat.decimals} run={run} />
              </dt>
              <dd className="mt-2.5 max-w-[14rem] text-pretty text-[13.5px] leading-snug text-white/85">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

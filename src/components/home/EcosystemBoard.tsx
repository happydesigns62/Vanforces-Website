"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCalm } from "@/components/motion/useCalm";

type Partner = {
  name: string;
  src: string;
  width: number;
  height: number;
  kind: string;
  text: string;
  href?: string;
  side: "l" | "r";
  row: 0 | 1 | 2;
};

// The systems Vanforces works alongside. Captions say only what is confirmed: scope depends on the connector and the project.
const partners: Partner[] = [
  { name: "Odoo", src: "/brand/partners/odoo.png", width: 623, height: 199, kind: "ERP", text: "Integration with Odoo. Scope is agreed for each project.", href: "/integrations/odoo", side: "l", row: 0 },
  { name: "Zoho Books", src: "/brand/partners/zoho.png", width: 640, height: 276, kind: "Accounting", text: "Integration with Zoho Books. Scope is agreed for each project.", href: "/integrations/zoho-books", side: "l", row: 1 },
  { name: "Taskforces ERP", src: "/brand/partners/taskforces.png", width: 640, height: 97, kind: "ERP", text: "A system Vanforces can work alongside. Scope depends on the implementation.", side: "l", row: 2 },
  { name: "Whatasol", src: "/brand/partners/whatasol.png", width: 640, height: 130, kind: "Messaging", text: "A related WhatsApp messaging solution. Direct synchronisation is not confirmed.", side: "r", row: 0 },
  { name: "Al Mawasil", src: "/brand/partners/al-mawasil.png", width: 640, height: 85, kind: "E-invoicing", text: "Used for ZATCA e-invoicing in Saudi Arabia. Supported phase to be confirmed.", side: "r", row: 1 },
  { name: "Entaura.ai", src: "/brand/entaura-logo.svg", width: 545, height: 122, kind: "Intelligence", text: "A separate AI platform for insight and monitoring. It is not included in every plan.", side: "r", row: 2 },
];

// Geometry, in a 960 by 520 box.
const W = 960;
const H = 520;
const ROW_Y = [100, 260, 420];
const TILE = [124, 124, 124];
const COL_X = { l: 132, r: 828 };
const BUS = { l: 292, r: 668 };
const HUB = { cx: 480, cy: 260 };
/** Where the lines end, a little short of the Vanforces mark. */
const hexEdge = { l: HUB.cx - 66, r: HUB.cx + 66 };

/** A right-angle connector from a tile to the Vanforces mark, with small rounded corners. */
function pathFor(p: Partner) {
  const y = ROW_Y[p.row];
  const left = p.side === "l";
  const start = COL_X[p.side] + (left ? 1 : -1) * (TILE[p.row] / 2);
  const bus = BUS[p.side];
  const end = left ? hexEdge.l : hexEdge.r;
  const dir = left ? 1 : -1;
  if (p.row === 1) return `M${start} ${y} H${end}`;
  const down = p.row === 0 ? 1 : -1;
  return `M${start} ${y} H${bus - dir * 8} Q${bus} ${y} ${bus} ${y + down * 8} V${ROW_Y[1] - down * 8} Q${bus} ${ROW_Y[1]} ${bus + dir * 8} ${ROW_Y[1]} H${end}`;
}

const DOT_TIME = 1.7;
const GAP = 0.75;

function Caption({ p }: { p: Partner }) {
  return (
    <div className="mx-auto flex min-h-[104px] max-w-[640px] items-center gap-5 rounded-[24px] border border-line bg-white p-4 pr-6 shadow-[0_24px_50px_-34px_rgb(8_60_66/0.45)] sm:p-5">
      <span className="flex h-[68px] w-[120px] shrink-0 items-center justify-center rounded-2xl bg-mist px-3 sm:w-[140px]">
        <Image src={p.src} alt="" width={p.width} height={p.height} sizes="140px" className="h-auto max-h-9 w-auto max-w-full" />
      </span>
      <div key={p.name} className="cr-swap min-w-0">
        <p className="flex flex-wrap items-center gap-2 text-[15.5px] font-semibold text-navy-deep">
          {p.name}
          <span className="rounded-full bg-cyan-soft px-2.5 py-0.5 text-[11px] font-semibold text-teal-deep">{p.kind}</span>
        </p>
        <p className="mt-1 text-[13.5px] leading-snug text-muted">{p.text}</p>
        {p.href ? (
          <Link href={p.href} className="group mt-1.5 inline-flex items-center gap-1 text-[13px] font-semibold text-teal-deep hover:text-navy">
            Learn more
            <ArrowRight aria-hidden="true" size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Connected systems as a clean board: three system tiles each side, all the same size, joined by dashed right-angle
 * lines to the Vanforces mark in the middle. A small teal dot runs along each line in turn, into the mark and then back out on
 * the next round, and a soft ring glows round the mark as each one arrives. Hovering or focusing a tile highlights its line and shows
 * what is confirmed. Reduced motion keeps the dots resting. On narrow screens the tiles are a grid with the same caption beneath.
 */
export function EcosystemBoard() {
  const calm = useCalm();
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const paths = useRef<(SVGPathElement | null)[]>([]);
  const dots = useRef<(SVGGElement | null)[]>([]);
  const glow = useRef<SVGCircleElement | null>(null);
  const visible = useRef(false);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const lengths = paths.current.map((p) => p?.getTotalLength() ?? 0);
    const put = (i: number, k: number, on: boolean) => {
      const g = dots.current[i];
      const path = paths.current[i];
      if (!g || !path) return;
      const pt = path.getPointAtLength(lengths[i] * k);
      g.setAttribute("transform", `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
      g.style.opacity = on ? String(Math.min(1, Math.sin(Math.PI * k) * 2.2)) : "0";
    };
    if (calm) {
      partners.forEach((_, i) => put(i, 0.5, true));
      return;
    }
    let raf = 0;
    let start = 0;
    let pulse = 0;
    const lastK = partners.map(() => 0);
    const cycle = partners.length * GAP + 0.6;
    const loop = (now: number) => {
      if (!start) start = now;
      if (visible.current) {
        const t = (now - start) / 1000;
        partners.forEach((_, i) => {
          const local = (((t - i * GAP) % cycle) + cycle) % cycle;
          const round = Math.floor((t - i * GAP) / cycle);
          if (local > DOT_TIME || t < i * GAP) {
            put(i, 0, false);
            lastK[i] = 0;
            return;
          }
          const raw = local / DOT_TIME;
          const k = round % 2 === 0 ? raw : 1 - raw;
          put(i, k, true);
          const reached = round % 2 === 0 ? raw > 0.96 && lastK[i] <= 0.96 : raw < 0.04 && lastK[i] >= 0.04;
          if (reached) pulse = 1;
          lastK[i] = raw;
        });
        pulse *= 0.93;
        if (glow.current) glow.current.style.opacity = String(Math.min(1, pulse));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [calm]);

  return (
    <div>
      {/* Wide screens: the board. */}
      <div ref={stage} className="relative mx-auto hidden w-full max-w-[960px] lg:block" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} fill="none" aria-hidden="true" className="absolute inset-0 h-full w-full">
          <defs>
            <radialGradient id="board-glow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#1cb2bb" stopOpacity="0.2" />
              <stop offset="1" stopColor="#1cb2bb" stopOpacity="0" />
            </radialGradient>
            <filter id="hex-blur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>
          <circle cx={HUB.cx} cy={HUB.cy} r="190" fill="url(#board-glow)" />

          {/* connectors */}
          {partners.map((p, i) => (
            <path
              key={p.name}
              ref={(el) => void (paths.current[i] = el)}
              d={pathFor(p)}
              stroke={active === i ? "#1cb2bb" : "#c4ccd2"}
              strokeWidth={active === i ? 1.8 : 1.4}
              strokeDasharray={active === i ? undefined : "5 5"}
              strokeLinecap="round"
              className="transition-[stroke] duration-300"
            />
          ))}
          {/* dark corner ticks, like the reference */}
          {partners
            .filter((p) => p.row !== 1)
            .map((p) => {
              const left = p.side === "l";
              const dir = left ? 1 : -1;
              const y = ROW_Y[p.row];
              const down = p.row === 0 ? 1 : -1;
              const bus = BUS[p.side];
              return <path key={`t-${p.name}`} d={`M${bus - dir * 8} ${y} Q${bus} ${y} ${bus} ${y + down * 8}`} stroke="#1b2a38" strokeWidth="1.7" strokeLinecap="round" />;
            })}
          {[0, 1].map((s) => {
            const x = s === 0 ? BUS.l : BUS.r;
            const dir = s === 0 ? 1 : -1;
            return (
              <g key={s} stroke="#1b2a38" strokeWidth="1.7" strokeLinecap="round" fill="none">
                <path d={`M${x} ${ROW_Y[1] - 8} Q${x} ${ROW_Y[1]} ${x + dir * 8} ${ROW_Y[1]}`} />
                <path d={`M${x} ${ROW_Y[1] + 8} Q${x} ${ROW_Y[1]} ${x + dir * 8} ${ROW_Y[1]}`} />
              </g>
            );
          })}

          {/* a soft ring that glows each time a dot arrives */}
          <circle ref={glow} cx={HUB.cx} cy={HUB.cy} r="58" stroke="#1cb2bb" strokeWidth="5" filter="url(#hex-blur)" style={{ opacity: 0 }} />

          {/* travelling dots */}
          {partners.map((_, i) => (
            <g key={i} ref={(el) => void (dots.current[i] = el)} style={{ opacity: 0 }}>
              <circle r="11" fill="#1cb2bb" opacity="0.16" />
              <circle r="6.5" fill="#1cb2bb" opacity="0.28" />
              <circle r="3.6" fill="#1cb2bb" />
            </g>
          ))}
        </svg>

        {partners.map((p, i) => {
          const size = TILE[p.row];
          return (
            <button
              key={p.name}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-label={`${p.name}, ${p.kind}`}
              aria-pressed={active === i}
              className={`absolute flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-[22px] border bg-white transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-[calc(50%+3px)] ${
                active === i ? "border-teal shadow-[0_0_0_4px_rgb(28_178_187/0.12),0_20px_34px_-20px_rgb(8_60_66/0.45)]" : "border-line shadow-[0_1px_2px_rgb(41_59_71/0.06),0_18px_30px_-20px_rgb(41_59_71/0.35)]"
              }`}
              style={{ left: `${(COL_X[p.side] / W) * 100}%`, top: `${(ROW_Y[p.row] / H) * 100}%`, width: `${(size / W) * 100}%`, aspectRatio: "1 / 1" }}
            >
              <Image src={p.src} alt="" width={p.width} height={p.height} sizes="120px" className="h-auto max-h-[40%] w-[80%] object-contain" />
            </button>
          );
        })}

        <div className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center" style={{ left: `${(HUB.cx / W) * 100}%`, top: `${(HUB.cy / H) * 100}%` }}>
          <Image src="/brand/vanforces-mark.svg" alt="Vanforces" width={60} height={56} className="h-[72px] w-auto drop-shadow-[0_14px_20px_rgb(8_60_66/0.25)]" />
        </div>
      </div>

      {/* Narrow screens: the mark and a grid of the systems. Tapping one shows its caption. */}
      <div className="mx-auto flex max-w-xl flex-col items-center lg:hidden">
        <div className="relative my-2 flex items-center justify-center">
          <span aria-hidden="true" className="absolute size-[170px] rounded-full bg-[radial-gradient(closest-side,rgb(28_178_187/0.22),transparent)]" />
          <Image src="/brand/vanforces-mark.svg" alt="Vanforces" width={60} height={56} className="relative h-14 w-auto drop-shadow-[0_12px_18px_rgb(8_60_66/0.25)]" />
        </div>
        <span aria-hidden="true" className="my-3 block h-8 border-l-2 border-dashed border-cyan-line" />
        <div className="grid w-full grid-cols-2 gap-3">
          {partners.map((p, i) => (
            <button
              key={p.name}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={`flex h-[72px] cursor-pointer items-center justify-center rounded-[20px] border bg-white px-4 shadow-[0_1px_2px_rgb(41_59_71/0.05)] transition-colors ${active === i ? "border-teal" : "border-line"}`}
            >
              <Image src={p.src} alt={p.name} width={p.width} height={p.height} sizes="140px" className="h-auto max-h-9 w-[64%] object-contain" />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8" aria-live="polite">
        <Caption p={partners[active]} />
      </div>
    </div>
  );
}
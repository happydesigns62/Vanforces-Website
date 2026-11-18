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
  /** Width of the logo inside its tile, so wide and tall logos look equally heavy. */
  fit: string;
  kind: string;
  text: string;
  href?: string;
  side: "l" | "r";
  row: 0 | 1 | 2;
};

// The systems Vanforces works alongside. Captions say only what is confirmed: scope depends on the connector and the project.
const partners: Partner[] = [
  { name: "Odoo", src: "/brand/partners/odoo.png", width: 623, height: 199, fit: "68%", kind: "ERP", text: "Integration with Odoo. Scope is agreed for each project.", href: "/integrations/odoo", side: "l", row: 0 },
  { name: "Zoho Books", src: "/brand/partners/zoho.png", width: 640, height: 276, fit: "76%", kind: "Accounting", text: "Integration with Zoho Books. Scope is agreed for each project.", href: "/integrations/zoho-books", side: "l", row: 1 },
  { name: "Taskforces ERP", src: "/brand/partners/taskforces.png", width: 640, height: 97, fit: "84%", kind: "ERP", text: "A system Vanforces can work alongside. Scope depends on the implementation.", side: "l", row: 2 },
  { name: "Whatasol", src: "/brand/partners/whatasol.png", width: 640, height: 130, fit: "82%", kind: "Messaging", text: "A related WhatsApp messaging solution. Direct synchronisation is not confirmed.", side: "r", row: 0 },
  { name: "Al Mawasil", src: "/brand/partners/al-mawasil.png", width: 640, height: 85, fit: "86%", kind: "E-invoicing", text: "Used for ZATCA e-invoicing in Saudi Arabia. Supported phase to be confirmed.", side: "r", row: 1 },
  { name: "Entaura.ai", src: "/brand/entaura-logo.svg", width: 545, height: 122, fit: "80%", kind: "Intelligence", text: "A separate AI platform for insight and monitoring. It is not included in every plan.", side: "r", row: 2 },
];

// Geometry, in a 960 by 520 box.
const W = 960;
const H = 520;
const ROW_Y = [100, 260, 420];
const TILE = [132, 112, 132];
const COL_X = { l: 132, r: 828 };
const BUS = { l: 292, r: 668 };
const HEX = { cx: 480, cy: 260, r: 84 };
const hexPoints = Array.from({ length: 6 }, (_, i) => {
  const a = (-90 + i * 60) * (Math.PI / 180);
  return `${(HEX.cx + HEX.r * Math.cos(a)).toFixed(1)},${(HEX.cy + HEX.r * Math.sin(a)).toFixed(1)}`;
}).join(" ");
const hexEdge = { l: HEX.cx - HEX.r * Math.cos(Math.PI / 6), r: HEX.cx + HEX.r * Math.cos(Math.PI / 6) };

/** A right-angle connector from a tile to the hexagon, with small rounded corners. */
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
 * Connected systems as a blueprint board. A white panel with a faint grid: three system tiles each side, joined by dashed right-angle
 * lines to a hexagon holding the Vanforces mark. A small teal dot runs along each line in turn, into the hexagon and then back out on
 * the next round, and the hexagon's edge glows softly as each one arrives. Hovering or focusing a tile highlights its line and shows
 * what is confirmed. Reduced motion keeps the dots resting. On narrow screens the tiles are a grid with the same caption beneath.
 */
export function EcosystemBoard() {
  const calm = useCalm();
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const paths = useRef<(SVGPathElement | null)[]>([]);
  const dots = useRef<(SVGGElement | null)[]>([]);
  const glow = useRef<SVGPolygonElement | null>(null);
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
      <div ref={stage} className="relative mx-auto hidden w-full max-w-[960px] overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_40px_80px_-50px_rgb(8_60_66/0.4),0_1px_2px_rgb(41_59_71/0.05)] lg:block" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} fill="none" aria-hidden="true" className="absolute inset-0 h-full w-full">
          <defs>
            <radialGradient id="board-fade" cx="0.5" cy="0.5" r="0.62">
              <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
              <stop offset="1" stopColor="#fff" stopOpacity="1" />
            </radialGradient>
            <radialGradient id="board-glow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#1cb2bb" stopOpacity="0.2" />
              <stop offset="1" stopColor="#1cb2bb" stopOpacity="0" />
            </radialGradient>
            <filter id="hex-blur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>
          {/* faint blueprint grid */}
          {[40, 132, 292, 480, 668, 828, 920].map((x) => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2={H} stroke="#eef1f3" strokeWidth="1" />
          ))}
          {[40, 100, 180, 260, 340, 420, 480].map((y) => (
            <line key={`h${y}`} x1="0" y1={y} x2={W} y2={y} stroke="#eef1f3" strokeWidth="1" />
          ))}
          <rect width={W} height={H} fill="url(#board-fade)" />
          <circle cx={HEX.cx} cy={HEX.cy} r="170" fill="url(#board-glow)" />

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

          {/* hexagon */}
          <polygon ref={glow} points={hexPoints} stroke="#1cb2bb" strokeWidth="5" strokeLinejoin="round" filter="url(#hex-blur)" style={{ opacity: 0 }} />
          <polygon points={hexPoints} fill="#fff" stroke="#aeb9c2" strokeWidth="2" strokeLinejoin="round" />

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
              <Image src={p.src} alt="" width={p.width} height={p.height} sizes="120px" className="h-auto" style={{ width: p.fit }} />
            </button>
          );
        })}

        <div className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center" style={{ left: `${(HEX.cx / W) * 100}%`, top: `${(HEX.cy / H) * 100}%` }}>
          <Image src="/brand/vanforces-mark.svg" alt="Vanforces" width={60} height={56} className="h-[56px] w-auto" />
        </div>
      </div>

      {/* Narrow screens: the mark and a grid of the systems. Tapping one shows its caption. */}
      <div className="mx-auto flex max-w-xl flex-col items-center lg:hidden">
        <div className="relative my-2 flex size-[104px] items-center justify-center rounded-[30px] border border-line bg-white shadow-[0_26px_40px_-24px_rgb(28_178_187/0.5)]">
          <Image src="/brand/vanforces-mark.svg" alt="Vanforces" width={60} height={56} className="h-11 w-auto" />
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
              <Image src={p.src} alt={p.name} width={p.width} height={p.height} sizes="140px" className="h-auto" style={{ width: p.fit }} />
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
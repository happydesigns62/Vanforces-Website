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
  logo: string;
  kind: string;
  text: string;
  href?: string;
  ring: 0 | 1;
  angle: number;
};

// The systems Vanforces works alongside, on two rings: ERP and accounting on the inner ring, messaging, e-invoicing and intelligence on
// the outer. Captions say only what is confirmed: scope depends on the connector and the project.
const partners: Partner[] = [
  { name: "Odoo", src: "/brand/partners/odoo.png", width: 623, height: 199, logo: "h-7", kind: "ERP", text: "Integration with Odoo. Scope is agreed for each project.", href: "/integrations/odoo", ring: 0, angle: 210 },
  { name: "Zoho Books", src: "/brand/partners/zoho.png", width: 640, height: 276, logo: "h-9", kind: "Accounting", text: "Integration with Zoho Books. Scope is agreed for each project.", href: "/integrations/zoho-books", ring: 0, angle: 330 },
  { name: "Taskforces ERP", src: "/brand/partners/taskforces.png", width: 640, height: 97, logo: "h-6", kind: "ERP", text: "A system Vanforces can work alongside. Scope depends on the implementation.", ring: 0, angle: 90 },
  { name: "Whatasol", src: "/brand/partners/whatasol.png", width: 640, height: 130, logo: "h-6", kind: "Messaging", text: "A related WhatsApp messaging solution. Direct synchronisation is not confirmed.", ring: 1, angle: 170 },
  { name: "Al Mawasil", src: "/brand/partners/al-mawasil.png", width: 640, height: 85, logo: "h-6", kind: "E-invoicing", text: "Used for ZATCA e-invoicing in Saudi Arabia. Supported phase to be confirmed.", ring: 1, angle: 290 },
  { name: "Entaura.ai", src: "/brand/entaura-logo.svg", width: 545, height: 122, logo: "h-6", kind: "Intelligence", text: "A separate AI platform for insight and monitoring. It is not included in every plan.", ring: 1, angle: 50 },
];

const W = 1120;
const H = 520;
const C = { x: W / 2, y: H / 2 };
const RINGS = [
  { rx: 250, ry: 128, speed: 0.04 },
  { rx: 445, ry: 212, speed: -0.027 },
];
const PERIOD = 3.4;

const place = (p: Partner, t: number) => {
  const r = RINGS[p.ring];
  const a = (p.angle * Math.PI) / 180 + r.speed * t;
  return { x: C.x + r.rx * Math.cos(a), y: C.y + r.ry * Math.sin(a), depth: (Math.sin(a) + 1) / 2 };
};

function Caption({ p }: { p: Partner }) {
  return (
    <div className="mx-auto flex min-h-[104px] max-w-[640px] items-center gap-5 rounded-[24px] border border-line bg-white/90 p-4 pr-6 shadow-[0_24px_50px_-34px_rgb(8_60_66/0.45)] backdrop-blur sm:p-5">
      <span className="flex h-[68px] w-[120px] shrink-0 items-center justify-center rounded-2xl bg-mist px-3 sm:w-[140px]">
        <Image src={p.src} alt="" width={p.width} height={p.height} sizes="140px" className={`${p.logo} w-auto max-w-full`} />
      </span>
      <div key={p.name} className="cr-swap min-w-0">
        <p className="flex items-center gap-2 text-[15.5px] font-semibold text-navy-deep">
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
 * Connected systems as an orbit. The Vanforces tile sits in the glow at the centre; the six systems drift slowly round it on two
 * rings (one ring each way), and the ones near the front are a little larger. A soft pulse of light travels from each system into
 * the centre. Hovering or focusing a system pauses the drift and shows what it is and what is confirmed. Reduced motion keeps
 * everything still. On narrow screens the systems are a grid and the same caption shows beneath.
 */
export function EcosystemOrbit() {
  const calm = useCalm();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const tiles = useRef<(HTMLButtonElement | null)[]>([]);
  const lines = useRef<(SVGLineElement | null)[]>([]);
  const dots = useRef<(SVGCircleElement | null)[]>([]);
  const clock = useRef(0);
  const visible = useRef(false);
  const pausedRef = useRef(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;
    let last = 0;
    const draw = (t: number, pulse: number) => {
      partners.forEach((p, i) => {
        const { x, y, depth } = place(p, t);
        const tile = tiles.current[i];
        if (tile) {
          tile.style.left = `${(x / W) * 100}%`;
          tile.style.top = `${(y / H) * 100}%`;
          tile.style.zIndex = String(Math.round(depth * 10));
          tile.style.scale = String(0.9 + depth * 0.14);
        }
        const line = lines.current[i];
        if (line) {
          line.setAttribute("x1", x.toFixed(1));
          line.setAttribute("y1", y.toFixed(1));
        }
        const dot = dots.current[i];
        if (dot) {
          const k = (((pulse / PERIOD + i / partners.length) % 1) + 1) % 1;
          dot.setAttribute("cx", (x + (C.x - x) * k).toFixed(1));
          dot.setAttribute("cy", (y + (C.y - y) * k).toFixed(1));
          dot.setAttribute("opacity", String(Math.sin(k * Math.PI) * 0.95));
        }
      });
    };
    draw(0, 0);
    if (calm) return;
    let pulse = 0;
    const loop = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;
      if (visible.current) {
        pulse += dt;
        if (!pausedRef.current) clock.current += dt;
        draw(clock.current, pulse);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [calm]);

  return (
    <div>
      {/* Wide screens: the orbit. */}
      <div ref={stage} className="relative mx-auto hidden w-full max-w-[1120px] lg:block" style={{ aspectRatio: `${W} / ${H}` }}>
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_45%_at_50%_50%,rgb(28_178_187/0.16),transparent_70%)]" />
        <svg viewBox={`0 0 ${W} ${H}`} fill="none" aria-hidden="true" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="orbit-line" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="rgb(28 178 187 / 0)" />
              <stop offset="1" stopColor="rgb(28 178 187 / 0.5)" />
            </linearGradient>
          </defs>
          {RINGS.map((r, i) => (
            <ellipse key={i} cx={C.x} cy={C.y} rx={r.rx} ry={r.ry} stroke="rgb(28 178 187 / 0.28)" strokeWidth="1.2" strokeDasharray="3 9" strokeLinecap="round" />
          ))}
          {partners.map((_, i) => (
            <line key={i} ref={(el) => void (lines.current[i] = el)} x2={C.x} y2={C.y} stroke="rgb(28 178 187 / 0.22)" strokeWidth="1.4" />
          ))}
          {partners.map((_, i) => (
            <circle key={i} ref={(el) => void (dots.current[i] = el)} r="4.5" fill="#1cb2bb" opacity="0" />
          ))}
        </svg>

        {partners.map((p, i) => (
          <button
            key={p.name}
            ref={(el) => void (tiles.current[i] = el)}
            type="button"
            onMouseEnter={() => {
              setActive(i);
              setPaused(true);
            }}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => {
              setActive(i);
              setPaused(true);
            }}
            onBlur={() => setPaused(false)}
            aria-label={`${p.name}, ${p.kind}`}
            aria-pressed={active === i}
            style={{ left: `${(place(p, 0).x / W) * 100}%`, top: `${(place(p, 0).y / H) * 100}%` }}
            className={`absolute flex h-[58px] w-[158px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-[18px] border bg-white px-4 shadow-[0_1px_2px_rgb(41_59_71/0.06),0_18px_30px_-18px_rgb(8_60_66/0.4)] transition-[border-color,box-shadow] duration-300 ${active === i ? "border-teal shadow-[0_0_0_4px_rgb(28_178_187/0.14),0_18px_30px_-18px_rgb(8_60_66/0.4)]" : "border-line"}`}
          >
            <Image src={p.src} alt="" width={p.width} height={p.height} sizes="140px" className={`${p.logo} w-auto max-w-full`} />
          </button>
        ))}

        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <span aria-hidden="true" className="hub-halo absolute left-1/2 top-1/2 size-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(28_178_187/0.28),rgb(28_178_187/0.07)_70%,transparent)]" />
          <div className="relative flex size-[112px] items-center justify-center rounded-[32px] bg-white shadow-[0_30px_46px_-20px_rgb(28_178_187/0.55),0_1px_2px_rgb(41_59_71/0.08)]">
            <Image src="/brand/vanforces-mark.svg" alt="Vanforces" width={60} height={56} className="h-12 w-auto" />
          </div>
        </div>
      </div>

      {/* Narrow screens: the tile and a grid of the systems. Tapping one shows its caption. */}
      <div className="mx-auto flex max-w-xl flex-col items-center lg:hidden">
        <div className="relative my-2 flex size-[104px] items-center justify-center rounded-[30px] bg-white shadow-[0_26px_40px_-20px_rgb(28_178_187/0.5),0_1px_2px_rgb(41_59_71/0.08)]">
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
              className={`flex h-[64px] cursor-pointer items-center justify-center rounded-[18px] border bg-white px-4 shadow-[0_1px_2px_rgb(41_59_71/0.05)] transition-colors ${active === i ? "border-teal" : "border-line"}`}
            >
              <Image src={p.src} alt={p.name} width={p.width} height={p.height} sizes="140px" className={`${p.logo} w-auto max-w-full`} />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 lg:-mt-2" aria-live="polite">
        <Caption p={partners[active]} />
      </div>
    </div>
  );
}
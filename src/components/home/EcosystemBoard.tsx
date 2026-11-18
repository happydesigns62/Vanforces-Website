"use client";

import Image from "next/image";
import Link from "next/link";

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
/** A tile is a link when the partner has its own page, and a plain tile otherwise. */
function Tile({ p, className, style, children }: { p: Partner; className: string; style?: React.CSSProperties; children: React.ReactNode }) {
  const common = { "aria-label": `${p.name}, ${p.kind}`, className, style };
  return p.href ? (
    <Link href={p.href} {...common}>
      {children}
    </Link>
  ) : (
    <div role="img" {...common}>
      {children}
    </div>
  );
}

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

/**
 * Connected systems as a clean, still board: three system tiles each side, all the same size, joined by dashed right-angle
 * lines to the Vanforces mark in the middle. The dashes of every line drift slowly toward the mark, all together.
 * Odoo and Zoho Books open their own pages. Reduced motion keeps the lines still. On narrow screens the tiles are a grid.
 */
export function EcosystemBoard() {
  return (
    <div>
      {/* Wide screens: the board. */}
      <div className="relative mx-auto hidden w-full max-w-[960px] lg:block" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} fill="none" aria-hidden="true" className="absolute inset-0 h-full w-full">
          {/* connectors */}
          {partners.map((p) => (
            <path
              key={p.name}
              d={pathFor(p)}
              stroke="#c4ccd2" strokeWidth="1.4" strokeDasharray="5 5" className="board-flow"
              strokeLinecap="round"
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

        </svg>

        {partners.map((p) => {
          const size = TILE[p.row];
          return (
            <Tile
              key={p.name}
              p={p}
              className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[22px] border border-line bg-white shadow-[0_1px_2px_rgb(41_59_71/0.06),0_18px_30px_-20px_rgb(41_59_71/0.35)] transition-[transform,box-shadow] duration-300 ${p.href ? "hover:-translate-y-[calc(50%+3px)] hover:shadow-[0_22px_36px_-20px_rgb(8_60_66/0.45)]" : ""}`}
              style={{ left: `${(COL_X[p.side] / W) * 100}%`, top: `${(ROW_Y[p.row] / H) * 100}%`, width: `${(size / W) * 100}%`, aspectRatio: "1 / 1" }}
            >
              <Image src={p.src} alt="" width={p.width} height={p.height} sizes="120px" className="h-auto max-h-[40%] w-[80%] object-contain" />
            </Tile>
          );
        })}

        <div className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center" style={{ left: `${(HUB.cx / W) * 100}%`, top: `${(HUB.cy / H) * 100}%` }}>
          <Image src="/brand/vanforces-mark.svg" alt="Vanforces" width={60} height={56} className="h-[72px] w-auto" />
        </div>
      </div>

      {/* Narrow screens: the mark and a grid of the systems. Tapping one shows its caption. */}
      <div className="mx-auto flex max-w-xl flex-col items-center lg:hidden">
        <div className="relative my-2 flex items-center justify-center">
          <Image src="/brand/vanforces-mark.svg" alt="Vanforces" width={60} height={56} className="relative h-14 w-auto" />
        </div>
        <span aria-hidden="true" className="my-3 block h-8 border-l-2 border-dashed border-cyan-line" />
        <div className="grid w-full grid-cols-2 gap-3">
          {partners.map((p) => (
            <Tile
              key={p.name}
              p={p}
              className="flex h-[72px] items-center justify-center rounded-[20px] border border-line bg-white px-4 shadow-[0_1px_2px_rgb(41_59_71/0.05)]"
            >
              <Image src={p.src} alt={p.name} width={p.width} height={p.height} sizes="140px" className="h-auto max-h-9 w-[64%] object-contain" />
            </Tile>
          ))}
        </div>
      </div>

    </div>
  );
}
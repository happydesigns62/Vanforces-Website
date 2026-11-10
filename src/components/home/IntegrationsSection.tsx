import Image from "next/image";
import { Package, ShoppingCart, Tag, TrendingUp, Users, HandCoins, type LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { Button } from "@/components/global/Button";
import { HubIcon } from "@/components/illustration/Vignettes";
import { SectionHeading } from "@/components/global/Common";
import { ScrollReveal } from "@/components/motion/Reveal";
import { ScrollScene } from "@/components/motion/ScrollScene";

type Item = { label: string; icon: LucideIcon; tile: string };

// Existing content: the data that moves between the ERP and the field. Three items on each side.
const left: Item[] = [
  { label: "Customers", icon: Users, tile: "bg-accent-blue text-white" },
  { label: "Products", icon: Package, tile: "bg-accent-green text-white" },
  { label: "Pricing", icon: Tag, tile: "bg-accent-amber text-navy-deep" },
];
const right: Item[] = [
  { label: "Orders", icon: ShoppingCart, tile: "bg-accent-blue text-white" },
  { label: "Sales", icon: TrendingUp, tile: "bg-teal-deep text-white" },
  { label: "Collections", icon: HandCoins, tile: "bg-accent-orange text-white" },
];

const W = 1120;
const H = 420;
const ROWS = [70, 210, 350];
// Tile centres, in the same units as the drawing, so the tiles and the lines always meet.
const LEFT_X = [250, 160, 250];
const CENTRE = { x: W / 2, y: H / 2, half: 62 };

function HubTile({ item, x, y, from }: { item: Item; x: number; y: number; from: "left" | "right" }) {
  const style = { left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` } as CSSProperties;
  return (
    <div
      style={style}
      className={`${from === "left" ? "scene-from-left" : "scene-from-right"} absolute flex w-[158px] -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-2xl border border-line/70 bg-white py-2.5 pl-2.5 pr-4 shadow-[0_1px_2px_rgb(41_59_71/0.05),0_12px_24px_-14px_rgb(41_59_71/0.2)] transition-transform duration-500 ease-[var(--ease-soft)] hover:-translate-y-[calc(50%+3px)]`}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-paper">
        <HubIcon label={item.label} className="size-7" />
      </span>
      <span className="text-[15px] font-semibold text-navy-deep">{item.label}</span>
    </div>
  );
}

function SmallTile({ item }: { item: Item }) {
  return (
    <li className="flex items-center gap-3 rounded-2xl border border-line/70 bg-white py-2.5 pl-2.5 pr-4 shadow-[0_1px_2px_rgb(41_59_71/0.05)]">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-paper">
        <HubIcon label={item.label} className="size-7" />
      </span>
      <span className="text-[15px] font-semibold text-navy-deep">{item.label}</span>
    </li>
  );
}

/** Lines of the hub: a quiet base line for each connection, with a dashed teal-to-orange line moving along it. */
function HubLines() {
  const leftTileEdge = (i: number) => LEFT_X[i] - 79; // left edge of a tile
  const leftTileRight = (i: number) => LEFT_X[i] + 79;
  const paths: string[] = [];
  for (let i = 0; i < 3; i++) {
    const y = ROWS[i];
    // Outer stub, then the connection into the centre tile. The middle row is a straight line.
    paths.push(`M0 ${y} H${leftTileEdge(i)}`);
    paths.push(`M${W} ${y} H${W - leftTileEdge(i)}`);
    if (i === 1) {
      paths.push(`M${leftTileRight(i)} ${y} H${CENTRE.x - CENTRE.half}`);
      paths.push(`M${W - leftTileRight(i)} ${y} H${CENTRE.x + CENTRE.half}`);
    } else {
      const startL = leftTileRight(i);
      const startR = W - leftTileRight(i);
      paths.push(`M${startL} ${y} C${startL + 100} ${y} ${CENTRE.x - CENTRE.half - 70} ${CENTRE.y} ${CENTRE.x - CENTRE.half} ${CENTRE.y}`);
      paths.push(`M${startR} ${y} C${startR - 100} ${y} ${CENTRE.x + CENTRE.half + 70} ${CENTRE.y} ${CENTRE.x + CENTRE.half} ${CENTRE.y}`);
    }
  }
  // The data moves both ways on every line: master data into Vanforces, and transactions back out to the ERP. One light
  // travels each way, in two shades, and the two are offset so they never sit on top of each other.
  const flowOpacity = "clamp(0, calc((var(--p) - 0.6) * 2.5), 1)";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} fill="none" aria-hidden="true" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="hub-flow" x1="0" x2={W} y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--color-teal)" />
          <stop offset="1" stopColor="var(--color-brand-orange)" />
        </linearGradient>
        <linearGradient id="hub-flow-back" x1="0" x2={W} y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--color-brand-orange)" />
          <stop offset="1" stopColor="var(--color-teal)" />
        </linearGradient>
      </defs>
      {paths.map((d, index) => (
        <path key={`base-${index}`} d={d} pathLength={1} stroke="#dde5e8" strokeWidth="2" strokeLinecap="round" style={{ strokeDasharray: 1, strokeDashoffset: "calc(1 - var(--p))" }} />
      ))}
      {paths.map((d, index) => (
        <path key={`out-${index}`} d={d} stroke="url(#hub-flow)" strokeWidth="2" strokeLinecap="round" className="flow-line" style={{ opacity: flowOpacity }} />
      ))}
      {paths.map((d, index) => (
        <path key={`back-${index}`} d={d} stroke="url(#hub-flow-back)" strokeWidth="2" strokeLinecap="round" className="flow-line-rev" style={{ opacity: flowOpacity, animationDelay: "-1.2s" }} />
      ))}
    </svg>
  );
}

function CentreTile({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <span aria-hidden="true" className="hub-halo absolute left-1/2 top-1/2 size-[210px] -translate-x-1/2 -translate-y-1/2 rounded-[64px] bg-[radial-gradient(closest-side,rgb(28_178_187/0.2),rgb(28_178_187/0.06)_70%,transparent)]" />
      <div className="relative flex size-[124px] items-center justify-center rounded-[32px] bg-white shadow-[0_28px_44px_-20px_rgb(28_178_187/0.5),0_1px_2px_rgb(41_59_71/0.08)]">
        <Image src="/brand/vanforces-mark.svg" alt="Vanforces" width={60} height={56} className="h-14 w-auto" />
      </div>
    </div>
  );
}

/** The connection drawing on its own, so other pages can use it too. */
export function ConnectionHub() {
  return (
    <div role="img" aria-label="ERP and Accounting exchanges customers, products and pricing with Vanforces, which connects to field operations such as orders, sales and collections.">
      {/* Wide screens: the hub drawing. The lines draw in as it scrolls into view, then keep moving both ways. */}
      <ScrollScene mode="late" className="hidden lg:block">
        <div className="relative mx-auto w-full max-w-[1120px]" style={{ aspectRatio: `${W} / ${H}` }}>
          <HubLines />
          <p className="absolute -top-6 left-0 text-[13px] font-semibold text-muted">
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-teal" />
              ERP &amp; Accounting
            </span>
            <span className="mt-0.5 block pl-3.5 text-[12px] font-medium text-muted/80">Master data</span>
          </p>
          <p className="absolute -top-6 right-0 text-right text-[13px] font-semibold text-muted">
            <span className="flex items-center justify-end gap-2">
              Field Operations
              <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-orange" />
            </span>
            <span className="mt-0.5 block pr-3.5 text-[12px] font-medium text-muted/80">Transaction data</span>
          </p>
          {left.map((item, index) => (
            <HubTile key={item.label} item={item} x={LEFT_X[index]} y={ROWS[index]} from="left" />
          ))}
          {right.map((item, index) => (
            <HubTile key={item.label} item={item} x={W - LEFT_X[index]} y={ROWS[index]} from="right" />
          ))}
          <CentreTile className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
      </ScrollScene>

      {/* Narrow screens: the same story, stacked. */}
      <div className="mx-auto flex max-w-md flex-col items-center lg:hidden">
        <p className="flex items-center gap-2 text-[13px] font-semibold text-muted">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-teal" />
          ERP &amp; Accounting
        </p>
        <ul className="mt-4 flex flex-wrap justify-center gap-2.5">
          {left.map((item) => (
            <SmallTile key={item.label} item={item} />
          ))}
        </ul>
        <span aria-hidden="true" className="my-5 block h-10 border-l-2 border-dashed border-cyan-line" />
        <CentreTile className="relative my-4" />
        <span aria-hidden="true" className="my-5 block h-10 border-l-2 border-dashed border-cyan-line" />
        <p className="flex items-center gap-2 text-[13px] font-semibold text-muted">
          Field Operations
          <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-orange" />
        </p>
        <ul className="mt-4 flex flex-wrap justify-center gap-2.5">
          {right.map((item) => (
            <SmallTile key={item.label} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}

/** ERP & Integrations: a hub that shows data moving both ways between the ERP and the field, on a light panel. */
export function IntegrationsSection() {
  return (
    <section className="px-3 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-[1320px] rounded-[32px] bg-mist px-5 py-16 sm:px-10 md:rounded-[40px] md:py-24 lg:px-14">
        <SectionHeading
          variant="fine"
          align="center"
          eyebrow="Work with what you already have"
          title="Your ERP. Your Field Teams."
          titleMuted="One Connected Operation."
          description="Connect your existing business systems with daily field sales, inventory, delivery and collection activities through Vanforces."
        />

        <ScrollReveal delay={120} className="mt-14 md:mt-20">
          <ConnectionHub />
        </ScrollReveal>

        <div className="mx-auto mt-16 grid max-w-[1120px] gap-4 md:mt-24 md:grid-cols-2">
          <ScrollReveal className="flex h-full flex-col justify-between gap-6 rounded-[24px] bg-white p-7 md:p-9">
            <div>
              <h3 className="text-[1.5rem] font-medium leading-tight tracking-[-0.03em] text-navy-deep">Data Examples</h3>
              <p className="mt-2.5 text-[1.0625rem] leading-relaxed text-muted">Customers · Products · Pricing · Orders · Sales · Collections</p>
            </div>
            <Button href="/integrations" variant="text">
              Explore Integrations
            </Button>
          </ScrollReveal>
          <ScrollReveal delay={90} className="flex h-full flex-col justify-between gap-6 rounded-[24px] bg-white p-7 md:p-9">
            <div>
              <h3 className="text-[1.5rem] font-medium leading-tight tracking-[-0.03em] text-navy-deep">Build Better Solutions Together.</h3>
              <p className="mt-2.5 text-[1.0625rem] leading-relaxed text-muted">Working with ERP systems or distribution businesses? Explore partnership opportunities with Vanforces.</p>
            </div>
            <Button href="/partners" variant="text">
              Become a Partner
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

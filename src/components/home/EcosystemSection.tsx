import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { SectionHeading } from "@/components/global/Common";
import { ScrollReveal } from "@/components/motion/Reveal";

type Logo = { name: string; src: string; width: number; height: number; className: string; href?: string };

// The systems Vanforces works alongside. The logos are the files supplied by the Vanforces team, trimmed and resized for the web.
// Odoo and Zoho Books link to their own pages. The others are shown to name the system and are not links.
const left: Logo[] = [
  { name: "Odoo", src: "/brand/partners/odoo.png", width: 623, height: 199, className: "h-9", href: "/integrations/odoo" },
  { name: "Zoho Books", src: "/brand/partners/zoho.png", width: 640, height: 276, className: "h-12", href: "/integrations/zoho-books" },
  { name: "Taskforces ERP", src: "/brand/partners/taskforces.png", width: 640, height: 97, className: "h-8" },
];
const right: Logo[] = [
  { name: "Whatasol", src: "/brand/partners/whatasol.png", width: 640, height: 130, className: "h-8" },
  { name: "Al Mawasil, for ZATCA e-invoicing", src: "/brand/partners/al-mawasil.png", width: 640, height: 85, className: "h-7" },
  { name: "Entaura.ai", src: "/brand/entaura-logo.svg", width: 545, height: 122, className: "h-8" },
];

const W = 1120;
const H = 440;
const ROWS = [78, 220, 362];
const SIDE_X = [236, 170, 236];
const TILE_W = 220;
const CENTRE = { x: W / 2, y: H / 2, half: 66 };

function LogoTile({ logo, style, from }: { logo: Logo; style?: CSSProperties; from?: "left" | "right" }) {
  const body = (
    <span className="flex h-full items-center justify-center rounded-[22px] border border-line bg-white px-5 shadow-[0_1px_2px_rgb(41_59_71/0.05),0_16px_30px_-20px_rgb(41_59_71/0.3)] transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-soft)] hover:-translate-y-0.5 hover:border-cyan-line hover:shadow-lift">
      <Image src={logo.src} alt={logo.name} width={logo.width} height={logo.height} sizes="200px" className={`w-auto max-w-full ${logo.className}`} />
    </span>
  );
  const classes = `${from ? "absolute -translate-x-1/2 -translate-y-1/2" : ""} block h-[76px] ${from ? "w-[220px]" : "w-full"}`;
  return logo.href ? (
    <Link href={logo.href} style={style} className={classes} aria-label={`${logo.name} integration`}>
      {body}
    </Link>
  ) : (
    <div style={style} className={classes}>
      {body}
    </div>
  );
}

/** Lines of the diagram: a quiet base line for each connection, with a dashed teal-to-orange line moving along it. */
function Lines() {
  const paths: string[] = [];
  for (let i = 0; i < 3; i++) {
    const y = ROWS[i];
    const startL = SIDE_X[i] + TILE_W / 2;
    const startR = W - startL;
    if (i === 1) {
      paths.push(`M${startL} ${y} H${CENTRE.x - CENTRE.half}`);
      paths.push(`M${startR} ${y} H${CENTRE.x + CENTRE.half}`);
    } else {
      paths.push(`M${startL} ${y} C${startL + 90} ${y} ${CENTRE.x - CENTRE.half - 70} ${CENTRE.y} ${CENTRE.x - CENTRE.half} ${CENTRE.y}`);
      paths.push(`M${startR} ${y} C${startR - 90} ${y} ${CENTRE.x + CENTRE.half + 70} ${CENTRE.y} ${CENTRE.x + CENTRE.half} ${CENTRE.y}`);
    }
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} fill="none" aria-hidden="true" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="eco-flow" x1="0" x2={W} y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--color-teal)" />
          <stop offset="1" stopColor="var(--color-brand-orange)" />
        </linearGradient>
      </defs>
      {paths.map((d, index) => (
        <path key={`base-${index}`} d={d} stroke="#dde5e8" strokeWidth="2" strokeLinecap="round" />
      ))}
      {paths.map((d, index) => (
        <path key={`flow-${index}`} d={d} stroke="url(#eco-flow)" strokeWidth="2" strokeLinecap="round" className="flow-line" />
      ))}
    </svg>
  );
}

function Centre({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <span aria-hidden="true" className="hub-halo absolute left-1/2 top-1/2 size-[230px] -translate-x-1/2 -translate-y-1/2 rounded-[70px] bg-[radial-gradient(closest-side,rgb(28_178_187/0.22),rgb(28_178_187/0.06)_70%,transparent)]" />
      <div className="relative flex size-[132px] items-center justify-center rounded-[34px] bg-white shadow-[0_28px_44px_-20px_rgb(28_178_187/0.5),0_1px_2px_rgb(41_59_71/0.08)]">
        <Image src="/brand/vanforces-mark.svg" alt="Vanforces" width={60} height={56} className="h-14 w-auto" />
      </div>
    </div>
  );
}

/**
 * Connected systems. No cards of text: the Vanforces mark sits in the middle and the logos of the systems it works with sit
 * either side, joined by thin lines with light moving along them. One short line of text and one link say the rest.
 */
export function EcosystemSection() {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHeading
          variant="fine"
          align="center"
          eyebrow="Connected systems"
          title="Works With the Systems"
          titleMuted="You Already Use."
          description="ERP, accounting, messaging and e-invoicing tools, connected to the daily field operation."
        />

        <ScrollReveal delay={100} className="mt-14 md:mt-20">
          {/* Wide screens: logos either side of the Vanforces mark, joined by lines. */}
          <div className="relative mx-auto hidden w-full max-w-[1120px] lg:block" style={{ aspectRatio: `${W} / ${H}` }}>
            <Lines />
            {left.map((logo, index) => (
              <LogoTile key={logo.name} logo={logo} from="left" style={{ left: `${(SIDE_X[index] / W) * 100}%`, top: `${(ROWS[index] / H) * 100}%` }} />
            ))}
            {right.map((logo, index) => (
              <LogoTile key={logo.name} logo={logo} from="right" style={{ left: `${((W - SIDE_X[index]) / W) * 100}%`, top: `${(ROWS[index] / H) * 100}%` }} />
            ))}
            <Centre className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>

          {/* Narrow screens: the mark on top, the logos in a tidy grid underneath. */}
          <div className="mx-auto flex max-w-xl flex-col items-center lg:hidden">
            <Centre className="relative my-4" />
            <span aria-hidden="true" className="my-4 block h-10 border-l-2 border-dashed border-cyan-line" />
            <div className="grid w-full grid-cols-2 gap-3">
              {[...left, ...right].map((logo) => (
                <LogoTile key={logo.name} logo={logo} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={160} className="mt-12 flex flex-col items-center gap-2 text-center">
          <Link href="/integrations" className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-teal-deep hover:text-navy">
            Explore all integrations
            <ArrowRight aria-hidden="true" size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <p className="max-w-[40rem] text-[12.5px] leading-relaxed text-muted">Scope depends on the connector and the implementation. Names and logos belong to their owners and are shown only to name the systems Vanforces can work alongside.</p>
        </ScrollReveal>
      </div>
    </section>
  );
}

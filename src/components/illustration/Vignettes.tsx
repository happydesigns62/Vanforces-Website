"use client";

// Small illustrated scenes for the rest of the site, in the same style as the hero van scene: flat shapes, navy outlines,
// white fills, teal and orange, soft grey shadows. They use the same traced box mascot and the real logo. Each plays by
// itself while on screen and stands still for visitors who prefer less motion.

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import {
  BOX_SHADE,
  Carton,
  Mascot,
  NAVY,
  ORANGE,
  ORANGE_LIGHT,
  Office,
  SHADOW,
  Shop,
  TEAL,
  TEAL_LIGHT,
  Tree,
  Van,
  Warehouse,
  type Pose,
} from "@/components/home/VanSalesScene";

/** Wraps a scene and tells the styles whether it is on screen, so off-screen scenes do not animate. */
function Live({ className = "", children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => node.classList.toggle("is-live", entry.isIntersecting), { threshold: 0.1 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`vg ${className}`} aria-hidden="true">
      {children}
    </div>
  );
}

const delay = (s: number) => ({ "--vd": `${s}s` }) as CSSProperties;
const addClass = (name: string) => (node: SVGGElement | null) => {
  node?.classList.add(name);
};

/** The mascot, scaled for a small scene. `x` and `y` are where its feet stand. */
function Buddy({ x, y, pose, s = 0.62, flip = false }: { x: number; y: number; pose: Pose; s?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <g className="vg-bob">
        <Mascot pose={pose} />
      </g>
    </g>
  );
}

const ground = (
  <g>
    <path d="M6 97 H154" stroke={NAVY} strokeWidth="2" strokeLinecap="round" />
  </g>
);

function Coin({ x, y, r = 7, delaySec = 0 }: { x: number; y: number; r?: number; delaySec?: number }) {
  return (
    <g style={delay(delaySec)} className="vg-pop">
      <circle cx={x} cy={y} r={r} fill={ORANGE} stroke={NAVY} strokeWidth="1.8" />
      <circle cx={x} cy={y} r={r - 3.4} fill="none" stroke="#fff" strokeWidth="1.4" />
    </g>
  );
}

/** The Vanforces location pin, from the supplied pin artwork. Its tip sits at (x, y); height is the pin's full height. */
function Pin({ x, y, height = 34 }: { x: number; y: number; height?: number }) {
  const s = height / 512;
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) translate(-256 -512)`}>
      <circle cx="256" cy="170.667" r="86" fill="#fff" />
      <path d="M256 0C161.896 0 85.333 76.563 85.333 170.667c0 28.25 7.063 56.26 20.49 81.104L246.667 506.5c1.875 3.396 5.448 5.5 9.333 5.5s7.458-2.104 9.333-5.5l140.896-254.813c13.375-24.76 20.438-52.771 20.438-81.021C426.667 76.563 350.104 0 256 0m0 256c-47.052 0-85.333-38.281-85.333-85.333S208.948 85.334 256 85.334s85.333 38.281 85.333 85.333S303.052 256 256 256" fill={TEAL} stroke={NAVY} strokeWidth="2.2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    </g>
  );
}

function Bars({ x, y, count = 3, h = 36, w = 9, gap = 6, delaySec = 0 }: { x: number; y: number; count?: number; h?: number; w?: number; gap?: number; delaySec?: number }) {
  const heights = [0.5, 0.8, 0.62, 1, 0.74];
  return (
    <g>
      {Array.from({ length: count }, (_, i) => (
        <g key={i} className="vg-grow" style={delay(delaySec + i * 0.18)}>
          <rect x={x + i * (w + gap)} y={y + h * (1 - heights[i])} width={w} height={h * heights[i]} rx="2" fill={i % 2 ? ORANGE : TEAL} stroke={NAVY} strokeWidth="1.6" />
        </g>
      ))}
    </g>
  );
}

export type VignetteKind = "plan" | "stock" | "sell" | "deliver" | "collect" | "analyse" | "relax" | "map" | "read";

function Scene({ kind }: { kind: VignetteKind }) {
  switch (kind) {
    case "plan":
      return (
        <g>
          {ground}
          <rect x="20" y="16" width="58" height="76" rx="6" fill="#fff" stroke={NAVY} strokeWidth="2.2" />
          <rect x="37" y="9" width="24" height="11" rx="3" fill={TEAL} stroke={NAVY} strokeWidth="2" />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x="28" y={30 + i * 18} width="11" height="11" rx="2.5" fill="#fff" stroke={NAVY} strokeWidth="1.8" />
              <g className="vg-pop" style={delay(0.3 + i * 0.55)}>
                <path d={`M30.5 ${35.5 + i * 18} L33 ${38 + i * 18} L38 ${31.5 + i * 18}`} fill="none" stroke={TEAL} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <path d={`M45 ${36 + i * 18} H68`} stroke="#c9d4d9" strokeWidth="2.4" strokeLinecap="round" />
            </g>
          ))}
          <Buddy x={116} y={96} pose="point" flip />
        </g>
      );
    case "stock":
      return (
        <g>
          {ground}
          <path d="M14 94 V30 M92 94 V30" stroke={NAVY} strokeWidth="2.4" strokeLinecap="round" />
          <rect x="12" y="46" width="82" height="4" rx="2" fill={NAVY} />
          <rect x="12" y="76" width="82" height="4" rx="2" fill={NAVY} />
          <Carton x={20} y={26} w={22} h={20} />
          <Carton x={46} y={30} w={18} h={16} />
          <Carton x={68} y={24} w={20} h={22} />
          <g className="vg-slide">
            <Carton x={22} y={58} w={24} h={18} />
          </g>
          <Buddy x={124} y={96} pose="carry" />
        </g>
      );
    case "sell":
      return (
        <g>
          {ground}
          <rect x="12" y="38" width="80" height="58" fill="#fff" stroke={NAVY} strokeWidth="2.2" />
          <rect x="8" y="24" width="88" height="8" rx="3" fill={NAVY} />
          {Array.from({ length: 4 }, (_, i) => (
            <g key={i}>
              <rect x={10 + i * 21.5} y="30" width="21.5" height="12" fill={i % 2 === 0 ? TEAL : "#fff"} />
              <path d={`M${10 + i * 21.5} 42 a10.75 7 0 0 0 21.5 0`} fill={i % 2 === 0 ? TEAL : "#fff"} stroke={NAVY} strokeWidth="1.8" />
            </g>
          ))}
          <rect x="10" y="30" width="86" height="12" fill="none" stroke={NAVY} strokeWidth="1.8" />
          <rect x="20" y="52" width="34" height="22" rx="2" fill={TEAL_LIGHT} stroke={NAVY} strokeWidth="1.8" />
          <rect x="66" y="56" width="20" height="40" rx="2" fill="#fff" stroke={NAVY} strokeWidth="1.8" />
          <Buddy x={126} y={96} pose="tablet" flip />
          <Coin x={106} y={34} delaySec={0.6} />
        </g>
      );
    case "deliver":
      return (
        <g>
          <path d="M6 76 H154" stroke={NAVY} strokeWidth="2" strokeLinecap="round" />
          <path d="M6 100 H154" stroke={NAVY} strokeWidth="2" strokeLinecap="round" />
          <path d="M6 88 H154" stroke="#9fb0ba" strokeWidth="1.8" strokeDasharray="10 9" strokeLinecap="round" />
          <g transform="translate(118 74)">
            <path d="M0 0 V-30" stroke={NAVY} strokeWidth="2.2" strokeLinecap="round" />
            <Pin x={0} y={-30} height={34} />
          </g>
          <g className="vg-drive" style={{ "--from": "-70px", "--to": "70px" } as CSSProperties}>
            <g transform="translate(20 98) scale(0.46)">
              <Van bodyRef={null} wheelRefs={[addClass("vg-spin"), addClass("vg-spin")]} />
            </g>
          </g>
        </g>
      );
    case "collect":
      return (
        <g>
          {ground}
          {[0, 1, 2].map((i) => (
            <g key={i} className="vg-pop" style={delay(0.2 + i * 0.5)}>
              <ellipse cx="46" cy={88 - i * 11} rx="22" ry="7" fill={ORANGE} stroke={NAVY} strokeWidth="2" />
              <path d={`M24 ${88 - i * 11} V${82 - i * 11} a22 7 0 0 0 44 0 V${88 - i * 11}`} fill={ORANGE_LIGHT} stroke={NAVY} strokeWidth="2" />
              <ellipse cx="46" cy={82 - i * 11} rx="22" ry="7" fill={ORANGE} stroke={NAVY} strokeWidth="2" />
            </g>
          ))}
          <Coin x={80} y={40} r={8} delaySec={1.2} />
          <Buddy x={122} y={96} pose="point" flip />
        </g>
      );
    case "analyse":
      return (
        <g>
          {ground}
          <rect x="14" y="16" width="76" height="72" rx="6" fill="#fff" stroke={NAVY} strokeWidth="2.2" />
          <path d="M24 78 H80" stroke="#c9d4d9" strokeWidth="2" strokeLinecap="round" />
          <Bars x={26} y={32} count={4} h={44} w={9} gap={5} />
          <Buddy x={124} y={96} pose="tablet" flip />
        </g>
      );
    case "relax":
      return (
        <g>
          {ground}
          <circle cx="128" cy="34" r="19" fill="#fff" stroke={NAVY} strokeWidth="2.4" />
          {[0, 90, 180, 270].map((deg) => (
            <path key={deg} d="M128 18.5 V22" stroke={NAVY} strokeWidth="2" strokeLinecap="round" transform={`rotate(${deg} 128 34)`} />
          ))}
          <g className="vg-hand" style={{ transformOrigin: "128px 34px", animationDuration: "24s" }}>
            <path d="M128 34 V24.5" stroke={NAVY} strokeWidth="2.6" strokeLinecap="round" />
          </g>
          <g className="vg-hand" style={{ transformOrigin: "128px 34px", animationDuration: "3s" }}>
            <path d="M128 34 V21.5" stroke={TEAL} strokeWidth="2" strokeLinecap="round" />
          </g>
          <circle cx="128" cy="34" r="2.2" fill={NAVY} />
          <Buddy x={52} y={96} pose="cup" s={0.74} />
        </g>
      );
    case "map":
      return (
        <g>
          {ground}
          <rect x="14" y="24" width="82" height="62" rx="8" fill={TEAL_LIGHT} stroke={NAVY} strokeWidth="2.2" />
          <path d="M14 56 H96 M44 24 V86 M70 24 V86" stroke="#c4e4e8" strokeWidth="2" />
          <path d="M28 74 C44 74 42 56 58 56 C72 56 68 46 80 46" fill="none" stroke={NAVY} strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="28" cy="74" r="4.2" fill="#fff" stroke={NAVY} strokeWidth="1.9" />
          <g className="vg-bob">
            <Pin x={80} y={48} height={36} />
          </g>
          <Buddy x={124} y={96} pose="point" flip />
        </g>
      );
    case "read":
      return (
        <g>
          {ground}
          <rect x="14" y="14" width="84" height="72" rx="6" fill="#fff" stroke={NAVY} strokeWidth="2.2" />
          <path d="M26 74 H86 M26 54 H86 M26 34 H86" stroke="#e1e8eb" strokeWidth="1.6" />
          <path d="M28 68 C40 64 42 46 54 48 C66 50 68 34 82 32" pathLength="1" fill="none" stroke={TEAL} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="vg-draw" />
          <circle cx="82" cy="32" r="4" fill={ORANGE} stroke={NAVY} strokeWidth="1.8" />
          <Buddy x={124} y={96} pose="tablet" flip />
        </g>
      );
  }
}

/** A looping illustrated scene, 160 x 110. Size it with a height or a width. */
export function Vignette({ kind, className = "" }: { kind: VignetteKind; className?: string }) {
  return (
    <Live className={className}>
      <svg viewBox="0 0 160 110" className="block h-full w-full" role="presentation">
        <Scene kind={kind} />
      </svg>
    </Live>
  );
}

/* ------------------------------------------------------------------ icons ------------------------------------------------------------------ */

const iconStroke = { stroke: NAVY, strokeWidth: 2, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/** A small flat drawing for a data type in the ERP hub, matched by its label. */
export function HubIcon({ label, className = "" }: { label: string; className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} role="presentation" aria-hidden="true">
      {label === "Customers" ? (
        <g>
          <rect x="8" y="5" width="25" height="30" rx="3" fill={TEAL} {...iconStroke} />
          <path d="M13 5 V35" {...iconStroke} />
          <circle cx="23" cy="16" r="4.5" fill="#fff" {...iconStroke} strokeWidth="1.6" />
          <path d="M15.5 29 C16 23 30 23 30.5 29" fill="#fff" {...iconStroke} strokeWidth="1.6" />
        </g>
      ) : null}
      {label === "Products" ? (
        <g>
          <path d="M6 15 L20 8 L34 15 V30 L20 37 L6 30 Z" fill={ORANGE_LIGHT} {...iconStroke} />
          <path d="M6 15 L20 22 L34 15 M20 22 V37" fill="none" {...iconStroke} />
          <path d="M13 11.5 L27 18.5" stroke={BOX_SHADE} strokeWidth="2" strokeLinecap="round" />
        </g>
      ) : null}
      {label === "Pricing" ? (
        <g>
          <path d="M6 7 H21 L35 21 L21 35 L6 21 Z" fill={ORANGE} {...iconStroke} />
          <circle cx="13" cy="14" r="2.8" fill="#fff" {...iconStroke} strokeWidth="1.6" />
          <path d="M17 24 L24 17" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      ) : null}
      {label === "Orders" ? (
        <g>
          <rect x="3" y="11" width="21" height="16" rx="2" fill={ORANGE} {...iconStroke} />
          <path d="M24 16 H31 L36 22 V27 H24 Z" fill={TEAL} {...iconStroke} />
          <circle cx="11" cy="29" r="3.6" fill={NAVY} />
          <circle cx="30" cy="29" r="3.6" fill={NAVY} />
        </g>
      ) : null}
      {label === "Sales" ? (
        <g>
          <path d="M9 15 H31 L33 35 H7 Z" fill={TEAL} {...iconStroke} />
          <path d="M14 15 C14 6 26 6 26 15" fill="none" {...iconStroke} />
          <path d="M15 25 L19 29 L26 21" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ) : null}
      {label === "Collections" ? (
        <g>
          <circle cx="20" cy="20" r="14" fill={ORANGE} {...iconStroke} />
          <circle cx="20" cy="20" r="8.5" fill="none" stroke="#fff" strokeWidth="2.2" />
          <path d="M16.5 20 H23.5 M20 16.5 V23.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      ) : null}
    </svg>
  );
}

export type StatIconKind = "route" | "carton" | "tick" | "coin";

/** Small white line icons for the numbers band. They sit on the teal gradient, so they are drawn in white. */
export function StatIcon({ kind, className = "" }: { kind: StatIconKind; className?: string }) {
  const line = { stroke: "#fff", strokeWidth: 2.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };
  return (
    <Live className={className}>
      <svg viewBox="0 0 48 48" className="block h-full w-full" role="presentation">
        {kind === "route" ? (
          <g>
            <path d="M8 38 C14 38 14 28 22 28 C30 28 30 20 38 20" {...line} strokeDasharray="3 5" className="vg-dash" />
            <g className="vg-bob">
              <path d="M24 22 C14 12 17 4 24 3 C31 4 34 12 24 22 Z" {...line} fill="#fff" fillOpacity="0.2" />
              <circle cx="24" cy="11.5" r="2.6" fill="#fff" />
            </g>
          </g>
        ) : null}
        {kind === "carton" ? (
          <g>
            <path d="M6 16 L24 8 L42 16 V34 L24 42 L6 34 Z" {...line} />
            <path d="M6 16 L24 24 L42 16 M24 24 V42" {...line} />
            <g className="vg-bob">
              <path d="M15 12 L33 20" {...line} stroke="#ffd9b5" />
            </g>
          </g>
        ) : null}
        {kind === "tick" ? (
          <g>
            <circle cx="24" cy="24" r="17" {...line} />
            <path d="M15 24.5 L21.5 31 L33 18" pathLength="1" {...line} className="vg-draw" />
          </g>
        ) : null}
        {kind === "coin" ? (
          <g>
            <g className="vg-flip">
              <circle cx="24" cy="24" r="16" {...line} fill="#fff" fillOpacity="0.15" />
              <circle cx="24" cy="24" r="9.5" {...line} stroke="#ffd9b5" />
            </g>
          </g>
        ) : null}
      </svg>
    </Live>
  );
}

/** The mascot popping up from the bottom edge of a card, waving, then ducking away again. */
export function PeekMascot({ className = "" }: { className?: string }) {
  return (
    <Live className={`pointer-events-none overflow-hidden ${className}`}>
      <svg viewBox="0 0 120 112" className="block h-full w-full" role="presentation">
        <g className="vg-peek">
          <g transform="translate(58 110) scale(0.98)">
            <Mascot pose="wave" />
          </g>
        </g>
      </svg>
    </Live>
  );
}

/**
 * The mascot sitting behind the top edge of the Solution Finder card. While the box is waiting it peeks up now and then,
 * waves, and wonders (three bouncing dots in a bubble). Once suggestions appear it stays up, holds the tablet, and shows a
 * tick in the bubble. The card itself hides the lower part of the drawing, so the mascot looks as if it is perched on the edge.
 */
export function FinderMascot({ found = false, className = "" }: { found?: boolean; className?: string }) {
  const bubble = (
    <g transform="translate(92 8)">
      <path d="M8 0 H52 a8 8 0 0 1 8 8 V26 a8 8 0 0 1 -8 8 H22 L12 44 V34 H8 a8 8 0 0 1 -8 -8 V8 a8 8 0 0 1 8 -8 Z" fill="#fff" stroke={NAVY} strokeWidth="2" strokeLinejoin="round" />
      {found ? (
        <g className="vg-pop">
          <path d="M20 17 l7 7 l14 -14" fill="none" stroke={TEAL} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ) : (
        <g>
          {[0, 1, 2].map((i) => (
            <circle key={i} className="vg-bob" style={{ animationDelay: `${i * 0.18}s` }} cx={18 + i * 12} cy="17" r="3.4" fill={NAVY} />
          ))}
        </g>
      )}
    </g>
  );
  return (
    <Live className={`pointer-events-none ${className}`}>
      <svg viewBox="0 0 170 112" className="block h-full w-full" role="presentation">
        <g className={found ? "" : "vg-peek"}>
          <g transform="translate(58 110) scale(0.98)">
            <Mascot pose={found ? "tablet" : "wave"} />
          </g>
          {bubble}
        </g>
      </svg>
    </Live>
  );
}

/* ------------------------------------------------------------------ page scenes ------------------------------------------------------------------ */

export type PageSceneKind = "warehouse" | "van" | "shop" | "office";

const roadLines = (
  <g>
    <path d="M0 154 H560" stroke={NAVY} strokeWidth="2" />
    <path d="M0 186 H560" stroke={NAVY} strokeWidth="2" />
    <path d="M0 170 H560" stroke="#9fb0ba" strokeWidth="2" strokeDasharray="14 12" strokeLinecap="round" className="vg-dash" />
  </g>
);

function Cloud({ x, y }: { x: number; y: number }) {
  return (
    <path
      transform={`translate(${x} ${y})`}
      d="M0 24 q6 -14 20 -12 q8 -14 24 -6 q14 -4 18 10 q12 2 10 14 H-4 q-10 -2 -6 -14 Z"
      fill="#f3f7f9"
      stroke="#dde6ea"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  );
}

/** A wide banner scene for a product, industry or role page: the building that belongs to it, with the box mascot at work. */
export function PageScene({ kind, className = "" }: { kind: PageSceneKind; className?: string }) {
  return (
    <Live className={className}>
      <svg viewBox="0 -24 560 224" className="block h-auto w-full" role="presentation">
        <path d="M200 120 C200 70 270 52 320 62 C384 74 400 116 376 146 C356 170 240 172 214 152 C204 144 200 132 200 120 Z" fill={TEAL_LIGHT} opacity="0.7" />
        <Cloud x={60} y={-10} />
        <Cloud x={420} y={4} />
        {roadLines}

        {kind === "warehouse" ? (
          <g>
            <Warehouse x={70} y={150} doorRef={addClass("vg-door")} />
            <Tree x={420} y={150} s={0.9} swayRef={addClass("vg-sway")} />
            <ellipse cx="338" cy="152" rx="44" ry="4" fill={SHADOW} />
            <Buddy x={330} y={152} pose="carry" s={1} />
            <Carton x={366} y={124} w={32} h={28} />
            <Carton x={372} y={100} w={24} h={24} />
          </g>
        ) : null}

        {kind === "van" ? (
          <g>
            <Warehouse x={30} y={150} doorRef={null} />
            <Shop x={340} y={150} plantRef={addClass("vg-sway")} doorRef={null} />
            <g className="vg-drive" style={{ "--from": "-240px", "--to": "620px" } as CSSProperties}>
              <g transform="translate(40 182)">
                <Van bodyRef={addClass("vg-bob")} wheelRefs={[addClass("vg-spin"), addClass("vg-spin")]} />
              </g>
            </g>
          </g>
        ) : null}

        {kind === "shop" ? (
          <g>
            <Tree x={110} y={150} s={0.9} swayRef={addClass("vg-sway")} />
            <Shop x={190} y={150} plantRef={addClass("vg-sway")} doorRef={null} />
            <Buddy x={452} y={152} pose="tablet" s={1} flip />
            <Coin x={430} y={92} r={9} delaySec={0.6} />
          </g>
        ) : null}

        {kind === "office" ? (
          <g>
            <Tree x={90} y={150} s={0.9} swayRef={addClass("vg-sway")} />
            <Buddy x={230} y={152} pose="point" s={1} />
            <Office x={300} y={150} barsRef={addClass("vg-grow")} glowRef={addClass("vg-glow")} />
            <Tree x={500} y={150} s={0.8} swayRef={addClass("vg-sway")} />
          </g>
        ) : null}
      </svg>
    </Live>
  );
}

"use client";

// A van sales day, drawn in the Vanforces illustration style: flat shapes, navy outlines, white fills, teal and orange
// accents, and soft grey shadows. The box mascot is traced from assets/pages/home/mascots/mascot box.png and the logo
// is the real mark from assets/pages/home/logos/vanforces icon svg.svg.
//
// The scene plays by itself as an 18-second loop: the van arrives at the warehouse and is loaded, drives to the shop
// where the salesman takes the order and the payment, drives to the office where the day is settled, then leaves.

import { useEffect, useRef, type Ref } from "react";

export const NAVY = "#263a47";
export const TEAL = "#1cb2bb";
export const TEAL_LIGHT = "#dff4f6";
export const ORANGE = "#ec9850";
export const ORANGE_LIGHT = "#f4b47a";
export const SHADOW = "#e3e7e9";
const LINE = 2.5;

// Mascot colours, sampled from the mascot artwork.
const BOX = "#e9964b";
const LID = "#efa663";
export const BOX_SHADE = "#d9853d";

/* ------------------------------------------------------------------ drawing ------------------------------------------------------------------ */

/** The real Vanforces mark (pin and slash), at its own 285 x 264 size. */
export function LogoMark({ x, y, size }: { x: number; y: number; size: number }) {
  const s = size / 285;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M172.4 30.3C189.2 1.5 226.3 -8.2 254.9 8.8C283.3 25.4 293.1 61.8 277 90.5L194.9 232.8C178.3 261.7 141.4 271.6 112.5 255C83.6001 238.4 73.7 201.5 90.3 172.6L172.4 30.3Z"
        fill="#293B47"
      />
      <path
        d="M68.3 0.5C65.9 0.2 63.4 0 60.8 0C58.3 0 55.8 0.1 53.4 0.5C23.3 4.2 0 29.8 0 60.8V61C0 72.5 3.30002 83.8 9.40002 93.5L60.8 180.8L112.3 93.5C118.5 83.8 121.7 72.5 121.7 60.9C121.7 29.7 98.4 4.1 68.3 0.5ZM60.8 82.2C48.4 82.2 38.2 72 38.2 59.6C38.2 47.2 48.4 37 60.8 37C73.2 37 83.4 47.1 83.4 59.6C83.4 72.1 73.2 82.2 60.8 82.2Z"
        fill="#1CB2BB"
      />
    </g>
  );
}

export type Pose = "carry" | "tablet" | "cup" | "point" | "wave";

const outline = { stroke: NAVY, strokeWidth: 2.2, vectorEffect: "non-scaling-stroke" as const, strokeLinejoin: "round" as const };
const limb = { stroke: NAVY, strokeWidth: 3, vectorEffect: "non-scaling-stroke" as const, strokeLinecap: "round" as const, fill: "none" };

function Glove({ d }: { d: string }) {
  return <path d={d} fill="#fff" {...outline} />;
}

const MASCOT_HEIGHT = 72;
const MS = MASCOT_HEIGHT / 560;

/**
 * The box mascot, traced from the brand artwork. Drawn around the ground point between its feet, so a parent group can
 * move it, mirror it, and bob it.
 */
export function Mascot({ pose, cartonRef }: { pose: Pose; cartonRef?: Ref<SVGGElement> }) {
  return (
    <g transform={`scale(${MS}) translate(-415 -556)`}>
      <ellipse cx="415" cy="556" rx="270" ry="20" fill="#e9ecee" />
      <g data-leg="l">
        <path d="M338 372 L330 482" {...limb} />
        <path d="M232 520 C230 488 262 470 300 474 C340 478 372 492 372 518 C372 540 330 548 296 546 C258 544 234 538 232 520 Z" fill={TEAL} {...outline} />
        <path d="M262 498 C276 486 300 484 318 488" stroke="#6fd3d9" strokeWidth="2" vectorEffect="non-scaling-stroke" fill="none" strokeLinecap="round" />
      </g>
      <g data-leg="r">
        <path d="M490 372 L497 482" {...limb} />
        <path d="M458 518 C458 492 490 478 530 474 C568 470 600 488 598 520 C596 538 572 544 534 546 C500 548 458 540 458 518 Z" fill={TEAL} {...outline} />
        <path d="M492 494 C510 484 534 482 552 488" stroke="#6fd3d9" strokeWidth="2" vectorEffect="non-scaling-stroke" fill="none" strokeLinecap="round" />
      </g>
      <path d="M168 228 C140 262 122 292 112 322" {...limb} />
      <Glove d="M110 318 C85 312 55 330 50 360 C42 395 55 435 85 445 C105 452 125 440 128 420 C150 410 152 380 135 370 C140 345 130 325 110 318 Z" />
      <path d="M162 138 H658 V352 C658 364 650 372 638 372 H182 C170 372 162 364 162 352 Z" fill={BOX} {...outline} />
      <rect x="164" y="140" width="492" height="24" fill={BOX_SHADE} opacity="0.55" />
      <rect x="214" y="312" width="74" height="40" rx="8" fill={BOX_SHADE} opacity="0.45" />
      <path d="M160 6 H654 C670 6 678 14 680 28 L688 120 C689 132 682 138 670 138 H150 C138 138 131 132 132 120 L140 28 C142 14 150 6 160 6 Z" fill={LID} {...outline} />
      <path d="M620 18 C640 18 652 26 654 44 L658 92" stroke="#f6c595" strokeWidth="3" vectorEffect="non-scaling-stroke" fill="none" strokeLinecap="round" />
      <circle cx="342" cy="198" r="27" fill={NAVY} />
      <circle cx="472" cy="198" r="27" fill={NAVY} />
      <circle cx="334" cy="189" r="8" fill="#fff" />
      <circle cx="464" cy="189" r="8" fill="#fff" />
      <path d="M362 268 H462 C462 300 440 320 412 320 C384 320 362 300 362 268 Z" fill={NAVY} />
      <path d="M392 312 C398 299 426 299 432 312 C423 321 401 321 392 312 Z" fill="#f0705e" />
      {pose === "carry" ? (
        <g>
          <g ref={cartonRef}>
            <rect x="690" y="170" width="190" height="160" rx="12" fill={LID} {...outline} />
            <path d="M785 170 V236" stroke={BOX_SHADE} strokeWidth="2.4" vectorEffect="non-scaling-stroke" />
          </g>
          <path d="M652 258 C674 262 690 262 706 258" {...limb} />
          <Glove d="M700 226 C686 222 668 236 668 256 C668 280 688 294 708 290 C730 286 742 266 736 246 C732 232 716 224 700 226 Z" />
        </g>
      ) : pose === "point" ? (
        <g>
          <path d="M652 244 C700 236 740 216 774 196" {...limb} />
          <Glove d="M768 196 C752 184 758 160 776 156 C794 152 812 164 814 182 C816 200 796 214 780 210 C774 208 770 202 768 196 Z" />
        </g>
      ) : pose === "wave" ? (
        <g>
          <path d="M652 238 C700 225 735 195 768 150" {...limb} />
          <Glove d="M760 150 C745 120 748 75 770 60 C778 40 800 38 806 58 C820 45 842 52 838 78 C850 92 846 120 826 138 C810 160 778 165 760 150 Z" />
        </g>
      ) : pose === "cup" ? (
        <g>
          <path d="M652 252 C684 252 704 240 722 226" {...limb} />
          <rect x="728" y="176" width="74" height="66" rx="10" fill="#fff" {...outline} />
          <path d="M802 192 C826 192 826 226 802 226" fill="none" stroke={NAVY} strokeWidth="2.2" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
          <rect x="736" y="184" width="58" height="14" rx="5" fill={BOX_SHADE} opacity="0.7" />
          <g className="vg-steam">
            <path d="M752 166 C744 152 760 146 752 132 M776 166 C768 152 784 146 776 132" fill="none" stroke="#9fb0ba" strokeWidth="2.4" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
          </g>
          <Glove d="M714 214 C698 212 684 226 686 246 C688 266 708 276 726 270 C744 264 752 246 746 230 C742 220 728 214 714 214 Z" />
        </g>
      ) : (
        <g>
          <path d="M652 252 C684 252 704 240 722 226" {...limb} />
          <rect x="708" y="80" width="128" height="178" rx="18" fill="#fff" {...outline} />
          <rect x="726" y="104" width="92" height="110" rx="6" fill={TEAL_LIGHT} />
          <path d="M740 130 H804 M740 156 H792 M740 182 H804" stroke={TEAL} strokeWidth="2.6" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
          <Glove d="M712 196 C696 194 680 210 682 230 C684 252 704 264 724 258 C744 252 752 232 746 214 C740 202 726 196 712 196 Z" />
        </g>
      )}
    </g>
  );
}

export function Carton({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="2" fill={ORANGE_LIGHT} stroke={NAVY} strokeWidth="2" />
      <path d={`M${x + w / 2} ${y} V${y + h / 2.6}`} stroke={BOX_SHADE} strokeWidth="2" />
      <path d={`M${x + 5} ${y + h - 5} V${y + h - 11} M${x + 3} ${y + h - 9} L${x + 5} ${y + h - 11} L${x + 7} ${y + h - 9}`} stroke={BOX_SHADE} strokeWidth="1.2" fill="none" />
    </g>
  );
}

export function Warehouse({ x, y, doorRef }: { x: number; y: number; doorRef: Ref<SVGGElement> }) {
  const slats = Array.from({ length: 7 }, (_, i) => -64 + i * 9);
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="110" cy="2" rx="120" ry="5" fill={SHADOW} />
      <rect x="0" y="-104" width="210" height="104" fill="#fff" stroke={NAVY} strokeWidth={LINE} />
      <rect x="-8" y="-116" width="226" height="13" rx="4" fill={TEAL} stroke={NAVY} strokeWidth={LINE} />
      <rect x="22" y="-92" width="166" height="9" rx="4.5" fill={TEAL_LIGHT} stroke={NAVY} strokeWidth="1.6" />
      <rect x="62" y="-72" width="86" height="72" fill="#cfdadf" />
      <Carton x={72} y={-26} w={26} h={26} />
      <Carton x={104} y={-20} w={22} h={20} />
      <Carton x={112} y={-40} w={18} h={20} />
      <clipPath id="door-clip">
        <rect x="62" y="-72" width="86" height="72" />
      </clipPath>
      <g clipPath="url(#door-clip)">
        <g ref={doorRef}>
          <rect x="62" y="-72" width="86" height="72" fill="#f4f7f8" />
          {slats.map((sy) => (
            <path key={sy} d={`M64 ${sy} H146`} stroke="#c9d4d9" strokeWidth="1.6" />
          ))}
          <rect x="96" y="-10" width="18" height="6" rx="3" fill="#fff" stroke={NAVY} strokeWidth="1.4" />
        </g>
      </g>
      <rect x="62" y="-72" width="86" height="72" fill="none" stroke={NAVY} strokeWidth="2" />
      <Carton x={8} y={-30} w={34} h={30} />
      <Carton x={12} y={-54} w={26} h={24} />
    </g>
  );
}

export function Shop({ x, y, plantRef, doorRef }: { x: number; y: number; plantRef: Ref<SVGGElement>; doorRef: Ref<SVGGElement> }) {
  const stripes = Array.from({ length: 7 }, (_, i) => i);
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="88" cy="2" rx="100" ry="5" fill={SHADOW} />
      <rect x="0" y="-98" width="176" height="98" fill="#fff" stroke={NAVY} strokeWidth={LINE} />
      <rect x="-10" y="-122" width="196" height="10" rx="4" fill={NAVY} />
      {stripes.map((i) => (
        <g key={i}>
          <rect x={-6 + i * 27} y="-112" width="27" height="18" fill={i % 2 === 0 ? TEAL : "#fff"} />
          <path d={`M${-6 + i * 27} -94 a13.5 9 0 0 0 27 0`} fill={i % 2 === 0 ? TEAL : "#fff"} stroke={NAVY} strokeWidth="2" />
        </g>
      ))}
      <rect x="-6" y="-112" width="189" height="18" fill="none" stroke={NAVY} strokeWidth="2" />
      <rect x="16" y="-72" width="74" height="44" rx="2" fill={TEAL_LIGHT} stroke={NAVY} strokeWidth="2" />
      <path d="M16 -50 H90" stroke={NAVY} strokeWidth="1.5" />
      {[24, 36, 48, 60, 72].map((sx, i) => (
        <rect key={sx} x={sx} y={i % 2 ? -62 : -64} width="8" height={i % 2 ? 12 : 14} rx="1.5" fill={i % 2 ? ORANGE : TEAL} />
      ))}
      <rect x="110" y="-66" width="44" height="66" rx="2" fill="#cfdadf" stroke={NAVY} strokeWidth="2" />
      <rect x="116" y="-30" width="32" height="30" fill="#bccbd2" />
      <g ref={doorRef}>
        <rect x="110" y="-66" width="44" height="66" rx="2" fill="#fff" stroke={NAVY} strokeWidth="2" />
        <rect x="117" y="-58" width="30" height="24" rx="2" fill={TEAL_LIGHT} stroke={NAVY} strokeWidth="1.5" />
        <rect x="121" y="-52" width="22" height="9" rx="2" fill="#fff" stroke={NAVY} strokeWidth="1.2" />
        <circle cx="146" cy="-28" r="2" fill={NAVY} />
      </g>
      {/* Plant, on the left of the shop so the salesman has room by the door */}
      <g transform="translate(-34 0)">
        <path d="M5 0 L1 -18 H19 L15 0 Z" fill="#fff" stroke={NAVY} strokeWidth="2" strokeLinejoin="round" />
        <g ref={plantRef}>
          <path d="M10 -18 C3 -32 -3 -40 -5 -52 C5 -46 10 -34 10 -18 M10 -18 C15 -34 23 -44 29 -50 C29 -38 19 -28 10 -18" fill={TEAL} stroke={NAVY} strokeWidth="1.6" strokeLinejoin="round" />
        </g>
      </g>
    </g>
  );
}

export function Office({ x, y, barsRef, glowRef }: { x: number; y: number; barsRef: Ref<SVGGElement>; glowRef: Ref<SVGGElement> }) {
  const windows = [
    [18, -112],
    [62, -112],
    [106, -112],
    [18, -74],
    [106, -74],
  ];
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="80" cy="2" rx="92" ry="5" fill={SHADOW} />
      <rect x="0" y="-130" width="156" height="130" fill="#fff" stroke={NAVY} strokeWidth={LINE} />
      <rect x="-8" y="-140" width="172" height="11" rx="4" fill={NAVY} />
      {windows.map(([wx, wy]) => (
        <rect key={`${wx}${wy}`} x={wx} y={wy} width="32" height="26" rx="2" fill={TEAL_LIGHT} stroke={NAVY} strokeWidth="1.8" />
      ))}
      <g ref={glowRef} style={{ opacity: 0 }}>
        {windows.map(([wx, wy]) => (
          <rect key={`g${wx}${wy}`} x={wx + 1.5} y={wy + 1.5} width="29" height="23" rx="1.5" fill="#fff7d6" />
        ))}
      </g>
      <rect x="62" y="-74" width="32" height="26" rx="2" fill="#fff" stroke={NAVY} strokeWidth="1.8" />
      <g ref={barsRef}>
        <rect x="67" y="-60" width="5" height="8" fill={TEAL} />
        <rect x="75" y="-65" width="5" height="13" fill={ORANGE} />
        <rect x="83" y="-69" width="5" height="17" fill={TEAL} />
      </g>
      <rect x="60" y="-40" width="36" height="40" rx="2" fill="#fff" stroke={NAVY} strokeWidth="2" />
      <path d="M78 -40 V0" stroke={NAVY} strokeWidth="1.5" />
      <rect x="57" y="-166" width="42" height="24" rx="6" fill="#fff" stroke={NAVY} strokeWidth="1.8" />
      <LogoMark x={67} y={-162} size={22} />
    </g>
  );
}

export function Tree({ x, y, s = 1, swayRef }: { x: number; y: number; s?: number; swayRef: Ref<SVGGElement> }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="2" rx="16" ry="3" fill={SHADOW} />
      <g ref={swayRef}>
        <path d="M0 0 V-26" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="0" cy="-42" r="18" fill={TEAL_LIGHT} stroke={NAVY} strokeWidth="2" />
        <path d="M0 -26 L-7 -34 M0 -32 L6 -40" stroke={NAVY} strokeWidth="1.6" strokeLinecap="round" />
      </g>
    </g>
  );
}

/** The van. The body and the two wheels are separate, so the body can bob and the wheels can turn. */
export function Van({ bodyRef, wheelRefs }: { bodyRef: Ref<SVGGElement>; wheelRefs: Ref<SVGGElement>[] }) {
  return (
    <g>
      <ellipse cx="78" cy="2" rx="82" ry="5" fill={SHADOW} />
      <g ref={bodyRef}>
        <rect x="0" y="-80" width="100" height="66" rx="6" fill={ORANGE} />
        <rect x="0" y="-32" width="100" height="18" fill="#fff" />
        <rect x="0" y="-80" width="100" height="66" rx="6" fill="none" stroke={NAVY} strokeWidth={LINE} />
        <path d="M0 -32 H100" stroke={NAVY} strokeWidth={LINE} />
        <path d="M8 -72 V-40" stroke="#f6c595" strokeWidth="3" strokeLinecap="round" />
        <rect x="33" y="-73" width="38" height="34" rx="8" fill="#fff" stroke={NAVY} strokeWidth="1.8" />
        <LogoMark x={38.5} y={-67.5} size={27} />
        <path d="M100 -14 V-60 H124 C137 -60 149 -48 151 -35 L153 -26 V-14 Z" fill={TEAL} stroke={NAVY} strokeWidth={LINE} strokeLinejoin="round" />
        <path d="M108 -53 H122 C130 -53 138 -45 140 -37 H108 Z" fill="#fff" stroke={NAVY} strokeWidth="2" strokeLinejoin="round" />
        <path d="M112 -24 H122" stroke={NAVY} strokeWidth="2" strokeLinecap="round" />
        <circle cx="149" cy="-22" r="2.6" fill={ORANGE_LIGHT} stroke={NAVY} strokeWidth="1.4" />
      </g>
      {[28, 124].map((cx, index) => (
        <g key={cx} transform={`translate(${cx} -12)`}>
          <g ref={wheelRefs[index]}>
            <circle r="12.5" fill={NAVY} />
            <circle r="5.5" fill="#e9ecee" />
            <path d="M0 -5.5 V5.5 M-5.5 0 H5.5" stroke={NAVY} strokeWidth="1.4" />
          </g>
        </g>
      ))}
    </g>
  );
}

const chipWidth = (text: string) => 46 + text.length * 7.6;

/** A small status label with a pointer underneath, like the chips on vanforces.com. Drawn at the origin. */
function Chip({ text, tone = TEAL }: { text: string; tone?: string }) {
  const width = chipWidth(text);
  return (
    <g>
      <rect x="0" y="0" width={width} height="30" rx="15" fill="#fff" stroke="#d5e0e4" strokeWidth="1.5" />
      <circle cx="16" cy="15" r="9" fill={tone} />
      <path d="M12 15.2 L15 18 L20.4 12.4" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="32" y="19.6" fontSize="13.5" fontWeight="600" fill={NAVY}>
        {text}
      </text>
      <path d={`M${width / 2 - 5} 30 L${width / 2} 36 L${width / 2 + 5} 30`} fill="#fff" stroke="#d5e0e4" strokeWidth="1.5" strokeLinejoin="round" />
      <path d={`M${width / 2 - 4} 29 H${width / 2 + 4}`} stroke="#fff" strokeWidth="2.5" />
    </g>
  );
}

/* ------------------------------------------------------------------ motion ------------------------------------------------------------------ */

const LOOP = 18;
const GROUND = 198;
const ROAD = 230;
/** Where the loop begins when the page first draws: the van loading at the warehouse. Also the still picture. */
const START = 2.6;
const STILL = 9.4;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const inOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const outBack = (t: number) => 1 + 2.4 * Math.pow(t - 1, 3) + 1.4 * Math.pow(t - 1, 2);
const seg = (t: number, a: number, b: number) => inOut(clamp01((t - a) / (b - a)));
/** 0 → 1 → 0: in over `fade` seconds from `a`, out over `fade` seconds before `b`. */
const window01 = (t: number, a: number, b: number, fade = 0.35) => Math.min(clamp01((t - a) / fade), clamp01((b - t) / fade));

// The van's stops along the road (the x of its back end).
const VAN = { offLeft: -190, warehouse: 322, shop: 772, office: 958, offRight: 1270 };

function vanX(t: number) {
  if (t < 1.6) return VAN.offLeft + (VAN.warehouse - VAN.offLeft) * seg(t, 0, 1.6);
  if (t < 4.0) return VAN.warehouse;
  if (t < 6.8) return VAN.warehouse + (VAN.shop - VAN.warehouse) * seg(t, 4.0, 6.8);
  if (t < 11.0) return VAN.shop;
  if (t < 13.6) return VAN.shop + (VAN.office - VAN.shop) * seg(t, 11.0, 13.6);
  if (t < 16.0) return VAN.office;
  return VAN.office + (VAN.offRight - VAN.office) * seg(t, 16.0, 18.0);
}

type ChipSpec = { text: string; tone?: string; cx: number; y: number; from: number; to: number };
const chips: ChipSpec[] = [
  { text: "Stock loaded", cx: 300, y: 36, from: 2.2, to: 4.6 },
  { text: "Order taken", cx: 668, y: 22, from: 7.5, to: 9.2 },
  { text: "Payment collected", tone: ORANGE, cx: 668, y: 22, from: 9.2, to: 11.2 },
  { text: "Day settled", cx: 1038, y: -18, from: 14.0, to: 16.6 },
];

type Puff = { x: number; y: number; r: number; o: number };

type Frame = {
  van: string;
  vanBody: string;
  wheel: string;
  loader: string;
  loaderFlip: string;
  loaderLegs: [string, string];
  salesmanLegs: [string, string];
  puffs: Puff[];
  dash: number;
  warehouseDoor: string;
  shopDoor: string;
  carton: number;
  salesman: string;
  salesmanOpacity: number;
  chips: { transform: string; opacity: number }[];
  coin: string;
  coinOpacity: number;
  bars: string;
  glow: number;
};

const chipTransform = (spec: ChipSpec, k: number) => {
  const w = chipWidth(spec.text);
  return `translate(${spec.cx - w / 2} ${spec.y}) translate(${w / 2} 36) scale(${k.toFixed(3)}) translate(${-w / 2} -36)`;
};

/** Everything in the scene at loop time `t`. Pure, so the server and the first browser frame draw the same picture. */
function frame(t: number): Frame {
  const x = vanX(t);
  const speed = Math.abs(vanX(Math.min(LOOP, t + 0.04)) - x);
  const bob = speed > 0.05 ? Math.sin(t * 30) * Math.min(1, speed / 3) * 0.9 : 0;
  const wheelAngle = ((x - VAN.offLeft) / 12.5) * (180 / Math.PI);

  // The van's nose dips when it brakes and lifts when it pulls away.
  const vel = (tt: number) => (vanX(Math.min(LOOP, tt + 0.05)) - vanX(Math.max(0, tt - 0.05))) / 0.1;
  const accel = (vel(Math.min(LOOP, t + 0.1)) - vel(Math.max(0, t - 0.1))) / 0.2;
  const pitch = Math.max(-2.6, Math.min(2.6, -accel * 0.0018));

  // A little dust behind the wheels each time the van pulls away.
  const departures = [4.0, 11.0, 16.0];
  const puffs: Puff[] = [0, 1, 2].map((i) => {
    const d = departures.find((start) => t >= start && t < start + 1.4);
    if (d === undefined) return { x: 0, y: 0, r: 0, o: 0 };
    const p = clamp01((t - d - i * 0.12) / 0.9);
    if (p <= 0) return { x: 0, y: 0, r: 0, o: 0 };
    return { x: vanX(d) + 4 - p * 26 - i * 7, y: ROAD - 8 - p * 16 - i * 2, r: 3 + p * 8, o: 0.55 * (1 - p) };
  });

  // Loader: holds a carton at the warehouse, walks it to the van, hands it over, walks back.
  let lx = 228;
  let flip = 1;
  let walking = false;
  if (t >= 2.0 && t < 3.0) {
    lx = 228 + 62 * seg(t, 2.0, 3.0);
    walking = true;
  } else if (t >= 3.0 && t < 4.4) lx = 290;
  else if (t >= 4.4 && t < 5.6) {
    lx = 290 - 62 * seg(t, 4.4, 5.6);
    flip = -1;
    walking = true;
  }
  const loaderBob = walking ? -Math.abs(Math.sin(t * 13)) * 3 : 0;
  const loaderAmp = Math.max(window01(t, 2.0, 3.0, 0.12), window01(t, 4.4, 5.6, 0.12));
  const salesAmp = Math.max(window01(t, 7.0, 7.8, 0.12), window01(t, 10.3, 10.9, 0.12));
  const swing = Math.sin(t * 13) * 26;
  const squash = Math.sin(clamp01((t - 3.0) / 0.35) * Math.PI);
  const landing = Math.sin(clamp01((t - 9.4) / 0.22) * Math.PI);
  const loaderTilt = Math.sin(t * 13) * 1.8 * loaderAmp;
  const salesTilt = Math.sin(t * 13) * 1.8 * salesAmp;
  const carton = t < 3.0 ? (t < 0.6 ? clamp01(t / 0.6) : 1) : t < 3.2 ? 1 - clamp01((t - 3.0) / 0.2) : t > 16.5 ? clamp01((t - 16.5) / 0.6) : 0;

  // Salesman: steps out at the back of the van, walks to the shop door, and goes back when the visit is done.
  let sx = 772;
  let sOpacity = 0;
  let sWalk = false;
  if (t >= 7.0 && t < 7.8) {
    sx = 772 - 30 * seg(t, 7.0, 7.8);
    sOpacity = clamp01((t - 7.0) / 0.3);
    sWalk = true;
  } else if (t >= 7.8 && t < 10.3) {
    sx = 742;
    sOpacity = 1;
  } else if (t >= 10.3 && t < 10.9) {
    sx = 742 + 30 * seg(t, 10.3, 10.9);
    sOpacity = 1 - clamp01((t - 10.6) / 0.3);
    sWalk = true;
  }
  const sBob = sWalk ? -Math.abs(Math.sin(t * 13)) * 3 : 0;
  const sHop = t >= 9.2 && t < 9.6 ? -Math.sin(((t - 9.2) / 0.4) * Math.PI) * 6 : 0;

  // Coin rises from the salesman when the payment is collected.
  const coinP = clamp01((t - 9.25) / 1.0);
  const coinOpacity = t >= 9.25 && t < 10.25 ? Math.min(1, coinP * 4) * (1 - coinP) : 0;

  // Office: the chart grows and the windows warm up while the day is settled.
  const bars = t >= 13.8 && t < 16.8 ? 0.15 + 0.85 * outBack(clamp01((t - 13.8) / 0.9)) : 1;
  const glow = window01(t, 13.7, 16.2, 0.5) * 0.55;

  return {
    van: `translate(${x.toFixed(2)} ${ROAD})`,
    vanBody: `translate(0 ${bob.toFixed(2)}) rotate(${pitch.toFixed(2)} 76 -10)`,
    puffs,
    dash: (x * 0.45) % 26,
    warehouseDoor: `translate(0 ${(-(seg(t, 0.5, 1.4) - seg(t, 5.6, 6.5)) * 70).toFixed(2)})`,
    shopDoor: `translate(154 0) scale(${(1 - 0.72 * (seg(t, 7.0, 7.7) - seg(t, 10.4, 11.1))).toFixed(3)} 1) translate(-154 0)`,
    loaderLegs: [`rotate(${(swing * loaderAmp).toFixed(1)} 338 372)`, `rotate(${(-swing * loaderAmp).toFixed(1)} 490 372)`],
    salesmanLegs: [`rotate(${(swing * salesAmp).toFixed(1)} 338 372)`, `rotate(${(-swing * salesAmp).toFixed(1)} 490 372)`],
    wheel: `rotate(${wheelAngle.toFixed(1)})`,
    loader: `translate(${lx.toFixed(2)} ${(GROUND + 2 + loaderBob).toFixed(2)}) scale(${(1 + 0.05 * squash).toFixed(3)} ${(1 - 0.07 * squash).toFixed(3)})`,
    loaderFlip: `scale(${flip} 1) rotate(${loaderTilt.toFixed(2)})`,
    carton,
    salesman: `translate(${sx.toFixed(2)} ${(GROUND + 2 + sBob + sHop).toFixed(2)}) scale(${(-1 - 0.04 * landing).toFixed(3)} ${(1 - 0.06 * landing).toFixed(3)}) rotate(${salesTilt.toFixed(2)})`,
    salesmanOpacity: sOpacity,
    chips: chips.map((spec) => {
      const v = window01(t, spec.from, spec.to, 0.4);
      const k = 0.82 + 0.18 * outBack(clamp01((t - spec.from) / 0.45));
      return { transform: chipTransform(spec, Math.min(1.02, k)), opacity: v };
    }),
    coin: `translate(742 ${(118 - coinP * 34).toFixed(2)})`,
    coinOpacity,
    bars: `translate(0 -52) scale(1 ${bars.toFixed(3)}) translate(0 52)`,
    glow,
  };
}

/* ------------------------------------------------------------------ scene ------------------------------------------------------------------ */

/**
 * The van sales day at the bottom of the hero. It plays by itself, pauses while it is off screen, and stays still for
 * visitors who prefer less motion. On phones the scene is cropped to the warehouse, the road and the shop.
 */
export function VanSalesScene() {
  const boxRef = useRef<HTMLDivElement>(null);
  const vanRef = useRef<SVGGElement>(null);
  const vanBodyRef = useRef<SVGGElement>(null);
  const wheelA = useRef<SVGGElement>(null);
  const wheelB = useRef<SVGGElement>(null);
  const loaderRef = useRef<SVGGElement>(null);
  const loaderFlipRef = useRef<SVGGElement>(null);
  const cartonRef = useRef<SVGGElement>(null);
  const salesmanRef = useRef<SVGGElement>(null);
  const chipRefs = useRef<(SVGGElement | null)[]>([]);
  const coinRef = useRef<SVGGElement>(null);
  const barsRef = useRef<SVGGElement>(null);
  const glowRef = useRef<SVGGElement>(null);
  const warehouseDoor = useRef<SVGGElement>(null);
  const shopDoor = useRef<SVGGElement>(null);
  const dashRef = useRef<SVGPathElement>(null);
  const cloudRef = useRef<SVGGElement>(null);
  const puffRefs = useRef<(SVGCircleElement | null)[]>([]);
  const swayA = useRef<SVGGElement>(null);
  const swayB = useRef<SVGGElement>(null);
  const swayC = useRef<SVGGElement>(null);

  const first = frame(START);

  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let visible = false;
    let clock = START;
    let last = 0;
    let ambient = 0;

    const legsOf = (root: SVGGElement | null) => (root ? Array.from(root.querySelectorAll<SVGGElement>("[data-leg]")) : []);

    const apply = (f: Frame) => {
      warehouseDoor.current?.setAttribute("transform", f.warehouseDoor);
      shopDoor.current?.setAttribute("transform", f.shopDoor);
      dashRef.current?.setAttribute("stroke-dashoffset", f.dash.toFixed(2));
      f.puffs.forEach((puff, index) => {
        const el = puffRefs.current[index];
        if (!el) return;
        el.setAttribute("cx", puff.x.toFixed(1));
        el.setAttribute("cy", puff.y.toFixed(1));
        el.setAttribute("r", puff.r.toFixed(1));
        el.style.opacity = String(puff.o);
      });
      legsOf(loaderRef.current).forEach((leg, index) => leg.setAttribute("transform", f.loaderLegs[index === 0 ? 0 : 1]));
      legsOf(salesmanRef.current).forEach((leg, index) => leg.setAttribute("transform", f.salesmanLegs[index === 0 ? 0 : 1]));
      vanRef.current?.setAttribute("transform", f.van);
      vanBodyRef.current?.setAttribute("transform", f.vanBody);
      wheelA.current?.setAttribute("transform", f.wheel);
      wheelB.current?.setAttribute("transform", f.wheel);
      loaderRef.current?.setAttribute("transform", f.loader);
      loaderFlipRef.current?.setAttribute("transform", f.loaderFlip);
      if (cartonRef.current) cartonRef.current.style.opacity = String(f.carton);
      salesmanRef.current?.setAttribute("transform", f.salesman);
      if (salesmanRef.current) salesmanRef.current.style.opacity = String(f.salesmanOpacity);
      f.chips.forEach((chip, index) => {
        const el = chipRefs.current[index];
        if (!el) return;
        el.setAttribute("transform", chip.transform);
        el.style.opacity = String(chip.opacity);
      });
      coinRef.current?.setAttribute("transform", f.coin);
      if (coinRef.current) coinRef.current.style.opacity = String(f.coinOpacity);
      barsRef.current?.setAttribute("transform", f.bars);
      if (glowRef.current) glowRef.current.style.opacity = String(f.glow);
    };

    const sway = (seconds: number) => {
      cloudRef.current?.setAttribute("transform", `translate(${((seconds * 7) % 1500) - 160} 0)`);
      [swayA, swayB, swayC].forEach((ref, index) => {
        ref.current?.setAttribute("transform", `rotate(${(Math.sin(seconds * 0.9 + index * 1.7) * 2.2).toFixed(2)})`);
      });
    };

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 100) / 1000 : 0;
      last = now;
      clock = (clock + dt) % LOOP;
      ambient += dt;
      apply(frame(clock));
      sway(ambient);
      if (visible && !calm.matches) raf = requestAnimationFrame(tick);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      last = 0;
      if (calm.matches) apply(frame(STILL));
      else if (visible) raf = requestAnimationFrame(tick);
    };

    const box = boxRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        start();
      },
      { threshold: 0.05 },
    );
    if (box) observer.observe(box);
    calm.addEventListener("change", start);
    start();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      calm.removeEventListener("change", start);
    };
  }, []);

  const dots = [
    [330, 70],
    [470, 40],
    [860, 60],
    [1170, 90],
    [24, 120],
  ];

  return (
    <div ref={boxRef} className="overflow-hidden" aria-hidden="true">
      <svg viewBox="0 -24 1200 264" className="block h-auto w-[128%] max-w-none sm:w-full" role="presentation" fontFamily="inherit">
        <defs>
          <linearGradient id="road-fade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.06" stopColor="#fff" stopOpacity="1" />
            <stop offset="0.94" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="road-mask" maskUnits="userSpaceOnUse" x="0" y="-24" width="1200" height="264">
            <rect x="0" y="-24" width="1200" height="264" fill="url(#road-fade)" />
          </mask>
        </defs>

        <path d="M560 150 C560 90 640 66 700 78 C780 94 800 140 770 176 C744 206 600 210 572 186 C562 176 560 164 560 150 Z" fill={TEAL_LIGHT} opacity="0.7" />
        <circle cx="1000" cy="120" r="66" fill={TEAL_LIGHT} opacity="0.45" />
        {dots.map(([dx, dy]) => (
          <circle key={`${dx}-${dy}`} cx={dx} cy={dy} r="4" fill="#d5dde1" />
        ))}

        <g ref={cloudRef} transform="translate(300 0)">
          <path d="M0 34 q6 -14 22 -12 q8 -14 26 -6 q16 -4 20 10 q14 2 12 14 H-4 q-12 -2 -6 -14 Z" fill="#f3f7f9" stroke="#dde6ea" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M520 12 q6 -12 20 -10 q8 -12 22 -4 q14 -2 18 10 q12 2 10 12 H514 q-10 -2 -6 -12 Z" fill="#f3f7f9" stroke="#dde6ea" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M900 40 q6 -12 20 -10 q8 -12 22 -4 q14 -2 18 10 q12 2 10 12 H894 q-10 -2 -6 -12 Z" fill="#f3f7f9" stroke="#dde6ea" strokeWidth="1.5" strokeLinejoin="round" />
        </g>

        <g mask="url(#road-mask)">
          <path d="M0 202 H1200" stroke={NAVY} strokeWidth="2" />
          <path d="M0 234 H1200" stroke={NAVY} strokeWidth="2" />
          <path ref={dashRef} d="M-40 218 H1240" stroke="#9fb0ba" strokeWidth="2" strokeDasharray="14 12" strokeLinecap="round" />
        </g>

        <Warehouse x={52} y={GROUND} doorRef={warehouseDoor} />
        <Tree x={500} y={GROUND} s={0.9} swayRef={swayA} />
        <Shop x={580} y={GROUND} plantRef={swayB} doorRef={shopDoor} />
        <Office x={960} y={GROUND} barsRef={barsRef} glowRef={glowRef} />
        <Tree x={1150} y={GROUND} s={0.8} swayRef={swayC} />

        {/* Characters stand on the pavement, behind the road. */}
        <g ref={loaderRef} transform={first.loader}>
          <g ref={loaderFlipRef} transform={first.loaderFlip}>
            <Mascot pose="carry" cartonRef={cartonRef} />
          </g>
        </g>
        <g ref={salesmanRef} transform={first.salesman} style={{ opacity: first.salesmanOpacity }}>
          <Mascot pose="tablet" />
        </g>

        <g ref={coinRef} transform={first.coin} style={{ opacity: first.coinOpacity }}>
          <circle r="9" fill={ORANGE} stroke={NAVY} strokeWidth="1.8" />
          <circle r="5" fill="none" stroke="#fff" strokeWidth="1.6" />
        </g>

        {[0, 1, 2].map((index) => (
          <circle
            key={index}
            ref={(node) => {
              puffRefs.current[index] = node;
            }}
            cx={first.puffs[index].x}
            cy={first.puffs[index].y}
            r={first.puffs[index].r}
            fill="#dfe6ea"
            style={{ opacity: first.puffs[index].o }}
          />
        ))}

        <g mask="url(#road-mask)">
          <g ref={vanRef} transform={first.van}>
            <Van bodyRef={vanBodyRef} wheelRefs={[wheelA, wheelB]} />
          </g>
        </g>

        {chips.map((spec, index) => (
          <g
            key={spec.text}
            ref={(node) => {
              chipRefs.current[index] = node;
            }}
            transform={first.chips[index].transform}
            style={{ opacity: first.chips[index].opacity }}
          >
            <Chip text={spec.text} tone={spec.tone} />
          </g>
        ))}
      </svg>
    </div>
  );
}

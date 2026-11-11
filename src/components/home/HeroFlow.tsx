"use client";

import { useEffect, useRef } from "react";

/* One broad, curved ribbon of colour that sweeps through the hero from the top and back out through the top.
   Its centre line is a cubic Bezier curve whose four points glide through a series of poses:
     0. waiting above the screen
     1. a diagonal that enters from the upper left, lower edge first
     2. the diagonal sweeping down and starting to bend
     3. a broad, shallow U: both sides high, the middle dipping low
     4. the bend opening out and rising, the left side lifting first so the ribbon leaves toward the upper right
     5. gone, above the top edge
   Between poses every point moves on one smooth path (a Catmull-Rom spline), so the whole band bends as one piece and
   keeps travelling. The colour field is measured from the curve itself and is lopsided: the edge on the lower side of the
   curve is more concentrated, and the opposite edge fades out two to three times more slowly. Both edges follow the curve
   as it bends. After pose 5 the ribbon is completely off screen, so the loop restarts at pose 0 with no visible jump.
   Colour, strength, blur and overall width are the same as before. */
const GRID_W = 72;
const GRID_H = 36;
/** Width of the grid compared with its height. The ribbon is drawn in these units. */
const ASPECT = GRID_W / GRID_H;

/** Seconds for one full pass of the ribbon, from above the screen, through the hero and out through the top again. */
const CYCLE = 30;
/** Where in the cycle the page starts: the ribbon is already moving and just entering from the top. */
const START_SECONDS = 3.5;
/** The still frame for visitors who prefer reduced motion: the wide U. */
const STILL_SECONDS = (CYCLE * 3) / 5;

type Pose = {
  /** The four points of the centre line: x runs 0 to ASPECT, y runs 0 (top) to 1 (bottom). */
  p: [number, number, number, number, number, number, number, number];
  /** Half the ribbon's width where it is broadest, as a share of the screen height. */
  half: number;
};

const POSES: Pose[] = [
  { p: [-0.4, -0.1, 0.5, -0.45, 1.5, -0.9, 2.4, -1.3], half: 0.3 },
  { p: [-0.4, 0.6, 0.5, 0.35, 1.5, -0.2, 2.4, -0.7], half: 0.3 },
  { p: [-0.4, 0.95, 0.5, 0.85, 1.5, 0.35, 2.4, -0.25], half: 0.31 },
  { p: [-0.4, 0.25, 0.5, 0.8, 1.5, 0.8, 2.4, 0.25], half: 0.31 },
  { p: [-0.4, -0.35, 0.5, 0.25, 1.5, 0.4, 2.4, 0.0], half: 0.3 },
  { p: [-0.4, -1.0, 0.5, -0.6, 1.5, -0.5, 2.4, -0.9], half: 0.3 },
];

const SAMPLES = 40;

/** How far each side of the curve reaches, compared with the ribbon's average half width. Their average is about 1, so the
   overall width stays as before, and the soft side is roughly two and a half times broader than the concentrated side. */
/** Makes up for the slight narrowing where the band turns, so the average width stays as before. */
const TWIST_WIDTH = 1.07;

/* The ribbon's cross-section, measured across it from the soft (upper) side to the concentrated (lower) side, in units of
   the ribbon's half width. Strength rises slowly through a broad, nearly transparent fade, peaks just past the centre line
   toward the lower side, then falls away over a much shorter distance. Values are shares of the maximum strength. */
const SOFT_EDGE = -1.2;
const PEAK = 0.1;
const FIRM_EDGE = 0.5;
const SOFT_STOPS = [0, 0.05, 0.12, 0.25, 0.45, 0.75, 1];
const FIRM_STOPS = [1, 0.55, 0.15, 0];

/** How deep the colour is at the last point measured: -1 lighter cyan, 0 as before, 1 deeper teal. Set by strengthAt. */
let tone = 0;

const MAX_ALPHA = 0.6;
const SCALE = 0.5;

/** Smoothly reads a list of strengths spaced evenly from `from` to `to`, at position `at`. */
function readStops(stops: number[], from: number, to: number, at: number) {
  const last = stops.length - 1;
  const s = Math.min(last, Math.max(0, ((at - from) / (to - from)) * last));
  const i = Math.min(last - 1, Math.floor(s));
  const f = s - i;
  const value = spline(stops[Math.max(0, i - 1)], stops[i], stops[i + 1], stops[Math.min(last, i + 2)], f);
  return Math.min(1, Math.max(0, value));
}

const LIGHT = [170, 232, 236];
const TEAL = [28, 178, 187];

const TAU = Math.PI * 2;

/** Smooth curve through four neighbouring poses, so the movement never stops or kinks at a pose. */
function spline(a: number, b: number, c: number, d: number, t: number) {
  const t2 = t * t;
  const t3 = t2 * t;
  return 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
}

const centre = new Float32Array((SAMPLES + 1) * 2);
const control = new Float32Array(8);

/** Fills `centre` with points along the ribbon's centre line for time t, and returns the ribbon's half width. */
function buildRibbon(t: number) {
  const s = ((t / CYCLE) % 1) * (POSES.length - 1);
  const i = Math.min(POSES.length - 2, Math.floor(s));
  const f = s - i;
  const a = POSES[Math.max(0, i - 1)];
  const b = POSES[i];
  const c = POSES[i + 1];
  const d = POSES[Math.min(POSES.length - 1, i + 2)];
  for (let k = 0; k < 8; k++) control[k] = spline(a.p[k], b.p[k], c.p[k], d.p[k], f);
  const half = spline(a.half, b.half, c.half, d.half, f);
  const [x0, y0, x1, y1, x2, y2, x3, y3] = control;
  for (let n = 0; n <= SAMPLES; n++) {
    const u = n / SAMPLES;
    const v = 1 - u;
    const w0 = v * v * v;
    const w1 = 3 * v * v * u;
    const w2 = 3 * v * u * u;
    const w3 = u * u * u;
    centre[n * 2] = w0 * x0 + w1 * x1 + w2 * x2 + w3 * x3;
    centre[n * 2 + 1] = w0 * y0 + w1 * y1 + w2 * y2 + w3 * y3;
  }
  return half;
}

/** Strength (0 to 1) of the ribbon at a point: strongest on the centre line, fading smoothly to nothing at its edges. */
function strengthAt(x: number, y: number, half: number, phase: number) {
  let best = Infinity;
  let bestU = 0;
  let side = 0;
  for (let n = 0; n < SAMPLES; n++) {
    const ax = centre[n * 2];
    const ay = centre[n * 2 + 1];
    const bx = centre[n * 2 + 2];
    const by = centre[n * 2 + 3];
    const dx = bx - ax;
    const dy = by - ay;
    const len2 = dx * dx + dy * dy;
    let q = len2 > 0 ? ((x - ax) * dx + (y - ay) * dy) / len2 : 0;
    q = q < 0 ? 0 : q > 1 ? 1 : q;
    const ex = x - (ax + dx * q);
    const ey = y - (ay + dy * q);
    const d2 = ex * ex + ey * ey;
    if (d2 < best) {
      best = d2;
      bestU = (n + q) / SAMPLES;
      // Which side of the curve the point is on. The curve always runs left to right, so this is the same side all along it.
      side = dx * ey - dy * ex;
    }
  }
  // Twist: a slow value from -1 to 1 that travels along the ribbon. Where it is near 0 the band faces the viewer and
  // shows its full, lighter body; toward -1 or 1 the band turns and looks a little narrower and denser.
  const twist = Math.sin(TAU * bestU * 0.85 - phase + 0.6);
  const turn = twist * twist;
  // The width swells and narrows a little along the ribbon, and the swelling slowly travels along it. The twist narrows
  // it slightly more where the band turns away; TWIST_WIDTH keeps the average width as before.
  const width = half * TWIST_WIDTH * (1 + 0.1 * Math.sin(TAU * bestU * 1.3 - phase * 2)) * (1 - 0.14 * turn);
  // Signed position across the ribbon: negative on the upper (soft) side, positive on the lower (concentrated) side.
  // The side is measured from the curve itself, so the shading turns with the ribbon as it bends.
  const across = (side >= 0 ? 1 : -1) * (Math.sqrt(best) / width);
  tone = 0;
  if (across <= SOFT_EDGE || across >= FIRM_EDGE) return 0;
  // Colour sits a touch deeper toward the concentrated side and lighter on the soft side, within the same colour range.
  tone = Math.max(-1, Math.min(1, (across - PEAK) * 1.2));
  return across < PEAK ? readStops(SOFT_STOPS, SOFT_EDGE, PEAK, across) : readStops(FIRM_STOPS, PEAK, FIRM_EDGE, across);
}

export function HeroFlow({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let visible = true;
    let raf = 0;
    let last = 0;
    let w = 2;
    let h = 2;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const low = document.createElement("canvas");
    low.width = GRID_W;
    low.height = GRID_H;
    const lowCtx = low.getContext("2d");
    const mid = document.createElement("canvas");
    mid.width = GRID_W * 4;
    mid.height = GRID_H * 4;
    const midCtx = mid.getContext("2d");
    if (!lowCtx || !midCtx) return;
    const image = lowCtx.createImageData(GRID_W, GRID_H);

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      w = Math.max(2, Math.round(box.width * SCALE));
      h = Math.max(2, Math.round(box.height * SCALE));
      canvas.width = w;
      canvas.height = h;
    };

    const draw = (seconds: number) => {
      const half = buildRibbon(seconds);
      const phase = (TAU * seconds) / CYCLE;
      const px = image.data;
      for (let gy = 0; gy < GRID_H; gy++) {
        const y = (gy + 0.5) / GRID_H;
        for (let gx = 0; gx < GRID_W; gx++) {
          const x = ((gx + 0.5) / GRID_W) * ASPECT;
          // Strength from the cross-section, as a share of the maximum. Used directly, so the faint soft side stays visible.
          const a = strengthAt(x, y, half, phase);
          const k = (gy * GRID_W + gx) * 4;
          // Colour depth from the form shading, kept within the same light-to-teal range as before.
          const m = Math.min(1, a * 1.25 * (1 + 0.18 * tone));
          px[k] = LIGHT[0] + (TEAL[0] - LIGHT[0]) * m;
          px[k + 1] = LIGHT[1] + (TEAL[1] - LIGHT[1]) * m;
          px[k + 2] = LIGHT[2] + (TEAL[2] - LIGHT[2]) * m;
          px[k + 3] = 255 * MAX_ALPHA * a;
        }
      }
      lowCtx.putImageData(image, 0, 0);
      // Two soft enlargements, so the edges stay smooth. The sides are trimmed to suit tall or narrow screens.
      midCtx.imageSmoothingEnabled = true;
      midCtx.imageSmoothingQuality = "high";
      midCtx.clearRect(0, 0, mid.width, mid.height);
      midCtx.drawImage(low, 0, 0, mid.width, mid.height);
      const aspect = w / h;
      const srcW = Math.min(mid.width, Math.max(mid.height * aspect, mid.width * 0.5));
      const sx = (mid.width - srcW) / 2;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(mid, sx, 0, srcW, mid.height, 0, 0, w, h);
      canvas.style.opacity = "1";
    };

    resize();
    if (reduced) {
      draw(STILL_SECONDS);
    } else {
      // The clock only runs while the ribbon is on screen, so it carries on from where it stopped.
      let clock = START_SECONDS;
      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        const step = last ? Math.min(0.1, (now - last) / 1000) : 0;
        last = now;
        if (!visible || document.hidden) return;
        clock += step;
        draw(clock);
      };
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(STILL_SECONDS);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} style={{ opacity: 0, transition: "opacity 1.2s ease" }} />;
}

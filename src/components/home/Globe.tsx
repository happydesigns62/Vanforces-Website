"use client";

import { useEffect, useRef } from "react";
import type { GeoPermissibleObjects } from "d3-geo";
import type { GeometryCollection, Topology } from "topojson-specification";

type Place = { name: string; id: string; lon: number; lat: number };

// In the order the globe visits them, so each glide is a short hop across the Gulf and then on to India.
const places: Place[] = [
  { name: "Saudi Arabia", id: "682", lon: 45, lat: 24 },
  { name: "Bahrain", id: "048", lon: 50.55, lat: 26.05 },
  { name: "UAE", id: "784", lon: 54.3, lat: 24 },
  { name: "Oman", id: "512", lon: 57, lat: 21 },
  { name: "India", id: "356", lon: 79, lat: 21 },
];

/** How long the globe rests on each country, and how long it takes to glide to the next one. */
const DWELL = 1500;
const GLIDE = 800;
/** How far above the middle of the globe the country sits, so it stays in the visible top part. */
const LIFT = 38;

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * A large globe, cut off by the bottom of its box. Every country we work in carries a small pulsing dot, so the full list is clear
 * at first glance. One country at a time is lit in the brand orange with a pin and its name, then the globe glides to the next:
 * Saudi Arabia, Bahrain, the UAE, Oman, India, and back to Saudi Arabia. The map code and data load only
 * when it comes near, and it stops while off screen. With reduced motion it stays still on the first country.
 */
export function Globe({ className = "" }: { className?: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!box || !canvas || !context) return;
    const ctx = context;
    const surface = canvas;
    const frame = box;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");

    let raf = 0;
    let visible = false;
    let cancelled = false;
    let width = 0;
    let height = 0;
    let clock = 0;
    let last = 0;
    let paint: ((now: number) => void) | null = null;

    function fit() {
      const rect = frame.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      surface.width = Math.round(width * ratio);
      surface.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      paint?.(performance.now());
    }

    function loop(now: number) {
      if (last) clock += Math.min(now - last, 1000);
      last = now;
      paint?.(now);
      if (visible && !calm.matches) raf = requestAnimationFrame(loop);
    }

    function wake() {
      cancelAnimationFrame(raf);
      last = 0;
      if (visible) raf = requestAnimationFrame(loop);
    }

    async function load() {
      const [d3, topo, data] = await Promise.all([import("d3-geo"), import("topojson-client"), import("world-atlas/countries-110m.json")]);
      if (cancelled) return;
      const world = data.default as unknown as Topology<{ countries: GeometryCollection; land: GeometryCollection }>;
      const land = topo.feature(world, world.objects.land) as GeoPermissibleObjects;
      const borders = topo.mesh(world, world.objects.countries, (a, b) => a !== b) as GeoPermissibleObjects;
      const countries = topo.feature(world, world.objects.countries).features;
      // Bahrain is too small to be in the 110m map, so it is drawn as a small disc on its position.
      const bahrain = d3.geoCircle().center([50.55, 26.05]).radius(0.34)();
      const lit = places.map((place) => countries.find((country) => String(country.id) === place.id) ?? (place.id === "048" ? bahrain : undefined));
      const projection = d3.geoOrthographic().clipAngle(90).precision(0.6);
      const path = d3.geoPath(projection, ctx);

      paint = (now: number) => {
        const step = DWELL + GLIDE;
        const index = Math.floor(clock / step) % places.length;
        const phase = clock % step;
        const gliding = phase > DWELL;
        const progress = gliding ? (phase - DWELL) / GLIDE : 0;
        const eased = ease(progress);
        const here = places[index];
        const next = places[(index + 1) % places.length];
        // The light passes to the next country halfway through the glide.
        const shownIndex = progress < 0.5 ? index : (index + 1) % places.length;
        const shown = places[shownIndex];

        // Going from India back to Saudi Arabia simply glides back across the same stretch of globe.
        const lon = here.lon + (next.lon - here.lon) * eased;
        const lat = here.lat + (next.lat - here.lat) * eased;

        const radius = Math.min(width * 0.72, 470);
        const cx = width / 2;
        const cy = 14 + radius;
        projection.translate([cx, cy]).scale(radius).rotate([-lon, -(lat - LIFT)]);

        ctx.clearRect(0, 0, width, height);

        const sea = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.55, radius * 0.1, cx, cy, radius);
        sea.addColorStop(0, "#2fc3cc");
        sea.addColorStop(1, "#0e7f86");
        ctx.beginPath();
        path({ type: "Sphere" });
        ctx.fillStyle = sea;
        ctx.fill();

        ctx.beginPath();
        path(land);
        ctx.fillStyle = "#e2f6f7";
        ctx.fill();

        ctx.beginPath();
        path(borders);
        ctx.strokeStyle = "rgb(14 127 134 / 0.38)";
        ctx.lineWidth = 0.7;
        ctx.stroke();

        const shape = lit[shownIndex];
        if (shape) {
          ctx.beginPath();
          path(shape);
          ctx.fillStyle = "#ec9850";
          ctx.fill();
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.beginPath();
        path({ type: "Sphere" });
        ctx.strokeStyle = "rgb(14 127 134 / 0.45)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // A small pulsing dot on every country we work in, so all of them show at first look.
        places.forEach((place, i) => {
          if (place === shown) return;
          const spot = projection([place.lon, place.lat]);
          if (!spot) return;
          if (!calm.matches) {
            const beat = ((now + i * 420) % 2200) / 2200;
            ctx.beginPath();
            ctx.arc(spot[0], spot[1], 4 + beat * 14, 0, Math.PI * 2);
            ctx.strokeStyle = `rgb(255 255 255 / ${(0.65 * (1 - beat)).toFixed(3)})`;
            ctx.lineWidth = 1.6;
            ctx.stroke();
          }
          ctx.beginPath();
          ctx.arc(spot[0], spot[1], 3.6, 0, Math.PI * 2);
          ctx.fillStyle = "#fff";
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = "#263a47";
          ctx.stroke();
        });

        const point = projection([shown.lon, shown.lat]);
        const chip = chipRef.current;
        if (point) {
          const [x, y] = point;
          if (!calm.matches) {
            const pulse = (now % 1800) / 1800;
            ctx.beginPath();
            ctx.arc(x, y, 6 + pulse * 22, 0, Math.PI * 2);
            ctx.strokeStyle = `rgb(255 255 255 / ${(0.8 * (1 - pulse)).toFixed(3)})`;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fillStyle = "#fff";
          ctx.fill();
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = "#263a47";
          ctx.stroke();

          if (chip) {
            if (chip.textContent !== shown.name) chip.textContent = shown.name;
            chip.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, calc(-100% - 16px))`;
            chip.style.opacity = gliding && progress < 0.85 ? "0" : "1";
          }
        }
      };

      fit();
      wake();
      if (calm.matches) paint(performance.now());
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) wake();
        else cancelAnimationFrame(raf);
      },
      { threshold: 0.1 },
    );
    const loader = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loader.disconnect();
          void load();
        }
      },
      { rootMargin: "600px 0px" },
    );
    const resize = new ResizeObserver(fit);

    observer.observe(frame);
    loader.observe(frame);
    resize.observe(frame);
    fit();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      loader.disconnect();
      resize.disconnect();
    };
  }, []);

  return (
    <div ref={boxRef} className={`relative overflow-hidden ${className}`}>
      <p className="sr-only">Vanforces works in Saudi Arabia, Bahrain, the UAE, Oman and India.</p>
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
      <div
        ref={chipRef}
        aria-hidden="true"
        style={{ opacity: 0 }}
        className="pointer-events-none absolute left-0 top-0 whitespace-nowrap rounded-full bg-navy-deep px-3.5 py-1.5 text-[13px] font-semibold text-white shadow-[0_10px_22px_-10px_rgb(8_20_30/0.7)] transition-opacity duration-300"
      />
    </div>
  );
}

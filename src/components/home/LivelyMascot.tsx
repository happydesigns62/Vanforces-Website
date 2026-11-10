"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Where the face sits on /art/mascot-wave.png (872 x 584). The original eyes and mouth are covered with a patch of the
// box colour, and a live face is drawn on top, so it can blink, look at the pointer and smile.
const BOX = "#e9964b";
const EYES = [
  { x: 343, y: 200 },
  { x: 473, y: 200 },
];
const LOOK = 9;

/**
 * The waving Vanforces box, made alive: it floats and breathes, blinks every few seconds, looks toward the pointer, and
 * smiles wider (with warmer cheeks) when the pointer is on it. With reduced motion it stays still, with the plain smile.
 */
export function LivelyMascot({ className = "" }: { className?: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const eyeRefs = useRef<(SVGGElement | null)[]>([]);
  const [blink, setBlink] = useState(false);
  const [happy, setHappy] = useState(false);
  const [calm, setCalm] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setCalm(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Blink at uneven intervals, so it never feels like a loop.
  useEffect(() => {
    if (calm) return;
    let timer = 0;
    const schedule = () => {
      timer = window.setTimeout(
        () => {
          setBlink(true);
          timer = window.setTimeout(() => {
            setBlink(false);
            schedule();
          }, 150);
        },
        2200 + Math.random() * 3200,
      );
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, [calm]);

  // The eyes follow the pointer anywhere on the page, a little.
  useEffect(() => {
    if (calm) return;
    let raf = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const box = frame.current?.getBoundingClientRect();
        if (!box) return;
        const dx = event.clientX - (box.left + box.width / 2);
        const dy = event.clientY - (box.top + box.height * 0.34);
        const length = Math.hypot(dx, dy) || 1;
        const pull = Math.min(1, length / 420);
        const x = (dx / length) * LOOK * pull;
        const y = (dy / length) * LOOK * 0.7 * pull;
        eyeRefs.current.forEach((eye) => {
          if (eye) eye.style.transform = `translate(${x}px, ${y}px)`;
        });
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, [calm]);

  return (
    <div
      ref={frame}
      onPointerEnter={() => setHappy(true)}
      onPointerLeave={() => setHappy(false)}
      className={`relative aspect-[872/584] ${className}`}
    >
      <div className="mascot-float h-full w-full">
        <Image src="/art/mascot-wave.png" alt="The Vanforces box mascot, smiling and waving." width={872} height={584} sizes="260px" priority className="h-full w-full select-none" draggable={false} />
        <svg viewBox="0 0 872 584" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full">
          <defs>
            <filter id="mascot-soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.2" />
            </filter>
          </defs>

          {/* Patches over the drawn eyes and mouth. */}
          <g fill={BOX} filter="url(#mascot-soft)">
            {EYES.map((eye) => (
              <circle key={eye.x} cx={eye.x} cy={eye.y} r="37" />
            ))}
            <ellipse cx="410" cy="286" rx="62" ry="40" />
          </g>

          {/* Cheeks. */}
          <g fill="#f0705e" style={{ opacity: happy ? 0.5 : 0.22, transition: "opacity 0.4s" }} filter="url(#mascot-soft)">
            <ellipse cx="292" cy="252" rx="22" ry="13" />
            <ellipse cx="530" cy="252" rx="22" ry="13" />
          </g>

          {/* Eyes. Each one blinks by flattening around its own centre. */}
          {EYES.map((eye, index) => (
            <g
              key={eye.x}
              ref={(node) => {
                eyeRefs.current[index] = node;
              }}
              style={{ transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)" }}
            >
              <g style={{ transformOrigin: `${eye.x}px ${eye.y}px`, transform: `scaleY(${blink ? 0.08 : 1})`, transition: "transform 0.07s ease-in" }}>
                <circle cx={eye.x} cy={eye.y} r="28" fill="#263a47" />
                <circle cx={eye.x - 6} cy={eye.y - 8} r="8.5" fill="#fff" />
              </g>
            </g>
          ))}

          {/* Smile. It widens when the pointer is on the mascot. */}
          <g style={{ transformOrigin: "410px 268px", transform: happy ? "scale(1.13, 1.18)" : "scale(1, 1)", transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)" }}>
            <path d="M358 268 H462 C462 300 438 319 410 319 C382 319 358 300 358 268 Z" fill="#263a47" />
            <path d="M388 311 C394 300 426 300 432 311 C424 318 396 318 388 311 Z" fill="#f0705e" />
          </g>
        </svg>
      </div>
    </div>
  );
}

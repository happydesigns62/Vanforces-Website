"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState, type KeyboardEvent } from "react";
import type { Shot } from "@/data/media";

type Slide = { label: string; shot: Shot };

const INTERVAL = 5000;

/**
 * Real product screens in one browser frame that sits on a soft stage and is cut off by the stage's lower edge,
 * so it feels like the product continues. The screens fade into each other, and small tabs under the stage name
 * each one. It changes by itself, pauses while the pointer or keyboard focus is on it, and does not move at all
 * when the visitor has asked their device for reduced motion.
 */
export function HeroShowcase({
  slides,
  sizes,
  className = "",
}: {
  slides: Slide[];
  sizes: string;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const id = useId();

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    const onVisibility = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      query.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const playing = !reduced && !held && visible && slides.length > 1;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setIndex((value) => (value + 1) % slides.length), INTERVAL);
    return () => window.clearTimeout(timer);
  }, [playing, index, slides.length]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const last = slides.length - 1;
      let next = index;
      if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
      else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = last;
      else return;
      event.preventDefault();
      setIndex(next);
      document.getElementById(`${id}-tab-${next}`)?.focus();
    },
    [id, index, slides.length],
  );

  const aspect = `${slides[0].shot.width} / ${slides[0].shot.height}`;

  return (
    <div
      className={className}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <div className="stage-soft relative overflow-hidden rounded-[28px] border border-cyan-line px-3 pb-5 pt-9 sm:rounded-[36px] sm:px-8 sm:pb-7 sm:pt-14 lg:px-14 lg:pt-[72px]">
        {/* Two quiet layers behind the screen, so it reads as a stack of real screens and the stage has depth. */}
        <div className="relative">
          <div aria-hidden="true" className="absolute inset-x-[7%] -top-5 h-full rounded-[18px] border border-white/70 bg-white/45 sm:-top-8" />
          <div aria-hidden="true" className="absolute inset-x-[3.5%] -top-2.5 h-full rounded-[18px] border border-white/80 bg-white/65 sm:-top-4" />
          <figure className="relative overflow-hidden rounded-[14px] border border-cyan-line bg-white shadow-[0_40px_80px_-30px_rgb(8_60_66/0.45),0_8px_20px_-10px_rgb(8_60_66/0.25)]">
            <div aria-hidden="true" className="flex h-9 items-center gap-1.5 border-b border-line bg-mist px-3.5">
              <span className="size-2.5 rounded-full bg-line" />
              <span className="size-2.5 rounded-full bg-line" />
              <span className="size-2.5 rounded-full bg-line" />
              <span className="ml-3 truncate rounded-md bg-white px-3 py-0.5 text-[11px] font-medium text-muted">{slides[index].shot.title}</span>
            </div>
            <div className="relative bg-white" style={{ aspectRatio: aspect }}>
              {slides.map(({ label, shot }, position) => {
                const active = position === index;
                return (
                  <div
                    key={label}
                    id={`${id}-panel-${position}`}
                    role="tabpanel"
                    aria-labelledby={`${id}-tab-${position}`}
                    aria-hidden={!active}
                    className={`absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-[var(--ease-soft)] ${
                      active ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-[0.985] opacity-0"
                    }`}
                  >
                    <Image src={shot.src} alt={active ? shot.alt : ""} fill sizes={sizes} priority={position === 0} className="object-cover object-left-top" />
                  </div>
                );
              })}
            </div>
          </figure>
        </div>

        {/* The switch lives inside the stage, under the screen: one calm pill, with the privacy note beside it. */}
        <div className="mt-6 flex flex-col items-center gap-3 sm:mt-8 sm:flex-row sm:justify-between">
          <p className="order-2 text-center text-[12.5px] leading-5 text-navy/70 sm:order-1 sm:text-left">Real product screens. Names and sensitive details are masked for privacy.</p>
          <div role="tablist" aria-label="Vanforces product screens" onKeyDown={onKeyDown} className="order-1 flex gap-1 rounded-full border border-white/80 bg-white/70 p-1 shadow-[0_1px_2px_rgb(41_59_71/0.08)] backdrop-blur sm:order-2">
            {slides.map(({ label }, position) => {
              const active = position === index;
              return (
                <button
                  key={label}
                  type="button"
                  role="tab"
                  id={`${id}-tab-${position}`}
                  aria-selected={active}
                  aria-controls={`${id}-panel-${position}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setIndex(position)}
                  className={`relative min-h-10 cursor-pointer overflow-hidden rounded-full px-5 text-[14px] font-semibold transition-colors duration-300 ${
                    active ? "bg-navy text-white" : "text-navy/70 hover:text-navy"
                  }`}
                >
                  {label}
                  {active && playing ? (
                    <span
                      key={`${index}-${held}`}
                      aria-hidden="true"
                      className="hero-progress absolute inset-x-3 bottom-0 h-[3px] rounded-full bg-teal"
                      style={{ "--dur": `${INTERVAL}ms` } as React.CSSProperties}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

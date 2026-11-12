"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUp } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { Button } from "@/components/global/Button";
import { FinderMascot } from "@/components/illustration/Vignettes";
import { examplePrompts, findSuggestions, type Suggestion } from "@/data/solution-finder";

/** A four-point sparkle, filled with the soft Entaura-style gradient. */
function Spark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="finder-spark" x1="4" y1="28" x2="28" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1cb2bb" />
          <stop offset="0.55" stopColor="#6f8dff" />
          <stop offset="1" stopColor="#c58bf0" />
        </linearGradient>
      </defs>
      <path d="M16 2 C17.5 10 22 14.5 30 16 C22 17.5 17.5 22 16 30 C14.5 22 10 17.5 2 16 C10 14.5 14.5 10 16 2 Z" fill="url(#finder-spark)" />
    </svg>
  );
}

/** Types the example sentences into the placeholder one after another, then rests, then starts the next. Still for reduced motion. */
function useTypedPlaceholder(active: boolean) {
  const [shown, setShown] = useState(examplePrompts[0]);
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    let sentence = 0;
    let length = 0;
    let typing = true;
    const tick = () => {
      const full = examplePrompts[sentence];
      if (typing) {
        length += 1;
        setShown(full.slice(0, length));
        if (length >= full.length) {
          typing = false;
          timer = window.setTimeout(tick, 2200);
          return;
        }
        timer = window.setTimeout(tick, 38);
      } else {
        length -= 2;
        if (length <= 0) {
          length = 0;
          typing = true;
          sentence = (sentence + 1) % examplePrompts.length;
          setShown("");
          timer = window.setTimeout(tick, 350);
          return;
        }
        setShown(full.slice(0, length));
        timer = window.setTimeout(tick, 14);
      }
    };
    timer = window.setTimeout(tick, 600);
    return () => window.clearTimeout(timer);
  }, [active]);
  return shown;
}

/**
 * Solution Finder, in the look of Entaura. A visitor describes their business in a Gemini-style search bar (a soft gradient
 * glow slowly circles it and example questions type themselves into it) and sees matching Vanforces capabilities beside it.
 * It is a plain keyword match against the site's own capabilities, so it is labelled "Guided recommendations" and never as
 * live AI, and it says it is styled after Entaura, not powered by it. The text typed is not stored or sent anywhere.
 */
export function SolutionFinder() {
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);
  const [result, setResult] = useState<{ matched: boolean; items: Suggestion[] } | null>(null);
  const id = useId();
  const typed = useTypedPlaceholder(!text && !focused);

  function run(value: string) {
    if (!value.trim()) return;
    setResult(findSuggestions(value));
  }

  return (
    <div className="relative mt-28 md:mt-36">
      {/* The mascot stands on the card's top edge. When it ducks, it slides down behind the card. */}
      <FinderMascot found={Boolean(result)} className="absolute bottom-full right-4 -mb-[3px] h-[104px] w-auto sm:right-12 sm:h-[140px]" />
      <div className="relative z-10 grid overflow-hidden rounded-[28px] border border-cyan-line bg-white shadow-[0_1px_2px_rgb(41_59_71/0.05),0_30px_60px_-36px_rgb(8_60_66/0.3)] lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]">
        <form
          className="p-5 sm:p-7 lg:p-9"
          onSubmit={(event) => {
            event.preventDefault();
            run(text);
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <Image src="/brand/entaura-logo.svg" alt="Entaura.ai" width={545} height={122} className="h-6 w-auto" />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-soft px-3 py-1 text-[12px] font-semibold text-teal-deep">Guided recommendations</span>
          </div>
          <label htmlFor={`${id}-input`} className="mt-5 block text-[1.375rem] font-medium leading-tight tracking-[-0.03em] text-navy-deep">
            Tell us about your operation
          </label>
          <p className="mt-1 text-[13px] text-muted">Styled after Entaura. Suggestions come from what is described on this site.</p>

          {/* The search bar: a soft gradient glow slowly circles the white field. */}
          <div className="relative mt-5 overflow-hidden rounded-[26px] p-[2px]">
            <span aria-hidden="true" className="finder-glow absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,#1cb2bb,#6f8dff,#c58bf0,#ec9850,#1cb2bb)] opacity-80" />
            <span aria-hidden="true" className="finder-glow pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,#1cb2bb,#6f8dff,#c58bf0,#ec9850,#1cb2bb)] opacity-35 blur-xl" />
            <div className="relative rounded-[24px] bg-white p-3 sm:p-4">
              <div className="flex items-start gap-3">
                <Spark className="mt-1 size-6 shrink-0" />
                <textarea
                  id={`${id}-input`}
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      run(text);
                    }
                  }}
                  rows={3}
                  maxLength={400}
                  placeholder={text || focused ? "Describe your team, routes, stock or systems…" : typed}
                  className="min-h-[84px] w-full resize-none bg-transparent text-[16px] leading-relaxed text-navy-deep placeholder:text-muted/80 focus:outline-none"
                />
              </div>
              <div className="mt-1 flex items-center justify-between gap-3">
                <span className="text-[12px] text-muted">Press Enter to search</span>
                <button
                  type="submit"
                  disabled={!text.trim()}
                  aria-label="Show suggestions"
                  className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-[#0b0b0b] text-white transition-[opacity,transform] hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <ArrowUp aria-hidden="true" size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Example descriptions">
            {examplePrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => {
                  setText(prompt);
                  run(prompt);
                }}
                className="min-h-[36px] cursor-pointer rounded-full border border-line bg-white px-3.5 py-1.5 text-left text-[12.5px] leading-snug text-navy transition-colors hover:border-teal hover:bg-cyan-soft"
              >
                {prompt.length > 38 ? `${prompt.slice(0, 36)}…` : prompt}
              </button>
            ))}
          </div>
        </form>

        <div aria-live="polite" className="border-t border-line bg-mist/70 p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-9">
          {result ? (
            <div>
              <p className="text-[14px] text-muted">{result.matched ? "These parts of Vanforces fit what you described:" : "We couldn't match every detail, so here are three places to start:"}</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {result.items.map((item, index) => (
                  <li key={item.title} className="rounded-2xl border border-line bg-white p-4">
                    <span className="flex size-6 items-center justify-center rounded-full bg-cyan-soft text-[12px] font-semibold text-teal-deep">{index + 1}</span>
                    <Link href={item.href} className="group mt-2 inline-flex items-center gap-1.5 text-[15.5px] font-semibold text-navy-deep hover:text-teal-deep">
                      {item.title}
                      <ArrowRight aria-hidden="true" size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                    <p className="mt-1 text-[14px] leading-relaxed text-muted">{item.why}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Button href="/book-demo" arrow className="shrink-0 whitespace-nowrap">
                  Book a Demo
                </Button>
                <p className="text-[13px] text-muted">A demo confirms what fits your business.</p>
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-[220px] flex-col justify-center">
              <p className="text-[1.0625rem] font-semibold text-navy-deep">Your suggestions appear here.</p>
              <p className="mt-1.5 max-w-[26rem] text-[14.5px] leading-relaxed text-muted">Describe your team, routes, stock or systems, or tap an example. We&apos;ll point to the parts of Vanforces that fit.</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {["Field Sales", "Van Sales", "Routes", "Inventory", "Collections", "Offline Operations", "Business Intelligence"].map((name) => (
                  <li key={name} className="rounded-full border border-dashed border-cyan-line bg-white px-3 py-1 text-[13px] text-muted">
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

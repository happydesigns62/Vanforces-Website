"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useId, useState } from "react";
import { Button } from "@/components/global/Button";
import { FinderMascot } from "@/components/illustration/Vignettes";
import { examplePrompts, findSuggestions, type Suggestion } from "@/data/solution-finder";

/**
 * Solution Finder. A visitor describes their business on the left and sees matching Vanforces capabilities on the right,
 * each with a link and a line on why it fits. It spans the full page width in two columns, so it stays short. It is a plain
 * keyword match against the site's own capabilities, so it is labelled "Guided recommendations" and never as AI. The text
 * typed is not stored or sent anywhere.
 */
export function SolutionFinder() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ matched: boolean; items: Suggestion[] } | null>(null);
  const id = useId();

  function run(value: string) {
    if (!value.trim()) return;
    setResult(findSuggestions(value));
  }

  return (
    <div className="relative mt-28 md:mt-36">
      {/* The mascot stands on the card's top edge. When it ducks, it slides down behind the card. */}
      <FinderMascot found={Boolean(result)} className="absolute bottom-full right-4 -mb-[3px] h-[104px] w-auto sm:right-12 sm:h-[140px]" />
      <div className="relative z-10 grid overflow-hidden rounded-[28px] border border-cyan-line bg-white shadow-[0_1px_2px_rgb(41_59_71/0.05),0_30px_60px_-36px_rgb(8_60_66/0.3)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <form
        className="p-5 sm:p-7 lg:p-9"
        onSubmit={(event) => {
          event.preventDefault();
          run(text);
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label htmlFor={`${id}-input`} className="text-[1.0625rem] font-semibold text-navy-deep">
            Tell us about your operation
          </label>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-soft px-3 py-1 text-[12px] font-semibold text-teal-deep">
            <Sparkles aria-hidden="true" size={13} />
            Guided recommendations
          </span>
        </div>
        <textarea
          id={`${id}-input`}
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={4}
          maxLength={400}
          placeholder="For example: we have 25 sales reps, several delivery routes and find it hard to track stock and collections."
          className="mt-4 w-full resize-none rounded-2xl border border-line bg-mist px-4 py-3 text-[15px] leading-relaxed text-navy-deep placeholder:text-muted/80 focus:border-teal focus:bg-white focus:outline-none"
        />
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Example descriptions">
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
        <button
          type="submit"
          disabled={!text.trim()}
          className="btn-rim mt-5 inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
        >
          Show suggestions
          <ArrowRight aria-hidden="true" size={16} />
        </button>
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
              <p className="text-[13px] text-muted">Suggestions come from what is described on this site. A demo confirms what fits your business.</p>
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

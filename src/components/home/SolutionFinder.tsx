"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useId, useState } from "react";
import { Button } from "@/components/global/Button";
import { examplePrompts, findSuggestions, type Suggestion } from "@/data/solution-finder";

/**
 * Solution Finder. A visitor describes their business and gets matching Vanforces capabilities, each with a link and a
 * line on why it fits. It is a plain keyword match against the site's own capabilities, so it is labelled "Guided
 * recommendations" and never as AI. The text typed is not stored or sent anywhere.
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
    <div className="mx-auto mt-12 max-w-[880px] rounded-[28px] border border-cyan-line bg-white p-4 shadow-[0_1px_2px_rgb(41_59_71/0.05),0_24px_50px_-30px_rgb(8_60_66/0.3)] sm:p-6">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          run(text);
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label htmlFor={`${id}-input`} className="text-[15px] font-semibold text-navy-deep">
            Tell us about your operation
          </label>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-soft px-3 py-1 text-[12px] font-semibold text-teal-deep">
            <Sparkles aria-hidden="true" size={13} />
            Guided recommendations
          </span>
        </div>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end">
          <textarea
            id={`${id}-input`}
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={2}
            maxLength={400}
            placeholder="For example: we have 25 sales reps, several delivery routes and find it hard to track stock and collections."
            className="min-h-[76px] w-full flex-1 resize-none rounded-2xl border border-line bg-mist px-4 py-3 text-[15px] leading-relaxed text-navy-deep placeholder:text-muted/80 focus:border-teal focus:bg-white focus:outline-none"
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className="btn-rim inline-flex min-h-12 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          >
            Show suggestions
            <ArrowRight aria-hidden="true" size={16} />
          </button>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Example descriptions">
        {examplePrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => {
              setText(prompt);
              run(prompt);
            }}
            className="min-h-[36px] cursor-pointer rounded-full border border-line bg-white px-3.5 py-1.5 text-left text-[13px] leading-snug text-navy transition-colors hover:border-teal hover:bg-cyan-soft"
          >
            {prompt.length > 62 ? `${prompt.slice(0, 60)}…` : prompt}
          </button>
        ))}
      </div>

      <div aria-live="polite">
        {result ? (
          <div className="mt-6 border-t border-line pt-6">
            <p className="text-[14px] text-muted">
              {result.matched ? "These parts of Vanforces fit what you described:" : "We couldn't match every detail, so here are three places to start:"}
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {result.items.map((item) => (
                <li key={item.title} className="rounded-2xl border border-line bg-mist/60 p-4">
                  <Link href={item.href} className="group inline-flex items-center gap-1.5 text-[15.5px] font-semibold text-navy-deep hover:text-teal-deep">
                    {item.title}
                    <ArrowRight aria-hidden="true" size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                  <p className="mt-1 text-[14px] leading-relaxed text-muted">{item.why}</p>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Button href="/book-demo" arrow>
                Book a Demo
              </Button>
              <p className="text-[13px] text-muted">Suggestions come from what is described on this site. A demo confirms what fits your business.</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

import type { CSSProperties } from "react";

/** Number of words in a line of text. Used to continue the reveal order across two parts of one title. */
export const wordCount = (text: string) => text.split(" ").filter(Boolean).length;

/**
 * Splits a line into words that rise and fade in one after another. The parent element decides when it plays:
 * `data-reveal="words"` plays it when the title scrolls into view, and the `words-load` class plays it on page load.
 * Only opacity and position move. The words stay in the page text, so reading and searching are unaffected.
 */
export function Words({ text, className = "", start = 0 }: { text: string; className?: string; start?: number }) {
  const words = text.split(" ").filter(Boolean);
  return (
    <span className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className="w" style={{ "--i": start + index } as CSSProperties}>
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

/** True when the visitor prefers less motion. It is true on the server, so animated sections start still and only move once the page is live. */
export function useCalm() {
  return useSyncExternalStore(
    (notify) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", notify);
      return () => m.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => true,
  );
}
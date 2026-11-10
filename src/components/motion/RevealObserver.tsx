"use client";

import { useEffect } from "react";

// One shared observer drives every scroll reveal on the site. It also picks up elements
// added by route changes, which keeps the page code free of per-section animation logic.
export function RevealObserver() {
  useEffect(() => {
    // Tells the fallback timer in the root layout that reveals are running.
    Object.assign(window, { __vfReveal: true });

    const intersection = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            intersection.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -6% 0px" },
    );

    const seen = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => {
        if (!seen.has(el)) {
          seen.add(el);
          intersection.observe(el);
        }
      });
    };

    scan();
    const mutation = new MutationObserver(scan);
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersection.disconnect();
      mutation.disconnect();
    };
  }, []);

  return null;
}

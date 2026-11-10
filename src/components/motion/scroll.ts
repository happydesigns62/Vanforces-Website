import type Lenis from "lenis";

/**
 * One shared scroll listener for every scroll-linked effect on the page.
 * Each effect asks for a frame callback, and all of them run together once per animation frame, so adding
 * more effects does not add more scroll listeners.
 */
type Callback = () => void;

const subscribers = new Set<Callback>();
let ticking = false;
let bound = false;

function frame() {
  ticking = false;
  subscribers.forEach((callback) => callback());
}

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(frame);
}

/** Runs `callback` now and after every scroll or resize. Returns a function that stops it. */
export function subscribeScroll(callback: Callback) {
  subscribers.add(callback);
  if (!bound) {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    bound = true;
  }
  callback();
  return () => {
    subscribers.delete(callback);
    if (bound && subscribers.size === 0) {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      bound = false;
    }
  };
}

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/**
 * How far an element has travelled, from 0 to 1.
 * - entry: from its top edge entering the screen until it sits about 40% from the top
 * - late: a slightly later and slower version of entry, for lines and lists
 * - exit: from the top of the page until the element has fully left through the top
 * - pass: the whole trip from entering at the bottom to leaving at the top
 * - focus: 1 while the element sits in the middle of the screen, falling towards 0 as it moves away
 */
export type SceneMode = "entry" | "late" | "exit" | "pass" | "focus";

export function sceneProgress(element: Element, mode: SceneMode) {
  const rect = element.getBoundingClientRect();
  const vh = window.innerHeight;
  switch (mode) {
    case "entry":
      return clamp01((vh - rect.top) / (vh * 0.62));
    case "late":
      return clamp01((vh * 0.92 - rect.top) / (vh * 0.62));
    case "exit":
      return clamp01((-rect.top + 120) / Math.max(rect.height, 1));
    case "pass":
      return clamp01((vh - rect.top) / (vh + rect.height));
    case "focus": {
      // 1 when the element is centred on the screen, fading to 0 about 42% of the screen height away.
      const centre = rect.top + rect.height / 2;
      return 1 - clamp01(Math.abs(centre - vh * 0.5) / (vh * 0.42));
    }
  }
}

/** The smooth-scroll engine, when it is running. Set by SmoothScroll. */
let engine: Lenis | null = null;
export function setScrollEngine(next: Lenis | null) {
  engine = next;
}

/** Scrolls the page to a vertical position, easing when smooth scrolling is available. */
export function scrollToY(y: number) {
  if (engine) engine.scrollTo(y, { duration: 1.1 });
  else window.scrollTo({ top: y, behavior: "smooth" });
}

import Image from "next/image";

/**
 * The Vanforces Control Room screens, as images. The interface is exactly the
 * product's own. All but Attendance & Movement have customer details replaced with invented ones; Attendance & Movement is the original screen.
 * The originals are kept in a private folder outside the website and are never published.
 */

export const SAMPLE_NOTE = "Product screens. Data shown is for illustration.";

export const screens = {
  executive: { src: "/control-room/executive.webp", w: 1920, h: 1023, alt: "Control Room Executive Overview screen with total sales, collections, credits, new customers and a revenue trend, shown with illustrative data." },
  liveOps: { src: "/control-room/live-ops.webp", w: 1915, h: 1021, alt: "Control Room Live Operations screen with live sales, collections, orders and deliveries, a route status board, an activity feed and a live routes table, shown with illustrative data." },
  attendance: { src: "/control-room/attendance-v2.webp", w: 1915, h: 1021, alt: "Control Room Attendance and Movement screen with a work status grid, a salesman log map and a live routes map." },
  orderDelivery: { src: "/control-room/order-delivery.webp", w: 1265, h: 595, alt: "Control Room Order and Delivery Control screen with pending orders, delivery runs, an order funnel and reports, shown with illustrative data." },
  launcher: { src: "/control-room/launcher.webp", w: 1920, h: 540, alt: "Control Room Launcher listing four monitoring screens with their refresh intervals and enabled widget counts." },
} as const;

export type ScreenKey = keyof typeof screens;

/** One Control Room screen at any width. */
export function ControlRoomScreen({ kind, className = "", sizes = "(min-width: 1024px) 880px, 90vw", priority }: { kind: ScreenKey; className?: string; sizes?: string; priority?: boolean }) {
  const s = screens[kind];
  return (
    <Image
      src={s.src}
      alt={s.alt}
      width={s.w}
      height={s.h}
      sizes={sizes}
      priority={priority}
      className={`block h-auto w-full rounded-xl border border-line bg-white shadow-[0_24px_48px_-28px_rgb(8_60_66/0.45)] ${className}`}
    />
  );
}
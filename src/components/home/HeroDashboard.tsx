import Image from "next/image";
import type { Shot } from "@/data/media";

/**
 * One real product screen under the hero, on the same white page as the hero itself. There is no tinted stage: a very
 * faint cyan glow sits behind the browser frame, and the lower edge fades into the page, so the screen feels like the
 * hero continuing and not a separate block.
 */
export function HeroDashboard({ shot, sizes }: { shot: Shot; sizes: string }) {
  return (
    <div className="relative">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-[4%] -inset-y-10 -z-10 bg-[radial-gradient(60%_55%_at_50%_35%,rgb(28_178_187/0.13),transparent_72%)]" />
      <figure className="relative overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_50px_90px_-40px_rgb(8_60_66/0.4),0_10px_24px_-12px_rgb(8_60_66/0.18)]">
        <div aria-hidden="true" className="flex h-9 items-center gap-1.5 border-b border-line bg-mist px-3.5">
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="ml-3 truncate rounded-md bg-white px-3 py-0.5 text-[11px] font-medium text-muted">{shot.title}</span>
        </div>
        <div className="relative bg-white" style={{ aspectRatio: `${shot.width} / ${shot.height}` }}>
          <Image src={shot.src} alt={shot.alt} fill sizes={sizes} priority className="object-cover object-left-top" />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-white via-white/80 to-transparent" />
      </figure>
      <p className="mt-4 text-center text-[12.5px] leading-5 text-navy/65">Real product screen. Names and sensitive details are masked for privacy.</p>
    </div>
  );
}

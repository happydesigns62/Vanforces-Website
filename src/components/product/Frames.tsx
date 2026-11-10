import Image from "next/image";
import type { Shot } from "@/data/media";

/** Desktop screenshot in a clean browser frame. Keeps the original proportions. */
export function WebScreenshotFrame({
  shot,
  priority,
  sizes = "(max-width: 1024px) 100vw, 1100px",
  className = "",
}: {
  shot: Shot;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure className={`overflow-hidden rounded-[14px] border border-line bg-white shadow-frame ${className}`}>
      <div aria-hidden="true" className="flex h-9 items-center gap-1.5 border-b border-line bg-mist px-3.5">
        <span className="size-2.5 rounded-full bg-line" />
        <span className="size-2.5 rounded-full bg-line" />
        <span className="size-2.5 rounded-full bg-line" />
        {shot.title ? (
          <span className="ml-3 truncate rounded-md bg-white px-3 py-0.5 text-[11px] font-medium text-muted">{shot.title}</span>
        ) : null}
      </div>
      <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes={sizes} priority={priority} className="block h-auto w-full" />
    </figure>
  );
}

/** Mobile screenshot in an elegant phone frame. */
export function MobileScreenshotFrame({
  shot,
  priority,
  sizes = "(max-width: 768px) 60vw, 300px",
  className = "",
}: {
  shot: Shot;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure className={`rounded-[30px] bg-navy-deep p-[7px] shadow-frame ${className}`}>
      <div className="overflow-hidden rounded-[24px] bg-white">
        <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes={sizes} priority={priority} className="block h-auto w-full" />
      </div>
    </figure>
  );
}

export function PrivacyCaption({ className = "" }: { className?: string }) {
  return <p className={`text-[12.5px] leading-5 text-muted ${className}`}>Real product screens. Names and sensitive details are masked for privacy.</p>;
}

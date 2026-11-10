import Image from "next/image";
import { art, type ArtKey } from "@/data/media";

/** The Vanforces box mascot. Decorative, so screen readers skip it. Set the size through className. */
export function Mascot({
  name,
  className = "",
  sizes = "280px",
  priority,
}: {
  name: ArtKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const image = art[name];
  return (
    <Image
      src={image.src}
      alt=""
      width={image.width}
      height={image.height}
      sizes={sizes}
      priority={priority}
      draggable={false}
      className={`h-auto select-none transition-transform duration-500 ease-[var(--ease-soft)] hover:-translate-y-1 ${className}`}
    />
  );
}

/** Mascot inside a soft circle, so its dark outline stays visible on navy panels. */
export function MascotBadge({ name, className = "", sizes = "240px" }: { name: ArtKey; className?: string; sizes?: string }) {
  return (
    <span className={`flex aspect-square items-center justify-center rounded-full bg-cyan-soft ${className}`}>
      {/* Sized by width, because percentage padding here would follow the parent panel and crush the image. */}
      <span className="block w-[82%]">
        <Mascot name={name} sizes={sizes} className="block w-full" />
      </span>
    </span>
  );
}

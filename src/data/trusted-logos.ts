// Customer logos for the homepage hero. The owner confirmed permission to show them (2026-11-09).
// Files are prepared by scripts/prepare-home-logos.mjs from assets/pages/home/logos.
export type TrustedLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
  /** Sets the shown size, so tall and wide logos look equally heavy. */
  className: string;
};

export const trustedLogos: TrustedLogo[] = [
  { name: "AGC Car Accessories", src: "/logos/agc.png", width: 207, height: 105, className: "h-[3.25rem] w-auto" },
  { name: "Chefouse", src: "/logos/chefouse.png", width: 540, height: 118, className: "h-auto w-[138px]" },
  { name: "KAKU", src: "/logos/kaku.png", width: 385, height: 256, className: "h-14 w-auto" },
  { name: "Maximus", src: "/logos/maximus.png", width: 436, height: 193, className: "h-11 w-auto" },
  { name: "Punathil Egg Traders", src: "/logos/punathil.png", width: 256, height: 276, className: "h-16 w-auto" },
];

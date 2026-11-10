import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "teal" | "onDark" | "text" | "ink";

const styles: Record<Variant, string> = {
  primary: "btn-rim hover:-translate-y-px hover:shadow-lift",
  secondary: "border border-line bg-white text-navy hover:border-navy/40 hover:-translate-y-px hover:shadow-lift",
  teal: "bg-teal text-navy-deep hover:-translate-y-px hover:shadow-lift hover:brightness-105",
  onDark: "border border-white/30 text-white hover:border-white/70 hover:-translate-y-px",
  text: "self-start !justify-start text-teal-deep hover:text-navy !px-0 !py-1 !min-h-0",
  // Plain near-black pill, the style used on entaura.ai. For links that lead to Entaura.
  ink: "bg-[#0b0b0b] text-white hover:bg-black hover:-translate-y-px hover:shadow-lift",
};

export type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
};

export function Button({ href, children, variant = "primary", arrow, className = "" }: ButtonProps) {
  const external = /^https?:/.test(href);
  const showArrow = arrow ?? variant === "text";
  const classes = `link-arrow inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold transition-[transform,box-shadow,background-color,background-position,border-color,color,filter] duration-300 ease-[var(--ease-soft)] ${styles[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {external ? <ArrowUpRight aria-hidden="true" size={17} /> : showArrow ? <ArrowRight aria-hidden="true" size={17} /> : null}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}

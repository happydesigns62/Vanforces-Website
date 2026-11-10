import { Children, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
  id?: string;
};

function revealStyle(delay: number) {
  return { "--d": `${delay}ms` } as CSSProperties;
}

/** Gentle fade and rise when the element scrolls into view. */
export function ScrollReveal({ children, delay = 0, className, as: Tag = "div", id }: RevealProps) {
  return (
    <Tag data-reveal="" id={id} className={className} style={revealStyle(delay)} suppressHydrationWarning>
      {children}
    </Tag>
  );
}

/** Larger, slower reveal for browser and phone frames. */
export function ScreenshotReveal({ children, delay = 0, className }: RevealProps) {
  return (
    <div data-reveal="shot" className={className} style={revealStyle(delay)} suppressHydrationWarning>
      {children}
    </div>
  );
}

/** Reveals direct children in sequence. */
export function StaggerReveal({
  children,
  className,
  itemClassName,
  step = 80,
  start = 0,
}: {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  step?: number;
  start?: number;
}) {
  return (
    <div className={className}>
      {Children.toArray(children).map((child, index) => (
        <div key={index} data-reveal="" className={itemClassName} style={revealStyle(start + index * step)} suppressHydrationWarning>
          {child}
        </div>
      ))}
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown, LayoutGrid, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navIcons, navPromos, type NavPromo } from "@/data/nav-extras";
import { primaryNav, type NavLink as NavLinkType } from "@/data/navigation";
import { Button } from "./Button";
import { MobileNavigation } from "./MobileNavigation";

export function Logo({ className = "h-7 w-auto" }: { className?: string }) {
  return <Image src="/brand/vanforces-logo.svg" alt="Vanforces" width={170} height={32} loading="eager" className={className} />;
}

export function SmartLink({
  link,
  onNavigate,
  className,
  children,
}: {
  link: NavLinkType;
  onNavigate?: () => void;
  className?: string;
  children?: React.ReactNode;
}) {
  if (/^https?:/.test(link.href)) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className={className}>
        {children ?? link.label}
        <ArrowUpRight aria-hidden="true" size={14} className="ml-1 inline" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={link.href} onClick={onNavigate} className={className}>
      {children ?? link.label}
    </Link>
  );
}

/** One link in a dropdown: a tinted icon tile, the label, and the short description when there is one. */
function MenuRow({ link, onNavigate, roomy = false }: { link: NavLinkType; onNavigate: () => void; roomy?: boolean }) {
  const Icon = navIcons[link.label] ?? LayoutGrid;
  return (
    <SmartLink
      link={link}
      onNavigate={onNavigate}
      className={`group/row flex items-center whitespace-nowrap rounded-lg transition-colors ${roomy ? "gap-3 px-2 py-1.5 hover:bg-paper" : "gap-2 px-1.5 py-1 hover:bg-white"}`}
    >
      <span className={`flex shrink-0 items-center justify-center rounded-lg bg-cyan-soft text-teal-deep transition-colors duration-200 group-hover/row:bg-teal-deep group-hover/row:text-white ${roomy ? "size-8" : "size-7"}`}>
        <Icon aria-hidden="true" size={roomy ? 16 : 15} strokeWidth={1.9} />
      </span>
      <span className={`font-medium leading-snug text-navy-deep ${roomy ? "text-[14px]" : "text-[13px]"}`}>
        {link.label}
        {link.badge ? <span className="sample-tag ml-1.5 !px-1.5 !py-0 !text-[9.5px]">{link.badge}</span> : null}
      </span>
    </SmartLink>
  );
}

function MenuButton({ href, label, onNavigate }: { href: string; label: string; onNavigate: () => void }) {
  return (
    <Link href={href} onClick={onNavigate} className="link-arrow inline-flex items-center gap-1.5 rounded-lg border border-teal/50 bg-cyan-soft px-2.5 py-1 text-[12.5px] font-semibold text-teal-deep transition-colors hover:border-teal-deep hover:bg-white">
      {label}
      <ArrowRight aria-hidden="true" size={13} />
    </Link>
  );
}

function MenuPromo({ promo, onNavigate }: { promo: NavPromo; onNavigate: () => void }) {
  return (
    <div className="flex min-h-[132px] w-60 shrink-0 flex-col items-start rounded-[14px] bg-[linear-gradient(135deg,#e1f5f7,#fbebdd)] p-3.5">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-deep px-2.5 py-0.5 text-[11px] font-semibold text-white">
        <span aria-hidden="true" className="h-2 w-[3px] rotate-[30deg] rounded-full bg-white" />
        {promo.pill}
      </span>
      <p className="mt-2.5 text-pretty text-[1rem] font-medium leading-[1.22] tracking-[-0.02em] text-navy-deep">{promo.title}</p>
      <Link href={promo.href} onClick={onNavigate} className="link-arrow mt-auto inline-flex items-center gap-1 pt-2.5 text-[12.5px] font-semibold text-teal-deep hover:text-navy">
        {promo.link}
        <ArrowRight aria-hidden="true" size={13} />
      </Link>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        navRef.current?.querySelector<HTMLButtonElement>(`[data-menu="${open}"]`)?.focus();
        setOpen(null);
      }
    };
    const onClick = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const closeNow = () => setOpen(null);

  return (
    <header className="pointer-events-none sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={`pointer-events-auto relative mx-auto flex max-w-[1320px] items-center justify-between gap-3 rounded-full border px-4 transition-[height,background-color,box-shadow,border-color] duration-500 ease-[var(--ease-soft)] sm:px-5 ${
          scrolled || open ? "border-line bg-white/85 shadow-[0_16px_40px_-22px_rgb(8_60_66/0.45)] backdrop-blur-xl" : "border-line/60 bg-white/70 backdrop-blur-md"
        } ${scrolled ? "h-14" : "h-[60px] sm:h-[68px]"}`}
      >
        <Link href="/" aria-label="Vanforces home" className="shrink-0" onClick={closeNow}>
          <Logo />
        </Link>

        <nav ref={navRef} aria-label="Main" className="hidden xl:block" onMouseLeave={scheduleClose} onMouseEnter={cancelClose}>
          <ul className="flex items-center gap-0.5">
            {primaryNav.map((item) => {
              if (item.kind === "link") {
                return (
                  <li key={item.label}>
                    <Link href={item.href} onMouseEnter={closeNow} className="block rounded-full px-2 py-2 text-[14px] font-medium transition-colors hover:bg-mist 2xl:px-3.5 2xl:text-[14.5px]">
                      {item.label}
                    </Link>
                  </li>
                );
              }
              const isOpen = open === item.label;
              return (
                <li key={item.label} onMouseEnter={() => setOpen(item.label)}>
                  <button
                    type="button"
                    data-menu={item.label}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => setOpen(isOpen ? null : item.label)}
                    className={`flex cursor-pointer items-center gap-1 rounded-full px-2 py-2 text-[14px] font-medium transition-colors hover:bg-mist 2xl:px-3.5 2xl:text-[14.5px] ${isOpen ? "bg-mist" : ""}`}
                  >
                    {item.label}
                    <ChevronDown aria-hidden="true" size={15} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isOpen && item.kind === "mega" ? (
                    <div className="menu-panel absolute inset-x-0 top-full pt-3">
                      <div data-lenis-prevent className="mx-auto max-h-[calc(100vh-6rem)] w-fit max-w-full overflow-y-auto rounded-[18px] border border-line bg-white p-2 shadow-frame">
                        <div className="grid grid-cols-[auto_auto_auto] gap-2 whitespace-nowrap">
                          {item.columns.map((column, index) => {
                            const links = column.links.filter((link) => !link.label.startsWith("All "));
                            const all = column.links.find((link) => link.label.startsWith("All "));
                            return (
                              <div key={column.title} className="flex flex-col rounded-[14px] bg-paper px-2.5 py-3">
                                <p className="px-1.5 text-[11px] font-bold uppercase tracking-[0.09em] text-teal-deep">{column.title}</p>
                                <ul className={`mt-1.5 grid gap-x-1 ${index < 2 ? "grid-cols-[auto_auto]" : ""}`}>
                                  {links.map((link) => (
                                    <li key={link.label}>
                                      <MenuRow link={link} onNavigate={closeNow} />
                                    </li>
                                  ))}
                                </ul>
                                {all || index === 0 ? (
                                  <div className="mt-auto flex gap-1.5 px-1.5 pt-2">
                                    {all ? <MenuButton href={all.href} label={all.label} onNavigate={closeNow} /> : null}
                                    {index === 0 ? <MenuButton href="/platform" label="Platform Overview" onNavigate={closeNow} /> : null}
                                  </div>
                                ) : null}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {isOpen && item.kind === "menu" ? (
                    <div className="menu-panel absolute inset-x-0 top-full pt-3">
                      <div data-lenis-prevent className="mx-auto flex max-h-[calc(100vh-6rem)] w-fit max-w-full items-stretch gap-6 overflow-y-auto rounded-[18px] border border-line bg-white p-3 pl-5 shadow-frame">
                        <ul className="grid grid-cols-[auto_auto] content-center gap-x-6 gap-y-2 py-2">
                          {item.links.map((link) => (
                            <li key={link.label}>
                              <MenuRow link={link} onNavigate={closeNow} roomy />
                            </li>
                          ))}
                        </ul>
                        {navPromos[item.label] ? <MenuPromo promo={navPromos[item.label]} onNavigate={closeNow} /> : null}
                      </div>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden shrink-0 sm:block">
            <Button href="/book-demo" variant="secondary" className="!min-h-10 whitespace-nowrap !px-4 !py-2 !text-[14px]">
              Book a Demo
            </Button>
          </span>
          <span className="hidden shrink-0 xl:block">
            <Button href="/get-started" className="!min-h-10 whitespace-nowrap !px-4 !py-2 !text-[14px]">
              Get Started
            </Button>
          </span>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="flex size-11 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-mist xl:hidden"
          >
            <Menu aria-hidden="true" size={22} />
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="pointer-events-auto">
          <MobileNavigation onClose={() => setMobileOpen(false)} />
        </div>
      ) : null}
    </header>
  );
}

"use client";

import Link from "next/link";
import { ChevronDown, LayoutGrid, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { navIcons } from "@/data/nav-extras";
import { primaryNav, type NavLink } from "@/data/navigation";
import { Button } from "./Button";
import { Logo, SmartLink } from "./Header";

/** Full-screen menu for tablets and phones, rendered at body level so it escapes the blurred header. */
export function MobileNavigation({ onClose }: { onClose: () => void }) {
  const [section, setSection] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [onClose]);

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label="Site menu" className="menu-panel fixed inset-0 z-[60] flex flex-col bg-white">
      <div className="wrap flex h-16 shrink-0 items-center justify-between border-b border-line">
        <Link href="/" onClick={onClose} aria-label="Vanforces home">
          <Logo />
        </Link>
        <button ref={closeRef} type="button" aria-label="Close menu" onClick={onClose} className="flex size-11 cursor-pointer items-center justify-center rounded-full hover:bg-mist">
          <X aria-hidden="true" size={22} />
        </button>
      </div>

      <nav aria-label="Mobile" data-lenis-prevent className="wrap flex-1 overflow-y-auto py-3">
        <ul>
          {primaryNav.map((item) => {
            if (item.kind === "link") {
              return (
                <li key={item.label} className="border-b border-line">
                  <Link href={item.href} onClick={onClose} className="block py-4 text-[17px] font-semibold">
                    {item.label}
                  </Link>
                </li>
              );
            }
            const isOpen = section === item.label;
            const groups: { title?: string; links: NavLink[] }[] = item.kind === "mega" ? item.columns : [{ links: item.links }];
            return (
              <li key={item.label} className="border-b border-line">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setSection(isOpen ? null : item.label)}
                  className="flex min-h-14 w-full cursor-pointer items-center justify-between py-4 text-[17px] font-semibold"
                >
                  {item.label}
                  <ChevronDown aria-hidden="true" size={20} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`} inert={!isOpen}>
                  <div className="overflow-hidden">
                    <div className="pb-4">
                      {groups.map((group) => (
                        <div key={group.title ?? "links"} className="mb-4 last:mb-0">
                          {group.title ? <p className="eyebrow mb-1.5">{group.title}</p> : null}
                          <ul>
                            {group.links.map((link) => {
                              const Icon = navIcons[link.label] ?? LayoutGrid;
                              return (
                                <li key={link.label}>
                                  <SmartLink link={link} onNavigate={onClose} className="flex items-center gap-3 py-1.5 text-[15px] text-navy-deep">
                                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-cyan-soft text-teal-deep">
                                      <Icon aria-hidden="true" size={16} strokeWidth={1.9} />
                                    </span>
                                    <span>
                                      {link.label}
                                      {link.badge ? <span className="sample-tag ml-2 !py-0 !text-[10.5px]">{link.badge}</span> : null}
                                    </span>
                                  </SmartLink>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
          <li>
            <Link href="/login" onClick={onClose} className="block py-4 text-[17px] font-semibold">
              Login
            </Link>
          </li>
        </ul>
      </nav>

      <div className="wrap grid shrink-0 grid-cols-2 gap-3 border-t border-line py-4" onClick={onClose}>
        <Button href="/book-demo" variant="secondary">
          Book a Demo
        </Button>
        <Button href="/get-started">Get Started</Button>
      </div>
    </div>,
    document.body,
  );
}

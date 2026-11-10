import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { footerNav } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="wrap pb-10 pt-16 md:pt-24">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,3.6fr)]">
          <div>
            <Link href="/" aria-label="Vanforces home" className="inline-block">
              <Image src="/brand/vanforces-logo.svg" alt="Vanforces" width={170} height={32} className="h-8 w-auto" />
            </Link>
            <p className="mt-5 text-[1.25rem] font-medium tracking-[-0.025em] text-navy-deep">Distribution Simplified.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {footerNav.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">{column.title}</h2>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {/^https?:/.test(link.href) ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[14.5px] text-navy/70 transition-colors duration-300 hover:text-navy-deep">
                          {link.label}
                          <ArrowUpRight aria-hidden="true" size={13} />
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      ) : (
                        <Link href={link.href} className="text-[14.5px] text-navy/70 transition-colors duration-300 hover:text-navy-deep">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-2 border-t border-line pt-6 text-[13px] text-muted md:flex-row md:justify-between">
          <p>© 2026 Vanforces. All rights reserved.</p>
          <p>Website prototype. Customer stories, reviews, figures, prices and photos are sample content.</p>
        </div>
      </div>
    </footer>
  );
}

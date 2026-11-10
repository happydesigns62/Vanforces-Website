"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { SmoothTabs } from "@/components/motion/SmoothTabs";

export type RoleTab = { id: string; label: string; heading: string; body: string; points: string[]; href: string; visual: ReactNode };

export function RoleSelector({ roles }: { roles: RoleTab[] }) {
  return (
    <SmoothTabs
      label="Choose a role"
      items={roles.map((role) => ({
        id: role.id,
        label: role.label,
        panel: (
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div>
              <h2 className="t-section !text-[clamp(1.625rem,1.4rem+1vw,2.5rem)]">{role.heading}</h2>
              <p className="lede mt-4">{role.body}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {role.points.map((point) => (
                  <li key={point} className="rounded-full bg-cyan-soft px-3 py-1.5 text-[13.5px] font-medium text-teal-deep">
                    {point}
                  </li>
                ))}
              </ul>
              <Link href={role.href} className="link-arrow mt-7 inline-flex items-center gap-1.5 text-[15px] font-semibold text-teal-deep hover:text-navy">
                See how it works for {role.label} <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
            <div className="min-w-0">{role.visual}</div>
          </div>
        ),
      }))}
    />
  );
}

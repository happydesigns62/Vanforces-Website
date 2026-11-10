"use client";

import { Check } from "lucide-react";
import { phone as phones, web as webs, type ArtKey, type PhoneKey, type WebKey } from "@/data/media";
import { Mascot } from "@/components/global/Mascot";
import { SmoothTabs } from "@/components/motion/SmoothTabs";
import { Button } from "@/components/global/Button";
import { MobileScreenshotFrame, WebScreenshotFrame } from "./Frames";

type Category = {
  id: string;
  label: string;
  heading: string;
  items: string[];
  href: string;
  web?: WebKey;
  phone?: PhoneKey;
  mascot: ArtKey;
};

const categories: Category[] = [
  { id: "sales", label: "Sales & Customers", heading: "Walk Into Every Visit Prepared.", items: ["Customers", "Pricing", "Orders", "Invoices"], href: "/platform/customers", web: "products", phone: "dashboard", mascot: "business" },
  { id: "routes", label: "Routes & Field Operations", heading: "Know the Next Stop. Make Every Visit Count.", items: ["Journey Planning", "Customer Visits", "Route Progress"], href: "/platform/routes", web: "routeVisit", phone: "route", mascot: "location" },
  { id: "inventory", label: "Inventory & Delivery", heading: "From Warehouse Loading to Customer Handover.", items: ["Warehouse Stock", "Van Inventory", "Deliveries"], href: "/platform/inventory", web: "products", phone: "transactions", mascot: "supplyChain" },
  { id: "finance", label: "Finance & Collections", heading: "Know What's Due Before the Next Conversation.", items: ["Customer Balances", "Collections", "Settlements"], href: "/platform/collections", web: "cxoTrends", phone: "dashboard", mascot: "review" },
  { id: "planning", label: "Planning & Performance", heading: "Give the Day a Direction. See How It Went.", items: ["Targets", "Daily Readiness", "Reports"], href: "/platform/intelligence", web: "adminHome", phone: "sync", mascot: "confirm" },
];

export function ProductExplorer() {
  return (
    <SmoothTabs
      label="Explore Vanforces by area of work"
      items={categories.map((category) => ({
        id: category.id,
        label: category.label,
        panel: (
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
            <div>
              <Mascot name={category.mascot} sizes="180px" className="mb-4 w-36 lg:w-44" />
              <h3 className="t-section !text-[clamp(1.625rem,1.4rem+1vw,2.375rem)]">{category.heading}</h3>
              <ul className="mt-6 space-y-2.5">
                {category.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[16px] font-medium">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-cyan-soft text-teal-deep">
                      <Check aria-hidden="true" size={13} strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Button href={category.href} variant="text" className="mt-6">
                See {category.label}
              </Button>
            </div>
            <div className="relative pb-6 sm:pr-[10%]">
              {category.web ? <WebScreenshotFrame shot={webs[category.web]} sizes="(max-width: 1024px) 92vw, 760px" /> : null}
              {category.phone ? (
                <div className="absolute bottom-0 right-0 w-[24%] min-w-[84px] max-w-[190px]">
                  <MobileScreenshotFrame shot={phones[category.phone]} sizes="190px" />
                </div>
              ) : null}
            </div>
          </div>
        ),
      }))}
    />
  );
}

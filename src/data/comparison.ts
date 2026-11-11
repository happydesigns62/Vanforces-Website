/**
 * Vanforces and BeatRoute, feature by feature.
 *
 * Rules: "Not Verified" is never "Not Available". A BeatRoute cell is "Available" only where BeatRoute's own pages say so
 * (checked on the date below), and "Not Verified" where the pages reviewed say nothing. The Vanforces column is a first
 * draft taken from the pages on this site and the owner's briefing, and is marked as awaiting product-team confirmation
 * (`vanforcesConfirmed`). The comparison page stays out of search engines until that is done.
 */
export type Status = "Available" | "Limited / Configured" | "In Development" | "Not Available" | "Not Verified";

export type Row = {
  area: string;
  vanforces: Status;
  vanforcesNote: string;
  beatroute: Status;
  beatrouteNote: string;
};

export const checkedOn = "11 November 2026";
export const vanforcesConfirmed = false;

export const sources = [
  { label: "BeatRoute home page", href: "https://beatroute.io/" },
  { label: "BeatRoute SFA app page", href: "https://beatroute.io/platform/sfa-software/sfa-app/" },
  { label: "BeatRoute van sales page", href: "https://beatroute.io/platform/van-sales-automation-software/" },
];

export const rows: Row[] = [
  { area: "Field Sales", vanforces: "Available", vanforcesNote: "Field Sales module.", beatroute: "Available", beatrouteNote: "SFA software." },
  { area: "Route & Visit Management", vanforces: "Available", vanforcesNote: "Routes module.", beatroute: "Available", beatrouteNote: "Visit planning and route optimization are listed." },
  { area: "Van Sales", vanforces: "Available", vanforcesNote: "Van Sales module.", beatroute: "Available", beatrouteNote: "Van sales automation page." },
  { area: "Inventory Management", vanforces: "Available", vanforcesNote: "Inventory module, warehouse to van.", beatroute: "Available", beatrouteNote: "Inventory appears in its distributor management product." },
  { area: "Orders & Invoices", vanforces: "Available", vanforcesNote: "Orders & Invoicing module.", beatroute: "Available", beatrouteNote: "Orders in SFA and distributor tools. Invoices linked to payments on the van sales page." },
  { area: "Collections", vanforces: "Available", vanforcesNote: "Collections and Settlements modules.", beatroute: "Available", beatrouteNote: "Van sales page describes payments tied to invoices and outstanding amounts." },
  { area: "Offline Operations", vanforces: "Limited / Configured", vanforcesNote: "Eligible field work continues offline.", beatroute: "Available", beatrouteNote: "SFA app page describes visits, orders and payments without signal." },
  { area: "Dashboards & Analytics", vanforces: "Available", vanforcesNote: "Business Intelligence and Command Center.", beatroute: "Available", beatrouteNote: "Report builder and analytics dashboards." },
  { area: "AI Assistants", vanforces: "Limited / Configured", vanforcesNote: "Through Entaura, a separate platform that is not in every plan.", beatroute: "Available", beatrouteNote: "Named agents include Copilot and TeleOrder." },
  { area: "AI Recommendations", vanforces: "Not Verified", vanforcesNote: "To be confirmed by the Vanforces team.", beatroute: "Available", beatrouteNote: "Order and Scheduling agents suggest SKUs and visits." },
  { area: "Route Optimization", vanforces: "Not Verified", vanforcesNote: "To be confirmed by the Vanforces team.", beatroute: "Available", beatrouteNote: "Listed as a use case." },
  { area: "ERP Integrations", vanforces: "Limited / Configured", vanforcesNote: "Odoo and Zoho Books integrations, scope agreed per project.", beatroute: "Available", beatrouteNote: "SAP integration is stated. Other ERPs are not stated on the pages reviewed." },
  { area: "WhatsApp Communication", vanforces: "Not Verified", vanforcesNote: "Whatasol is a related solution. Direct synchronization is not confirmed.", beatroute: "Not Verified", beatrouteNote: "Not found on the pages reviewed." },
  { area: "Saudi E-Invoicing", vanforces: "Limited / Configured", vanforcesNote: "Configured invoice workflows. Supported phase to be confirmed.", beatroute: "Not Verified", beatrouteNote: "Not found on the pages reviewed." },
];

/** Rows shown in the short preview on the home page. */
export const previewAreas = ["Field Sales", "Van Sales", "Collections", "AI Assistants", "ERP Integrations", "Saudi E-Invoicing"];

/** Rows grouped for the "how to read this" summary on the comparison page. */
export function summarize() {
  const both = rows.filter((r) => r.vanforces === "Available" && r.beatroute === "Available").map((r) => r.area);
  const onlyBeatRoute = rows.filter((r) => r.beatroute === "Available" && r.vanforces !== "Available" && r.vanforces !== "Limited / Configured").map((r) => r.area);
  const limited = rows.filter((r) => r.vanforces === "Limited / Configured" || r.beatroute === "Limited / Configured").map((r) => r.area);
  const onlyVanforces = rows.filter((r) => r.vanforces !== "Not Verified" && r.vanforces !== "Not Available" && r.beatroute === "Not Verified").map((r) => r.area);
  const unverified = rows.filter((r) => r.vanforces === "Not Verified" && r.beatroute === "Not Verified").map((r) => r.area);
  return { both, onlyBeatRoute, limited, onlyVanforces, unverified };
}

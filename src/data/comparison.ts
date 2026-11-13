/**
 * Vanforces, Mirnah RoutePro, SalesBuzz and BeatRoute, feature by feature.
 *
 * Rules: "Not Verified" is never "Not Available". A competitor cell is "Available" only where that vendor's own public pages
 * say so (reviewed on the date below), and "Not Verified" where the pages reviewed say nothing. The Vanforces column is a first
 * draft taken from this site and the owner's briefing, and is marked as awaiting product-team confirmation (`vanforcesConfirmed`).
 * The comparison page stays out of search engines until that is done.
 */
export type Status = "Available" | "Limited / Configured" | "In Development" | "Not Available" | "Not Verified";

export type PlatformId = "vanforces" | "mirnah" | "salesbuzz" | "beatroute";

export const platforms: { id: PlatformId; name: string; logo: string; width: number; height: number; focus: string; blurb: string }[] = [
  {
    id: "vanforces",
    name: "Vanforces",
    logo: "/brand/vanforces-mark.svg",
    width: 60,
    height: 56,
    focus: "Connected distribution operations",
    blurb: "Field sales, distributor operations, van sales, collections and reporting in one connected platform, with Arabic and Saudi e-invoicing workflows.",
  },
  {
    id: "mirnah",
    name: "Mirnah RoutePro",
    logo: "/brand/partners/mirnah.png",
    width: 182,
    height: 90,
    focus: "Route accounting and merchandising",
    blurb: "A Saudi route accounting and direct store delivery platform covering van sales, pre-sales, delivery confirmation and merchandising.",
  },
  {
    id: "salesbuzz",
    name: "SalesBuzz",
    logo: "/brand/partners/salesbuzz.png",
    width: 105,
    height: 90,
    focus: "Regional field sales and merchandising",
    blurb: "A regional sales force automation product from BI-Technologies, with journey planning, merchandising compliance and delivery routing.",
  },
  {
    id: "beatroute",
    name: "BeatRoute",
    logo: "/brand/partners/beatroute.png",
    width: 384,
    height: 44,
    focus: "Goal-driven AI execution",
    blurb: "An India-origin SFA and distributor platform with AI agents, retail execution, van sales automation and incentive tools.",
  },
];

export type Cell = { status: Status; note: string };

export type Row = {
  area: string;
  group: "A" | "B" | "C" | "D";
  cells: Record<PlatformId, Cell>;
};

export const groups: { id: Row["group"]; title: string }[] = [
  { id: "A", title: "Field & route operations" },
  { id: "B", title: "Stock, delivery and money" },
  { id: "C", title: "Insight, AI and retail execution" },
  { id: "D", title: "Integrations and regional needs" },
];

export const checkedOn = "13 November 2026";
export const vanforcesConfirmed = false;

export const sources = [
  { label: "Mirnah RoutePro", href: "https://www.mirnah.com/routepro/" },
  { label: "SalesBuzz, BI-Technologies", href: "https://www.bi-technologies.net/products/salesbuzz/" },
  { label: "BeatRoute home page", href: "https://beatroute.io/" },
  { label: "BeatRoute SFA app page", href: "https://beatroute.io/platform/sfa-software/sfa-app/" },
  { label: "BeatRoute van sales page", href: "https://beatroute.io/platform/van-sales-automation-software/" },
];

const A = (note = ""): Cell => ({ status: "Available", note });
const L = (note = ""): Cell => ({ status: "Limited / Configured", note });
const D = (note = ""): Cell => ({ status: "In Development", note });
const V = (note = "Not found on the pages reviewed."): Cell => ({ status: "Not Verified", note });

const row = (area: string, group: Row["group"], vanforces: Cell, mirnah: Cell, salesbuzz: Cell, beatroute: Cell): Row => ({
  area,
  group,
  cells: { vanforces, mirnah, salesbuzz, beatroute },
});

const draft = "To be confirmed by the Vanforces team.";

export const rows: Row[] = [
  row("Field Sales", "A", A("Field Sales module."), A("Pre-sales ordering."), A("Customer visits and orders."), A("SFA software.")),
  row("Route & Visit Management", "A", A("Routes module."), A("Journey planning."), A("Journey planning and visits."), A("Visit planning.")),
  row("Route Optimization", "A", V(draft), V(), A("Delivery routing and optimization."), A("Listed as a use case.")),
  row("Offline Operations", "A", L("Eligible field work continues offline."), V(), V(), A("Visits, orders and payments without signal.")),
  row("Van Sales", "B", A("Van Sales module."), A("Van sales and route accounting."), V(), A("Van sales automation page.")),
  row("Inventory Management", "B", A("Warehouse to van."), A("Inventory in route accounting."), A("Inventory control."), A("In its distributor product.")),
  row("Orders & Invoices", "B", A("Orders & Invoicing module."), A("Invoices and accounts."), A("Order processing and invoicing."), A("Orders and invoices linked to payments.")),
  row("Collections", "B", A("Collections and Settlements modules."), A("Payments and outstanding visibility."), A("Digital payment collection."), A("Payments tied to invoices.")),
  row("Delivery & Proof of Delivery", "B", A("Delivery confirmation."), A("Delivery confirmation and proof."), A("Delivery routing."), V()),
  row("Dashboards & Analytics", "C", A("Business Intelligence and Command Center."), A("Route accounting analytics."), A("Real-time field visibility."), A("Report builder and dashboards.")),
  row("AI Assistants", "C", L("Through Entaura, a separate platform that is not in every plan."), V(), V(), A("Named agents include Copilot and TeleOrder.")),
  row("AI Recommendations", "C", V(draft), V(), V(), A("Agents suggest SKUs and visits.")),
  row("Merchandising & Planograms", "C", D("Roadmap. " + draft), A("Merchandising and planograms."), A("Merchandising compliance and planograms."), A("Retail execution.")),
  row("ERP Integrations", "D", L("Odoo and Zoho Books, scope agreed per project."), A("Real-time integration."), A("Enterprise and ERP integration."), A("SAP stated. Others not stated.")),
  row("Saudi E-Invoicing", "D", L("Configured invoice workflows. Supported phase to be confirmed."), V(), V(), V()),
  row("Arabic & Regional Support", "D", A("Arabic and right-to-left workflows."), V(), V(), V()),
];

/** Rows shown in the short preview on the home page. */
export const previewAreas = ["Field Sales", "Van Sales", "Collections", "AI Assistants", "ERP Integrations", "Saudi E-Invoicing"];

/** Operational focus cards on the comparison page. */
export const focusCards = platforms.map((p) => ({ id: p.id, name: p.name, focus: p.focus, blurb: p.blurb }));


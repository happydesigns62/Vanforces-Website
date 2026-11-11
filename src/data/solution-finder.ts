/**
 * The Solution Finder's matching rules. This is a plain keyword match, not generative AI, so every suggestion comes from
 * this list. Each suggestion points at a page that already exists on the site, and the one-line reasons only restate what
 * those pages already say.
 */
export type Suggestion = { title: string; href: string; why: string };

type Rule = Suggestion & { words: string[] };

const rules: Rule[] = [
  { title: "Field Sales", href: "/platform/field-sales", why: "Gives each representative their customers, routes and order-taking in one mobile app.", words: ["sales rep", "reps", "salesman", "salesperson", "field", "representative", "visit", "order taking", "take orders"] },
  { title: "Van Sales", href: "/platform/van-sales", why: "Covers loading, selling, collecting, unloading and reconciling for teams that sell from a vehicle.", words: ["van", "vans", "truck", "vehicle", "sell from", "direct store", "dsd", "cash sale", "driver"] },
  { title: "Routes", href: "/platform/routes", why: "Plans the journey and shows what actually happened on each route.", words: ["route", "routes", "journey", "beat", "coverage", "schedule", "plan visits", "territor"] },
  { title: "Customers", href: "/platform/customers", why: "Keeps customer details connected to sales and balances.", words: ["customer", "outlet", "shop", "retailer", "account", "client"] },
  { title: "Orders & Invoicing", href: "/platform/orders", why: "Records orders and invoices where the sale happens.", words: ["invoice", "invoicing", "quotation", "billing", "order", "orders"] },
  { title: "Inventory", href: "/platform/inventory", why: "Follows stock from the warehouse to the van and back.", words: ["stock", "inventory", "warehouse", "stockout", "stock out", "unload", "replenish"] },
  { title: "Delivery", href: "/platform/delivery", why: "Takes work from an assigned order to the customer handover.", words: ["deliver", "delivery", "dispatch", "handover", "drop"] },
  { title: "Collections", href: "/platform/collections", why: "Shows what is due and what has been collected.", words: ["collection", "collect", "payment", "cash", "outstanding", "receivable", "credit", "cheque", "overdue", "unpaid"] },
  { title: "Offline Operations", href: "/platform/offline", why: "Lets eligible field work continue where the connection is weak.", words: ["offline", "no signal", "internet", "network", "connectivity", "remote area", "poor signal"] },
  { title: "Business Intelligence", href: "/platform/intelligence", why: "Brings reports, trends and targets together.", words: ["report", "reports", "analytics", "dashboard", "kpi", "insight", "visibility", "performance", "target"] },
  { title: "Operations Control Room", href: "/platform/control-room", why: "Gives managers a live view of field activity.", words: ["monitor", "live", "track", "real time", "real-time", "supervisor", "manager", "control"] },
  { title: "Business Command Center", href: "/business-command-center", why: "Puts sales, collections and balances into one view for leadership.", words: ["owner", "ceo", "management", "executive", "director", "overview", "bigger picture", "leadership"] },
  { title: "ERP & accounting integrations", href: "/integrations", why: "Connects supported business records with Vanforces. Scope is agreed per project.", words: ["erp", "odoo", "zoho", "sap", "accounting", "integrat", "sync", "tally"] },
  { title: "Saudi e-invoicing support", href: "/integrations", why: "Configured invoice processing and validation workflows. Please confirm your exact requirements with the team.", words: ["saudi", "zatca", "e-invoic", "einvoic", "fatoora", "ksa"] },
  { title: "Entaura (separate platform)", href: "#entaura", why: "Lets managers ask questions of business information. It is a separate platform and is not part of every plan.", words: ["ai", "ask question", "questions", "chat", "alert", "notification", "ask my data"] },
];

const fallback: Suggestion[] = [
  { title: "Field Sales", href: "/platform/field-sales", why: "A good starting point for teams that visit customers." },
  { title: "Routes", href: "/platform/routes", why: "Plans visits and shows how each route went." },
  { title: "Collections", href: "/platform/collections", why: "Shows what is due and what has been collected." },
];

export const examplePrompts = [
  "25 sales reps, many delivery routes, and we struggle to track stock and collections",
  "We sell from vans and need cash collected and stock reconciled every day",
  "Our field team works with poor internet and we use Odoo for accounting",
  "Management wants one view of sales, balances and what needs attention",
];

/** Returns up to five suggestions for what the visitor wrote, best match first. `matched` is false when nothing fits. */
export function findSuggestions(text: string): { matched: boolean; items: Suggestion[] } {
  const input = ` ${text.toLowerCase()} `;
  const tokens = input.split(/[^a-z0-9-]+/).filter(Boolean);
  // A keyword matches the start of a whole word ("order" finds "orders"), so "live" never matches inside "delivery".
  // Very short keywords must match a whole word, and keywords with a space match as a phrase.
  const has = (word: string) => (word.includes(" ") ? input.includes(word) : tokens.some((token) => (word.length <= 3 ? token === word : token.startsWith(word))));
  const scored = rules
    .map((rule) => ({ rule, hits: Math.min(2, rule.words.filter(has).length) }))
    .filter((entry) => entry.hits > 0)
    .sort((a, b) => b.hits - a.hits)
    .slice(0, 5);  if (scored.length === 0) return { matched: false, items: fallback };
  return { matched: true, items: scored.map(({ rule }) => ({ title: rule.title, href: rule.href, why: rule.why })) };
}

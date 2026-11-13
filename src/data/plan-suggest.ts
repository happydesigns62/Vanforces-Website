import type { PlanId } from "@/data/pricing";

export type PlanSuggestion = { plan: PlanId; reason: string };

const has = (text: string, words: string[]) => words.filter((w) => new RegExp(`(^|[^a-z])${w}`, "i").test(text));

/**
 * A simple, honest keyword match from a visitor's own words to one of the three plans. It is a starting point, not a quote: the copy
 * that shows it says the right plan is confirmed in a demo. Nothing typed is stored or sent.
 */
export function suggestPlan(raw: string): PlanSuggestion {
  const text = raw.toLowerCase();
  const users = text.match(/(\d{1,5})\s*(\+\s*)?(users|salesmen|salesman|salespeople|reps|agents|drivers|people|staff|employees)/);
  const count = users ? Number(users[1]) : 0;

  const big = has(text, ["erp", "odoo", "zoho", "sap", "integrat", "branches", "multi-branch", "command center", "cxo", "executive", "enterprise", "head office", "several countries"]);
  if (big.length || count >= 50) {
    return { plan: "enterprise", reason: count >= 50 ? `A team of ${count} usually needs the wider setup in Enterprise.` : `You mentioned ${big[0]}, which is covered by Enterprise.` };
  }

  const mid = has(text, ["van", "vehicle", "truck", "delivery", "deliveries", "warehouse", "stock", "inventory", "collection", "collect", "payment", "settlement", "invoice", "load"]);
  if (mid.length || count >= 15) {
    return { plan: "premium", reason: mid.length ? `You mentioned ${mid[0]}, which is part of Premium.` : `A team of ${count} usually fits Premium.` };
  }

  const small = has(text, ["field", "visit", "route", "order", "customer", "salesm", "small", "startup", "start"]);
  if (small.length || count > 0) {
    return { plan: "basic", reason: "Customers, routes and orders for a field team are covered by Basic." };
  }

  return { plan: "premium", reason: "Premium is a good starting point while we learn more about your operation." };
}
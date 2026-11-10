import type { Faq, Feature, FeatureLayout, HeroVisual } from "./modules";
import type { PhoneKey, WebKey } from "./media";

export type RoleSolution = {
  slug: string;
  role: string;
  eyebrow: string;
  heading: string;
  description: string;
  selectorBody: string;
  cta: { label: string; href: string };
  layout: FeatureLayout;
  visual: HeroVisual;
  sectionHeading: string;
  sections: Feature[];
  featureVisual?: { web?: WebKey; phone?: PhoneKey };
  dayInLife: { heading: string; body: string; steps: string[] };
  faqs: Faq[];
  related: { label: string; href: string; body: string }[];
};

export const solutions: RoleSolution[] = [
  {
    slug: "field-teams",
    role: "Field Teams",
    eyebrow: "For Field Teams",
    heading: "A Better Day Starts With the Right Information.",
    description: "Salespeople and drivers spend the day away from the office. Vanforces puts the next stop, the customer context and the transaction tools in one mobile application.",
    selectorBody: "Know the next stop, have the customer context at hand and record the work as it happens.",
    cta: { label: "Book a Field Sales Demo", href: "/book-demo" },
    layout: "sticky",
    visual: { kind: "phones", phones: ["dashboard", "transactions"] },
    sectionHeading: "Support before, during and after each visit.",
    featureVisual: { phone: "route" },
    sections: [
      { title: "Before the Visit", body: "Start the day, review your assigned journey and check the customers coming up. Knowing the order of stops and the customer context in advance makes each conversation easier to begin." },
      { title: "During the Visit", body: "Check in where applicable, select products, confirm quantities and create supported orders or invoices. Applicable payments can be recorded while you are still with the customer." },
      { title: "After the Visit", body: "Move to the next stop with the last one already recorded. At the end of the day, review your transactions and any pending synchronization instead of rebuilding the day from memory." },
      { title: "Offline Workflows", body: "A weak signal doesn't need to stop eligible work. Supported transactions can be captured offline and submitted when connectivity becomes available, with progress visible by record type." },
    ],
    dayInLife: {
      heading: "A working day, as a field user sees it",
      body: "The mobile dashboard brings the day's totals together in one place: sales, cash and credit collected, settlement, orders and visits. Field users can see where the day stands without asking the office.",
      steps: ["Punch in", "Start of Day", "Follow route", "Sell and collect", "Sync", "Finish"],
    },
    faqs: [
      { q: "Do field users need training?", a: "Introducing the mobile workflows is part of preparing the team. See the Deployment page for how this fits into a rollout." },
      { q: "Can the app be used in another language?", a: "The mobile sign-in screen includes a Change Language option. Available languages depend on your configuration." },
    ],
    related: [
      { label: "Field Sales", href: "/platform/field-sales", body: "The full field sales workflow." },
      { label: "Routes", href: "/platform/routes", body: "Journey planning and visit records." },
      { label: "Offline Operations", href: "/platform/offline", body: "Working through weak coverage." },
    ],
  },
  {
    slug: "managers",
    role: "Managers & Operations",
    eyebrow: "For Managers & Operations",
    heading: "Less Chasing Updates. More Time Moving the Work Forward.",
    description: "Operations managers often spend the morning asking where things stand. Vanforces brings route, stock and delivery activity into views the team can review together.",
    selectorBody: "See route readiness, daily activity, stock and delivery without chasing updates.",
    cta: { label: "Book an Operations Demo", href: "/book-demo" },
    layout: "bento",
    visual: { kind: "web", web: "adminHome" },
    sectionHeading: "The questions a manager asks every day.",
    sections: [
      { title: "Route Readiness", body: "Check whether routes, customers and master data are ready before the day begins. Readiness indicators on lists such as distributors and products help highlight records that need attention." },
      { title: "Daily Activity", body: "Review sales, collection, order and delivery information for a selected period from the admin dashboard." },
      { title: "Stock & Delivery", body: "Follow loading, unloading and delivery activity as connected records, so a question about stock can start with a record rather than a phone call." },
      { title: "Exceptions", body: "Items marked with warnings or incomplete details are easier to find when they are flagged in the list you already use." },
      { title: "Reporting", body: "Use visit, target and transaction reports to review how the day went and prepare the next one." },
    ],
    dayInLife: {
      heading: "A simple management rhythm",
      body: "Good operations reviews are repetitive by design. Check readiness in the morning, look at activity during the day, and finish with what needs attention tomorrow.",
      steps: ["Check readiness", "Review activity", "Spot exceptions", "Follow up", "Plan tomorrow"],
    },
    faqs: [
      { q: "Can managers review visits by route?", a: "The Route Customer Visit view filters customer visit, checklist and exception status across selected routes and dates." },
      { q: "Can user access be limited by role?", a: "Available roles and permissions support different operational responsibilities." },
    ],
    related: [
      { label: "Control Room", href: "/platform/control-room", body: "The working day on one screen." },
      { label: "Routes", href: "/platform/routes", body: "Plan and review field activity." },
      { label: "Delivery", href: "/platform/delivery", body: "Assignment to handover." },
    ],
  },
  {
    slug: "finance",
    role: "Finance Teams",
    eyebrow: "For Finance Teams",
    heading: "The Collection Story Shouldn't Be Scattered.",
    description: "Finance teams need to know what was invoiced, what was collected and what is still open. Vanforces keeps collection activity connected to the customers and transactions behind it.",
    selectorBody: "Follow receivables, field payments, receipts and settlements with the transaction context intact.",
    cta: { label: "Book a Finance Demo", href: "/book-demo" },
    layout: "ledger",
    visual: { kind: "web", web: "cxoFinance" },
    sectionHeading: "Five records that tell the whole story.",
    featureVisual: { web: "cxoTrends" },
    sections: [
      { title: "Customer Receivables", body: "Review available customer balances as part of a wider financial picture rather than in a separate spreadsheet." },
      { title: "Outstanding Invoices", body: "See what remains open by customer, so follow-up conversations start with the relevant documents." },
      { title: "Field Payments", body: "Applicable payments recorded on the road are tied to the customer and field user who recorded them." },
      { title: "Receipts", body: "Keep payment information associated with customer transactions, making later review easier." },
      { title: "Settlements", body: "Follow recorded field collections and settlement activity to match what was recorded with what reached the office." },
    ],
    dayInLife: {
      heading: "Where finance fits in the day",
      body: "Finance work often happens after the field work. Connected records mean the review can begin from what was already captured instead of waiting for paperwork to arrive.",
      steps: ["Invoice issued", "Payment recorded", "Settlement reviewed", "Balance updated", "Trend reviewed"],
    },
    faqs: [
      { q: "Does Vanforces replace our accounting system?", a: "Vanforces focuses on distribution operations. It can work alongside applicable accounting systems through integration approaches defined for each project." },
      { q: "Can we see an order-to-cash view?", a: "The CXO Business Command Center includes an order-to-cash funnel from quotations through to settlements." },
    ],
    related: [
      { label: "Collections", href: "/platform/collections", body: "The full collections workflow." },
      { label: "Command Center", href: "/business-command-center", body: "Executive financial views." },
      { label: "Zoho Books", href: "/integrations/zoho-books", body: "Accounting and field activity." },
    ],
  },
  {
    slug: "it-erp",
    role: "IT & ERP Teams",
    eyebrow: "For IT & ERP Teams",
    heading: "Extend the Systems You Already Rely On.",
    description: "Your ERP or accounting system remains important. The question is how its data reaches the field and how field transactions come back in a controlled way.",
    selectorBody: "Plan architecture, data ownership, mapping, synchronization, logs and reconciliation.",
    cta: { label: "Talk to Our Integration Team", href: "/contact" },
    layout: "rail",
    visual: { kind: "web", web: "settings" },
    sectionHeading: "The questions every integration has to answer.",
    sections: [
      { title: "Integration Architecture", body: "Define which systems are involved, how they exchange data and what happens between them. The approach depends on the connector and the implementation scope." },
      { title: "Data Ownership", body: "Agree which system is the source of truth for customers, products and prices, and which records begin in the field." },
      { title: "Mapping", body: "Match customers, products, units, tax and document types between systems before any data moves." },
      { title: "Synchronization", body: "Decide what moves, in which direction and how often through configured integration workflows." },
      { title: "Logs", body: "Use available statuses and logs so teams can see what was exchanged and what was not." },
      { title: "Reconciliation", body: "Plan how the two systems are compared, and who resolves differences when they appear." },
    ],
    dayInLife: {
      heading: "A sensible way to scope an integration",
      body: "Start small and prove the data. A narrower first scope is easier to test than trying to connect everything at once.",
      steps: ["List systems", "Agree ownership", "Map records", "Test exchange", "Review exceptions"],
    },
    faqs: [
      { q: "Do you support every ERP?", a: "Exact capabilities depend on the connector and implementation scope. Share your requirements so they can be reviewed." },
      { q: "Who owns the data?", a: "Data ownership is agreed as part of the integration design, with a clear source of truth for each record type." },
    ],
    related: [
      { label: "ERP Integration API", href: "/integrations/erp-api", body: "Mapping and document exchange." },
      { label: "Odoo", href: "/integrations/odoo", body: "Bring Odoo data into the day." },
      { label: "Deployment", href: "/company/deployment", body: "How a rollout comes together." },
    ],
  },
];

export const solutionBySlug = (slug: string) => solutions.find((s) => s.slug === slug);

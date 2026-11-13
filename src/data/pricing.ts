// EDIT DEMO PRICING HERE. These are illustrative amounts, not official Vanforces prices.
export type PlanId = "basic" | "premium" | "enterprise";
export type Billing = "monthly" | "annual";

export type Plan = {
  id: PlanId;
  name: string;
  monthly: number;
  annualMonthly: number;
  annualTotal: number;
  illustrativeSuffix?: string;
  tagline: string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
};

export const PRICING_NOTICE =
  "Demonstration prices in US dollars, excluding tax. Feature allocations shown for website preview. Actual Vanforces subscription plans and commercial terms may differ.";

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    monthly: 12,
    annualMonthly: 10,
    annualTotal: 120,
    tagline: "Get the Essentials in Place.",
    description: "A practical starting point for field sales teams that need customer, route and daily sales workflows.",
    features: [
      "Customer Management",
      "Route & Visit Management",
      "Mobile Order Capture",
      "Sales Transactions",
      "Basic Reporting",
      "Supported Offline Workflows",
      "Standard User Management",
      "Basic Dashboard",
    ],
    cta: { label: "Choose Basic", href: "/get-started?plan=basic" },
  },
  {
    id: "premium",
    name: "Premium",
    monthly: 24,
    annualMonthly: 19,
    annualTotal: 228,
    tagline: "Bring More of Your Operation Together.",
    description: "A broader connected distribution experience across field sales, stock, deliveries and collections.",
    features: [
      "Everything in Basic",
      "Van Sales",
      "Warehouse & Van Inventory",
      "Vehicle Loading & Unloading",
      "Delivery Management",
      "Collections & Receipts",
      "Settlement Review",
      "Advanced Operational Reporting",
      "Business Dashboard",
    ],
    cta: { label: "Choose Premium", href: "/get-started?plan=premium" },
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthly: 48,
    annualMonthly: 38,
    annualTotal: 456,
    illustrativeSuffix: "Illustrative",
    tagline: "Built Around Your Requirements.",
    description: "A solution tier for businesses with more extensive distribution and integration requirements.",
    features: [
      "Everything in Premium",
      "Multi-Branch Operational Configuration",
      "Extended Reporting",
      "CXO Business Command Center",
      "Advanced Role Configuration",
      "ERP Integration Planning",
      "Deployment Consultation",
      "Implementation Planning",
      "Additional Configuration Options",
    ],
    cta: { label: "Contact Sales", href: "/contact" },
  },
];

/** A cell is included (true), not included (false), or a short qualifier. */
export type ComparisonCell = boolean | string;
export type ComparisonRow = { feature: string; basic: ComparisonCell; premium: ComparisonCell; enterprise: ComparisonCell };

export const comparison: ComparisonRow[] = [
  { feature: "Customer Management", basic: true, premium: true, enterprise: true },
  { feature: "Field Sales", basic: true, premium: true, enterprise: true },
  { feature: "Route Planning", basic: true, premium: true, enterprise: true },
  { feature: "Orders", basic: true, premium: true, enterprise: true },
  { feature: "Invoicing", basic: true, premium: true, enterprise: true },
  { feature: "Offline Operations", basic: "Supported workflows", premium: "Supported workflows", enterprise: "Supported workflows" },
  { feature: "Van Sales", basic: false, premium: true, enterprise: true },
  { feature: "Warehouse Inventory", basic: false, premium: true, enterprise: true },
  { feature: "Vehicle Loading", basic: false, premium: true, enterprise: true },
  { feature: "Delivery", basic: false, premium: true, enterprise: true },
  { feature: "Collections", basic: false, premium: true, enterprise: true },
  { feature: "Settlements", basic: false, premium: "Review", enterprise: "Review" },
  { feature: "Standard Reports", basic: "Basic", premium: true, enterprise: true },
  { feature: "Advanced Reporting", basic: false, premium: true, enterprise: "Extended" },
  { feature: "Business Command Center", basic: false, premium: false, enterprise: true },
  { feature: "ERP Integration Options", basic: false, premium: false, enterprise: "Planning" },
  { feature: "Multi-Branch Configuration", basic: false, premium: false, enterprise: true },
  { feature: "User Roles", basic: "Standard", premium: "Standard", enterprise: "Advanced" },
  { feature: "Deployment Consultation", basic: false, premium: false, enterprise: true },
];

export const pricingFaqs = [
  {
    q: "Are these the real Vanforces prices?",
    a: "No. Final plans and commercial terms should be confirmed with Vanforces.",
  },
  {
    q: "How does annual billing work in this preview?",
    a: "The annual option shows a lower per-user monthly rate, billed once a year. For example, Basic shows $10 per user per month, which is $120 per user for the year. All prices are in US dollars and exclude tax.",
  },
  {
    q: "Can we compare plans?",
    a: "Yes. The comparison table on this page shows the example allocation across all three plans. Actual commercial terms should be confirmed separately.",
  },
  {
    q: "Can we request a demo before subscribing?",
    a: "Yes. The Book a Demo page lets you describe your operation so the conversation can focus on the workflows that matter to you.",
  },
  {
    q: "Are Entaura.ai and SpeakOrder included in these plans?",
    a: "They are not shown as part of any plan here. Entaura.ai is a separately branded platform, and SpeakOrder is a product preview.",
  },
  {
    q: "Can I actually subscribe from this website?",
    a: "Not yet. Get Started does not create an account or process a payment.",
  },
];

export const formatUSD = (value: number) => `$${Math.round(value).toLocaleString("en-US")}`;

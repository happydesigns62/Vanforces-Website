import type { Faq } from "./modules";
import type { PhoneKey, WebKey } from "./media";

export type Industry = {
  slug: string;
  name: string;
  short: string;
  eyebrow: string;
  heading: string;
  description: string;
  composition: "outlets" | "flow" | "chain" | "cycle";
  challengesHeading: string;
  challenges: { title: string; body: string }[];
  workflowHeading: string;
  workflowIntro: string;
  workflow: string[];
  scenario: string;
  scenarioDetail: string;
  value: string;
  cta: { label: string; href: string };
  web?: WebKey;
  phones?: PhoneKey[];
  modules: { label: string; href: string }[];
  faqs: Faq[];
};

export const industries: Industry[] = [
  {
    slug: "fmcg",
    name: "FMCG & Consumer Goods",
    short: "Frequent visits to many outlets, each with its own prices and balances.",
    eyebrow: "FMCG & Consumer Goods",
    heading: "Many Outlets. One Working Day to Get It Right.",
    description: "FMCG distribution depends on repeating a lot of small visits well. Vanforces gives field teams the route, the customer context and the tools to record each one.",
    composition: "outlets",
    challengesHeading: "Small visits add up to big days.",
    challenges: [
      { title: "Frequent customer visits", body: "A salesperson may see many outlets in a day, leaving little time to look up details at each stop." },
      { title: "Varied prices", body: "Outlets of different sizes may have different pricing, so the right price needs to be close at hand." },
      { title: "Sales transactions", body: "Each sale needs the right products, quantities and documents, often created at the counter." },
      { title: "Collections", body: "Money is often collected in the same visit, so balances and payments need to stay connected to the customer." },
    ],
    workflowHeading: "How the FMCG day connects",
    workflowIntro: "Each part of the visit is recorded where it happens, building the record the next visit relies on.",
    workflow: ["Route assignments", "Customer context", "Orders", "Invoicing", "Collections"],
    scenario: "A regional distributor serves supermarkets, grocery stores and neighborhood retail outlets.",
    scenarioDetail: "A supermarket buyer and a neighborhood shop owner need very different conversations. With the customer context available on the route, the salesperson prepares for each one and records what happened before moving on.",
    value: "Better-connected customer visits and transaction records.",
    cta: { label: "Book an FMCG Demo", href: "/book-demo" },
    phones: ["route", "dashboard"],
    modules: [
      { label: "Field Sales", href: "/platform/field-sales" },
      { label: "Routes", href: "/platform/routes" },
      { label: "Customers", href: "/platform/customers" },
      { label: "Collections", href: "/platform/collections" },
    ],
    faqs: [
      { q: "Can routes be organized by day?", a: "The mobile Route Journey Plan shows customers by day in map and list views." },
      { q: "Can salespeople see customer pricing?", a: "Applicable customer-specific pricing information can be accessed in supported workflows." },
    ],
  },
  {
    slug: "food-beverage",
    name: "Food & Beverage",
    short: "Frequent deliveries, vehicle stock, changing quantities and returns.",
    eyebrow: "Food & Beverage",
    heading: "The Stock Is Moving. Your Records Should Keep Up.",
    description: "Food and beverage distribution moves quickly, and quantities change along the way. Vanforces helps connect the vehicle, the customer and the stock record.",
    composition: "flow",
    challengesHeading: "Fast-moving products leave little room for slow records.",
    challenges: [
      { title: "Frequent deliveries", body: "Outlets may be restocked often, which creates a steady stream of loads and transactions to track." },
      { title: "Vehicle stock", body: "What is on the vehicle determines what can be sold, so the record needs to stay current." },
      { title: "Changing quantities", body: "Actual quantities can differ from what was planned at the warehouse or on the route." },
      { title: "Returns", body: "Returned and damaged products have to be accounted for rather than quietly absorbed." },
    ],
    workflowHeading: "Follow the stock through the day",
    workflowIntro: "A connected stock journey gives the warehouse and the route team the same picture.",
    workflow: ["Warehouse preparation", "Loading", "Customer transactions", "Unloading", "Stock review"],
    scenario: "A beverage distributor delivers products to cafes, food outlets and retail stores.",
    scenarioDetail: "The morning load covers a mix of regular outlets. A cafe takes extra cases, a shop takes fewer, and damaged items are recorded. Returning to the depot, the unload and stock review begin with those records already in place.",
    value: "A clearer record of how stock moved through the day and which transactions were behind it.",
    cta: { label: "Explore Food Distribution", href: "/platform/inventory" },
    phones: ["transactions", "sync"],
    modules: [
      { label: "Van Sales", href: "/platform/van-sales" },
      { label: "Inventory", href: "/platform/inventory" },
      { label: "Delivery", href: "/platform/delivery" },
      { label: "Collections", href: "/platform/collections" },
    ],
    faqs: [
      { q: "Does Vanforces track product expiry?", a: "This site does not make a specific claim about expiry tracking. Please raise it during a demo so it can be reviewed." },
      { q: "Can damages be recorded?", a: "The mobile transaction menu includes a Salesman Damage entry for supported workflows." },
    ],
  },
  {
    slug: "wholesale-distribution",
    name: "Wholesale Distribution",
    short: "Customer orders, warehouse stock, fulfilment, delivery and outstanding amounts.",
    eyebrow: "Wholesale Distribution",
    heading: "Keep the Moving Parts of Distribution in View.",
    description: "Wholesale work passes through several hands before it is finished. Vanforces helps keep the order connected from the first request to the final payment.",
    composition: "chain",
    challengesHeading: "Each handoff is a chance for details to slip.",
    challenges: [
      { title: "Customer orders", body: "Larger, mixed orders with their own prices need to be captured accurately." },
      { title: "Warehouse stock", body: "Availability affects what can be promised and when." },
      { title: "Fulfilment", body: "Warehouse teams need clear information on what to prepare." },
      { title: "Delivery", body: "Scheduled runs mean any change has to reach the right people in time." },
      { title: "Outstanding amounts", body: "Larger accounts make it more important to know what is open and what has been paid." },
    ],
    workflowHeading: "From request to account",
    workflowIntro: "Connected records keep each team working from the same information.",
    workflow: ["Customer management", "Orders", "Inventory", "Deliveries", "Collections"],
    scenario: "A wholesale supplier serves retailers through sales teams and scheduled delivery runs.",
    scenarioDetail: "A retailer places a large order during a sales visit. The warehouse prepares it for the next scheduled run, delivery confirms what arrived, and finance follows the balance. Each step begins with the previous record.",
    value: "A more organized view of the steps between customer demand and financial follow-up.",
    cta: { label: "Book a Wholesale Demo", href: "/book-demo" },
    web: "products",
    modules: [
      { label: "Orders & Invoicing", href: "/platform/orders" },
      { label: "Inventory", href: "/platform/inventory" },
      { label: "Delivery", href: "/platform/delivery" },
      { label: "Collections", href: "/platform/collections" },
    ],
    faqs: [
      { q: "Can we manage distributors as well as customers?", a: "The admin panel includes a Distributors list with readiness, linked customers and status." },
      { q: "Can quotations turn into orders?", a: "Supported workflows include quotations and orders. The exact flow can be reviewed during a demo." },
    ],
  },
  {
    slug: "direct-store-delivery",
    name: "Direct Store Delivery",
    short: "Stock-carrying vehicles need accurate sales, payment and stock movement records.",
    eyebrow: "Direct Store Delivery",
    heading: "Load. Visit. Sell. Collect. Reconcile.",
    description: "In direct store delivery, the vehicle is the warehouse, the shop and the cash desk. Vanforces helps connect each step so the day closes with records you can review.",
    composition: "cycle",
    challengesHeading: "Everything happens at the same stop.",
    challenges: [
      { title: "Accurate sales records", body: "Sales happen on the spot, directly from what the vehicle carries." },
      { title: "Payment records", body: "Payments collected on the route have to be tied to the customer and the transaction." },
      { title: "Stock movement records", body: "Loads, sales, returns and unloads need to tell one consistent story." },
    ],
    workflowHeading: "One day, six connected steps",
    workflowIntro: "Each step sets up the next, leading to a reconciliation built on recorded activity.",
    workflow: ["Loading", "Visit", "Direct Sale", "Collection", "Unloading", "Reconciliation"],
    scenario: "A direct distribution business sells products to stores from assigned vehicles.",
    scenarioDetail: "A vehicle leaves with a recorded load. At each store, the driver-salesperson sells from what is on board and records any payment. When the vehicle returns, the unload and the day's transactions give the supervisor a place to start reviewing.",
    value: "Daily vehicle activity that is easier to review because sales, payments and stock are connected.",
    cta: { label: "Explore Van Sales", href: "/platform/van-sales" },
    phones: ["transactions", "dashboard"],
    modules: [
      { label: "Van Sales", href: "/platform/van-sales" },
      { label: "Routes", href: "/platform/routes" },
      { label: "Inventory", href: "/platform/inventory" },
      { label: "Offline Operations", href: "/platform/offline" },
    ],
    faqs: [
      { q: "Can DSD teams work without coverage?", a: "Supported mobile workflows can operate offline and synchronize when connectivity becomes available." },
      { q: "Is this the same as van sales?", a: "Van Sales is the Vanforces module most closely connected to direct store delivery workflows." },
    ],
  },
];

export const industryBySlug = (slug: string) => industries.find((i) => i.slug === slug);

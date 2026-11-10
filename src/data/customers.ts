// SAMPLE CONTENT. Every company, person, quote, figure and story in this file is fictional.
// Replace with verified customer content when it becomes available.
import type { PhoneKey, WebKey } from "./media";

export const SAMPLE_LOGO_LABEL = "Sample Customer Identities — Design Preview";

export type SampleCompany = {
  slug: string;
  name: string;
  sector: string;
  /** Visual treatment for the typographic placeholder logo. */
  style: string;
  mark: "bar" | "ring" | "steps" | "dot" | "slant" | "wave" | "split";
};

export const sampleCompanies: SampleCompany[] = [
  { slug: "northline-distribution", name: "Northline Distribution", sector: "FMCG", style: "font-extrabold tracking-tight", mark: "bar" },
  { slug: "freshway-supplies", name: "Freshway Supplies", sector: "Food & Beverage", style: "font-medium italic", mark: "wave" },
  { slug: "meridian-wholesale", name: "Meridian Wholesale", sector: "General Distribution", style: "font-semibold uppercase tracking-[0.12em] text-[0.82em]", mark: "ring" },
  { slug: "evercrest-trading", name: "Evercrest Trading", sector: "Consumer Goods", style: "font-[Georgia,serif] font-bold", mark: "steps" },
  { slug: "bluefield-logistics", name: "Bluefield Logistics", sector: "Direct Store Delivery", style: "font-light tracking-tight", mark: "split" },
  { slug: "westbridge-foods", name: "Westbridge Foods", sector: "Food Distribution", style: "font-[Georgia,serif] italic", mark: "dot" },
  { slug: "primeroute-supply", name: "PrimeRoute Supply", sector: "Wholesale", style: "font-extrabold uppercase tracking-wide text-[0.86em]", mark: "slant" },
];

export const sampleMetrics = [
  { value: "42+", label: "Businesses" },
  { value: "1,280+", label: "Field Users" },
  { value: "94,000+", label: "Transactions Processed" },
];
export const SAMPLE_METRICS_NOTE = "Illustrative design data, not verified Vanforces figures.";

export type Testimonial = { topic: string; quote: string; person: string; company: string };

export const homeReviews: Testimonial[] = [
  {
    topic: "Field Sales",
    quote: "Having our route activity and customer transactions in one place has made daily work easier to review.",
    person: "Faisal Al-Harbi",
    company: "Sales Manager, Northline Distribution",
  },
  {
    topic: "Operations",
    quote: "Vanforces gives our team a more organized way to handle sales, stock and collections across daily operations.",
    person: "Priya Nair",
    company: "Operations Manager, Freshway Supplies",
  },
];

export const testimonials: Testimonial[] = [
  {
    topic: "Field Sales",
    quote: "Having customer visits, orders and collections organized in one workflow gives our team a more practical way to review daily work.",
    person: "Omar Siddiqui",
    company: "Northline Distribution",
  },
  {
    topic: "Van Sales",
    quote: "Connecting vehicle stock with route transactions helps us keep daily van sales activity better organized.",
    person: "Anjali Menon",
    company: "Freshway Supplies",
  },
  {
    topic: "Collections",
    quote: "Outstanding invoices and recorded payments are easier to review when the information is connected to the customer.",
    person: "Khalid Mansoor",
    company: "Meridian Wholesale",
  },
  {
    topic: "Reporting",
    quote: "The Command Center gives us a clearer starting point for reviewing performance across our distribution activities.",
    person: "Rashid Al-Otaibi",
    company: "Evercrest Trading",
  },
  {
    topic: "Delivery",
    quote: "Keeping the delivery workflow and order information together makes follow-up easier for our operations team.",
    person: "Vivek Sharma",
    company: "Bluefield Logistics",
  },
  {
    topic: "Inventory",
    quote: "Following the stock journey from warehouse loading to vehicle unloading makes the day's movements easier to understand.",
    person: "Yusuf Rahman",
    company: "Westbridge Foods",
  },
];

export type CustomerStory = {
  slug: string;
  title: string;
  company: string;
  industry: string;
  excerpt: string;
  context: string;
  challenge: string;
  workflow: string;
  value: string;
  modules: { label: string; href: string }[];
  /** Short illustrative steps showing how the day flows. */
  dayFlow: string[];
  web?: WebKey;
  phones?: PhoneKey[];
  quoteIndex: number;
};

export const customerStories: CustomerStory[] = [
  {
    slug: "northline-distribution",
    title: "Making Every Outlet Visit More Organized.",
    company: "Northline Distribution",
    industry: "FMCG",
    excerpt: "A look at how a regional distributor could organize route visits, orders and collections.",
    context: "A regional distributor serves grocery stores, supermarkets and neighborhood retail outlets across several delivery and sales routes.",
    challenge: "Salespeople must manage customer visits, product selection, orders and collections throughout a busy working day.",
    workflow: "Field users follow assigned journeys, review customer information and record supported sales or collection transactions from the mobile application.",
    value: "A connected process provides a more organized record of field activity and the related business transactions.",
    modules: [
      { label: "Field Sales", href: "/platform/field-sales" },
      { label: "Routes", href: "/platform/routes" },
      { label: "Customers", href: "/platform/customers" },
      { label: "Orders", href: "/platform/orders" },
      { label: "Collections", href: "/platform/collections" },
    ],
    dayFlow: ["Review the assigned journey", "Open the next customer", "Record the order or sale", "Capture any collection", "Review the day's transactions"],
    phones: ["route", "dashboard"],
    quoteIndex: 0,
  },
  {
    slug: "freshway-supplies",
    title: "From Vehicle Loading to End-of-Day Reconciliation.",
    company: "Freshway Supplies",
    industry: "Food & Beverage",
    excerpt: "A stock journey for a beverage distributor working with stock-carrying vehicles.",
    context: "A beverage distributor serves retail outlets and food-service customers using stock-carrying vehicles.",
    challenge: "Products move from the warehouse into the vehicle, then to customers, with remaining stock and returns requiring review.",
    workflow: "Vehicle loading, route sales, payments, unloading and relevant stock records are handled through connected operational workflows.",
    value: "The business can review the records behind daily stock movement and customer transactions with more context.",
    modules: [
      { label: "Van Sales", href: "/platform/van-sales" },
      { label: "Inventory", href: "/platform/inventory" },
      { label: "Sales", href: "/platform/orders" },
      { label: "Collections", href: "/platform/collections" },
    ],
    dayFlow: ["Load the vehicle", "Follow the route", "Sell from van stock", "Record payments", "Unload and reconcile"],
    phones: ["transactions", "sync"],
    quoteIndex: 1,
  },
  {
    slug: "meridian-wholesale",
    title: "Keeping Orders, Deliveries and Accounts Connected.",
    company: "Meridian Wholesale",
    industry: "Wholesale Distribution",
    excerpt: "A view of the steps between customer demand and financial follow-up.",
    context: "A wholesale supplier receives orders from retail customers and coordinates fulfilment through warehouse and delivery teams.",
    challenge: "The business needs to track the relationship between customer orders, stock preparation, delivery and account activity.",
    workflow: "Supported customer orders, inventory records, delivery activity and collections form a connected operational process.",
    value: "The business gains a more organized view of the steps between customer demand and financial follow-up.",
    modules: [
      { label: "Orders", href: "/platform/orders" },
      { label: "Inventory", href: "/platform/inventory" },
      { label: "Delivery", href: "/platform/delivery" },
      { label: "Collections", href: "/platform/collections" },
    ],
    dayFlow: ["Receive the customer order", "Prepare warehouse stock", "Dispatch the delivery", "Confirm what was delivered", "Follow up on the account"],
    web: "products",
    quoteIndex: 2,
  },
  {
    slug: "evercrest-trading",
    title: "A Clearer View Across the Distribution Business.",
    company: "Evercrest Trading",
    industry: "Consumer Goods",
    excerpt: "A leadership view of connected sales, customer and collection reporting.",
    context: "A distribution business manages several sales routes and needs management visibility across daily transactions.",
    challenge: "Sales, customer balances and collections may be reviewed through separate reports and operational records.",
    workflow: "The CXO Business Command Center presents relevant business views across sales, customers, routes and financial information.",
    value: "Leadership can review business activity from a broader operational perspective.",
    modules: [
      { label: "Business Command Center", href: "/business-command-center" },
      { label: "Reporting", href: "/platform/intelligence" },
      { label: "Sales", href: "/platform/orders" },
      { label: "Collections", href: "/platform/collections" },
    ],
    dayFlow: ["Open the Command Center", "Review executive KPIs", "Follow the order-to-cash funnel", "Switch business perspective", "Agree what needs attention"],
    web: "cxoFinance",
    quoteIndex: 3,
  },
];

export const VIDEO_LABEL = "Customer Video";

export const videos = [
  {
    title: "A Day in FMCG Distribution",
    company: "Northline Distribution",
    description: "A look at route visits, customer orders and collections.",
    tone: "bg-navy",
  },
  {
    title: "From Van Loading to Route Sales",
    company: "Freshway Supplies",
    description: "A direct store delivery workflow.",
    tone: "bg-teal-deep",
  },
  {
    title: "Seeing the Bigger Business Picture",
    company: "Evercrest Trading",
    description: "A leadership view of connected operational reporting.",
    tone: "bg-navy-deep",
  },
];

// Educational sample guides. Marked as draft resources until approved for publication.
export type Guide = {
  slug: string;
  title: string;
  summary: string;
  topic: string;
  readTime: string;
  introduction: string[];
  concepts: { term: string; meaning: string }[];
  workflow: string[];
  challenges: string[];
  checklist: string[];
  modules: { label: string; href: string }[];
  closing: string;
};

export const guides: Guide[] = [
  {
    slug: "understanding-van-sales-operations",
    title: "Understanding Van Sales Operations",
    summary: "Learn how stock loading, direct selling, customer payments and end-of-day reconciliation fit together in a van sales operation.",
    topic: "Van Sales",
    readTime: "6 min read",
    introduction: [
      "In a van sales operation, the vehicle does three jobs at once. It is a small warehouse, a shop counter and a place where money changes hands. That is what makes van sales both efficient and difficult to control.",
      "Unlike a pre-sales model, where an order is taken today and delivered later, a van salesperson sells what is on board and hands it over immediately. Every transaction changes stock and often cash on the spot, so the records need to keep pace with the road.",
    ],
    concepts: [
      { term: "Vehicle stock", meaning: "The products currently on a vehicle, which act as a mobile inventory location." },
      { term: "Load and unload", meaning: "Movements of stock from warehouse to vehicle in the morning and back again later." },
      { term: "Direct sale", meaning: "A sale made and fulfilled at the same stop from vehicle stock." },
      { term: "Settlement", meaning: "The review of what a salesperson recorded and collected during a period." },
      { term: "Reconciliation", meaning: "Comparing expected stock and money with what is actually present." },
    ],
    workflow: [
      "Prepare the load based on the route and expected demand, then record what goes onto the vehicle.",
      "Follow the assigned route, reviewing customer information before each visit.",
      "Sell from available stock and create the applicable document at the stop.",
      "Record any payment received against the customer.",
      "Return to the warehouse, unload remaining stock and account for returns and damages.",
      "Reconcile the day by comparing loaded, sold and returned quantities with collected amounts.",
    ],
    challenges: [
      "Stock differences that are only discovered at the end of the day, when it is hardest to find the cause.",
      "Cash and credit sales being mixed together, which makes settlement slower.",
      "Returns and damages that are written down late or not at all.",
      "Loads that do not match the route, leaving vehicles with too much of one product and too little of another.",
    ],
    checklist: [
      "Does every vehicle's load have a clear record?",
      "Can you see stock on the vehicle during the day?",
      "Are returns and damages recorded separately?",
      "Is settlement done daily, and who reviews it?",
      "Do you know the usual causes of your stock differences?",
    ],
    modules: [
      { label: "Van Sales", href: "/platform/van-sales" },
      { label: "Inventory", href: "/platform/inventory" },
      { label: "Collections", href: "/platform/collections" },
    ],
    closing: "Van sales works best when each step leaves a record that the next step can use. If you know what was loaded, sold, collected and returned, reconciliation becomes a review rather than an investigation.",
  },
  {
    slug: "planning-more-organized-customer-routes",
    title: "Planning More Organized Customer Routes",
    summary: "Explore the role of customer assignments, journey planning and visit information in daily field operations.",
    topic: "Routes",
    readTime: "5 min read",
    introduction: [
      "A route is more than a list of stops. It is a decision about which customers get attention, how often, and in what order. Those decisions affect sales coverage, driving time and how much a team can realistically do in a day.",
      "Good route planning is rarely a one-time exercise. Customers open and close, volumes change and new outlets appear. The most useful plans are easy to review and adjust.",
    ],
    concepts: [
      { term: "Customer assignment", meaning: "Linking each customer to a route or a salesperson." },
      { term: "Journey plan", meaning: "The sequence of customer visits for each day of a cycle." },
      { term: "Visit frequency", meaning: "How often each customer should be seen, usually based on value or need." },
      { term: "No-visit reason", meaning: "A recorded explanation for a planned visit that did not happen." },
    ],
    workflow: [
      "List all customers and group them by geography and required visit frequency.",
      "Assign groups to routes, keeping the workload realistic for a working day.",
      "Build a day-by-day journey plan and share it with field users.",
      "Have field users follow the plan and record visits or no-visit reasons.",
      "Review planned and actual visits regularly, then adjust the plan.",
    ],
    challenges: [
      "Routes that grew over time and no longer reflect where customers are.",
      "Salespeople favoring familiar or easy customers.",
      "Plans that exist on paper but aren't visible during the day.",
      "Missed visits with no reason recorded, leaving nothing to learn from.",
    ],
    checklist: [
      "Is every active customer assigned to a route?",
      "Does each route fit in a realistic working day?",
      "Are visit frequencies linked to customer needs?",
      "Can field users see the plan on the road?",
      "Do you review no-visit reasons regularly?",
    ],
    modules: [
      { label: "Routes", href: "/platform/routes" },
      { label: "Field Sales", href: "/platform/field-sales" },
      { label: "Customers", href: "/platform/customers" },
    ],
    closing: "An organized route gives the salesperson a clear day and gives the manager something concrete to review. Start with accurate customer assignments, keep plans visible, and treat visit records as feedback for the next plan.",
  },
  {
    slug: "connecting-field-sales-with-erp-systems",
    title: "Connecting Field Sales With ERP Systems",
    summary: "Understand data ownership, master-data mappings and transaction synchronization between business systems and field applications.",
    topic: "Integrations",
    readTime: "7 min read",
    introduction: [
      "Most distribution businesses already have an ERP or accounting system, and it usually remains the system of record for much of the business. A field application needs that data to be useful, and the business needs field activity to come back.",
      "Integration projects tend to succeed or struggle because of decisions made before any technical work begins. The main question is not how to connect the systems, but which system is responsible for what.",
    ],
    concepts: [
      { term: "Master data", meaning: "Slow-changing reference records, such as customers, products and price lists." },
      { term: "Transaction data", meaning: "Records of things that happened, such as orders, invoices and payments." },
      { term: "Source of truth", meaning: "The system considered correct for a given type of record." },
      { term: "Mapping", meaning: "The agreed match between a record or value in one system and its equivalent in another." },
      { term: "Exception", meaning: "A record that could not be exchanged or processed as expected." },
    ],
    workflow: [
      "List the systems involved and the business processes they support.",
      "Name a source of truth for each major record type.",
      "Clean and map customers, products, units and tax settings.",
      "Agree which transactions move, in which direction and how often.",
      "Test with real examples, including returns, discounts and edge cases.",
      "Set up a routine for reviewing exceptions and reconciling both systems.",
    ],
    challenges: [
      "Duplicate or inconsistent customer and product records discovered during mapping.",
      "Units of measure and packaging that differ between systems.",
      "Unclear responsibility when a record fails to synchronize.",
      "Trying to integrate every process at once, rather than starting with a focused scope.",
    ],
    checklist: [
      "Has each data type got a named owner?",
      "Have you tested with real, messy records?",
      "Is someone responsible for reviewing exceptions?",
      "Is there a way to compare totals between systems?",
      "Is the scope written down, including what is excluded?",
    ],
    modules: [
      { label: "ERP Integration API", href: "/integrations/erp-api" },
      { label: "Odoo", href: "/integrations/odoo" },
      { label: "Zoho Books", href: "/integrations/zoho-books" },
    ],
    closing: "A field application and an ERP are stronger together when their responsibilities are clear. Agree ownership, map data carefully and make exceptions visible, and integration becomes a manageable routine.",
  },
  {
    slug: "managing-customer-collections-in-distribution",
    title: "Managing Customer Collections in Distribution",
    summary: "Explore customer outstanding invoices, field collection records, receipts and settlement workflows.",
    topic: "Collections",
    readTime: "6 min read",
    introduction: [
      "In distribution, collecting payment is often part of the sales visit. The person standing in front of the customer may be taking an order and asking about an old invoice at the same time.",
      "That is why collections are not just a finance activity. Field teams need to know what is due, finance needs to know what was received, and both need a shared record.",
    ],
    concepts: [
      { term: "Outstanding", meaning: "The amount a customer still owes on open invoices." },
      { term: "Credit limit", meaning: "The maximum balance a business allows a customer to carry." },
      { term: "Receipt", meaning: "A record that a payment was received, linked to the customer." },
      { term: "Advance collection", meaning: "A payment received before it is applied to a specific invoice." },
      { term: "Settlement", meaning: "The review and handover of what a field user collected." },
    ],
    workflow: [
      "Before the route, review which customers have amounts due.",
      "Raise the balance during the visit, using the invoice details.",
      "Record the payment against the customer, using a supported method.",
      "Provide a receipt, following your own business process.",
      "At the end of the day, settle collected amounts with the office.",
      "Review outstanding amounts and collection trends regularly.",
    ],
    challenges: [
      "Salespeople visiting customers without knowing their balance.",
      "Payments that aren't linked to specific invoices.",
      "Delays between collecting money in the field and finance recording it.",
      "Disputes that are hard to resolve without a clear transaction history.",
    ],
    checklist: [
      "Can field users see balances before a visit?",
      "Is every payment linked to a customer record?",
      "Are collected amounts settled daily?",
      "Who follows up on overdue balances?",
      "Do you review collection trends by route or customer?",
    ],
    modules: [
      { label: "Collections", href: "/platform/collections" },
      { label: "Customers", href: "/platform/customers" },
      { label: "Finance Teams", href: "/solutions/finance" },
    ],
    closing: "Well-run collections depend on the same information reaching the field and the office. When balances, payments and settlements stay connected to the customer, follow-up becomes a simpler conversation.",
  },
  {
    slug: "understanding-warehouse-to-van-stock-movement",
    title: "Understanding Warehouse-to-Van Stock Movement",
    summary: "Learn how loading, vehicle inventory, sales, unloading and returns contribute to stock records.",
    topic: "Inventory",
    readTime: "5 min read",
    introduction: [
      "Stock doesn't stop being stock when it leaves the warehouse. For businesses with stock-carrying vehicles, each van is effectively another inventory location, with products arriving, leaving and sometimes returning damaged.",
      "A clear record of those movements makes it possible to explain where products went. Without one, stock differences tend to be written off rather than understood.",
    ],
    concepts: [
      { term: "Load request", meaning: "A request for stock to be prepared for a vehicle." },
      { term: "Load", meaning: "The recorded transfer of stock from warehouse to vehicle." },
      { term: "Unload", meaning: "The recorded return of remaining stock to the warehouse." },
      { term: "Return", meaning: "Products brought back from a customer." },
      { term: "Stock variance", meaning: "The difference between expected and actual quantities." },
    ],
    workflow: [
      "Prepare a load request based on the route's needs.",
      "Pick products in the warehouse and record the load onto the vehicle.",
      "Reduce vehicle stock as products are sold on the route.",
      "Record customer returns and any damages as they happen.",
      "Unload the remaining stock and count it at the warehouse.",
      "Compare expected and actual quantities, and review any differences.",
    ],
    challenges: [
      "Loads adjusted at the last minute without updating the record.",
      "Mixed units, such as selling single items from a case loaded as a whole.",
      "Good stock and damaged stock returned together without being separated.",
      "Counts done long after the vehicle has returned.",
    ],
    checklist: [
      "Is each load counted and recorded before departure?",
      "Is vehicle stock updated with each sale?",
      "Are returns and damages kept separate?",
      "Is the unload counted the same day?",
      "Are variances reviewed with the people involved?",
    ],
    modules: [
      { label: "Inventory", href: "/platform/inventory" },
      { label: "Van Sales", href: "/platform/van-sales" },
      { label: "Delivery", href: "/platform/delivery" },
    ],
    closing: "Warehouse-to-van movement is a chain of small records. If each link is captured at the moment it happens, the stock review becomes a straightforward check of how the day went.",
  },
  {
    slug: "using-business-reporting-for-daily-decisions",
    title: "Using Business Reporting for Daily Decisions",
    summary: "Understand how sales, collections, customer and route reports can provide useful operational context.",
    topic: "Reporting",
    readTime: "5 min read",
    introduction: [
      "A report only earns its place if someone does something differently after reading it. Many businesses have plenty of reports, but few that fit into a routine or lead to a clear decision.",
      "Useful daily reporting starts with questions. What sold? What was collected? What is still open? Which routes or customers need attention today?",
    ],
    concepts: [
      { term: "KPI", meaning: "A key performance indicator: a measure chosen because it reflects something important." },
      { term: "Order-to-cash", meaning: "The sequence from quotation or order through delivery, sale, collection and settlement." },
      { term: "Trend", meaning: "How a measure changes over time, which is often more useful than a single value." },
      { term: "Perspective", meaning: "A way of slicing the same business, such as by customer, route, product or distributor." },
    ],
    workflow: [
      "Pick a small set of questions that matter daily.",
      "Choose the view that answers each one, and agree who looks at it.",
      "Start with the overall totals, then move to routes, customers or products.",
      "Compare with a previous period to judge whether a value is unusual.",
      "Agree on an action and an owner for anything that needs attention.",
    ],
    challenges: [
      "Reports that take so long to prepare that they arrive too late to act on.",
      "Different teams quoting different figures for the same measure.",
      "Too many metrics, with no agreement on which matter most.",
      "Reviewing numbers without any follow-up action.",
    ],
    checklist: [
      "Do you have agreed definitions for your main measures?",
      "Is there a regular time to review them?",
      "Can you move from a total to the detail behind it?",
      "Is each action assigned to someone?",
      "Do you stop using reports nobody acts on?",
    ],
    modules: [
      { label: "Business Command Center", href: "/business-command-center" },
      { label: "Business Intelligence", href: "/platform/intelligence" },
      { label: "Managers & Operations", href: "/solutions/managers" },
    ],
    closing: "Reporting supports daily decisions when it is simple, regular and tied to action. Start with a few good questions, then build the habit of reviewing the answers together.",
  },
];

export const guideBySlug = (slug: string) => guides.find((g) => g.slug === slug);

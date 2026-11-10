import type { PhoneKey, WebKey } from "./media";

export type Faq = { q: string; a: string };
export type Feature = { title: string; body: string; id?: string };
export type FeatureLayout = "sticky" | "rail" | "bento" | "ledger" | "preview";

export type HeroVisual =
  | { kind: "web"; web: WebKey }
  | { kind: "phones"; phones: PhoneKey[] }
  | { kind: "pair"; web: WebKey; phone: PhoneKey }
  | { kind: "hub"; center: string; nodes: string[]; note: string };

export type Module = {
  slug: string;
  name: string;
  summary: string;
  eyebrow: string;
  heading: string;
  description: string;
  cta: { label: string; href: string };
  layout: FeatureLayout;
  heroLayout: "split" | "stacked";
  visual: HeroVisual;
  featureHeading: string;
  featureVisual?: { web?: WebKey; phone?: PhoneKey };
  challenge: { heading: string; body: string; points: string[] };
  features: Feature[];
  workflow: { heading: string; body: string; steps: string[] };
  example: string;
  faqs: Faq[];
  related: string[];
  status?: string;
  availabilityNote?: string;
};

export const modules: Module[] = [
  {
    slug: "field-sales",
    name: "Field Sales",
    summary: "Routes, customer context and transaction tools for salespeople throughout the working day.",
    eyebrow: "Sales Force Automation",
    heading: "Make Every Customer Visit Count.",
    description: "Give field salespeople the routes, customer information and transaction tools they need throughout the working day.",
    cta: { label: "Book a Field Sales Demo", href: "/book-demo" },
    layout: "sticky",
    heroLayout: "split",
    visual: { kind: "phones", phones: ["dashboard", "route"] },
    featureHeading: "One working day, in six moves.",
    featureVisual: { phone: "transactions" },
    challenge: {
      heading: "A salesperson's day rarely stays on script.",
      body: "Between the first stop and the last, a field salesperson has to remember who comes next, what the customer usually buys, what they owe and what was promised. When that context lives in notebooks, messages and memory, it slows down every visit and leaves the office guessing.",
      points: ["Customer details checked by phone call", "Orders rewritten at the end of the day", "Little shared view of what happened on the route"],
    },
    features: [
      { title: "Prepare the Day", body: "Review available route assignments, customer information and daily activities." },
      { title: "Visit the Customer", body: "Access relevant customer context and complete supported visit workflows." },
      { title: "Make the Sale", body: "Select products, confirm quantities and create applicable orders or invoices." },
      { title: "Record Collections", body: "Capture supported customer payments during field work." },
      { title: "Work Offline", body: "Continue eligible mobile workflows when internet access is limited." },
      { title: "Finish the Day", body: "Review transactions and pending synchronization." },
    ],
    workflow: {
      heading: "How the visit connects to the office",
      body: "What a salesperson records in the field becomes the record other teams work from. Sales, payments and visit activity flow back through synchronization so managers and finance review the same day.",
      steps: ["Start of day", "Route visit", "Order or invoice", "Collection", "Sync and review"],
    },
    example: "A salesperson opens the app before leaving the depot, starts the day and reviews the assigned journey. At the third stop they check the customer, record an order, take a payment and move on. That evening, the supervisor reviews the same activity without needing a round of phone calls.",
    faqs: [
      { q: "Does field sales work on mobile?", a: "Yes. Field users work from the Vanforces mobile application, with supported workflows for visits, transactions and collections." },
      { q: "Can salespeople keep working with weak connectivity?", a: "Eligible mobile workflows can continue offline and synchronize later. Offline availability depends on the configured workflow." },
      { q: "Can different users see different things?", a: "Available roles, permissions and configurations support different operational responsibilities." },
    ],
    related: ["routes", "customers", "orders"],
  },
  {
    slug: "van-sales",
    name: "Van Sales",
    summary: "From warehouse preparation to vehicle stock, direct selling and end-of-day reconciliation.",
    eyebrow: "Van Sales",
    heading: "From Loading the Van to Closing the Day.",
    description: "Manage the work between warehouse preparation, vehicle stock, customer visits, direct selling and reconciliation.",
    cta: { label: "Explore Van Sales", href: "/book-demo" },
    layout: "rail",
    heroLayout: "split",
    visual: { kind: "phones", phones: ["transactions", "sync"] },
    featureHeading: "Six steps. One vehicle. One clear record.",
    featureVisual: { web: "products" },
    challenge: {
      heading: "A van is a moving warehouse and a moving cash desk.",
      body: "Stock leaves in the morning, some is sold, some comes back and money comes in along the way. If those steps are recorded separately, the end of the day becomes an exercise in working out what happened.",
      points: ["Stock on the vehicle is hard to confirm", "Returns and damages recorded late", "Reconciliation depends on paperwork"],
    },
    features: [
      { title: "Load", body: "Prepare products and record vehicle loading." },
      { title: "Visit", body: "Follow the assigned route." },
      { title: "Sell", body: "Create applicable direct sales from available stock." },
      { title: "Collect", body: "Record supported customer payments." },
      { title: "Unload", body: "Account for relevant remaining stock, returns and damages." },
      { title: "Reconcile", body: "Review daily inventory and transaction records." },
    ],
    workflow: {
      heading: "Why the order of steps matters",
      body: "Each step changes what the next one depends on. A loading record sets the available stock, a sale reduces it, and the unload shows what should remain. Keeping them connected gives reconciliation something reliable to start from.",
      steps: ["Warehouse", "Vehicle stock", "Customer sale", "Payment", "Unload", "Reconciliation"],
    },
    example: "A driver-salesperson records the morning load, then sells from vehicle stock along the route and takes supported payments at each stop. Back at the depot, remaining stock and any damages are unloaded and the day is reviewed against the recorded transactions.",
    faqs: [
      { q: "Is Vanforces only for van sales?", a: "No. Van sales is one module within a wider set of field sales and distribution workflows." },
      { q: "Can salespeople request more stock?", a: "The mobile transaction menu includes Load Request as well as Load and Unload. Exact availability depends on your configuration." },
      { q: "Are damaged goods recorded?", a: "The mobile transaction menu includes a Salesman Damage entry, so damages can be accounted for in supported workflows." },
    ],
    related: ["inventory", "routes", "collections"],
  },
  {
    slug: "routes",
    name: "Routes",
    summary: "Customer journeys, daily visits and clearer context on field activity for managers.",
    eyebrow: "Routes & Field Operations",
    heading: "A Clear Route Makes a Better Day.",
    description: "Organize customer journeys, support daily visits and give managers better context around field activities.",
    cta: { label: "Explore Route Management", href: "/book-demo" },
    layout: "sticky",
    heroLayout: "stacked",
    visual: { kind: "pair", web: "routeVisit", phone: "route" },
    featureHeading: "From the plan to what actually happened.",
    featureVisual: { phone: "route" },
    challenge: {
      heading: "A route plan only helps if it reaches the road.",
      body: "Plans made in a spreadsheet tend to stay in the spreadsheet. Field teams need to see the next stop, and managers need to compare what was planned with what took place, including visits that did not happen and why.",
      points: ["Plans that are hard to share and update", "Missed visits discovered late", "No consistent reason recorded for skipped stops"],
    },
    features: [
      { title: "Plan the Journey", body: "Organize customers and route schedules." },
      { title: "Know the Next Stop", body: "Review customer details before the visit." },
      { title: "Complete the Visit", body: "Use applicable check-in, location and transaction workflows." },
      { title: "Understand Progress", body: "Review relevant route and visit records." },
      { title: "Respond to Changes", body: "Use supported authorized route changes when required." },
    ],
    workflow: {
      heading: "A simple loop between plan and review",
      body: "The journey plan gives the field a clear order of customers by day. Visit records and reasons come back to the office, where the Route Customer Visit view filters activity by route and date.",
      steps: ["Assign customers", "Schedule by day", "Visit in the field", "Record visit status", "Review by route"],
    },
    example: "On Monday morning, a salesperson opens Route Journey Plan and sees pending customers in order with a day timeline. One outlet is closed, so a no-visit reason is selected. Later, the supervisor filters the Route Customer Visit report by route and date to review the day.",
    faqs: [
      { q: "Can field users see the route on a map?", a: "The Route Journey Plan includes Map View, List View and Customer tabs in the mobile application." },
      { q: "Can a visit be skipped with a reason?", a: "The list view includes a no-visit reason selection for planned customers." },
      { q: "Can routes change during the day?", a: "Supported authorized route changes can be used when required, depending on your configuration." },
    ],
    related: ["field-sales", "customers", "van-sales"],
  },
  {
    slug: "customers",
    name: "Customers",
    summary: "Customer information connected to sales, visits, pricing and collections.",
    eyebrow: "Customer Management",
    heading: "Know the Customer Before You Reach the Counter.",
    description: "Keep useful customer information connected to sales, visits, pricing and collections.",
    cta: { label: "Explore Customer Workflows", href: "/book-demo" },
    layout: "bento",
    heroLayout: "split",
    visual: {
      kind: "hub",
      center: "Customer record",
      nodes: ["Profile", "Pricing", "Visits", "Orders", "Invoices", "Balance"],
      note: "Workflow illustration, not a product screen",
    },
    featureHeading: "The context behind a better conversation.",
    challenge: {
      heading: "Every department knows a different part of the customer.",
      body: "Sales knows the last order, finance knows the balance, and the driver knows the shop. When those facts sit apart, a simple customer conversation can turn into several phone calls.",
      points: ["Prices confirmed after the visit", "Balances unknown at the counter", "New customer details passed around informally"],
    },
    features: [
      { title: "Customer Profiles", body: "Review relevant customer details and business information." },
      { title: "Pricing Context", body: "Access applicable customer-specific pricing information." },
      { title: "Transaction History", body: "Understand previous orders, invoices and related activity." },
      { title: "Credit & Outstanding", body: "Review available account and balance information." },
      { title: "New Customers", body: "Capture new customer information through supported workflows." },
    ],
    workflow: {
      heading: "One record, used by several teams",
      body: "Customer records connect to the transactions built on them. As field teams sell and collect, those records provide context for the next visit and for the review that follows in the office.",
      steps: ["Capture details", "Assign to a route", "Sell and collect", "Review history", "Prepare next visit"],
    },
    example: "Before walking into a store, a salesperson checks the customer's recent activity and available balance information. The conversation starts with the facts already in hand rather than a call back to the office.",
    faqs: [
      { q: "Can we keep customer-specific prices?", a: "Applicable customer-specific pricing information can be accessed in supported workflows." },
      { q: "Can field users add new customers?", a: "New customer information can be captured through supported workflows, subject to your configuration." },
      { q: "Can customer data come from our ERP?", a: "Integration approaches exist for applicable systems. Exact capabilities depend on the connector and implementation scope." },
    ],
    related: ["orders", "collections", "routes"],
  },
  {
    slug: "orders",
    name: "Orders & Invoicing",
    summary: "Supported orders, quotations and invoices using the right customer, product and price.",
    eyebrow: "Orders & Invoicing",
    heading: "From Customer Request to Recorded Transaction.",
    description: "Create supported orders, quotations and invoices using the relevant customer, product and pricing information.",
    cta: { label: "Explore Orders", href: "/book-demo" },
    layout: "rail",
    heroLayout: "stacked",
    visual: { kind: "web", web: "products" },
    featureHeading: "Five steps from the request to the record.",
    challenge: {
      heading: "The order is easy. Getting it right is the work.",
      body: "The right product, unit, price and tax all have to come together at the point of sale. A mistake there travels with the order to the warehouse, the delivery and the invoice.",
      points: ["Pricing confirmed after the order", "Multipack and quantity errors", "Documents hard to trace later"],
    },
    features: [
      { title: "Capture the Customer Request", body: "Start with the correct customer record." },
      { title: "Select Products", body: "Choose available products, quantities and multipacks." },
      { title: "Apply Pricing", body: "Use applicable pricing and business rules." },
      { title: "Create Documents", body: "Generate supported orders, quotations or invoices." },
      { title: "Follow the Record", body: "Review transaction history and relevant fulfilment information." },
    ],
    workflow: {
      heading: "Built on a prepared product list",
      body: "Product records carry categories, tax details, stock status and readiness flags. Keeping that list in order gives the people creating orders a more dependable starting point.",
      steps: ["Prepare products", "Select customer", "Add items", "Apply price and tax", "Issue document"],
    },
    example: "A customer asks for a quotation on a mix of items. The salesperson starts with the customer record, adds products and quantities and creates the document. When the customer agrees, the transaction history shows how the request developed.",
    faqs: [
      { q: "Can we create quotations as well as orders?", a: "Yes. Supported workflows include orders, quotations and invoices." },
      { q: "How does tax appear on products?", a: "Product records in the admin panel include tax category and VAT information. Actual tax setup should be reviewed for your business." },
      { q: "What is a readiness flag?", a: "The product list shows readiness indicators such as Ready, Warnings or Incomplete, which help teams spot records that need attention." },
    ],
    related: ["customers", "inventory", "delivery"],
  },
  {
    slug: "inventory",
    name: "Inventory",
    summary: "Stock records that follow products between warehouses, vehicles and customers.",
    eyebrow: "Warehouse & Inventory",
    heading: "Know Your Stock From Warehouse to Van.",
    description: "Follow relevant stock records as products move between warehouses, vehicles and customers.",
    cta: { label: "Explore Inventory", href: "/book-demo" },
    layout: "bento",
    heroLayout: "split",
    visual: { kind: "pair", web: "products", phone: "transactions" },
    featureHeading: "Follow the stock, not the paperwork.",
    challenge: {
      heading: "Stock questions usually start with “Where did it go?”",
      body: "Once products leave the warehouse, it can be hard to tell what is on a vehicle, what was sold and what should be coming back. Those gaps usually surface at the end of the day, when they are hardest to solve.",
      points: ["Loading records kept separately", "Returns and adjustments arrive late", "Stock differences hard to explain"],
    },
    features: [
      { title: "Warehouse Inventory", body: "Review available products and stock information." },
      { title: "Vehicle Loading", body: "Record supported movements from warehouse to van." },
      { title: "On-Route Stock", body: "Connect available vehicle stock with direct selling workflows." },
      { title: "Unloading & Returns", body: "Account for remaining products, applicable returns and adjustments." },
      { title: "Stock Review", body: "Use movement history to understand the day's stock activity." },
    ],
    workflow: {
      heading: "A stock movement is a chain",
      body: "Warehouse to van, van to customer, and van back to warehouse. Recording each movement gives the next person a clearer basis for their work and gives reviewers a history to follow.",
      steps: ["Warehouse stock", "Load to vehicle", "Sell on route", "Unload and return", "Review movements"],
    },
    example: "At the end of a route, a warehouse manager compares what was loaded with what was sold and what came back. Movement history provides a starting point for understanding any differences.",
    faqs: [
      { q: "Can we see stock status for products?", a: "The product list includes status labels such as Available, Out of Stock and Inactive." },
      { q: "Does the mobile app record loading and unloading?", a: "The mobile transaction menu includes Load, Load Request and Unload entries." },
      { q: "Is warehouse inventory on every plan?", a: "It appears from the Premium plan upward." },
    ],
    related: ["van-sales", "delivery", "orders"],
  },
  {
    slug: "delivery",
    name: "Delivery",
    summary: "The operational steps between assigning an order, dispatch and customer handover.",
    eyebrow: "Delivery Management",
    heading: "An Order Is Only Part of the Job.",
    description: "Support the operational steps between order assignment, dispatch, customer delivery and completion.",
    cta: { label: "Explore Delivery", href: "/book-demo" },
    layout: "rail",
    heroLayout: "split",
    visual: { kind: "pair", web: "adminHome", phone: "transactions" },
    featureHeading: "What happens after the order is placed.",
    challenge: {
      heading: "Quantities change between the order and the door.",
      body: "A customer may take less, a product may be short or a stop may be missed. If those differences do not reach the office, sales, stock and account records quietly drift apart.",
      points: ["Delivery status checked by phone", "Quantity differences recorded late", "Pending deliveries hard to see"],
    },
    features: [
      { title: "Prepare Delivery", body: "Review available orders and relevant delivery requirements." },
      { title: "Assign the Work", body: "Organize supported delivery activities." },
      { title: "Deliver", body: "Use available mobile delivery workflows." },
      { title: "Capture Actual Quantities", body: "Record applicable delivered quantities and differences." },
      { title: "Review Completion", body: "Understand completed and pending delivery activity." },
    ],
    workflow: {
      heading: "Keeping the order and the handover together",
      body: "Delivery activity sits alongside the order it came from. Field users work through a Delivery Run in the mobile app, and managers can review delivery totals from the admin dashboard.",
      steps: ["Confirmed order", "Assign", "Delivery Run", "Actual quantity", "Review"],
    },
    example: "A customer ordered ten cases but accepts eight. The delivery user records what was actually delivered, so the operations team sees the difference against the order rather than discovering it later.",
    faqs: [
      { q: "Can delivered quantities differ from ordered quantities?", a: "Applicable delivered quantities and differences can be recorded through supported workflows." },
      { q: "Is delivery available on mobile?", a: "The mobile transaction menu includes a Delivery Run entry for available delivery workflows." },
      { q: "Can managers see delivery activity?", a: "The admin dashboard includes delivery totals, and completed and pending activity can be reviewed where available." },
    ],
    related: ["orders", "inventory", "collections"],
  },
  {
    slug: "collections",
    name: "Collections",
    summary: "Outstanding balances, collection activity, receipts and settlement records in a clearer workflow.",
    eyebrow: "Collections & Finance",
    heading: "Know What's Due. Know What's Collected.",
    description: "Bring customer outstanding balances, collection activity, receipts and settlement records into a clearer financial workflow.",
    cta: { label: "Book a Finance Demo", href: "/book-demo" },
    layout: "ledger",
    heroLayout: "split",
    visual: { kind: "pair", web: "cxoFinance", phone: "dashboard" },
    featureHeading: "The money trail, line by line.",
    featureVisual: { web: "cxoTrends" },
    challenge: {
      heading: "Collections are where field work meets the books.",
      body: "Payments collected on the road need to reach finance with the right customer and invoice attached. When they arrive later as paper or messages, the follow-up takes time and the customer's balance stays uncertain.",
      points: ["Balances unavailable during the visit", "Receipts separated from invoices", "Field cash hard to reconcile"],
    },
    features: [
      { title: "Understand Receivables", body: "Review outstanding invoices and relevant customer balances." },
      { title: "Collect in the Field", body: "Record applicable payments using supported methods." },
      { title: "Capture Receipts", body: "Keep payment information associated with customer transactions." },
      { title: "Review Settlements", body: "Follow recorded field collections and settlement activity." },
      { title: "Understand Trends", body: "Use collection reporting and relevant customer financial information." },
    ],
    workflow: {
      heading: "From the invoice to the settlement",
      body: "An invoice creates a balance, a collection reduces it, and a settlement closes the loop between the salesperson and the office. Reporting then shows how those amounts move over time.",
      steps: ["Invoice", "Outstanding", "Collection", "Receipt", "Settlement"],
    },
    example: "Before a visit, a salesperson reviews what is outstanding. The customer makes a part payment, which is recorded against their account. At the end of the day, the collected amount is reviewed as part of the salesperson's settlement.",
    faqs: [
      { q: "Can part payments be recorded?", a: "Payment handling depends on supported methods and your configuration. This can be confirmed during a demo." },
      { q: "Where can finance see collection activity?", a: "Collection information is available in reporting views, including the CXO Business Command Center where enabled." },
      { q: "What is a settlement?", a: "A settlement reviews what a field user recorded and collected for a period, so it can be matched with what reached the office." },
    ],
    related: ["customers", "field-sales", "intelligence"],
  },
  {
    slug: "offline",
    name: "Offline Operations",
    summary: "Eligible mobile activity continues when connectivity doesn't, then synchronizes later.",
    eyebrow: "Offline Field Operations",
    heading: "The Route Doesn't Stop When the Signal Drops.",
    description: "Supported Vanforces mobile workflows allow eligible activities to continue when connectivity is unavailable.",
    cta: { label: "Explore Offline Operations", href: "/book-demo" },
    layout: "sticky",
    heroLayout: "split",
    visual: { kind: "phones", phones: ["sync", "dashboard"] },
    featureHeading: "Four stages between no signal and all synced.",
    featureVisual: { phone: "sync" },
    challenge: {
      heading: "Coverage gaps shouldn't become record gaps.",
      body: "Warehouses, rural roads and basement stores can all lose signal. If the application stops, people go back to paper, and the data has to be entered again later, if it is entered at all.",
      points: ["Work paused at weak-signal stops", "Duplicate paper records", "Uncertainty about what has synced"],
    },
    features: [
      { title: "Prepare Data", body: "Synchronize relevant master and operational information." },
      { title: "Continue Work", body: "Capture supported offline transactions." },
      { title: "Synchronize Later", body: "Submit pending records when connectivity becomes available." },
      { title: "Review Exceptions", body: "Understand records that need attention." },
    ],
    workflow: {
      heading: "A visible sync, not a hidden one",
      body: "The export screen shows progress across record groups such as sales, collection, settlement, load, unload and quotation, so field users can see that their work is on the way.",
      steps: ["Download data", "Work in the field", "Reconnect", "Export records", "Review exceptions"],
    },
    example: "A salesperson loses signal for most of the morning and continues with eligible transactions. When connectivity returns, pending records are submitted and progress is shown by record type, with anything needing attention available for review.",
    faqs: [
      { q: "Does every feature work offline?", a: "No. Offline availability depends on the configured workflow and supported application capabilities." },
      { q: "Can field users work without an internet connection?", a: "Supported mobile workflows can operate offline and synchronize when connectivity becomes available." },
      { q: "What happens if a record fails to sync?", a: "Records that need attention can be reviewed as exceptions where this is supported." },
    ],
    related: ["field-sales", "van-sales", "routes"],
  },
  {
    slug: "b2b-ordering",
    name: "SpeakOrder",
    summary: "A proposed dedicated B2B ordering experience connected with Vanforces.",
    eyebrow: "B2B Ordering — SpeakOrder",
    heading: "Business Orders Deserve More Than a Chat Thread.",
    description: "A dedicated ordering experience can help customers and distributors work with structured products, pricing and orders.",
    cta: { label: "Discuss SpeakOrder", href: "/contact" },
    layout: "preview",
    heroLayout: "split",
    visual: {
      kind: "hub",
      center: "Structured order",
      nodes: ["Customer", "Products", "Pricing", "Quantities", "Distributor", "Vanforces"],
      note: "Concept illustration of a proposed product, not a product screen",
    },
    featureHeading: "Who a dedicated ordering experience could help.",
    status: "Product Preview",
    availabilityNote: "SpeakOrder is presented here as a proposed product experience. Its availability, features and connection with Vanforces are not confirmed, and it is not included in any Vanforces subscription shown on this site.",
    challenge: {
      heading: "Chat is good for conversations. Orders need records.",
      body: "Many business orders begin as a message or a voice note. That is convenient until someone has to find the latest quantity, confirm a price or look up what was ordered last month.",
      points: ["Details scattered across messages", "Prices and quantities change in conversation", "Order history hard to retrieve"],
    },
    features: [
      { title: "For Customers", body: "Explore products and create orders through a dedicated experience." },
      { title: "For Distributors", body: "Manage customer ordering workflows." },
      { title: "For Operations", body: "Connect confirmed orders with the proposed Vanforces integration." },
    ],
    workflow: {
      heading: "Why Structured Ordering?",
      body: "Business prices, changing quantities and order history benefit from reliable records beyond messaging conversations.",
      steps: ["Browse products", "Build the order", "Distributor confirms", "Proposed Vanforces link"],
    },
    example: "In this proposed flow, a store owner reorders from a product list instead of sending a voice note. The distributor reviews a structured order with quantities and prices, rather than interpreting a message.",
    faqs: [
      { q: "Is SpeakOrder available today?", a: "It is presented on this site as a product preview. Please contact Vanforces to discuss its current status." },
      { q: "Is SpeakOrder part of a Vanforces subscription?", a: "No plan on this site includes it. Any commercial arrangement would need to be confirmed separately." },
    ],
    related: ["orders", "customers", "field-sales"],
  },
  {
    slug: "intelligence",
    name: "Business Intelligence",
    summary: "Use available business information to understand customers, products, sales and collections.",
    eyebrow: "Business Intelligence",
    heading: "More Than Reports. Better Questions, Better Context.",
    description: "Use available business information to understand customers, products, sales, collections and operational performance.",
    cta: { label: "Explore Business Intelligence", href: "/book-demo" },
    layout: "bento",
    heroLayout: "stacked",
    visual: { kind: "web", web: "cxoTrends" },
    featureHeading: "Different questions need different views.",
    challenge: {
      heading: "A report answers the question you already asked.",
      body: "Most distribution businesses have reports, but they are often assembled by different people at different times. Reviewing the business then means piecing them together before the real conversation can begin.",
      points: ["Separate reports for sales and finance", "Numbers prepared after the moment has passed", "Hard to move from a total to its cause"],
    },
    features: [
      { title: "Operational Reporting", body: "Review relevant transactions and business activity." },
      { title: "Sales Performance", body: "Understand sales across customers, routes and products." },
      { title: "Customer Insights", body: "Explore customer-level business trends." },
      { title: "Collection Analysis", body: "Review financial activity and outstanding information." },
      { id: "supported-recommendations", title: "Supported Recommendations", body: "Where enabled, use available suggestions to support decisions." },
      { title: "Entaura.ai", body: "Explore a separately branded AI-powered business information platform." },
    ],
    workflow: {
      heading: "From records to a useful conversation",
      body: "Reporting is only as useful as the activity behind it. Because field and office work is recorded in connected workflows, reporting has more context to draw on.",
      steps: ["Daily activity", "Connected records", "Reports and views", "Questions", "Decisions"],
    },
    example: "A sales manager notices collections running behind sales on a trend chart. They move from the overall view to customers and routes to see where to focus the next conversation.",
    faqs: [
      { q: "Is Entaura.ai part of Vanforces?", a: "Entaura.ai is a separately branded platform and is not automatically included in a Vanforces subscription." },
      { q: "What are supported recommendations?", a: "Where enabled, available suggestions can support decisions. Availability depends on your configuration." },
      { q: "How is this different from the Command Center?", a: "Business Intelligence covers reporting more broadly, while the Command Center brings executive views together in one place." },
    ],
    related: ["collections", "customers", "orders"],
  },
  {
    slug: "control-room",
    name: "Operations Control Room",
    summary: "Available operational widgets and activity information in a focused review experience.",
    eyebrow: "Operations Control Room",
    heading: "Put the Working Day on One Screen.",
    description: "Bring available operational widgets and activity information into a focused review experience.",
    cta: { label: "Discuss the Control Room", href: "/contact" },
    layout: "bento",
    heroLayout: "stacked",
    visual: { kind: "web", web: "adminHome" },
    featureHeading: "A focused place to review the day.",
    availabilityNote: "Availability and detail of Control Room features should be confirmed for your deployment. The screen above shows the current admin dashboard.",
    challenge: {
      heading: "Operations teams shouldn't need ten tabs to answer one question.",
      body: "When activity is spread across separate screens, a simple check on how the day is going means moving between lists and reports. A focused view gives the team a shared starting point.",
      points: ["Too many screens to check", "Issues noticed late", "Different people looking at different numbers"],
    },
    features: [
      { title: "Daily Activity", body: "Review today's sales, collection, order and delivery information in one place." },
      { title: "Operational Information", body: "Keep relevant operational context close to the people responsible for it." },
      { title: "Available Widgets", body: "Work with the widgets available for your configured view." },
      { title: "Exceptions", body: "Bring records that need attention into the review, where supported." },
      { title: "Supported Alerts", body: "Use notifications where they are available for your configuration." },
    ],
    workflow: {
      heading: "How a team might use it",
      body: "A control room view works best as a routine: check the day's activity, look at what is outstanding and agree who follows up.",
      steps: ["Open the view", "Check activity", "Spot exceptions", "Assign follow-up", "Review again"],
    },
    example: "During the day, an operations lead checks the main dashboard for sales, collections and deliveries, then opens the financial summary to look more closely at one area before calling the team.",
    faqs: [
      { q: "Is the Control Room a separate product?", a: "Please confirm availability with Vanforces. The features shown here are described at a general level." },
      { q: "Can the view be customized?", a: "The available widgets depend on your configuration. This can be reviewed during a demo." },
    ],
    related: ["intelligence", "routes", "delivery"],
  },
];

export const moduleBySlug = (slug: string) => modules.find((m) => m.slug === slug);

export const moduleDirectory = [
  {
    category: "Field Operations",
    icon: "Route",
    items: [
      { label: "Sales Force Automation", href: "/platform/field-sales", body: "Tools for the salesperson's whole working day." },
      { label: "Routes", href: "/platform/routes", body: "Journey plans, visits and route review." },
      { label: "Offline Workflows", href: "/platform/offline", body: "Eligible work continues without a signal." },
    ],
  },
  {
    category: "Distribution",
    icon: "Truck",
    items: [
      { label: "Van Sales", href: "/platform/van-sales", body: "Load, sell, collect, unload and reconcile." },
      { label: "Warehouse & Inventory", href: "/platform/inventory", body: "Stock records from warehouse to van." },
      { label: "Delivery", href: "/platform/delivery", body: "Assignment, dispatch and handover." },
    ],
  },
  {
    category: "Customers & Transactions",
    icon: "Users",
    items: [
      { label: "Customer Management", href: "/platform/customers", body: "Profiles, pricing context and history." },
      { label: "Orders", href: "/platform/orders", body: "Orders and quotations with the right data." },
      { label: "Invoices", href: "/platform/orders", body: "Supported invoices tied to the transaction." },
    ],
  },
  {
    category: "Finance",
    icon: "Wallet",
    items: [
      { label: "Collections", href: "/platform/collections", body: "Field payments linked to the customer." },
      { label: "Receipts", href: "/platform/collections", body: "Payment details kept with transactions." },
      { label: "Advances", href: "/platform/collections", body: "Advance collections shown in transaction reporting." },
      { label: "Settlements", href: "/platform/collections", body: "Review what was recorded and collected." },
    ],
  },
  {
    category: "Business & Systems",
    icon: "LayoutDashboard",
    items: [
      { label: "Command Center", href: "/business-command-center", body: "Executive views of the whole business." },
      { label: "Reporting", href: "/platform/intelligence", body: "Sales, customer and collection reports." },
      { label: "ERP Integration", href: "/integrations/erp-api", body: "Connect existing business systems." },
    ],
  },
] as const;

export const useCases = [
  {
    id: "field-sales-execution",
    title: "Field Sales Execution",
    situation: "Salespeople cover many customers a day and need customer details, products and transaction tools without going back to the office.",
    approach: "Assigned routes, customer context and mobile transactions keep the visit moving and record it as it happens.",
    link: { label: "Field Sales", href: "/platform/field-sales" },
  },
  {
    id: "customer-route-visits",
    title: "Customer & Route Visits",
    situation: "Managers need to compare the planned journey with what happened, including visits that did not take place.",
    approach: "Journey plans, visit status and no-visit reasons connect the plan to reviewable route records.",
    link: { label: "Routes", href: "/platform/routes" },
  },
  {
    id: "direct-store-delivery",
    title: "Direct Store Delivery",
    situation: "Stock-carrying vehicles sell on the spot, so sales, payments and stock movements have to agree at the end of each day.",
    approach: "Loading, direct selling, collection and unloading are handled as connected steps that lead to reconciliation.",
    link: { label: "Van Sales", href: "/platform/van-sales" },
  },
  {
    id: "order-to-cash",
    title: "Order-to-Cash",
    situation: "Orders pass from sales to warehouse, delivery and finance, and each handoff can lose details or time.",
    approach: "Quotations, orders, deliveries, sales, collections and settlements can be followed as one connected funnel.",
    link: { label: "Orders & Invoicing", href: "/platform/orders" },
  },
  {
    id: "warehouse-stock-control",
    title: "Warehouse & Stock Control",
    situation: "Warehouse teams prepare loads and receive returns, and need a clear record of what moved and why.",
    approach: "Warehouse records, vehicle loading, unloading and movement history support a more explainable stock review.",
    link: { label: "Inventory", href: "/platform/inventory" },
  },
  {
    id: "offline-field-operations",
    title: "Offline Field Operations",
    situation: "Teams work in places with weak coverage and cannot stop selling each time the signal drops.",
    approach: "Supported workflows continue offline, then pending records synchronize with visible progress.",
    link: { label: "Offline Operations", href: "/platform/offline" },
  },
  {
    id: "executive-visibility",
    title: "Executive Visibility",
    situation: "Leadership wants one view of what is selling, what is collected and what is outstanding without waiting for manual reports.",
    approach: "The CXO Business Command Center brings KPIs, funnels and trends together across five business perspectives.",
    link: { label: "Business Command Center", href: "/business-command-center" },
  },
];

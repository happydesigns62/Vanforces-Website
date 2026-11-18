import type { Faq } from "./modules";

export type FaqCategory = { id: string; title: string; items: Faq[] };

export const faqCategories: FaqCategory[] = [
  {
    id: "platform",
    title: "Platform",
    items: [
      { q: "What is Vanforces?", a: "Vanforces is a connected distribution operations platform supporting field sales, routes, customers, inventory, delivery, collections and business reporting." },
      { q: "Is Vanforces only for van sales?", a: "No. It supports a wider set of field sales and distribution workflows." },
      { q: "Can different teams use different workflows?", a: "Available roles, permissions and configurations support different operational responsibilities." },
    ],
  },
  {
    id: "offline",
    title: "Offline",
    items: [
      { q: "Can field users work without an internet connection?", a: "Supported mobile workflows can operate offline and synchronize when connectivity becomes available." },
      { q: "Does every feature work offline?", a: "No. Offline availability depends on the configured workflow and supported application capabilities." },
    ],
  },
  {
    id: "erp",
    title: "ERP",
    items: [
      { q: "Can Vanforces connect with an existing ERP?", a: "Vanforces supports integration approaches for applicable business systems. Exact capabilities depend on the connector and implementation scope." },
      { q: "How does data synchronization work?", a: "Supported business records are exchanged through configured integration workflows, with available statuses and exception handling." },
    ],
  },
  {
    id: "pricing",
    title: "Pricing",
    items: [
      { q: "Can we compare plans?", a: "Yes. The Pricing page compares the plans side by side." },
      { q: "Can we request a demo before subscribing?", a: "Yes. The website includes a Book a Demo experience." },
    ],
  },
  {
    id: "routes",
    title: "Routes",
    items: [
      { q: "How do field users see their route?", a: "The mobile Route Journey Plan shows assigned customers by day, with map, list and customer views." },
      { q: "What if a planned customer can't be visited?", a: "A no-visit reason can be selected in the list view, so the skipped stop is still part of the record." },
    ],
  },
  {
    id: "customers",
    title: "Customer Management",
    items: [
      { q: "What customer information can field users see?", a: "Relevant customer details, applicable pricing context, transaction history and available balance information, depending on your setup." },
      { q: "Can new customers be added in the field?", a: "New customer information can be captured through supported workflows." },
    ],
  },
  {
    id: "orders",
    title: "Orders",
    items: [
      { q: "Which documents can be created?", a: "Supported workflows cover orders, quotations and invoices." },
      { q: "Do multipacks work?", a: "Available products, quantities and multipacks can be selected during order creation." },
    ],
  },
  {
    id: "inventory",
    title: "Inventory",
    items: [
      { q: "Can we track stock on vehicles?", a: "Vehicle loading, on-route stock and unloading are supported as connected inventory workflows." },
      { q: "Can we see how stock moved during the day?", a: "Movement history can be used to understand the day's stock activity." },
    ],
  },
  {
    id: "delivery",
    title: "Delivery",
    items: [
      { q: "Can drivers use the mobile app for deliveries?", a: "The mobile transaction menu includes a Delivery Run for available delivery workflows." },
      { q: "What if the delivered quantity is different?", a: "Applicable delivered quantities and differences can be recorded." },
    ],
  },
  {
    id: "collections",
    title: "Collections",
    items: [
      { q: "Can payments be recorded in the field?", a: "Yes. Applicable payments can be recorded using supported methods during field work." },
      { q: "Can finance review what was collected?", a: "Recorded field collections and settlement activity can be followed and reviewed." },
    ],
  },
  {
    id: "reporting",
    title: "Reporting",
    items: [
      { q: "What is the CXO Business Command Center?", a: "An executive view with KPIs, an order-to-cash funnel and trends, across finance, customer, route, product and distributor perspectives." },
      { q: "Can reports be exported?", a: "Export actions appear in the Command Center and admin lists. Exact options can be reviewed during a demo." },
    ],
  },
  {
    id: "roles",
    title: "User Roles",
    items: [
      { q: "What types of users are there?", a: "The admin panel shows user types such as Admin, Supervisor and Salesman, along with roles that can be assigned." },
      { q: "Can access be limited?", a: "Available roles and permissions support different operational responsibilities." },
    ],
  },
  {
    id: "registration",
    title: "Registration",
    items: [
      { q: "Does Get Started create a real account?", a: "Not on this prototype. It is a demo registration experience: no account is created, no code is sent and no payment is taken." },
    ],
  },
  {
    id: "entaura",
    title: "Entaura",
    items: [
      { q: "What is Entaura.ai?", a: "An AI-powered platform for exploring business information, featuring Entaura Ask, Insight and Watch." },
      { q: "Is Entaura included in a Vanforces subscription?", a: "It is not automatically included in every Vanforces subscription. Details are available at entaura.ai." },
    ],
  },
  {
    id: "speakorder",
    title: "SpeakOrder",
    items: [
      { q: "What is SpeakOrder?", a: "A proposed B2B ordering solution connected with Vanforces, presented on this site as a product preview." },
      { q: "Can we use SpeakOrder now?", a: "Its live availability has not been confirmed here. Please contact Vanforces to discuss it." },
    ],
  },
];

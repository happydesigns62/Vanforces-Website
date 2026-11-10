export type NavLink = { label: string; href: string; description?: string; badge?: string };
export type NavColumn = { title: string; links: NavLink[] };
export type NavItem =
  | { label: string; href: string; kind: "link" }
  | { label: string; href: string; kind: "mega"; columns: NavColumn[] }
  | { label: string; href: string; kind: "menu"; links: NavLink[] };

export const ENTAURA_URL = "https://entaura.ai/";

export const primaryNav: NavItem[] = [
  {
    label: "Platform",
    href: "/platform",
    kind: "mega",
    columns: [
      {
        title: "Modules",
        links: [
          { label: "Sales Force Automation", href: "/platform/field-sales" },
          { label: "Van Sales", href: "/platform/van-sales" },
          { label: "Routes & Field Operations", href: "/platform/routes" },
          { label: "Customer Management", href: "/platform/customers" },
          { label: "Orders & Invoicing", href: "/platform/orders" },
          { label: "Warehouse & Inventory", href: "/platform/inventory" },
          { label: "Delivery Management", href: "/platform/delivery" },
          { label: "Collections & Finance", href: "/platform/collections" },
          { label: "Offline Field Operations", href: "/platform/offline" },
          { label: "All Modules", href: "/platform/modules" },
        ],
      },
      {
        title: "Use Cases",
        links: [
          { label: "Field Sales Execution", href: "/platform/use-cases#field-sales-execution" },
          { label: "Direct Store Delivery", href: "/platform/use-cases#direct-store-delivery" },
          { label: "Customer Visits", href: "/platform/use-cases#customer-route-visits" },
          { label: "Order-to-Cash", href: "/platform/use-cases#order-to-cash" },
          { label: "Warehouse & Stock Control", href: "/platform/use-cases#warehouse-stock-control" },
          { label: "Managers & Operations", href: "/solutions/managers" },
          { label: "Finance Teams", href: "/solutions/finance" },
          { label: "IT & ERP Teams", href: "/solutions/it-erp" },
          { label: "All Use Cases", href: "/platform/use-cases" },
        ],
      },
      {
        title: "Intelligence & Automation",
        links: [
          { label: "Business Command Center", href: "/business-command-center" },
          { label: "Business Intelligence", href: "/platform/intelligence" },
          { label: "Operations Control Room", href: "/platform/control-room" },
          { label: "Supported Recommendations", href: "/platform/intelligence#supported-recommendations" },
          { label: "Route Planning", href: "/platform/routes" },
          { label: "Entaura.ai", href: ENTAURA_URL },
          { label: "SpeakOrder", href: "/platform/b2b-ordering", badge: "Product Preview" },
        ],
      },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    kind: "menu",
    links: [
      { label: "FMCG & Consumer Goods", href: "/industries/fmcg", description: "Many outlets, one working day." },
      { label: "Food & Beverage", href: "/industries/food-beverage", description: "Vehicle stock and frequent deliveries." },
      { label: "Wholesale Distribution", href: "/industries/wholesale-distribution", description: "Orders, fulfilment and accounts." },
      { label: "Direct Store Delivery", href: "/industries/direct-store-delivery", description: "Load, visit, sell, collect, reconcile." },
      { label: "All Industries", href: "/industries" },
    ],
  },
  {
    label: "Customers",
    href: "/customers",
    kind: "menu",
    links: [
      { label: "Customer Stories", href: "/customers", description: "Stories, reviews and a closer look at the work." },
      { label: "Northline Distribution", href: "/customers/stories/northline-distribution", description: "FMCG." },
      { label: "Freshway Supplies", href: "/customers/stories/freshway-supplies", description: "Food & beverage." },
      { label: "Meridian Wholesale", href: "/customers/stories/meridian-wholesale", description: "Wholesale." },
      { label: "Evercrest Trading", href: "/customers/stories/evercrest-trading", description: "Consumer goods." },
    ],
  },
  {
    label: "Integrations",
    href: "/integrations",
    kind: "menu",
    links: [
      { label: "Integrations Overview", href: "/integrations", description: "How business systems and field teams connect." },
      { label: "ERP Integration API", href: "/integrations/erp-api", description: "Mapping, documents and synchronization." },
      { label: "Zoho Books", href: "/integrations/zoho-books", description: "Accounting and field activity." },
      { label: "Odoo", href: "/integrations/odoo", description: "Odoo data in the distribution day." },
    ],
  },
  { label: "Pricing", href: "/pricing", kind: "link" },
  {
    label: "Resources",
    href: "/resources",
    kind: "menu",
    links: [
      { label: "Resources", href: "/resources", description: "Guides on distribution operations." },
      { label: "FAQs", href: "/resources/faq", description: "Things worth knowing before you begin." },
      { label: "ROI Calculator", href: "/roi", description: "Estimate the value of time saved." },
    ],
  },
  {
    label: "Company",
    href: "/company",
    kind: "menu",
    links: [
      { label: "About Vanforces", href: "/company", description: "Why we focus on connected work." },
      { label: "Deployment & Adoption", href: "/company/deployment", description: "How a rollout comes together." },
      { label: "Partners", href: "/partners", description: "Build better solutions together." },
      { label: "Contact", href: "/contact", description: "Tell us what you're working on." },
    ],
  },
];

export const footerNav: NavColumn[] = [
  {
    title: "Platform",
    links: [
      { label: "Platform Overview", href: "/platform" },
      { label: "All Modules", href: "/platform/modules" },
      { label: "Field Sales", href: "/platform/field-sales" },
      { label: "Van Sales", href: "/platform/van-sales" },
      { label: "Routes", href: "/platform/routes" },
      { label: "Inventory", href: "/platform/inventory" },
      { label: "Delivery", href: "/platform/delivery" },
      { label: "Collections", href: "/platform/collections" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Solutions by Role", href: "/solutions" },
      { label: "Industries", href: "/industries" },
      { label: "Use Cases", href: "/platform/use-cases" },
      { label: "Business Command Center", href: "/business-command-center" },
      { label: "Integrations", href: "/integrations" },
      { label: "Customer Stories", href: "/customers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Guides", href: "/resources" },
      { label: "FAQs", href: "/resources/faq" },
      { label: "ROI Calculator", href: "/roi" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/company" },
      { label: "Deployment", href: "/company/deployment" },
      { label: "Partners", href: "/partners" },
      { label: "Contact", href: "/contact" },
      { label: "Book a Demo", href: "/book-demo" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "Entaura.ai", href: ENTAURA_URL },
      { label: "SpeakOrder Preview", href: "/platform/b2b-ordering" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy (Draft)", href: "/privacy" },
      { label: "Terms (Draft)", href: "/terms" },
    ],
  },
];

import type { Faq, Feature } from "./modules";

export type IntegrationPage = {
  slug: string;
  name: string;
  eyebrow: string;
  heading: string;
  description: string;
  leftNode: string;
  sectionHeading: string;
  sections: Feature[];
  cta: { label: string; href: string };
  scopeNote: string;
  layout: "ledger" | "bento";
  checklist: string[];
  faqs: Faq[];
};

export const integrationPillars: Feature[] = [
  { title: "Master Data", body: "Customers, products, prices and relevant business information." },
  { title: "Transaction Data", body: "Supported orders, sales, collections and stock records." },
  { title: "Synchronization", body: "Configured data exchange and relevant synchronization processes." },
  { title: "Visibility", body: "Available statuses, logs and exceptions." },
];

export const integrations: IntegrationPage[] = [
  {
    slug: "erp-api",
    name: "ERP Integration API",
    eyebrow: "ERP Integration API",
    heading: "Keep Your Business Systems and Distribution Work Connected.",
    description: "A good integration begins with clear decisions about data, not with code. Here is what a Vanforces ERP integration conversation typically covers.",
    leftNode: "Your ERP",
    sectionHeading: "Seven areas to agree before data starts moving.",
    layout: "ledger",
    sections: [
      { title: "Data Ownership", body: "Decide which system owns each type of record. Customers and products often start in the ERP, while visits and field collections start in Vanforces." },
      { title: "Customer & Product Mapping", body: "Connect records between systems using agreed identifiers, so the same customer or product is recognized on both sides." },
      { title: "Pricing", body: "Agree where prices are maintained, how customer-specific prices are represented and how changes reach field users." },
      { title: "Document Exchange", body: "Define which supported documents, such as orders, invoices or receipts, move between systems and in what direction." },
      { title: "Synchronization", body: "Set out what is exchanged, how often and what triggers it through configured integration workflows." },
      { title: "Exceptions", body: "Plan how failed or rejected records are surfaced, and who is responsible for resolving them." },
      { title: "Reconciliation", body: "Agree how records in both systems are compared, so differences can be found and explained." },
    ],
    cta: { label: "Talk to Our Integration Team", href: "/contact" },
    scopeNote: "Exact capabilities depend on the connector and implementation scope.",
    checklist: ["List the systems involved", "Name an owner for each data type", "Prepare sample records for mapping", "Agree how exceptions are handled"],
    faqs: [
      { q: "Can Vanforces connect with an existing ERP?", a: "Vanforces supports integration approaches for applicable business systems. Exact capabilities depend on the connector and implementation scope." },
      { q: "How does data synchronization work?", a: "Supported business records are exchanged through configured integration workflows, with available statuses and exception handling." },
    ],
  },
  {
    slug: "zoho-books",
    name: "Zoho Books",
    eyebrow: "Zoho Books",
    heading: "Keep Accounting and Field Activity Closer.",
    description: "Accounting needs what happens in the field, and the field needs what accounting knows. These are the areas to review when considering Zoho Books alongside Vanforces.",
    leftNode: "Zoho Books",
    sectionHeading: "Areas to review for your integration.",
    layout: "bento",
    sections: [
      { title: "Customer Data", body: "Review how customer records and identifiers should correspond between Zoho Books and Vanforces." },
      { title: "Product Information", body: "Review how items, units and related information should be represented for field use." },
      { title: "Invoice Data", body: "Define which invoice information is relevant and which system it should begin in." },
      { title: "Payment Records", body: "Decide how payments recorded in the field relate to accounting records." },
      { title: "Mapping", body: "Agree the mappings between records, including taxes and accounts where relevant." },
      { title: "Synchronization", body: "Define what moves, in which direction and how often." },
      { title: "Exception Review", body: "Plan how records needing attention are reviewed and resolved." },
    ],
    cta: { label: "Discuss Zoho Books Integration", href: "/contact" },
    scopeNote: "This page describes topics for discussion. Please confirm verified capabilities and current connector scope with Vanforces before making a decision.",
    checklist: ["Export sample customers and items", "List your tax and account settings", "Decide who approves field payments", "Identify which records start in the field"],
    faqs: [
      { q: "Is a Zoho Books connector available today?", a: "Please confirm the current scope with the Vanforces team. Capabilities depend on the connector and implementation." },
      { q: "Is Vanforces affiliated with Zoho?", a: "This page does not suggest any affiliation. Zoho Books is named only as an accounting system that may be considered for integration." },
    ],
  },
  {
    slug: "odoo",
    name: "Odoo",
    eyebrow: "Odoo",
    heading: "Bring Odoo Data Into the Distribution Day.",
    description: "Odoo data can be useful to field teams, but it has to be prepared for how they work. Every Odoo setup differs, so requirements are reviewed before scope is agreed.",
    leftNode: "Odoo",
    sectionHeading: "Nine topics to work through.",
    layout: "ledger",
    sections: [
      { title: "Customer Master", body: "Identify which contact records represent customers that field teams actually serve." },
      { title: "Product Data", body: "Choose which products and product details are relevant in the field." },
      { title: "Units of Measure", body: "Check how units in Odoo correspond to the units sold on the route." },
      { title: "Packaging Considerations", body: "Review how cases, packs and multipacks are represented, since this directly affects order entry." },
      { title: "Pricing", body: "Review how pricelists and customer-specific prices should reach field users." },
      { title: "Tax Mapping", body: "Agree how tax settings in each system correspond for relevant transactions." },
      { title: "Supported Transactions", body: "Agree which transactions are in scope, rather than assuming everything is." },
      { title: "Synchronization", body: "Decide what moves, how often, and how failed records are surfaced." },
      { title: "Integration Scope", body: "Write down what is included and what is not. This does not mean complete support for every Odoo model or workflow." },
    ],
    cta: { label: "Review Odoo Integration Requirements", href: "/contact" },
    scopeNote: "Vanforces does not claim complete support for every Odoo model or workflow. Scope is agreed per project.",
    checklist: ["Note your Odoo version and modules", "List customizations", "Prepare product and packaging examples", "Identify must-have transactions"],
    faqs: [
      { q: "Does this cover all Odoo modules?", a: "No. Scope is agreed per project, and complete support for every Odoo model or workflow is not claimed." },
      { q: "Do customizations affect the integration?", a: "They can. Custom fields and workflows are best reviewed early, as part of the requirements discussion." },
    ],
  },
];

export const integrationBySlug = (slug: string) => integrations.find((i) => i.slug === slug);

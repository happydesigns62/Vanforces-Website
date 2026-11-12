import {
  ArrowLeftRight,
  Building2,
  Camera,
  ClipboardCheck,
  Clock,
  Eye,
  FileCheck2,
  FileText,
  HandCoins,
  Layers,
  LayoutGrid,
  ListChecks,
  Map,
  MapPin,
  Megaphone,
  PackageCheck,
  ScanSearch,
  ShoppingCart,
  Snowflake,
  Store,
  Tags,
  Target,
  Truck,
  Undo2,
  UserCog,
  Users,
  Wallet,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

export type ModuleItem = { name: string; line: string; icon: LucideIcon; href?: string };

export type ModuleFamily = {
  id: string;
  code: string;
  name: string;
  line: string;
  /** Accent classes, written out in full so the styles are generated. */
  tile: string;
  chip: string;
  modules: ModuleItem[];
};

/**
 * The Vanforces platform as three families of modules. The names are the ones supplied by the Vanforces team. The one-line
 * descriptions only restate each name, and a module links to its page only where the site already has one.
 */
export const moduleFamilies: ModuleFamily[] = [
  {
    id: "sfa",
    code: "SFA",
    name: "Sales Force Automation",
    line: "Everything the field team does, from the plan to the payment.",
    tile: "bg-teal-deep text-white",
    chip: "bg-cyan-soft text-teal-deep",
    modules: [
      { name: "Customer and Outlet Management", line: "Customer and outlet records, ready at every visit.", icon: Users, href: "/platform/customers" },
      { name: "Territory, Route and Journey Planning", line: "Plan territories, routes and journeys.", icon: Map, href: "/platform/routes" },
      { name: "Visit Management", line: "Plan, run and review every visit.", icon: MapPin, href: "/platform/field-sales" },
      { name: "Order and Sales Management", line: "Orders and sales captured at the customer.", icon: ShoppingCart, href: "/platform/orders" },
      { name: "Quotation Management", line: "Quotations prepared and followed up.", icon: FileText, href: "/platform/orders" },
      { name: "Collections and Payment Capture", line: "Payments recorded where they are made.", icon: Wallet, href: "/platform/collections" },
      { name: "Targets and Sales Performance", line: "Targets and progress in view.", icon: Target, href: "/platform/intelligence" },
      { name: "Field Force and Supervisor Management", line: "Supervisors oversee the field team.", icon: UserCog, href: "/platform/control-room" },
      { name: "Attendance and Field Activity", line: "Attendance and field activity recorded.", icon: Clock },
    ],
  },
  {
    id: "dms",
    code: "DMS",
    name: "Distribution Management System",
    line: "Stock, delivery and settlement behind every sale.",
    tile: "bg-accent-blue text-white",
    chip: "bg-accent-blue-soft text-accent-blue-deep",
    modules: [
      { name: "Distributor Management", line: "Manage distributors and their activity.", icon: Building2 },
      { name: "Van Sales and Direct Store Delivery", line: "Sell and deliver from the vehicle.", icon: Truck, href: "/platform/van-sales" },
      { name: "Warehouse and Inventory Management", line: "Stock from the warehouse to the van.", icon: Warehouse, href: "/platform/inventory" },
      { name: "Stock Loading, Unloading and Reconciliation", line: "Load, unload and reconcile stock.", icon: ArrowLeftRight, href: "/platform/inventory" },
      { name: "Delivery and Fulfillment Management", line: "From assigned order to customer handover.", icon: PackageCheck, href: "/platform/delivery" },
      { name: "Returns and Damages Management", line: "Returns and damaged goods recorded.", icon: Undo2 },
      { name: "Receivables and Settlement", line: "Receivables and settlements tracked.", icon: HandCoins, href: "/platform/collections" },
      { name: "Product, Pricing and Tax Management", line: "Products, prices and taxes maintained.", icon: Tags },
      { name: "E-Invoicing and Tax Compliance", line: "E-invoicing and tax workflows.", icon: FileCheck2, href: "/integrations" },
    ],
  },
  {
    id: "rem",
    code: "REM",
    name: "Retail Execution and Merchandising",
    line: "What happens on the shelf, checked and recorded at the outlet.",
    tile: "bg-accent-violet text-white",
    chip: "bg-accent-violet-soft text-accent-violet-deep",
    modules: [
      { name: "Retail Visit Execution", line: "Run structured visits at the outlet.", icon: Store },
      { name: "Surveys and Checklists", line: "Surveys and checklists inside the visit.", icon: ClipboardCheck },
      { name: "Product Availability and Stock Checks", line: "Check availability on the shelf.", icon: ScanSearch },
      { name: "Evidence Capture", line: "Capture photo evidence at the outlet.", icon: Camera },
      { name: "Merchandising", line: "Keep displays as planned.", icon: LayoutGrid },
      { name: "Assortment Compliance", line: "Check the agreed range is on the shelf.", icon: ListChecks },
      { name: "Planogram and Shelf Compliance", line: "Compare shelves with the planogram.", icon: Layers },
      { name: "Promotion Execution", line: "See promotions carried out in store.", icon: Megaphone },
      { name: "Competitor Tracking", line: "Note what competitors do at the outlet.", icon: Eye },
      { name: "Asset, Cooler and Display Tracking", line: "Track coolers, displays and other assets.", icon: Snowflake },
    ],
  },
];

import Image from "next/image";
import {
  ArrowLeftRight,
  BarChart3,
  Bell,
  Building2,
  Calendar,
  ChevronDown,
  CircleHelp,
  ClipboardList,
  Download,
  FileText,
  Filter,
  Folder,
  ImageIcon,
  LayoutDashboard,
  MapPin,
  Menu,
  MessageCircle,
  Monitor,
  Package,
  PieChart,
  Route as RouteIcon,
  Search,
  Table2,
  Tag,
  Target,
  Users,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import { ScaledScreen } from "./ScaledScreen";

/* The Vanforces Dashboard screen, redrawn from the real screen as page elements, so every letter and number is sharp at any size.
   It keeps the real screen's layout, labels and masked values. */

const W = 1200;
const H = 575;

const quick = ["Product", "Distributors", "Users", "Customer", "Route", "Target Plan", "Target Plan Summary", "Add Variance", "PDC Register", "Collections Return", "Route Customer Visit", "PDC Dashboard", "CXO Business Command Center"];

type NavItem = { label: string; icon: LucideIcon; open?: boolean };
const navGroups: { title: string; items: NavItem[] }[] = [
  { title: "MAIN", items: [{ label: "Dashboard", icon: LayoutDashboard, open: true }] },
  { title: "", items: [{ label: "Transactions", icon: ArrowLeftRight }, { label: "Reports", icon: BarChart3 }] },
  {
    title: "MASTERS",
    items: [
      { label: "Customer Masters", icon: Users },
      { label: "Competitor", icon: Target },
      { label: "Distributor", icon: Building2 },
      { label: "Route Masters", icon: RouteIcon },
      { label: "Product Masters", icon: Package },
      { label: "Price Masters", icon: Tag },
    ],
  },
  { title: "OPERATIONS", items: [{ label: "Warehouse Transactions", icon: Warehouse }, { label: "Media", icon: ImageIcon }, { label: "Customer Survey", icon: ClipboardList }] },
  { title: "ADMIN", items: [{ label: "Locale Masters", icon: MapPin }] },
];
const subItems = ["Dashboard", "Live Dashboard", "Performance & Targets", "Intelligence & Analytics", "Route Operations"];

const tiles = [
  { value: "1,368,712", label: "Total Sales" },
  { value: "1,500,790", label: "Total Collection" },
  { value: "387,684", label: "Total Credit Given" },
  { value: "0", label: "Total Orders" },
  { value: "0", label: "Total Delivery" },
];

const deliveries = [
  ["30 Mar 2026", "1", "0", "0", "0"],
  ["31 Mar 2026", "19", "4", "2", "0"],
  ["01 Apr 2026", "3", "0", "2", "0"],
  ["06 Apr 2026", "1", "0", "0", "0"],
  ["07 Apr 2026", "1", "0", "1", "0"],
  ["29 Apr 2026", "3", "1", "1", "0"],
];

// The monthly sales line: mostly flat, with a few small peaks and one large one, as on the real screen. Drawn in a 1000 by 120 box.
const salesLine =
  "M0 100 L3 70 L8 98 L170 99 L174 66 L180 99 L330 99 L334 82 L340 99 L500 99 L503 91 L508 99 L640 99 L650 99 L653 8 L657 99 L800 99 L802 96 L806 99 L1000 99";

function DateField() {
  return (
    <span className="flex items-center gap-1 rounded-[3px] border border-[#dfe5ea] bg-white px-1.5 py-[3px] text-[7.5px] text-[#2c3e4b]">
      2026-01-01 <span className="text-[#9aa8b3]">→</span> 2026-11-09 <Calendar size={7} className="text-[#9aa8b3]" />
    </span>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex-1 overflow-hidden rounded-[4px] border border-[#e3e8ec] bg-white px-2 pb-2 pt-1.5">
      <div className="flex items-center justify-between">
        <p className="text-[9.5px] font-bold text-[#16232d]">{title}</p>
        <div className="flex items-center gap-1">
          <Monitor size={8} className="text-[#6b7b88]" />
          <span className="flex size-[13px] items-center justify-center rounded-[3px] border border-[#dfe5ea]">
            <Download size={7} className="text-[#4a5b68]" />
          </span>
          <DateField />
        </div>
      </div>
      {children}
    </div>
  );
}

function Tabs({ active }: { active: "table" | "chart" }) {
  return (
    <div className="mt-1.5 flex gap-3 border-b border-[#e8edf1] pb-1 text-[8px]">
      <span className={`flex items-center gap-1 ${active === "table" ? "border-b-2 border-[#14a8b1] pb-0.5 font-bold text-[#0e7f86]" : "text-[#4a5b68]"}`}>
        <Table2 size={8} /> Table
      </span>
      <span className={`flex items-center gap-1 ${active === "chart" ? "border-b-2 border-[#14a8b1] pb-0.5 font-bold text-[#0e7f86]" : "text-[#4a5b68]"}`}>
        <PieChart size={8} /> Chart
      </span>
    </div>
  );
}

function Bars({ axis, bars, total }: { axis: string[]; bars: { name: string; height: number; color: string; note: string }[]; total: string }) {
  return (
    <div className="mt-1.5">
      <div className="flex items-center justify-between text-[7px]">
        <span className="flex overflow-hidden rounded-[3px] border border-[#dfe5ea]">
          <span className="bg-[#f1f4f7] px-1.5 py-[2px] text-[#344654]">Column</span>
          <span className="px-1.5 py-[2px] text-[#7a8a96]">Donut</span>
        </span>
        <span className="font-bold text-[#0e7f86]">{total}</span>
      </div>
      <div className="relative mt-1.5 flex h-[118px]">
        <div className="flex w-[44px] flex-col justify-between pb-[14px] text-[6px] text-[#8795a1]">
          {axis.map((a) => (
            <span key={a}>{a}</span>
          ))}
        </div>
        <div className="relative flex-1 border-b border-[#dfe5ea]">
          {axis.map((a, i) => (
            <span key={a} aria-hidden="true" className="absolute inset-x-0 border-t border-[#eef2f5]" style={{ top: `${(i / (axis.length - 1)) * 86}%` }} />
          ))}
          <div className="absolute inset-x-0 bottom-0 flex h-[86%] items-end justify-around">
            {bars.map((bar) => (
              <div key={bar.name} className="flex w-[34%] flex-col items-center justify-end">
                <span className="mb-0.5 text-[6px] text-[#5d6e7b]">{bar.note}</span>
                <span className="block w-full" style={{ height: `${bar.height}%`, background: bar.color }} />
              </div>
            ))}
          </div>
          <div className="absolute inset-x-0 -bottom-[13px] flex justify-around text-[6px] text-[#6b7b88]">
            {bars.map((bar) => (
              <span key={bar.name} className="w-[34%] text-center">
                {bar.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Screen() {
  return (
    <div className="flex flex-col bg-white font-[inherit] text-[#16232d]" style={{ width: W, height: H }}>
      {/* Top bar */}
      <div className="flex h-[34px] shrink-0 items-center justify-between px-3">
        <div className="flex items-center gap-3">
          <Menu size={11} className="text-[#4a5b68]" />
          <Image src="/brand/vanforces-logo.svg" alt="" width={170} height={46} className="h-[17px] w-auto" />
        </div>
        <div className="flex items-center gap-3 text-[#4a5b68]">
          <Monitor size={11} />
          <Search size={11} />
          <Filter size={11} />
          <Image src="/brand/entaura-icon.png" alt="" width={260} height={149} className="h-[9px] w-auto" />
          <MessageCircle size={11} />
          <span className="relative flex size-[19px] items-center justify-center rounded-full bg-[#d9f3f4] text-[#14a8b1]">
            <Bell size={10} />
            <span className="absolute -right-0.5 -top-0.5 flex size-[9px] items-center justify-center rounded-full bg-[#e0352b] text-[5px] font-bold text-white">4</span>
          </span>
          <CircleHelp size={11} />
          <span className="text-[7px] font-semibold">GB EN</span>
          <span className="h-[5px] w-[44px] rounded-full bg-[#e6ebef]" />
          <span className="flex size-[18px] items-center justify-center rounded-full bg-[#14a8b1] text-[8px] font-bold text-white">A</span>
        </div>
      </div>

      {/* Quick links */}
      <div className="flex shrink-0 gap-[3px] px-2 pb-1.5">
        {quick.map((q) => (
          <span key={q} className="whitespace-nowrap rounded-[2px] border border-[#dfe5ea] bg-white px-1.5 py-[2px] text-[6.5px] font-medium text-[#344654]">
            {q}
          </span>
        ))}
      </div>

      <div className="flex min-h-0 flex-1 border-t border-[#eef2f5]">
        {/* Sidebar */}
        <div className="w-[118px] shrink-0 overflow-hidden border-r border-[#eef2f5] px-1.5 pt-2">
          <div className="flex items-center justify-between rounded-[3px] border border-[#dfe5ea] px-1.5 py-[3px] text-[7px] text-[#9aa8b3]">
            Search menu <Search size={7} />
          </div>
          {navGroups.map((group) => (
            <div key={group.title + group.items[0].label} className="mt-2">
              {group.title ? <p className="mb-1 text-[6.5px] font-bold tracking-[0.04em] text-[#16232d]">{group.title}</p> : null}
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label}>
                    <div className={`flex items-center gap-1.5 py-[4px] text-[7.5px] ${item.open ? "font-semibold text-[#0e7f86]" : "text-[#344654]"}`}>
                      <Icon size={8} className="shrink-0" />
                      <span className="flex-1 truncate">{item.label}</span>
                      <ChevronDown size={7} className="text-[#6b7b88]" />
                    </div>
                    {item.open ? (
                      <div className="ml-1">
                        {subItems.map((sub, i) => (
                          <div key={sub} className={`flex items-center gap-1.5 rounded-[3px] px-1.5 py-[4px] text-[7px] ${i === 0 ? "bg-[#e4f6f7] font-medium text-[#0e7f86]" : "text-[#344654]"}`}>
                            {i < 2 ? <FileText size={7} className="shrink-0" /> : <Folder size={7} className="shrink-0" />}
                            <span className="truncate">{sub}</span>
                            {i === 0 ? <span className="text-[6px]">☆</span> : null}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Main area */}
        <div className="min-w-0 flex-1 bg-[#f4f6f8] px-2 pb-2 pt-1.5">
          <div className="flex items-center justify-end gap-1.5">
            <span className="flex items-center gap-3 rounded-[3px] border border-[#dfe5ea] bg-white px-1.5 py-[3px] text-[7.5px]">
              Sales <ChevronDown size={7} className="text-[#9aa8b3]" />
            </span>
            <DateField />
            {[Filter, Menu, Filter].map((Icon, i) => (
              <span key={i} className="flex size-[15px] items-center justify-center rounded-[3px] border border-[#dfe5ea] bg-white text-[#4a5b68]">
                <Icon size={7} />
              </span>
            ))}
          </div>

          <div className="mt-1.5 grid grid-cols-5 gap-1.5">
            {tiles.map((tile) => (
              <div key={tile.label} className="relative h-[46px] overflow-hidden rounded-[4px] bg-[#1db1ba] px-2 py-1.5 text-white">
                <span aria-hidden="true" className="absolute -top-[26px] left-[28%] size-[70px] rounded-full bg-white/10" />
                <span className="absolute right-1.5 top-1.5 size-[9px] rounded-full bg-white/80" />
                <span className="absolute bottom-1.5 right-1.5 size-[9px] rounded-[2px] bg-white/55" />
                <p className="relative text-[10px] font-bold leading-none">{tile.value}</p>
                <p className="relative mt-1.5 text-[7px] font-semibold">{tile.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-1.5 rounded-[4px] border border-[#e3e8ec] bg-white px-2 pb-1.5 pt-1.5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[9.5px] font-bold">Monthly Sales</p>
                <p className="text-[6px] text-[#6b7b88]">01 Jan 2026 - 09 Nov 2026</p>
              </div>
              <span className="flex items-center gap-1 rounded-[3px] border border-[#dfe5ea] px-1.5 py-[2px] text-[7px] text-[#344654]">
                <Monitor size={7} /> Monthly <ChevronDown size={7} />
              </span>
            </div>
            <div className="relative mt-1 flex h-[112px]">
              <div className="flex w-[30px] flex-col justify-between pb-[6px] text-[6px] text-[#8795a1]">
                <span>935.3K</span>
                <span>500.0K</span>
                <span>250.0K</span>
                <span>0</span>
              </div>
              <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="h-full flex-1" role="presentation">
                <path d={salesLine} fill="none" stroke="#5c9fb4" strokeWidth="1.6" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
          </div>

          <div className="mt-1.5 overflow-hidden rounded-[4px] border border-[#e3e8ec] bg-white">
            <p className="flex items-center gap-1 border-b border-[#e8edf1] px-2 py-[5px] text-[8px] font-semibold">
              <ChevronDown size={8} /> Financial summary
            </p>
            <div className="flex gap-1.5 bg-[#f4f6f8] p-1.5">
              <Panel title="Total Credit Given">
                <Tabs active="chart" />
                <Bars
                  axis={["SR 200,000", "SR 150,000", "SR 100,000", "SR 50,000", "SR 0"]}
                  total="SR 387,684"
                  bars={[
                    { name: "Paid", height: 98, color: "linear-gradient(180deg,#5f8df7,#7aa0f8)", note: "54.4%" },
                    { name: "Balance", height: 82, color: "linear-gradient(180deg,#5fd9ac,#7fe3bd)", note: "45.6%" },
                  ]}
                />
              </Panel>
              <Panel title="Total Collection">
                <Tabs active="chart" />
                <Bars
                  axis={["SR 1,500,000", "SR 1,000,000", "SR 500,000", "SR 0"]}
                  total="SR 1,500,790"
                  bars={[
                    { name: "Cash", height: 100, color: "linear-gradient(180deg,#5f8df7,#7aa0f8)", note: "" },
                    { name: "Bank Transfer", height: 1, color: "#7aa0f8", note: "0.0%" },
                  ]}
                />
              </Panel>
              <Panel title="Total Delivery">
                <Tabs active="table" />
                <table className="mt-1.5 w-full text-[7px]">
                  <thead>
                    <tr className="border-b border-[#e8edf1] text-right font-bold">
                      <th className="py-1 text-left">Date</th>
                      <th>Runs</th>
                      <th>Completed</th>
                      <th>Cancelled</th>
                      <th>In Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliveries.map((row) => (
                      <tr key={row[0]} className="text-right text-[#16232d]">
                        <td className="py-[4px] text-left">{row[0]}</td>
                        {row.slice(1).map((cell, i) => (
                          <td key={i} className="text-[#2d6fd6]">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Panel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** The redrawn Vanforces Dashboard screen, scaled to fit its box. The bottom is cut off by its frame, as in the real screen. */
export function DashboardScreen({ className = "" }: { className?: string }) {
  return (
    <ScaledScreen width={W} height={H} className={className} label="The Vanforces Dashboard screen, redrawn from the real screen: sales, collection and credit totals, a monthly sales chart and the financial summary.">
      <Screen />
    </ScaledScreen>
  );
}

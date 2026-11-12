"use client";

import { Bell, CircleHelp, Download, Filter, LayoutGrid, Plus, Search } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

/* The Finance Command Center screen, redrawn from the real screen as page elements, so every letter and number is sharp at any
   size. It keeps the real screen's layout, labels and masked values. The screen is built at a fixed design width and then
   scaled to fit its box. */

const DESIGN_W = 900;
const DESIGN_H = 560;

const down = "#d6342b";
const up = "#2b8a3e";

type Change = [string, "down" | "up"];
type Kpi = { label: string; value: string; tint: string; changes: Change[] };

const rowOne: Kpi[] = [
  { label: "Average Order Value", value: "SR 4.47K", tint: "#e0457b", changes: [["-97.7% QoQ", "down"]] },
  { label: "Average Sales Value", value: "SR 2.73K", tint: "#3b82f6", changes: [["-100.0% QoQ", "down"], ["+102.4% YoY", "up"]] },
  { label: "Collection Efficiency", value: "129.4%", tint: "#8b5cf6", changes: [["-100.0% QoQ", "down"], ["+294.2 pp YoY", "up"]] },
  { label: "Collection Gap", value: "SR -254.72K", tint: "#16a34a", changes: [["-100.0% QoQ", "down"], ["-652.4% YoY", "down"]] },
  { label: "Customer Outstanding", value: "SR 1.01M", tint: "#ef4444", changes: [["+57.8% QoQ", "up"], ["+2263.1% YoY", "down"]] },
  { label: "Delivery Completion Rate", value: "43.3%", tint: "#f59e0b", changes: [] },
  { label: "Margin", value: "99.5%", tint: "#6366f1", changes: [["-100.0% QoQ", "down"], ["-0.5% YoY", "down"]] },
  { label: "Net Collection", value: "SR 1.12M", tint: "#16a34a", changes: [["-100.0% QoQ", "down"], ["+4974.4% YoY", "up"]] },
  { label: "Net Sales", value: "SR 867.76K", tint: "#0ea5e9", changes: [["-100.0% QoQ", "down"], ["+1187.2% YoY", "up"]] },
  { label: "Order Conversion Rate", value: "0.0%", tint: "#e0457b", changes: [] },
];
const rowTwo: Kpi[] = [
  { label: "Profit", value: "SR 1.02M", tint: "#f59e0b", changes: [["-100.0% QoQ", "down"], ["+1815.6% YoY", "up"]] },
  { label: "Target Achievement", value: "0.7%", tint: "#ef4444", changes: [["-100.0% QoQ", "down"]] },
  { label: "Target Gap", value: "SR 57.16M", tint: "#f59e0b", changes: [["-100.0% QoQ", "down"]] },
  { label: "Total Collection", value: "SR 1.50M", tint: "#16a34a", changes: [["-100.0% QoQ", "down"], ["+6495.9% YoY", "up"]] },
  { label: "Total Collection Return", value: "SR 377.32K", tint: "#16a34a", changes: [["+60999.3% YoY", "up"]] },
  { label: "Total Discount", value: "SR 6.88K", tint: "#f59e0b", changes: [] },
  { label: "Total Expenses", value: "SR 4.87K", tint: "#3b82f6", changes: [] },
  { label: "Total Foc", value: "SR 500.00", tint: "#f97316", changes: [] },
  { label: "Total Gr", value: "SR 335.87K", tint: "#f59e0b", changes: [["+11829.3% YoY", "up"]] },
  { label: "Total Order", value: "SR 420.61K", tint: "#e0457b", changes: [["-96.9% QoQ", "down"]] },
];
const rowThree: Kpi[] = [
  { label: "Total Sales", value: "SR 1.28M", tint: "#3b82f6", changes: [["-100.0% QoQ", "down"], ["+1770.4% YoY", "up"]] },
  { label: "Total Sales Tax", value: "SR 261.09K", tint: "#3b82f6", changes: [["-100.0% QoQ", "down"], ["+5399.3% YoY", "up"]] },
  { label: "Total Taxable", value: "SR 1.02M", tint: "#f59e0b", changes: [["-100.0% QoQ", "down"], ["+1623.8% YoY", "up"]] },
];

const shown: Kpi[] = [rowOne[0], rowOne[1], rowOne[2], rowOne[3], rowOne[4], rowOne[8], rowTwo[0], rowTwo[1], rowTwo[3], rowThree[0], rowTwo[6], rowTwo[9]];

const funnel = [
  { name: "Quotations", value: "SR 126.80K", records: "71 records", bg: "linear-gradient(135deg,#0f8a93,#17a2ab)", light: false },
  { name: "Orders", value: "SR 420.61K", records: "94 records", bg: "linear-gradient(135deg,#119aa3,#1fb0b9)", light: false },
  { name: "Deliveries", value: "SR 203.13K", records: "30 records", bg: "linear-gradient(135deg,#17a6af,#27bcc4)", light: false },
  { name: "Sales", value: "SR 1.28M", records: "318 records", bg: "linear-gradient(135deg,#34bfc7,#58d0d6)", light: false },
  { name: "Collections", value: "SR 1.50M", records: "222 records", bg: "linear-gradient(135deg,#7dd3d8,#9bdfe3)", light: false },
  { name: "Expenses", value: "SR 4.87K", records: "7 records", bg: "linear-gradient(135deg,#d2f1f3,#e4f7f8)", light: true },
  { name: "Settlements", value: "SR 2.02M", records: "9 records", bg: "linear-gradient(135deg,#dff5f2,#eefaf8)", light: true },
];

function KpiCard({ kpi }: { kpi: Kpi }) {
  return (
    <div className="rounded-[7px] border border-[#e3e8ec] bg-white px-2 py-1.5 shadow-[0_1px_2px_rgb(41_59_71/0.05)]">
      <div className="flex items-center gap-1">
        <span className="size-2.5 shrink-0 rounded-[3px]" style={{ background: kpi.tint, opacity: 0.85 }} />
        <span className="truncate text-[8.5px] font-semibold text-[#344654]">{kpi.label}</span>
      </div>
      <p className="mt-1 text-[13.5px] font-bold leading-none tracking-[-0.01em] text-[#16232d]">{kpi.value}</p>
      <p className="mt-1.5 flex min-h-[9px] flex-wrap gap-x-1.5 text-[7.5px] font-semibold leading-none">
        {kpi.changes.map(([text, tone]) => (
          <span key={text} style={{ color: tone === "down" ? down : up }}>
            {tone === "down" ? "▾" : "▴"} {text}
          </span>
        ))}
      </p>
    </div>
  );
}

function Screen() {
  return (
    <div className="bg-[#f1f4f7] font-[inherit] text-[#16232d]" style={{ width: DESIGN_W, height: DESIGN_H }}>
      {/* Top bar */}
      <div className="flex h-[34px] items-center justify-between border-b border-[#e3e8ec] bg-white px-3.5">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-teal-deep">V</span>
          <span className="text-[12px] font-bold">CXO Business Command Center</span>
        </div>
        <div className="flex items-center gap-3 text-[#4a5b68]">
          <Search size={12} />
          <Filter size={12} />
          <Bell size={12} />
          <CircleHelp size={12} />
          <span className="text-[8px] font-semibold">GB EN</span>
          <span className="flex size-5 items-center justify-center rounded-full bg-[#14a8b1] text-[8px] font-bold text-white">A</span>
        </div>
      </div>

      <div className="px-3.5 pt-2.5">
        {/* Title and view tabs */}
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-[20px] font-bold leading-none tracking-[-0.02em]">
              Finance Command Center <span className="text-[13px] text-[#f5a623]">★</span>
            </h4>
            <p className="mt-1 text-[8px] text-[#5d6e7b]">Sales, collections, orders, adjustments, warehouse movement and settlement performance.</p>
          </div>
          <div className="flex gap-0.5 rounded-[7px] border border-[#e3e8ec] bg-white p-0.5 text-[8.5px] font-semibold text-[#344654]">
            {["Finance", "Customer", "Route", "Product", "Distributor"].map((tab, i) => (
              <span key={tab} className={`rounded-[5px] px-2.5 py-1 ${i === 0 ? "bg-[#d9f3f4] text-teal-deep" : ""}`}>
                {tab}
              </span>
            ))}
          </div>
        </div>

        {/* Date toolbar */}
        <div className="mt-2 flex h-[26px] items-center justify-end gap-2 rounded-[7px] border border-[#e3e8ec] bg-white px-2 text-[8px] font-semibold text-[#344654]">
          <span className="rounded-[5px] bg-[#eef2f5] px-2 py-0.5">Last Week</span>
          <span className="rounded-[5px] bg-[#eef2f5] px-2 py-0.5">Last Month</span>
          <span className="rounded-[5px] border border-[#e3e8ec] px-2 py-0.5">2026-01-01 → 2026-11-11</span>
          <span className="rounded-[5px] bg-[#eef2f5] px-2 py-0.5">Daily</span>
          <span className="rounded-[5px] bg-[#14a8b1] px-2 py-0.5 text-white">Monthly</span>
          <span className="flex items-center gap-1 rounded-[5px] bg-[#14a8b1] px-2 py-0.5 text-white">
            <Download size={9} /> Export
          </span>
        </div>

        <div className="mt-1.5 flex items-center justify-between">
          <span className="border-b-2 border-[#14a8b1] pb-0.5 text-[8.5px] font-bold text-teal-deep">Default</span>
          <span className="flex gap-1 text-[#4a5b68]">
            <span className="flex size-4 items-center justify-center rounded-[4px] border border-[#e3e8ec] bg-white">
              <LayoutGrid size={8} />
            </span>
            <span className="flex size-4 items-center justify-center rounded-[4px] border border-[#e3e8ec] bg-white">
              <Plus size={8} />
            </span>
          </span>
        </div>

        {/* Executive insights */}
        <div className="mt-1.5 rounded-[8px] border border-[#e3e8ec] bg-white px-2.5 py-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-bold">Executive Insights &amp; Actions</p>
              <p className="text-[7px] text-[#5d6e7b]">Highest-priority route decisions first.</p>
            </div>
            <span className="flex items-center gap-1 rounded-full border border-[#e3e8ec] px-2 py-0.5 text-[6.5px] text-[#4a5b68]">
              <span className="size-1.5 rounded-full bg-[#2b8a3e]" /> Derived from validated route facts
            </span>
          </div>
          <div className="mt-1.5 flex gap-2">
            <div className="w-[300px] rounded-[6px] border border-[#cfe8c8] bg-[#f1faee] px-2 py-1.5">
              <div className="flex justify-between text-[6px] font-bold uppercase tracking-[0.1em] text-[#4a6b43]">
                <span>Protect</span>
                <span className="text-[10px] normal-case tracking-normal text-[#16232d]">129.3%</span>
              </div>
              <p className="text-[9px] font-bold">Collection efficiency</p>
              <p className="text-[6px] text-[#4a6b43]">Collection efficiency is based on realized collection value divided by sales value.</p>
            </div>
            <div className="w-[300px] rounded-[6px] border border-[#efe4b4] bg-[#fdf8e1] px-2 py-1.5">
              <div className="flex justify-between text-[6px] font-bold uppercase tracking-[0.1em] text-[#7a6a2a]">
                <span>Fulfilment</span>
                <span className="text-[10px] normal-case tracking-normal text-[#16232d]">SR 1.01M</span>
              </div>
              <p className="text-[9px] font-bold">Outstanding balance</p>
              <p className="text-[6px] text-[#7a6a2a]">Customer closing balance as of the selected period end.</p>
            </div>
          </div>
        </div>

        {/* KPI cards: the twelve that matter most, in the order they appear on the real screen. */}
        <div className="mt-1.5 grid grid-cols-6 gap-1.5">
          {shown.map((kpi) => (
            <KpiCard key={kpi.label} kpi={kpi} />
          ))}
        </div>

        {/* Order-to-cash funnel */}
        <div className="mt-2">
          <p className="text-[10px] font-bold">Order-to-Cash Funnel</p>
          <p className="text-[6.5px] text-[#5d6e7b]">Quotation → Order → Delivery → Sales → Collection → Expenses → Settlement</p>
          <div className="mt-1 flex items-center gap-1">
            {funnel.map((step, i) => (
              <div key={step.name} className="flex flex-1 items-center gap-1">
                <div className="flex-1 rounded-[7px] px-2 py-1.5" style={{ background: step.bg, color: step.light ? "#16232d" : "#fff" }}>
                  <p className="text-[8.5px] font-semibold">{step.name}</p>
                  <p className="mt-0.5 text-[12.5px] font-bold leading-none tracking-[-0.01em]">{step.value}</p>
                  <p className="mt-1 inline-block rounded-full bg-white/90 px-1.5 py-0.5 text-[7px] font-semibold text-[#16232d]">{step.records}</p>
                </div>
                {i < funnel.length - 1 ? <span className="text-[6px] text-[#16232d]">▶</span> : null}
              </div>
            ))}
          </div>
        </div>

        {/* Sales charts */}
        <div className="mt-2 grid grid-cols-[1fr_1fr] gap-1.5">
          <div className="rounded-[8px] border border-[#e3e8ec] bg-white px-2.5 py-2">
            <p className="text-[9px] font-bold">Sales by Source</p>
            <p className="text-[6.5px] text-[#5d6e7b]">Share of sales value, current period</p>
            <svg viewBox="0 0 100 100" className="mx-auto mt-1 block size-[92px]" role="presentation">
              <circle cx="50" cy="50" r="34" fill="none" stroke="#f5a623" strokeWidth="14" />
              <circle cx="50" cy="50" r="34" fill="none" stroke="#14a8b1" strokeWidth="14" strokeDasharray="181 214" transform="rotate(-80 50 50)" />
            </svg>
          </div>
          <div className="rounded-[8px] border border-[#e3e8ec] bg-white px-2.5 py-2">
            <p className="text-[9px] font-bold">Sales by Transaction Type</p>
            <p className="text-[6.5px] text-[#5d6e7b]">Cash vs credit value, current period</p>
            <div className="mt-2 flex h-[7px] overflow-hidden rounded-full">
              <span className="bg-[#14a8b1]" style={{ width: "76.8%" }} />
              <span className="bg-[#f5a623]" style={{ width: "23.2%" }} />
            </div>
            <div className="mt-2 rounded-[6px] border border-[#e3e8ec] px-2 py-1.5">
              <div className="flex justify-between text-[8px] font-semibold">
                <span>Cash</span>
                <span className="text-[#5d6e7b]">76.8%</span>
              </div>
              <p className="text-[10px] font-bold">SR 981.03K</p>
              <span className="mt-1 block h-[4px] rounded-full bg-[#14a8b1]" style={{ width: "76.8%" }} />
            </div>
            <div className="mt-1.5 rounded-[6px] border border-[#e3e8ec] px-2 py-1.5">
              <div className="flex justify-between text-[8px] font-semibold">
                <span>Credit</span>
                <span className="text-[#5d6e7b]">23.2%</span>
              </div>
              <span className="mt-1 block h-[4px] rounded-full bg-[#f5a623]" style={{ width: "23.2%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * The redrawn Finance Command Center screen, scaled to fit whatever width it is given. Text is real text, so it stays sharp on
 * any screen and when zoomed. The bottom is cut off by its frame, as in the real screen.
 */
export function FinanceScreen({ className = "" }: { className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setScale(el.clientWidth / DESIGN_W));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={box}
      role="img"
      aria-label="The Finance Command Center screen, redrawn from the real screen: executive insights, KPI cards, the order-to-cash funnel and sales charts."
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: DESIGN_H * scale, opacity: scale ? 1 : 0 } as CSSProperties}
    >
      <div aria-hidden="true" style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        <Screen />
      </div>
    </div>
  );
}

import type { ReactNode } from "react";
import { Bell, Grid3x3, Plus, Settings, Monitor } from "lucide-react";
import { ScaledScreen } from "./ScaledScreen";

/**
 * Vanforces Control Room screens, redrawn as page elements with SYNTHETIC demonstration data.
 * Nothing here comes from a customer. Names, numbers, routes and maps are invented, and the maps are abstract shapes, not real places.
 * The layout and labels follow the real product screens so visitors see what the product looks like.
 */

export const SAMPLE_NOTE = "Illustrative sample data. Not customer information.";

const W = 960;

const card = "rounded-lg border border-[#e6ebf0] bg-white";
const title = "px-3.5 py-2.5 text-[13px] font-semibold text-[#27343f] border-b border-[#eef1f4]";

function Frame({ name, children, height }: { name: string; children: ReactNode; height: number }) {
  return (
    <div className="relative bg-[#f4f7f9] p-3 text-[#27343f]" style={{ width: W, height, fontFamily: "inherit" }}>
      <div className="mb-3 flex items-center justify-between rounded-lg border border-[#e6ebf0] bg-white px-3.5 py-2">
        <div className="flex items-center gap-2.5">
          <span className="text-[14px] font-semibold">{name}</span>
          <span className="rounded border border-[#a9c8f0] bg-[#eef5ff] px-1.5 py-px text-[10px] text-[#2a62b5]">All branches</span>
          <span className="rounded border border-[#b9e3a6] bg-[#f1fbea] px-1.5 py-px text-[10px] text-[#3c8a1f]">10:42 AM</span>
        </div>
        <span className="text-[13px] font-semibold">10:43 AM</span>
      </div>
      {children}
      <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-teal px-3 py-1.5 text-[11px] font-semibold text-white shadow">
        <Bell size={12} />
        Alerts
      </span>
      <span className="absolute bottom-3 right-3 rounded bg-white/90 px-2 py-1 text-[10px] font-medium text-[#6b7a86] shadow-sm">Sample data</span>
    </div>
  );
}

function Spark({ points, h = 120, w = 600 }: { points: number[]; h?: number; w?: number }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const pts = points.map((p, i) => `${(i / (points.length - 1)) * w},${h - 8 - ((p - min) / (max - min || 1)) * (h - 16)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="block w-full" preserveAspectRatio="none" style={{ height: h }}>
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1="0" x2={w} y1={h * g} y2={h * g} stroke="#eef1f4" />
      ))}
      <polyline points={pts} fill="none" stroke="#6aa6bd" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function Kpi({ label, value, badge }: { label: string; value: string; badge: string }) {
  return (
    <div className={card}>
      <p className={title}>{label}</p>
      <div className="flex items-end justify-between px-3.5 py-3.5">
        <div>
          <p className="text-[26px] font-semibold leading-none tracking-tight text-[#12408f]">{value}</p>
          <p className="mt-1.5 text-[10.5px] text-[#7b8995]">{label}</p>
        </div>
        <span className="rounded-full bg-[#e9eef5] px-3 py-2 text-[10px] font-bold text-[#12408f]">{badge}</span>
      </div>
    </div>
  );
}

function Live({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className={card}>
      <div className="flex items-center justify-between px-3.5 py-2.5 text-[13px] font-semibold">
        {label}
        <span className="rounded bg-[#1fa04a] px-1.5 py-px text-[9px] font-bold text-white">LIVE</span>
      </div>
      <p className="pt-2 text-center text-[30px] font-semibold leading-none">{value}</p>
      <p className="pb-3 pt-3 text-center text-[11px] text-[#7b8995]">{note}</p>
    </div>
  );
}

function StatusBoard({ name, count, label, pct, tone, insight }: { name: string; count: number; label: string; pct: number; tone: string; insight: string }) {
  return (
    <div className="px-3.5 pb-3.5 pt-3">
      <p className="text-[11px] text-[#7b8995]">{name}</p>
      <p className="mt-0.5 text-[24px] font-semibold leading-none">{count}</p>
      <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-[#eef1f4]">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: tone }} />
      </div>
      <div className="mt-3 rounded-md border border-[#dce8f6] bg-[#f3f8fe] px-3 py-2">
        <p className="text-[12px] font-semibold">{label}</p>
        <p className="text-[18px] font-semibold leading-tight">{count}</p>
      </div>
      <p className="mt-2.5 rounded-md border border-[#e6ebf0] px-2.5 py-1.5 text-[11px]">
        <span className="mr-1.5 rounded border border-[#b9e3a6] bg-[#f1fbea] px-1.5 text-[10px] text-[#3c8a1f]">Insight</span>
        {insight}
      </p>
    </div>
  );
}

/** An abstract map: soft land shapes, a river, pins and an optional route line. It does not show any real place. */
function AbstractMap({ pins, route, h }: { pins: { x: number; y: number; c: string }[]; route?: string; h: number }) {
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className="block w-full" style={{ height: h }}>
      <rect width="400" height="200" fill="#eef2ee" />
      <path d="M0 120 C70 95 120 150 190 118 S320 90 400 112 L400 150 C320 128 250 165 190 150 S60 130 0 156Z" fill="#cfe7f3" />
      <path d="M40 0 C60 40 30 70 70 100" stroke="#dde5dc" strokeWidth="5" fill="none" />
      <path d="M230 0 C250 50 300 40 330 90" stroke="#dde5dc" strokeWidth="5" fill="none" />
      <path d="M120 200 C150 170 210 190 250 160" stroke="#dde5dc" strokeWidth="5" fill="none" />
      <rect x="260" y="20" width="60" height="38" rx="6" fill="#e2ebdf" />
      <rect x="60" y="150" width="70" height="30" rx="6" fill="#e2ebdf" />
      {route ? <path d={route} stroke="#2fa35a" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round" /> : null}
      {pins.map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y})`}>
          <path d="M0 0 C-7 -9 -9 -14 -9 -17 A9 9 0 1 1 9 -17 C9 -14 7 -9 0 0Z" fill={p.c} />
          <circle cy="-17" r="3.2" fill="#fff" />
        </g>
      ))}
    </svg>
  );
}

function Legend({ people }: { people: { name: string; c: string }[] }) {
  return (
    <div className="absolute bottom-2.5 left-2.5 rounded border border-[#27343f] bg-white px-2.5 py-1.5 text-[10px]">
      {people.map((p) => (
        <p key={p.name} className="flex items-center gap-1.5 py-px">
          <span className="size-2.5 rounded-sm border border-[#2a62b5] bg-[#2a62b5]" />
          <span className="size-2 rounded-full" style={{ background: p.c }} />
          {p.name}
        </p>
      ))}
    </div>
  );
}

const people = [
  { name: "Salesperson A", c: "#d93a35" },
  { name: "Salesperson B", c: "#2fa35a" },
  { name: "Salesperson C", c: "#7a3fc2" },
];

export function ExecutiveScreen() {
  return (
    <Frame name="Executive Overview" height={600}>
      <div className="grid grid-cols-4 gap-3">
        <Kpi label="Total Sales" value="124,500.00" badge="SALES" />
        <Kpi label="Total Collections" value="118,200.00" badge="COLL" />
        <Kpi label="Total Credits" value="62,300.00" badge="CR" />
        <Kpi label="New Customers" value="3" badge="NEW" />
      </div>
      <div className={`${card} mt-3`}>
        <p className={title}>Revenue Trend</p>
        <div className="px-4 py-3">
          <Spark points={[30, 42, 28, 55, 40, 62, 36, 58, 70, 44, 66, 52, 78, 48, 60, 82, 54, 68, 90, 62, 74, 58, 80, 66]} h={170} w={900} />
          <div className="mt-1 flex justify-between text-[10px] text-[#7b8995]">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {["Order Report", "Delivery Report"].map((n, k) => (
          <div key={n} className={card}>
            <p className={title}>{n}</p>
            <div className="flex h-[120px] items-end gap-2 px-4 pb-3 pt-4">
              {[40, 62, 48, 78, 56, 70, 44, 66, 82, 58].map((v, i) => (
                <span key={i} className="flex-1 rounded-t bg-[#9cc3d3]" style={{ height: `${k ? v * 0.8 : v}%` }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function LiveOpsScreen() {
  const rows = [
    ["1001", "Route 01", "Salesperson A", "Customer 101"],
    ["1002", "Route 01", "Salesperson A", "Customer 102"],
    ["1003", "Route 02", "Salesperson B", "Customer 201"],
    ["1004", "Route 02", "Salesperson B", "Customer 202"],
  ];
  return (
    <Frame name="Live Operations" height={640}>
      <div className="grid grid-cols-4 gap-3">
        <Live label="Live Sales" value="4" note="4 breakdown rows" />
        <Live label="Live Collections" value="3" note="3 breakdown rows" />
        <Live label="Live Orders" value="2" note="Current snapshot" />
        <Live label="Live Deliveries" value="1" note="Current snapshot" />
      </div>
      <div className="mt-3 grid grid-cols-[1fr_1.15fr] gap-3">
        <div className={card}>
          <p className={title}>Route Status Board</p>
          <StatusBoard name="Status Records" count={4} label="Active" pct={100} tone="#1fa04a" insight="4 Records are Active." />
        </div>
        <div className={card}>
          <div className="flex items-center justify-between">
            <p className={title + " border-b-0"}>Activity Feed</p>
            <span className="mr-3.5 rounded bg-[#1fa04a] px-1.5 py-px text-[9px] font-bold text-white">LIVE</span>
          </div>
          <ul className="space-y-2 px-3.5 pb-3">
            {["10:41 AM", "10:38 AM", "10:36 AM", "10:31 AM", "10:27 AM"].map((t, i) => (
              <li key={t} className="flex gap-2.5 text-[11px]">
                <span className="mt-1 size-2 shrink-0 rounded-full bg-[#1fa04a]" />
                <span>
                  Entry 000{5 - i} · Route 0{i < 2 ? 1 : 2}
                  <span className="block text-[9.5px] text-[#8996a1]">
                    {i < 2 ? "Salesperson A" : "Salesperson B"} · {t}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`${card} mt-3`}>
        <p className={title}>Live Routes</p>
        <table className="w-full text-left text-[11.5px]">
          <thead>
            <tr className="text-[#27343f]">
              {["Id", "Route", "Salesman", "Customer"].map((h) => (
                <th key={h} className="bg-[#f7f9fb] px-3.5 py-2 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="border-t border-[#eef1f4]">
                {r.map((c) => (
                  <td key={c} className="px-3.5 py-2">
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Frame>
  );
}

export function AttendanceScreen() {
  return (
    <Frame name="Attendance & Movement" height={640}>
      <div className="grid grid-cols-2 gap-3">
        <div className={card}>
          <p className={title}>Work Status Grid</p>
          <StatusBoard name="Status Records" count={6} label="Working" pct={100} tone="#3b82f6" insight="6 Records are Working." />
        </div>
        <div className={card}>
          <p className={title}>Salesman Log Map</p>
          <div className="relative px-3 pb-3">
            <div className="relative overflow-hidden rounded">
              <AbstractMap h={205} pins={[{ x: 120, y: 90, c: "#d93a35" }, { x: 190, y: 70, c: "#2fa35a" }, { x: 270, y: 100, c: "#7a3fc2" }]} />
              <Legend people={people} />
            </div>
          </div>
        </div>
      </div>
      <div className={`${card} mt-3`}>
        <p className={title}>Live Routes Map</p>
        <div className="px-3 pb-3">
          <div className="relative overflow-hidden rounded">
            <AbstractMap h={250} route="M40 60 C100 40 130 100 190 90 S300 40 360 80" pins={[{ x: 40, y: 62, c: "#2fa35a" }, { x: 360, y: 82, c: "#2fa35a" }]} />
            <Legend people={people} />
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function OrderDeliveryScreen() {
  return (
    <Frame name="Order & Delivery Control" height={640}>
      <div className="grid grid-cols-[1fr_1fr_1.1fr] gap-3">
        <Live label="Pending Orders" value="5" note="Current snapshot" />
        <Live label="Delivery Runs Summary" value="2" note="Current snapshot" />
        <div className={card}>
          <p className={title}>Delivery Runs</p>
          <ul className="space-y-1.5 px-3.5 py-2.5 text-[11px]">
            {["Run 01 · Route 01", "Run 02 · Route 02"].map((r) => (
              <li key={r} className="rounded bg-[#f7f9fb] px-2.5 py-1.5">
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className={card}>
          <p className={title}>Order Funnel</p>
          <StatusBoard name="Status Records" count={5} label="Open" pct={100} tone="#3b82f6" insight="5 Records are Open." />
        </div>
        <div className={card}>
          <p className={title}>Delivery Report</p>
          <div className="flex h-[196px] items-end gap-2 px-4 pb-3 pt-4">
            {[30, 52, 40, 66, 48, 58, 36, 62].map((v, i) => (
              <span key={i} className="flex-1 rounded-t bg-[#9cc3d3]" style={{ height: `${v}%` }} />
            ))}
          </div>
        </div>
      </div>
      <div className={`${card} mt-3`}>
        <p className={title}>Order Report</p>
        <div className="px-4 py-3">
          <Spark points={[32, 20, 12, 22, 26, 8, 28, 22, 10, 18, 30, 12, 20, 16, 14, 24]} h={130} w={900} />
        </div>
      </div>
    </Frame>
  );
}

export function LauncherScreen() {
  const screens = [
    { name: "Executive Overview", id: "/executive", refresh: "120s", w: "13/13", tone: "#2eb0f0" },
    { name: "Live Operations", id: "/liveOps", refresh: "30s", w: "7/7", tone: "#22c55e" },
    { name: "Attendance & Movement", id: "/attendance", refresh: "60s", w: "3/3", tone: "#a855f7" },
    { name: "Order & Delivery Control", id: "/orderDelivery", refresh: "45s", w: "6/6", tone: "#f59e0b" },
  ];
  return (
    <div className="relative bg-white p-6 text-[#27343f]" style={{ width: W, height: 400 }}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] tracking-[0.16em] text-teal-deep">VANFORCES</p>
          <p className="mt-1 text-[30px] font-semibold leading-none tracking-tight">Control Room Launcher</p>
          <p className="mt-3 max-w-[430px] text-[11px] leading-snug text-[#7b8995]">Open fixed screens for executive, operations, salesmen and order and delivery monitoring. Saved preferences are kept in the browser.</p>
          <span className="mt-2 inline-block rounded border border-[#a9c8f0] bg-[#eef5ff] px-1.5 py-px text-[10px] text-[#2a62b5]">All branches</span>
        </div>
        <div className="flex gap-2 text-[11px] font-medium">
          <span className="flex items-center gap-1.5 rounded border border-teal px-3 py-1.5 text-teal-deep">
            <Plus size={12} />
            Create Custom Screen
          </span>
          <span className="flex items-center gap-1.5 rounded bg-teal px-3 py-1.5 text-white">
            <Monitor size={12} />
            Open Carousel
          </span>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-4 gap-3">
        {screens.map((s) => (
          <div key={s.id} className="rounded-xl border border-[#e6ebf0] bg-white">
            <div className="flex items-center justify-between border-b border-[#eef1f4] px-3 py-2.5 text-[12px] font-semibold">
              <span className="flex items-center gap-1.5">
                <Grid3x3 size={11} className="text-[#aab4bc]" />
                {s.name}
              </span>
              <span className="rounded-full bg-teal px-2 py-px text-[9px] font-semibold text-white">On</span>
            </div>
            <div className="space-y-1.5 px-3 py-3 text-[11px]">
              <span className="inline-block rounded px-1.5 py-px text-[10px] text-white" style={{ background: s.tone }}>
                {s.id}
              </span>
              <p>Refresh: {s.refresh}</p>
              <p>Widgets: {s.w} enabled</p>
              <p className="rounded border border-[#e6ebf0] py-1 text-center">Open Screen</p>
              <p className="flex items-center justify-center gap-1.5 rounded border border-[#e6ebf0] py-1">
                <Settings size={11} />
                Configure Widgets
              </p>
            </div>
          </div>
        ))}
      </div>
      <span className="absolute bottom-2.5 right-3 text-[10px] text-[#8996a1]">Sample screen. Refresh rates and widget counts are examples.</span>
    </div>
  );
}

export const screens = {
  executive: { Screen: ExecutiveScreen, h: 600, label: "Executive Overview sample screen with total sales, collections, credits, new customers and a revenue trend, shown with illustrative data." },
  liveOps: { Screen: LiveOpsScreen, h: 640, label: "Live Operations sample screen with live sales, collections, orders, deliveries, a route status board, an activity feed and a routes table, shown with illustrative data." },
  attendance: { Screen: AttendanceScreen, h: 640, label: "Attendance and Movement sample screen with a work status grid and two maps, shown with illustrative data." },
  orderDelivery: { Screen: OrderDeliveryScreen, h: 640, label: "Order and Delivery Control sample screen with pending orders, delivery runs, an order funnel and reports, shown with illustrative data." },
  launcher: { Screen: LauncherScreen, h: 400, label: "Control Room Launcher sample screen listing four monitoring screens, shown with example settings." },
} as const;

export type ScreenKey = keyof typeof screens;

/** A scaled, sharp copy of one screen at any width. */
export function ControlRoomScreen({ kind, className = "" }: { kind: ScreenKey; className?: string }) {
  const { Screen, h, label } = screens[kind];
  return (
    <ScaledScreen width={W} height={h} label={label} className={`rounded-xl border border-line bg-white shadow-[0_24px_48px_-28px_rgb(8_60_66/0.45)] ${className}`}>
      <Screen />
    </ScaledScreen>
  );
}

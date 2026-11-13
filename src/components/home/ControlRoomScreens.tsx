import type { ReactNode } from "react";
import { BarChart3, Bell, ChevronDown, ChevronLeft, ChevronRight, GripVertical, Info, Lock, MapPin, Maximize2, Minus, Monitor, Plus, Settings, Table2 } from "lucide-react";
import { ScaledScreen } from "./ScaledScreen";

/**
 * Vanforces Control Room screens, redrawn as page elements to match the real product screens (same panels, labels, controls and
 * layout) with SYNTHETIC demonstration data. Nothing here comes from a customer: names, numbers, codes and maps are invented, and the
 * maps are abstract shapes, not real places. Being page elements, they stay sharp at any size and carry no hidden image data.
 */

export const SAMPLE_NOTE = "Illustrative sample data. Not customer information.";

const W = 1280;

const card = "rounded-[10px] border border-[#e3e8ee] bg-white";
const head = "flex items-center justify-between border-b border-[#eef1f4] px-4 py-3 text-[15px] font-semibold text-[#27343f]";

function Frame({ name, children, height, pager }: { name: string; children: ReactNode; height: number; pager?: boolean }) {
  return (
    <div className="relative overflow-hidden bg-[#f3f6f8] p-3.5 text-[#27343f]" style={{ width: W, height }}>
      <div className="mb-3.5 flex items-center justify-between rounded-[10px] border border-[#e3e8ee] bg-white px-4 py-2.5">
        <div className="flex items-center gap-3">
          <span className="text-[17px] font-semibold">{name}</span>
          <span className="rounded border border-[#a9c8f0] bg-[#eef5ff] px-2 py-0.5 text-[11px] text-[#2a62b5]">All branches</span>
          <span className="rounded border border-[#b9e3a6] bg-[#f1fbea] px-2 py-0.5 text-[11px] text-[#3c8a1f]">10:42 AM</span>
        </div>
        <span className="flex items-center gap-4 text-[17px] font-semibold">
          10:43 AM
          <Lock size={15} className="text-[#c3cbd2]" />
        </span>
      </div>
      {children}
      <span className="absolute bottom-3.5 left-3.5 z-10 flex items-center gap-2 rounded-full bg-teal px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_8px_18px_-8px_rgb(8_60_66/0.6)]">
        <Bell size={14} />
        Alerts
      </span>
      {pager ? (
        <span className="absolute bottom-3.5 right-[20%] z-10 flex items-center gap-3 rounded-full bg-white px-4 py-2 text-[13px] font-semibold shadow-[0_6px_18px_-8px_rgb(8_60_66/0.4)]">
          <span className="size-4 rounded-full border-2 border-[#2e90d1] border-t-transparent" />1 / 2<span className="h-4 w-px bg-[#e3e8ee]" />
          <ChevronLeft size={15} className="text-[#7b8995]" />
          <ChevronRight size={15} className="text-[#7b8995]" />
          <Info size={15} className="text-[#7b8995]" />
          <Minus size={15} className="text-[#7b8995]" />
        </span>
      ) : null}
    </div>
  );
}

/** A deterministic wavy series, so the charts look like real data but are made up. */
function series(n: number, seed: number, spread: number, base: number) {
  let s = seed;
  return Array.from({ length: n }, (_, i) => {
    s = (s * 9301 + 49297) % 233280;
    return base + (s / 233280 - 0.45) * spread + Math.sin(i / 3) * spread * 0.18;
  });
}

function Line({ points, h, labels, yLabels }: { points: number[]; h: number; labels: string[]; yLabels: string[] }) {
  const w = 1000;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const pts = points.map((p, i) => `${(i / (points.length - 1)) * w},${12 + (h - 24) - ((p - min) / (max - min || 1)) * (h - 24)}`).join(" ");
  return (
    <div className="relative px-4 pb-3 pt-2">
      <div className="grid grid-cols-[42px_minmax(0,1fr)] gap-2">
        <div className="flex flex-col justify-between py-1 text-right text-[10.5px] text-[#7b8995]" style={{ height: h }}>
          {yLabels.map((y) => (
            <span key={y}>{y}</span>
          ))}
        </div>
        <div>
          <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="block w-full" style={{ height: h }}>
            {[0.25, 0.5, 0.75].map((g) => (
              <line key={g} x1="0" x2={w} y1={h * g} y2={h * g} stroke="#eef1f4" />
            ))}
            <polyline points={pts} fill="none" stroke="#6aa6bd" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="mt-1.5 flex justify-between text-[10.5px] text-[#7b8995]">
            {labels.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Select({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-2 rounded border border-[#dde3e9] px-3 py-1 text-[12.5px] text-[#55636f]">
      {label}
      <ChevronDown size={13} />
    </span>
  );
}

function Toggles({ map }: { map?: boolean }) {
  return (
    <span className="flex overflow-hidden rounded border border-[#dde3e9] text-[#55636f]">
      <span className="flex h-6 w-7 items-center justify-center border-r border-[#dde3e9]">{map ? <MapPin size={13} /> : <BarChart3 size={13} />}</span>
      <span className="flex h-6 w-7 items-center justify-center bg-[#f3f6f8]">
        <Table2 size={13} />
      </span>
    </span>
  );
}

function Kpi({ label, value, badge }: { label: string; value: string; badge: string }) {
  return (
    <div className={card}>
      <p className={head}>{label}</p>
      <div className="flex items-end justify-between px-4 pb-4 pt-4">
        <div>
          <p className="text-[34px] font-semibold leading-none tracking-tight text-[#12408f]">{value}</p>
          <p className="mt-2 text-[12px] text-[#7b8995]">{label}</p>
        </div>
        <span className="rounded-full bg-[#e8edf4] px-4 py-3 text-[11px] font-bold text-[#12408f]">{badge}</span>
      </div>
    </div>
  );
}

function Live({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className={card}>
      <div className="flex items-center justify-between px-4 pb-1.5 pt-3 text-[15px] font-semibold">
        {label}
        <span className="rounded bg-[#1fa04a] px-2 py-0.5 text-[10px] font-bold text-white">LIVE</span>
      </div>
      <div className="border-t border-[#eef1f4] pb-4 pt-3 text-center">
        <p className="text-[38px] font-medium leading-none">{value}</p>
        <p className="mt-3 text-[12.5px] text-[#7b8995]">{note}</p>
      </div>
    </div>
  );
}

function StatusBoard({ name, count, label, tone, bg, border, insight }: { name: string; count: number; label: string; tone: string; bg: string; border: string; insight: string }) {
  return (
    <div className="px-5 pb-5 pt-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[14px] text-[#7b8995]">{name}</p>
          <p className="mt-1 text-[34px] font-medium leading-none">{count}</p>
        </div>
        <span className="rounded border border-[#a9c8f0] bg-[#eef5ff] px-2 py-0.5 text-[11.5px] text-[#2a62b5]">Statuses: 1</span>
      </div>
      <p className="mt-3 text-[11.5px] text-[#9aa6b0]">Status distribution for returned records</p>
      <div className="mt-2.5 h-3 rounded-full" style={{ background: tone }} />
      <p className="mt-1.5 flex items-center gap-1.5 text-[11.5px]">
        <span className="size-2 rounded-full" style={{ background: tone }} />
        {label} {count}
      </p>
      <div className="mt-3.5 flex items-start justify-between rounded-lg border px-4 py-3" style={{ background: bg, borderColor: border }}>
        <div>
          <p className="text-[14px] font-semibold">{label}</p>
          <p className="text-[22px] font-medium leading-tight">{count}</p>
          <p className="text-[11px] text-[#9aa6b0]">Records</p>
        </div>
        <span className="rounded px-2 py-0.5 text-[11.5px] font-bold text-white" style={{ background: tone }}>
          100%
        </span>
      </div>
      <p className="mt-3.5 rounded-lg border border-[#e3e8ee] px-3 py-2.5 text-[12.5px]">
        <span className="mr-2 rounded border border-[#b9e3a6] bg-[#f1fbea] px-2 py-0.5 text-[11.5px] text-[#3c8a1f]">Insight</span>
        {insight}
      </p>
    </div>
  );
}

/** An abstract map: soft land shapes, a river, pins and an optional route line. It does not show any real place. */
function AbstractMap({ pins, route, h, big }: { pins: { x: number; y: number; c: string }[]; route?: string; h: number; big?: boolean }) {
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className="block w-full" style={{ height: h }}>
      <rect width="400" height="200" fill="#eef1ec" />
      <path d="M0 118 C70 92 120 150 190 116 S320 88 400 110 L400 152 C320 128 250 166 190 150 S60 130 0 158Z" fill="#a9dbef" />
      <path d="M40 0 C60 40 30 70 70 100" stroke="#fff" strokeWidth="5" fill="none" />
      <path d="M230 0 C250 50 300 40 330 90" stroke="#fff" strokeWidth="5" fill="none" />
      <path d="M120 200 C150 170 210 190 250 160" stroke="#fff" strokeWidth="5" fill="none" />
      <path d="M0 40 C90 30 160 60 260 36 S360 30 400 44" stroke="#f6e7b3" strokeWidth="3.5" fill="none" />
      <rect x="262" y="18" width="62" height="38" rx="6" fill="#d5e8cd" />
      <rect x="58" y="150" width="72" height="30" rx="6" fill="#d5e8cd" />
      {big ? <rect x="150" y="60" width="50" height="26" rx="6" fill="#d5e8cd" /> : null}
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
    <div className="absolute bottom-3 left-3 border border-[#27343f] bg-white px-3 py-2 text-[11px] leading-5">
      {people.map((p) => (
        <p key={p.name} className="flex items-center gap-2">
          <span className="size-3 rounded-[3px] bg-[#2a62b5]" />
          <MapPin size={12} style={{ color: p.c }} />
          {p.name}
        </p>
      ))}
    </div>
  );
}

const people = [
  { name: "SALESPERSON A", c: "#d93a35" },
  { name: "SALESPERSON B", c: "#2fa35a" },
  { name: "SALESPERSON C", c: "#7a3fc2" },
];

const months = ["2026-01-05", "2026-01-21", "Feb", "2026-02-17", "2026-03-05", "2026-03-21", "Apr", "2026-04-16", "2026-05-02", "2026-05-18", "2026-06-03", "2026-06-19", "Jul", "2026-07-17", "2026-08-02", "2026-08-18", "2026-09-03", "2026-09-19", "Oct", "2026-10-12", "2026-10-27", "2026-11-13"];

export function ExecutiveScreen() {
  return (
    <Frame name="Executive Overview" height={762} pager>
      <div className="grid grid-cols-4 gap-3.5">
        <Kpi label="Total Sales" value="124,500.00" badge="SALES" />
        <Kpi label="Total Collections" value="118,200.00" badge="COLL" />
        <Kpi label="Total Credits" value="62,300.00" badge="CR" />
        <Kpi label="New Customers" value="3" badge="NEW" />
      </div>
      <div className={`${card} mt-3.5`}>
        <p className={head}>Revenue Trend</p>
        <div className="flex justify-end px-4 pt-3">
          <Select label="Monthly" />
        </div>
        <Line points={series(120, 11, 100, 40)} h={188} labels={months} yLabels={["80K", "40K", "0", "-20K"]} />
      </div>
      <div className="mt-3.5 grid grid-cols-2 gap-3.5">
        <div className={card}>
          <p className={head}>Order Report</p>
          <Line points={series(40, 5, 60, 50)} h={86} labels={["Oct", "Nov"]} yLabels={["60", "0"]} />
        </div>
        <div className={card}>
          <p className={head}>Delivery Report</p>
          <Line points={series(40, 17, 50, 40)} h={86} labels={["Oct", "Nov"]} yLabels={["50", "0"]} />
        </div>
      </div>
    </Frame>
  );
}

export function LiveOpsScreen() {
  const feed = [
    ["10241", "100/R/001/26/SOD/0007", "SALESPERSON A", "11:25 AM"],
    ["10240", "100/R/001/26/SOD/0007", "SALESPERSON A", "11:25 AM"],
    ["10239", "100/R/001/26/SOD/0007", "SALESPERSON A", "11:23 AM"],
    ["10238", "100/R/001/26/SOD/0007", "SALESPERSON A", "11:21 AM"],
    ["10237", "100/R/002/26/SOD/0004", "SALESPERSON B", "11:10 AM"],
  ];
  const rows = [
    ["30101", "100/R/001/26/SOD/00...", "13-11-2026 05:30", "ROUTE 01", "100/R/001", "SALESPERSON A", "W01", "Customer 101"],
    ["30100", "100/R/001/26/SOD/00...", "13-11-2026 05:30", "ROUTE 01", "100/R/001", "SALESPERSON A", "W01", "Customer 102"],
    ["30099", "100/R/002/26/SOD/00...", "13-11-2026 05:30", "ROUTE 02", "100/R/002", "SALESPERSON B", "W02", "Customer 201"],
  ];
  return (
    <Frame name="Live Operations" height={856}>
      <div className="grid grid-cols-4 gap-3.5">
        <Live label="Live Sales" value="3" note="3 breakdown rows" />
        <Live label="Live Collections" value="3" note="3 breakdown rows" />
        <Live label="Live Orders" value="2" note="Current snapshot" />
        <Live label="Live Deliveries" value="1" note="Current snapshot" />
      </div>
      <div className="mt-3.5 grid grid-cols-[0.95fr_1.05fr] gap-3.5">
        <div className={card}>
          <p className={head}>
            Route Status Board <Toggles />
          </p>
          <StatusBoard name="Status Records" count={3} label="Active" tone="#1fa04a" bg="#effaf2" border="#bfe6cb" insight="3 Records are Active." />
        </div>
        <div className={card}>
          <p className={head}>
            Activity Feed <span className="rounded bg-[#1fa04a] px-2 py-0.5 text-[10px] font-bold text-white">LIVE</span>
          </p>
          <ul className="space-y-2.5 px-4 py-3.5">
            {feed.map(([id, code, who, t], i) => (
              <li key={id} className="flex gap-3 text-[11.5px]">
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#1fa04a]" />
                <span>
                  id: {id} · sod_code: {code} · date: 2026-11-13T00:00:00Z
                  <span className="block text-[10px] uppercase text-[#9aa6b0]">
                    {who} · Nov 13, {t}
                    {i === 99 ? "" : ""}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`${card} mt-3.5`}>
        <p className={head}>
          Live Routes <Toggles map />
        </p>
        <table className="w-full text-left text-[12.5px]">
          <thead>
            <tr>
              {["Id", "Sod Code", "Date", "Route", "Route Code", "Salesman", "Salesman Code", "Customer"].map((h) => (
                <th key={h} className="bg-[#f7f9fb] px-4 py-2.5 text-[13px] font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="border-t border-[#eef1f4]">
                {r.map((c) => (
                  <td key={c} className="whitespace-nowrap px-4 py-2.5">
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
    <Frame name="Attendance & Movement" height={826}>
      <div className="grid grid-cols-2 gap-3.5">
        <div className={card}>
          <p className={head}>
            Work Status Grid <Toggles />
          </p>
          <StatusBoard name="Status Records" count={6} label="Working" tone="#3b82f6" bg="#f3f8fe" border="#cfe0f7" insight="6 Records are Working." />
        </div>
        <div className={card}>
          <p className={head}>
            Salesman Log Map <Toggles map />
          </p>
          <div className="relative px-4 pb-4 pt-3">
            <div className="relative overflow-hidden rounded">
              <AbstractMap h={316} pins={[{ x: 120, y: 90, c: "#d93a35" }, { x: 190, y: 70, c: "#2fa35a" }, { x: 270, y: 100, c: "#7a3fc2" }]} />
              <Legend people={people} />
              <span className="absolute right-2.5 top-2.5 flex size-9 items-center justify-center rounded bg-white shadow">
                <Maximize2 size={15} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={`${card} mt-3.5`}>
        <p className={head}>
          Live Routes Map <Toggles map />
        </p>
        <div className="px-4 pb-4 pt-3">
          <div className="relative overflow-hidden rounded">
            <AbstractMap big h={240} route="M40 60 C100 40 130 100 190 90 S300 40 360 80" pins={[{ x: 40, y: 62, c: "#2fa35a" }, { x: 360, y: 82, c: "#2fa35a" }]} />
            <Legend people={people} />
            <span className="absolute right-2.5 top-2.5 flex size-9 items-center justify-center rounded bg-white shadow">
              <Maximize2 size={15} />
            </span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function OrderDeliveryScreen() {
  return (
    <Frame name="Order & Delivery Control" height={882}>
      <div className="grid grid-cols-[1.02fr_1fr] gap-3.5">
        <div className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3.5">
            <Live label="Pending Orders" value="5" note="Current snapshot" />
            <Live label="Delivery Runs Summary" value="2" note="Current snapshot" />
          </div>
          <div className={card}>
            <p className={head}>
              Order Funnel <Toggles />
            </p>
            <StatusBoard name="Status Records" count={5} label="Open" tone="#3b82f6" bg="#f3f8fe" border="#cfe0f7" insight="5 Records are Open." />
          </div>
          <div className={card}>
            <p className={head}>
              Order Report <span className="rounded bg-[#f59e0b] px-2 py-0.5 text-[10px] font-bold text-white">LIVE</span>
            </p>
            <div className="flex justify-end px-4 pt-2.5">
              <Select label="Monthly" />
            </div>
            <Line points={series(16, 23, 36, 18)} h={108} labels={["2026-10-20", "2026-10-26", "2026-10-31", "2026-11-06", "2026-11-13"]} yLabels={["36", "20", "0"]} />
          </div>
        </div>
        <div className="space-y-3.5">
          <div className={card}>
            <p className={head}>
              Delivery Runs <Toggles />
            </p>
            <ul className="space-y-2 px-4 py-3.5 text-[12.5px]">
              {["Run 01 · Route 01 · Driver A", "Run 02 · Route 02 · Driver B"].map((r) => (
                <li key={r} className="rounded-md bg-[#f7f9fb] px-3 py-2.5">
                  {r}
                </li>
              ))}
            </ul>
            <div className="h-[142px]" />
          </div>
          <div className={card}>
            <p className={head}>
              Delivery Report <span className="rounded bg-[#f59e0b] px-2 py-0.5 text-[10px] font-bold text-white">LIVE</span>
            </p>
            <div className="flex h-[228px] items-end gap-3 px-5 pb-4 pt-5">
              {[34, 55, 42, 70, 50, 62, 38, 66].map((v, i) => (
                <span key={i} className="flex-1 rounded-t bg-[#9cc3d3]" style={{ height: `${v}%` }} />
              ))}
            </div>
          </div>
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
    <div className="relative overflow-hidden bg-white px-7 pb-6 pt-6 text-[#27343f]" style={{ width: W, height: 492 }}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] tracking-[0.18em] text-teal-deep">VANFORCES</p>
          <p className="mt-1 text-[42px] font-semibold leading-none tracking-tight">Control Room Launcher</p>
          <p className="mt-4 max-w-[560px] text-[13px] leading-relaxed text-[#7b8995]">Open fixed kiosk screens for executive, operations, salesmen, dispatch, finance, reports, system health, and map monitoring. Saved preferences are kept in the browser.</p>
          <span className="mt-2.5 inline-block rounded border border-[#a9c8f0] bg-[#eef5ff] px-2 py-0.5 text-[11.5px] text-[#2a62b5]">All branches</span>
        </div>
        <div className="flex gap-2.5 text-[13.5px] font-medium">
          <span className="flex items-center gap-2 rounded border border-teal px-4 py-2 text-teal-deep">
            <Plus size={14} />
            Create Custom Screen
          </span>
          <span className="flex items-center gap-2 rounded bg-teal px-4 py-2 text-white">
            <Monitor size={14} />
            Open Carousel
          </span>
        </div>
      </div>
      <div className="mt-7 grid grid-cols-4 gap-4">
        {screens.map((s) => (
          <div key={s.id} className="rounded-2xl border border-[#e3e8ee] bg-white">
            <div className="flex items-center justify-between border-b border-[#eef1f4] px-4 py-3.5 text-[15px] font-semibold">
              <span className="flex items-center gap-2">
                <GripVertical size={14} className="text-[#b6c0c8]" />
                {s.name}
              </span>
              <span className="flex h-6 w-12 items-center justify-start rounded-full bg-teal pl-2 text-[10.5px] font-semibold text-white">
                On<span className="ml-1.5 size-5 rounded-full bg-white" />
              </span>
            </div>
            <div className="space-y-2.5 px-4 py-4 text-[13.5px]">
              <span className="inline-block rounded px-2 py-0.5 text-[12px] text-white" style={{ background: s.tone }}>
                {s.id}
              </span>
              <p>Refresh: {s.refresh}</p>
              <p>Widgets: {s.w} enabled</p>
              <p className="rounded border border-[#dde3e9] py-1.5 text-center">Open Screen</p>
              <p className="flex items-center justify-center gap-2 rounded border border-[#dde3e9] py-1.5">
                <Settings size={13} />
                Configure Widgets
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const screens = {
  executive: { Screen: ExecutiveScreen, h: 762, label: "Executive Overview sample screen with total sales, collections, credits, new customers, a revenue trend and order and delivery reports, shown with illustrative data." },
  liveOps: { Screen: LiveOpsScreen, h: 856, label: "Live Operations sample screen with live sales, collections, orders, deliveries, a route status board, an activity feed and a routes table, shown with illustrative data." },
  attendance: { Screen: AttendanceScreen, h: 826, label: "Attendance and Movement sample screen with a work status grid and two maps, shown with illustrative data." },
  orderDelivery: { Screen: OrderDeliveryScreen, h: 882, label: "Order and Delivery Control sample screen with pending orders, delivery runs, an order funnel and reports, shown with illustrative data." },
  launcher: { Screen: LauncherScreen, h: 492, label: "Control Room Launcher sample screen listing four monitoring screens, shown with example settings." },
} as const;

export type ScreenKey = keyof typeof screens;

/** A scaled, sharp copy of one screen at any width. `crop` shows only the top part, so the details read larger. */
export function ControlRoomScreen({ kind, className = "", crop }: { kind: ScreenKey; className?: string; crop?: number }) {
  const { Screen, h, label } = screens[kind];
  return (
    <ScaledScreen width={W} height={crop ?? h} label={label} className={`rounded-xl border border-line bg-white shadow-[0_24px_48px_-28px_rgb(8_60_66/0.45)] ${className}`}>
      <Screen />
    </ScaledScreen>
  );
}

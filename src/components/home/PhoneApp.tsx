import Image from "next/image";
import { Bell, CircleHelp, CirclePlay, CreditCard, FileText, Fingerprint, Handshake, House, LogIn, Map as MapIcon, Menu, MapPin, MessageSquare, QrCode, Receipt, RefreshCw, ShoppingCart, TrendingUp, User, Waypoints, Wifi, Wallet, type LucideIcon } from "lucide-react";
import { ScaledScreen } from "./ScaledScreen";

/**
 * The Vanforces field app's Dashboard (Supervisor home), redrawn as page elements to match the real app screen, inside a drawn
 * iPhone-style frame (Dynamic Island, titanium edge, home bar). It is made of text and shapes, so it stays sharp at any size.
 * The profile details and amounts are invented for illustration. The frame is drawn here and uses no Apple artwork.
 */

const PHONE_W = 392;
const PHONE_H = 812;

const blue = "#0b3b8f";

const tiles: { label: string; value: string; color: string; bg: string; Icon: LucideIcon }[] = [
  { label: "Total Sales", value: "SR 0.00", color: "#0a84d6", bg: "#0a84d6", Icon: TrendingUp },
  { label: "Cash Collected", value: "SR 0.00", color: "#3a1566", bg: "#3a1566", Icon: Wallet },
  { label: "Credit Collected", value: "SR 0.00", color: "#3a1566", bg: "#3a1566", Icon: Wallet },
  { label: "Collection Return", value: "SR 0.00", color: "#f0524d", bg: "#f0524d", Icon: FileText },
  { label: "Credit Given", value: "SR 0.00", color: "#f0154f", bg: "#f0154f", Icon: CreditCard },
  { label: "Settlement", value: "SR 0.00", color: "#34a853", bg: "#3fb04e", Icon: Handshake },
  { label: "Order", value: "SR 0.00", color: "#d86a06", bg: "#c96a0a", Icon: ShoppingCart },
  { label: "Cash In Hand", value: "SR 4,250.00", color: "#0b3b8f", bg: "#0b3b8f", Icon: Wallet },
  { label: "Visited", value: "4/0", color: "#f59a0b", bg: "#f59a0b", Icon: MapPin },
];

function AppScreen() {
  return (
    <div className="relative overflow-hidden bg-[#f1f2f6] text-[#1d2330]" style={{ width: 360, height: 780 }}>
      {/* status bar (iOS style) */}
      <div className="flex h-[50px] items-center justify-between bg-white px-7 pt-2 text-[14px] font-semibold text-black">
        <span>9:41</span>
        <span className="flex items-center gap-1.5">
          <svg width="17" height="11" viewBox="0 0 17 11" aria-hidden="true"><rect x="0" y="7" width="3" height="4" rx="1" fill="#000" /><rect x="4.7" y="5" width="3" height="6" rx="1" fill="#000" /><rect x="9.4" y="2.5" width="3" height="8.5" rx="1" fill="#000" /><rect x="14" y="0" width="3" height="11" rx="1" fill="#000" /></svg>
          <Wifi size={15} strokeWidth={2.4} />
          <svg width="26" height="12" viewBox="0 0 26 12" aria-hidden="true"><rect x="0.5" y="0.5" width="22" height="11" rx="3.2" fill="none" stroke="#000" opacity="0.4" /><rect x="2" y="2" width="19" height="8" rx="2" fill="#000" /><rect x="23.6" y="4" width="1.8" height="4" rx="0.9" fill="#000" opacity="0.5" /></svg>
        </span>
      </div>

      {/* header */}
      <div className="flex h-[48px] items-center justify-between bg-white px-4">
        <span className="flex items-center gap-4">
          <Menu size={21} color={blue} strokeWidth={2.4} />
          <span className="text-[20px] font-medium" style={{ color: blue }}>Dashboard</span>
        </span>
        <span className="flex items-center gap-3.5">
          <span className="rounded-full border border-[#f2c36b] bg-[#fff1d6] px-2.5 py-[3px] text-[10px] font-semibold text-[#d9780b]">LOCAL</span>
          <Wifi size={20} color={blue} strokeWidth={2.6} />
          <span className="relative">
            <Bell size={19} color={blue} strokeWidth={2.2} />
            <span className="absolute -right-2 -top-2 rounded-full bg-[#0b3b8f] px-1 text-[8px] font-bold leading-[13px] text-white">46</span>
          </span>
          <CircleHelp size={21} color={blue} strokeWidth={2.4} />
        </span>
      </div>

      <div className="space-y-2.5 px-2 pt-2.5">
        {/* profile card */}
        <div className="overflow-hidden rounded-[10px] bg-white">
          <div className="relative flex gap-3 px-2.5 pb-2.5 pt-3">
            <div className="relative h-[78px] w-[78px] shrink-0">
              <span className="absolute inset-0 rounded-full border-[3px] border-[#0b3b8f] bg-[#34414d]" />
              <span className="absolute left-1/2 top-[15px] h-[26px] w-[26px] -translate-x-1/2 rounded-full bg-[#f4c542]" />
              <span className="absolute left-1/2 top-[9px] h-[9px] w-[28px] -translate-x-1/2 rounded-t-full bg-[#2e86d1]" />
              <span className="absolute bottom-[4px] left-1/2 h-[24px] w-[46px] -translate-x-1/2 rounded-t-[20px] bg-[#ef6a52]" />
              <span className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-[#0b3b8f] px-2 py-[2px] text-[8.5px] font-semibold text-white ring-2 ring-white">
                <User size={8} />
                Supervisor
              </span>
            </div>
            <div className="min-w-0 flex-1 space-y-1.5 pt-0.5 text-[10px]">
              {[
                { Icon: User, bg: "#e4f1fc", fg: "#0a84d6", k: "Name", v: "Alex Morgan", c: "#0a84d6" },
                { Icon: QrCode, bg: "#efe7f8", fg: "#3a1566", k: "Code", v: "102/S/000123", c: "#3a1566" },
                { Icon: Waypoints, bg: "#e3f3e8", fg: "#1f7a3f", k: "Route", v: "004 - Vehicle Store 4", c: "#1f7a3f" },
              ].map((r) => (
                <div key={r.k} className="flex items-center gap-2">
                  <span className="flex size-[22px] shrink-0 items-center justify-center rounded-md" style={{ background: r.bg, color: r.fg }}>
                    <r.Icon size={12} />
                  </span>
                  <span className="min-w-0">
                    <span className="block leading-none text-[#8b93a0]">{r.k}</span>
                    <span className="block truncate text-[12px] font-semibold leading-tight" style={{ color: r.c }}>{r.v}</span>
                  </span>
                </div>
              ))}
            </div>
            <span className="absolute right-2.5 top-2.5 flex size-8 items-center justify-center rounded-full bg-white text-[#0a84d6] shadow-[0_2px_8px_rgb(0_0_0/0.12)]">
              <RefreshCw size={15} strokeWidth={2.4} />
            </span>
          </div>
          <div className="flex items-center justify-between bg-[#f6f8fa] px-2.5 py-2">
            <span className="flex items-center gap-2">
              <span className="flex size-[26px] items-center justify-center rounded-md bg-[#e1efe9] text-[#2f7d62]">
                <Fingerprint size={15} />
              </span>
              <span>
                <span className="block text-[10px] leading-none text-[#8b93a0]">Attendance</span>
                <span className="mt-0.5 block text-[11px] font-semibold">Schedule: 03:30 PM - 10:30 PM</span>
              </span>
            </span>
            <span className="flex items-center gap-1.5 rounded-lg bg-[#0b7d4d] px-3 py-2 text-[11px] font-semibold text-white">
              <LogIn size={13} />
              Punch In
            </span>
          </div>
        </div>

        {/* start of day */}
        <div className="flex items-center justify-center gap-2 rounded-[8px] bg-[#043d8c] py-3 text-[13px] font-semibold tracking-wide text-white shadow-[0_6px_10px_-4px_rgb(4_61_140/0.55)]">
          <CirclePlay size={16} />
          START OF DAY
        </div>

        {/* tiles */}
        <div className="grid grid-cols-3 gap-2">
          {tiles.map((t) => (
            <div key={t.label} className="flex h-[118px] flex-col items-center justify-center rounded-[10px] bg-white text-center">
              <span className="flex size-[35px] items-center justify-center rounded-lg text-white" style={{ background: t.bg }}>
                <t.Icon size={19} />
              </span>
              <span className="mt-3 text-[10.5px] text-[#4b5563]">{t.label}</span>
              <span className="mt-1.5 text-[12px] font-semibold" style={{ color: t.color }}>{t.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Entaura assistant bubble */}
      <span className="absolute bottom-[104px] left-3 z-10 flex size-[44px] items-center justify-center rounded-full bg-white shadow-[0_6px_16px_-4px_rgb(0_0_0/0.3)]">
        <Image src="/brand/entaura-icon.png" alt="" width={260} height={149} className="h-[15px] w-auto" />
        <span className="absolute bottom-1 right-1 size-2 rounded-full bg-[#34a853] ring-2 ring-white" />
      </span>

      {/* bottom menu and home bar */}
      <div className="absolute inset-x-0 bottom-0 bg-white pb-[22px] pt-2 shadow-[0_-4px_14px_rgb(0_0_0/0.06)]">
        <div className="grid grid-cols-4 text-center text-[10px] text-[#8b93a0]">
          {[
            { l: "Dashboard", Icon: House, on: true },
            { l: "Transactions", Icon: Receipt },
            { l: "Chat", Icon: MessageSquare },
            { l: "Route", Icon: MapIcon },
          ].map((m) => (
            <span key={m.l} className="flex flex-col items-center gap-1">
              <span className={`flex h-[30px] w-[42px] items-center justify-center rounded-full ${m.on ? "bg-[#dfe6f2] text-[#0b3b8f]" : ""}`}>
                <m.Icon size={18} />
              </span>
              <span className={m.on ? "font-semibold text-[#0b3b8f]" : ""}>{m.l}</span>
            </span>
          ))}
        </div>
        <span className="mx-auto mt-2 block h-[4px] w-[112px] rounded-full bg-black" />
      </div>
    </div>
  );
}

/** The iPhone-style device: a titanium-look body, a black bezel, the Dynamic Island and the app screen. */
function Device() {
  return (
    <div className="relative" style={{ width: PHONE_W, height: PHONE_H }}>
      {/* side buttons */}
      <span aria-hidden="true" className="absolute -left-[3px] top-[118px] h-[30px] w-[4px] rounded-l bg-[#3a3d42]" />
      <span aria-hidden="true" className="absolute -left-[3px] top-[170px] h-[56px] w-[4px] rounded-l bg-[#3a3d42]" />
      <span aria-hidden="true" className="absolute -left-[3px] top-[236px] h-[56px] w-[4px] rounded-l bg-[#3a3d42]" />
      <span aria-hidden="true" className="absolute -right-[3px] top-[190px] h-[84px] w-[4px] rounded-r bg-[#3a3d42]" />
      <div className="absolute inset-0 rounded-[58px] bg-[linear-gradient(145deg,#6b6f76,#2a2c30_30%,#1b1c1f_70%,#55595f)] p-[3px] shadow-[0_40px_80px_-30px_rgb(8_20_30/0.7),0_0_0_1px_rgb(255_255_255/0.08)_inset]">
        <div className="h-full w-full rounded-[55px] bg-black p-[14px]">
          <div className="relative h-full w-full overflow-hidden rounded-[42px] bg-white">
            <AppScreen />
            <span aria-hidden="true" className="absolute left-1/2 top-[11px] z-20 h-[30px] w-[104px] -translate-x-1/2 rounded-full bg-black" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** The phone at any width. */
export function PhoneApp({ className = "" }: { className?: string }) {
  return (
    <ScaledScreen width={PHONE_W} height={PHONE_H} label="The Vanforces field app Dashboard on a phone, showing the supervisor profile, attendance with Punch In, Start of Day, and tiles for sales, collections, credit, settlement, orders, cash in hand and visits, with illustrative details." className={className}>
      <Device />
    </ScaledScreen>
  );
}

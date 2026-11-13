import type { Metadata } from "next";
import { Check } from "lucide-react";
import { CTASection, PageHero } from "@/components/global/Common";
import { ControlRoomScreen, SAMPLE_NOTE, type ScreenKey } from "@/components/home/ControlRoomScreens";

export const metadata: Metadata = {
  title: "Control Room Monitoring",
  description: "Focused monitoring screens for executives and operations teams: sales, collections, field activity, attendance, orders and deliveries.",
};

const highlights = [
  ["Executive visibility", "Total sales, collections, credits, new customers and revenue trends in one management view."],
  ["Live operations monitoring", "Follow sales, collections, orders and deliveries on regularly refreshed screens."],
  ["Route status and recent activity", "Review route-status records and a chronological activity feed with references and timestamps."],
  ["Attendance and work status", "See available work-status records and how they break down."],
  ["Field movement maps", "View salesman location logs and plotted route information on maps."],
  ["Custom team screens", "Create a named monitor, choose a starting widget and organise information into slides."],
];

const details: { key: Exclude<ScreenKey, "launcher">; title: string; heading: string; body: string; points: string[] }[] = [
  {
    key: "executive",
    title: "Executive Overview",
    heading: "See the business picture at a glance",
    body: "Give decision-makers a focused view of sales, collections, credits, customer additions and revenue movement, on a screen designed for shared review.",
    points: ["Four headline cards: Total Sales, Total Collections, Total Credits and New Customers", "A dated revenue trend with a period selector", "Order and delivery reporting panels", "Slide presentation with previous, next and pause controls"],
  },
  {
    key: "liveOps",
    title: "Live Operations",
    heading: "Keep daily field activity in view",
    body: "Bring live sales, collections, orders and deliveries together with route status, recent activity and route details.",
    points: ["Live summary cards that refresh at a set interval", "Route Status Board with a status distribution and a short insight", "Activity Feed with record references and time labels", "Live Routes table with route, salesman and customer columns"],
  },
  {
    key: "attendance",
    title: "Attendance & Movement",
    heading: "Connect work-status visibility with field movement",
    body: "Review work-status records beside salesman location logs and route maps, so supervisors see people and movement together.",
    points: ["Work Status Grid with status categories and shares", "Salesman Log Map with person selection", "Live Routes Map with plotted routes and markers", "Chart, table and map view controls"],
  },
  {
    key: "orderDelivery",
    title: "Order & Delivery Control",
    heading: "Bring order and delivery information into focus",
    body: "Keep pending-order snapshots, order-status distribution, delivery-run information and reporting panels together for order and dispatch teams.",
    points: ["Pending Orders and Delivery Runs Summary snapshots", "Order Funnel showing the distribution of order statuses", "Delivery Runs detail panel", "Order Report and Delivery Report trend panels"],
  },
];

export default function ControlRoomPage() {
  return (
    <>
      <PageHero
        eyebrow="Control Room"
        title="Your Business Operations, Together on One Command Screen."
        description="Bring sales, collections, field activity, attendance, orders and deliveries into focused monitoring screens. Open a screen, rotate through views, or create a custom monitor with the widgets your team needs."
        crumbs={[{ label: "Control Room" }]}
        layout="plain"
        ctas={[{ label: "Book a Control Room Demo", href: "/book-demo", arrow: true }]}
      />

      <section className="section-tight">
        <div className="wrap max-w-[1120px]">
          <ControlRoomScreen kind="executive" />
          <p className="mt-3 text-center text-[12.5px] text-navy/65">{SAMPLE_NOTE}</p>

          <h2 className="mt-16 text-[clamp(1.5rem,1.25rem+1vw,2rem)] font-medium tracking-[-0.03em] text-navy-deep">What the Control Room gives your team</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map(([t, d]) => (
              <li key={t} className="rounded-2xl border border-line bg-white p-5">
                <p className="text-[15.5px] font-semibold text-navy-deep">{t}</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{d}</p>
              </li>
            ))}
          </ul>

          <h2 className="mt-16 text-[clamp(1.5rem,1.25rem+1vw,2rem)] font-medium tracking-[-0.03em] text-navy-deep">One launch point for your monitoring screens</h2>
          <p className="mt-3 max-w-[44rem] text-[15.5px] leading-relaxed text-muted">
            Start with a dedicated view for executives, live operations, attendance and movement, or order and delivery control. See each screen&apos;s refresh interval and enabled-widget count before opening it, or create a custom screen for your team.
          </p>
          <div className="mt-6">
            <ControlRoomScreen kind="launcher" />
          </div>

          <div className="mt-16 space-y-16">
            {details.map((d, i) => (
              <article key={d.key} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
                <div className={i % 2 ? "lg:order-2" : ""}>
                  <ControlRoomScreen kind={d.key} />
                </div>
                <div>
                  <p className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-teal-deep">{d.title}</p>
                  <h3 className="mt-2 text-[clamp(1.375rem,1.15rem+0.8vw,1.75rem)] font-medium leading-tight tracking-[-0.03em] text-navy-deep">{d.heading}</h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{d.body}</p>
                  <ul className="mt-5 space-y-2.5">
                    {d.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-[14.5px] leading-snug text-navy-deep">
                        <span aria-hidden="true" className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-teal text-navy-deep">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 rounded-[28px] bg-cyan-soft p-6 sm:p-9">
            <h2 className="text-[clamp(1.375rem,1.15rem+0.8vw,1.75rem)] font-medium tracking-[-0.03em] text-navy-deep">Build the screen your team needs</h2>
            <p className="mt-3 max-w-[44rem] text-[15.5px] leading-relaxed text-navy-deep">
              Create a focused wall screen for a team, region or operational priority. Name the screen, choose a supported refresh interval, start with a widget or an empty view, and organise information into slides.
            </p>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {["A management monitor for headline indicators and trends", "An operations monitor for activity, route status and route details", "A field-supervision monitor for work status and maps", "An order-and-delivery monitor for pending work and reporting"].map((u) => (
                <li key={u} className="flex items-start gap-2.5 text-[14.5px] text-navy-deep">
                  <span aria-hidden="true" className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-teal text-navy-deep">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {u}
                </li>
              ))}
            </ul>
          </div>

          <h2 className="mt-16 text-[clamp(1.375rem,1.15rem+0.8vw,1.75rem)] font-medium tracking-[-0.03em] text-navy-deep">Designed for shared monitoring</h2>
          <p className="mt-3 max-w-[44rem] text-[15.5px] leading-relaxed text-muted">
            Open a dedicated screen or use carousel presentation to keep business information visible on shared displays. Branch scope, last-update time and the current clock stay on screen, and chart, table or map views are available where a widget supports them.
          </p>
          <p className="mt-8 text-[13px] leading-relaxed text-muted">
            {SAMPLE_NOTE} Screens refresh at set intervals and are not instant. Which screens and widgets you have depends on your account and configuration. Saved preferences are kept in the browser you use.
          </p>
        </div>
      </section>

      <CTASection
        title="See Vanforces Control Room with your operational workflow."
        description="Tell us how your team works today, and we'll show the screens that apply."
        primary={{ label: "Book a Control Room Demo", href: "/book-demo" }}
        secondary={{ label: "Explore Integrations", href: "/integrations" }}
      />
    </>
  );
}

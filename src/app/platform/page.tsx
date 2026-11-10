import type { Metadata } from "next";
import { FieldPhotos } from "@/components/home/FieldPhotos";
import { CTASection, PageHero, SectionHeading } from "@/components/global/Common";
import { Mascot } from "@/components/global/Mascot";
import { ScrollReveal, ScreenshotReveal } from "@/components/motion/Reveal";
import { TrustedStrip } from "@/components/customers/CustomerProof";
import { ModuleCard } from "@/components/product/Cards";
import { IntegrationDiagram } from "@/components/product/Diagrams";
import { MobileScreenshotFrame, WebScreenshotFrame } from "@/components/product/Frames";
import { DevicePair } from "@/components/product/Visuals";
import { phone, web } from "@/data/media";

export const metadata: Metadata = {
  title: "Platform Overview",
  description: "Vanforces helps connect what happens at the warehouse, on the route, at the customer and back in the office.",
};

const moments = [
  {
    eyebrow: "Morning",
    title: "Before the First Visit",
    body: "Route planning, stock preparation and customer readiness form the beginning of the distribution day.",
    points: ["Journeys assigned to field users", "Vehicles loaded with recorded stock", "Customer and product records ready"],
    mascot: "supplyChain" as const,
    visual: <MobileScreenshotFrame shot={phone.transactions} className="mx-auto max-w-[270px]" />,
  },
  {
    eyebrow: "On the road",
    title: "During the Working Day",
    body: "Salespeople visit customers, record orders, create invoices, deliver products and manage collections.",
    points: ["Next stop in view", "Transactions recorded at the customer", "Eligible work continues offline"],
    mascot: "location" as const,
    visual: <MobileScreenshotFrame shot={phone.route} className="mx-auto max-w-[270px]" />,
  },
  {
    eyebrow: "Back in the office",
    title: "After the Last Collection",
    body: "Daily records, stock movements, settlement information and business reporting provide context for the next working day.",
    points: ["Records synchronized from the field", "Stock and settlement reviewed", "Reports inform tomorrow's plan"],
    mascot: "business" as const,
    visual: <WebScreenshotFrame shot={web.adminHome} sizes="(max-width: 1024px) 92vw, 640px" />,
  },
];

const moduleCards = [
  { title: "Field Sales", href: "/platform/field-sales", body: "Routes, customer context and transactions in one mobile tool." },
  { title: "Van Sales", href: "/platform/van-sales", body: "Load, sell, collect, unload and reconcile." },
  { title: "Routes", href: "/platform/routes", body: "Plan the journey and review what happened." },
  { title: "Customers", href: "/platform/customers", body: "Customer details connected to sales and balances." },
  { title: "Inventory", href: "/platform/inventory", body: "Follow stock from warehouse to van." },
  { title: "Delivery", href: "/platform/delivery", body: "From assigned order to customer handover." },
  { title: "Collections", href: "/platform/collections", body: "Know what's due and what's collected." },
  { title: "Business Intelligence", href: "/platform/intelligence", body: "Reports, trends and better questions." },
];

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="The Vanforces Platform"
        title="One Operation. Many Moving Parts. Better Connected."
        description="A distribution business needs more than a sales application. Vanforces helps connect what happens at the warehouse, on the route, at the customer and back in the office."
        crumbs={[{ label: "Platform" }]}
        layout="stacked"
        ctas={[
          { label: "Explore Modules", href: "/platform/modules", arrow: true },
          { label: "Book a Demo", href: "/book-demo", variant: "secondary" },
        ]}
        visual={<DevicePair web="cxoFinance" phone="dashboard" priority />}
      />

      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="The shape of a distribution day" title="Three parts of the day. One connected record." />
          <div className="mt-14 space-y-16 md:space-y-24">
            {moments.map((moment, index) => {
              return (
                <div key={moment.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                  <ScrollReveal className={index % 2 === 1 ? "lg:order-2" : ""}>
                    {index === 0 ? <Mascot name={moment.mascot} sizes="210px" className="mb-5 w-40 md:w-52" /> : null}
                    <p className="eyebrow">{moment.eyebrow}</p>
                    <h3 className="t-section mt-3 !text-[clamp(1.625rem,1.4rem+1vw,2.5rem)]">{moment.title}</h3>
                    <p className="lede mt-4">{moment.body}</p>
                    <ul className="mt-6 space-y-2.5">
                      {moment.points.map((point) => (
                        <li key={point} className="flex gap-3 text-[15.5px] font-medium">
                          <span aria-hidden="true" className="mt-2.5 h-0.5 w-3 shrink-0 bg-teal" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </ScrollReveal>
                  <ScreenshotReveal className={index % 2 === 1 ? "lg:order-1" : ""}>{moment.visual}</ScreenshotReveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-band-cyan">
        <div className="wrap">
          <SectionHeading eyebrow="Modules" title="Different Jobs. One Operation." description="Each module supports a specific part of the work and shares its records with the rest of the platform." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {moduleCards.map((card, index) => (
              <ScrollReveal key={card.href} delay={(index % 4) * 70} className="h-full">
                <ModuleCard title={card.title} body={card.body} href={card.href} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="Beyond the platform" title="Connected to the systems you already run." description="Vanforces can work alongside applicable ERP and accounting systems, with exact capabilities depending on the connector and implementation scope." className="mb-10" />
          <IntegrationDiagram />
        </div>
      </section>

      <FieldPhotos />
      <TrustedStrip />

      <CTASection
        title="Different Jobs. One Operation."
        description="Explore each module in detail, or talk to us about how your team works today."
        primary={{ label: "Explore Modules", href: "/platform/modules" }}
        secondary={{ label: "Book a Demo", href: "/book-demo" }}
      />
    </>
  );
}

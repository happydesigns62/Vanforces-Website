import type { Metadata } from "next";
import { Compass, MonitorSmartphone, Users } from "lucide-react";
import { PageHero } from "@/components/global/Common";
import { Mascot } from "@/components/global/Mascot";
import { ScrollReveal } from "@/components/motion/Reveal";
import { DemoForm } from "@/components/commercial/Forms";
import { DevicePair } from "@/components/product/Visuals";

export const metadata: Metadata = {
  title: "Book a Demo",
  description: "Tell us how your team manages routes, stock, customers, orders and collections. We'll focus the conversation on the relevant Vanforces workflows.",
};

const points = [
  { icon: Users, title: "Understand Your Operation", body: "Discuss the team, routes and daily workflow." },
  { icon: MonitorSmartphone, title: "See Relevant Screens", body: "Review web and mobile modules connected to your requirements." },
  { icon: Compass, title: "Explore Next Steps", body: "Consider subscription plans and integration requirements." },
];

export default function BookDemoPage() {
  return (
    <>
      <PageHero
        eyebrow="See Vanforces in action"
        title="Show Us Your Distribution Day."
        description={
          <>
            <p>Tell us how your team manages routes, stock, customers, orders and collections.</p>
            <p className="mt-2">We&apos;ll focus the demonstration conversation on the relevant Vanforces workflows.</p>
          </>
        }
        crumbs={[{ label: "Book a Demo" }]}
        layout="split"
        visual={<Mascot name="confirm" priority sizes="(max-width: 1024px) 70vw, 380px" className="mx-auto w-full max-w-[360px]" />}
      />
      <section className="pb-16 md:pb-24">
        <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <ul className="space-y-6">
              {points.map((point, index) => {
                const Icon = point.icon;
                return (
                  <li key={point.title} data-reveal="" suppressHydrationWarning style={{ "--d": `${index * 80}ms` } as React.CSSProperties} className="flex gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-cyan-soft text-teal-deep">
                      <Icon aria-hidden="true" size={21} />
                    </span>
                    <span>
                      <span className="t-card block">{point.title}</span>
                      <span className="body mt-1 block">{point.body}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
            <ScrollReveal delay={200} className="mt-10">
              <DevicePair web="adminHome" phone="dashboard" />
            </ScrollReveal>
          </div>
          <ScrollReveal delay={90} className="self-start rounded-[28px] border border-line p-6 md:p-9">
            <DemoForm />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

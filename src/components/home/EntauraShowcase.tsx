import Image from "next/image";
import { Check } from "lucide-react";
import type { CSSProperties } from "react";
import { Button } from "@/components/global/Button";
import { ScrollReveal } from "@/components/motion/Reveal";
import { ENTAURA_URL } from "@/data/navigation";

type Product = {
  name: string;
  logo: string;
  width: number;
  height: number;
  topic: string;
  lead: string;
  points: string[];
  exampleLabel: string;
  example: string;
};

// Capabilities as described by the Vanforces team and on entaura.ai. The examples are illustrations of the kind of question or
// alert, not screens from the product.
const products: Product[] = [
  {
    name: "Entaura Insight",
    logo: "/brand/entaura-insight.png",
    width: 720,
    height: 92,
    topic: "Smart & trusted analytics",
    lead: "Turn business information into comparisons, trends and plain explanations.",
    points: ["Business information analysis", "Performance comparisons", "Trends, charts and explanations"],
    exampleLabel: "A manager could ask",
    example: "How do this month's collections compare with last month?",
  },
  {
    name: "Entaura Watch",
    logo: "/brand/entaura-watch.png",
    width: 720,
    height: 93,
    topic: "Alerts from your answers",
    lead: "Keep an eye on what matters, without checking reports by hand.",
    points: ["Configured monitoring", "Scheduled summaries", "Alerts and important business updates"],
    exampleLabel: "A team could set up",
    example: "A morning summary of overdue invoices, sent on a schedule.",
  },
];

const reveal = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * Entaura, in the standard Vanforces section style: a split layout with the text on the left and, on the right, the Vanforces
 * and Entaura marks together on a soft stage. Below, Insight and Watch are the two product cards. The section is clear that
 * Entaura is a separate platform. No product screens are invented: the examples are text only.
 */
export function EntauraShowcase() {
  return (
    <section id="entaura" className="section scroll-mt-24">
      <div className="wrap">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <ScrollReveal>
            <p className="eyebrow">Meet Entaura</p>
            <h2 className="mt-5 text-balance text-[clamp(1.875rem,1.5rem+1.3vw,2.625rem)] font-medium leading-[1.1] tracking-[-0.04em] text-navy-deep">
              Intelligence for <span className="text-ink-soft">Better Business Decisions.</span>
            </h2>
            <p className="mt-4 max-w-[32rem] text-pretty text-[1rem] leading-[1.7] text-muted">
              Vanforces connects the operation. Entaura helps make sense of the information: ask questions, explore business knowledge, discover insights and monitor important changes.
            </p>
            <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row">
              <Button href={ENTAURA_URL} variant="entaura" arrow className="!min-h-[46px] !px-6 !text-[14.5px]">
                Explore Entaura.ai
              </Button>
              <Button href="/contact" variant="secondary" className="!min-h-[46px] !px-6 !text-[14.5px]">
                Ask about Entaura
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="relative overflow-hidden rounded-[28px] border border-cyan-line bg-[radial-gradient(60%_80%_at_8%_0%,rgb(28_178_187/0.16),transparent),radial-gradient(60%_80%_at_96%_100%,rgb(106_95_214/0.13),transparent),linear-gradient(180deg,#f3fbfc,#ffffff)] p-5 sm:p-7">
              <div className="grid items-stretch gap-0 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
                <div className="flex flex-col items-center justify-center rounded-[22px] bg-white px-5 py-7 text-center shadow-[0_22px_44px_-28px_rgb(8_60_66/0.5),0_1px_3px_rgb(41_59_71/0.06)]">
                  <Image src="/brand/vanforces-logo.svg" alt="Vanforces" width={170} height={46} className="h-8 w-auto" />
                  <p className="mt-4 text-[13.5px] font-medium leading-snug text-muted">Connects the operation</p>
                </div>

                {/* A thin dashed link with a light travelling along it. It runs across on wide screens and down on narrow ones. */}
                <div aria-hidden="true" className="relative mx-auto flex h-11 w-px items-center justify-center sm:h-auto sm:w-16">
                  <span className="absolute inset-y-0 left-1/2 border-l-2 border-dashed border-cyan-line sm:inset-x-0 sm:inset-y-auto sm:left-0 sm:top-1/2 sm:border-l-0 sm:border-t-2" />
                  <span className="link-dot absolute size-2.5 rounded-full bg-teal shadow-[0_0_0_4px_rgb(28_178_187/0.18)]" />
                </div>

                <div className="flex flex-col items-center justify-center rounded-[22px] bg-white px-5 py-7 text-center shadow-[0_22px_44px_-28px_rgb(8_60_66/0.5),0_1px_3px_rgb(41_59_71/0.06)]">
                  <Image src="/brand/entaura-logo.svg" alt="Entaura.ai" width={545} height={122} priority className="h-8 w-auto" />
                  <p className="mt-4 text-[13.5px] font-medium leading-snug text-muted">Makes sense of the information</p>
                </div>
              </div>
            </div>
          </ScrollReveal>        </div>
        <ul className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2">
          {products.map((product, index) => (
            <li key={product.name} data-reveal="" suppressHydrationWarning style={reveal(index * 90)} className="flex flex-col rounded-[28px] bg-mist p-6 sm:p-8">
              <Image src={product.logo} alt={product.name} width={product.width} height={product.height} sizes="150px" className="h-auto w-[132px]" />
              <h3 className="mt-5 text-[1.25rem] font-medium leading-tight tracking-[-0.03em] text-navy-deep">{product.topic}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{product.lead}</p>
              <ul className="mt-5 grid gap-2.5">
                {product.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-[14px] font-medium leading-snug text-navy-deep">
                    <span aria-hidden="true" className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-teal text-navy-deep">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl bg-white px-4 py-3.5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">{product.exampleLabel} (example)</p>
                <p className="mt-1.5 text-[15px] font-medium leading-snug text-navy-deep">&ldquo;{product.example}&rdquo;</p>
              </div>
            </li>
          ))}
        </ul>

        <ScrollReveal className="mt-4 rounded-[28px] bg-cyan-soft p-5 sm:p-7">
          <p className="text-[15.5px] leading-relaxed text-navy-deep">
            <span className="font-semibold">Agentic capabilities.</span> Authorized multi-step workflows across connected tools, data sources and business applications.
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-muted">Entaura is a separate platform and is not included in every Vanforces subscription. How it connects to your Vanforces data depends on configuration.</p>
        </ScrollReveal>
      </div>
    </section>
  );
}

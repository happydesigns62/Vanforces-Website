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
              <Button href={ENTAURA_URL} variant="ink" arrow className="!min-h-[46px] !px-6 !text-[14.5px]">
                Explore Entaura.ai
              </Button>
              <Button href="/contact" variant="secondary" className="!min-h-[46px] !px-6 !text-[14.5px]">
                Ask about Entaura
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="flex items-center justify-center rounded-[28px] bg-cyan-soft px-6 py-12 sm:py-14">
              <div className="flex items-center gap-5 rounded-[22px] bg-white px-7 py-5 shadow-[0_24px_50px_-28px_rgb(8_60_66/0.45),0_1px_3px_rgb(41_59_71/0.06)]">
                <Image src="/brand/vanforces-mark.svg" alt="Vanforces" width={60} height={56} className="h-9 w-auto" />
                <span aria-hidden="true" className="h-8 w-px bg-line" />
                <Image src="/brand/entaura-logo.svg" alt="Entaura.ai" width={545} height={122} priority className="h-8 w-auto" />
              </div>
            </div>
          </ScrollReveal>
        </div>
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

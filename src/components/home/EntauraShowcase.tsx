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
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
          <ScrollReveal>
            <p className="eyebrow">Meet Entaura</p>
            <h2 className="t-fine mt-5">
              Intelligence for <span className="text-ink-soft">Better Business Decisions.</span>
            </h2>
            <p className="mt-5 max-w-[34rem] text-pretty text-[1.0625rem] leading-[1.7] text-muted sm:text-[1.125rem]">
              Vanforces connects the operation. Entaura helps make sense of the information: ask questions, explore business knowledge, discover insights and monitor important changes.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              <Button href={ENTAURA_URL} variant="ink" arrow className="!min-h-[50px] !px-7 !text-[15px]">
                Explore Entaura.ai
              </Button>
              <Button href="/contact" variant="secondary" className="!min-h-[50px] !px-7 !text-[15px]">
                Ask about Entaura
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="stage-soft relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-[32px] border border-cyan-line p-6 sm:min-h-[320px]">
              <span aria-hidden="true" className="capsule left-[-8%] top-[34%] h-[34%] w-[116%] border border-white/70 bg-white/45" />
              <div className="relative flex items-center gap-4 rounded-[28px] bg-white px-6 py-5 shadow-[0_30px_60px_-30px_rgb(8_60_66/0.5),0_2px_6px_rgb(41_59_71/0.06)] sm:gap-6 sm:px-10 sm:py-7">
                <Image src="/brand/vanforces-mark.svg" alt="Vanforces" width={60} height={56} className="h-10 w-auto sm:h-12" />
                <span aria-hidden="true" className="h-9 w-px bg-line sm:h-11" />
                <Image src="/brand/entaura-logo.svg" alt="Entaura.ai" width={545} height={122} priority className="h-10 w-auto sm:h-12" />
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ul className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2">
          {products.map((product, index) => (
            <li key={product.name} data-reveal="" suppressHydrationWarning style={reveal(index * 90)} className="flex flex-col rounded-[28px] bg-mist p-6 sm:p-8">
              <Image src={product.logo} alt={product.name} width={product.width} height={product.height} sizes="150px" className="h-auto w-[132px]" />
              <h3 className="mt-5 text-[1.375rem] font-medium leading-tight tracking-[-0.03em] text-navy-deep">{product.topic}</h3>
              <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{product.lead}</p>
              <ul className="mt-5 grid gap-2.5">
                {product.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-[14.5px] font-medium leading-snug text-navy-deep">
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

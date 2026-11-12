import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
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

/** Fine flowing lines, like the contour lines behind the Entaura.ai hero. Drawn once, with no movement. */
function Contours() {
  const lines = Array.from({ length: 30 }, (_, i) => {
    const y = 90 + i * 9;
    const lift = Math.sin(i * 0.35) * 26;
    return `M-60 ${y + 40} C 200 ${y - 70 + lift}, 460 ${y + 110 - lift}, 720 ${y - 10} S 1120 ${y + 60 + lift}, 1280 ${y - 40}`;
  });
  return (
    <svg
      viewBox="0 0 1200 520"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] w-full [mask-image:radial-gradient(70%_80%_at_50%_30%,#000_0%,transparent_100%)]"
    >
      <defs>
        <linearGradient id="entaura-lines" x1="0" x2="1200" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1cb2bb" />
          <stop offset="0.55" stopColor="#7d9bff" />
          <stop offset="1" stopColor="#c58bf0" />
        </linearGradient>
      </defs>
      {lines.map((d, index) => (
        <path key={index} d={d} stroke="url(#entaura-lines)" strokeWidth="0.9" opacity="0.38" />
      ))}
    </svg>
  );
}

/**
 * Entaura, in its own section, dressed like entaura.ai: white page, fine contour lines behind a large dark headline with its
 * little green pill, a black button. The Entaura logo leads, set beside the Vanforces mark. Insight and Watch are the two
 * product cards, and the section is clear that Entaura is a separate platform. No product screens are invented: the
 * examples are text only.
 */
export function EntauraShowcase() {
  return (
    <section id="entaura" className="section relative isolate scroll-mt-24 overflow-hidden">
      <Contours />
      <div className="wrap">
        <ScrollReveal className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-4 rounded-full border border-line bg-white/90 px-6 py-3 shadow-[0_18px_40px_-24px_rgb(8_60_66/0.45)] backdrop-blur sm:gap-5 sm:px-8">
            <Image src="/brand/vanforces-mark.svg" alt="Vanforces" width={60} height={56} className="h-8 w-auto sm:h-9" />
            <span aria-hidden="true" className="h-7 w-px bg-line" />
            <Image src="/brand/entaura-logo.svg" alt="Entaura.ai" width={545} height={122} priority className="h-9 w-auto sm:h-11" />
          </div>

          <p className="mt-7 inline-flex items-center gap-2 rounded-full border border-cyan-line bg-white px-4 py-1.5 text-[13px] font-semibold text-teal-deep">
            <span aria-hidden="true" className="h-3 w-[5px] shrink-0 rotate-[30deg] rounded-full bg-teal" />
            Enterprise Agentic AI Platform
          </p>

          <h2 className="mt-6 max-w-[20ch] text-balance text-[clamp(2.25rem,1.4rem+3vw,3.75rem)] font-medium leading-[1.04] tracking-[-0.045em] text-navy-deep">
            Intelligence for{" "}
            <span aria-hidden="true" className="relative top-[0.04em] mx-1 inline-flex h-[0.8em] w-[1.5em] items-center justify-center rounded-full bg-[#dcf5ee] align-middle">
              <span className="size-[0.22em] rounded-full bg-[#14a37f]" />
            </span>{" "}
            Better Business Decisions.
          </h2>

          <p className="mt-6 max-w-[40rem] text-pretty text-[1.0625rem] leading-[1.7] text-muted sm:text-[1.125rem]">
            Vanforces connects the operation. Entaura helps make sense of the information: ask questions, explore business knowledge, discover insights and monitor important changes.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Button href={ENTAURA_URL} variant="ink" arrow className="!min-h-[50px] !px-7 !text-[15px]">
              Explore Entaura.ai
            </Button>
            <Button href="/contact" variant="secondary" className="!min-h-[50px] !px-7 !text-[15px]">
              Ask about Entaura
            </Button>
          </div>
        </ScrollReveal>

        <ul className="mx-auto mt-14 grid max-w-[1040px] gap-4 md:mt-20 md:grid-cols-2">
          {products.map((product, index) => (
            <li key={product.name} data-reveal="" suppressHydrationWarning style={{ "--d": `${index * 90}ms` } as React.CSSProperties} className="flex flex-col rounded-[28px] border border-line bg-white p-6 shadow-[0_1px_2px_rgb(41_59_71/0.05),0_30px_60px_-44px_rgb(8_60_66/0.35)] sm:p-8">
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
              <div className="mt-6 rounded-2xl bg-mist px-4 py-3.5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted">{product.exampleLabel} (example)</p>
                <p className="mt-1.5 text-[15px] font-medium leading-snug text-navy-deep">&ldquo;{product.example}&rdquo;</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-4 grid max-w-[1040px] items-center gap-3 rounded-[28px] bg-cyan-soft p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10">
          <div>
            <p className="text-[15.5px] leading-relaxed text-navy-deep">
              <span className="font-semibold">Agentic capabilities.</span> Authorized multi-step workflows across connected tools, data sources and business applications.
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">Entaura is a separate platform and is not included in every Vanforces subscription. How it connects to your Vanforces data depends on configuration.</p>
          </div>
          <Link href={ENTAURA_URL} className="text-[14.5px] font-semibold text-teal-deep underline-offset-4 hover:underline">
            entaura.ai
          </Link>
        </div>
      </div>
    </section>
  );
}

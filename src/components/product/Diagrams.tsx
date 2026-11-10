import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/motion/Reveal";
import { AnimatedConnector } from "@/components/motion/AnimatedConnector";

/** Numbered process. Horizontal on wide screens, vertical line on phones. */
export function WorkflowDiagram({ steps, dark = false }: { steps: string[]; dark?: boolean }) {
  return (
    <ol className="relative grid gap-0 md:auto-cols-fr md:grid-flow-col md:gap-3">
      {steps.map((step, index) => (
        <li key={step} data-reveal="" suppressHydrationWarning style={{ "--d": `${index * 90}ms` } as React.CSSProperties} className="relative flex gap-4 pb-7 last:pb-0 md:block md:pb-0">
          {index < steps.length - 1 ? (
            <span
              aria-hidden="true"
              className={`absolute left-[17px] top-9 h-[calc(100%-36px)] w-px md:left-10 md:top-[17px] md:h-px md:w-[calc(100%-28px)] ${dark ? "bg-white/25" : "bg-cyan-line"}`}
            />
          ) : null}
          <span
            className={`relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${
              dark ? "bg-teal text-navy-deep" : "border border-cyan-line bg-cyan-soft text-teal-deep"
            }`}
          >
            {index + 1}
          </span>
          <span className={`block pt-1.5 text-[15px] font-semibold leading-snug md:mt-3 md:pt-0 ${dark ? "text-white" : "text-navy"}`}>{step}</span>
        </li>
      ))}
    </ol>
  );
}

/** Honest infographic for areas where no real product screen is available. */
export function HubDiagram({ center, nodes, note }: { center: string; nodes: string[]; note: string }) {
  const radiusX = 40;
  const radiusY = 38;
  return (
    <figure>
      <div className="relative mx-auto aspect-square w-full max-w-[460px] rounded-[28px] border border-line bg-cyan-soft">
        <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 size-full">
          {nodes.map((node, index) => {
            const angle = (index / nodes.length) * Math.PI * 2 - Math.PI / 2;
            return (
              <line
                key={node}
                x1="50"
                y1="50"
                x2={50 + radiusX * Math.cos(angle)}
                y2={50 + radiusY * Math.sin(angle)}
                stroke="#1cb2bb"
                strokeWidth="0.35"
                className="flow-line"
                style={{ strokeDasharray: "1 1.4" }}
              />
            );
          })}
        </svg>
        <div className="absolute left-1/2 top-1/2 flex size-[34%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-navy-deep p-3 text-center text-[13px] font-bold leading-tight text-white sm:text-[15px]">
          {center}
        </div>
        {nodes.map((node, index) => {
          const angle = (index / nodes.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <span
              key={node}
              className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-line bg-white px-3 py-1.5 text-[12.5px] font-semibold shadow-lift sm:text-[13.5px]"
              style={{ left: `${50 + radiusX * Math.cos(angle)}%`, top: `${50 + radiusY * Math.sin(angle)}%` }}
            >
              {node}
            </span>
          );
        })}
      </div>
      <figcaption className="mt-3 text-center text-[12.5px] text-muted">{note}</figcaption>
    </figure>
  );
}

/** ERP / Accounting ↔ VANFORCES ↔ Field Operations. */
export function IntegrationDiagram({
  left = "ERP & Accounting",
  right = "Field Operations",
  leftItems = ["Customers", "Products", "Pricing"],
  rightItems = ["Orders", "Sales", "Collections"],
}: {
  left?: string;
  right?: string;
  leftItems?: string[];
  rightItems?: string[];
}) {
  return (
    <ScrollReveal>
      <figure
        role="img"
        aria-label={`${left} exchanges data in both directions with Vanforces, which connects to ${right}.`}
        className="grid items-center rounded-[24px] border border-line bg-mist p-5 md:p-8 lg:grid-cols-[1fr_minmax(64px,120px)_auto_minmax(64px,120px)_1fr]"
      >
        <DiagramNode title={left} items={leftItems} />
        <AnimatedConnector />
        <div className="mx-auto flex w-full max-w-64 flex-col items-center justify-center rounded-[24px] bg-navy-deep px-8 py-8 text-white lg:w-auto">
          <span className="text-[15px] font-extrabold tracking-[0.18em]">VANFORCES</span>
          <span className="mt-1 text-[12px] text-white/70">Distribution Simplified.</span>
        </div>
        <AnimatedConnector />
        <DiagramNode title={right} items={rightItems} />
      </figure>
    </ScrollReveal>
  );
}

function DiagramNode({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[24px] border border-line bg-white p-5 text-center">
      <p className="font-bold">{title}</p>
      <ul className="mt-3 flex flex-wrap justify-center gap-1.5">
        {items.map((item) => (
          <li key={item} className="rounded-full bg-cyan-soft px-2.5 py-1 text-[12.5px] font-medium text-teal-deep">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Simple left-to-right chain, used where a sequence matters more than numbers. */
export function ChainDiagram({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center">
      {steps.map((step, index) => (
        <li key={step} data-reveal="" suppressHydrationWarning style={{ "--d": `${index * 70}ms` } as React.CSSProperties} className="flex items-center gap-2">
          <span className="rounded-xl border border-line bg-white px-4 py-3 text-[15px] font-semibold shadow-lift">{step}</span>
          {index < steps.length - 1 ? <ArrowRight aria-hidden="true" size={18} className="hidden text-teal md:block" /> : null}
        </li>
      ))}
    </ol>
  );
}

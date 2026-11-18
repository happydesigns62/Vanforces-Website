import { phone as phones, web as webs, type PhoneKey, type WebKey } from "@/data/media";
import type { Feature, FeatureLayout } from "@/data/modules";
import { ScreenshotReveal, ScrollReveal } from "@/components/motion/Reveal";
import { MobileScreenshotFrame, WebScreenshotFrame } from "./Frames";

/**
 * The main content composition for product, solution and integration pages.
 * Different layouts keep neighbouring pages from feeling like the same template.
 */
export function FeatureSet({
  layout,
  features,
  visual,
}: {
  layout: FeatureLayout;
  features: Feature[];
  visual?: { web?: WebKey; phone?: PhoneKey };
}) {
  switch (layout) {
    case "sticky":
      return <StickyStory features={features} phone={visual?.phone} />;
    case "rail":
      return <Rail features={features} web={visual?.web} />;
    case "ledger":
      return <Ledger features={features} web={visual?.web} />;
    case "preview":
      return <Audience features={features} />;
    default:
      return <Bento features={features} />;
  }
}

/** Phone stays in view while the steps scroll past. */
function StickyStory({ features, phone }: { features: Feature[]; phone?: PhoneKey }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
      {phone ? (
        <div className="lg:sticky lg:top-28 lg:self-start">
          <ScreenshotReveal className="mx-auto w-[62%] max-w-[300px] lg:w-full">
            <MobileScreenshotFrame shot={phones[phone]} />
          </ScreenshotReveal>
        </div>
      ) : null}
      <ol>
        {features.map((feature, index) => (
          <li key={feature.title} id={feature.id} className="border-t border-line py-8 first:border-t-0 first:pt-0 lg:py-11">
            <ScrollReveal>
              <span className="text-[13px] font-bold tabular-nums text-teal-deep">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="t-section mt-2 !text-[clamp(1.26rem,1.092rem+0.672vw,1.785rem)]">{feature.title}</h3>
              <p className="lede mt-3 max-w-xl">{feature.body}</p>
            </ScrollReveal>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Horizontal process rail above a large screenshot. */
function Rail({ features, web }: { features: Feature[]; web?: WebKey }) {
  const columns = features.length >= 6 ? "lg:grid-cols-6" : "lg:grid-cols-5";
  return (
    <>
      <ol className={`grid gap-x-5 gap-y-8 sm:grid-cols-2 ${columns}`}>
        {features.map((feature, index) => (
          <li key={feature.title} id={feature.id} data-reveal="" suppressHydrationWarning style={{ "--d": `${index * 80}ms` } as React.CSSProperties} className="relative border-t-2 border-teal pt-5">
            <span className="absolute -top-[7px] left-0 size-3 rounded-full bg-teal" aria-hidden="true" />
            <span className="text-[13px] font-bold tabular-nums text-teal-deep">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="t-card mt-1.5">{feature.title}</h3>
            <p className="body mt-2 !text-[15px]">{feature.body}</p>
          </li>
        ))}
      </ol>
      {web ? (
        <ScreenshotReveal className="mt-10">
          <WebScreenshotFrame shot={webs[web]} />
        </ScreenshotReveal>
      ) : null}
    </>
  );
}

/** Asymmetric grid. The first item carries more weight than the rest. */
function Bento({ features }: { features: Feature[] }) {
  const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-4", "md:col-span-4", "md:col-span-4", "md:col-span-6", "md:col-span-6"];
  const spansFive = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-3", "md:col-span-4"];
  const spansSix = ["md:col-span-7", "md:col-span-5", "md:col-span-4", "md:col-span-4", "md:col-span-4", "md:col-span-12"];
  const set = features.length === 5 ? spansFive : features.length === 6 ? spansSix : spans;
  return (
    <div className="grid gap-4 md:grid-cols-12">
      {features.map((feature, index) => {
        const lead = index === 0;
        return (
          <div
            key={feature.title}
            id={feature.id}
            data-reveal="" suppressHydrationWarning
            style={{ "--d": `${(index % 3) * 80}ms` } as React.CSSProperties}
            className={`rounded-[28px] p-7 md:p-9 ${set[index] ?? "md:col-span-4"} ${lead ? "bg-navy-deep text-white" : index % 3 === 1 ? "bg-band-cyan" : "border border-line bg-white shadow-[0_1px_2px_rgb(41_59_71/0.05)]"}`}
          >
            <h3 className={lead ? "text-[clamp(1.26rem,1.092rem+0.672vw,1.68rem)] font-medium leading-tight tracking-[-0.03em]" : "t-card"}>{feature.title}</h3>
            <p className={`mt-3 ${lead ? "max-w-md text-[17px] leading-relaxed text-white/75" : "body"}`}>{feature.body}</p>
          </div>
        );
      })}
    </div>
  );
}

/** Calm, table-like rows suited to finance and integration detail. */
function Ledger({ features, web }: { features: Feature[]; web?: WebKey }) {
  return (
    <>
      <dl className="border-t border-navy/80">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            id={feature.id}
            data-reveal="" suppressHydrationWarning
            style={{ "--d": `${(index % 4) * 50}ms` } as React.CSSProperties}
            className="grid gap-2 border-b border-line py-6 md:grid-cols-[72px_minmax(0,4fr)_minmax(0,7fr)] md:gap-6 md:py-7"
          >
            <span aria-hidden="true" className="hidden text-[13px] font-bold tabular-nums text-muted md:block">
              {String(index + 1).padStart(2, "0")}
            </span>
            <dt className="t-card">{feature.title}</dt>
            <dd className="body">{feature.body}</dd>
          </div>
        ))}
      </dl>
      {web ? (
        <ScreenshotReveal className="mt-10">
          <WebScreenshotFrame shot={webs[web]} />
        </ScreenshotReveal>
      ) : null}
    </>
  );
}

function Audience({ features }: { features: Feature[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {features.map((feature, index) => (
        <div key={feature.title} data-reveal="" suppressHydrationWarning style={{ "--d": `${index * 90}ms` } as React.CSSProperties} className="rounded-[28px] bg-band-cyan p-8">
          <h3 className="t-card">{feature.title}</h3>
          <p className="body mt-3">{feature.body}</p>
        </div>
      ))}
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Breadcrumbs, CTASection } from "@/components/global/Common";
import { ModuleCard } from "@/components/product/Cards";
import { Mascot } from "@/components/global/Mascot";
import { mascots } from "@/data/media";
import { guideBySlug, guides } from "@/data/resources";

type Props = { params: Promise<{ slug: string }> };

export const instant = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.summary, openGraph: { title: guide.title, description: guide.summary, type: "article" } };
}

const contents = [
  ["introduction", "Introduction"],
  ["key-concepts", "Key Concepts"],
  ["practical-workflow", "Practical Workflow"],
  ["common-challenges", "Common Challenges"],
  ["review-checklist", "Suggested Review Checklist"],
  ["related-modules", "Related Vanforces Modules"],
  ["closing-summary", "Closing Summary"],
];

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) notFound();
  const index = guides.findIndex((g) => g.slug === guide.slug);
  const next = guides[(index + 1) % guides.length];

  return (
    <>
      <article>
        <header className="wrap relative pt-10 md:pt-14">
          <div className="seq mb-8">
            <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: guide.title }]} />
          </div>
          <div className="seq-shot absolute right-8 top-10 hidden w-64 xl:block" style={{ "--d": "200ms" } as React.CSSProperties}>
            <Mascot name={mascots.guides[guide.slug] ?? "business"} sizes="256px" className="w-full" />
          </div>
          <div className="seq flex flex-wrap items-center gap-3" style={{ "--d": "40ms" } as React.CSSProperties}>
            <p className="eyebrow">{guide.topic}</p>
            <span className="text-[13px] text-muted">{guide.readTime}</span>
          </div>
          <h1 className="t-page seq mt-5 max-w-4xl xl:max-w-3xl" style={{ "--d": "100ms" } as React.CSSProperties}>
            {guide.title}
          </h1>
          <p className="lede seq mt-5 max-w-3xl xl:max-w-2xl" style={{ "--d": "180ms" } as React.CSSProperties}>
            {guide.summary}
          </p>
        </header>

        <div className="wrap mt-10 grid gap-12 pb-14 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-20">
          <nav aria-label="On this page" className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
            <p className="text-[13px] font-bold">On this page</p>
            <ul className="mt-3 space-y-2 border-l border-line">
              {contents.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="-ml-px block border-l border-transparent pl-4 text-[14px] leading-snug text-muted transition-colors hover:border-teal hover:text-navy">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="prose-doc max-w-[720px]">

            <h2 id="introduction" className="scroll-mt-24 !mt-0">Introduction</h2>
            {guide.introduction.map((paragraph) => (
              <p key={paragraph.slice(0, 20)}>{paragraph}</p>
            ))}

            <h2 id="key-concepts" className="scroll-mt-24">Key Concepts</h2>
            <dl className="not-prose my-4 divide-y divide-line rounded-[24px] border border-line">
              {guide.concepts.map((concept) => (
                <div key={concept.term} className="grid gap-1 p-4 sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-4">
                  <dt className="font-bold">{concept.term}</dt>
                  <dd className="text-[15.5px] leading-relaxed text-muted">{concept.meaning}</dd>
                </div>
              ))}
            </dl>

            <h2 id="practical-workflow" className="scroll-mt-24">Practical Workflow</h2>
            <ol className="my-4 space-y-3.5">
              {guide.workflow.map((step, stepIndex) => (
                <li key={step} className="flex gap-4">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-cyan-soft text-[13px] font-bold text-teal-deep">{stepIndex + 1}</span>
                  <span className="pt-0.5 text-[17px] leading-relaxed text-[#4d5f6b]">{step}</span>
                </li>
              ))}
            </ol>

            <h2 id="common-challenges" className="scroll-mt-24">Common Challenges</h2>
            <ul>
              {guide.challenges.map((challenge) => (
                <li key={challenge}>{challenge}</li>
              ))}
            </ul>

            <h2 id="review-checklist" className="scroll-mt-24">Suggested Review Checklist</h2>
            <ul className="my-4 !grid gap-2.5 rounded-[24px] bg-paper p-5">
              {guide.checklist.map((item) => (
                <li key={item} className="!pl-0 before:!hidden flex gap-3">
                  <Check aria-hidden="true" size={18} strokeWidth={2.75} className="mt-1 shrink-0 text-teal-deep" />
                  {item}
                </li>
              ))}
            </ul>

            <h2 id="related-modules" className="scroll-mt-24">Related Vanforces Modules</h2>
            <div className="my-4 grid gap-3 sm:grid-cols-3">
              {guide.modules.map((module) => (
                <ModuleCard key={module.label} title={module.label} body="See how this connects to Vanforces." href={module.href} />
              ))}
            </div>

            <h2 id="closing-summary" className="scroll-mt-24">Closing Summary</h2>
            <p>{guide.closing}</p>

            <div className="mt-10 border-t border-line pt-6">
              <p className="!mb-1 !text-[13px]">Next guide</p>
              <Link href={`/resources/guides/${next.slug}`} className="text-[20px] font-bold tracking-tight transition-colors hover:text-teal-deep">
                {next.title} →
              </Link>
            </div>
          </div>
        </div>
      </article>
      <CTASection title="See these ideas in a working system." description="Tell us how your team handles this today, and we'll focus the conversation on your workflows." primary={{ label: "Book a Demo", href: "/book-demo" }} secondary={{ label: "All Resources", href: "/resources" }} />
    </>
  );
}

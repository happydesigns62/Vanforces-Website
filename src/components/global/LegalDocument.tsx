import { Breadcrumbs, DemoNotice } from "./Common";
import { Mascot } from "./Mascot";

export type LegalSection = { heading: string; paragraphs: string[]; bullets?: string[] };

export function LegalDocument({ title, label, notice, sections }: { title: string; label: string; notice: string; sections: LegalSection[] }) {
  return (
    <article className="wrap pb-20 pt-10 md:pt-14">
      <div className="mx-auto max-w-[760px]">
        <Breadcrumbs items={[{ label: title }]} />
        <p className="mt-8">
          <span className="sample-tag">{label}</span>
        </p>
        <h1 className="t-page mt-4">{title}</h1>
        <Mascot name="security" sizes="180px" className="mt-5 w-36 md:w-44" />
        <DemoNotice className="mt-7">{notice}</DemoNotice>
        <div className="prose-doc mt-4">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModuleTemplate } from "@/components/product/ModuleTemplate";
import { moduleBySlug, modules } from "@/data/modules";

type Props = { params: Promise<{ slug: string }> };

export const instant = false;

export function generateStaticParams() {
  return modules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const m = moduleBySlug(slug);
  if (!m) return {};
  return { title: `${m.name}: ${m.heading}`, description: m.description, openGraph: { title: m.heading, description: m.description } };
}

export default async function ModulePage({ params }: Props) {
  const { slug } = await params;
  const m = moduleBySlug(slug);
  if (!m) notFound();
  return <ModuleTemplate module={m} />;
}

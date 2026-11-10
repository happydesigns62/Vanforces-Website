import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/customers/CaseStudyLayout";
import { customerStories } from "@/data/customers";

type Props = { params: Promise<{ slug: string }> };

const find = (slug: string) => customerStories.find((s) => s.slug === slug);

export const instant = false;

export function generateStaticParams() {
  return customerStories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = find(slug);
  if (!story) return {};
  return { title: story.title, description: story.excerpt };
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = find(slug);
  if (!story) notFound();
  return <CaseStudyLayout story={story} />;
}

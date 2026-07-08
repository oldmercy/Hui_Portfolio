import { getAllSlugs, getPaperBySlug } from "@/lib/papers";
import { CUSTOM_PAPER_SLUGS } from "@/lib/custom-papers";
import { notFound } from "next/navigation";
import PaperReader from "./PaperReader";

export function generateStaticParams() {
  // Exclude custom papers from [slug] static generation
  // Custom papers have their own static routes (e.g., /writing/gender-gap-math/page.tsx)
  // and must not be prerendered here, or they'll override the custom page
  return getAllSlugs("en")
    .filter((slug) => !CUSTOM_PAPER_SLUGS.includes(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paper = getPaperBySlug("en", slug);
  if (!paper) return {};
  return {
    title: `${paper.title} — Wenhui Xu`,
    description: paper.abstract,
  };
}

export default async function PaperPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const paper = getPaperBySlug("en", slug);
  if (!paper) notFound();
  return <PaperReader paper={paper} />;
}

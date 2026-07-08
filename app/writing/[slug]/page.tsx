import { getAllSlugs, getPaperBySlug } from "@/lib/papers";
import { notFound } from "next/navigation";
import PaperReader from "./PaperReader";
import CustomPageRedirect from "./CustomPageRedirect";

export function generateStaticParams() {
  return getAllSlugs("en").map((slug) => ({ slug }));
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

  // Gender Gap Math has a custom interactive page
  if (slug === "gender-gap-math") {
    return <CustomPageRedirect />;
  }

  const paper = getPaperBySlug("en", slug);
  if (!paper) notFound();
  return <PaperReader paper={paper} />;
}

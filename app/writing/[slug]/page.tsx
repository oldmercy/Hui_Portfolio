import papers from "@/public/papers.json";
import { notFound } from "next/navigation";
import PaperReader from "./PaperReader";

export function generateStaticParams() {
  return papers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paper = papers.find((p) => p.slug === slug);
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
  const paper = papers.find((p) => p.slug === slug);
  if (!paper) notFound();
  return <PaperReader paper={paper} />;
}

/**
 * lib/papers.ts
 * Unified paper data access layer.
 *
 * Currently reads from content/papers/<lang>/<slug>.json.
 * Pages should NEVER import paper JSON files directly.
 *
 * Future bilingual path:
 *   getAllPapers('zh')  → reads content/papers/zh/*.json
 *   getPaperBySlug('zh', slug) → reads content/papers/zh/<slug>.json
 */

import type { Lang } from "./i18n";
import { defaultLang } from "./i18n";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type PaperSection = {
  type: "section";
  heading: string;
  paragraphs: string[];
  items?: string[];   // optional bullet list rendered after paragraphs
  closing?: string;  // optional paragraph rendered after the list
};

export type Paper = {
  slug: string;
  title: string;
  category: string;
  year: number;
  abstract: string;
  tags: string[];
  readingTime: number;
  featured: boolean;
  coverImage: string;
  pdfPath: string;
  body: PaperSection[];
};

// ---------------------------------------------------------------------------
// Static imports — one per paper, per language.
// Add a new import here whenever a new paper is added.
// ---------------------------------------------------------------------------

import enGenderMath from "@/content/papers/en/gender-gap-math.json";
import enGender   from "@/content/papers/en/gender-expansive-early-education.json";

const papersByLang: Record<string, Paper[]> = {
  en: [enGenderMath, enGender] as Paper[],
  // zh: [zhCausal, zhPanel, zhConsumer],   ← uncomment when Chinese papers are ready
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Return all papers for a given language, newest first.
 * Falls back to English if the language has no content yet.
 */
export function getAllPapers(lang: Lang = defaultLang): Paper[] {
  return (papersByLang[lang] ?? papersByLang[defaultLang]) as Paper[];
}

/**
 * Return the single featured paper (the one with featured: true).
 * Falls back to the first paper if none is marked featured.
 */
export function getFeaturedPaper(lang: Lang = defaultLang): Paper {
  const papers = getAllPapers(lang);
  return papers.find((p) => p.featured) ?? papers[0];
}

/**
 * Look up one paper by slug.
 * Returns undefined if not found.
 */
export function getPaperBySlug(
  lang: Lang = defaultLang,
  slug: string
): Paper | undefined {
  return getAllPapers(lang).find((p) => p.slug === slug);
}

/**
 * Return all valid slugs for a language — used by generateStaticParams.
 */
export function getAllSlugs(lang: Lang = defaultLang): string[] {
  return getAllPapers(lang).map((p) => p.slug);
}

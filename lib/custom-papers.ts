/**
 * lib/custom-papers.ts
 * Single source of truth for papers with custom interactive pages.
 *
 * Custom papers have special layouts (tabs, model comparisons, visualizations)
 * and are implemented at /app/writing/{slug}/page.tsx. No special routing logic
 * needed — Next.js static routes take precedence over dynamic [slug] routes.
 *
 * Mark these papers in their JSON with `"body": []` to signal custom rendering.
 */

export const CUSTOM_PAPER_SLUGS = ["gender-gap-math"];

export function isCustomPaper(slug: string): boolean {
  return CUSTOM_PAPER_SLUGS.includes(slug);
}

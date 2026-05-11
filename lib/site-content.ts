/**
 * lib/site-content.ts
 * Unified site content access layer.
 *
 * Pages call getSiteContent(lang) and receive the full typed content object.
 * Never import from content/site/ directly in page components.
 *
 * Future bilingual path:
 *   - Add /app/[lang]/... routes
 *   - Pass lang param from route segment to getSiteContent(lang)
 */

import type { Lang } from "./i18n";
import { defaultLang } from "./i18n";
import { siteContentEn } from "@/content/site/en";
import { siteContentZh } from "@/content/site/zh";
import { toolsContentEn } from "@/content/tools/en";
import { toolsContentZh } from "@/content/tools/zh";

const siteContent = {
  en: siteContentEn,
  zh: siteContentZh,
} as const;

const toolsContent = {
  en: toolsContentEn,
  zh: toolsContentZh,
} as const;

/** Get site-level content (metadata, home, about, footer) for a language. */
export function getSiteContent(lang: Lang = defaultLang) {
  return siteContent[lang] ?? siteContent[defaultLang];
}

/** Get tools-page content for a language. */
export function getToolsContent(lang: Lang = defaultLang) {
  return toolsContent[lang] ?? toolsContent[defaultLang];
}

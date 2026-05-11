/**
 * lib/i18n.ts
 * Lightweight i18n foundation — no routing changes yet.
 * Future migration path: /app/[lang]/... routes read `lang` param
 * and pass it to getSiteContent(lang) / getAllPapers(lang).
 */

export const languages = ["en", "zh"] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = "en";

/** Validate a raw string is a supported language, fall back to default. */
export function validateLang(raw: string | undefined): Lang {
  return (languages as readonly string[]).includes(raw ?? "")
    ? (raw as Lang)
    : defaultLang;
}

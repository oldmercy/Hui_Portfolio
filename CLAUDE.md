# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Production build
npm run lint       # TypeScript + ESLint
```

---

## Architecture Overview

**Hui's portfolio site** is a Next.js 15 App Router application with a strict separation between page logic (`app/`) and content (`content/`). All user-facing text and paper metadata are centralized so edits flow through to pages automatically.

### Content Layer (`content/`)
All site copy and paper metadata live here — pages **never** hardcode text:
- **`content/site/{en,zh}.ts`** — Global site copy (header, footer, about bio, hero headlines)
- **`content/papers/en/*.json`** — One JSON file per paper (title, abstract, tags, body sections, metadata)
- **`content/tools/{en,zh}.ts`** — CantRead tool copy and home teaser

### Data Access Layer (`lib/`)
Pages import from here, never directly from `content/`:
- **`lib/papers.ts`** — `getAllPapers(lang)`, `getPaperBySlug(lang, slug)`, `getFeaturedPaper(lang)`, `getAllSlugs(lang)`
- **`lib/site-content.ts`** — `getSiteContent(lang)` for global site text
- **`lib/i18n.ts`** — Language enum (`"en" | "zh"`), `defaultLang`, `validateLang()`

### Page Layer (`app/`)
- **`app/writing/page.tsx`** — Paper list (calls `getAllPapers()` + `getFeaturedPaper()`)
- **`app/writing/[slug]/page.tsx`** — Paper detail reader with `generateStaticParams` (looks up via `getPaperBySlug()`)
- **Custom paper pages** (e.g., `app/writing/gender-gap-math/page.tsx`) — One-off pages for papers requiring custom layout/interactivity (tabs, model comparisons, interactive visualizations). Falls back to [slug] for standard papers.
- **`app/about/page.tsx`**, **`app/page.tsx`** — Other pages read from `getSiteContent()`

### Theme & Accessibility
- **Dark mode** — Toggled via navbar, persisted to `localStorage`, applied via CSS custom properties (`--text-primary`, `--accent`, etc.)
- **TABE (CantRead)** — Global toggle in navbar; runs locally via `compromise.js`. When enabled, text is color-coded by part-of-speech (nouns bold, verbs yellow, etc.). Implemented in `GlobalTabe.tsx` and used by paper readers.

---

## How to Add or Update a Paper

### If the paper needs a custom interactive layout (tabs, model comparison, visualizations):

1. **Create metadata** at `content/papers/en/<slug>.json`:
   ```json
   {
     "slug": "gender-gap-math",
     "title": "Gender Figures in Math: ...",
     "category": "Economic Research",
     "year": 2024,
     "abstract": "One-paragraph teaser for the list view.",
     "tags": ["Causal Inference", "Machine Learning"],
     "readingTime": 20,
     "featured": true,
     "coverImage": "/Eco/cover.png",
     "pdfPath": "/Eco/paper.pdf",
     "body": []
   }
   ```
   > Set `"featured": true` on exactly one paper at a time — it becomes the hero card on `/writing` and home page teaser.

2. **Register the import** in `lib/papers.ts`:
   ```ts
   import enGenderMath from "@/content/papers/en/gender-gap-math.json";
   
   const papersByLang: Record<string, Paper[]> = {
     en: [enGenderMath, ...otherPapers] as Paper[],
   };
   ```

3. **Create custom page** at `app/writing/gender-gap-math/page.tsx` if needed. The page receives the slug via the directory name and can build a completely custom layout. Example: the gender-gap-math page has a tabbed model comparison interface.

   **✋ CRITICAL: Register in `lib/custom-papers.ts`**
   ```ts
   // lib/custom-papers.ts
   export const CUSTOM_PAPER_SLUGS = ["gender-gap-math"];
   ```
   This prevents the `[slug]` route from prerendering a static page for this slug, which would otherwise override your custom page. See "Routing Architecture" below.

4. **Add assets** — Drop cover image and PDF into `public/Eco/` (or `Biz/`) at the paths specified in the JSON.

### If the paper is standard (no custom interactivity):

1. Create `content/papers/en/<slug>.json` with full `body` sections (each with `type: "section"`, `heading`, `paragraphs`).
2. Register the import in `lib/papers.ts`.
3. Add assets.
4. The [slug] generic page will handle rendering automatically.

---

## How to Edit Site Copy

**All user-facing text goes in `content/`** — never hardcode strings in components.

- **Global site copy** → Edit `content/site/en.ts`. Pages import via `getSiteContent("en")`.
- **Paper-specific text** → Edit the JSON files in `content/papers/en/`.

Changes hot-reload immediately on the next page refresh (Next.js watches the `content/` dir).

---

## i18n Foundation

Language types and defaults are defined in `lib/i18n.ts` (`type Lang = "en" | "zh"`, `defaultLang = "en"`).

Chinese placeholder files (`content/site/zh.ts`, `content/tools/zh.ts`, `content/papers/zh/`) are already structured and typed — just fill them in when content is ready.

To surface a page in Chinese, call `getSiteContent("zh")` or `getAllPapers("zh")`. No routing structure exists yet; a future `/app/[lang]/...` can be added when a language switcher is implemented.

---

## Routing Architecture for Custom Papers

**Problem:** Custom papers (like `gender-gap-math`) need special layouts that the generic `[slug]` reader can't provide. But Next.js's `generateStaticParams()` in `[slug]/page.tsx` would prerender a static page for every slug, potentially overriding custom pages.

**Solution:** A two-tier system prevents conflicts:

1. **Custom pages have file-system precedence** — `/app/writing/gender-gap-math/page.tsx` is matched before `/app/writing/[slug]/page.tsx`
2. **But `generateStaticParams` must exclude custom slugs** — Otherwise, the `[slug]` route pregens a static HTML that can interfere with the custom page in edge cases

**How it works:**

```typescript
// lib/custom-papers.ts — Single source of truth
export const CUSTOM_PAPER_SLUGS = ["gender-gap-math"];

// app/writing/[slug]/page.tsx — Excludes custom papers from SSG
export function generateStaticParams() {
  return getAllSlugs("en")
    .filter((slug) => !CUSTOM_PAPER_SLUGS.includes(slug))
    .map((slug) => ({ slug }));
}
```

**When adding a new custom paper:**
1. Create `/app/writing/<slug>/page.tsx` with your custom layout
2. Add the slug to `CUSTOM_PAPER_SLUGS` in `lib/custom-papers.ts`
3. Mark the JSON with `"body": []` (signals "this is custom-rendered")

If you forget step 2, the `[slug]` route will prerender a generic page that shadows your custom one.

---

## TypeScript & Type Safety

- Paper type: `type Paper` in `lib/papers.ts`
- Site content type: exported from `content/site/en.ts`
- Language type: `type Lang` in `lib/i18n.ts`

Always import types from `lib/` for consistency.

---

## Tailwind + CSS Custom Properties

Styling uses **Tailwind classes + CSS variables** for theme colors:
- `var(--text-primary)`, `var(--text-secondary)`, `var(--text-tertiary)` — Text hierarchy
- `var(--bg)`, `var(--surface)`, `var(--bg-subtle)` — Backgrounds
- `var(--border)`, `var(--border-strong)` — Borders
- `var(--accent)` — Links, highlights

Theme toggling swaps these variables via the theme provider (dark/light mode is localStorage-persisted).

---

## Common Editing Tasks

| Task | File(s) to Edit |
|---|---|
| Update home hero headline | `content/site/en.ts` → `home.title` |
| Update about bio | `content/site/en.ts` → `about.bio` |
| Mark a new paper as featured | `content/papers/en/<slug>.json` → set `"featured": true` (also unset on the old one) |
| Add a paper with custom layout | Create `content/papers/en/<slug>.json`, register in `lib/papers.ts`, create `app/writing/<slug>/page.tsx` |
| Add a paper with standard layout | Create `content/papers/en/<slug>.json`, register in `lib/papers.ts` (no custom page needed) |
| Change footer links | `content/site/en.ts` → `footer.links` |
| Update site metadata (title, description) | `app/layout.tsx` → reads from `getSiteContent()` and generates metadata |

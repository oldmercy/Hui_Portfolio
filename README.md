# Wenhui Xu — Portfolio Site

Personal academic portfolio for Wenhui (Hwei) Xu, MA in Economic Data Analytics at the University of Toronto. Built with Next.js 15 App Router, Tailwind CSS, and the CantRead TABE accessibility system.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS + CSS custom properties |
| NLP (TABE) | compromise.js (runs in browser) |
| Package manager | npm (`package-lock.json`) |
| Language | TypeScript |

---

## Project Structure

```
/
├── app/                        # Next.js App Router pages & components
│   ├── layout.tsx              # Root layout: metadata, Navbar, footer (reads from content layer)
│   ├── page.tsx                # Home page (hero, featured paper teaser, tools teaser)
│   ├── about/page.tsx          # About page (bio, skills, hobbies)
│   ├── writing/
│   │   ├── page.tsx            # Writing list (hero card + older papers)
│   │   └── [slug]/
│   │       ├── page.tsx        # Paper detail page (generateStaticParams + metadata)
│   │       └── PaperReader.tsx # Full paper reader with TABE mode + progress bar
│   ├── tools/page.tsx          # CantRead / TABE live demo page
│   └── components/
│       ├── ThemeProvider.tsx   # Dark/light theme + global TABE toggle (React context)
│       └── nav/Navbar.tsx      # Top navigation with theme + TABE toggles
│
├── content/                    # ← All editable site copy lives here
│   ├── site/
│   │   ├── en.ts               # English: metadata, home hero, about, footer, writing header
│   │   └── zh.ts               # Chinese placeholder (same shape, ready to fill)
│   ├── papers/
│   │   ├── en/                 # One JSON file per paper (English)
│   │   │   ├── causal-inference-business.json
│   │   │   ├── panel-data-economic-growth.json
│   │   │   └── business-analytics-consumer-behaviour.json
│   │   └── zh/                 # Chinese paper placeholders (add <slug>.json here)
│   └── tools/
│       ├── en.ts               # English: CantRead page copy + home teaser copy
│       └── zh.ts               # Chinese placeholder
│
├── lib/                        # Data access helpers — pages import from here, never from content/ directly
│   ├── i18n.ts                 # Language types (Lang = "en" | "zh"), defaultLang, validateLang()
│   ├── papers.ts               # getAllPapers(), getPaperBySlug(), getFeaturedPaper(), getAllSlugs()
│   └── site-content.ts         # getSiteContent(), getToolsContent()
│
└── public/                     # Static assets
    ├── Eco/                    # Economic research paper covers + PDFs
    ├── Biz/                    # Business analytics paper covers + PDFs
    └── *.png                   # Calligraphy seal images
```

---

## Running Locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # ESLint
```

---

## How to Add a Paper

1. **Create the JSON file** at `content/papers/en/<slug>.json`.  
   Copy an existing file and fill in all fields:

   ```json
   {
     "slug": "your-paper-slug",
     "title": "Paper Title",
     "category": "Economic Research",
     "year": 2025,
     "abstract": "One-paragraph abstract shown in the list and on the detail page.",
     "tags": ["Tag A", "Tag B"],
     "readingTime": 20,
     "featured": false,
     "coverImage": "/Eco/cover.png",
     "pdfPath": "/Eco/paper.pdf",
     "body": [
       {
         "type": "section",
         "heading": "Introduction",
         "paragraphs": ["First paragraph.", "Second paragraph."]
       }
     ]
   }
   ```

   > Set `"featured": true` on whichever paper should appear as the hero card on `/writing` and in the homepage teaser. Only one paper should be featured at a time.

2. **Register the import** in `lib/papers.ts`:

   ```ts
   import enYourPaper from "@/content/papers/en/your-paper-slug.json";
   // Then add it to the array:
   const papersByLang = {
     en: [enCausal, enPanel, enConsumer, enYourPaper] as Paper[],
   };
   ```

3. **Add assets** — drop the cover image and PDF into `public/` at the paths you specified.

4. That's it. `generateStaticParams` picks up the new slug automatically; no routing changes needed.

---

## How to Edit Site Copy

All user-facing text (hero headline, about bio, footer, etc.) lives in `content/site/en.ts`.  
Edit the values there — pages read them through `lib/site-content.ts` and will reflect the change immediately on the next hot-reload.

**Never** hardcode strings directly in page components.

---

## i18n Foundation

`lib/i18n.ts` defines `type Lang = "en" | "zh"` and `defaultLang = "en"`.  
The Chinese placeholder files (`content/site/zh.ts`, `content/tools/zh.ts`, `content/papers/zh/`) are fully typed and structurally identical to their English counterparts.

To activate Chinese output for a page, call `getSiteContent("zh")` or `getAllPapers("zh")`.  
No routing changes have been made yet — a future `/app/[lang]/...` route structure can be added when a language switcher is needed.

---

## Dark Mode & TABE Accessibility

- **Dark mode** is toggled via the moon/sun button in the navbar. Preference is saved to `localStorage`.  
- **TABE reading mode** (CantRead) colour-codes text by part of speech (noun = bold, verb = yellow highlight, adjective = italic green, number = orange). Toggled via the "Aa Reading" button in the navbar or the button on each paper page. NLP runs locally in the browser via compromise.js; nothing is sent to a server.

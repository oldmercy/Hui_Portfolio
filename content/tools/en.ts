/**
 * content/tools/en.ts
 * English copy for the Tools page and homepage tool teaser.
 */

export const toolsContentEn = {
  page: {
    overline: "Open Source · Accessibility",
    title: "CantRead",
    subtitle:
      "For brains that bounce off walls of text. TABE (Type-Annotated Body of Evidence) colour-codes language so readers can navigate dense academic prose at a glance.",
  },

  tabe: {
    sectionTitle: "The TABE system",
    description: [
      "I developed this format while taking networking notes during job hunting. Turns out it works for anyone who finds dense text hard to parse — including people with ADHD, dyslexia, or just too many browser tabs open.",
      "One consistent annotation format, applied anywhere: documents, papers, RSS feeds, PDFs. The brain learns the visual grammar fast, then stops having to re-read sentences.",
    ],
    legend: [
      { cls: "tabe-noun", label: "Bold",           desc: "Nouns — the things, entities, concepts that carry the argument" },
      { cls: "tabe-verb", label: "Yellow highlight",desc: "Verbs — the actions, states, changes that drive the sentence" },
      { cls: "tabe-adj",  label: "Italic green",    desc: "Adjectives / adverbs — modifiers you can often skim first" },
      { cls: "tabe-num",  label: "Orange",           desc: "Numbers, statistics, dates — instantly scannable at a glance" },
    ],
  },

  demo: {
    sectionTitle: "Try it live",
    editButtonLabel: "Paste your own text",
    cancelButtonLabel: "Cancel",
    enableLabel: "Enable TABE",
    onLabel: "TABE On",
    processingLabel: "Processing…",
    applyLabel: "Apply TABE →",
    poweredBy: "compromise.js",
    poweredByHref: "https://github.com/spencermountain/compromise",
    poweredByNote: "NLP runs entirely in your browser, nothing is sent to a server.",
    defaultText: `Causal inference has fundamentally transformed how economists evaluate complex policies. When a government introduces a new minimum wage law, researchers must determine whether observed employment changes actually result from the policy itself, or whether they reflect broader economic trends that happened to coincide with the legislation.

Double Machine Learning addresses this challenge by using cross-fitting and regularised regression to partial out the influence of high-dimensional controls before estimating treatment effects. A single study using these methods can influence millions of policy decisions across dozens of jurisdictions.

The core insight is deceptively simple: correlation between two variables tells us nothing about causation unless we have carefully constructed the identification strategy. Economists who understand this distinction produce research that genuinely moves the needle.`,
  },

  integration: {
    overline: "Integrated throughout this site",
    body: "Every paper on this site has a Reading mode button in the header. Toggle it on any paper to activate TABE — the NLP runs locally in your browser.",
    linkLabel: "Browse papers →",
    linkHref: "/writing",
  },

  openSource: {
    title: "Open source",
    body: "CantRead is open source. Contributions especially welcome for non-English language support and dictionary expansions.",
    linkLabel: "github.com/oldmercy/CantRead →",
    linkHref: "https://github.com/oldmercy/CantRead",
  },

  /** Used in the homepage ToolsTeaser */
  homeTeaser: {
    overline: "Open Source Tool",
    title: "CantRead — accessible reading for brains that bounce off walls of text",
    body: "TABE (Type-Annotated Body of Evidence) marks nouns bold, verbs highlighted, adjectives italic, and numbers orange — a reading format I developed while taking networking notes that turned out to work for everyone.",
    linkLabel: "Try it live →",
    linkHref: "/tools",
    previewLabel: "TABE Reading Mode — preview",
  },
};

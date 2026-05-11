/**
 * content/site/en.ts
 * All English site-level copy: metadata, homepage, about page.
 * Pages import via lib/site-content.ts — never directly.
 */

export const siteContentEn = {
  metadata: {
    title: "Wenhui Xu — Economist & Data Scientist",
    description:
      "Writing samples, research, and tools by Wenhui Xu — Economist and Data Scientist based in Toronto.",
    ogTitle: "Wenhui Xu",
    ogDescription: "Economist & Data Scientist based in Toronto.",
  },

  home: {
    hero: {
      overline: "Economist",
      headline: "I research the past for a thriving future.",
      headlineAccent: "thriving future.",
      body: "Wenhui (Hwei) Xu — MA student in Economic Data Analytics at the University of Toronto. I find patterns in data, estimate causes, and tell stories with numbers.",
      cta: {
        primary: { label: "Read my writing", href: "/writing" },
        secondary: { label: "Get in touch", href: "mailto:hui90785641@gmail.com" },
      },
    },
    stats: [
      { value: "3",        label: "Published papers" },
      { value: "4 yrs",   label: "Research experience" },
      { value: "Toronto", label: "Based in" },
      { value: "Hangzhou",label: "Originally from" },
    ],
    featured: {
      /** slug of the paper shown in the homepage teaser */
      paperSlug: "causal-inference-business",
      /** slug key of the tool shown in the homepage teaser */
      toolKey: "cantread",
    },
    writingSection: { label: "Latest Writing", allLabel: "All papers →" },
    toolsSection:   { label: "Open Source Tool" },
  },

  about: {
    overline: "Economist",
    name: "Wenhui Xu",
    nickname: "Hui (Hwei) - short for Wenhui",
    bio: [
      `As people always say: "There is nothing new under the sun." I research the past for a thriving future. Finding a pattern from data and pulling missing pieces together always fascinates me — I enjoy telling stories with numbers and talking about the lessons learned.`,
      `I am proud to be a student of the first course delivery of causal machine learning at UofT, led by Dr. Nazanin Khazra. With competency in Causal Inference for Business and Economic settings — using Python packages including EconML, DoWhy, and LightGBM — I work on questions where the difference between correlation and causation carries real consequences.`,
      `I have four years of project experience across data analytics, research, business analytics, and teaching. I appreciate the opportunity to ask — and attempt to answer — questions that matter, while being rigorous about method.`,
      `I am an interest-driven person; the thirst for knowledge drives me forward. But a more pressing question: what can I do with that knowledge? I am looking for like-minded collaborators. Together, we can do something different.`,
    ],
    /** Words that should be styled with accent colour inside bio paragraphs */
    bioAccentWords: ["EconML", "DoWhy", "LightGBM"],
    quickFacts: [
      { label: "Currently", value: "MA, Economic Data Analytics, University of Toronto" },
      { label: "Based in",  value: "Toronto, Canada" },
      { label: "From",      value: "Hangzhou, China" },
      { label: "Email",     value: "hui90785641@gmail.com", href: "mailto:hui90785641@gmail.com" },
      { label: "GitHub",    value: "oldmercy",              href: "https://github.com/oldmercy" },
      { label: "LinkedIn",  value: "huixu01",               href: "https://www.linkedin.com/in/huixu01/" },
    ],
    skills: {
      languages: ["Python", "R", "SQL", "SAS", "STATA"],
      tools:     ["Tableau", "PowerBI", "Excel", "GitHub"],
      libraries: ["EconML", "DoWhy", "SkLearn", "LightGBM", "Grf", "ggplot2", "xgboost", "dplyr"],
      models:    [
        "Double Machine Learning",
        "Causal Forest / GRF",
        "Regression & Classification Trees",
        "Gradient Boosting & Bagging",
        "Panel Data Models",
        "Time Series (ARMA, NNAR)",
        "VAR / VEC",
        "GMM / MLE",
      ],
    },
    hobbies: [
      { emoji: "📚", label: "Reading",   desc: "Both fiction and non-fiction — from economic history to literary fiction." },
      { emoji: "🎬", label: "Film",      desc: "Classic cinema and contemporary art-house; always looking for recommendations." },
      { emoji: "🧶", label: "Crochet",   desc: "A calming practice of turning yarn into something tangible and geometric." },
      { emoji: "🌱", label: "Gardening", desc: "Patient work — there is something deeply satisfying about watching things grow." },
      { emoji: "🍳", label: "Cooking",   desc: "Hangzhou-inflected home cooking, occasionally ambitious, often delicious." },
      { emoji: "🐱", label: "Cats",      desc: "A multi-cat household. They are research assistants who contribute nothing." },
    ],
  },

  writing: {
    overline: "Academic Writing",
    title: "Papers & Research",
    body: "Writing samples in economic research and business analytics — each available to read in full with optional TABE reading mode.",
    tabeLabel: "TABE reading mode",
    tabeHref: "/tools",
    earlierWork: "Earlier Work",
  },

  footer: {
    copyright: "© 2025 Wenhui Xu",
    links: [
      { label: "GitHub",   href: "https://github.com/oldmercy" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/huixu01/" },
      { label: "Email",    href: "mailto:hui90785641@gmail.com" },
    ],
  },
};

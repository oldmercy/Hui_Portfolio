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
      overline: "Evidence-Based Decision Systems",
      headline: "I build decision systems across research, data, policy, and workflow design.",
      headlineAccent: "workflow design.",
      body: "  I’m Wenhui “Hui” Xu, an economics-trained analyst based in Toronto. I turn messy evidence into analysis, writing, and tools for decisions people can trace, challenge, and trust.",
      cta: {
        primary: { label: "Read my writing", href: "/writing" },
        secondary: { label: "Get in touch", href: "mailto:hui90785641@gmail.com" },
      },
    },
    stats: [
      { value: "4 Terms", label: "Teaching econometrics across mixed-background audiences" },
      { value: "3 Domains", label: "Economic research, policy analysis, business analytics" },
      { value: "Public + internal", label: "Research and briefing outputs for academic and applied readers" },
      { value: "1 Tool", label: "Open-source reading system for dense text" },
    ],
    featured: {
      /** slug of the paper shown in the homepage teaser */
      paperSlug: "gender-gap-math",
      /** slug key of the tool shown in the homepage teaser */
      toolKey: "cantread",
    },
    writingSection: { label: "Selected Work", allLabel: "All Papers →" },
    toolsSection:   { label: "Workflow & Tool Systems" },
  },

  about: {
    overline: "About",
    name: "Wenhui Xu",
    nickname: "I go by Hui. I build evidence-based decision systems across research, data, policy, and workflow design.",
    bio: [
      `I work where data, evidence, and human judgment meet.`,
      `My background is in economics and data analytics, but the through-line in my work is not one method or one tool. I like problems where the source material is incomplete, the assumptions matter, and the output has to be useful to another person.`,
      `Across municipal economic research, econometrics teaching, policy writing, business analytics, and AI-assisted workflows, I tend to do the same thing: structure messy information, test claims against evidence, and turn the result into something people can inspect, challenge, and use.`,
      `That is why I care about workflow design. A good workflow protects judgment quality: it keeps sources visible, makes assumptions explicit, and prevents the final narrative from running ahead of the evidence.`,
    ],
    /** Words that should be styled with accent colour inside bio paragraphs */
    bioAccentWords: ["workflow design", "sources visible", "assumptions explicit", "evidence"],
    quickFacts: [
      { label: "Currently", value: "MA, Economic Data Analytics, University of Toronto" },
      { label: "Based in",  value: "Toronto, Canada" },
      { label: "From",      value: "Hangzhou, China" },
      { label: "Focus",     value: "Evidence-Based Decision Support" },
      { label: "Methods",   value: "Economics · Data Analytics · Workflow Design" },
      { label: "Email",     value: "hui90785641@gmail.com", href: "mailto:hui90785641@gmail.com" },
      { label: "GitHub",    value: "oldmercy",              href: "https://github.com/oldmercy" },
      { label: "LinkedIn",  value: "huixu01",               href: "https://www.linkedin.com/in/huixu01/" },
    ],
    approach: {
      evidence: [
        "Literature Review",
        "Source Mapping",
        "Claim Boundaries",
        "Policy Options",
      ],
      analysis: [
        "Econometrics",
        "Causal Inference",
        "Panel Data",
        "Business Analytics",
      ],
      communication: [
        "Policy Briefs",
        "Teaching Materials",
        "Public Profiles",
        "Stakeholder Writing",
      ],
      systems: [
        "Python Automation",
        "LLM Extraction",
        "TABE / CantRead",
        "Documentation & QA",
      ],
    },
    skills: {
      languages: ["Python", "R", "SQL", "SAS", "STATA", "Julia"],
      tools:     ["Excel", "Tableau", "Power BI", "Git", "GitHub", "LaTeX"],
      libraries: ["pandas", "NumPy", "statsmodels", "pyblp", "EconML", "DoWhy", "scikit-learn", "LightGBM", "xgboost", "ggplot2", "dplyr", "pdfplumber"],
      models:    [
        "Causal Inference",
        "Double Machine Learning",
        "Causal Forest / GRF",
        "Heterogeneous Treatment Effects",
        "Panel Data Models",
        "Dynamic Panel GMM",
        "Time Series Econometrics",
        "VAR / VEC",
        "Structural Demand Estimation",
        "BLP-Style Models",
        "Dynamic Programming / VFI",
        "Policy Option Analysis",
        "Monitoring & Evaluation Design",
        "Prompt Engineering",
        "LLM-Assisted Information Extraction",
      ],
    },
    hobbies: [
      { label: "Reading",   desc: "Fiction and non-fiction, especially economic history, social analysis, and literary fiction." },
      { label: "Film",      desc: "Classic cinema and contemporary art-house; always looking for recommendations." },
      { label: "Crochet",   desc: "A calming practice of turning yarn into something tangible and geometric." },
      { label: "Gardening", desc: "Patient work — there is something satisfying about watching things grow." },
      { label: "Cooking",   desc: "Hangzhou-inflected home cooking, occasionally ambitious, often practical." },
      { label: "Cats",      desc: "A multi-cat household. They remain deeply unhelpful research assistants." },
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

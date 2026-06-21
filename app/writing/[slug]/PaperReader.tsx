"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useTabe } from "@/app/components/ThemeProvider";
import { getAllPapers } from "@/lib/papers";
import type { Paper, PaperSection as Section } from "@/lib/papers";

/* ══════════════════════════════════════════════════════════════════
   PRETEXT — balanced headline calculation
   Uses @chenglou/pretext's Canvas-based text measurement to find
   the optimal line-break width so headlines never have a widow.
══════════════════════════════════════════════════════════════════ */
/*
 * useBalancedWidth — uses @chenglou/pretext's prepare() + measureLineStats()
 * to binary-search for the narrowest container width that produces the same
 * line count as the full-width render, eliminating typographic widows.
 *
 * API used:
 *   prepare(text, font)  → PreparedText
 *   measureLineStats(prepared, maxWidth) → { lineCount, maxLineWidth }
 */
function useBalancedWidth(
  text: string,
  containerRef: React.RefObject<HTMLElement>,
  font: string
): number | null {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;

    async function compute() {
      try {
        const { prepareWithSegments, measureLineStats } =
          await import("@chenglou/pretext");

        const containerWidth = containerRef.current?.offsetWidth ?? 600;
        if (containerWidth <= 0) return;

        const prepared = prepareWithSegments(text, font);

        // Line count at full container width (the baseline)
        const { lineCount: targetLines } = measureLineStats(prepared, containerWidth);

        if (targetLines <= 1) {
          // Single-line headline — no widow possible, no constraint needed
          if (!cancelled) setWidth(null);
          return;
        }

        // Binary-search: find the smallest width that keeps the same line count.
        // This squeezes out widows (last line with only 1–2 words) by allowing
        // the text to reflow into a more balanced shape.
        let lo = containerWidth * 0.45;
        let hi = containerWidth;
        let bestWidth = containerWidth;

        for (let i = 0; i < 16; i++) {
          const mid = (lo + hi) / 2;
          const { lineCount } = measureLineStats(prepared, mid);
          if (lineCount === targetLines) {
            bestWidth = mid;
            hi = mid;
          } else {
            lo = mid;
          }
        }

        if (!cancelled) setWidth(Math.ceil(bestWidth + 2)); // +2px safety margin
      } catch {
        // Graceful degradation: pretext unavailable (SSR / test env)
        if (!cancelled) setWidth(null);
      }
    }

    // Wait for fonts to be available before measuring
    const timer = setTimeout(compute, 150);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [text, font, containerRef]);

  return width;
}

/* ── Balanced headline component ─────────────────────────────────── */
function BalancedHeading({
  text,
  as: Tag = "h2",
  className,
  style,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Spectral 400 at approx rendered size — pretext measures canvas px
  const font = "400 32px Spectral, Georgia, serif";
  const balancedWidth = useBalancedWidth(text, ref as React.RefObject<HTMLElement>, font);

  return (
    <div ref={ref} className={className}>
      <Tag
        style={{
          maxWidth: balancedWidth ? `${balancedWidth}px` : undefined,
          ...style,
        }}
      >
        {text}
      </Tag>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   CANTREAD — TABE (Type-Annotated Body of Evidence) processor
   Uses compromise.js for NLP tagging, then wraps tokens in spans.
══════════════════════════════════════════════════════════════════ */
type TaggedToken = { text: string; tag: "noun" | "verb" | "adj" | "num" | "plain" };

async function tabeTagText(text: string): Promise<TaggedToken[]> {
  // Dynamically import compromise (large bundle, client-only)
  const nlp = (await import("compromise")).default;
  const doc = nlp(text);

  const tokens: TaggedToken[] = [];

  // Walk every term in order
  doc.terms().forEach((term: { text: () => string; has: (tag: string) => boolean }) => {
    const raw = term.text();
    if (!raw.trim()) { tokens.push({ text: raw, tag: "plain" }); return; }

    let tag: TaggedToken["tag"] = "plain";
    if (term.has("#Value") || term.has("#NumericValue") || /^\d[\d,\.%$]*$/.test(raw)) {
      tag = "num";
    } else if (term.has("#Noun") || term.has("#ProperNoun")) {
      tag = "noun";
    } else if (term.has("#Verb")) {
      tag = "verb";
    } else if (term.has("#Adjective") || term.has("#Adverb")) {
      tag = "adj";
    }
    tokens.push({ text: raw, tag });
  });

  return tokens;
}

function renderTagged(tokens: TaggedToken[]): React.ReactNode {
  return tokens.map((tok, i) => {
    if (tok.tag === "plain") return tok.text + " ";
    return (
      <span key={i} className={`tabe-${tok.tag}`}>
        {tok.text}{" "}
      </span>
    );
  });
}

/* ── TABE paragraph ─────────────────────────────────────────────── */
/*
 * Design: NLP tagging runs once on first activation and is cached.
 * CSS (html.tabe-mode) drives visible styling — toggling on/off is
 * purely a CSS switch, no re-tagging needed.  When tagged, we always
 * render the <span> tree so CSS can instantly show/hide the colours.
 */
function TabeParagraph({
  text,
  tabeActive,
  isFirst,
}: {
  text: string;
  tabeActive: boolean;
  isFirst: boolean;
}) {
  const [tagged, setTagged] = useState<TaggedToken[] | null>(null);
  const [processing, setProcessing] = useState(false);
  // Track whether we've ever kicked off tagging for this paragraph
  const hasTriggered = useRef(false);

  useEffect(() => {
    // Trigger on first activation; skip if already tagged or in-flight
    if (!tabeActive || hasTriggered.current) return;
    hasTriggered.current = true;
    setProcessing(true);
    tabeTagText(text).then((result) => {
      setTagged(result);
      setProcessing(false);
    });
  }, [tabeActive, text]);

  const baseClass = isFirst ? "drop-cap" : undefined;

  // Once tagged: always render spans — CSS (html.tabe-mode) controls colours
  if (tagged) {
    return (
      <p className={baseClass}>
        {renderTagged(tagged)}
      </p>
    );
  }

  // Not yet tagged
  return (
    <p className={baseClass}>
      {processing ? <span style={{ opacity: 0.5 }}>{text}</span> : text}
    </p>
  );
}

/* ══════════════════════════════════════════════════════════════════
   TABLE OF CONTENTS
══════════════════════════════════════════════════════════════════ */
function TOC({ sections, activeId }: { sections: Section[]; activeId: string }) {
  return (
    <nav aria-label="Table of contents" className="sticky top-24">
      <p
        className="text-2xs font-sans tracking-[0.16em] uppercase mb-4"
        style={{ color: "var(--text-tertiary)" }}
      >
        Contents
      </p>
      <ol className="flex flex-col gap-2">
        {sections.map((s, i) => {
          const id = s.heading.toLowerCase().replace(/\s+/g, "-");
          const active = activeId === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className="flex items-start gap-2 text-sm font-serif leading-snug transition-colors duration-150 group"
                style={{ color: active ? "var(--accent)" : "var(--text-tertiary)" }}
              >
                <span
                  className="mt-1.5 shrink-0 w-3 h-px transition-all duration-200"
                  style={{
                    backgroundColor: active ? "var(--accent)" : "var(--border-strong)",
                    width: active ? "1.25rem" : "0.75rem",
                  }}
                />
                <span className="group-hover:text-[var(--text-primary)] transition-colors">
                  {s.heading}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN PAPER READER
══════════════════════════════════════════════════════════════════ */
export default function PaperReader({ paper }: { paper: Paper }) {
  const { tabeActive, toggleTabe } = useTabe();
  const [activeSection, setActiveSection] = useState("");
  const [readProgress, setReadProgress] = useState(0);
  const articleRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const sections = useMemo(() => (paper.body ?? []) as Section[], [paper.body]);

  // Reading progress bar
  useEffect(() => {
    const handler = () => {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / total));
      setReadProgress(progress);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Active section tracking (intersection observer)
  useEffect(() => {
    const headings = document.querySelectorAll<HTMLElement>("h2[data-section]");
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [sections]);

  // TABE balanced title font string
  const titleFont = "300 56px Spectral, Georgia, serif";
  const balancedTitleWidth = useBalancedWidth(paper.title, titleRef as React.RefObject<HTMLElement>, titleFont);

  return (
    <div className="relative">
      {/* ── Progress bar ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="fixed top-16 left-0 z-40 h-0.5 transition-all duration-100"
        style={{
          width: `${readProgress * 100}%`,
          backgroundColor: "var(--accent)",
        }}
      />

      {/* ── Paper hero ───────────────────────────────────────── */}
      <div
        className="relative border-b overflow-hidden"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-subtle)" }}
      >
        {/* Faint cover image blurred as texture */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          aria-hidden="true"
          style={{ backgroundImage: `url(${paper.coverImage})`, backgroundSize: "cover", backgroundPosition: "center", filter: "blur(40px) saturate(0.5)" }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-[1fr_auto] gap-12 items-end">
          <div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8 text-xs font-sans" style={{ color: "var(--text-tertiary)" }}>
              <Link href="/writing" className="hover:text-[var(--accent)] transition-colors link-underline">
                Writing
              </Link>
              <span>/</span>
              <span>{paper.category}</span>
            </div>

            {/* Title with pretext balanced line-breaks */}
            <div ref={titleRef} className="mb-6">
              <h1
                className="font-serif font-light"
                style={{
                  fontSize: "clamp(1.9rem, 4vw, 3.25rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.028em",
                  color: "var(--text-primary)",
                  maxWidth: balancedTitleWidth ? `${balancedTitleWidth}px` : "22ch",
                  transition: "max-width 0.3s ease",
                }}
              >
                {paper.title}
              </h1>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6">
              <span className="font-serif italic" style={{ color: "var(--text-secondary)" }}>
                Wenhui Xu
              </span>
              <MetaDot />
              <span className="text-sm font-sans" style={{ color: "var(--text-tertiary)" }}>
                {paper.year}
              </span>
              <MetaDot />
              <span className="text-sm font-sans" style={{ color: "var(--text-tertiary)" }}>
                {paper.readingTime} min read
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {paper.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-2xs font-sans tracking-wide px-2 py-0.5 border"
                  style={{ borderColor: "var(--border-strong)", color: "var(--text-tertiary)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Cover image */}
          <div className="hidden md:block">
            <div className="w-36 lg:w-44 aspect-[3/4] overflow-hidden shadow-xl" style={{ border: "0.5px solid var(--border)" }}>
              <img
                src={paper.coverImage}
                alt={`Cover: ${paper.title}`}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Controls bar ─────────────────────────────────────── */}
      <div
        className="sticky top-16 z-30 border-b"
        style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
      >
        <div className="max-w-5xl mx-auto px-6 h-11 flex items-center justify-between">
          {/* Left: abstract label */}
          <span className="text-2xs font-sans tracking-[0.16em] uppercase" style={{ color: "var(--text-tertiary)" }}>
            {paper.category}
          </span>

          {/* Right: TABE toggle + PDF link */}
          <div className="flex items-center gap-4">
            {/* TABE toggle */}
            <button
              onClick={toggleTabe}
              className="flex items-center gap-2 text-xs font-sans tracking-wide px-3 py-1.5 border transition-all duration-200"
              style={{
                borderColor: tabeActive ? "var(--accent)" : "var(--border)",
                color: tabeActive ? "var(--accent)" : "var(--text-tertiary)",
                backgroundColor: tabeActive ? "color-mix(in srgb, var(--accent) 8%, transparent)" : "transparent",
              }}
              title="Toggle TABE reading mode — colour-codes nouns, verbs, adjectives, and numbers for easier scanning"
            >
              <BrainIcon />
              {tabeActive ? "TABE on" : "Reading mode"}
            </button>

            {/* PDF download */}
            <a
              href={paper.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-sans transition-colors duration-150 hover:text-[var(--accent)]"
              style={{ color: "var(--text-tertiary)" }}
            >
              <DownloadIcon />
              PDF
            </a>
          </div>
        </div>
      </div>

      {/* TABE legend (shown when active) */}
      {tabeActive && (
        <div
          className="border-b px-6 py-2"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-subtle)" }}
        >
          <div className="max-w-5xl mx-auto flex flex-wrap gap-x-6 gap-y-1 items-center text-2xs font-sans">
            <span style={{ color: "var(--text-tertiary)" }}>TABE legend:</span>
            <span className="tabe-mode"><span className="tabe-noun">Bold</span> = noun</span>
            <span className="tabe-mode"><span className="tabe-verb">Yellow bg</span> = verb</span>
            <span className="tabe-mode"><span className="tabe-adj">Italic green</span> = adjective/adverb</span>
            <span className="tabe-mode"><span className="tabe-num">Orange</span> = number</span>
          </div>
        </div>
      )}

      {/* ── Body: TOC + article ───────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid lg:grid-cols-[200px_1fr] xl:grid-cols-[220px_1fr] gap-16 pt-16 pb-32">

          {/* TOC — desktop only */}
          {sections.length > 0 && (
            <aside className="hidden lg:block">
              <TOC sections={sections} activeId={activeSection} />
            </aside>
          )}

          {/* Article */}
          <article
            ref={articleRef}
            data-tabe-reader="true"
            className={`prose-reading max-w-[68ch] ${tabeActive ? "tabe-mode" : ""}`}
          >
            {/* Abstract */}
            <section className="mb-12 pb-8 border-b" style={{ borderColor: "var(--border)" }}>
              <p
                className="text-2xs font-sans tracking-[0.16em] uppercase mb-3"
                style={{ color: "var(--text-tertiary)" }}
              >
                Abstract
              </p>
              <p
                className="font-serif leading-relaxed"
                style={{ color: "var(--text-secondary)", fontStyle: "italic" }}
              >
                {paper.abstract}
              </p>
            </section>

            {/* Sections */}
            {sections.map((section, si) => (
              <section key={si} className="mb-12">
                {/* Section heading — pretext balanced */}
                <SectionHeading text={section.heading} />

                {/* Paragraphs with optional TABE tagging */}
                {section.paragraphs.map((para, pi) => (
                  <TabeParagraph
                    key={pi}
                    text={para}
                    tabeActive={tabeActive}
                    isFirst={si === 0 && pi === 0}
                  />
                ))}

                {/* Optional bullet list */}
                {section.items && section.items.length > 0 && (
                  <ul className="my-4 flex flex-col gap-2" style={{ paddingLeft: "1.25rem" }}>
                    {section.items.map((item, ii) => (
                      <li key={ii} className="font-serif leading-relaxed" style={{ color: "var(--text-secondary)", listStyleType: "disc" }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Optional closing paragraph after list */}
                {section.closing && (
                  <TabeParagraph text={section.closing} tabeActive={tabeActive} isFirst={false} />
                )}
              </section>
            ))}

            {/* Closing rule + nav */}
            <div className="mt-16 pt-8 border-t" style={{ borderColor: "var(--border)" }}>
              <PaperNav currentSlug={paper.slug} />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

/* ── Section heading with pretext balance ─────────────────────────── */
function SectionHeading({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const id = text.toLowerCase().replace(/\s+/g, "-");
  const font = "600 24px Spectral, Georgia, serif";
  const balanced = useBalancedWidth(text, ref as React.RefObject<HTMLElement>, font);

  return (
    <div ref={ref}>
      <h2
        id={id}
        data-section="true"
        style={{
          maxWidth: balanced ? `${balanced}px` : undefined,
          fontFamily: "Spectral, Georgia, serif",
          fontWeight: 600,
          fontSize: "clamp(1.25rem, 2vw, 1.55rem)",
          lineHeight: 1.25,
          letterSpacing: "-0.015em",
          color: "var(--text-primary)",
          margin: "2.5em 0 0.75em",
        }}
      >
        {text}
      </h2>
    </div>
  );
}

/* ── Previous / Next paper navigation ────────────────────────────── */
function PaperNav({ currentSlug }: { currentSlug: string }) {
  const allPapers = getAllPapers("en");
  const idx = allPapers.findIndex((p) => p.slug === currentSlug);
  const prev = idx < allPapers.length - 1 ? allPapers[idx + 1] : null;
  const next = idx > 0 ? allPapers[idx - 1] : null;

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {prev && (
        <Link
          href={`/writing/${prev.slug}`}
          className="group flex flex-col gap-1 p-4 border transition-colors duration-150 hover:border-[var(--accent)]"
          style={{ borderColor: "var(--border)" }}
        >
          <span className="text-2xs font-sans tracking-wide uppercase" style={{ color: "var(--text-tertiary)" }}>
            ← Earlier paper
          </span>
          <span className="font-serif text-sm group-hover:text-[var(--accent)] transition-colors" style={{ color: "var(--text-primary)" }}>
            {prev.title}
          </span>
        </Link>
      )}
      {next && (
        <Link
          href={`/writing/${next.slug}`}
          className="group flex flex-col gap-1 p-4 border transition-colors duration-150 hover:border-[var(--accent)] text-right sm:col-start-2"
          style={{ borderColor: "var(--border)" }}
        >
          <span className="text-2xs font-sans tracking-wide uppercase" style={{ color: "var(--text-tertiary)" }}>
            Newer paper →
          </span>
          <span className="font-serif text-sm group-hover:text-[var(--accent)] transition-colors" style={{ color: "var(--text-primary)" }}>
            {next.title}
          </span>
        </Link>
      )}
    </div>
  );
}

/* ── Shared icons ─────────────────────────────────────────────────── */
function MetaDot() {
  return <span aria-hidden="true" style={{ color: "var(--border-strong)" }}>·</span>;
}

function BrainIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2a3 3 0 0 0-3 2.83V5a3 3 0 0 0-3 3v1a3 3 0 0 0 1 2.24V14a4 4 0 0 0 4 4h5a4 4 0 0 0 4-4v-2.76A3 3 0 0 0 18.5 9V8a3 3 0 0 0-3-3v-.17A3 3 0 0 0 12.5 2z"/>
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

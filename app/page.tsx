"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useTheme } from "./components/ThemeProvider";
import { getSiteContent } from "@/lib/site-content";
import { getToolsContent } from "@/lib/site-content";
import { getFeaturedPaper } from "@/lib/papers";

const c        = getSiteContent("en");
const hero     = c.home.hero;
const stats    = c.home.stats;
const sections = c.home;
const featured = getFeaturedPaper("en");
const tc       = getToolsContent("en");
const teaser   = tc.homeTeaser;

export default function Home() {
  const { theme } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);

  // Subtle parallax on scroll
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handler = () => {
      const y = window.scrollY;
      el.style.transform = `translateY(${y * 0.12}px)`;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col justify-center px-6 max-w-5xl mx-auto">
        {/* Large calligraphy watermark behind content */}
        <div
          ref={heroRef}
          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
          aria-hidden="true"
          style={{ opacity: theme === "dark" ? 0.07 : 0.06 }}
        >
          <img
            src="/hui_calligraphy_CDW_full.png"
            alt=""
            style={{ height: "min(80vh, 640px)", width: "auto", filter: theme === "dark" ? "invert(1)" : "none" }}
          />
        </div>

        <div className="relative z-10 max-w-[46rem]">
          {/* Overline */}
          <p
            className="text-xs font-sans tracking-[0.18em] uppercase mb-6 animate-fade-up"
            style={{ color: "var(--text-tertiary)", animationDelay: "0ms" }}
          >
            {hero.overline}
          </p>

          {/* Headline — accent word is driven by content */}
          <h1
            className="font-serif font-light mb-8 animate-fade-up"
            style={{
              fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              animationDelay: "80ms",
            }}
          >
            {hero.headline.replace(hero.headlineAccent, "").trimEnd()}{" "}
            <br className="hidden sm:block" />
            {hero.headline.includes("for a") && "for a "}
            <span style={{ color: "var(--accent)", fontStyle: "italic", fontWeight: 400 }}>
              {hero.headlineAccent}
            </span>
          </h1>

          {/* Body */}
          <p
            className="font-serif text-lg leading-relaxed mb-10 animate-fade-up"
            style={{ color: "var(--text-secondary)", maxWidth: "44ch", animationDelay: "160ms" }}
          >
            {hero.body}
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap gap-4 mb-16 animate-fade-up" style={{ animationDelay: "240ms" }}>
            <Link
              href={hero.cta.primary.href}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-sans tracking-wide transition-all duration-200 rounded-none"
              style={{
                backgroundColor: "var(--text-primary)",
                color: "var(--bg)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "var(--text-primary)";
              }}
            >
              {hero.cta.primary.label}
              <ArrowRight />
            </Link>
            <a
              href={hero.cta.secondary.href}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-sans tracking-wide transition-all duration-200 border"
              style={{
                borderColor: "var(--border-strong)",
                color: "var(--text-secondary)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                (e.currentTarget as HTMLElement).style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
              }}
            >
              {hero.cta.secondary.label}
            </a>
          </div>

          {/* Divider rule */}
          <span className="sp-rule animate-fade-up" style={{ animationDelay: "300ms" }} />

          {/* Quick stats */}
          <div
            className="flex flex-wrap gap-x-10 gap-y-4 mt-8 animate-fade-up"
            style={{ animationDelay: "360ms" }}
          >
            {stats.map(({ value: num, label }) => (
              <div key={label}>
                <p className="font-serif text-2xl font-light" style={{ color: "var(--text-primary)" }}>{num}</p>
                <p className="text-xs tracking-wide mt-0.5" style={{ color: "var(--text-tertiary)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in"
          style={{ animationDelay: "800ms", color: "var(--text-tertiary)" }}
          aria-hidden="true"
        >
          <span className="text-2xs tracking-[0.2em] uppercase">Scroll</span>
          <ChevronDown />
        </div>
      </section>

      {/* ── Featured paper teaser ──────────────────────────────── */}
      <FeaturedTeaser />

      {/* ── Tools teaser ──────────────────────────────────────── */}
      <ToolsTeaser />
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────────────── */

function FeaturedTeaser() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && el.classList.add("visible")),
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="px-6 max-w-5xl mx-auto py-24 scroll-reveal" ref={ref}>
      <div className="flex items-baseline justify-between mb-8">
        <p className="text-xs font-sans tracking-[0.18em] uppercase" style={{ color: "var(--text-tertiary)" }}>
          {sections.writingSection.label}
        </p>
        <Link href="/writing" className="text-sm link-underline" style={{ color: "var(--accent)" }}>
          {sections.writingSection.allLabel}
        </Link>
      </div>

      <Link
        href={`/writing/${featured.slug}`}
        className="group block border transition-colors duration-200"
        style={{ borderColor: "var(--border)" }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
      >
        <div className="grid md:grid-cols-[1fr_auto] gap-0">
          {/* Left: text */}
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xs font-sans tracking-[0.15em] uppercase px-2 py-0.5" style={{ backgroundColor: "var(--bg-subtle)", color: "var(--text-tertiary)" }}>
                {featured.category}
              </span>
              <span className="text-2xs" style={{ color: "var(--text-tertiary)" }}>{featured.year}</span>
            </div>

            <h2
              className="font-serif font-light mb-4 group-hover:text-[var(--accent)] transition-colors duration-200"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              {featured.title}
            </h2>

            <p className="font-serif text-base leading-relaxed mb-6" style={{ color: "var(--text-secondary)", maxWidth: "54ch" }}>
              {featured.abstract}
            </p>

            <div className="flex items-center gap-2 text-sm" style={{ color: "var(--accent)" }}>
              <span>Read paper</span>
              <ArrowRight />
            </div>
          </div>

          {/* Right: cover image */}
          <div
            className="hidden md:block w-56 lg:w-72 overflow-hidden"
            style={{ backgroundColor: "var(--bg-subtle)" }}
          >
            <img
              src={featured.coverImage}
              alt="Paper cover thumbnail"
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </Link>
    </section>
  );
}

function ToolsTeaser() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && el.classList.add("visible")),
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="px-6 max-w-5xl mx-auto pb-32 scroll-reveal" ref={ref}>
      <span className="sp-rule mb-16 block" />
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-sans tracking-[0.18em] uppercase mb-4" style={{ color: "var(--text-tertiary)" }}>
            {sections.toolsSection.label}
          </p>
          <h2
            className="font-serif font-light mb-4"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", lineHeight: 1.2, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
          >
            {teaser.title}
          </h2>
          <p className="font-serif leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
            {teaser.body}
          </p>
          <Link href={teaser.linkHref} className="text-sm link-underline" style={{ color: "var(--accent)" }}>
            {teaser.linkLabel}
          </Link>
        </div>

        {/* Mini TABE demo — static preview, always "on" visually */}
        <div
          className="p-6 border font-serif text-base leading-relaxed tabe-mode"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
        >
          <p className="text-2xs tracking-[0.15em] uppercase mb-4 font-sans" style={{ color: "var(--text-tertiary)" }}>
            {teaser.previewLabel}
          </p>
          <p>
            <span className="tabe-noun">Causal inference</span>{" "}
            <span className="tabe-verb">has transformed</span> how{" "}
            <span className="tabe-noun">economists</span>{" "}
            <span className="tabe-verb">evaluate</span>{" "}
            <span className="tabe-adj">complex</span>{" "}
            <span className="tabe-noun">policies</span>. A{" "}
            <span className="tabe-adj">single</span>{" "}
            <span className="tabe-noun">study</span> can{" "}
            <span className="tabe-verb">influence</span>{" "}
            <span className="tabe-num">millions</span> of{" "}
            <span className="tabe-noun">decisions</span>.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Icons ──────────────────────────────────────────────────────── */
function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}

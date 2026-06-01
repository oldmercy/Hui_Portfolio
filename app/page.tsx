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
const headlineLead = hero.headline.replace(hero.headlineAccent, "").trimEnd();

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
      <section className="relative min-h-[100svh] flex flex-col justify-center px-6 py-20 md:py-24 max-w-5xl mx-auto">
        {/* Large calligraphy watermark behind content */}
        <div
          ref={heroRef}
          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
          aria-hidden="true"
          style={{ opacity: theme === "dark" ? 0.055 : 0.045 }}
        >
          <img
            src="/hui_calligraphy_CDW_full.png"
            alt=""
            style={{ height: "min(72vh, 560px)", width: "auto", filter: theme === "dark" ? "invert(1)" : "none" }}
          />
        </div>

        <div className="relative z-10 max-w-[58rem]">
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
              fontSize: "clamp(2.7rem, 5vw, 4.6rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              animationDelay: "80ms",
            }}
          >
            {headlineLead}{" "}
            <span style={{ color: "var(--accent)", fontStyle: "italic", fontWeight: 400 }}>
              {hero.headlineAccent}
            </span>
          </h1>

          {/* Body */}
          <p
            className="font-serif text-lg leading-relaxed mb-10 animate-fade-up"
            style={{ color: "var(--text-secondary)", maxWidth: "48ch", animationDelay: "160ms" }}
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-7 mt-8 animate-fade-up"
            style={{ animationDelay: "360ms" }}
          >
            {stats.map(({ value: num, label }) => (
              <div key={label}>
                <p className="font-serif text-[1.7rem] leading-none font-light" style={{ color: "var(--text-primary)" }}>{num}</p>
                <p className="text-xs leading-snug mt-2" style={{ color: "var(--text-tertiary)" }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div
            className="mt-10 hidden md:flex flex-col items-center gap-2 animate-fade-in"
            style={{ animationDelay: "800ms", color: "var(--text-tertiary)" }}
            aria-hidden="true"
          >
            <span className="text-2xs tracking-[0.2em] uppercase">Scroll</span>
            <ChevronDown />
          </div>
        </div>
      </section>

      {/* ── Featured paper teaser ──────────────────────────────── */}
      <FeaturedTeaser />

      {/* ── Teaching teaser ────────────────────────────────────── */}
      <TeachingTeaser />

      {/* ── Applied public analysis teaser ─────────────────────── */}
      <BedtTeaser />

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
    <section className="px-6 max-w-5xl mx-auto pt-24 pb-14 scroll-reveal" ref={ref}>
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
        style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)", boxShadow: "0 18px 60px rgba(21, 24, 23, 0.04)" }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
      >
        <div className="grid md:grid-cols-[1fr_auto] gap-0">
          {/* Left: text */}
          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-2xs font-sans tracking-[0.15em] uppercase px-2 py-0.5" style={{ backgroundColor: "color-mix(in srgb, var(--accent) 10%, var(--surface))", color: "var(--accent)" }}>
                Method-Rigorous Analysis
              </span>
              <span className="text-2xs" style={{ color: "var(--text-tertiary)" }}>{featured.category} · {featured.year}</span>
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

function TeachingTeaser() {
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
    <section className="px-6 max-w-5xl mx-auto pb-14 scroll-reveal" ref={ref}>
      <Link
        href="/teaching"
        className="group block border transition-colors duration-200 overflow-hidden"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)", boxShadow: "0 18px 60px rgba(21, 24, 23, 0.04)" }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
      >
        <div className="grid md:grid-cols-[1fr_auto] gap-0">
          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-2xs font-sans tracking-[0.15em] uppercase px-2 py-0.5" style={{ backgroundColor: "color-mix(in srgb, var(--accent) 10%, var(--surface))", color: "var(--accent)" }}>
                Decision-Ready Communication
              </span>
              <span className="text-2xs" style={{ color: "var(--text-tertiary)" }}>4 Terms · Stata/R</span>
            </div>

            <h2
              className="font-serif font-light mb-4 group-hover:text-[var(--accent)] transition-colors duration-200"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              Econometrics Teaching Materials
            </h2>

            <p className="font-serif text-base leading-relaxed mb-6" style={{ color: "var(--text-secondary)", maxWidth: "54ch" }}>
              Tutorial flows, worked examples, and Stata/R demos designed to help mixed-background students move from econometric theory to implementation-ready workflows.
            </p>

            <div className="flex items-center gap-2 text-sm" style={{ color: "var(--accent)" }}>
              <span>View Teaching Materials</span>
              <ArrowRight />
            </div>
          </div>

          <div
            className="hidden md:flex w-56 lg:w-72 items-center justify-center p-8"
            style={{ backgroundColor: "var(--bg-hover)" }}
          >
            <div className="font-serif text-center" style={{ color: "var(--text-primary)" }}>
              <p className="text-5xl font-light leading-none">ECO</p>
              <p className="mt-3 text-xs font-sans tracking-[0.18em] uppercase" style={{ color: "var(--text-tertiary)" }}>
                Teaching
              </p>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}

function BedtTeaser() {
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
    <section className="px-6 max-w-5xl mx-auto pb-14 scroll-reveal" ref={ref}>
      <div
        className="group block border transition-colors duration-200"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)", boxShadow: "0 18px 60px rgba(21, 24, 23, 0.04)" }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
      >
        <div className="grid md:grid-cols-[1fr_auto] gap-0">
          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-2xs font-sans tracking-[0.15em] uppercase px-2 py-0.5" style={{ backgroundColor: "color-mix(in srgb, var(--accent) 10%, var(--surface))", color: "var(--accent)" }}>
                Evidence-Based Applied Analysis
              </span>
              <span className="text-2xs" style={{ color: "var(--text-tertiary)" }}>Public Profiles</span>
            </div>

            <h2
              className="font-serif font-light mb-4 group-hover:text-[var(--accent)] transition-colors duration-200"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
            >
              Municipal Economic Profiles
            </h2>

            <p className="font-serif text-base leading-relaxed mb-6" style={{ color: "var(--text-secondary)", maxWidth: "54ch" }}>
              Public-facing economic and labour-market profiles that translate business, demographic, and talent indicators into stakeholder-ready municipal analysis.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <a
                href="/Work/BEDT/competitive-business-profile-2024.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
                style={{ color: "var(--accent)" }}
                onClick={(e) => e.stopPropagation()}
              >
                Competitive Business Profile
              </a>
              <a
                href="/Work/BEDT/labour-talent-pool-data-profile.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
                style={{ color: "var(--accent)" }}
                onClick={(e) => e.stopPropagation()}
              >
                Labour & Talent Pool Profile
              </a>
            </div>
          </div>

          <div
            className="hidden md:flex w-56 lg:w-72 items-center justify-center p-8"
            style={{ backgroundColor: "var(--bg-hover)" }}
          >
            <div className="font-serif text-center" style={{ color: "var(--text-primary)" }}>
              <p className="text-5xl font-light leading-none">BEDT</p>
              <p className="mt-3 text-xs font-sans tracking-[0.18em] uppercase" style={{ color: "var(--text-tertiary)" }}>
                Public Analysis
              </p>
            </div>
          </div>
        </div>
      </div>
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
      <Link
        href={teaser.linkHref}
        className="group block border transition-colors duration-200"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)", boxShadow: "0 18px 60px rgba(21, 24, 23, 0.04)" }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
      >
        <div className="grid md:grid-cols-[1fr_auto] gap-0">
          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-2xs font-sans tracking-[0.15em] uppercase px-2 py-0.5" style={{ backgroundColor: "color-mix(in srgb, var(--accent) 10%, var(--surface))", color: "var(--accent)" }}>
                {sections.toolsSection.label}
              </span>
              <span className="text-2xs" style={{ color: "var(--text-tertiary)" }}>Open Source Tool</span>
            </div>

          <h2
            className="font-serif font-light mb-4 group-hover:text-[var(--accent)] transition-colors duration-200"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text-primary)" }}
          >
            {teaser.title}
          </h2>

          <p className="font-serif text-base leading-relaxed mb-6" style={{ color: "var(--text-secondary)", maxWidth: "54ch" }}>
            {teaser.body}
          </p>

            <div className="flex items-center gap-2 text-sm" style={{ color: "var(--accent)" }}>
              <span>{teaser.linkLabel.replace(" →", "")}</span>
              <ArrowRight />
            </div>
          </div>

        {/* Mini TABE demo — static preview, always "on" visually */}
        <div
          className="hidden md:block w-56 lg:w-72 p-6 font-serif text-base leading-relaxed tabe-mode"
          style={{ backgroundColor: "var(--bg-hover)" }}
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
      </Link>
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

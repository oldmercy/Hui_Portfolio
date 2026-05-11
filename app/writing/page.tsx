"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getAllPapers } from "@/lib/papers";
import type { Paper } from "@/lib/papers";
import { getSiteContent } from "@/lib/site-content";

const { writing: wc } = getSiteContent("en");

export default function WritingPage() {
  const papers = getAllPapers("en");
  const featured = papers[0];
  const rest = papers.slice(1);

  return (
    <div className="max-w-5xl mx-auto px-6 pb-32">
      {/* ── Page header ────────────────────────────────────────── */}
      <div className="pt-16 pb-12 border-b" style={{ borderColor: "var(--border)" }}>
        <p
          className="text-xs font-sans tracking-[0.18em] uppercase mb-4"
          style={{ color: "var(--text-tertiary)" }}
        >
          {wc.overline}
        </p>
        <h1
          className="font-serif font-light"
          style={{
            fontSize: "clamp(2rem, 4vw, 3.25rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: "var(--text-primary)",
          }}
        >
          {wc.title}
        </h1>
        <p
          className="font-serif mt-4 max-w-[52ch]"
          style={{ color: "var(--text-secondary)", fontSize: "1.0625rem" }}
        >
          {wc.body.split(wc.tabeLabel)[0]}
          <Link href={wc.tabeHref} className="link-underline" style={{ color: "var(--accent)" }}>
            {wc.tabeLabel}
          </Link>
          {wc.body.split(wc.tabeLabel)[1]}
        </p>
      </div>

      {/* ── Featured: latest paper — full hero ─────────────────── */}
      <HeroCard paper={featured} />

      {/* ── Rule + "Earlier work" label ─────────────────────────── */}
      {rest.length > 0 && (
        <>
          <div className="flex items-center gap-4 mt-20 mb-10">
            <span
              className="text-xs font-sans tracking-[0.18em] uppercase"
              style={{ color: "var(--text-tertiary)" }}
            >
              {wc.earlierWork}
            </span>
            <span className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
          </div>

          {/* ── Older papers — stacked list ──────────────────────── */}
          <ol className="flex flex-col gap-0">
            {rest.map((paper, i) => (
              <PaperListRow key={paper.slug} paper={paper} index={i} />
            ))}
          </ol>
        </>
      )}
    </div>
  );
}

/* ─── Hero card (featured / newest paper) ───────────────────────── */
function HeroCard({ paper }: { paper: Paper }) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && el.classList.add("visible")),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      role="article"
      className="scroll-reveal group mt-12 border transition-all duration-300 relative overflow-hidden cursor-pointer"
      style={{ borderColor: "var(--border)" }}
      onClick={() => router.push(`/writing/${paper.slug}`)}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
      }}
    >
      {/* "Latest" badge */}
      <div className="absolute top-6 right-6 z-10">
        <span
          className="text-2xs font-sans tracking-[0.15em] uppercase px-2 py-1"
          style={{ backgroundColor: "var(--accent)", color: "#fff" }}
        >
          Latest
        </span>
      </div>

      <div className="grid md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_360px]">
        {/* Text side */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-between min-h-[320px]">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <CategoryPill label={paper.category} />
              <span className="text-2xs font-sans" style={{ color: "var(--text-tertiary)" }}>
                {paper.year}
              </span>
              <span className="text-2xs font-sans" style={{ color: "var(--text-tertiary)" }}>
                · {paper.readingTime} min read
              </span>
            </div>

            <h2
              className="font-serif font-light mb-5 group-hover:text-[var(--accent)] transition-colors duration-200"
              style={{
                fontSize: "clamp(1.6rem, 3.2vw, 2.5rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.022em",
                color: "var(--text-primary)",
              }}
            >
              {paper.title}
            </h2>

            <p
              className="font-serif leading-relaxed"
              style={{ color: "var(--text-secondary)", maxWidth: "58ch", fontSize: "1.0625rem" }}
            >
              {paper.abstract}
            </p>
          </div>

          <div className="mt-8 flex items-center gap-6">
            {/* Read link — proper <a> wrapping, no nesting issues */}
            <Link
              href={`/writing/${paper.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-sm transition-colors duration-150"
              style={{ color: "var(--accent)" }}
            >
              <span>Read paper</span>
              <ArrowRight />
            </Link>
            <a
              href={paper.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-sm transition-colors duration-150 hover:text-[var(--accent)]"
              style={{ color: "var(--text-tertiary)" }}
            >
              <PDFIcon />
              PDF
            </a>
          </div>
        </div>

        {/* Cover image side */}
        <div
          className="hidden md:flex items-center justify-center p-8"
          style={{ backgroundColor: "var(--bg-subtle)" }}
        >
          <div className="w-full max-w-[220px] aspect-[3/4] overflow-hidden shadow-lg">
            <img
              src={paper.coverImage}
              alt={`Cover for ${paper.title}`}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Tag strip */}
      <div
        className="px-8 md:px-12 lg:px-16 py-4 border-t flex items-center gap-3 flex-wrap"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-subtle)" }}
      >
        {paper.tags.map((tag) => (
          <span
            key={tag}
            className="text-2xs font-sans tracking-wide"
            style={{ color: "var(--text-tertiary)" }}
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Older paper row ────────────────────────────────────────────── */
function PaperListRow({ paper, index }: { paper: Paper; index: number }) {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && el.classList.add("visible")),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <li
      ref={ref}
      className="scroll-reveal border-b"
      style={{ borderColor: "var(--border)", animationDelay: `${index * 80}ms` }}
    >
      <Link
        href={`/writing/${paper.slug}`}
        className="group flex items-start gap-6 py-8 transition-colors duration-150"
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.paddingLeft = "0.5rem";
          (e.currentTarget as HTMLElement).style.transition = "padding 0.2s ease";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.paddingLeft = "0";
        }}
      >
        {/* Index number */}
        <span
          className="font-serif text-4xl font-light leading-none pt-1 w-10 shrink-0 select-none"
          style={{ color: "var(--border-strong)" }}
        >
          {String(index + 2).padStart(2, "0")}
        </span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <CategoryPill label={paper.category} />
            <span className="text-2xs font-sans" style={{ color: "var(--text-tertiary)" }}>
              {paper.year}
            </span>
          </div>
          <h3
            className="font-serif font-light mb-2 group-hover:text-[var(--accent)] transition-colors duration-200"
            style={{
              fontSize: "clamp(1.15rem, 2.2vw, 1.5rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.018em",
              color: "var(--text-primary)",
            }}
          >
            {paper.title}
          </h3>
          <p
            className="font-serif text-sm leading-relaxed line-clamp-2"
            style={{ color: "var(--text-secondary)" }}
          >
            {paper.abstract}
          </p>
        </div>

        {/* Thumbnail (desktop) */}
        <div className="hidden lg:block w-24 h-32 shrink-0 overflow-hidden" style={{ backgroundColor: "var(--bg-subtle)" }}>
          <img
            src={paper.coverImage}
            alt=""
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Arrow */}
        <div
          className="hidden md:flex items-center self-center shrink-0 transition-transform duration-200 group-hover:translate-x-1"
          style={{ color: "var(--text-tertiary)" }}
        >
          <ArrowRight />
        </div>
      </Link>
    </li>
  );
}

/* ─── Shared atoms ───────────────────────────────────────────────── */
function CategoryPill({ label }: { label: string }) {
  return (
    <span
      className="text-2xs font-sans tracking-[0.13em] uppercase px-2 py-0.5"
      style={{ backgroundColor: "var(--bg-hover)", color: "var(--text-tertiary)" }}
    >
      {label}
    </span>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function PDFIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { teachingContentEn as c } from "@/content/teaching/en";

function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && el.classList.add("visible")),
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="scroll-reveal" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function PdfIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

export default function TeachingPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 pb-32">

      {/* Header */}
      <div className="pt-16 pb-12 border-b" style={{ borderColor: "var(--border)" }}>
        <p className="text-xs font-sans tracking-[0.18em] uppercase mb-4" style={{ color: "var(--text-tertiary)" }}>
          {c.overline}
        </p>
        <h1
          className="font-serif font-light mb-4"
          style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.1, letterSpacing: "-0.025em", color: "var(--text-primary)" }}
        >
          {c.title}
        </h1>
        <p className="font-serif max-w-[60ch]" style={{ color: "var(--text-secondary)", fontSize: "1.0625rem" }}>
          {c.body}
        </p>
        <p className="mt-3 text-xs font-sans tracking-wide" style={{ color: "var(--text-tertiary)" }}>
          {c.course}
        </p>
      </div>

      {/* R Tutorials Section */}
      <RevealSection>
        <section className="pt-14 pb-4">
          <div className="flex items-baseline gap-4 mb-2">
            <p className="text-xs font-sans tracking-[0.18em] uppercase" style={{ color: "var(--accent)" }}>
              {c.rSection.label}
            </p>
            <span className="text-xs font-sans" style={{ color: "var(--text-tertiary)" }}>{c.rSection.term}</span>
          </div>
          <p className="text-xs font-sans mb-8" style={{ color: "var(--text-tertiary)" }}>{c.rSection.note}</p>

          <div className="grid md:grid-cols-2 gap-5">
            {c.rTutorials.map((tut, i) => (
              <RevealSection key={tut.id} delay={i * 60}>
                <article
                  className="border p-6 h-full"
                  style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
                >
                  <h2
                    className="font-serif font-light mb-2"
                    style={{ fontSize: "1.2rem", lineHeight: 1.2, color: "var(--text-primary)" }}
                  >
                    {tut.title}
                  </h2>
                  <p className="font-serif text-sm leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
                    {tut.desc}
                  </p>
                  {"attribution" in tut && tut.attribution && (
                    <p className="text-2xs font-sans italic mb-4" style={{ color: "var(--text-tertiary)" }}>
                      {tut.attribution as string}
                    </p>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {tut.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-2xs font-sans tracking-wide px-2 py-0.5"
                        style={{ color: "var(--text-tertiary)", backgroundColor: "var(--bg-subtle)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* File links */}
                  <div className="flex flex-col gap-2">
                    {tut.parts.map((part) => (
                      <div key={part.label} className="flex items-center gap-3 flex-wrap">
                        {tut.parts.length > 1 && (
                          <span className="text-2xs font-sans w-36 shrink-0" style={{ color: "var(--text-tertiary)" }}>
                            {part.label}
                          </span>
                        )}
                        <a
                          href={part.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-2xs font-sans tracking-wide px-3 py-1.5 transition-colors duration-150"
                          style={{ backgroundColor: "color-mix(in srgb, var(--accent) 12%, var(--surface))", color: "var(--accent)" }}
                        >
                          <PdfIcon /> PDF
                        </a>
                        <a
                          href={part.rmd}
                          download
                          className="inline-flex items-center gap-1.5 text-2xs font-sans tracking-wide px-3 py-1.5 transition-colors duration-150 border"
                          style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
                        >
                          <CodeIcon /> .Rmd <DownloadIcon />
                        </a>
                      </div>
                    ))}
                  </div>
                </article>
              </RevealSection>
            ))}
          </div>
        </section>
      </RevealSection>

      {/* Review Slides Section */}
      <RevealSection delay={100}>
        <section className="pt-14 pb-4">
          <div className="flex items-baseline gap-4 mb-2">
            <p className="text-xs font-sans tracking-[0.18em] uppercase" style={{ color: "var(--accent)" }}>
              {c.slidesSection.label}
            </p>
            <span className="text-xs font-sans" style={{ color: "var(--text-tertiary)" }}>{c.slidesSection.term}</span>
          </div>
          <p className="text-xs font-sans mb-8" style={{ color: "var(--text-tertiary)" }}>{c.slidesSection.note}</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.slides.map((slide, i) => (
              <RevealSection key={slide.id} delay={i * 60}>
                <a
                  href={slide.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border p-6 h-full transition-colors duration-200"
                  style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                >
                  <h2
                    className="font-serif font-light mb-2 group-hover:text-[var(--accent)] transition-colors duration-200"
                    style={{ fontSize: "1.1rem", lineHeight: 1.25, color: "var(--text-primary)" }}
                  >
                    {slide.title}
                  </h2>
                  <p className="font-serif text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                    {slide.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {slide.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-2xs font-sans tracking-wide px-2 py-0.5"
                        style={{ color: "var(--text-tertiary)", backgroundColor: "var(--bg-subtle)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-2xs font-sans tracking-wide" style={{ color: "var(--accent)" }}>
                    <PdfIcon /> Open PDF
                  </div>
                </a>
              </RevealSection>
            ))}
          </div>
        </section>
      </RevealSection>

      {/* Status note */}
      <RevealSection delay={200}>
        <div className="mt-14 border-t pt-8" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs font-sans" style={{ color: "var(--text-tertiary)", maxWidth: "64ch" }}>
            {c.statusNote}
          </p>
        </div>
      </RevealSection>

    </div>
  );
}

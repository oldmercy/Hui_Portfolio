"use client";

import { useEffect, useRef } from "react";
import { getSiteContent } from "@/lib/site-content";

const { about } = getSiteContent("en");

function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && el.classList.add("visible")),
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="scroll-reveal" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/** Render a bio paragraph, bolding any accent words defined in content. */
function BioParagraph({ text }: { text: string }) {
  const parts = text.split(
    new RegExp(`(${about.bioAccentWords.join("|")})`, "g")
  );
  return (
    <p>
      {parts.map((part, i) =>
        about.bioAccentWords.includes(part) ? (
          <span key={i} style={{ color: "var(--accent)" }}>{part}</span>
        ) : (
          part
        )
      )}
    </p>
  );
}

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 pb-32">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="pt-16 pb-12 border-b" style={{ borderColor: "var(--border)" }}>
        <p className="text-xs font-sans tracking-[0.18em] uppercase mb-4" style={{ color: "var(--text-tertiary)" }}>
          {about.overline}
        </p>
        <h1
          className="font-serif font-light"
          style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.1, letterSpacing: "-0.025em", color: "var(--text-primary)" }}
        >
          {about.name}
        </h1>
        <p className="font-serif mt-1" style={{ color: "var(--text-tertiary)", fontStyle: "italic" }}>
          {about.nickname}
        </p>
      </div>

      {/* ── Bio grid ───────────────────────────────────────────── */}
      <div className="pt-16 pb-16 border-b grid md:grid-cols-[1fr_280px] gap-16" style={{ borderColor: "var(--border)" }}>
        {/* Text */}
        <div className="space-y-6 font-serif" style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
          {about.bio.map((para, i) => (
            <RevealSection key={i} delay={i * 80}>
              <BioParagraph text={para} />
            </RevealSection>
          ))}
        </div>

        {/* Sidebar: identity + seal */}
        <div className="flex flex-col gap-8">
          {/* Calligraphy seal */}
          <RevealSection>
            <div className="flex justify-center md:justify-start">
              <div
                className="w-36 h-36 flex items-center justify-center"
                style={{ backgroundColor: "var(--bg-subtle)", border: "0.5px solid var(--border)" }}
              >
                <img
                  src="/hui_calligraphy_CDW_256.png"
                  alt="Wenhui Xu calligraphy seal"
                  width={100}
                  height={100}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </RevealSection>

          {/* Quick facts */}
          <RevealSection delay={80}>
            <div className="space-y-4">
              {about.quickFacts.map(({ label, value, href }) => (
                <div key={label}>
                  <p className="text-2xs font-sans tracking-[0.14em] uppercase mb-0.5" style={{ color: "var(--text-tertiary)" }}>
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm font-sans link-underline"
                      style={{ color: "var(--accent)" }}
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-sans" style={{ color: "var(--text-primary)" }}>{value}</p>
                  )}
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </div>

      {/* ── Approach ───────────────────────────────────────────── */}
      <RevealSection>
        <section className="pt-16 pb-16 border-b" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs font-sans tracking-[0.18em] uppercase mb-10" style={{ color: "var(--text-tertiary)" }}>
            How I Work
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            {(
              [
                { title: "Evidence Synthesis", items: about.approach.evidence },
                { title: "Applied Analysis", items: about.approach.analysis },
                { title: "Decision Communication", items: about.approach.communication },
                { title: "Workflow Systems", items: about.approach.systems },
              ] as const
            ).map(({ title, items }) => (
              <div
                key={title}
                className="border p-6 transition-colors duration-200"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)", boxShadow: "0 14px 50px rgba(21, 24, 23, 0.035)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                <h3
                  className="font-serif font-light mb-4"
                  style={{ color: "var(--text-primary)", fontSize: "1.35rem", lineHeight: 1.15 }}
                >
                  {title}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="text-2xs font-sans tracking-wide px-2 py-1 border"
                      style={{ color: "var(--text-secondary)", borderColor: "var(--border)", backgroundColor: "color-mix(in srgb, var(--surface) 80%, var(--bg-subtle))" }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </RevealSection>

      {/* ── Skills ─────────────────────────────────────────────── */}
      <RevealSection>
        <section className="pt-16 pb-16 border-b" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs font-sans tracking-[0.18em] uppercase mb-10" style={{ color: "var(--text-tertiary)" }}>
            Technical Skills
          </p>

          <div className="grid gap-6">
            {(
              [
                { title: "Languages",  items: about.skills.languages  },
                { title: "Tools",      items: about.skills.tools      },
                { title: "Libraries",  items: about.skills.libraries  },
                { title: "Methods & Models", items: about.skills.models },
              ] as const
            ).map(({ title, items }) => (
              <div
                key={title}
                className="grid md:grid-cols-[160px_1fr] gap-4 border-b pb-5"
                style={{ borderColor: "var(--border)" }}
              >
                <h3
                  className="font-serif text-base"
                  style={{ color: "var(--text-primary)" }}
                >
                  {title}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="text-xs font-sans px-2.5 py-1 border"
                      style={{ color: "var(--text-secondary)", borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </RevealSection>

      {/* ── Hobbies ────────────────────────────────────────────── */}
      <RevealSection>
        <section className="pt-16">
          <p className="text-xs font-sans tracking-[0.18em] uppercase mb-10" style={{ color: "var(--text-tertiary)" }}>
            Outside the Office
          </p>

          <div className="grid md:grid-cols-2 gap-x-10 gap-y-0 border-t" style={{ borderColor: "var(--border)" }}>
            {about.hobbies.map(({ label, desc }, i) => (
              <RevealSection key={label} delay={i * 60}>
                <div
                  className="py-6 border-b"
                  style={{ borderColor: "var(--border)" }}
                >
                  <h4 className="font-serif text-lg mb-2" style={{ color: "var(--text-primary)" }}>
                    {label}
                  </h4>
                  <p className="text-sm font-sans leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </section>
      </RevealSection>
    </div>
  );
}

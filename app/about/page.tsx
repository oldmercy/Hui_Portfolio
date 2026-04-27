"use client";

import { useEffect, useRef } from "react";

const skills = {
  languages: ["Python", "R", "SQL", "SAS", "STATA"],
  tools:     ["Tableau", "PowerBI", "Excel", "GitHub"],
  libraries: ["EconML", "DoWhy", "SkLearn", "LightGBM", "Grf", "ggplot2", "xgboost", "dplyr"],
  models:    ["Double Machine Learning", "Causal Forest / GRF", "Regression & Classification Trees", "Gradient Boosting & Bagging", "Panel Data Models", "Time Series (ARMA, NNAR)", "VAR / VEC", "GMM / MLE"],
};

const hobbies = [
  { emoji: "📚", label: "Reading", desc: "Both fiction and non-fiction — from economic history to literary fiction." },
  { emoji: "🎬", label: "Film", desc: "Classic cinema and contemporary art-house; always looking for recommendations." },
  { emoji: "🧶", label: "Crochet", desc: "A calming practice of turning yarn into something tangible and geometric." },
  { emoji: "🌱", label: "Gardening", desc: "Patient work — there is something deeply satisfying about watching things grow." },
  { emoji: "🍳", label: "Cooking", desc: "Hangzhou-inflected home cooking, occasionally ambitious, often delicious." },
  { emoji: "🐱", label: "Cats", desc: "A multi-cat household. They are research assistants who contribute nothing." },
];

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

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 pb-32">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="pt-16 pb-12 border-b" style={{ borderColor: "var(--border)" }}>
        <p className="text-xs font-sans tracking-[0.18em] uppercase mb-4" style={{ color: "var(--text-tertiary)" }}>
          Economist
        </p>
        <h1
          className="font-serif font-light"
          style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.1, letterSpacing: "-0.025em", color: "var(--text-primary)" }}
        >
          Wenhui Xu
        </h1>
        <p className="font-serif mt-1" style={{ color: "var(--text-tertiary)", fontStyle: "italic" }}>
          Hui (Hwei) - short for Wenhui
        </p>
      </div>

      {/* ── Bio grid ───────────────────────────────────────────── */}
      <div className="pt-16 pb-16 border-b grid md:grid-cols-[1fr_280px] gap-16" style={{ borderColor: "var(--border)" }}>
        {/* Text */}
        <div className="space-y-6 font-serif" style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
          <RevealSection>
            <p>
              As people always say: <em>"There is nothing new under the sun."</em> I research the past
              for a thriving future. Finding a pattern from data and pulling missing pieces together
              always fascinates me — I enjoy telling stories with numbers and talking about the lessons learned.
            </p>
          </RevealSection>
          <RevealSection delay={80}>
            <p>
              I am proud to be a student of the first course delivery of causal machine learning at UofT,
              led by Dr. Nazanin Khazra. With competency in Causal Inference for Business and Economic
              settings — using Python packages including <span style={{ color: "var(--accent)" }}>EconML</span>,{" "}
              <span style={{ color: "var(--accent)" }}>DoWhy</span>, and{" "}
              <span style={{ color: "var(--accent)" }}>LightGBM</span> — I work on questions where the
              difference between correlation and causation carries real consequences.
            </p>
          </RevealSection>
          <RevealSection delay={160}>
            <p>
              I have four years of project experience across data analytics, research, business analytics,
              and teaching. I appreciate the opportunity to ask — and attempt to answer — questions that
              matter, while being rigorous about method.
            </p>
          </RevealSection>
          <RevealSection delay={240}>
            <p>
              I am an interest-driven person; the thirst for knowledge drives me forward. But a more
              pressing question: what can I do with that knowledge? I am looking for like-minded collaborators.
              Together, we can do something different.
            </p>
          </RevealSection>
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
              {[
                { label: "Currently",   value: "MA, Economic Data Analytics, University of Toronto" },
                { label: "Based in",    value: "Toronto, Canada" },
                { label: "From",        value: "Hangzhou, China" },
                { label: "Email",       value: "hui90785641@gmail.com", href: "mailto:hui90785641@gmail.com" },
                { label: "GitHub",      value: "oldmercy", href: "https://github.com/oldmercy" },
                { label: "LinkedIn",    value: "huixu01", href: "https://www.linkedin.com/in/huixu01/" },
              ].map(({ label, value, href }) => (
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

      {/* ── Skills ─────────────────────────────────────────────── */}
      <RevealSection>
        <section className="pt-16 pb-16 border-b" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs font-sans tracking-[0.18em] uppercase mb-10" style={{ color: "var(--text-tertiary)" }}>
            Technical Skills
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {(
              [
                { title: "Languages",  items: skills.languages  },
                { title: "Tools",      items: skills.tools      },
                { title: "Libraries",  items: skills.libraries  },
                { title: "Models",     items: skills.models     },
              ] as const
            ).map(({ title, items }) => (
              <div key={title}>
                <h3
                  className="font-serif text-sm mb-4 pb-2 border-b"
                  style={{ color: "var(--text-primary)", borderColor: "var(--border)" }}
                >
                  {title}
                </h3>
                <ul className="space-y-1.5">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm font-sans"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span style={{ color: "var(--accent)", marginTop: "0.35em", flexShrink: 0 }}>—</span>
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

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {hobbies.map(({ emoji, label, desc }, i) => (
              <RevealSection key={label} delay={i * 60}>
                <div
                  className="p-6 border h-full transition-colors duration-200"
                  style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-strong)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                >
                  <div className="text-2xl mb-3">{emoji}</div>
                  <h4 className="font-serif text-base mb-2" style={{ color: "var(--text-primary)" }}>
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

"use client";

import { useEffect, useRef } from "react";

const modules = [
  {
    label: "Tutorial Design",
    title: "From Theory To Workflow",
    body:
      "Tutorial structures designed to move students from econometric concepts to implementation-ready Stata and R workflows.",
    tags: ["OLS", "Diagnostics", "Panel Data", "IV / 2SLS"],
  },
  {
    label: "Worked Examples",
    title: "Step-By-Step Applied Econometrics",
    body:
      "Worked examples and code demonstrations that make model assumptions, command syntax, and interpretation visible to mixed-background audiences.",
    tags: ["Stata", "R", "Post-Estimation", "Interpretation"],
  },
  {
    label: "Process Design",
    title: "Traceable Support For Students",
    body:
      "Office-hour and regrade workflows structured around clear evidence, repeatable explanations, and auditable communication.",
    tags: ["Office Hours", "Regrade Workflow", "Student Support"],
  },
];

function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && el.classList.add("visible")),
      { threshold: 0.1 }
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

export default function TeachingPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 pb-32">
      <div className="pt-16 pb-12 border-b" style={{ borderColor: "var(--border)" }}>
        <p className="text-xs font-sans tracking-[0.18em] uppercase mb-4" style={{ color: "var(--text-tertiary)" }}>
          Teaching
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
          Econometrics Teaching Materials
        </h1>
        <p
          className="font-serif mt-4 max-w-[56ch]"
          style={{ color: "var(--text-secondary)", fontSize: "1.0625rem" }}
        >
          Materials from four terms of econometrics teaching, focused on turning abstract methods into practical,
          implementation-ready workflows for mixed-background undergraduate audiences.
        </p>
      </div>

      <section className="grid md:grid-cols-3 gap-6 pt-12">
        {modules.map((module, index) => (
          <RevealSection key={module.title} delay={index * 80}>
            <article
              className="border p-6 h-full transition-colors duration-200"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <p className="text-2xs font-sans tracking-[0.15em] uppercase mb-4" style={{ color: "var(--text-tertiary)" }}>
                {module.label}
              </p>
              <h2
                className="font-serif font-light mb-4"
                style={{ fontSize: "1.55rem", lineHeight: 1.15, color: "var(--text-primary)" }}
              >
                {module.title}
              </h2>
              <p className="font-serif leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
                {module.body}
              </p>
              <div className="flex flex-wrap gap-2">
                {module.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-2xs font-sans tracking-wide px-2 py-1"
                    style={{ color: "var(--text-tertiary)", backgroundColor: "var(--bg-subtle)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </RevealSection>
        ))}
      </section>

      <RevealSection delay={240}>
        <section className="mt-16 border p-8 md:p-10" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs font-sans tracking-[0.18em] uppercase mb-4" style={{ color: "var(--text-tertiary)" }}>
            Portfolio Status
          </p>
          <p className="font-serif leading-relaxed" style={{ color: "var(--text-secondary)", maxWidth: "62ch" }}>
            Public samples are being selected and redacted before release. The teaching page currently documents the
            structure, scope, and communication approach; downloadable materials will be added only after course and
            student-sensitive content is removed.
          </p>
        </section>
      </RevealSection>
    </div>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { quantContentEn } from "@/content/quant/en";
import type { Course } from "@/content/quant/en";

export const metadata: Metadata = {
  title: "Quantitative Analysis — Wenhui Xu",
  description:
    "Computational economics coursework in structural IO and quantitative macroeconomics.",
};

const c = quantContentEn;

export default function QuantPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 pb-32">

      {/* Header */}
      <div className="pt-16 pb-12 border-b" style={{ borderColor: "var(--border)" }}>
        <p
          className="text-xs font-sans tracking-[0.18em] uppercase mb-4"
          style={{ color: "var(--text-tertiary)" }}
        >
          {c.overline}
        </p>
        <h1
          className="font-serif font-light mb-4"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: "var(--text-primary)",
          }}
        >
          {c.title}
        </h1>
        <p
          className="font-serif max-w-[60ch]"
          style={{ color: "var(--text-secondary)", fontSize: "1.0625rem" }}
        >
          {c.body}
        </p>
      </div>

      {/* Courses */}
      <div className="divide-y" style={{ borderColor: "var(--border)" }}>
        {c.courses.map((course) => (
          <CourseSection key={course.code} course={course} />
        ))}
      </div>
    </div>
  );
}

function CourseSection({ course }: { course: Course }) {
  return (
    <section className="py-14">
      {/* Course header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span
              className="text-xs font-sans tracking-[0.15em] uppercase"
              style={{ color: "var(--text-tertiary)" }}
            >
              {course.code}
            </span>
            <span
              className="w-px h-3 inline-block"
              style={{ backgroundColor: "var(--border-strong)" }}
              aria-hidden="true"
            />
            <span
              className="text-xs font-sans"
              style={{ color: "var(--text-tertiary)" }}
            >
              {course.language}
            </span>
          </div>
          <h2
            className="font-serif font-light mb-3"
            style={{ fontSize: "1.5rem", color: "var(--text-primary)" }}
          >
            {course.name}
          </h2>
          <p
            className="font-serif max-w-[58ch] text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {course.description}
          </p>
        </div>

        <div className="flex flex-col items-end gap-3 shrink-0">
          {/* Tool tags */}
          <div className="flex flex-wrap gap-1.5 justify-end">
            {course.tools.map((t) => (
              <span
                key={t}
                className="text-2xs font-sans px-2 py-0.5 border"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-tertiary)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
          {/* GitHub link */}
          {course.githubUrl && (
            <a
              href={course.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-sans px-3 py-1.5 border transition-colors duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              style={{
                borderColor: "var(--border-strong)",
                color: "var(--text-secondary)",
              }}
            >
              <GithubIcon /> View Code
            </a>
          )}
        </div>
      </div>

      {/* Assignment grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {course.assignments.map((a) => (
          <AssignmentCard key={a.id} assignment={a} />
        ))}
      </div>
    </section>
  );
}

function AssignmentCard({
  assignment,
}: {
  assignment: Course["assignments"][number];
}) {
  return (
    <div
      className="border p-5 flex flex-col gap-3 group transition-colors duration-150 hover:border-[color:var(--accent)]"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
    >
      {/* ID + title */}
      <div>
        <span
          className="inline-block text-2xs font-sans tracking-[0.14em] uppercase px-1.5 py-0.5 mb-2"
          style={{
            backgroundColor: "color-mix(in srgb, var(--accent) 12%, var(--surface))",
            color: "var(--accent)",
          }}
        >
          {assignment.id}
        </span>
        <h3
          className="font-serif leading-snug"
          style={{ fontSize: "1rem", color: "var(--text-primary)" }}
        >
          {assignment.title}
        </h3>
      </div>

      {/* Description */}
      <p
        className="font-serif text-sm leading-relaxed flex-1"
        style={{ color: "var(--text-secondary)" }}
      >
        {assignment.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {assignment.tags.map((tag) => (
          <span
            key={tag}
            className="text-2xs font-sans px-1.5 py-0.5"
            style={{
              backgroundColor: "color-mix(in srgb, var(--accent) 8%, var(--bg))",
              color: "var(--accent)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* PDF link */}
      <a
        href={assignment.pdfPath}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-sans self-start border px-3 py-1.5 transition-colors duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)]"
        style={{
          borderColor: "var(--border)",
          color: "var(--text-tertiary)",
        }}
      >
        <PdfIcon /> View Report
      </a>
    </div>
  );
}

/* ── Icons ───────────────────────────────────────────────── */
function PdfIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

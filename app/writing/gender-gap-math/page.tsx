"use client";

import Link from "next/link";
import { useState } from "react";

/* ── Model data ─────────────────────────────────────────────────── */
const MODELS = [
  {
    id: "ols",
    label: "OLS",
    full: "Ordinary Least Squares with School Fixed Effects",
    method:
      "Linear regression with individual controls (baseline scores, age, SES, family background, class size, teacher experience and salary), school and county fixed effects, and standard errors clustered at the school level. Identifies treatment from the 12 schools with both male and female math teachers.",
    identification:
      "Most conservative: assumes no unobserved confounders within schools where both teacher genders are present. Conditional independence on observed controls.",
    finding:
      "Girls score 0.147 SD lower than boys. Female students with female teachers gain +0.077 SD compared to those with male teachers — closing roughly 37% of the baseline gap. Effect is underpowered (n.s.) due to limited identifying variation from only 12 mixed-teacher schools (N=475).",
    table: {
      headers: ["", "(1) Base", "(2) Gender-Matching"],
      rows: [
        ["Female", "−0.147***", "−0.209*"],
        ["", "(0.019)", "(0.099)"],
        ["F-student × F-teacher", "—", "+0.077"],
        ["", "", "(0.097)"],
        ["M-student × M-teacher", "—", "−0.051"],
        ["", "", "(0.098)"],
        ["Observations", "7,373", "7,373"],
        ["R²", "0.476", "0.477"],
      ],
      note: "SEs clustered at school level. * p<0.1  ** p<0.05  *** p<0.01. Most design-transparent but least precise.",
    },
    images: [],
  },
  {
    id: "dag",
    label: "DAG",
    full: "Directed Acyclic Graph (Backdoor Criterion)",
    method:
      "Constructs causal graph grouping confounders into four blocks: county-school fixed effects, individual ability (baseline scores, age), family investment (parents' education, SES), and classroom quality (teacher salary, experience, class size). Applies backdoor criterion to identify minimal sufficient adjustment set.",
    identification:
      "Unconfoundedness: no unobserved confounder affects both treatment and outcome conditional on the graph-defined adjustment set. Between-school comparison under explicit graphical assumptions.",
    finding:
      "DAG backdoor gives +0.074 SD — nearly identical to OLS despite using broader between-school variation. The minimal adjustment set (student gender, teacher gender only) blocks all backdoor paths, yet delivers a similar estimate, validating directional consistency across different identifying approaches.",
    table: {
      headers: ["Treatment", "DAG Estimate"],
      rows: [
        ["Female", "−0.159"],
        ["F-student × F-teacher", "+0.074"],
        ["M-student × M-teacher", "−0.038"],
      ],
      note: "DAG backdoor linear regression. Minimal sufficient adjustment set: {student_female, teacher_female}.",
    },
    images: [
      { src: "/DAG/dag_simplified.png", caption: "Simplified Directed Acyclic Graph — red lines show backdoor paths" },
    ],
  },
  {
    id: "ipw",
    label: "IPW",
    full: "Inverse Propensity Score Weighting",
    method:
      "Models the probability of gender matching (propensity score) using L2-regularized logistic regression. Reweights the sample so treated and control students are comparable by construction. Average Treatment Effect (ATE) is the weighted mean outcome difference.",
    identification:
      "Conditional independence (CIA): Y₁, Y₀ ⊥ T | X. Requires that observed covariates absorb selection bias. Balance check (F=0.97, p=0.44) and propensity overlap plots validate assumptions.",
    finding:
      "ATE = +0.098 SD (95% CI: 0.075–0.172) — first estimate with a confidence interval excluding zero. Validates non-parametric robustness of the gender-matching signal beyond the linear OLS framework.",
    table: {
      headers: ["Estimate", "Value"],
      rows: [
        ["ATE (F-student × F-teacher)", "+0.098 SD"],
        ["95% CI", "(0.075, 0.172)"],
        ["Significance", "✓ p < 0.05"],
        ["Propensity Model", "L2-regularized logistic"],
      ],
      note: "Gains precision by using broader between-school comparison under CIA.",
    },
    images: [
      { src: "/IPW/overlap.png", caption: "Propensity score overlap — no extreme weights" },
    ],
  },
  {
    id: "dr",
    label: "Doubly Robust",
    full: "Augmented Inverse Propensity Weighting (AIPW)",
    method:
      "Combines IPW with an outcome model: consistent if either the propensity score OR the outcome model is correctly specified. Uses the same regularized propensity score as IPW, plus separate outcome models fit on treated and control subsamples.",
    identification:
      "Same as IPW: conditional independence and positivity. Double protection: robustness to misspecification of one component.",
    finding:
      "ATE = +0.087 SD — positioned between IPW (+0.098) and OLS/DAG (+0.074–0.077), as expected when averaging information from both propensity and outcome surfaces. Wide confidence interval (95% CI: −0.26, +0.44) reflects high variance when fitting outcome models across 200+ school dummies.",
    table: {
      headers: ["Estimate", "Value"],
      rows: [
        ["ATE (F-student × F-teacher)", "+0.087 SD"],
        ["95% CI", "(−0.257, 0.444)"],
        ["Significance", "✗"],
        ["Identification", "CIA + Positivity"],
      ],
      note: "Provides a robustness check but does not independently sharpen precision.",
    },
    images: [],
  },
  {
    id: "learners",
    label: "Meta Learners",
    full: "T-Learner (Treatment Learner)",
    method:
      "Flexible ML approach: fits separate outcome models on treated and control arms independently, then differences them to estimate CATE. Uses gradient boosting as the base learner within the DAG framework (same minimal adjustment set: student and teacher gender only).",
    identification:
      "Inherits the DAG identification strategy. More flexible functional form than linear regression.",
    finding:
      "T-learner ATE = +0.085 SD — inside the conservative range (+0.074 to +0.098 SD). Sign and magnitude consistent across methods, supporting directional robustness. (Note: Meta-learners lack valid confidence intervals; reported for sign and magnitude only.)",
    table: {
      headers: ["Learner", "ATE (SD)", "Interpretation"],
      rows: [
        ["T-Learner (tuned)", "+0.085", "Inside conservative range"],
        ["S-Learner (pooled)", "−0.004", "Weak treatment shrunk away"],
        ["X-Learner", "+0.042", "Smaller but positive"],
      ],
      note: "No valid confidence intervals for meta-learners. T-learner preferred: keeps treatment arms separate.",
    },
    images: [],
  },
  {
    id: "dml",
    label: "Double ML",
    full: "Debiased Machine Learning with Causal Forest",
    method:
      "Uses cross-fitting and residual-on-residual regression to remove regularization bias. Both outcome Y and treatment T are first residualized via flexible learners (L2-regularized logistic regression for propensity, gradient boosting for outcome). CausalForestDML then estimates treatment effects and heterogeneity nonparametrically.",
    identification:
      "Unconfoundedness required. Uses richest control set (student gender, male-male dummy, school and county dummies all together). Regularization prevents separation; identifying assumption still relies on CIA across schools.",
    finding:
      "LinearDML: +0.222 SD. SparseLinearDML: +0.213 SD. CausalForestDML: +0.230 SD (95% CI: 0.214–0.247) — all significant. Larger than conservative range (+0.074–0.098 SD) due to flexible nuisance estimation. Heterogeneity analysis reveals non-monotonic pattern by teacher salary (see next section).",
    table: {
      headers: ["Specification", "ATE (SD)", "95% CI"],
      rows: [
        ["LinearDML", "+0.222", "(0.066, 0.377)"],
        ["SparseLinearDML", "+0.213", "(0.058, 0.369)"],
        ["CausalForestDML", "+0.230", "(0.214, 0.247)"],
      ],
      note: "Upper-range evidence under stronger modeling assumptions. Used for heterogeneity analysis.",
    },
    images: [
      { src: "/DML/causalforest_binned.png", caption: "CATE by baseline score (roughly flat)" },
      { src: "/DML/cate_vs_salary.png", caption: "CATE by teacher salary (V-shaped: low +0.45 SD, high +0.87 SD)" },
    ],
  },
] as const;

type ModelId = (typeof MODELS)[number]["id"];

/* ── Page ────────────────────────────────────────────────────────── */
export default function GenderGapMathPage() {
  const [active, setActive] = useState<ModelId>("ols");
  const model = MODELS.find((m) => m.id === active)!;

  return (
    <div className="max-w-5xl mx-auto px-6 pb-32">

      {/* Header */}
      <div className="pt-8 pb-6 md:pt-16 md:pb-10 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2 mb-4 text-xs font-sans" style={{ color: "var(--text-tertiary)" }}>
          <Link href="/writing" className="hover:text-[var(--accent)] transition-colors link-underline">Writing</Link>
          <span>/</span>
          <span>Economic Research</span>
        </div>
        <h1
          className="font-serif font-light mb-4"
          style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.025em", color: "var(--text-primary)" }}
        >
          Gender Figures in Math: Do Female Math Teachers Impact Female Students' Outcomes?
        </h1>
        <p className="font-serif mb-6 text-sm md:text-base" style={{ color: "var(--text-secondary)", lineHeight: "1.65" }}>
          Women's underrepresentation in STEM is partly rooted in math performance gaps that emerge early and persist. This
          paper investigates whether assigning female teachers to female students narrows this gap, using observational data
          from 214 rural Chinese schools (N&nbsp;=&nbsp;9,072). Rather than claiming a single "correct" estimate, I adopt an
          identification spectrum framework: deploying six causal methods ranging from conservative within-school comparisons
          (+0.077 SD) to flexible machine learning approaches (+0.230 SD). The consistent positive direction across
          methods—despite different baselines and identification assumptions—provides robust evidence that gender matching
          closes roughly 40% of the baseline gap.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-sans" style={{ color: "var(--text-tertiary)" }}>Wenhui Xu · 2024</span>
          <a
            href="/papers/gender-gap-math.pdf"
            download
            className="inline-flex items-center gap-1.5 text-xs font-sans px-3 py-1.5 border transition-colors duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}
          >
            <PdfIcon /> Download PDF
          </a>
          <a
            href="https://github.com/oldmercy/Gender-Gap-in-Math"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-sans px-3 py-1.5 border transition-colors duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}
          >
            <GithubIcon /> View Code
          </a>
        </div>
      </div>

      {/* Data Section */}
      <section className="py-6 md:py-10 border-b" style={{ borderColor: "var(--border)" }}>
        <p className="text-xs font-sans tracking-[0.18em] uppercase mb-3" style={{ color: "var(--text-tertiary)" }}>Data</p>
        <h2 className="font-serif font-light mb-3 text-lg md:text-2xl" style={{ color: "var(--text-primary)" }}>
          Rural China Field Experiment, 2012–2014
        </h2>
        <p className="font-serif leading-relaxed mb-6 text-sm md:text-base" style={{ color: "var(--text-secondary)" }}>
          Data from a large-scale RCT across 216 schools in Shaanxi and Gansu provinces, originally designed to study
          teacher pay incentives. Students completed three standardised math tests; scores are normalised against a control
          group and expressed in standard deviations. This study extends the original by examining teacher gender effects.
          Only about 18% of female students were assigned a female math teacher, providing variation for identification.
        </p>
        <figure className="border w-full md:max-w-[700px]" style={{ borderColor: "var(--border)" }}>
          <img src="/graphs/balance_by_teacher_gender.png" alt="Balance check by teacher gender" className="w-full" />
          <figcaption className="px-3 py-2 text-2xs font-sans" style={{ color: "var(--text-tertiary)", borderTop: "1px solid var(--border)" }}>
            Balance check: baseline student characteristics by math teacher gender (within-school comparison shows no significant differences)
          </figcaption>
        </figure>
      </section>

      {/* Identification Spectrum Narrative */}
      <section className="py-6 md:py-10 border-b" style={{ borderColor: "var(--border)" }}>
        <p className="text-xs font-sans tracking-[0.18em] uppercase mb-3" style={{ color: "var(--text-tertiary)" }}>Identification Spectrum</p>
        <h2 className="font-serif font-light mb-3 text-lg md:text-2xl" style={{ color: "var(--text-primary)" }}>
          Why Six Methods? A Journey From Conservative to Flexible
        </h2>
        <p className="font-serif leading-relaxed mb-4 text-sm md:text-base" style={{ color: "var(--text-secondary)" }}>
          Teacher-student gender assignment was not randomized, so identifying the causal effect requires strong assumptions.
          Rather than choosing one assumption and defending it, this analysis uses an <strong>identification spectrum</strong>:
          six methods ranging from maximally conservative to maximally flexible, each making different trade-offs between design
          transparency and statistical power.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="border p-3 md:p-4" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-subtle)" }}>
            <p className="text-2xs font-sans tracking-[0.14em] uppercase mb-2" style={{ color: "var(--text-tertiary)" }}>Conservative (Low Assumptions)</p>
            <p className="font-serif text-xs md:text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              <strong>OLS</strong> uses only schools with both male and female teachers (N=475), avoiding across-school selection bias.
              <strong>DAG</strong> and <strong>IPW</strong> broaden the comparison but rest more heavily on CIA.
            </p>
          </div>
          <div className="border p-3 md:p-4" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-subtle)" }}>
            <p className="text-2xs font-sans tracking-[0.14em] uppercase mb-2" style={{ color: "var(--text-tertiary)" }}>Flexible (Higher Assumptions)</p>
            <p className="font-serif text-xs md:text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              <strong>Meta Learners</strong> and <strong>DML</strong> use the full control set and flexible residualization,
              recovering larger effect estimates and rich heterogeneity analysis.
            </p>
          </div>
        </div>
        <p className="font-serif leading-relaxed mt-6" style={{ color: "var(--text-secondary)" }}>
          The key finding is <strong>directional consistency</strong>: across all six methods, the effect of female-female matching
          is positive. The magnitude varies (+0.074 to +0.230 SD depending on assumptions), but the sign does not. This consistency
          is the robustness claim.
        </p>
      </section>

      {/* Model Showcase */}
      <section className="pt-6 md:pt-10">
        <p className="text-xs font-sans tracking-[0.18em] uppercase mb-2" style={{ color: "var(--text-tertiary)" }}>
          Method Details
        </p>
        <p className="font-serif mb-6 text-sm md:text-base" style={{ color: "var(--text-secondary)" }}>
          Select a method below to see the specification, identification assumptions, and results. Methods are ordered from most
          conservative to most flexible.
        </p>

        {/* Tab bar */}
        <div
          className="flex flex-wrap gap-1 mb-8 border-b pb-0"
          style={{ borderColor: "var(--border)" }}
          role="tablist"
        >
          {MODELS.map((m) => (
            <button
              key={m.id}
              role="tab"
              aria-selected={active === m.id}
              onClick={() => setActive(m.id as ModelId)}
              className="px-3 py-2 text-xs font-sans tracking-wide transition-all duration-150 border-b-2 -mb-px"
              style={{
                borderBottomColor: active === m.id ? "var(--accent)" : "transparent",
                color: active === m.id ? "var(--accent)" : "var(--text-tertiary)",
                backgroundColor: "transparent",
              }}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Active model panel */}
        <div key={active} className="animate-fade-up border p-4 md:p-6 lg:p-8" style={{ animationDuration: "200ms", borderColor: "var(--border)", backgroundColor: "var(--surface)" }}>
          {/* Method label + heading */}
          <div className="mb-6">
            <span
              className="inline-block text-2xs font-sans tracking-[0.15em] uppercase px-2 py-0.5 mb-3"
              style={{ backgroundColor: "color-mix(in srgb, var(--accent) 10%, var(--surface))", color: "var(--accent)" }}
            >
              {model.full}
            </span>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-2xs font-sans tracking-[0.14em] uppercase mb-2" style={{ color: "var(--text-tertiary)" }}>Method</p>
                <p className="font-serif leading-relaxed text-sm" style={{ color: "var(--text-secondary)" }}>{model.method}</p>
              </div>
              <div>
                <p className="text-2xs font-sans tracking-[0.14em] uppercase mb-2" style={{ color: "var(--text-tertiary)" }}>
                  Identification / Assumption
                </p>
                <p className="font-serif leading-relaxed text-sm" style={{ color: "var(--text-secondary)" }}>{model.identification}</p>
              </div>
            </div>
          </div>

          {/* Key finding */}
          <div
            className="border-l-2 pl-5 mb-8 py-1"
            style={{ borderColor: "var(--accent)" }}
          >
            <p className="text-2xs font-sans tracking-[0.14em] uppercase mb-2" style={{ color: "var(--accent)" }}>Key Finding</p>
            <p className="font-serif leading-relaxed" style={{ color: "var(--text-primary)" }}>{model.finding}</p>
          </div>

          {/* Result table */}
          {"table" in model && model.table && (
            <div className="mb-8 overflow-x-auto">
              <table className="w-full text-sm font-sans border-collapse">
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--border-strong)" }}>
                    {model.table.headers.map((h, i) => (
                      <th
                        key={i}
                        className="text-left py-2 pr-6 text-xs tracking-wide"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {model.table.rows.map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className="py-1.5 pr-6 font-serif"
                          style={{
                            color: j === 0 ? "var(--text-primary)" : "var(--text-secondary)",
                            fontStyle: row[0] === "" ? "normal" : undefined,
                          }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {model.table.note && (
                <p className="mt-2 text-2xs font-sans italic" style={{ color: "var(--text-tertiary)" }}>
                  {model.table.note}
                </p>
              )}
            </div>
          )}

          {/* Images */}
          {model.images.length > 0 && (
            <div
              className={`grid gap-4 ${
                model.images.length === 1 ? "grid-cols-1 max-w-lg" :
                "grid-cols-1 sm:grid-cols-2"
              }`}
            >
              {model.images.map((img) => (
                <figure key={img.src} className="border" style={{ borderColor: "var(--border)" }}>
                  <img src={img.src} alt={img.caption} className="w-full" />
                  <figcaption
                    className="px-3 py-2 text-2xs font-sans"
                    style={{ color: "var(--text-tertiary)", borderTop: "1px solid var(--border)" }}
                  >
                    {img.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Discussion */}
      <section className="mt-10 md:mt-16 pt-6 md:pt-10 border-t" style={{ borderColor: "var(--border)" }}>
        <p className="text-xs font-sans tracking-[0.18em] uppercase mb-3" style={{ color: "var(--text-tertiary)" }}>Discussion</p>

        <div className="mb-8 md:mb-10">
          <h3 className="font-serif font-semibold mb-3 text-base md:text-lg" style={{ color: "var(--text-primary)" }}>
            Method convergence supports a causal interpretation
          </h3>
          <p className="font-serif leading-relaxed mb-4 text-sm md:text-base" style={{ color: "var(--text-secondary)" }}>
            The disciplined range from conservative methods (OLS, DAG, IPW, DR) clusters around <strong>+0.074 to +0.098 SD</strong>.
            Despite different baselines, identification strategies, and control sets — moving from within-school comparisons
            to graph-based adjustment to propensity-score reweighting — all methods point in the same positive direction.
            This consistency across independent identification assumptions strengthens the causal claim: female-female teacher
            matching does appear to narrow the gender gap, not as an artifact of any single methodological choice.
          </p>
        </div>

        <div className="mb-8 md:mb-10">
          <h3 className="font-serif font-semibold mb-3 text-base md:text-lg" style={{ color: "var(--text-primary)" }}>
            Heterogeneity: the U-shaped salary pattern
          </h3>
          <p className="font-serif leading-relaxed mb-4 text-sm md:text-base" style={{ color: "var(--text-secondary)" }}>
            The larger DML estimates (<strong>+0.213 to +0.230 SD</strong>) reveal substantial treatment-effect heterogeneity.
            Teacher base salary emerges as the primary effect modifier: predicted benefits are largest in very low-salary
            classrooms (<strong>CATE ≈ +0.45 SD</strong>) and very high-salary classrooms (<strong>CATE ≈ +0.87 SD</strong>),
            but close to zero in the middle of the salary distribution.
          </p>
          <p className="font-serif leading-relaxed text-sm md:text-base" style={{ color: "var(--text-secondary)" }}>
            This non-monotonic pattern suggests <strong>two distinct mechanisms</strong>: (1) In low-resource settings, female
            math teachers may function as a powerful role model precisely because they are scarce; (2) In high-resource settings,
            better-funded schools may amplify the benefits through higher teacher quality, student-teacher interaction, and less
            gender-biased assessment. The data do not directly test these mechanisms, but the heterogeneity points toward context
            mattering as much as matching itself.
          </p>
        </div>

        <div>
          <h3 className="font-serif font-semibold mb-3 text-base md:text-lg" style={{ color: "var(--text-primary)" }}>
            Limitations and caveats
          </h3>
          <p className="font-serif leading-relaxed text-sm md:text-base" style={{ color: "var(--text-secondary)" }}>
            Teacher-student gender assignment was not randomized, so identification relies entirely on conditional independence
            (CIA): observed covariates must absorb all selection bias. Balance checks and pre-treatment timing support this assumption
            within schools, but cross-school comparisons depend on stronger CIA. The short follow-up window (one school year) limits
            inference to immediate achievement gains; longer-term effects on STEM persistence and career choices remain unknown.
          </p>
        </div>
      </section>

      {/* Keywords */}
      <section className="mt-10 md:mt-16 pt-6 md:pt-8 border-t" style={{ borderColor: "var(--border)" }}>
        <p className="text-xs font-sans tracking-[0.18em] uppercase mb-3" style={{ color: "var(--text-tertiary)" }}>Keywords</p>
        <div className="flex flex-wrap gap-2">
          {["gender gaps", "teacher-student matching", "causal inference", "heterogeneous treatment effects", "STEM education"].map((keyword) => (
            <span
              key={keyword}
              className="text-xs md:text-sm font-sans px-2 md:px-3 py-1.5 border"
              style={{ borderColor: "var(--border)", color: "var(--text-secondary)", backgroundColor: "var(--bg-subtle)" }}
            >
              {keyword}
            </span>
          ))}
        </div>
      </section>

      {/* Back nav */}
      <div className="mt-8 md:mt-10 pt-4" style={{ borderColor: "var(--border)" }}>
        <Link
          href="/writing"
          className="inline-flex items-center gap-2 text-xs md:text-sm font-sans transition-colors duration-150 hover:text-[var(--accent)]"
          style={{ color: "var(--text-tertiary)" }}
        >
          <span>←</span> All Papers
        </Link>
      </div>
    </div>
  );
}

/* ── Icons ───────────────────────────────────────────────────────── */
function PdfIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  );
}

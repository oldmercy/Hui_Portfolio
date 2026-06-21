"use client";

import Link from "next/link";
import { useState } from "react";

/* ── Model data ─────────────────────────────────────────────────── */
const MODELS = [
  {
    id: "ols",
    label: "OLS",
    full: "Linear Regression",
    method:
      "Standard OLS with individual controls (baseline scores, age, SES, family background, class size, teacher experience and salary), school and county fixed effects, and standard errors clustered at the school level.",
    identification:
      "Assumes no unobserved confounders correlated with teacher gender assignment conditional on controls and fixed effects.",
    finding:
      "Girls score 0.142 SD lower than boys (Base). When a girl has a female teacher, the gap closes by 37% — the gender-matching coefficient is +0.078 (p < 0.1). Boys with male teachers show a small negative effect (−0.052) that becomes insignificant once clustered SEs are applied.",
    table: {
      headers: ["", "(1) Base", "(2) Gender-Matching"],
      rows: [
        ["Female", "−0.142***", "−0.206***"],
        ["", "(0.019)", "(0.047)"],
        ["F-student × F-teacher", "—", "+0.078*"],
        ["", "", "(0.047)"],
        ["M-student × M-teacher", "—", "−0.052"],
        ["", "", "(0.049)"],
        ["Observations", "7,373", "7,373"],
        ["R²", "0.476", "0.477"],
      ],
      note: "SEs clustered at school level. * p<0.1  ** p<0.05  *** p<0.01",
    },
    images: [],
  },
  {
    id: "regularization",
    label: "Ridge & LASSO",
    full: "Regularized Regression",
    method:
      "Ridge (L2 penalty) shrinks all coefficients proportionally. LASSO (L1 penalty) allows coefficients to drop to zero. Both use five-fold cross-validation to select the optimal penalty λ.",
    identification: "Same specification as OLS; regularization is a model-selection tool, not an identification strategy.",
    finding:
      "Ridge: optimal λ = 0.0152 — very small, suggesting all variables should be retained in both models. LASSO: optimal λ = 0.0016; in the gender-matching model, the male-student–male-teacher dummy nearly drops out, confirming its limited explanatory power found in OLS.",
    images: [
      { src: "/ML/reg-f-ridge-mse.png",   caption: "Ridge CV — Base model" },
      { src: "/ML/reg-gm-ridge-mse.png",  caption: "Ridge CV — Gender-Matching model" },
      { src: "/ML/reg-f-lasso-mse.png",   caption: "LASSO CV — Base model" },
      { src: "/ML/reg-gm-lasso-mse.png",  caption: "LASSO CV — Gender-Matching model" },
    ],
  },
  {
    id: "ipw",
    label: "IPW",
    full: "Inverse Propensity Score Weighting",
    method:
      "Estimates the Average Treatment Effect (ATE) by reweighting observations by the inverse of the estimated propensity score. A positivity check confirms sufficient overlap in treatment probability distributions.",
    identification:
      "Requires conditional independence: Y₁, Y₀ ⊥ T | X. Overlap plot shows moderate overlap — assumption is plausible.",
    finding:
      "ATE = 0.071 for girls with female teachers — closely replicating the OLS estimate and providing non-parametric support for the gender-matching effect.",
    images: [
      { src: "/ML/ipw-overlap.png", caption: "Propensity score overlap: treated vs. control" },
    ],
  },
  {
    id: "tree",
    label: "Ensemble Trees",
    full: "Decision Tree & Ensemble Methods",
    method:
      "A regression tree establishes baseline feature importance. Three ensemble variants — Regression Tree, Bagging, and Gradient Boosting — are compared by tuned MSE. Gradient Boosting is selected for downstream ML models.",
    identification: "Predictive model; no causal identification claim. Used for feature importance and model selection.",
    finding:
      "Baseline achievement scores dominate predictions (importance: 0.409 + 0.154). SES, teacher salary, and class size follow. 'Female' alone ranks 10th — confirming gender gap is driven by context, not fixed ability. Boosting MSE = 0.535 (best among the three).",
    table: {
      headers: ["Model", "Tuned MSE"],
      rows: [
        ["Regression Tree", "0.655"],
        ["Bagging", "0.565"],
        ["Boosting (selected)", "0.535"],
      ],
      note: null,
    },
    images: [
      { src: "/ML/tree-regression.png", caption: "Regression Tree — root split on baseline achievement" },
    ],
  },
  {
    id: "dag",
    label: "DAG",
    full: "Direct Acyclic Graphs",
    method:
      "Constructs a causal DAG grouping confounders into four blocks: county-school fixed effects, individual ability (baseline scores, age), family investment (parents' education, SES), and classroom quality (teacher salary, experience, class size). Backdoor criterion identifies the causal effect.",
    identification:
      "Unconfoundedness conditional on the four confounder blocks. The RCT assignment from the original study is included as an effect modifier.",
    finding:
      "Under the DAG framework the gender gap (−0.159) is slightly larger than OLS. The female-teacher effect (+0.120) almost entirely eliminates the gap — stronger than the OLS estimate of +0.078.",
    table: {
      headers: ["Treatment", "Estimate"],
      rows: [
        ["Female", "−0.159"],
        ["F-student × F-teacher", "+0.120"],
        ["M-student × M-teacher", "−0.038"],
      ],
      note: "DAG backdoor linear regression estimates",
    },
    images: [
      { src: "/ML/dag.png", caption: "Simplified DAG (original with all nodes in appendix)" },
    ],
  },
  {
    id: "learners",
    label: "Meta Learners",
    full: "S / T / X Learners",
    method:
      "Three meta-learner specifications (S, T, X) estimated within the DAG framework. Cumulative gain plots evaluate model fit and surface treatment effect heterogeneity.",
    identification: "Inherits the DAG identification strategy.",
    finding:
      "S-learner outperforms: up to 50% of the female student population realises a large gain from having a female teacher; the benefit fades for the remaining half. Point estimates are stable across all three learners (ATE ≈ 0.123 for F-student × F-teacher). T and X learners show signs of overfitting.",
    table: {
      headers: ["", "S-Learner", "T-Learner", "X-Learner"],
      rows: [
        ["Female", "−0.158", "−0.159", "−0.159"],
        ["F-student × F-teacher", "+0.123", "+0.124", "+0.124"],
        ["M-student × M-teacher", "−0.042", "−0.043", "−0.043"],
      ],
      note: null,
    },
    images: [
      { src: "/ML/learner-s.png", caption: "S-Learner cumulative gain" },
      { src: "/ML/learner-t.png", caption: "T-Learner cumulative gain" },
      { src: "/ML/learner-x.png", caption: "X-Learner cumulative gain" },
    ],
  },
  {
    id: "drl",
    label: "Doubly Robust",
    full: "Doubly Robust Learning",
    method:
      "DR estimator is consistent if either the propensity score or the outcome model is correctly specified — offering robustness to one misspecification. A policy tree on estimated CATEs identifies the strongest predictor of treatment effect heterogeneity.",
    identification: "Requires correct specification of at least one of: propensity score model or conditional outcome model.",
    finding:
      "F-student × F-teacher ATE = 0.126 — consistent with other estimates. Teacher salary is the first split in the policy tree: salary ≤ 3,362 separates the population with the largest predicted treatment benefit. Higher salary correlates with higher treatment effect.",
    table: {
      headers: ["Treatment", "DR Estimate"],
      rows: [
        ["Female", "−0.237"],
        ["F-student × F-teacher", "+0.126"],
        ["M-student × M-teacher", "−0.099"],
      ],
      note: "DR estimates under the DAG framework",
    },
    images: [
      { src: "/ML/drl-policytree.png", caption: "Policy tree — teacher salary is the primary CATE splitter" },
    ],
  },
  {
    id: "grf",
    label: "Causal Forest",
    full: "Generalised Random Forest (GRF)",
    method:
      "Causal forest splits trees to maximise heterogeneity in treatment effects rather than prediction error, with no imposed functional form. Variable importance ranks predictors by their contribution to treatment effect heterogeneity.",
    identification:
      "Requires unconfoundedness (Y₁, Y₀ ⊥ T | X) — propensity score not directly modelled here, which is the model's key limitation in this setting.",
    finding:
      "Classroom factors dominate heterogeneity: teacher experience, class size, and base salary rank highest in variable importance — consistent with the policy tree finding. The F-student × F-teacher treatment effect distribution is skewed positive; M-student × M-teacher is centred near zero, explaining why its point ATE is small and insignificant.",
    images: [
      { src: "/ML/grf-var-importance.png", caption: "GRF variable importance — classroom factors lead" },
      { src: "/ML/grf-ff.png",             caption: "Treatment effect: F-student × F-teacher" },
      { src: "/ML/grf-mm.png",             caption: "Treatment effect: M-student × M-teacher" },
      { src: "/ML/grf-female.png",         caption: "Treatment effect: Female (gender gap)" },
      { src: "/ML/grf-ff-dist.png",        caption: "CATE distribution: F-student × F-teacher" },
      { src: "/ML/grf-mm-dist.png",        caption: "CATE distribution: M-student × M-teacher" },
      { src: "/ML/grf-female-dist.png",    caption: "CATE distribution: Female" },
    ],
  },
  {
    id: "dml",
    label: "Double ML",
    full: "Double Machine Learning",
    method:
      "Debiased ML (Chernozhukov et al.) uses cross-fitting and residual-on-residual regression to remove regularisation bias. Linear DML and Causal Forest DML are compared for subgroup analysis by teacher salary.",
    identification:
      "Requires unconfoundedness. Caveat: treatment assignment is not randomised in this dataset, so ATE and CATE estimates carry selection bias — results are indicative, not causal.",
    finding:
      "Linear DML produces low-variance ITEs; Causal Forest DML captures richer heterogeneity. Linear model slightly outperforms on MSE but CF DML is preferred for heterogeneous effect estimation. Overall, both models suggest data does not require a complex functional form — consistent with S-learner's superior fit.",
    images: [
      { src: "/ML/dml-models.png",      caption: "LinearDML vs. CausalForest DML — model comparison" },
      { src: "/ML/dml-ite.png",         caption: "Individual treatment effects (Linear DML)" },
      { src: "/ML/dml-causalforest.png", caption: "CausalForest DML — heterogeneous ITEs" },
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
      <div className="pt-16 pb-10 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2 mb-4 text-xs font-sans" style={{ color: "var(--text-tertiary)" }}>
          <Link href="/writing" className="hover:text-[var(--accent)] transition-colors link-underline">Writing</Link>
          <span>/</span>
          <span>Economic Research</span>
        </div>
        <h1
          className="font-serif font-light mb-4"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.025em", color: "var(--text-primary)" }}
        >
          Gender Figures in Math: Do Female Math Teachers Impact Female Students' Outcomes?
        </h1>
        <p className="font-serif mb-6 max-w-[60ch]" style={{ color: "var(--text-secondary)", fontSize: "1.0625rem" }}>
          An applied investigation into causal machine learning methods — Double Machine Learning, Generalized Random
          Forests, and the DoWhy framework — as tools for economic policy evaluation. Drawing on UofT's first delivery
          of the Causal ML course under Dr. Nazanin Khazra, this paper applies nine econometric and ML methods to a
          large-scale field experiment from rural China (N&nbsp;=&nbsp;9,072), estimating the causal effect of female
          math teachers on female students' test scores. Across all models, female teachers close the gender gap in math
          achievement by approximately one-third — demonstrating how treatment effect estimation can move beyond
          correlation to support rigorous, evidence-based decisions.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-sans" style={{ color: "var(--text-tertiary)" }}>Wenhui Xu · 2024</span>
          <a
            href="/Eco/gender-gap-math.pdf"
            target="_blank"
            rel="noopener noreferrer"
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
      <section className="py-10 border-b" style={{ borderColor: "var(--border)" }}>
        <p className="text-xs font-sans tracking-[0.18em] uppercase mb-3" style={{ color: "var(--text-tertiary)" }}>Data</p>
        <h2 className="font-serif font-light mb-3" style={{ fontSize: "1.4rem", color: "var(--text-primary)" }}>
          Rural China Field Experiment, 2012–2014
        </h2>
        <p className="font-serif leading-relaxed mb-6 max-w-[64ch]" style={{ color: "var(--text-secondary)" }}>
          Data from a large-scale RCT across 216 schools in Shaanxi and Gansu provinces, originally designed to study
          teacher pay incentives. Students completed three standardised math tests; scores are normalised against a control
          group and expressed in standard deviations. This study extends the original by examining teacher gender effects.
          Only about 18% of female students were assigned a female math teacher, providing variation for identification.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { src: "/ML/sum-stats-1.png", caption: "Gender composition by pay-design group" },
            { src: "/ML/sum-stats-2.png", caption: "Summary statistics — student characteristics" },
            { src: "/ML/sum-stats-3.png", caption: "Mother's education × student outcomes" },
          ].map((img) => (
            <figure key={img.src} className="border" style={{ borderColor: "var(--border)" }}>
              <img src={img.src} alt={img.caption} className="w-full" />
              <figcaption className="px-3 py-2 text-2xs font-sans" style={{ color: "var(--text-tertiary)", borderTop: "1px solid var(--border)" }}>
                {img.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Model Showcase */}
      <section className="pt-10">
        <p className="text-xs font-sans tracking-[0.18em] uppercase mb-2" style={{ color: "var(--text-tertiary)" }}>
          Model Analysis
        </p>
        <p className="font-serif mb-6 max-w-[56ch]" style={{ color: "var(--text-secondary)" }}>
          Nine methods are applied to the same research question. Select a model to see the specification, identification
          strategy, and key results.
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
        <div key={active} className="animate-fade-up border p-6 md:p-8" style={{ animationDuration: "200ms", borderColor: "var(--border)", backgroundColor: "var(--surface)" }}>
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
                model.images.length === 2 ? "grid-cols-1 sm:grid-cols-2" :
                model.images.length === 3 ? "grid-cols-1 sm:grid-cols-3" :
                model.images.length >= 6 ? "grid-cols-2 sm:grid-cols-3" :
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
      <section className="mt-16 pt-10 border-t" style={{ borderColor: "var(--border)" }}>
        <p className="text-xs font-sans tracking-[0.18em] uppercase mb-3" style={{ color: "var(--text-tertiary)" }}>Discussion</p>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-serif font-semibold mb-3" style={{ fontSize: "1.1rem", color: "var(--text-primary)" }}>
              Consistent signal, heterogeneous magnitude
            </h3>
            <p className="font-serif leading-relaxed text-sm" style={{ color: "var(--text-secondary)" }}>
              Across all nine models, female students benefit significantly from female math teachers — reducing the gender
              gap by roughly one-third. The effect is not uniform: teacher salary and classroom quality amplify it
              (policy tree, causal forest), while boys with male teachers show a small, generally insignificant negative
              effect.
            </p>
          </div>
          <div>
            <h3 className="font-serif font-semibold mb-3" style={{ fontSize: "1.1rem", color: "var(--text-primary)" }}>
              Limitations & model-specific caveats
            </h3>
            <p className="font-serif leading-relaxed text-sm" style={{ color: "var(--text-secondary)" }}>
              Treatment assignment is not randomised within this study, so DML estimates carry selection bias. The
              causal forest and DAG estimates assume unconfoundedness conditional on observed controls. Ridge and LASSO
              confirm that a parsimonious specification is appropriate — no complex functional form is needed.
            </p>
          </div>
        </div>
      </section>

      {/* Back nav */}
      <div className="mt-16 pt-8 border-t" style={{ borderColor: "var(--border)" }}>
        <Link
          href="/writing"
          className="inline-flex items-center gap-2 text-sm font-sans transition-colors duration-150 hover:text-[var(--accent)]"
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

/**
 * content/teaching/en.ts
 * Teaching page copy — ECO375H5 Applied Econometrics I, University of Toronto.
 */

export const teachingContentEn = {
  overline: "Teaching",
  title: "Econometrics Teaching Materials",
  body: "Materials from four terms as TA for ECO375H5 Applied Econometrics I at the University of Toronto. R tutorials were developed for the Winter 2026 term; review slides were developed for the Fall 2025 term.",
  course: "ECO375H5 — Applied Econometrics I, University of Toronto",

  rSection: {
    label: "R Tutorials",
    term: "Winter 2026",
    note: "Each tutorial pairs a rendered PDF with the source .Rmd file.",
  },

  slidesSection: {
    label: "Review Slides",
    term: "Fall 2025",
    note: "Slides developed for STATA-based tutorials. Topics follow Wooldridge, Introductory Econometrics (7th ed.).",
  },

  rTutorials: [
    {
      id: "intro",
      title: "Introduction to R",
      desc: "Three-part setup guide covering R and RStudio installation, core object types, and data visualisation with ggplot2.",
      attribution: "Introduction to R source files (.Rmd) courtesy of Prof. Martin Burda, University of Toronto. All other tutorials are my own work.",
      tags: ["Setup", "R Objects", "ggplot2"],
      parts: [
        { label: "0a — Introduction to R", pdf: "/teaching/r/r-intro-0a.pdf", rmd: "/teaching/r/r-intro-0a.Rmd" },
        { label: "0b — R Objects",          pdf: "/teaching/r/r-intro-0b.pdf", rmd: "/teaching/r/r-intro-0b.Rmd" },
        { label: "0c — Graphics (ggplot2)", pdf: "/teaching/r/r-intro-0c.pdf", rmd: "/teaching/r/r-intro-0c.Rmd" },
      ],
    },
    {
      id: "tut2",
      title: "Simple Linear Regression — Computer Exercises",
      desc: "Chapter 1 computer exercises (C1 & C2) applying SLR to real datasets, interpreting coefficients and checking model fit.",
      tags: ["SLR", "OLS", "Interpretation"],
      parts: [
        { label: "Tutorial PDF", pdf: "/teaching/r/r-tut2.pdf", rmd: "/teaching/r/r-tut2.Rmd" },
      ],
    },
    {
      id: "tut3",
      title: "t-tests, Confidence Intervals & OLS Simulation",
      desc: "Monte Carlo simulation of the OLS estimator alongside classical hypothesis testing — building intuition for sampling distributions.",
      tags: ["t-test", "CI", "OLS", "Simulation"],
      parts: [
        { label: "Tutorial PDF", pdf: "/teaching/r/r-tut3.pdf", rmd: "/teaching/r/r-tut3.Rmd" },
      ],
    },
    {
      id: "tut4",
      title: "OLS Properties — Computer Exercises",
      desc: "Chapter 2 computer exercises (C6, C7, C8) verifying OLS algebraic properties and residual diagnostics in practice.",
      tags: ["OLS", "Residuals", "Diagnostics"],
      parts: [
        { label: "Tutorial PDF", pdf: "/teaching/r/r-tut4.pdf", rmd: "/teaching/r/r-tut4.Rmd" },
      ],
    },
    {
      id: "tut5",
      title: "OLS Residual Properties & Inference",
      desc: "Simulation-based exploration of OLS residual properties and sampling behaviour of test statistics under classical assumptions.",
      tags: ["Inference", "Residuals", "Simulation"],
      parts: [
        { label: "Tutorial PDF", pdf: "/teaching/r/r-tut5.pdf", rmd: "/teaching/r/r-tut5.Rmd" },
      ],
    },
    {
      id: "tut6",
      title: "Multiple Regression & Inference",
      desc: "Chapter 3–4 computer exercises covering multiple regression estimation, joint hypothesis tests, and confidence intervals in R.",
      tags: ["MLR", "F-test", "Inference"],
      parts: [
        { label: "Tutorial PDF", pdf: "/teaching/r/r-tut6.pdf", rmd: "/teaching/r/r-tut6.Rmd" },
      ],
    },
    {
      id: "tut7",
      title: "Dummy Variables & Robust Standard Errors",
      desc: "Binary and categorical regressors, interaction terms, and heteroskedasticity-robust standard errors with post-estimation tests.",
      tags: ["Dummy Variables", "Robust SE", "Heteroskedasticity"],
      parts: [
        { label: "Tutorial PDF", pdf: "/teaching/r/r-tut7.pdf", rmd: "/teaching/r/r-tut7.Rmd" },
      ],
    },
    {
      id: "tut8",
      title: "Instrumental Variables & 2SLS",
      desc: "IV estimation and two-stage least squares using the MROZ dataset — endogeneity, instrument validity, and weak instrument diagnostics.",
      tags: ["IV", "2SLS", "Endogeneity", "MROZ"],
      parts: [
        { label: "Tutorial PDF", pdf: "/teaching/r/r-tut8.pdf", rmd: "/teaching/r/r-tut8.Rmd" },
      ],
    },
  ],

  slides: [
    {
      id: "stats-review",
      title: "Statistical Review",
      desc: "Review of probability, sampling distributions, and hypothesis testing as foundations for regression analysis.",
      tags: ["Probability", "Sampling", "Hypothesis Testing"],
      pdf: "/teaching/slides/slides-tut1-stats-review.pdf",
    },
    {
      id: "slr",
      title: "Simple Linear Regression Review",
      desc: "Derivation and interpretation of OLS, fitted values, residuals, and the coefficient of determination.",
      tags: ["SLR", "OLS", "R-squared"],
      pdf: "/teaching/slides/slides-tut2-slr.pdf",
    },
    {
      id: "mlr",
      title: "Multiple Linear Regression Review",
      desc: "Extension to multiple regressors: OLS in matrix form, omitted variable bias, and Gauss-Markov assumptions.",
      tags: ["MLR", "OLS", "Omitted Variable Bias"],
      pdf: "/teaching/slides/slides-tut4-mlr.pdf",
    },
    {
      id: "midterm",
      title: "Midterm Review",
      desc: "Consolidated review of SLR, MLR, and inference topics covered in the first half of the course.",
      tags: ["SLR", "MLR", "Inference", "Review"],
      pdf: "/teaching/slides/slides-tut5-midterm.pdf",
    },
    {
      id: "ch6-ch7",
      title: "Further MLR Issues & Qualitative Variables",
      desc: "Functional form, scaling, and goodness-of-fit (Ch.6); dummy variables, interaction terms, and the Chow test (Ch.7).",
      tags: ["Functional Form", "Dummy Variables", "Chow Test"],
      pdf: "/teaching/slides/slides-tut8-ch6-ch7.pdf",
    },
    {
      id: "final",
      title: "Final Review",
      desc: "Comprehensive review of all course topics: SLR, MLR, inference, qualitative variables, and instrumental variables.",
      tags: ["SLR", "MLR", "IV", "Review"],
      pdf: "/teaching/slides/slides-tut10-final.pdf",
    },
  ],

  statusNote: "Public materials are selected from tutorials I authored. Student-submitted work and course-sensitive content are excluded.",
};

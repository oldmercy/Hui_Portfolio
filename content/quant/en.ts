/**
 * content/quant/en.ts
 * Quantitative Analysis page — English content.
 */

export type Assignment = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  pdfPath: string;
};

export type Course = {
  code: string;
  name: string;
  instructor?: string;
  language: string;
  tools: string[];
  description: string;
  githubUrl?: string;
  assignments: Assignment[];
};

export const quantContentEn = {
  overline: "Quantitative Analysis",
  title: "Coursework in Computational Economics",
  body: "Problem sets from two graduate courses in quantitative methods — each built as a self-contained computational report combining derivation, implementation, and interpretation.",

  courses: [
    {
      code: "ECO2404",
      name: "Industrial Organization",
      language: "Python",
      tools: ["Python", "PyBLP", "statsmodels", "NumPy", "SciPy"],
      description:
        "Four assignments in structural industrial organisation, building from classical IV estimation through Bertrand-Nash oligopoly simulation to BLP random-coefficients demand estimation. The final assignment uses the PyBLP library for full structural demand recovery.",
      githubUrl: "https://github.com/oldmercy/Industrial-orgnization_PyBLP",
      assignments: [
        {
          id: "A1",
          title: "Simultaneous Equations & IV Estimation",
          description:
            "Derives and estimates a structural demand-supply system. Instruments for the endogenous price using supply shifters; compares OLS and 2SLS across simulated markets.",
          tags: ["IV / 2SLS", "Demand-Supply", "Endogeneity", "Simulation"],
          pdfPath: "/quant/io/a1.pdf",
        },
        {
          id: "A2",
          title: "Bertrand-Nash Oligopoly",
          description:
            "Simulates a four-firm Bertrand-Nash pricing game across 1,000 markets. Recovers marginal costs and markups via IV regression; evaluates exclusion restrictions.",
          tags: ["Nash Equilibrium", "Oligopoly", "Markup Estimation", "Monte Carlo"],
          pdfPath: "/quant/io/a2.pdf",
        },
        {
          id: "A3",
          title: "BLP Demand — Logit & Optimal IV",
          description:
            "Estimates a multinomial logit demand model by OLS, 2SLS, and with optimal instruments. Jointly estimates demand and supply to recover cost parameters.",
          tags: ["Multinomial Logit", "Optimal IV", "Joint Estimation", "Structural IO"],
          pdfPath: "/quant/io/a3.pdf",
        },
        {
          id: "A4",
          title: "Structural Demand with PyBLP",
          description:
            "Full BLP random-coefficients demand model estimated via contraction mapping. Recovers consumer heterogeneity in price sensitivity across simulated markets.",
          tags: ["BLP", "PyBLP", "Random Coefficients", "Contraction Mapping"],
          pdfPath: "/quant/io/a4.pdf",
        },
      ],
    } satisfies Course,

    {
      code: "ECO2104",
      name: "Quantitative Macroeconomics",
      language: "Julia",
      tools: ["Julia", "DataFrames.jl", "Plots.jl", "Interpolations.jl"],
      description:
        "Four problem sets covering the core numerical toolkit of modern macro: floating-point arithmetic, dynamic programming via value function iteration, function approximation, and heterogeneous-agent general equilibrium.",
      githubUrl: undefined,
      assignments: [
        {
          id: "PS1",
          title: "Floating Point & Numerical Precision",
          description:
            "Analyses catastrophic cancellation in the quadratic formula and implements the numerically stable alternative. Quantifies error growth across eight orders of magnitude.",
          tags: ["Floating Point", "Numerical Stability", "Error Analysis", "Julia"],
          pdfPath: "/quant/macro/ps1.pdf",
        },
        {
          id: "PS2",
          title: "Value Function Iteration",
          description:
            "Solves the Bellman equation for the neoclassical growth model using standard VFI. Recovers the value and policy functions over a capital grid with log utility.",
          tags: ["VFI", "Bellman Equation", "Dynamic Programming", "Neoclassical Growth"],
          pdfPath: "/quant/macro/ps2.pdf",
        },
        {
          id: "PS3",
          title: "Function Approximation",
          description:
            "Approximates three utility functions using linear interpolation, natural cubic splines, and Chebyshev polynomials. Compares convergence and accuracy on adaptive vs. uniform grids.",
          tags: ["Interpolation", "Cubic Spline", "Chebyshev", "Approximation Theory"],
          pdfPath: "/quant/macro/ps3.pdf",
        },
        {
          id: "PS4",
          title: "Numerical Methods + Aiyagari (1994)",
          description:
            "Implements numerical differentiation and root-finding routines, then applies them to solve the Aiyagari (1994) heterogeneous-agent GE model with idiosyncratic income risk via Rouwenhorst discretisation.",
          tags: ["Aiyagari", "Heterogeneous Agents", "Root Finding", "GE Equilibrium"],
          pdfPath: "/quant/macro/ps4.pdf",
        },
      ],
    } satisfies Course,
  ] as Course[],
};

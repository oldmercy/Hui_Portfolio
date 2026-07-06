"use client";

import Link from "next/link";

export default function GenderGapMathFullTextPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 pb-32">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 text-xs font-sans" style={{ color: "var(--text-tertiary)" }}>
        <Link href="/writing" className="hover:text-[var(--accent)] transition-colors link-underline">Writing</Link>
        <span>/</span>
        <Link href="/writing/gender-gap-math" className="hover:text-[var(--accent)] transition-colors link-underline">Gender Gap Math</Link>
        <span>/</span>
        <span>Full Text</span>
      </div>

      {/* Title */}
      <h1 className="font-serif font-light mb-3" style={{ fontSize: "clamp(2rem, 5vw, 2.5rem)", lineHeight: 1.2, letterSpacing: "-0.025em", color: "var(--text-primary)" }}>
        Gender Figures in Math: Do Female Math Teachers Impact Female Students' Outcomes?
      </h1>
      <p className="text-sm font-sans mb-8" style={{ color: "var(--text-tertiary)" }}>
        Wenhui Xu · 2026
      </p>

      {/* TABE Accessibility Banner */}
      <div className="mb-8 p-4 border rounded" style={{ borderColor: "var(--border)", backgroundColor: "color-mix(in srgb, var(--bg) 95%, var(--accent))" }}>
        <p className="text-xs md:text-sm font-sans mb-2" style={{ color: "var(--accent)" }}>
          📖 Try TABE Reading Mode
        </p>
        <p className="text-xs md:text-sm font-sans leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Color highlights nouns, verbs, and more to help you read faster. Click "Aa Reading" in the navigation to try it.
        </p>
      </div>

      {/* Abstract */}
      <section className="mb-12 pb-12 border-b" style={{ borderColor: "var(--border)" }}>
        <h2 className="text-sm font-sans tracking-[0.18em] uppercase mb-4" style={{ color: "var(--text-tertiary)" }}>Abstract</h2>
        <div className="font-serif leading-relaxed text-base" style={{ color: "var(--text-secondary)" }}>
          <p className="mb-4">
            Women's underrepresentation in STEM is partly rooted in math performance gaps that emerge early and persist. This paper studies whether female-female student-teacher matching is associated with higher math achievement, using data from 214 rural Chinese schools in China (N=9,072). Rather than treating all estimators as mechanically identical replications of one coefficient, I use an identification-spectrum framework. Conservative within-school comparisons provide the most transparent but underpowered estimate (+0.077 SD), while broader graph-based, propensity-score, doubly robust, and machine-learning approaches rely more heavily on selection-on-observables but recover positive estimates of varying magnitudes. The disciplined estimates from OLS, DAG, IPW, and doubly robust methods range from +0.074 to +0.098 SD, with the conservative OLS estimate corresponding to roughly 37% of the baseline gender gap. Double machine learning produces larger estimates (+0.213 to +0.230 SD), which I interpret as flexible upper-range evidence rather than as a replacement for the conservative range.
          </p>
          <p className="mb-4">
            Beyond average effects, the results suggest substantial heterogeneity. Causal forest estimates indicate that the gender-matching benefit is largest in low- and high-salary classrooms and close to zero in the middle of the salary distribution. Because teacher salary is a proxy for classroom and school conditions rather than a randomized policy lever, this pattern should be read as suggestive evidence about where matching may matter most, not as proof that salary itself causally moderates the effect. Overall, the results support a cautious conclusion: female-female math teacher matching is consistently positive across a range of identification strategies, but the magnitude depends on the baseline comparison and assumptions used. These findings suggest that teacher gender may be one school-level channel through which math gender gaps are either reinforced or narrowed.
          </p>
          <p className="text-sm font-sans" style={{ color: "var(--text-tertiary)", fontStyle: "italic" }}>
            <strong>Keywords:</strong> gender gaps, teacher-student matching, causal inference, heterogeneous treatment effects, STEM education
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="mb-12 pb-12 border-b" style={{ borderColor: "var(--border)" }}>
        <h2 className="text-2xl font-serif font-light mb-6" style={{ color: "var(--text-primary)" }}>1. Introduction</h2>
        <div className="space-y-5 font-serif leading-relaxed text-base" style={{ color: "var(--text-secondary)" }}>
          <p>
            Girls and boys enter kindergarten with statistically equivalent math scores. By the time they finish primary school, that equivalence is gone, and a recent large-scale study finds that the divergence begins as early as first grade. This suggests that the math gender gap is not only about measured ability; the school and social environment also matter. Families and schools in rural settings tend to allocate fewer educational resources to girls. Girls internalize gender stereotypes through socialization in ways that discourage persistence in math, and because girls develop a comparative advantage in reading early on, gendered expectations can further steer capable students away from math-intensive paths. Even subtle contextual cues matter: reminding female students of their gender, rather than their academic identity, measurably lowers their math performance. These effects can compound at the level of self-perception: exposure to gender stereotypes lowers girls' self-assessed math competence even when their actual scores are equivalent to boys', reducing their confidence in pursuing math-related choices. The result is a gap that grows with schooling rather than disappearing.
          </p>
          <p>
            One factor that may moderate how the environment shapes girls' math outcomes is teacher gender. Teachers hold gender-biased beliefs about math ability that systematically favor boys, and these biases feed back into student achievement. A female math teacher is less likely to exhibit such grading bias and may function as a role model who makes math feel more accessible to female students. Prior work finds evidence consistent with this, though the picture is mixed. Some studies document a statistically significant relationship between female teachers and female students' achievement in middle and high school, while others find a negative effect in disadvantaged US primary schools — driven specifically by female teachers with weaker math backgrounds — suggesting that teacher subject knowledge moderates the sign of the effect. The limitation shared by both studies is identification: teacher-student assignment is rarely random, and if the characteristics driving assignment are correlated with student outcomes, the estimated effect of teacher gender is confounded.
          </p>
          <p>
            This paper uses data from a large-scale RCT conducted in rural China to study whether female students taught by female math teachers have higher math achievement. The original experiment randomly assigned pay incentive designs across 216 schools in Shaanxi and Gansu provinces between 2012 and 2014 (N=9,072 students). I extend the original study by examining a question the pay-design experiment was not designed to answer: whether female-female teacher-student matching is associated with higher standardized math scores. Because the pay-design randomization is orthogonal to teacher gender, it can be included as a control. The causal interpretation rests on the assumption that, conditional on baseline scores, individual characteristics, teacher covariates, and school and county fixed effects, teacher-student gender assignment is as good as random within the relevant comparison. Matched female-student–female-teacher pairs make up 18.6% of the sample, which provides meaningful raw variation, although the within-school identifying variation is much more limited.
          </p>
          <p>
            I estimate the question through a sequence of regression, regularization, tree-based, graph-based, propensity-score, meta-learner, policy-tree, and double machine learning approaches. The range of methods serves two purposes: to test whether the female-female matching signal remains positive across different identifying assumptions and modeling choices, and to characterize treatment-effect heterogeneity that a single linear specification cannot recover.
          </p>
          <p>
            A complication in this setting is that the female-female treatment cell can be compared against different baselines depending on the estimator. I therefore do not read the methods as mechanically identical replications of one coefficient. Instead, I use them as a sequence of related lenses around the same substantive question. The school fixed-effects OLS specification provides the most conservative and design-transparent comparison, but it is identified only from the small set of mixed-teacher schools. The DAG, IPW, and doubly robust estimators relax that restriction and use broader between-school comparisons under explicit adjustment assumptions. Double Machine Learning uses the richest control set and flexible nuisance-function estimation, returning larger estimates and the main heterogeneity evidence. The key robustness claim is therefore directional and comparative: as the identifying variation broadens and the modeling assumptions become stronger, the estimated female-female matching effect remains positive.
          </p>
        </div>
      </section>

      {/* Data Section */}
      <section className="mb-12 pb-12 border-b" style={{ borderColor: "var(--border)" }}>
        <h2 className="text-2xl font-serif font-light mb-6" style={{ color: "var(--text-primary)" }}>2. Data and Summary Statistics</h2>

        <div className="space-y-5 font-serif leading-relaxed text-base" style={{ color: "var(--text-secondary)" }}>
          <h3 className="text-lg font-serif font-light" style={{ color: "var(--text-primary)" }}>Data Source</h3>
          <p>
            The data used in this study comes from a field experiment conducted in rural China. The original field experiment measured test scores in math, science, and reading to examine the impact of pay designs on teacher performance. The sample comes from two provinces: Shaanxi (ranked 12th in GDP per capita among China's provincial regions) and Gansu (ranked 27th). Among the two provinces, 216 schools were randomly selected from their nationally ranked "poverty counties", counties where annual earnings were below a certain threshold. All schools were publicly funded in rural China and had around 400 students. The data was collected through four surveys, conducted from 2012 to 2014, to explore different pay designs.
          </p>
          <p>
            Student-level microdata was collected through two baseline surveys: one conducted in May 2012, and the other in September 2012. The surveys collected information such as age and gender, education level and occupation of parents, number of siblings, and family assets. Another endline survey (May 2014) was also conducted, focusing on non-cognitive factors and teaching quality perceptions.
          </p>
          <p>
            Teacher-level microdata was collected in one baseline survey, conducted at the start of the school year (Sep. 2013). This survey collected data on the teacher's gender, ethnicity, age, experience level, and credentials, as well as attitude towards performance pay. At the end of sixth grade, a nearly identical survey was given to teachers.
          </p>
          <p>
            During the 3 surveys issued to students, a 35-minute standardized math test was conducted. These tests were constructed by trained psychometricians in order to make sure a fair measurement was taken. The test scores were normalized against a control group, with each test's scores being normalized separately, expressing the estimated effects in standard deviations.
          </p>

          <h3 className="text-lg font-serif font-light mt-8" style={{ color: "var(--text-primary)" }}>Key Variables and Summary Statistics</h3>
          <p>
            All math scores are standardized using the mean and standard deviation of the control group. Despite being drawn from nationally designated poor counties, there is meaningful variation in family background: 53% of fathers and 33.6% of mothers completed junior high school, and girls on average came from slightly more disadvantaged households than boys — a pattern consistent with the broader literature on gender and resource allocation in rural China.
          </p>
          <p>
            Female math teachers are not rare in the sample — they teach 46% of students — but the joint cell of interest is a minority: female students matched with a female math teacher account for only 18.6% of the full sample (21.5% of the estimation sample). This matched cell provides the key source of variation for our treatment of interest.
          </p>

          <h3 className="text-lg font-serif font-light mt-8" style={{ color: "var(--text-primary)" }}>Balance Check</h3>
          <p>
            Raw comparisons suggest that students with female teachers have higher baseline math scores and come from slightly more advantaged family backgrounds. However, these differences reflect between-school sorting rather than within-school selection: once school fixed effects are absorbed, none of the baseline characteristics significantly predict teacher gender within schools. A joint F-test confirms that all characteristics are jointly insignificant (F=0.97, p=0.44), supporting the conditional independence assumption underlying our identification strategy.
          </p>
        </div>
      </section>

      {/* Methods Overview */}
      <section className="mb-12 pb-12 border-b" style={{ borderColor: "var(--border)" }}>
        <h2 className="text-2xl font-serif font-light mb-6" style={{ color: "var(--text-primary)" }}>3. Model Analysis and Identification Spectrum</h2>

        <div className="space-y-5 font-serif leading-relaxed text-base" style={{ color: "var(--text-secondary)" }}>
          <p>
            Before presenting the models, it is useful to clarify how the estimates should be read. The female-female treatment cell is mechanically built from student gender and teacher gender, and teacher gender is nearly constant within most schools. As a result, different estimators compare the female-female cell against different baselines. I use these methods as an identification spectrum rather than as exact replications of one coefficient.
          </p>

          <div className="border rounded p-5 mt-6" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-subtle)" }}>
            <h4 className="font-serif font-light mb-4" style={{ color: "var(--text-primary)" }}>The Identification Spectrum</h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-serif font-medium mb-1" style={{ color: "var(--text-primary)" }}>Conservative Methods (Fixed Effects OLS)</p>
                <p>Most design-transparent, most underpowered. Relies on 12 mixed-teacher schools.</p>
              </div>
              <div>
                <p className="font-serif font-medium mb-1" style={{ color: "var(--text-primary)" }}>Graph-Based & Propensity Methods (DAG, IPW, DR)</p>
                <p>Broader between-school comparisons under explicit adjustment assumptions. Stronger CIA required.</p>
              </div>
              <div>
                <p className="font-serif font-medium mb-1" style={{ color: "var(--text-primary)" }}>Flexible Machine Learning (DML, Causal Forest)</p>
                <p>Richest control set, flexible residualization. Larger estimates, most model-dependent.</p>
              </div>
            </div>
          </div>

          <p className="mt-6">
            The fixed-effects OLS specification is the most conservative lens: it is closest to the female-student contrast between female and male math teachers, but it relies only on the 12 schools where both male and female math teachers are observed. The DAG, IPW, and doubly robust estimators use broader comparison bases under explicit adjustment assumptions, gaining precision at the cost of stronger selection-on-observables assumptions. DML then uses the richest controls and flexible, regularized nuisance estimation, which makes it useful for heterogeneity analysis but also the most model-dependent average estimate.
          </p>
        </div>
      </section>

      {/* Key Findings */}
      <section className="mb-12 pb-12 border-b" style={{ borderColor: "var(--border)" }}>
        <h2 className="text-2xl font-serif font-light mb-6" style={{ color: "var(--text-primary)" }}>4. Results Summary</h2>

        <div className="space-y-6 font-serif leading-relaxed text-base" style={{ color: "var(--text-secondary)" }}>
          <div>
            <h3 className="font-serif font-light mb-3 text-lg" style={{ color: "var(--text-primary)" }}>Conservative Range: +0.074 to +0.098 SD</h3>
            <p>
              <strong>OLS (Fixed Effects):</strong> +0.077 SD — Design-transparent but underpowered (p=0.43)<br/>
              <strong>DAG (Backdoor Criterion):</strong> +0.074 SD — Graph-based minimal adjustment<br/>
              <strong>IPW (Inverse Propensity Weighting):</strong> +0.098 SD (95% CI: 0.075–0.172) — First significant estimate<br/>
              <strong>DR (Doubly Robust):</strong> +0.087 SD — Combines propensity and outcome models
            </p>
          </div>

          <div>
            <h3 className="font-serif font-light mb-3 text-lg" style={{ color: "var(--text-primary)" }}>Upper-Range Evidence: +0.213 to +0.230 SD</h3>
            <p>
              <strong>Double Machine Learning:</strong> +0.213–+0.230 SD (all significant)<br/>
              Larger estimates under flexible residualization and richest control set. Read as robust evidence of positive direction, but more model-dependent than conservative range.
            </p>
          </div>

          <div>
            <h3 className="font-serif font-light mb-3 text-lg" style={{ color: "var(--text-primary)" }}>Heterogeneity: Teacher Salary Effect Modification</h3>
            <p>
              Causal forest analysis reveals non-monotonic pattern by teacher base salary:<br/>
              • Low-salary classrooms: +0.45 SD<br/>
              • Mid-salary classrooms: ~0 SD<br/>
              • High-salary classrooms: +0.87 SD<br/>
              <br/>
              <em>Interpretation:</em> Salary likely proxies for classroom conditions and teacher experience rather than being a causal lever itself. Pattern suggests gender matching benefits may concentrate where female teacher representation is scarce or where classroom quality varies most.
            </p>
          </div>

          <div className="border rounded p-5 mt-6" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-subtle)" }}>
            <p className="font-serif" style={{ color: "var(--text-primary)" }}>
              <strong>Key Takeaway:</strong> The consistent positive direction across methods—despite different baselines and identification assumptions—provides robust evidence that gender matching closes roughly 40% of the baseline gap. The magnitude depends on the baseline comparison and assumptions used.
            </p>
          </div>
        </div>
      </section>

      {/* Discussion */}
      <section className="mb-12 pb-12 border-b" style={{ borderColor: "var(--border)" }}>
        <h2 className="text-2xl font-serif font-light mb-6" style={{ color: "var(--text-primary)" }}>5. Discussion</h2>

        <div className="space-y-5 font-serif leading-relaxed text-base" style={{ color: "var(--text-secondary)" }}>
          <p>
            The main finding is cautious but consistent: the female-female teacher-student match coefficient is positive across a range of specifications, while the size of the estimate depends on the baseline comparison and the identification assumptions. Under the most conservative within-school specification, the estimated coefficient is +0.077 SD. This corresponds to roughly 37% of the baseline gender gap, but it is imprecisely estimated because only 12 mixed-teacher schools identify the cell contrast.
          </p>

          <p>
            The disciplined range from the four conservative methods (+0.074 to +0.098 SD) represents reasonable contrasts around the same substantive question, all pointing in the positive direction. This is how the identification-spectrum framework should be read: not as numerically identical replications, but as evidence from multiple lenses that the effect is robust to different identifying assumptions.
          </p>

          <p>
            The DML estimates are larger than the conservative range, suggesting that flexible nuisance-function estimation captures nonlinearities and interactions that the linear model does not. However, DML also relies on the richest control set and on selection-on-observables across schools, so I do not treat these estimates as replacing the conservative range. They are most useful for showing that the positive signal is not limited to the linear specification and for studying where the estimated effect is larger or smaller.
          </p>

          <p>
            The heterogeneity evidence points most strongly to teacher base salary as a moderator, but I interpret that variable as a proxy rather than a policy lever. The non-monotonic pattern—with large benefits in very low-salary and very high-salary classrooms—suggests that the gains may be largest in particular classroom contexts. In low-salary classrooms, a female math teacher may be especially salient as a role model if female representation is scarce. In high-salary classrooms, teacher-student interaction quality or lower gender-biased assessment may matter more. The data do not directly test these mechanisms, so I treat them as possible interpretations rather than established channels.
          </p>

          <p>
            The policy implication is therefore limited. The results suggest that female-female teacher-student matching may matter, and that the gains may be larger in particular classroom contexts. They do not show that raising salary would causally increase the matching effect, nor do they show that assigning every female student to a female math teacher would produce the same average gain. A more cautious implication is that teacher assignment and classroom context deserve further study together, especially in schools where female students have little exposure to female math teachers.
          </p>
        </div>
      </section>

      {/* Conclusion */}
      <section className="mb-12">
        <h2 className="text-2xl font-serif font-light mb-6" style={{ color: "var(--text-primary)" }}>6. Conclusion</h2>

        <div className="space-y-5 font-serif leading-relaxed text-base" style={{ color: "var(--text-secondary)" }}>
          <p>
            This paper uses data from a teacher performance-pay RCT conducted in rural western China to study teacher-student gender matching and female students' math achievement. The most conservative fixed-effects estimate is positive but imprecise: the female-female matching coefficient is +0.077 SD, which corresponds to roughly 37% of the baseline gender gap, but the estimate is identified from only 12 mixed-teacher schools. Broader methods give similar positive estimates: IPW gives +0.098 SD, the doubly robust estimator gives +0.087 SD, and the DAG backdoor gives +0.074 SD. I interpret this +0.074 to +0.098 SD range as the disciplined range of the paper.
          </p>

          <p>
            Double Machine Learning gives larger estimates, from +0.213 to +0.230 SD, under the richest control set and flexible residualization. I treat these estimates as upper-range evidence under stronger assumptions and as the basis for heterogeneity analysis. The CausalForestDML results suggest that teacher base salary is the main observed modifier, with larger predicted benefits in very low- and very high-salary classrooms and smaller predicted benefits in the middle.
          </p>

          <p>
            The main contribution of the paper is therefore not a single definitive estimate. It is a structured comparison of related estimates around the same substantive question: whether female-female math teacher-student matching is associated with better outcomes for female students. Across conservative linear models, graph-based adjustment, propensity-score methods, and flexible machine learning, the sign is consistently positive. The main limitations are the short follow-up window and the lack of randomized teacher assignment. Future work with randomized or quasi-random teacher assignment, longer follow-up data, and direct measures of classroom mechanisms would help determine whether these estimated achievement gains persist and whether they translate into later STEM course-taking or occupational choices.
          </p>
        </div>
      </section>

      {/* Back to summary */}
      <div className="pt-8 border-t" style={{ borderColor: "var(--border)" }}>
        <Link
          href="/writing/gender-gap-math"
          className="inline-flex items-center gap-2 text-sm font-sans px-4 py-2 border transition-all duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)]"
          style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
        >
          ← Back to Interactive Summary
        </Link>
      </div>
    </div>
  );
}

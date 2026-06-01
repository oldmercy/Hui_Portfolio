/**
 * content/site/zh.ts
 * 中文站点内容占位层 — 当前为空壳，结构与 en.ts 保持一致。
 * 填充中文内容时，直接替换各字段值即可，无需修改页面组件。
 *
 * Future: pages will call getSiteContent('zh') and receive this object.
 */

import type { siteContentEn } from "./en";

// Placeholder — shape matches en.ts exactly so TypeScript can validate
// when real content is filled in.
export const siteContentZh: typeof siteContentEn = {
  metadata: {
    title: "徐文惠 — 经济学家 & 数据科学家",
    description: "徐文惠的学术写作、研究成果与工具集，经济学家与数据科学家，现居多伦多。",
    ogTitle: "徐文惠",
    ogDescription: "经济学家 & 数据科学家，现居多伦多。",
  },

  home: {
    hero: {
      overline: "证据驱动的决策系统",
      headline: "我在研究、数据、政策与工作流设计之间搭建决策系统。",
      headlineAccent: "工作流设计。",
      body: "徐文惠（Hwei）— 现居多伦多，受经济学与数据分析训练的分析者。我结合因果推理、政策证据、应用数据和面向读者的表达，把复杂问题转化为可使用的判断。",
      cta: {
        primary:   { label: "阅读我的文章", href: "/writing" },
        secondary: { label: "联系我",       href: "mailto:hui90785641@gmail.com" },
      },
    },
    stats: [
      { value: "4 学期", label: "面向不同背景学生讲授计量经济学" },
      { value: "3 个领域", label: "经济研究、政策分析、商业分析" },
      { value: "公开 + 内部", label: "面向学术与应用读者的研究和简报产出" },
      { value: "1 个工具", label: "为密集文本设计的开源阅读系统" },
    ],
    featured: {
      paperSlug: "causal-inference-business",
      toolKey:   "cantread",
    },
    writingSection: { label: "精选作品", allLabel: "全部论文 →" },
    toolsSection:   { label: "工作流与工具系统" },
  },

  about: {
    overline: "关于我",
    name: "徐文惠",
    nickname: "我通常用 Hui 这个名字。我在研究、数据、政策与工作流设计之间搭建证据驱动的决策系统。",
    bio: [
      `我的工作兴趣在数据、证据和人的判断交汇处。`,
      `我的背景是经济学和数据分析，但贯穿我工作的主线不是某一种方法或工具。我更关心那些材料不完整、假设很重要、而输出必须真正能被别人使用的问题。`,
      `无论是市政经济研究、计量经济学教学、政策写作、商业分析，还是 AI 辅助工作流，我反复做的是同一件事：整理混乱信息，用证据检验 claim，并把结果变成别人可以检查、质疑和使用的判断。`,
      `这也是我重视工作流设计的原因。好的工作流能保护判断质量：让来源可见、假设明确，避免最终叙事跑在证据前面。`,
    ],
    bioAccentWords: ["工作流设计", "来源可见", "假设明确", "证据"],
    quickFacts: [
      { label: "目前",   value: "多伦多大学，经济数据分析，硕士在读" },
      { label: "现居",   value: "加拿大多伦多" },
      { label: "来自",   value: "中国杭州" },
      { label: "关注",   value: "证据驱动的决策支持" },
      { label: "方法",   value: "经济学 · 数据分析 · 工作流设计" },
      { label: "邮件",   value: "hui90785641@gmail.com", href: "mailto:hui90785641@gmail.com" },
      { label: "GitHub", value: "oldmercy",              href: "https://github.com/oldmercy" },
      { label: "LinkedIn", value: "huixu01",             href: "https://www.linkedin.com/in/huixu01/" },
    ],
    approach: {
      evidence: ["文献综述", "来源映射", "Claim 边界", "政策选项"],
      analysis: ["计量经济学", "因果推断", "面板数据", "商业分析"],
      communication: ["政策简报", "教学材料", "公开数据画像", "面向读者的写作"],
      systems: ["Python 自动化", "LLM 信息抽取", "TABE / CantRead", "文档与 QA"],
    },
    skills: {
      languages: ["Python", "R", "SQL", "SAS", "STATA", "Julia"],
      tools:     ["Excel", "Tableau", "Power BI", "Git", "GitHub", "LaTeX"],
      libraries: ["pandas", "NumPy", "statsmodels", "pyblp", "EconML", "DoWhy", "scikit-learn", "LightGBM", "xgboost", "ggplot2", "dplyr", "pdfplumber"],
      models:    [
        "因果推断",
        "双重机器学习 / DML",
        "因果森林 / GRF",
        "异质性处理效应",
        "面板数据模型",
        "动态面板 GMM",
        "时间序列计量",
        "VAR / VEC",
        "结构需求估计",
        "BLP-Style Models",
        "动态规划 / VFI",
        "政策选项分析",
        "监测与评估设计",
        "Prompt Engineering",
        "LLM 辅助信息抽取",
      ],
    },
    hobbies: [
      { label: "阅读",   desc: "虚构与非虚构兼读，尤其喜欢经济史、社会分析和文学小说。" },
      { label: "电影",   desc: "经典电影与当代艺术片，欢迎推荐。" },
      { label: "钩织",   desc: "把毛线变成有形之物，这个过程令人平静。" },
      { label: "园艺",   desc: "耐心的工作；看着植物生长本身就很满足。" },
      { label: "烹饪",   desc: "带杭州风格的家常菜，偶尔野心勃勃，通常讲究实用。" },
      { label: "猫",     desc: "多猫家庭。它们是非常不帮忙的科研助理。" },
    ],
  },

  writing: {
    overline: "学术写作",
    title: "论文与研究",
    body: "经济研究与商业分析领域的写作样本——每篇均可全文阅读，并支持可选的 TABE 阅读模式。",
    tabeLabel: "TABE 阅读模式",
    tabeHref: "/tools",
    earlierWork: "早期作品",
  },

  footer: {
    copyright: "© 2025 徐文惠",
    links: [
      { label: "GitHub",   href: "https://github.com/oldmercy" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/huixu01/" },
      { label: "邮件",     href: "mailto:hui90785641@gmail.com" },
    ],
  },
};

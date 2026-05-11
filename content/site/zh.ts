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
      overline: "经济学家",
      headline: "我研究过去，为了更好的未来。",
      headlineAccent: "更好的未来。",
      body: "徐文惠（Hwei）— 多伦多大学经济数据分析硕士在读。我从数据中寻找规律，估计因果，用数字讲述故事。",
      cta: {
        primary:   { label: "阅读我的文章", href: "/writing" },
        secondary: { label: "联系我",       href: "mailto:hui90785641@gmail.com" },
      },
    },
    stats: [
      { value: "3",   label: "已发表论文" },
      { value: "4年", label: "研究经验" },
      { value: "多伦多", label: "现居" },
      { value: "杭州",   label: "来自" },
    ],
    featured: {
      paperSlug: "causal-inference-business",
      toolKey:   "cantread",
    },
    writingSection: { label: "最新写作", allLabel: "全部论文 →" },
    toolsSection:   { label: "开源工具" },
  },

  about: {
    overline: "经济学家",
    name: "徐文惠",
    nickname: "惠（Hwei）— 文惠的简称",
    bio: [
      `人们常说："太阳之下无新事。"我研究过去，为了更好的未来。从数据中发现规律、拼凑缺失的碎片，一直令我着迷——我喜欢用数字讲故事，分享从中学到的经验。`,
      `我很荣幸成为 UofT 因果机器学习课程第一届学生，授课教师为 Nazanin Khazra 博士。我熟练运用 EconML、DoWhy 和 LightGBM 等 Python 工具包，研究商业与经济领域中因果推断问题——在那些领域，区分相关与因果具有真实的后果。`,
      `我拥有四年跨数据分析、研究、商业分析与教学的项目经验。我珍视每一次提出重要问题、并尝试严谨回答的机会。`,
      `我是一个兴趣驱动的人，对知识的渴望推动我不断前进。但更紧迫的问题是：我能用这些知识做什么？我正在寻找志同道合的合作者，一起做一些不同的事。`,
    ],
    bioAccentWords: ["EconML", "DoWhy", "LightGBM"],
    quickFacts: [
      { label: "目前",   value: "多伦多大学，经济数据分析，硕士在读" },
      { label: "现居",   value: "加拿大多伦多" },
      { label: "来自",   value: "中国杭州" },
      { label: "邮件",   value: "hui90785641@gmail.com", href: "mailto:hui90785641@gmail.com" },
      { label: "GitHub", value: "oldmercy",              href: "https://github.com/oldmercy" },
      { label: "LinkedIn", value: "huixu01",             href: "https://www.linkedin.com/in/huixu01/" },
    ],
    skills: {
      languages: ["Python", "R", "SQL", "SAS", "STATA"],
      tools:     ["Tableau", "PowerBI", "Excel", "GitHub"],
      libraries: ["EconML", "DoWhy", "SkLearn", "LightGBM", "Grf", "ggplot2", "xgboost", "dplyr"],
      models:    [
        "双重机器学习",
        "因果森林 / GRF",
        "回归与分类树",
        "梯度提升 & Bagging",
        "面板数据模型",
        "时间序列（ARMA, NNAR）",
        "VAR / VEC",
        "GMM / MLE",
      ],
    },
    hobbies: [
      { emoji: "📚", label: "阅读",   desc: "虚构与非虚构兼读——从经济史到文学小说。" },
      { emoji: "🎬", label: "电影",   desc: "经典电影与当代艺术片，欢迎推荐。" },
      { emoji: "🧶", label: "钩织",   desc: "把毛线变成有形之物，这个过程令人平静。" },
      { emoji: "🌱", label: "园艺",   desc: "耐心的工作——看着植物生长，有种难以言说的满足感。" },
      { emoji: "🍳", label: "烹饪",   desc: "带杭州风格的家常菜，偶尔野心勃勃，常常美味。" },
      { emoji: "🐱", label: "猫",     desc: "多猫家庭。它们是毫无贡献的科研助理。" },
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

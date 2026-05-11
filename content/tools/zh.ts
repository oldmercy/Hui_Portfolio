/**
 * content/tools/zh.ts
 * 中文工具页内容占位层 — 结构与 en.ts 保持一致。
 */

import type { toolsContentEn } from "./en";

export const toolsContentZh: typeof toolsContentEn = {
  page: {
    overline: "开源 · 无障碍阅读",
    title: "CantRead",
    subtitle:
      "专为难以阅读大段文字的大脑设计。TABE（类型标注证据体）通过颜色标注语言，让读者能够一眼浏览密集的学术文章。",
  },

  tabe: {
    sectionTitle: "TABE 系统",
    description: [
      "这个格式最初是我在求职期间记录社交笔记时开发的。后来发现它对所有觉得密集文字难以解析的人都有效——包括有 ADHD、阅读障碍，或者同时打开了太多浏览器标签的人。",
      "一套统一的标注格式，可应用于任何场景：文档、论文、RSS 订阅、PDF。大脑很快就能学会这套视觉语法，然后就不再需要反复重读句子了。",
    ],
    legend: [
      { cls: "tabe-noun", label: "粗体",     desc: "名词 — 承载论点的事物、实体与概念" },
      { cls: "tabe-verb", label: "黄色高亮", desc: "动词 — 推动句子发展的动作与状态" },
      { cls: "tabe-adj",  label: "斜体绿色", desc: "形容词 / 副词 — 可以优先略读的修饰词" },
      { cls: "tabe-num",  label: "橙色",     desc: "数字、统计数据、日期 — 一眼即可扫描" },
    ],
  },

  demo: {
    sectionTitle: "在线体验",
    editButtonLabel: "粘贴自己的文字",
    cancelButtonLabel: "取消",
    enableLabel: "启用 TABE",
    onLabel: "TABE 已开启",
    processingLabel: "处理中…",
    applyLabel: "应用 TABE →",
    poweredBy: "compromise.js",
    poweredByHref: "https://github.com/spencermountain/compromise",
    poweredByNote: "NLP 完全在您的浏览器中运行，不会向服务器发送任何数据。",
    defaultText: `因果推断从根本上改变了经济学家评估复杂政策的方式。当政府引入新的最低工资法时，研究人员必须确定，观察到的就业变化究竟是政策本身导致的，还是恰好与立法同步发生的更广泛经济趋势的结果。

双重机器学习通过使用交叉拟合和正则化回归，在估计处理效应之前剔除高维控制变量的影响，从而解决这一挑战。使用这些方法的单项研究可以影响数十个司法管辖区数百万个政策决策。

核心洞见其实很简单：除非我们仔细构建了识别策略，否则两个变量之间的相关性对因果关系毫无说明意义。理解这一区别的经济学家，才能产出真正推动现实改变的研究。`,
  },

  integration: {
    overline: "已集成至本站全站",
    body: "本站每篇论文的页眉都有「阅读模式」按钮。在任意论文页面开启即可激活 TABE——NLP 在您的浏览器本地运行。",
    linkLabel: "浏览论文 →",
    linkHref: "/writing",
  },

  openSource: {
    title: "开源项目",
    body: "CantRead 是开源项目，特别欢迎对非英文语言支持和词典扩展的贡献。",
    linkLabel: "github.com/oldmercy/CantRead →",
    linkHref: "https://github.com/oldmercy/CantRead",
  },

  homeTeaser: {
    overline: "开源工具",
    title: "CantRead — 为难以阅读大段文字的大脑设计的无障碍阅读工具",
    body: "TABE 将名词加粗、动词高亮、形容词斜体、数字标橙——这是我在记录社交笔记时开发的阅读格式，后来发现对所有人都有效。",
    linkLabel: "在线体验 →",
    linkHref: "/tools",
    previewLabel: "TABE 阅读模式 — 预览",
  },
};

# China Discovery Hub — 技术架构设计

> 配套 PRD.md 阅读。聚焦"静态站 + 内容驱动 + 极致性能 + 低运维成本"。

---

## 1. 设计原则

1. **Static-first**：默认 0 JS、纯 HTML/CSS 输出；交互组件按需 island 化。
2. **Content as code**：所有资源条目以 Markdown/YAML/JSON 形态存在 git 仓库，PR 即编辑。
3. **零后端**：不引入服务器与数据库；搜索、订阅、表单一律外包给静态友好的 SaaS。
4. **多语言一等公民**：路由、内容、SEO 三层都为 i18n 设计，不是事后补丁。
5. **海外用户优先**：CDN 边缘节点覆盖北美/欧洲/东南亚；不依赖国内网络资源。
6. **可贡献性**：仓库结构清晰，新增一条资源 = 写一份 markdown。

---

## 2. 技术选型总览

| 层 | 选型 | 理由 |
|---|---|---|
| 框架 | **Astro 4.x** | content collections、native i18n、islands 架构、构建产物默认 0 JS，最契合"导航站" |
| 样式 | **Tailwind CSS 3** + CSS Variables | 主题/暗色模式由 CSS 变量驱动，Tailwind 负责快开发 |
| 内容存储 | **Markdown + Frontmatter**（在 `src/content/` 下） | git 驱动、PR 友好、可被 Astro Content Collections 类型校验 |
| 类型校验 | **Zod**（Astro 内置） | 内容 frontmatter 必填字段强校验，杜绝脏数据 |
| 交互组件 | **Solid.js**（轻量）或 **Vanilla TS** | 搜索框、筛选、暗色模式开关等少量 island；不引入 React 减少 bundle |
| 搜索 | **Pagefind** | 构建期生成静态索引，浏览器侧 wasm 检索；多语言支持，零运维 |
| i18n | Astro 原生 `i18n` 路由 + JSON 字典 | 不引入 i18next 等重型库 |
| 表单/订阅 | **Cloudflare Forms** / Tally / Formspree；Newsletter 用 **Buttondown** 或 **Resend** | 全部 SaaS，无后端 |
| 评论（可选） | **Giscus** | 基于 GitHub Discussions，纯静态、免运维 |
| 图标 | Iconify / Lucide / 自定义 SVG | tree-shaking，按需引入 |
| 字体 | Fontsource（self-host）+ swap 策略 | 不走 Google CDN（部分海外区域不稳） |
| 部署 | **Cloudflare Pages**（主） + GitHub Pages（镜像，对国内可达） | CF Pages 全球边缘 + 免费额度足够 |
| CI/CD | **GitHub Actions** | build → link check → lighthouse → deploy preview → merge 后 deploy prod |
| 分析 | **Plausible**（self-host 或托管） / Umami | 无 cookie、合规 |
| 监控 | **Sentry** (free tier) + Cloudflare Web Analytics | 错误 & RUM |
| 域名 | 主：`chinadiscovery.xyz`；备：`*.pages.dev`、`*.github.io` |

---

## 3. 仓库结构

```
china-discovery-hub/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                  # 校验 + lighthouse + link-check
│   │   ├── deploy.yml              # 主分支 deploy
│   │   └── link-check-weekly.yml   # 每周自动巡检失效链接
│   ├── ISSUE_TEMPLATE/
│   │   ├── new-resource.yml        # 推荐新资源的 issue 模板
│   │   └── broken-link.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── public/
│   ├── favicon.ico
│   ├── og/                         # 预生成 OG 图
│   └── fonts/                      # self-hosted fonts
├── src/
│   ├── content/
│   │   ├── config.ts               # Zod schema 定义
│   │   ├── resources/
│   │   │   ├── learn-chinese/
│   │   │   │   ├── hellochinese.md
│   │   │   │   ├── pleco.md
│   │   │   │   └── ...
│   │   │   ├── culture/
│   │   │   ├── food/
│   │   │   ├── travel/
│   │   │   └── ... (11 categories)
│   │   ├── categories/             # 分类元信息（图标、介绍、子标签）
│   │   │   ├── learn-chinese.md
│   │   │   └── ...
│   │   └── featured/               # 编辑专题长文（MDX）
│   │       └── tiktok-refugees-to-rednote.mdx
│   ├── i18n/
│   │   ├── en.json
│   │   ├── zh-CN.json
│   │   ├── ja.json
│   │   └── ...
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── CategoryLayout.astro
│   │   └── PostLayout.astro
│   ├── components/
│   │   ├── ResourceCard.astro
│   │   ├── CategoryGrid.astro
│   │   ├── SearchBox.tsx           # solid.js island
│   │   ├── ThemeToggle.tsx         # island
│   │   ├── LangSwitcher.astro
│   │   ├── Footer.astro
│   │   └── Header.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── submit.astro
│   │   ├── search.astro
│   │   ├── newsletter.astro
│   │   ├── featured/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── category/
│   │   │   └── [slug].astro
│   │   ├── tag/
│   │   │   └── [slug].astro
│   │   ├── resource/
│   │   │   └── [slug].astro        # 可选详情页
│   │   └── [lang]/...              # 多语言镜像（Astro i18n routing）
│   ├── lib/
│   │   ├── getResources.ts
│   │   ├── getCategories.ts
│   │   ├── seo.ts
│   │   └── og-image.ts             # 构建期生成 OG 图（@vercel/og 或 satori）
│   └── styles/
│       └── globals.css
├── scripts/
│   ├── check-links.mjs             # node fetch 所有 url 做存活检测
│   ├── gen-og.mjs                  # 批量生成 OG 图
│   └── new-resource.mjs            # CLI: pnpm new-resource → 交互式创建 md
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

---

## 4. 内容数据模型

### 4.1 Resource Schema（`src/content/config.ts`）

```ts
import { defineCollection, z } from 'astro:content';

const resource = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string().max(80),
    url: z.string().url(),
    description: z.string().max(200),                         // 英文一句话
    description_zh: z.string().max(100).optional(),
    category: z.enum([
      'learn-chinese', 'culture', 'food', 'travel',
      'living', 'apps', 'entertainment', 'business',
      'media', 'diaspora', 'subculture'
    ]),
    subTags: z.array(z.string()).default([]),                 // 自由 tag
    languagesSupported: z.array(
      z.enum(['en', 'zh', 'ja', 'ko', 'es', 'fr', 'ar', 'ru'])
    ).default(['en']),
    pricing: z.enum(['free', 'freemium', 'paid']).default('free'),
    featured: z.boolean().default(false),
    accessibleOutsideChina: z.boolean().default(true),         // 海外能否直接访问
    requiresVpnFromChina: z.boolean().default(false),
    addedDate: z.date(),
    updatedDate: z.date().optional(),
    submittedBy: z.string().optional(),                        // GitHub handle
    favicon: z.string().optional(),                            // 缓存到 /public/favicons/
    screenshot: z.string().optional(),
  }),
});

const category = defineCollection({
  type: 'content',
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    name_zh: z.string(),
    emoji: z.string(),
    order: z.number(),
    description: z.string(),
    subTags: z.array(z.object({ slug: z.string(), label: z.string() })),
  }),
});

const featuredPost = defineCollection({
  type: 'content',                                             // MDX
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    cover: z.string().optional(),
    author: z.string(),
    publishedDate: z.date(),
    tags: z.array(z.string()),
    lang: z.enum(['en', 'zh', 'ja', 'ko']).default('en'),
  }),
});

export const collections = { resource, category, featured: featuredPost };
```

### 4.2 一个资源文件示例（`src/content/resources/learn-chinese/pleco.md`）

```markdown
---
name: Pleco
url: https://www.pleco.com/
description: The gold-standard Chinese-English dictionary app for learners — OCR, handwriting, audio, flashcards, and add-on dictionaries.
category: learn-chinese
subTags: [dictionary, mobile-app, ocr]
languagesSupported: [en, zh]
pricing: freemium
featured: true
accessibleOutsideChina: true
requiresVpnFromChina: false
addedDate: 2026-05-11
submittedBy: editorial
favicon: /favicons/pleco.png
---

Pleco is widely regarded as the most powerful Chinese dictionary for non-native learners. Its
camera OCR lets you point your phone at a sign or menu and instantly look up every character;
its flashcard system integrates directly with the dictionary entries.
```

---

## 5. 路由与渲染策略

### 5.1 路由清单

| 路径 | 渲染 | 数据源 |
|---|---|---|
| `/` | SSG | `content/categories` + 精选 resource |
| `/category/[slug]` | SSG（`getStaticPaths` 11 条） | `content/resources` filter |
| `/tag/[slug]` | SSG（动态生成 ~50 条） | resources 中 subTags 聚合 |
| `/resource/[slug]` | SSG（数百条） | `content/resources` |
| `/featured/[slug]` | SSG（MDX） | `content/featured` |
| `/search` | SSG 壳 + Pagefind 客户端 | 构建期生成 `_pagefind/` 索引 |
| `/submit`、`/about`、`/newsletter` | SSG | 静态 |
| `/[lang]/...` | SSG 镜像 | Astro i18n routing |
| `/sitemap.xml`、`/rss.xml` | 构建期生成 | `@astrojs/sitemap` + 自写 RSS |

### 5.2 多语言路由

- 默认语言：`en`（无 prefix）
- 其它语言：`/zh-CN/`、`/ja/`、`/ko/`、`/es/`
- 同一资源条目可被多语言页面共用，只切换 UI 文案与（若提供）`description_*` 字段
- `<link rel="alternate" hreflang="...">` 全部输出

### 5.3 性能预算

| 资源 | 预算 |
|---|---|
| 首屏 HTML | < 30 KB（gzip） |
| 首屏 CSS | < 20 KB（critical inline） |
| 首屏 JS | 0 KB（首页无 island） |
| 字体 | 1 family，subset + preload，< 30 KB |
| 图片 | 全部 AVIF/WebP，lazy + width/height 占位 |
| LCP | < 1.5s @ 4G |
| CLS | < 0.05 |

---

## 6. 关键技术细节

### 6.1 搜索

- 构建期：`pagefind --site dist` 扫描 HTML，输出 `_pagefind/`。
- 客户端：`<Search />` island 加载 `pagefind.js`（~50 KB gzip），按需 fetch 分片索引。
- 中英混合：Pagefind 默认支持 CJK 分词；额外为常见中文术语在 frontmatter 加 `description_zh`。

### 6.2 暗色模式

- `<html class="dark">` 由 inline `<script>` 在 paint 之前决定，避免闪烁。
- 切换器 island ~ 1 KB JS。

### 6.3 OG 图自动生成

- 构建期脚本 `scripts/gen-og.mjs` 用 satori + sharp，给每个分类页/详情页生成 1200×630 png：
  - 模板：左上 LOGO、中间标题、右下站点 URL，背景叠加月白底 + 朱砂印章
- 缓存到 `public/og/[type]-[slug].png`

### 6.4 链接健康度

- `scripts/check-links.mjs`：并发 fetch 全部 `url` 字段（HEAD，回退 GET），状态码 != 2xx 的写入 `dist/broken-links.json`
- GitHub Actions weekly cron：失败时自动开 issue 列出失效条目并 @maintainers

### 6.5 内容贡献流程

```
contributor ──► fork ──► pnpm new-resource ──► fill md ──► PR
                                                          │
                          GitHub Actions ◄────────────────┘
                          ├── schema validate (Zod)
                          ├── link check (single url)
                          ├── lighthouse on preview deploy
                          └── editor review → merge → CF Pages deploy prod
```

`pnpm new-resource` 是交互式 CLI（用 prompts）：选分类、填名字 URL 描述 → 自动落到 `src/content/resources/<cat>/<slug>.md`。

### 6.6 国内访问兜底

- 主站托管 Cloudflare Pages（海外目标用户主入口）
- 同步部署到 `*.github.io` 一份给 backup（GitHub Pages 在国内勉强可达）
- 域名 `cn.chinadiscovery.xyz` 走 DNS 分流到国内 CDN（如腾讯云 EdgeOne / 阿里云 DCDN，需 ICP）—— P2 阶段做

### 6.7 隐私 & 合规

- 不放第三方追踪 cookie，所有外链 `rel="noopener noreferrer"`
- Plausible 自托管或托管（GDPR-friendly）
- Cookie banner：因为不存 cookie，可不展示（页脚一句 "We don't track you." 即可）
- 在中国用户可访问域名下显示 ICP 备案（若做国内分发）

---

## 7. 部署架构

```
              ┌────────────────────────────────────────────────┐
              │              GitHub Repository                  │
              │  src/content/*.md (PRs from contributors)       │
              └──────────────────┬─────────────────────────────┘
                                 │ push to main
                                 ▼
              ┌────────────────────────────────────────────────┐
              │           GitHub Actions CI/CD                  │
              │  1. pnpm install (cached)                       │
              │  2. zod schema validate                         │
              │  3. astro build  →  dist/                       │
              │  4. pagefind index dist/                        │
              │  5. lighthouse-ci budget check                  │
              │  6. upload artifact                             │
              └──────┬───────────────────────────┬─────────────┘
                     │                           │
                     ▼                           ▼
        ┌──────────────────────┐    ┌─────────────────────────┐
        │  Cloudflare Pages    │    │   GitHub Pages (mirror) │
        │  chinadiscovery.xyz  │    │   *.github.io           │
        │  全球边缘节点         │    │   作为备份镜像           │
        └──────────┬───────────┘    └─────────────────────────┘
                   │
                   ▼
            ┌──────────────┐
            │ End users    │
            │ globally     │
            └──────────────┘
```

**关键决策**：
- **Cloudflare Pages** vs Vercel：CF 免费额度更宽松（无 100 GB/月带宽限制），且全球边缘节点对东南亚、印度、欧洲覆盖更好。Vercel 北美最优但带宽收费。
- **GitHub Pages 镜像**：提供 fallback；同时方便国内开发者贡献。
- **不上 Netlify**：build minutes 限制对内容站后期迭代不够友好。

---

## 8. 关键依赖清单（package.json 节选）

```json
{
  "dependencies": {
    "astro": "^4.16.0",
    "@astrojs/sitemap": "^3.2.0",
    "@astrojs/rss": "^4.0.0",
    "@astrojs/mdx": "^3.1.0",
    "@astrojs/solid-js": "^4.4.0",
    "solid-js": "^1.9.0",
    "tailwindcss": "^3.4.0",
    "@tailwindcss/typography": "^0.5.0",
    "pagefind": "^1.1.0",
    "satori": "^0.10.0",
    "sharp": "^0.33.0",
    "lucide-static": "^0.460.0"
  },
  "devDependencies": {
    "typescript": "^5.6.0",
    "@types/node": "^22.0.0",
    "prettier": "^3.3.0",
    "prettier-plugin-astro": "^0.14.0",
    "@lhci/cli": "^0.14.0",
    "linkinator": "^6.1.0",
    "prompts": "^2.4.0"
  }
}
```

---

## 9. 关键脚本（package.json scripts）

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build && pagefind --site dist && node scripts/gen-og.mjs",
    "preview": "astro preview",
    "new-resource": "node scripts/new-resource.mjs",
    "check:links": "node scripts/check-links.mjs",
    "check:lighthouse": "lhci autorun",
    "check:schema": "astro check",
    "format": "prettier --write .",
    "ci": "pnpm check:schema && pnpm build && pnpm check:links"
  }
}
```

---

## 10. 实施路线图

### Sprint 0（1 周）— 项目脚手架
- [ ] 仓库初始化、Astro + Tailwind + Solid 配置
- [ ] Content collection schema 定型
- [ ] 域名 + Cloudflare Pages 接入
- [ ] CI workflows
- [ ] 站点基础壳（Header / Footer / BaseLayout）

### Sprint 1（2 周）— P0 页面
- [ ] 首页 hero + 分类网格
- [ ] 分类页 + 资源卡
- [ ] 11 个分类元信息 + 子标签定义
- [ ] 暗色模式
- [ ] 多语言 EN/ZH 双语骨架

### Sprint 2（2 周）— 搜索 & 提交
- [ ] Pagefind 集成
- [ ] /submit 页 + GitHub PR 引导文档
- [ ] new-resource CLI
- [ ] OG 图自动生成

### Sprint 3（2 周）— 内容填充 + 上线
- [ ] 200 条精选资源录入（编辑团队）
- [ ] 3 篇 featured 长文
- [ ] About 页 + 编辑准则
- [ ] Newsletter（Buttondown）接入
- [ ] Lighthouse 95+ 调优
- [ ] 正式上线 + Product Hunt / HN 推广

### Sprint 4+（迭代）
- [ ] 链接巡检自动化
- [ ] JA / KO 语言版本
- [ ] Featured 专题持续更新
- [ ] Giscus 评论
- [ ] 学习路径功能

---

## 11. 可观测性 & 运营仪表盘

- **Plausible Dashboard**：UV / PV / 国家分布 / 入口来源 / 热门资源出链
- **Cloudflare Analytics**：边缘缓存命中率、带宽、地理分布
- **GitHub Insights**：贡献者数、PR 通过率、Issues
- **Newsletter**：订阅数、打开率（Buttondown 内置）
- **Weekly review checklist**：失效链接 / 新资源 / 内容缺口 / 流量异常

---

## 12. 成本估算（年度）

| 项 | 成本 |
|---|---|
| 域名（.com / .xyz） | $10 ~ $50 |
| Cloudflare Pages | $0（免费额度） |
| GitHub | $0（公开仓库） |
| Plausible Cloud（可选） | $9/月 ≈ $108 —— 自托管则免费 |
| Buttondown Newsletter | $0 起，超 100 订阅 $9/月 |
| 图标 / 字体 | $0（开源） |
| Sentry | $0（free tier） |
| **合计** | **< $200/年**，自托管分析后可压至 < $50/年 |

完全可个人/小团队长期维护。

---

## 13. 决策记录（ADR-style 简记）

- **ADR-001：选 Astro 而非 Next.js**
  - 理由：导航站 90% 是静态内容，Next.js 的 RSC/Server Actions 派不上用场；Astro 默认 0 JS、内容集合一等公民、构建速度快。
- **ADR-002：选 Solid 而非 React 做 island**
  - 理由：搜索框+主题切换两个交互组件，React+Hydration 包至少 40 KB，Solid 同等代码 < 8 KB。
- **ADR-003：内容用 Markdown 而非 Headless CMS**
  - 理由：贡献者就是开发者/编辑，GitHub PR 流程足够；Headless CMS（Sanity/Strapi）引入运营/账号成本，且破坏"代码即内容"的开源属性。
- **ADR-004：不做用户登录系统**
  - 理由：登录意味着后端 / 数据库 / 合规，与"静态站"定位相悖；收藏功能用 localStorage 在前端实现。
- **ADR-005：精选位与社区位同视觉权重**
  - 理由：避免变成商业广告位，保持中立、可信的品牌资产。

---

## 14. 未来扩展性

如果未来产品演化到"需要动态能力"，迁移路径：
- 收藏夹 / 用户系统 → Cloudflare D1 + Workers（仍是 edge native）
- 评论 → 继续 Giscus 或迁 Comentario
- 内容多 CMS → Decap CMS（git-based）或 Tina CMS，保持 git 单一事实来源
- 国内分发 → 接入腾讯云 EdgeOne，主仓库不变

整体架构沿 "git 为内容真相 + 静态产物 + 边缘 SaaS" 的轴向扩展，不需要推翻重来。

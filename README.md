# China Discovery Hub

> A curated directory of the best resources to discover China — for the curious world.

一个面向**海外用户**的导航聚合静态站点：把"了解中国"分散在 YouTube、Reddit、Wikipedia、博客中的优质资源，按主题集中起来，让外国朋友像翻 yellow pages 一样找到入门入口。

## 灵感

- 2025 年「TikTok refugees」涌入小红书的热搜事件
- 海外社媒上对 Mandarin / Chinese culture / China travel 的搜索逐年走高
- 但仍缺少一个**结构化、可信、多语言**的"中国百科导航"

## 文档

| 文件 | 内容 |
|---|---|
| [PRD.md](./PRD.md) | 完整产品需求文档（含背景、IA、页面设计、视觉规范、内容运营） |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | 技术架构设计（选型、仓库结构、内容模型、部署、路线图） |

## 一句话技术栈

**Astro + Tailwind + Markdown 内容集合 + Pagefind 搜索 + Cloudflare Pages**
—— 完全静态、海外边缘加速、年成本 < $200。**个人维护的编辑项目，源代码公开但不接受 PR**（建议走 Issue 或站内 submit 表单提建议）。

## 内容分类（11 个一级类目）

🀄 Learn Chinese · 🏯 Culture · 🍜 Food · ✈️ Travel · 🏠 Living · 📱 Apps · 🎬 Entertainment · 💼 Business & Tech · 📰 Media · 🏛️ Diaspora · 🧧 Subcultures

## 开发

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # → dist/
pnpm preview    # 预览构建产物
```

需要 Node 18+ 和 pnpm 9+。

## 编辑工作流（维护者自用）

**添加一条资源**：在 `src/content/resources/<category>/<slug>.md` 新建文件，按已有条目的 frontmatter 格式填写。

**写一篇 Featured 长文**：在 `src/content/featured/<slug>.md` 新建 markdown，frontmatter 字段见 `src/content/config.ts`（`title` / `dek` / `description` / `publishDate` / `relatedResources` / `relatedCategories` 等）。文章发布在 `/featured/<slug>`，自动生成 OG 图与 Article 结构化数据。

Schema 由 `src/content/config.ts` 用 Zod 强校验，少字段或类型错误 build 会直接失败。

## 外部建议渠道

读者推荐资源或报错走两条路：
- [chinahub.cc/submit](https://chinahub.cc/submit) 站内表单
- 仓库 [Issue](https://github.com/pkloving/china-discovery-hub/issues)

PR 不会合并（个人编辑项目），但 Issue 都会读。详见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## 当前状态

正式上线：**[chinahub.cc](https://chinahub.cc)**，Cloudflare Pages 全球边缘节点。

已完成：
- ✅ Astro 5 + Tailwind 3 + Content Collections 脚手架
- ✅ 11 个分类元信息 + **72 条精选资源**（持续扩充中）
- ✅ 首页 / 分类页 / 标签页 / Featured / Submit / About / Search / 404
- ✅ 暗色模式（首屏无闪烁）
- ✅ **Pagefind 静态搜索**（构建期生成 wasm 索引，含分类 facet 过滤）
- ✅ **OG 图自动生成**（astro-og-canvas，每页 + 每分类 + 每篇长文）
- ✅ **SEO 基础件**：sitemap、robots.txt、RSS feed、JSON-LD 结构化数据（WebSite + SearchAction + CollectionPage + ItemList + Article + BreadcrumbList）
- ✅ **Featured 长文** 内容集合 + `/featured/[slug]` 详情页
- ✅ Cloudflare Pages 部署 + GitHub Actions CI（含周度链接巡检）
- ✅ Cloudflare Web Analytics 已接入

后续路线：
- ⏳ i18n zh-CN 真正落地（路由骨架已就绪）
- ⏳ Newsletter 接入
- ⏳ Creators 独立分类
- ⏳ 更多 Featured 长文

详细路线图见 [ARCHITECTURE.md §10](./ARCHITECTURE.md#10-实施路线图)。

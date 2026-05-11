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
—— 完全静态、海外边缘加速、年成本 < $200、社区可 PR 贡献。

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

## 添加一条资源

在 `src/content/resources/<category>/<slug>.md` 新建文件，按已有条目的 frontmatter 格式填写。Schema 由 `src/content/config.ts` 用 Zod 强校验，少字段或类型错误 build 会直接失败。

## 当前状态

Sprint 0–2 完成：
- ✅ Astro 5 + Tailwind 3 + Content Collections 脚手架
- ✅ 11 个分类元信息 + **60 条种子资源**
- ✅ 首页 / 分类页 / 标签页 / Featured / Submit / About / Search / 404
- ✅ 暗色模式（首屏无闪烁）
- ✅ Sitemap + 多语言路由骨架
- ✅ **Pagefind 静态搜索**（构建期生成 wasm 索引，含分类 facet 过滤）
- ⏳ OG 图自动生成（Sprint 3）
- ⏳ Cloudflare Pages 部署 + CI（Sprint 3）

详细路线图见 [ARCHITECTURE.md §10](./ARCHITECTURE.md#10-实施路线图)。

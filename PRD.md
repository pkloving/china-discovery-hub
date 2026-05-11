# China Discovery Hub — 产品需求文档（PRD）

> 给海外用户了解中国的「导航聚合静态站」

---

## 1. 项目背景

近年来海外社交媒体上对中国文化的好奇度显著上升：

- 2025 年初「TikTok refugees」迁徙小红书引发外网热议，海外用户首次大规模接触中国本土平台。
- YouTube / Reddit 上出现大量「I lived in China for…」「China travel vlog」类内容，浏览量持续走高。
- 海外用户搜索「Chinese culture」「learn Mandarin」「China travel」「Xiaohongshu」呈逐年上升趋势。

**核心问题**：信息分散——海外用户想了解中国，需要在 Reddit、YouTube、Wikipedia、各种博客与论坛之间反复搜索；缺少一个**结构化、可信、英文（多语）友好**的「中国百科入口」。

**机会点**：做一个**导航聚合站**（类似 awesome-xxx / Product Hunt / startup directory 的形态），把"了解中国"这件事的入口集中起来，让海外用户像翻 yellow pages 一样按主题找到优质资源。

---

## 2. 产品定位

| 项 | 内容 |
|---|---|
| 产品名 | China Discovery Hub（暂定） |
| 域名建议 | `chinadiscovery.xyz` / `discoverchina.dev` / `china.directory` |
| 一句话定位 | A curated directory of the best resources to discover China — for the curious world. |
| 目标用户 | 母语非中文的海外用户：对中国文化、语言、旅游、生活、商业、影视感兴趣的人；潜在留学生、外派员工、Mandarin learner、文化爱好者 |
| 形态 | 静态站点（SSG） |
| 商业模式 | 长期：精选位赞助 / Newsletter / 联盟链接；初期：纯公益+开源 |
| 内容来源 | 编辑团队精选 + 社区 PR 提交 + Issue 推荐 |

**不做什么**：
- 不做 UGC 内容平台（不让用户发帖发图）。
- 不做新闻聚合（避免政治敏感与版权问题）。
- 不做工具站（翻译/字典等已有大量成熟工具，只做导航指向）。

---

## 3. 内容分类（信息架构）

一级分类 11 个，每类下设若干子标签。这是产品的**骨架**。

### 3.1 🀄 Learn Chinese — 学中文
- Apps：HelloChinese / Duolingo / Pleco / Skritter / Anki decks
- Websites：HSK.academy / Chinese Grammar Wiki / MDBG
- YouTube 频道：ChinesePod / Mandarin Corner / Grace Mandarin
- 课程：Coursera/edX 上的 PKU、Tsinghua 中文课
- 字典 & 工具：Pleco / LINE Dict / ZDic

### 3.2 🏯 Culture & History — 文化与历史
- 节日：Spring Festival / Mid-Autumn / Dragon Boat
- 传统艺术：Calligraphy / Tea ceremony / Peking opera / Kunqu
- 思想：Confucianism / Taoism / Buddhism in China
- 历史科普：Asianometry / 历史频道、播客
- 子文化：Hanfu / Guofeng / ACGN 国创

### 3.3 🍜 Food & Cuisine — 美食
- 八大菜系 wiki：川/粤/苏/浙/闽/湘/徽/鲁
- 美食 YouTuber：Chinese Cooking Demystified / Made With Lau / Souped Up Recipes
- 街头小吃 / 茶饮 / 白酒文化
- 海外可买的中国食材渠道（Yamibuy 等）

### 3.4 ✈️ Travel — 旅游
- 签证 & 免签政策（含 144h 过境免签、新近免签国家列表）
- 必去城市：Beijing / Shanghai / Xi'an / Chengdu / Guangzhou / Hangzhou
- 主题路线：长城 / 川藏 / 江南 / 丝绸之路
- 交通：高铁 / Trip.com / 12306 攻略
- 实用 App：Alipay Tour Pass / WeChat Pay for tourists / DiDi
- VPN / SIM 卡 / eSIM 攻略

### 3.5 🏠 Living in China — 在中国生活
- 工签 / 居留许可 / 永居
- 银行 & 支付（外国人开户、Alipay/WeChat 实名）
- 医疗 & 保险
- 找房 & 租房
- Expat 社区：That's Mags / Shanghaiist / The Beijinger

### 3.6 📱 Apps & Platforms — 中国互联网入口
- Xiaohongshu / RedNote
- Bilibili / Douyin / Weibo / 知乎
- Taobao / Tmall / JD / 拼多多（海外购物攻略）
- WeChat / Alipay
- 美团 / 大众点评 / 高德 / 百度地图

### 3.7 🎬 Entertainment — 影视音乐
- C-Dramas（古装 / 现代 / 仙侠）入门片单
- 华语电影必看清单
- Mandopop / C-pop / 国风音乐 / 民乐
- 动漫 & 国创：《雾山五行》《罗小黑》《灵笼》

### 3.8 💼 Business & Tech — 商业与科技
- 中国科技公司巡礼：BYD / DJI / Huawei / Xiaomi / Tencent / Alibaba / ByteDance
- AI 生态：DeepSeek / Qwen / Kimi / 智谱 / MiniMax
- 新能源 & 电动车
- 电商出海 & 跨境
- 财经媒体：Caixin Global / SCMP Business

### 3.9 📰 Media & News — 媒体（英文为主）
- Sixth Tone / China Daily / SCMP / CGTN / Caixin
- 独立观察者：Bill Bishop (Sinocism) / ChinaTalk / China Books Review
- 学术 / 智库：MERICS / Stanford DigiChina / SupChina archive

### 3.10 🏛️ Diaspora & Chinatowns — 华人海外
- 各国 Chinatown 地图与历史
- 海外华人社区组织
- 中餐海外演化（美式中餐 / 日式中华）

### 3.11 🧧 Sub-cultures & Trends — 当代潮流
- Hanfu 复兴
- City Walk / Citywalk in China
- 国潮品牌：李宁 / 安踏 / 花西子 / 蕉内
- 二次元 & Cosplay 场景
- 电竞 / CBA / 乒乓球

> **资源条目数据模型**（每个 link 卡片）：
> ```
> name | url | description (EN) | category | tags[] | languages_supported[] | featured: bool | added_date | submitted_by
> ```

---

## 4. 页面设计（核心 PRD）

### 4.1 站点地图

```
/
├── /                                首页（Discover）
├── /category/[slug]                 分类列表页（11 个）
├── /tag/[slug]                      标签聚合页
├── /resource/[slug]                 资源详情页（可选，初期可跳外链）
├── /search                          搜索结果页
├── /featured                        精选合集（编辑推荐）
├── /submit                          提交资源（GitHub PR 引导 / Form）
├── /about                           关于
├── /newsletter                      订阅
└── /[lang]/...                      多语言路由（en / es / ja / ko / fr / ar）
```

### 4.2 P0 页面（必做）

#### P-1 首页（Discover Home）

**目标**：用户 5 秒内理解"这是什么"，并被吸引点入某个分类。

布局自上而下：
1. **Hero 区**
   - 大标题：`Discover China.` （字号超大，衬线 + 中文书法装饰字"探"作背景水印）
   - 副标题：`A curated directory of 500+ resources to understand China — language, culture, travel, business, and beyond.`
   - CTA 按钮：`Start Exploring` (滚动到分类区) + `Submit a Resource`
   - 右侧 / 下方：实时统计数字（resources / categories / contributors）
2. **Category Grid**
   - 11 个分类卡片，3×4 网格（移动端 2×6 或 1×11）
   - 每张卡：emoji/icon + 中文小字 + 英文大字 + 资源数 + 简短描述
   - hover 微动效（淡淡的红色 / 黛蓝色描边）
3. **Featured This Week**
   - 横向滚动 / 网格，6 个本周精选资源卡
4. **Trending Tags** — 标签云
5. **Latest Additions** — 最近 7 天新加入的 10 条
6. **Why this site? + How to contribute** — 简短 2 列
7. **Footer**：多语言切换、社交、GitHub 链接、订阅 newsletter

#### P-2 分类页（Category Page）

URL：`/category/learn-chinese`

布局：
- 顶部 breadcrumb + 分类大标题 + 介绍段落（1-2 句）
- 左侧 sticky 子标签筛选（Apps / Websites / YouTube / Podcasts / Books / Courses…）
- 右侧资源卡片列表（默认网格，可切换列表视图）
- 顶部工具栏：sort by（Featured / Newest / A-Z）、language filter（site 是否支持 EN / JP / KR…）、free/paid 标记
- 每张资源卡：
  - 缩略图（favicon 或自定义 OG 图）
  - 标题（点击跳外链，target=_blank rel=noopener）
  - 1-2 行英文描述
  - tag chips
  - 语言徽章（🇬🇧 EN / 🇨🇳 ZH / 🇯🇵 JA）
  - "More info" 链接 → 详情页（可选）
  - 右上角 ★ Featured 角标
- 底部分页或无限滚动

#### P-3 搜索页（Search）

- 顶部大搜索框（autocomplete）
- 结果按"分类分组"展示
- 静态搜索（Pagefind），无后端
- 支持中英文混合搜索（搜 "茶" 也能找到 tea 相关）
- 空状态：推荐热门标签

#### P-4 提交资源页（Submit）

两种通道：
1. **For developers**：跳转 GitHub repo，文档教如何提 PR（在 `content/resources/*.md` 加一条 frontmatter）
2. **For everyone**：嵌入式表单（Tally / Formspree / Cloudflare Forms）—— 字段：URL、name、category、why-recommend、your-email(optional)
3. 显示「Submission Guidelines」：精选标准、禁止内容、审核周期（72 h 内回复）

#### P-5 About 页

- 项目缘起（呼应 PRD §1 背景）
- 编辑准则（neutrality / no political content / family-friendly / no broken links）
- 团队 / 贡献者头像墙（从 GitHub contributors API 生成静态）
- 联系方式

### 4.3 P1 页面（迭代加）

- **Featured 合集页**：编辑做的 topic 专题，如「10 things to know about Spring Festival」「Best apps to use China for tourists」—— 接近博客形态，MDX 写作
- **资源详情页**：扩写描述、放截图、相关资源 cross-link、用户评分（可选）
- **Newsletter 历史归档页**
- **Resource detail with screenshots**：用 puppeteer 离线截图各个 link 的首屏放进卡片

### 4.4 P2（远期）

- 用户账号系统（收藏夹）—— 但这会破坏静态属性，慎重；可用 localStorage 实现「我的收藏」纯前端
- 评论 / 评分 → 用 Giscus（GitHub Discussions 驱动，不破坏静态）
- 中国地图交互组件：点省份看相关资源（D3 / 高德 SVG）
- 学习路径（Learning Paths）：「Start Mandarin from zero」式的资源串联路线

---

## 5. 设计规范（视觉 & 交互）

### 5.1 设计基调
- **方向**：现代极简 + 克制的东方元素，**避免**红灯笼/龙/熊猫等刻板符号堆砌。
- **灵感**：奈良美智海报式留白 + 苏州博物馆贝聿铭式黑白灰 + 一点点传统色点缀。
- **触感**：高级感，不是 China-town 旅游手册。

### 5.2 色板（中国传统色取样）

| Token | Hex | 用途 |
|---|---|---|
| `--bg` | `#FAFAF7` (月白) | 默认背景 |
| `--bg-dark` | `#1A1B1E` | 暗色模式底 |
| `--ink` | `#1F2329` (墨) | 正文 |
| `--accent` | `#9D2933` (朱砂) | 主强调（按钮、链接 hover） |
| `--accent-cool` | `#2E4E7E` (黛蓝) | 次强调 |
| `--gold` | `#C89B40` (赤金) | featured 角标 |
| `--mute` | `#A8A39E` | 次要文字 |

暗色模式镜像反转，accent 保留以维持品牌识别。

### 5.3 字体
- **Latin**：Inter / Geist Sans（正文）+ Fraunces 或 Cormorant Garamond（hero 标题，传达"百科 / 经典"感）
- **CJK**：Noto Sans SC / Source Han Sans
- **装饰**：站点 LOGO 用书法字体（霞鹜文楷 / Ma Shan Zheng）

### 5.4 交互细节
- 卡片：1 px solid border + hover 提升至 4 px shadow，accent 颜色描边
- 链接外跳：右上角 ↗ 微图标
- 国旗 emoji + 文字搭配做语言标签
- 全站不超过 2 个动效元素（hero 渐入 + 卡片 hover），保持静感
- 暗黑模式：尊重 `prefers-color-scheme`，提供手动切换并 localStorage 记忆

### 5.5 无障碍 & 国际化
- 全站 WCAG AA 对比度
- 所有外链有 `aria-label`
- RTL 支持（阿拉伯语版本）
- 所有图片 alt 文案

---

## 6. 非功能需求

| 维度 | 指标 |
|---|---|
| 性能 | Lighthouse 全项 > 95；LCP < 1.5s（海外 CDN 边缘） |
| SEO | 每页独立 OG / Twitter card；JSON-LD 结构化数据（`ItemList`, `WebSite`）；自动 sitemap.xml；多语言 hreflang |
| 可访问性 | WCAG 2.1 AA |
| 隐私 | 不放追踪 cookie；分析用 Plausible（无 cookie） |
| 内容更新频率 | 编辑团队每周新增 ≥ 5 条；社区 PR 72 h 内 review |
| 链接健康度 | 每周 CI 跑 link-checker，失效自动开 issue |

---

## 7. 多语言策略

**P0**：English（主） + Simplified Chinese（让中国用户也能看到反向视角）
**P1**：Japanese / Korean / Spanish
**P2**：French / Arabic / Russian / Portuguese

实现：URL prefix（`/ja/`, `/es/`），各语言内容**独立维护**而非机器翻译；机器翻译只做兜底初稿。

---

## 8. 内容运营

### 8.1 冷启动（前 90 天）
- 编辑团队预填 200+ 条精选条目（每个一级分类 ≥ 15 条）
- 撰写 5 篇 Featured 长文做内容引流
- Reddit 软推：r/China / r/ChineseLanguage / r/travel / r/InternationalNews
- 上 Hacker News / Product Hunt
- 联系 5 位海外 China-themed YouTuber 互荐

### 8.2 长期
- Weekly newsletter（精选 5 条新资源 + 1 篇深度）
- 与 Wikipedia 中国相关条目交叉链接
- 与海外中文学习社区合作（HelloTalk / italki forum）

### 8.3 内容审查准则
- ✅ 文化、语言、生活、旅游、商业、科技、艺术
- ❌ 政治敏感内容（中、外都避免）
- ❌ 涉黄涉暴 / 加密货币 / 灰产
- ❌ 失效 / 钓鱼 / 付费墙强制

---

## 9. 成功指标（北极星）

| 阶段 | 指标 |
|---|---|
| 0-3 月 | 站点上线 / 资源 ≥ 300 / 月 UV ≥ 5k |
| 3-6 月 | 月 UV ≥ 30k / GitHub Stars ≥ 500 / Newsletter 订阅 ≥ 1k |
| 6-12 月 | 月 UV ≥ 100k / 出现在 Wikipedia 引用 / 多语言版本上线 |

---

## 10. 风险 & 应对

| 风险 | 应对 |
|---|---|
| 政治化解读 | 严守"文化优先、避开时政"的编辑准则；About 页明确立场中性 |
| 链接失效 | 自动化 link-check + 社区 issue 上报 |
| 内容版权 | 只做导航，不抓取原文；用 OG 图需注明来源 |
| 站点墙外/墙内访问问题 | 主站托管在墙外（Cloudflare/Vercel），针对国内访客在 footer 提供镜像（如 GitHub Pages 主仓库） |
| 维护断档 | 完全开源 + 社区贡献者机制 |

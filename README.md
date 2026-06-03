# 🌟 鹞枫的杂物间 — 个人主页 & 应用中心

基于 Vue 3 + TypeScript + Vite 构建的双页面个人站点，采用液态玻璃（Glassmorphism）设计风格，包含**个人主页**和**应用中心**两个独立页面。

## ✨ 功能特性

- 🎨 **液态玻璃效果** — 全页面 backdrop-filter 磨砂玻璃卡片，支持 hover 上浮 + 边框高亮
- 🌓 **三态主题切换** — 自动跟随系统 / 浅色 / 深色，右上角按钮循环切换（auto → 实际反色 → 另一个 → auto），状态持久化到 localStorage
- 🎨 **双主题配色体系**
  - 浅色：「清透青碧」— 深青 #0f766e → 青绿 #14b8a6 → 天蓝 #22d3ee
  - 深色：「午夜紫焰」— 紫罗兰 #a855f7 → 玫瑰粉 #ec4899
  - 所有颜色通过 CSS 变量统一管理，一键换肤
- 🖼️ **双层壁纸交叉淡入淡出** — Layer A/B 交替显现，0.8s ease-in-out 平滑过渡，无闪烁
- 🖼️ **壁纸轮换系统** — 随机起始 + 30 秒自动轮换 + 底部指示点手动跳转 + 左右箭头翻页
- 🖼️ **壁纸 CDN 远程加载** — 支持 CDN URL 或本地相对路径，浅色/深色各独立列表
- ✨ **自定义光标粒子特效** — 隐藏系统光标，Canvas 渲染自定义光标：
  - 深色模式：青色发光方形 + 四角亮点 + 白色核心
  - 浅色模式：粉色四芒星 + 旋转副星 + 白色核心
  - 粒子拖尾：移动时生成 orb / sparkle / ring / star 四类粒子
  - 点击爆发：25~45 个径向粒子爆炸效果
- 🔮 **浮动环境光球** — 3 个固定位置渐变光球，12~18s 浮动动画；浅色为青碧色系，深色为紫焰色系
- 📱 **完全响应式** — 适配手机（<480px）、平板（<768px）、桌面端，含汉堡菜单导航
- ✨ **滚动动画** — Intersection Observer 驱动的 `.reveal` 淡入上滑效果（阈值 0.12），支持 5 级延迟
- 🏠 **双页面架构** — `index.html` 个人主页 + `apps.html` 应用中心，Vite 多页构建
- 📜 **滚动导航栏** — 页面滚动超过 40px 后导航栏背景模糊 + 底部边框出现
- 🌐 **中英双语** — 个人主页板块中英对照标题

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器（同时构建两个页面）
npm run dev

# 构建生产版本（先 type-check 再构建）
npm run build

# 预览构建结果
npm run preview
```

## 📄 双页面说明

本项目通过 Vite 多页配置（`vite.config.ts`）同时构建两个独立入口：

| 页面 | HTML 入口 | TS 入口 | Vue 根组件 | 页面标题 | favicon |
|------|-----------|---------|------------|----------|---------|
| 个人主页 | `index.html` | `src/main.ts` | `src/App.vue` | 鹞枫的杂物间-个人主页 | `favicon1.png` |
| 应用中心 | `apps.html` | `src/apps.ts` | `src/AppsApp.vue` | 第十三种植园-应用中心 | `favicon2.png` |

两个页面共享同一套：
- CSS 变量体系（`src/style.css`）
- 主题系统（`src/composables/useTheme.ts`）
- 壁纸系统（`src/composables/useWallpaper.ts`）
- 光标特效（`src/composables/useCursorEffect.ts`）

> **路由说明**：个人主页 NavBar Logo 点击跳转到 `/apps.html`（应用中心）；应用中心页脚有「个人主页」返回链接。

## 📁 项目结构

```
yaofeng/
├── public/
│   ├── favicon1.png                  # 个人主页 favicon
│   ├── favicon2.png                  # 应用中心 favicon
│   ├── logo.svg                      # 站点 Logo（两页共用）
│   └── assets/
│       ├── avatar.jpg                # 【替换】头像（400×400 建议）
│       ├── apps/
│       │   ├── cloudreve.png         # Cloudreve 应用图标
│       │   ├── jellyfin.png          # Jellyfin 应用图标
│       │   ├── lsky-pro.png          # Lsky Pro 应用图标
│       │   ├── screego.png           # Screego 应用图标
│       │   └── icon/
│       │       └── notice.png        # 提示信息图标
│       ├── beian/
│       │   ├── beian-gov.png         # 公安备案图标
│       │   └── beian-icp.png         # ICP 备案图标
│       └── interests/
│           ├── crafts.png            # 手工图标
│           ├── gaming.png            # 游戏图标
│           ├── hardware.png          # 硬件图标
│           ├── movie.png             # 电影图标
│           ├── music.png             # 音乐图标
│           ├── photography.png       # 摄影图标
│           ├── reading.png           # 阅读图标
│           └── sports.png            # 运动图标
├── src/
│   ├── App.vue                       # 个人主页根组件（壁纸层 + 光球 + 各 Section）
│   ├── AppsApp.vue                   # 应用中心根组件（导航 + 应用卡片网格 + 页脚）
│   ├── main.ts                       # 个人主页入口：createApp(App).mount('#app')
│   ├── apps.ts                       # 应用中心入口：createApp(AppsApp).mount('#app')
│   ├── style.css                     # 全局样式 & CSS 变量（522 行，含两大主题完整定义）
│   ├── env.d.ts                      # TypeScript 环境声明
│   └── components/
│   │   ├── NavBar.vue                # 导航栏（Logo + 锚点链接 + 主题切换 + 汉堡菜单）
│   │   ├── HeroSection.vue           # 首页 Hero（头像环 + 在线状态 + 角色标签 + CTA 按钮 + 滚动提示）
│   │   ├── AboutSection.vue          # 关于我（个人简介卡 + 信息卡片网格）
│   │   ├── SkillsSection.vue         # 特长技能（技能类别卡 + 进度条 + 技术栈标签云）
│   │   ├── InterestsSection.vue      # 兴趣爱好（8 宫格图标卡）
│   │   ├── DevPlatformsSection.vue   # 开发平台（GitHub/Gitee 带统计数字卡片）
│   │   ├── SocialSection.vue         # 社交媒体（B站/抖音/小红书 + 粉丝数）
│   │   └── FooterSection.vue         # 页脚（品牌信息 + 快速导航 + 联系方式 + ICP/公安备案 + 技术栈徽章）
│   └── composables/
│       ├── useTheme.ts               # 主题管理：auto/light/dark 三态切换 + localStorage 持久化 + 系统主题监听
│       ├── useWallpaper.ts           # 壁纸列表配置 + 索引管理 + 自动轮换定时器 + 交叉淡入淡出防抖
│       └── useCursorEffect.ts        # Canvas 自定义光标 + 粒子系统（472 行，4 类粒子 + 呼吸动画 + 点击爆发）
├── index.html                        # 个人主页 HTML（lang="zh-CN"，Google Fonts 预连接）
├── apps.html                         # 应用中心 HTML
├── vite.config.ts                    # Vite 多页构建配置 + @ 路径别名
├── tsconfig.json                     # TypeScript 配置（strict 模式，@/* 路径映射）
├── tsconfig.node.json                # Vite 配置文件的 TS 配置
├── package.json                      # 依赖：vue 3.4, typescript 5.3, vite 5, vue-tsc 2
└── .gitignore
```

## 🎨 CSS 变量体系

所有视觉样式通过 CSS 自定义属性控制，定义在 `src/style.css` 中。主题切换就是修改变量值。

### 浅色主题（`:root` 默认）— 清透青碧

| 变量 | 值 | 说明 |
|------|-----|------|
| `--accent-primary` | `#0f766e` | 主强调色 |
| `--accent-secondary` | `#14b8a6` | 次强调色 |
| `--accent-gradient` | `linear-gradient(135deg, #0f766e, #14b8a6, #22d3ee)` | 强调渐变 |
| `--glass-bg` | `rgba(236, 254, 250, 0.58)` | 玻璃卡背景 |
| `--glass-border` | `rgba(255, 255, 255, 0.82)` | 玻璃卡边框 |
| `--text-primary` | `#0a2225` | 主文字色 |
| `--text-secondary` | `#1a4845` | 次文字色 |
| `--text-muted` | `#5a8e8b` | 弱化文字色 |
| `--text-accent` | `#0f766e` | 强调文字色 |
| `--wallpaper-overlay` | `rgba(220, 252, 245, 0.28)` | 壁纸蒙层 |

### 深色主题（`[data-theme='dark']`）— 午夜紫焰

| 变量 | 值 | 说明 |
|------|-----|------|
| `--accent-primary` | `#c084fc` | 主强调色 |
| `--accent-secondary` | `#f472b6` | 次强调色 |
| `--accent-gradient` | `linear-gradient(135deg, #a855f7, #ec4899)` | 强调渐变 |
| `--glass-bg` | `rgba(18, 8, 32, 0.58)` | 玻璃卡背景 |
| `--glass-border` | `rgba(196, 132, 252, 0.14)` | 玻璃卡边框 |
| `--text-primary` | `#faf5ff` | 主文字色 |
| `--text-secondary` | `#d4b8f0` | 次文字色 |
| `--text-muted` | `#8b6db0` | 弱化文字色 |
| `--text-accent` | `#c084fc` | 强调文字色 |
| `--wallpaper-overlay` | `rgba(8, 2, 18, 0.38)` | 壁纸蒙层 |

### 系统自动模式

`@media (prefers-color-scheme: dark)` 中定义了一套相同的深色变量，当 `data-theme` 属性不存在且系统为深色模式时生效。`useTheme.ts` 中监听 `matchMedia` 变化事件实时切换。

## 🎨 自定义内容

### 1. 壁纸配置

壁纸通过 `src/composables/useWallpaper.ts` 中的数组管理，支持 CDN 远程 URL 或本地相对路径。

浅色/深色主题各有独立列表，页面启动时随机选取一张，之后每 30 秒自动切换。底部指示点支持手动跳转，左右箭头支持前后翻页。

```ts
// src/composables/useWallpaper.ts

const LIGHT_WALLPAPERS: string[] = [
  'https://cos.yaofeng.xyz/imagebed/homepagewallpaper/ChihayaAnon_light.jpg',
  'https://cos.yaofeng.xyz/imagebed/homepagewallpaper/KanameRana_light.jpg',
  // 添加更多...
]

const DARK_WALLPAPERS: string[] = [
  'https://cos.yaofeng.xyz/imagebed/homepagewallpaper/ChihayaAnon_dark.jpg',
  'https://cos.yaofeng.xyz/imagebed/homepagewallpaper/KanameRana_dark.jpg',
  // 添加更多...
]

// 自动轮换间隔（毫秒），设为 0 禁用
const AUTO_ROTATE_INTERVAL = 30_000
```

> **提示**：如需使用本地图片，直接写相对路径如 `/assets/wallpapers/light/1.jpg`，将文件放入 `public/` 对应目录即可。推荐尺寸 **1920×1080** 或更高，JPEG 格式。

壁纸切换采用**双层交叉淡入淡出**机制（`App.vue` 中实现）：始终维护 layerA 和 layerB 两个固定背景层，新壁纸预载入非活跃层后，切换 `activeLayer` 触达 CSS opacity 0.8s 过渡。

### 2. 替换头像

将正方形头像图片命名为 `avatar.jpg` 放入 `public/assets/`（建议 400×400）。如果图片加载失败，会自动显示渐变色回退首字母（HeroSection.vue 中的 `hero__avatar-fallback`）。

### 3. 修改个人信息 — 详细指引

#### HeroSection.vue（首页）

| 字段 | 代码位置 | 说明 |
|------|----------|------|
| 问候语 | `<p class="hero__greeting">你好，这边cn</p>` | 第 28 行 |
| 姓名 | `<span class="hero__name-zh">鹞枫</span>` | 第 31 行 |
| 身份标签 | `const roles = ['代码开发者', '摄影爱好者', '终身学习者']` | 第 85-89 行 |
| 一句话介绍 | `<p class="hero__bio">热爱技术与创造...</p>` | 第 48 行 |
| 在线状态 | `const statusText = '目前存活'` | 第 92 行 |
| CTA 按钮文字 | `了解更多` / `我的项目` | 第 56、59 行 |

#### AboutSection.vue（关于我）

| 字段 | 代码位置 | 说明 |
|------|----------|------|
| 个人简介段落 | `<p>...</p>` × 3 | 第 25-33 行 |
| 所在地 | `value: '中国 · 湖北 · 武汉'` | 第 63 行 |
| 学历 | `value: '本科 · 数据科学与大数据'` | 第 68 行 |
| 职业状态 | `value: '在校学生 / 开发者'` | 第 73 行 |
| 邮箱 | `value: 'dengfj0214@outlook.com'` | 第 78 行 |

#### SkillsSection.vue（特长技能）

| 字段 | 代码位置 | 说明 |
|------|----------|------|
| 技能类别 | `skillCategories` 数组 | 第 83-115 行，每个类别有 `name`、`iconPath`（SVG path）、`skills` 列表 |
| 单项技能 | 每个 skill：`name`（名称）、`level`（0-100 进度值）、`levelLabel`（标签文字如"了解"） | 第 88-113 行 |
| 技术栈标签 | `techTags` 数组 | 第 118-120 行 |
| 进度条动画 | `onMounted` 中 300ms 后触发 `animated=true`，CSS transition 1.2s | 第 123-130 行 |

#### InterestsSection.vue（兴趣爱好）

| 字段 | 代码位置 | 说明 |
|------|----------|------|
| 兴趣列表 | `interests` 数组 | 第 30-79 行 |
| 单项配置 | `name`（名称）、`desc`（描述）、`gradient`（图标背景渐变）、`iconPath`（png 路径） | 每项 4 个字段 |
| 图标 | `/assets/interests/` 下的 png 文件，24×24 白色显示（CSS `filter: brightness(0) invert(1)`） | — |

#### DevPlatformsSection.vue（开发平台）

| 字段 | 代码位置 | 说明 |
|------|----------|------|
| 平台列表 | `devPlatforms` 数组 | 第 66-93 行 |
| GitHub | `username: '@DengFengjie'`、`url: 'https://github.com/DengFengjie'` | 第 69-71 行 |
| Gitee | `username: '@dengfj0214'`、`url: 'https://gitee.com/dengfj0214'` | 第 82-84 行 |
| 统计数字 | `stats` 数组（repo/followers/stars 数量） | 第 74-78、87-91 行 |
| SVN 图标 | `svgPath`（内联 SVG path），GitHub 和 Gitee 各不同 | — |

#### SocialSection.vue（社交媒体）

| 字段 | 代码位置 | 说明 |
|------|----------|------|
| 社交列表 | `socialLinks` 数组 | 第 61-89 行 |
| B站 | `handle: '@冰绒DualCo'`、`url`、`followers: '130'` | 第 63-69 行 |
| 抖音 | `handle: '@鹞枫YF'`、`url`、`followers: '45'` | 第 72-78 行 |
| 小红书 | `handle: '@鹞枫YF'`、`url`、`followers: '13'` | 第 81-88 行 |
| SVG 图标 | `svgPath`（完整内联 SVG） | 每个平台独立 |

#### FooterSection.vue（页脚）

| 字段 | 代码位置 | 说明 |
|------|----------|------|
| 姓名 | `<p class="footer__brand-name">鹞枫</p>` | 第 12 行 |
| 标语 | `<p class="footer__brand-tagline">热爱技术，享受生活</p>` | 第 13 行 |
| 邮箱 | `<a href="mailto:...">dengfj0214@outlook.com</a>` | 第 30-37 行 |
| 版权名 | `© {{ currentYear }} 邓冯杰.` | 第 48 行 |
| ICP 备案号 | `鄂ICP备 2024078218号-1` | 第 56 行 |
| 公安备案号 | `鄂公网安备 42900402000897号` | 第 62 行 |
| 公安备案链接 | `https://beian.mps.gov.cn/#/query/webSearch?code=42900402000897` | 第 60 行 |

#### NavBar.vue（导航栏）

| 字段 | 代码位置 | 说明 |
|------|----------|------|
| Logo 文字 | `<span class="navbar__logo-text">鹞枫</span>` | 第 8 行 |
| 导航链接 | `navLinks` 数组 | 第 89-96 行，包含 `href`（锚点）和 `zh`（中文标签） |
| Logo 点击跳转 | `href="/apps.html"` | 第 5 行，点击 Logo 跳转到应用中心 |
| 被注释的应用链接 | `// { href: 'apps', zh: '应用' }` | 第 95 行，可取消注释启用 |

### 4. 修改主题色

在 `src/style.css` 中，有两套完整的颜色定义：

- **浅色主题**：修改 `:root` 块中的变量（第 11-81 行）
- **深色主题**：修改 `[data-theme='dark']` 块（第 86-137 行）
- **系统自动深色**：修改 `@media (prefers-color-scheme: dark)` 块（第 142-173 行）

关键变量速查：
```css
--accent-primary: #0f766e;       /* 按钮、链接、高亮的主题色 */
--accent-gradient: linear-gradient(...); /* 渐变按钮、下划线、头像环 */
--glass-bg: rgba(236, 254, 250, 0.58);  /* 所有玻璃卡片背景 */
--glass-border: rgba(255, 255, 255, 0.82); /* 玻璃卡片边框 */
--text-primary: #0a2225;         /* 主文字色 */
```

> **注意**：三处（手动浅色、手动深色、系统深色）需要保持一致，否则在自动模式下可能出现颜色差异。

### 5. 修改 favicon

- 个人主页 favicon → 替换 `public/favicon1.png`
- 应用中心 favicon → 替换 `public/favicon2.png`
- 当前配置位于 `index.html` 第 5 行和 `apps.html` 第 5 行

### 6. 修改页面标题和描述

- **个人主页**（`index.html`）：`<title>` 第 8 行，`<meta name="description">` 第 7 行
- **应用中心**（`apps.html`）：`<title>` 第 8 行，`<meta name="description">` 第 7 行

### 7. 修改 Google Fonts

字体通过 `<link>` 标签在 HTML 中加载（`index.html` 第 13-16 行，`apps.html` 第 13-16 行），fallback 在 `src/style.css` 的 `body` 中定义（第 192 行）。如需更换字体，需同时修改两处。

## 🧩 应用中心自定义

应用中心（`apps.html` → `src/AppsApp.vue`）展示个人服务器上的自托管服务卡片，当前包含 4 个应用。

### 应用卡片结构

每个卡片（`.app-card`）分为三部分：

```
┌─ app-card__banner ─────────────────────┐
│  [图标]  [名称 + 副标题]      [状态徽章] │
├─ app-card__body ───────────────────────┤
│  描述文字                               │
│  [标签] [标签] [标签] ...               │
├─ app-card__footer ─────────────────────┤
│  [立即访问 按钮]          [开源项目 链接] │
└────────────────────────────────────────┘
```

### 修改应用信息

在 `src/AppsApp.vue` 中，每个应用卡片需要修改的字段：

| 字段 | HTML/属性 | 示例（Cloudreve） |
|------|-----------|-------------------|
| 图标 | `src="/assets/apps/cloudreve.png"` | 替换为你的图标路径 |
| 名称 | `app-card__name` | `Cloudreve` |
| 副标题 | `app-card__version` | `私有云存储` |
| 描述 | `app-card__desc` | 基于 Go 的私有网盘... |
| 标签 | `.tag` × N | `文件存储`、`多用户`... |
| 访问链接 | `app-card__btn` 的 `href` | `http://cloudreve.yaofeng.xyz` |
| 按钮渐变 | `app-card__btn` 的 `style` | `linear-gradient(135deg, #f97316, #fbbf24)` |
| Banner 渐变 | `app-card__banner` 的 `style` | `linear-gradient(135deg, #f97316, #fbbf24)` |
| 状态文字 | `.status-dot` + 文字 | `运行中` |
| 开源链接 | `app-card__meta-link` 的 `href` | `https://github.com/cloudreve/Cloudreve` |

### 修改服务器位置

在 Hero 区域 badge（第 63 行）：
```html
<span>当前网络：腾讯云CVM-南京</span>
```

### 修改页脚

第 289-303 行的 footer 区域：
- `apps-footer__name`：姓名
- `apps-footer__sub`：副标题
- `apps-footer__link` 的 `href`：个人主页链接
- `apps-footer__copy`：版权声明

### 自定义提示信息

第 273-276 行的 `.apps-notice`，可修改提示图标和文字内容。

## 🔗 平台账号链接格式

| 平台 | 链接格式 |
|------|---------|
| GitHub | `https://github.com/你的用户名` |
| Gitee | `https://gitee.com/你的用户名` |
| B站 | `https://space.bilibili.com/你的UID` |
| 抖音 | `https://www.douyin.com/user/你的ID` 或短链 |
| 小红书 | `https://www.xiaohongshu.com/user/profile/你的ID` |

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | ^3.4.0 | Composition API + `<script setup>` |
| TypeScript | ^5.3.0 | strict 模式，`@/*` 路径别名 |
| Vite | ^5.0.0 | 构建工具，多页配置 |
| vue-tsc | ^2.0.0 | Vue TypeScript 类型检查 |
| @vitejs/plugin-vue | ^5.0.0 | Vite Vue SFC 编译插件 |
| @types/node | ^25.9.1 | Node.js 类型声明 |
| 字体 | Inter + Noto Sans SC | Google Fonts，中西文混排 |

### TypeScript 配置

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,                    // 严格模式
    "noUnusedLocals": true,           // 禁止未使用局部变量
    "noUnusedParameters": true,        // 禁止未使用参数
    "noFallthroughCasesInSwitch": true, // 禁止 switch 穿透
    "paths": { "@/*": ["./src/*"] }   // @ 路径别名
  }
}
```

### 构建配置（`vite.config.ts`）

```ts
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },  // @ 指向 src/
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),  // 输出个人主页
        apps: resolve(__dirname, 'apps.html'),   // 输出应用中心
      },
    },
  },
})
```

## 🎯 关键技术实现

### 主题系统（`useTheme.ts`）

```
用户点击主题按钮
  ↓
toggleTheme() 循环：auto → light → dark → auto
  ↓
watch(currentTheme) → applyTheme()
  ├─ 设置 document.documentElement.setAttribute('data-theme', ...)
  ├─ 更新 resolvedTheme 响应式变量
  └─ localStorage.setItem('profile-theme', ...)
  ↓
CSS 变量根据 [data-theme='dark'] 自动切换
  ↓
壁纸列表通过 computed 跟随 resolvedTheme 切换
```

### 壁纸交叉淡入淡出（`App.vue`）

```
watch(currentWallpaper) 触发
  ↓
applyWallpaper(url):
  ├─ 活跃层 = A 时 → 预载到 layerB → 切换 activeLayer='b'
  └─ 活跃层 = B 时 → 预载到 layerA → 切换 activeLayer='a'
  ↓
CSS transition: opacity 0.8s ease-in-out
  ├─ 旧层 opacity: 1 → 0
  └─ 新层 opacity: 0 → 1
```

### 光标粒子系统（`useCursorEffect.ts`）

```
pointermove → 计算移动距离 → 生成粒子（最多 8 个/帧）
  ↓
requestAnimationFrame tick():
  ├─ 更新粒子位置（vx/vy *= 0.97 逐渐减速）
  ├─ 绘制粒子（4 类：orb/sparkle/ring/star）
  ├─ 粒子生命衰减 → 死亡移除
  └─ 绘制自定义光标（深色方形 / 浅色星形 + 呼吸动画）
  ↓
pointerdown → spawnClickBurst(25~45 个径向粒子)
  ↓
pointerleave → 光标移到屏幕外隐藏
```

### 滚动动画（`App.vue` + `style.css`）

```
onMounted 后 100ms → initRevealObserver()
  ↓
new IntersectionObserver(threshold: 0.12)
  ↓
观察所有 .reveal 元素
  ↓
进入视口 → 添加 .visible 类 → unobserve
  ↓
CSS: .reveal { opacity:0; translateY(32px) }
     .reveal.visible { opacity:1; translateY(0); transition: 0.7s }
     .reveal-delay-1~5 { transition-delay: 0.1~0.5s }
```

---

Made with ❤️ using Vue 3 + TypeScript
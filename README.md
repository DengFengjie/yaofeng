# 🌟 个人主页 Personal Profile

基于 Vue 3 + TypeScript + Vite 构建的个人主页，采用液态玻璃（Glassmorphism）设计风格。

## ✨ 功能特性

- 🎨 **液态玻璃效果** — 全页面 backdrop-filter 磨砂玻璃卡片
- 🌓 **双主题** — 自动跟随系统深色/浅色模式，支持右上角手动切换
- 🖼️ **自定义壁纸** — 浅色/深色主题分别使用独立壁纸
- 📱 **完全响应式** — 适配手机、平板、桌面端
- ✨ **滚动动画** — Intersection Observer 驱动的淡入上滑效果
- 🌐 **中英双语** — 所有板块中英对照

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
yaofeng/
├── public/
│   ├── assets/
│   │   ├── wallpaper-light.jpg   ← 【替换】浅色主题壁纸
│   │   ├── wallpaper-dark.jpg    ← 【替换】深色主题壁纸
│   │   └── avatar.jpg            ← 【替换】你的头像
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── NavBar.vue            导航栏 + 主题切换
│   │   ├── HeroSection.vue       首页 Hero 区域
│   │   ├── AboutSection.vue      关于我
│   │   ├── SkillsSection.vue     特长技能
│   │   ├── InterestsSection.vue  兴趣爱好
│   │   ├── DevPlatformsSection.vue 开发平台
│   │   ├── SocialSection.vue     社交媒体
│   │   └── FooterSection.vue     页脚
│   ├── composables/
│   │   └── useTheme.ts           主题管理逻辑
│   ├── App.vue                   根组件
│   ├── main.ts                   入口文件
│   └── style.css                 全局样式 & CSS 变量
└── index.html
```

## 🎨 自定义内容

### 1. 添加壁纸（文件夹轮换）

两种主题各有独立的壁纸文件夹，页面启动时随机选取一张，之后每 30 秒自动切换一次。页面底部的指示点也支持手动跳转。

```
public/assets/wallpapers/
├── light/          ← 浅色主题壁纸（可放任意数量）
│   ├── 1.jpg
│   ├── 2.jpg
│   └── ...
└── dark/           ← 深色主题壁纸
    ├── 1.jpg
    ├── 2.jpg
    └── ...
```

**步骤：**
1. 将图片放入对应文件夹（文件名任意）
2. 在 `src/composables/useWallpaper.ts` 的顶部数组中注册文件名：

```ts
const LIGHT_WALLPAPERS: string[] = [
  '/assets/wallpapers/light/1.jpg',
  '/assets/wallpapers/light/2.jpg',
  '/assets/wallpapers/light/你的图片.jpg', // ← 添加到这里
]

const DARK_WALLPAPERS: string[] = [
  '/assets/wallpapers/dark/1.jpg',
  '/assets/wallpapers/dark/你的图片.jpg',  // ← 添加到这里
]
```

3. 如需调整**自动轮换间隔**，修改同文件中的：
```ts
const AUTO_ROTATE_INTERVAL = 30_000 // 毫秒，设为 0 可禁用自动轮换
```

推荐图片尺寸：**1920×1080** 或更高，JPEG 格式。

### 2. 替换头像

将头像图片命名为 `avatar.jpg` 放到 `public/assets/`，建议正方形比例（如 400×400）。

### 3. 修改个人信息

各板块需要修改的文件和位置：

| 板块 | 文件 | 修改内容 |
|------|------|----------|
| 首页 | `HeroSection.vue` | 姓名、一句话介绍、身份标签、在线状态 |
| 关于我 | `AboutSection.vue` | 个人简介（3-4句）、所在地、学历、工作状态、邮箱 |
| 特长 | `SkillsSection.vue` | 技能类别、技能名称、熟练度（0-100）、技术标签 |
| 爱好 | `InterestsSection.vue` | 兴趣条目（名称、描述、图标、颜色） |
| 开发平台 | `DevPlatformsSection.vue` | GitHub/Gitee 用户名和主页链接 |
| 社交媒体 | `SocialSection.vue` | B站/抖音/小红书 账号 ID 和主页链接 |
| 页脚 | `FooterSection.vue` | 姓名、邮箱地址 |
| 导航栏 | `NavBar.vue` | Logo 文字（目前为 "YF"） |

### 4. 修改导航栏 Logo

在 `NavBar.vue` 中，找到：
```html
<span class="navbar__logo-text">YF</span>
```
替换为你的首字母缩写。

### 5. 修改主题色

在 `src/style.css` 的 `:root` 中修改：
```css
--accent-primary: #5b6ef5;    /* 主强调色（浅色主题） */
--accent-secondary: #a78bfa;  /* 次强调色 */
```

深色主题的颜色在 `[data-theme='dark']` 块中：
```css
--accent-primary: #818cf8;
```

## 🔗 平台账号链接格式

| 平台 | 链接格式 |
|------|---------|
| GitHub | `https://github.com/你的用户名` |
| Gitee | `https://gitee.com/你的用户名` |
| B站 | `https://space.bilibili.com/你的UID` |
| 抖音 | `https://www.douyin.com/user/你的ID` |
| 小红书 | `https://www.xiaohongshu.com/user/profile/你的ID` |

## 🛠️ 技术栈

| 技术 | 版本 |
|------|------|
| Vue | ^3.4.0 |
| TypeScript | ^5.3.0 |
| Vite | ^5.0.0 |
| 字体 | Inter + Noto Sans SC (Google Fonts) |

---

Made with ❤️ using Vue 3 + TypeScript

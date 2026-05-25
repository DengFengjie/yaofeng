<template>
  <!-- Wallpaper layer -->
  <div
    class="wallpaper-layer"
    :style="{ backgroundImage: `url(${currentWallpaper})`, opacity: 1 }"
  />
  <div class="wallpaper-overlay-div" />

  <!-- Background orbs -->
  <div class="bg-orb bg-orb-1" />
  <div class="bg-orb bg-orb-2" />
  <div class="bg-orb bg-orb-3" />

  <!-- ─── Navbar ─── -->
  <nav class="apps-nav" :class="{ 'apps-nav--scrolled': isScrolled }">
    <div class="apps-nav__inner">
      <!-- Logo -->
      <a href="/" class="apps-nav__logo">
        <img src="/logo.svg" alt="Logo"/>
      </a>

      <!-- Center title -->
      <span class="apps-nav__logo-text">鹞枫</span>
      <span class="apps-nav__title">应用中心</span>

      <!-- Right actions -->
      <div class="apps-nav__actions">

        <!-- Theme toggle -->
        <button
          class="theme-btn"
          :title="themeLabel"
          aria-label="切换主题"
          @click="toggleTheme"
        >
          <svg v-if="resolvedTheme === 'light' && currentTheme !== 'auto'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <svg v-else-if="resolvedTheme === 'dark' && currentTheme !== 'auto'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 2v20M2 12h20" stroke-width="1.5"/>
            <path d="M12 2a10 10 0 0 1 0 20" fill="currentColor" opacity="0.15"/>
          </svg>
        </button>
      </div>
    </div>
  </nav>

  <!-- ─── Main ─── -->
  <main class="apps-main">

    <!-- Hero -->
    <section class="apps-hero reveal">
      <div class="apps-hero__badge">
        <span class="apps-hero__badge-dot" />
        <span>当前网络：腾讯云CVM-南京</span>
      </div>
      <h1 class="apps-hero__title">应用中心</h1>
      <p class="apps-hero__sub">
        个人服务器自托管应用，点击卡片即可访问。
      </p>
    </section>

    <!-- App cards grid -->
    <section class="apps-grid">

      <!-- ── Cloudreve ── -->
      <div class="app-card glass-card reveal reveal-delay-1">
        <div class="app-card__banner" style="background: linear-gradient(135deg, #f97316 0%, #fbbf24 100%);">
          <div class="app-card__icon-wrap">
            <!-- Cloudreve logo: cloud + arrow up -->
            <img src="/assets/apps/cloudreve.svg" alt="Cloudreve" class="app-card__icon">
          </div>
          <div class="app-card__banner-text">
            <h2 class="app-card__name">Cloudreve</h2>
            <span class="app-card__version">私有云存储</span>
          </div>
          <div class="app-card__status">
            <span class="status-dot status-dot--online" />
            <span>运行中</span>
          </div>
        </div>

        <div class="app-card__body">
          <p class="app-card__desc">
            基于 Go 的私有网盘系统，支持多用户管理、文件分享、在线预览、WebDAV 挂载，以及离线下载等功能，是搭建个人私有云的理想选择。
          </p>
          <div class="app-card__tags">
            <span class="tag">文件存储</span>
            <span class="tag">多用户</span>
            <span class="tag">WebDAV</span>
            <span class="tag">在线预览</span>
            <span class="tag">分享链接</span>
          </div>
        </div>

        <div class="app-card__footer">
          <!-- 【将下方 href 替换为你的 Cloudreve 地址】 -->
          <a href="http://storage.yaofeng.xyz" target="_blank" rel="noopener noreferrer" class="app-card__btn" style="background: linear-gradient(135deg, #f97316, #fbbf24);">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="app-card__btn-icon">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            立即访问
          </a>
          <div class="app-card__meta">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="app-card__meta-icon">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
            <a href="https://github.com/cloudreve/Cloudreve" target="_blank" rel="noopener noreferrer" class="app-card__meta-link">开源项目</a>
          </div>
        </div>
      </div>

      <!-- ── Screego ── -->
      <div class="app-card glass-card reveal reveal-delay-2">
        <div class="app-card__banner" style="background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%);">
          <div class="app-card__icon-wrap">
            <!-- Screego logo: screen share -->
            <img src="/assets/apps/screego.svg" alt="Screego" class="app-card__icon">
          </div>
          <div class="app-card__banner-text">
            <h2 class="app-card__name">Screego</h2>
            <span class="app-card__version">屏幕共享</span>
          </div>
          <div class="app-card__status">
            <span class="status-dot status-dot--online" />
            <span>运行中</span>
          </div>
        </div>

        <div class="app-card__body">
          <p class="app-card__desc">
            基于 WebRTC 的开源屏幕共享服务，提供低延迟、高清晰度的屏幕串流能力，支持多房间并发，无需安装客户端，浏览器即可直接使用。
          </p>
          <div class="app-card__tags">
            <span class="tag">屏幕共享</span>
            <span class="tag">WebRTC</span>
            <span class="tag">低延迟</span>
            <span class="tag">多房间</span>
            <span class="tag">无需安装</span>
          </div>
        </div>

        <div class="app-card__footer">
          <!-- 【将下方 href 替换为你的 Screego 地址】 -->
          <a href="http://screego.yaofeng.xyz" target="_blank" rel="noopener noreferrer" class="app-card__btn" style="background: linear-gradient(135deg, #2563eb, #06b6d4);">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="app-card__btn-icon">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            立即访问
          </a>
          <div class="app-card__meta">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="app-card__meta-icon">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
            <a href="https://github.com/screego/server" target="_blank" rel="noopener noreferrer" class="app-card__meta-link">开源项目</a>
          </div>
        </div>
      </div>

      <!-- ── Jellyfin ── -->
      <div class="app-card glass-card reveal reveal-delay-3">
        <div class="app-card__banner" style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 60%, #ec4899 100%);">
          <div class="app-card__icon-wrap">
            <!-- Jellyfin logo: stylized J / play button -->
            <img src="/assets/apps/jellyfin.svg" alt="Jellyfin" class="app-card__icon">
          </div>
          <div class="app-card__banner-text">
            <h2 class="app-card__name">Jellyfin</h2>
            <span class="app-card__version">媒体服务器</span>
          </div>
          <div class="app-card__status">
            <span class="status-dot status-dot--online" />
            <span>运行中</span>
          </div>
        </div>

        <div class="app-card__body">
          <p class="app-card__desc">
            完全免费开源的个人媒体服务器，可管理并流式传输电影、电视剧、音乐、照片等内容。支持多客户端、字幕、转码，是 Emby 的开源替代品。
          </p>
          <div class="app-card__tags">
            <span class="tag">媒体库</span>
            <span class="tag">流媒体</span>
            <span class="tag">电影电视</span>
            <span class="tag">音乐</span>
            <span class="tag">转码</span>
          </div>
        </div>

        <div class="app-card__footer">
          <!-- 【将下方 href 替换为你的 Jellyfin 地址】 -->
          <a href="http://jellyfin.yaofeng.xyz" target="_blank" rel="noopener noreferrer" class="app-card__btn" style="background: linear-gradient(135deg, #7c3aed, #ec4899);">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="app-card__btn-icon">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            立即访问
          </a>
          <div class="app-card__meta">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="app-card__meta-icon">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
            <a href="https://github.com/jellyfin/jellyfin" target="_blank" rel="noopener noreferrer" class="app-card__meta-link">开源项目</a>
          </div>
        </div>
      </div>

    </section><!-- /apps-grid -->

    <!-- Info notice -->
    <div class="apps-notice glass-card reveal reveal-delay-4">
      <img src="/assets/apps/notice.png" alt="Info" class="apps-notice__icon" />
      <p>以上服务架设于私人服务器，仅供授权人员使用。如遇访问失败，可能是服务正在维护或网络受限。</p>
    </div>

  </main>

  <!-- ─── Footer ─── -->
  <footer class="apps-footer">
    <div class="apps-footer__inner">
      <div class="apps-footer__left">
        <div class="apps-footer__logo">
          <img src="/logo.svg" alt="Logo">
        </div>
        <div>
          <!-- 【替换为你的名字】 -->
          <p class="apps-footer__name">鹞枫</p>
          <p class="apps-footer__sub">个人服务器 · 应用中心</p>
        </div>
      </div>
      <div class="apps-footer__right">
        <!-- 【将下方 href 替换为你的个人主页地址】 -->
        <a href="/" class="apps-footer__link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          个人主页
        </a>
        <span class="apps-footer__sep">·</span>
        <p class="apps-footer__copy">© {{ currentYear }} 邓冯杰. 保留所有权利。</p>
      </div>
    </div>
  </footer>

  <!-- Wallpaper indicator dots -->
  <div class="wallpaper-indicator">
    <button class="wallpaper-nav-btn" @click="prevWallpaper" aria-label="上一张壁纸">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <button
      v-for="i in totalCount"
      :key="i"
      class="wallpaper-dot"
      :class="{ active: currentIndex === i - 1 }"
      @click="setWallpaperIndex(i - 1)"
    />
    <button class="wallpaper-nav-btn" @click="nextWallpaper" aria-label="下一张壁纸">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { useWallpaper } from '@/composables/useWallpaper'

const { currentTheme, resolvedTheme, toggleTheme } = useTheme()
const {
  currentWallpaper,
  currentIndex,
  totalCount,
  nextWallpaper,
  prevWallpaper,
  setWallpaperIndex,
  init: initWallpaper,
} = useWallpaper()

const themeLabel = computed(() => {
  if (currentTheme.value === 'auto') return '自动模式'
  if (currentTheme.value === 'light') return '浅色模式'
  return '深色模式'
})

const currentYear = new Date().getFullYear()

// Scroll state for navbar
const isScrolled = ref(false)
function onScroll() { isScrolled.value = window.scrollY > 40 }

// Scroll reveal
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
    { threshold: 0.08 }
  )
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
}

onMounted(() => {
  initWallpaper()
  window.addEventListener('scroll', onScroll, { passive: true })
  setTimeout(initReveal, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
/* ── Navbar ── */
.apps-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 0 24px;
  height: 64px;
  transition: background var(--transition-normal), box-shadow var(--transition-normal), backdrop-filter var(--transition-normal);
}

.apps-nav--scrolled {
  background: var(--nav-bg);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid var(--nav-border);
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
}

.apps-nav__inner {
  max-width: 1100px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.apps-nav__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px; height: 40px;
  border-radius: 12px;
  background: transparent;
  flex-shrink: 0;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}
.apps-nav__logo:hover { transform: scale(1.08); }
.apps-nav__logo-text {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.05em;
}

.apps-nav__title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0.02em;
  flex: 1;
  text-align: center;
}

.apps-nav__actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.apps-nav__back-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  border-radius: var(--radius-sm);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(10px);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}
.apps-nav__back-btn svg { width: 14px; height: 14px; }
.apps-nav__back-btn:hover {
  color: var(--accent-primary);
  border-color: var(--accent-primary);
  background: var(--glass-bg-hover);
}

.theme-btn {
  display: flex; align-items: center; justify-content: center;
  width: 38px; height: 38px;
  border-radius: 10px;
  color: var(--text-secondary);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(10px);
  transition: all var(--transition-fast);
}
.theme-btn svg { width: 18px; height: 18px; }
.theme-btn:hover { background: var(--glass-bg-hover); color: var(--accent-primary); border-color: var(--accent-primary); transform: scale(1.08); }

/* ── Main ── */
.apps-main {
  min-height: 100vh;
  padding: 100px 24px 60px;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

/* ── Hero ── */
.apps-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
  padding: 40px 0 8px;
}

.apps-hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 18px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(12px);
  border-radius: var(--radius-full);
  font-size: 0.80rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.apps-hero__badge-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 3px rgba(34,197,94,0.2);
  animation: pulse-dot 2s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes pulse-dot {
  0%,100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.20); }
  50%      { box-shadow: 0 0 0 7px rgba(34,197,94,0.08); }
}

.apps-hero__title {
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.apps-hero__sub {
  font-size: 1rem;
  color: var(--text-secondary);
  max-width: 500px;
  line-height: 1.7;
}

/* ── App cards grid ── */
.apps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  align-items: start;
}

/* App card */
.app-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
}

/* Banner top section */
.app-card__banner {
  padding: 24px 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
}

.app-card__icon-wrap {
  width: 60px; height: 60px;
  border-radius: 16px;
  background: rgba(255,255,255,0.5);
  border: 1.5px solid rgba(255,255,255,0.35);
  display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(6px);
}
.app-card__icon { width: 36px; height: 36px; }

.app-card__banner-text {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.app-card__name {
  font-size: 1.35rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.01em;
}
.app-card__version {
  font-size: 0.78rem;
  font-weight: 500;
  color: rgba(255,255,255,0.80);
  letter-spacing: 0.04em;
}

.app-card__status {
  position: absolute;
  top: 18px; right: 18px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
  background: rgba(0,0,0,0.22);
  border: 1px solid rgba(255,255,255,0.20);
  border-radius: var(--radius-full);
  font-size: 0.72rem;
  font-weight: 500;
  color: rgba(255,255,255,0.92);
  backdrop-filter: blur(8px);
}

.status-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
.status-dot--online  { background: #22c55e; box-shadow: 0 0 0 2px rgba(34,197,94,0.30); animation: pulse-dot 2s ease-in-out infinite; }
.status-dot--offline { background: #ef4444; }
.status-dot--warning { background: #f59e0b; }

/* Card body */
.app-card__body {
  padding: 22px 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}
.app-card__desc {
  font-size: 0.88rem;
  line-height: 1.75;
  color: var(--text-secondary);
}
.app-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

/* Card footer */
.app-card__footer {
  padding: 16px 24px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-top: 1px solid var(--glass-border);
}

.app-card__btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 10px 22px;
  border-radius: var(--radius-sm);
  font-size: 0.88rem;
  font-weight: 600;
  color: #fff;
  box-shadow: 0 4px 16px rgba(0,0,0,0.20);
  transition: all var(--transition-normal);
  letter-spacing: 0.02em;
}
.app-card__btn-icon { width: 14px; height: 14px; }
.app-card__btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.30); filter: brightness(1.06); }

.app-card__meta {
  display: flex;
  align-items: center;
  gap: 5px;
}
.app-card__meta-icon { width: 14px; height: 14px; color: var(--text-muted); flex-shrink: 0; }
.app-card__meta-link {
  font-size: 0.78rem;
  color: var(--text-muted);
  transition: color var(--transition-fast);
}
.app-card__meta-link:hover { color: var(--accent-primary); }

/* ── Notice bar ── */
.apps-notice {
  padding: 18px 24px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  border-left: 3px solid var(--accent-primary);
}
.apps-notice__icon {
  width: 20px; height: 20px;
  color: var(--accent-primary);
  flex-shrink: 0;
  margin-top: 1px;
}
.apps-notice p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

/* ── Footer ── */
.apps-footer {
  margin-top: 16px;
  border-top: 1px solid var(--glass-border);
}
.apps-footer__inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 28px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.apps-footer__left { display: flex; align-items: center; gap: 12px; }
.apps-footer__logo {
  width: 38px; height: 38px;
  border-radius: 10px;
  background: transparent;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.82rem; font-weight: 700; color: #fff;
  flex-shrink: 0;
}
.apps-footer__name { font-size: 0.90rem; font-weight: 600; color: var(--text-primary); }
.apps-footer__sub { font-size: 0.75rem; color: var(--text-muted); margin-top: 1px; }

.apps-footer__right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.apps-footer__link {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.82rem;
  color: var(--text-secondary);
  transition: color var(--transition-fast);
}
.apps-footer__link svg { width: 13px; height: 13px; }
.apps-footer__link:hover { color: var(--accent-primary); }
.apps-footer__sep { color: var(--text-muted); font-size: 0.82rem; }
.apps-footer__copy { font-size: 0.78rem; color: var(--text-muted); }

/* Wallpaper nav btn */
.wallpaper-nav-btn {
  display: flex; align-items: center; justify-content: center;
  width: 20px; height: 20px;
  color: var(--text-muted);
  transition: color var(--transition-fast);
}
.wallpaper-nav-btn svg { width: 14px; height: 14px; }
.wallpaper-nav-btn:hover { color: var(--accent-primary); }

/* ── Responsive ── */
@media (max-width: 900px) {
  .apps-grid { grid-template-columns: 1fr; max-width: 520px; margin: 0 auto; width: 100%; }
}
@media (max-width: 600px) {
  .apps-nav__back-btn span { display: none; }
  .apps-footer__inner { flex-direction: column; align-items: flex-start; }
}
</style>

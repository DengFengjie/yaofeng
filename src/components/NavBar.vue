<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': isScrolled }">
    <div class="navbar__inner">
      <!-- Logo / Name -->
      <a href="#hero" class="navbar__logo">
        <img src="/logo.svg" alt="logo" />
      </a>
      <span class="navbar__logo-text">鹞枫</span>

      <!-- Desktop Nav Links -->
      <ul class="navbar__links">
        <li v-for="link in navLinks" :key="link.href">
          <a :href="link.href" class="navbar__link">
            <span class="navbar__link-zh">{{ link.zh }}</span>
          </a>
        </li>
      </ul>

      <!-- Right: Theme toggle + Mobile menu -->
      <div class="navbar__actions">
        <button
          class="theme-btn"
          :title="themeLabel"
          aria-label="切换主题"
          @click="toggleTheme"
        >
          <!-- Sun icon (light) -->
          <svg v-if="resolvedTheme === 'light' && currentTheme !== 'auto'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <!-- Moon icon (dark) -->
          <svg v-else-if="resolvedTheme === 'dark' && currentTheme !== 'auto'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
          <!-- Auto icon -->
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 2v20M2 12h20" stroke-width="1.5"/>
            <path d="M12 2a10 10 0 0 1 0 20" fill="currentColor" opacity="0.15"/>
          </svg>
        </button>

        <!-- Mobile hamburger -->
        <button
          class="hamburger"
          :class="{ 'hamburger--open': mobileOpen }"
          aria-label="打开菜单"
          @click="mobileOpen = !mobileOpen"
        >
          <span /><span /><span />
        </button>
      </div>
    </div>

    <!-- Mobile Menu Dropdown -->
    <Transition name="mobile-menu">
      <div v-if="mobileOpen" class="mobile-menu">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="mobile-menu__link"
          @click="mobileOpen = false"
        >
          {{ link.zh }}
        </a>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { currentTheme, resolvedTheme, toggleTheme } = useTheme()

const isScrolled = ref(false)
const mobileOpen = ref(false)

const navLinks = [
  { href: '#about',     zh: '简介' },
  { href: '#skills',    zh: '特长' },
  { href: '#interests', zh: '爱好' },
  { href: '#platforms', zh: '开发' },
  { href: '#social',    zh: '社交' },
  { href: 'apps',      zh: '应用' },
]

const themeLabel = computed(() => {
  if (currentTheme.value === 'auto') return '自动模式'
  if (currentTheme.value === 'light') return '浅色模式'
  return '深色模式'
})

function onScroll() {
  isScrolled.value = window.scrollY > 40
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 24px;
  height: 64px;
  transition: background var(--transition-normal), box-shadow var(--transition-normal), backdrop-filter var(--transition-normal);
}

.navbar--scrolled {
  background: var(--nav-bg);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid var(--nav-border);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.navbar__inner {
  max-width: 1100px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

/* Logo */
.navbar__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: transparent;
  flex-shrink: 0;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.navbar__logo:hover {
  transform: scale(1.08);
  box-shadow: 0 4px 16px rgba(91, 110, 245, 0.40);
}

.navbar__logo-text {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.05em;
}

/* Nav links */
.navbar__links {
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;
  flex: 1;
  justify-content: center;
}

.navbar__link {
  display: flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: var(--radius-sm);
  transition: background var(--transition-fast), color var(--transition-fast);
}

.navbar__link:hover {
  background: var(--glass-bg);
  color: var(--accent-primary);
}

.navbar__link-zh {
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--text-primary);
  transition: color var(--transition-fast);
}

.navbar__link:hover .navbar__link-zh {
  color: var(--accent-primary);
}

/* Actions */
.navbar__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

/* Theme toggle button */
.theme-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  color: var(--text-secondary);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(10px);
  transition: all var(--transition-fast);
}

.theme-btn svg {
  width: 18px;
  height: 18px;
}

.theme-btn:hover {
  background: var(--glass-bg-hover);
  color: var(--accent-primary);
  border-color: var(--accent-primary);
  transform: scale(1.08);
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  padding: 8px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  transition: all var(--transition-fast);
}

.hamburger span {
  display: block;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all var(--transition-normal);
  transform-origin: center;
}

.hamburger--open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.hamburger--open span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.hamburger--open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile menu */
.mobile-menu {
  position: absolute;
  top: 64px;
  left: 16px;
  right: 16px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  box-shadow: var(--glass-shadow);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mobile-menu__link {
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background var(--transition-fast), color var(--transition-fast);
}

.mobile-menu__link:hover {
  background: var(--accent-gradient-soft);
  color: var(--accent-primary);
}

/* Transition */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.97);
}

/* Responsive */
@media (max-width: 768px) {
  .navbar__links {
    display: none;
  }
  .hamburger {
    display: flex;
  }
}
</style>

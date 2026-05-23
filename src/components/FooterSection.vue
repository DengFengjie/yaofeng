<template>
  <footer class="footer">
    <div class="footer__inner">
      <!-- Top row -->
      <div class="footer__top">
        <div class="footer__brand">
          <div class="footer__logo">
            <img src="/logo.svg" alt="Logo" />
          </div>
          <div>
            <!-- 【替换为你的名字】 -->
            <p class="footer__brand-name">鹞枫</p>
            <p class="footer__brand-tagline">热爱技术，享受生活</p>
          </div>
        </div>

        <!-- Quick links -->
        <nav class="footer__nav">
          <p class="footer__nav-title">快速导航</p>
          <ul class="footer__nav-list">
            <li v-for="link in navLinks" :key="link.href">
              <a :href="link.href" class="footer__nav-link">{{ link.label }}</a>
            </li>
          </ul>
        </nav>

        <!-- Contact -->
        <div class="footer__contact">
          <p class="footer__nav-title">联系方式</p>
          <a href="mailto:your@email.com" class="footer__contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <!-- 【替换为你的邮箱】 -->
            dengfj0214@outlook.com
          </a>
        </div>
      </div>

      <!-- Divider -->
      <div class="footer__divider" />

      <!-- Bottom row -->
      <div class="footer__bottom">
        <p class="footer__copyright">
          © {{ currentYear }} 邓冯杰. 保留所有权利。
          <!-- 【替换为你的名字】 -->
        </p>
        <p class="footer__built-with">
          使用
          <span class="footer__tech-badge">Vue 3</span>
          <span class="footer__tech-badge">TypeScript</span>
          <span class="footer__tech-badge">Vite</span>
          构建
        </p>
      </div>
    </div>

    <!-- Background decoration -->
    <div class="footer__glow" />
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()

const navLinks = [
  { href: '#hero',      label: '首页' },
  { href: '#about',     label: '简介' },
  { href: '#skills',    label: '特长' },
  { href: '#interests', label: '爱好' },
  { href: '#platforms', label: '开发' },
  { href: '#social',    label: '社交' },
]
</script>

<style scoped>
.footer {
  position: relative;
  margin-top: 40px;
  overflow: hidden;
}

.footer__inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 48px 24px 32px;
}

.footer__top {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 32px;
}

/* Brand */
.footer__brand {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.footer__logo {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
  letter-spacing: 0.05em;
}

.footer__brand-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
}

.footer__brand-tagline {
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-top: 2px;
  line-height: 1.5;
}

/* Nav */
.footer__nav-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-accent);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.footer__nav-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer__nav-link {
  font-size: 0.85rem;
  color: var(--text-secondary);
  transition: color var(--transition-fast);
}

.footer__nav-link:hover {
  color: var(--accent-primary);
}

/* Contact */
.footer__contact {
  display: flex;
  flex-direction: column;
}

.footer__contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  transition: color var(--transition-fast);
  margin-top: 12px;
}

.footer__contact-item svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.footer__contact-item:hover {
  color: var(--accent-primary);
}

/* Divider */
.footer__divider {
  height: 1px;
  background: var(--glass-border);
  margin-bottom: 24px;
}

/* Bottom */
.footer__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.footer__copyright {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.footer__built-with {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  color: var(--text-muted);
  flex-wrap: wrap;
}

.footer__tech-badge {
  padding: 2px 8px;
  background: var(--tag-bg);
  border: 1px solid var(--tag-border);
  border-radius: var(--radius-full);
  font-size: 0.72rem;
  color: var(--tag-text);
  font-weight: 500;
}

/* Glow */
.footer__glow {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 200px;
  background: radial-gradient(ellipse, rgba(91, 110, 245, 0.12), transparent 70%);
  pointer-events: none;
}

/* Responsive */
@media (max-width: 768px) {
  .footer__top {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .footer__bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>

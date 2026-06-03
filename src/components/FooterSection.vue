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
          <a href="mailto:dengfj0214@outlook.com" class="footer__contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            dengfj0214@outlook.com
          </a>
          <a href="tencent://message/?uin=你的QQ号" class="footer__contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M21.395 15.035a40 40 0 0 0-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.526 4.632 17.351 0 12 0S4.474 4.632 4.474 9.241c0 .274.013.804.014.836l-1.08 2.695a39 39 0 0 0-.802 2.264c-1.021 3.283-.69 4.643-.438 4.673.54.065 2.103-2.472 2.103-2.472 0 1.469.756 3.387 2.394 4.771-.612.188-1.363.479-1.845.835-.434.32-.379.646-.301.778.343.578 5.883.369 7.482.189 1.6.18 7.14.389 7.483-.189.078-.132.132-.458-.301-.778-.483-.356-1.233-.646-1.846-.836 1.637-1.384 2.393-3.302 2.393-4.771 0 0 1.563 2.537 2.103 2.472.251-.03.581-1.39-.438-4.673"/>
              <line x1="9" y1="9" x2="9.01" y2="9"/>
              <line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>
            1963381859
          </a>
          <span class="footer__contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
              <line x1="12" y1="15.5" x2="12" y2="17"/>
            </svg>
            dfj04Feb
          </span>
          <a href="tel:你的电话号码" class="footer__contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            13789918798
          </a>
        </div>
      </div>

      <!-- Divider -->
      <div class="footer__divider" />

      <!-- Bottom row -->
      <div class="footer__bottom">
        <div class="footer__left">
          <p class="footer__copyright">
            © {{ currentYear }} 邓冯杰. 保留所有权利。
            <!-- 【替换为你的名字】 -->
          </p>
          <!-- ICP备案 & 公安备案（放在所有权正下方） -->
          <div class="footer__beian">
            <img src="/assets/beian/beian-icp.png" alt="ICP备案图标" class="footer__beian-icon" />
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" class="footer__beian-link">
              <!-- 【替换为你的ICP备案号】 -->
              鄂ICP备 2024078218号-1
            </a>
            <span class="footer__beian-separator">|</span>
            <img src="/assets/beian/beian-gov.png" alt="GOV备案图标" class="footer__beian-icon" />
            <a href="https://beian.mps.gov.cn/#/query/webSearch?code=42900402000897" target="_blank" rel="noopener noreferrer" class="footer__beian-link">
              <!-- 【替换为你的公安备案号】 -->
              鄂公网安备 42900402000897号
            </a>
          </div>
        </div>
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

/* 左侧：所有权 + 备案号 */
.footer__left {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.footer__copyright {
  font-size: 0.78rem;
  color: var(--text-muted);
}

/* ICP备案 & 公安备案 */
.footer__beian {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer__beian-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.78rem;
  color: #000;
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer__beian-link:hover {
  color: var(--accent-primary);
}

.footer__beian-icon {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}

.footer__beian-separator {
  font-size: 0.78rem;
  color: #000;
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

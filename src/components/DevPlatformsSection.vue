<template>
  <section id="platforms" class="section">
    <div class="reveal">
      <h2 class="section-title">开发平台</h2>
      <div class="section-title-underline" />
    </div>

    <div class="platforms__grid">
      <a
        v-for="(platform, i) in devPlatforms"
        :key="platform.name"
        :href="platform.url"
        target="_blank"
        rel="noopener noreferrer"
        class="glass-card platforms__card reveal"
        :class="`reveal-delay-${i + 1}`"
      >
        <!-- Platform Logo -->
        <div class="platforms__logo" :style="{ background: platform.gradient }">
          <svg viewBox="0 0 24 24" fill="currentColor" v-html="platform.svgPath" />
        </div>

        <!-- Platform Info -->
        <div class="platforms__info">
          <h3 class="platforms__name">{{ platform.name }}</h3>
          <p class="platforms__username">{{ platform.username }}</p>
          <p class="platforms__desc">{{ platform.desc }}</p>
        </div>

        <!-- Stats -->
        <div v-if="platform.stats" class="platforms__stats">
          <div v-for="stat in platform.stats" :key="stat.label" class="platforms__stat">
            <span class="platforms__stat-value">{{ stat.value }}</span>
            <span class="platforms__stat-label">{{ stat.label }}</span>
          </div>
        </div>

        <!-- Arrow -->
        <div class="platforms__arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M7 17L17 7M17 7H7M17 7v10"/>
          </svg>
        </div>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
interface PlatformStat {
  label: string
  value: string
}

interface DevPlatform {
  name: string
  username: string
  desc: string
  url: string
  gradient: string
  svgPath: string
  stats?: PlatformStat[]
}

// 【替换 url 和 username 为你的真实账号信息】
const devPlatforms: DevPlatform[] = [
  {
    name: 'GitHub',
    username: '@DengFengjie',
    desc: '个人用免费代码仓库',
    url: 'https://github.com/DengFengjie',
      gradient: 'linear-gradient(135deg, #24292e, #40464f)',
      svgPath: '<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>',
    stats: [
      { label: '仓库', value: '∞+' },
      { label: '关注', value: '0' },
      { label: '星标', value: '0' },
    ],
  },
  {
    name: 'Gitee',
    username: '@dengfj0214',
    desc: '工作用国内代码仓库',
    url: 'https://gitee.com/dengfj0214',
    gradient: 'linear-gradient(135deg, #c7254e, #e74c3c)',
    svgPath: '<path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z"/>',
    stats: [
      { label: '仓库', value: '0+' },
      { label: '关注', value: '0' },
      { label: '星标', value: '0' },
    ],
  },
]
</script>

<style scoped>
.platforms__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 20px;
}

.platforms__card {
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  position: relative;
  overflow: hidden;
  text-decoration: none;
}

/* Decorative shine on hover */
.platforms__card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.06), transparent);
  transition: left 0.5s ease;
  pointer-events: none;
}

.platforms__card:hover::before {
  left: 130%;
}

.platforms__logo {
  width: 60px;
  height: 60px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.20);
  flex-shrink: 0;
}

.platforms__logo svg {
  width: 32px;
  height: 32px;
  color: #fff;
  fill: #fff;
}

.platforms__info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.platforms__name {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.platforms__username {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-accent);
  font-family: 'Inter', monospace;
}

.platforms__desc {
  font-size: 0.82rem;
  color: var(--text-muted);
  margin-top: 2px;
}

/* Stats row */
.platforms__stats {
  display: flex;
  gap: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--glass-border);
}

.platforms__stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.platforms__stat-value {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.platforms__stat-label {
  font-size: 0.68rem;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0.04em;
}

/* Arrow */
.platforms__arrow {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  transition: all var(--transition-normal);
}

.platforms__arrow svg {
  width: 16px;
  height: 16px;
  transition: transform var(--transition-normal);
}

.platforms__card:hover .platforms__arrow {
  color: var(--accent-primary);
}

.platforms__card:hover .platforms__arrow svg {
  transform: translate(3px, -3px);
}

/* Responsive */
@media (max-width: 768px) {
  .platforms__grid {
    grid-template-columns: 1fr;
  }
}
</style>

<template>
  <section id="about" class="section">
    <div class="reveal">
      <h2 class="section-title">个人简介</h2>
      <div class="section-title-underline" />
    </div>

    <div class="about__layout">
      <!-- Main bio card -->
      <div class="glass-card about__card reveal reveal-delay-1">
        <div class="about__card-header">
          <div class="about__card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div>
            <h3 class="about__card-title">个人简介</h3>
          </div>
        </div>

        <div class="about__bio-content">
          <!-- 【替换为你的个人简介，2-4句话即可】 -->
          <p>
            你好！这里是 <strong>鹞枫</strong>，一名熟悉编程与AI Agent的软件开发者，毕业于 <strong>武汉轻工大学</strong>。
          </p>
          <p>
            工作时我专注于 <strong>【全栈Web开发、服务器运维】</strong>，喜欢探索新技术并将其应用于实际项目中。
          </p>
          <p>
            闲暇时我则热衷于<strong>【人像和风光摄影、琢磨代码和软件工具】</strong>，相信持续学习是成长的核心驱动力。
          </p>
        </div>
      </div>

      <!-- Info cards grid -->
      <div class="about__info-grid">
        <div
          v-for="(item, i) in infoItems"
          :key="item.label"
          class="glass-card about__info-card reveal"
          :class="`reveal-delay-${i + 2}`"
        >
          <div class="about__info-icon">
            <component :is="'svg'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" v-html="item.iconPath" />
          </div>
          <div class="about__info-body">
            <span class="about__info-label">{{ item.label }}</span>
            <span class="about__info-value">{{ item.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 【替换为你的真实信息】
const infoItems = [
  {
    label: '所在地',
    value: '中国 · 湖北 · 武汉',
    iconPath: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  },
  {
    label: '学历',
    value: '本科 · 数据科学与大数据',
    iconPath: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
  },
  {
    label: '职业状态',
    value: '在校学生 / 开发者',
    iconPath: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  },
  {
    label: '邮箱',
    value: 'dengfj0214@outlook.com',
    iconPath: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  },
]
</script>

<style scoped>
.about__layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
}

/* Main bio card */
.about__card {
  padding: var(--card-padding);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.about__card-header {
  display: flex;
  align-items: center;
  gap: 14px;
}

.about__card-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-sm);
  background: var(--accent-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.about__card-icon svg {
  width: 22px;
  height: 22px;
  stroke: #fff;
}

.about__card-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-primary);
}

.about__bio-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.about__bio-content p {
  font-size: 0.95rem;
  line-height: 1.8;
  color: var(--text-secondary);
}

.about__bio-content strong {
  color: var(--text-primary);
  font-weight: 600;
}

/* Info cards grid */
.about__info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.about__info-card {
  padding: 18px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
}

.about__info-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  background: var(--accent-gradient-soft);
  border: 1px solid var(--tag-border);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background var(--transition-fast);
}

.about__info-icon svg {
  width: 18px;
  height: 18px;
  stroke: var(--accent-primary);
}

.about__info-card:hover .about__info-icon {
  background: var(--accent-gradient);
}

.about__info-card:hover .about__info-icon svg {
  stroke: #fff;
}

.about__info-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.about__info-label {
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.about__info-value {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Responsive */
@media (max-width: 900px) {
  .about__layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .about__info-grid {
    grid-template-columns: 1fr;
  }
}
</style>

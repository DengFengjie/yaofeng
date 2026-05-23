<template>
  <section id="interests" class="section">
    <div class="reveal">
      <h2 class="section-title">兴趣爱好</h2>
      <div class="section-title-underline" />
    </div>

    <div class="interests__grid">
      <div
        v-for="(item, i) in interests"
        :key="item.name"
        class="glass-card interests__card reveal"
        :class="`reveal-delay-${(i % 4) + 1}`"
      >
        <div class="interests__icon" :style="{ background: item.gradient }">
          <img :src="item.iconPath" :alt="item.name" class="interests__icon-img" />
        </div>
        <div class="interests__body">
          <h3 class="interests__name">{{ item.name }}</h3>
          <p class="interests__desc">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 【替换为你的真实兴趣爱好，可以增减条目】
// iconPath 使用本地 png 文件，目前为示例占位路径，请替换为实际文件路径
const interests = [
  {
    name: '电影',
    desc: '喜欢各种类型的电影，尤其是科幻和剧情片。',
    gradient: 'linear-gradient(135deg, #f43f5e, #fb923c)',
    iconPath: '/assets/interests/movie.png',
  },
  {
    name: '音乐',
    desc: '享受各种ACG音乐带来的放松与创意灵感。',
    gradient: 'linear-gradient(135deg, #f43f5e, #fb923c)',
    iconPath: '/assets/interests/music.png',
  },
  {
    name: '阅读',
    desc: '热爱阅读技术、科幻、轻小说类书籍与漫画。',
    gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    iconPath: '/assets/interests/reading.png',
  },
  {
    name: '游戏',
    desc: '偶尔享受游戏，喜欢各种战争与机甲题材射击类或多人合作游戏。',
    gradient: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
    iconPath: '/assets/interests/gaming.png',
  },
  {
    name: '摄影',
    desc: '喜欢拍摄二次元场照与正片，与生活中有趣的瞬间和风景。',
    gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
    iconPath: '/assets/interests/photography.png',
  },
  {
    name: '运动',
    desc: '保持规律运动习惯，享受健康生活方式。',
    gradient: 'linear-gradient(135deg, #f97316, #ef4444)',
    iconPath: '/assets/interests/sports.png',
  },
  {
    name: '手工',
    desc: '热爱手工制作，尝试用材料创造和实现想法。',
    gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    iconPath: '/assets/interests/crafts.png',
  },
  {
    name: '硬件',
    desc: '喜欢电子设备，享受科技带来的便利。',
    gradient: 'linear-gradient(135deg, #f43f5e, #f43f5e)',
    iconPath: '/assets/interests/hardware.png',
}
]
</script>

<style scoped>
.interests__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.interests__card {
  padding: 22px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  cursor: default;
}

.interests__icon {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.interests__card:hover .interests__icon {
  transform: scale(1.1) rotate(-3deg);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.20);
}

.interests__icon-img {
  width: 24px;
  height: 24px;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.interests__body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.interests__name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.3;
}

.interests__desc {
  font-size: 0.82rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-top: 4px;
}

/* Responsive */
@media (max-width: 1024px) {
  .interests__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .interests__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .interests__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}
</style>
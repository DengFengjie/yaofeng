<template>
  <section id="skills" class="section">
    <div class="reveal">
      <h2 class="section-title">能力特长</h2>
      <div class="section-title-underline" />
    </div>

    <div class="skills__layout">
      <!-- Skill categories -->
      <div
        v-for="(category, ci) in skillCategories"
        :key="category.name"
        class="glass-card skills__category reveal"
        :class="`reveal-delay-${ci + 1}`"
      >
        <div class="skills__category-header">
          <div class="skills__category-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" v-html="category.iconPath" />
          </div>
          <div>
            <h3 class="skills__category-name">{{ category.name }}</h3>
          </div>
        </div>

        <div class="skills__list">
          <div
            v-for="skill in category.skills"
            :key="skill.name"
            class="skills__item"
          >
            <div class="skills__item-header">
              <span class="skills__item-name">{{ skill.name }}</span>
              <span class="skills__item-level">{{ skill.levelLabel }}</span>
            </div>
            <div class="skills__bar-track">
              <div
                class="skills__bar-fill"
                :style="{ width: skill.animated ? skill.level + '%' : '0%' }"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Tech tags cloud -->
      <div class="glass-card skills__tags-card reveal reveal-delay-4">
        <div class="skills__category-header">
          <div class="skills__category-icon skills__category-icon--alt">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>
          </div>
          <div>
            <h3 class="skills__category-name">技术栈</h3>
          </div>
        </div>
        <div class="skills__tags">
          <span v-for="tech in techTags" :key="tech" class="tag">{{ tech }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Skill {
  name: string
  level: number
  levelLabel: string
  animated: boolean
}

interface SkillCategory {
  name: string
  iconPath: string
  skills: Skill[]
}

// 【替换为你的真实技能】
const skillCategories = ref<SkillCategory[]>([
  {
    name: '编程语言',
    iconPath: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    skills: [
      { name: 'Python',     level: 60, levelLabel: '了解', animated: false },
      { name: 'Java',       level: 60, levelLabel: '了解', animated: false },
      { name: 'JavaScript', level: 60, levelLabel: '了解', animated: false },
      { name: 'TypeScript', level: 60, levelLabel: '了解', animated: false },
    ],
  },
  {
    name: '前端开发',
    iconPath: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    skills: [
      { name: 'Vue 3',       level: 60, levelLabel: '了解', animated: false },
      { name: 'Vite',        level: 60, levelLabel: '了解', animated: false },
      { name: 'Node.js',     level: 60, levelLabel: '了解', animated: false },
      { name: 'CSS',         level: 60, levelLabel: '了解', animated: false },

    ],
  },
  {
    name: '后端开发',
    iconPath: '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>',
    skills: [
      { name: 'Express',      level: 60, levelLabel: '了解', animated: false },
      { name: 'Python Flask', level: 60, levelLabel: '了解', animated: false },
      { name: 'MySQL',        level: 60, levelLabel: '了解', animated: false },
      { name: 'Docker',       level: 60, levelLabel: '了解', animated: false },
    ],
  },
])

// 【替换为你的技术栈标签】
const techTags = [
  'Git', 'Linux', 'VS Code', 'Postman', 'MongoDB', 'Redis', 'Nginx', 'GitHub Actions', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'Vite', 'Pinia', 'WebSocket', 'JWT', 'Docker', 'Flask',
]

// Animate skill bars on mount
onMounted(() => {
  setTimeout(() => {
    skillCategories.value.forEach(cat => {
      cat.skills.forEach(skill => {
        skill.animated = true
      })
    })
  }, 300)
})
</script>

<style scoped>
.skills__layout {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-items: start;
}

/* The tech tags card spans full width at bottom - handled by grid-column */
.skills__tags-card {
  grid-column: 1 / -1;
}

/* Category card */
.skills__category {
  padding: var(--card-padding);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.skills__category-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.skills__category-icon {
  width: 42px;
  height: 42px;
  border-radius: var(--radius-sm);
  background: var(--accent-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.skills__category-icon--alt {
  background: linear-gradient(135deg, #06b6d4, #3b82f6);
}

.skills__category-icon svg {
  width: 20px;
  height: 20px;
  stroke: #fff;
}

.skills__category-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.3;
}

/* Skill items */
.skills__list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.skills__item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.skills__item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skills__item-name {
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--text-primary);
}

.skills__item-level {
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--text-accent);
  background: var(--tag-bg);
  padding: 2px 8px;
  border-radius: var(--radius-full);
  border: 1px solid var(--tag-border);
}

/* Skill bar */
.skills__bar-track {
  height: 6px;
  background: var(--skill-bar-bg);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.skills__bar-fill {
  height: 100%;
  background: var(--accent-gradient);
  border-radius: var(--radius-full);
  transition: width 1.2s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
}

.skills__bar-fill::after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(91, 110, 245, 0.6);
  opacity: 0;
  transition: opacity 0.3s ease 1s;
}

.skills__bar-fill[style*="width: 0%"]::after {
  opacity: 0;
}

/* Tech tags */
.skills__tags-card {
  padding: var(--card-padding);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.skills__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* Responsive */
@media (max-width: 900px) {
  .skills__layout {
    grid-template-columns: 1fr 1fr;
  }
  .skills__tags-card {
    grid-column: 1 / -1;
  }
}

@media (max-width: 600px) {
  .skills__layout {
    grid-template-columns: 1fr;
  }
}
</style>

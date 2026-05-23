<template>
  <section id="hero" class="hero">
    <div class="hero__content">
      <!-- Avatar -->
      <div class="hero__avatar-wrap reveal">
        <div class="hero__avatar-ring">
          <img
            src="/assets/avatar.jpg"
            alt="头像 Avatar"
            class="hero__avatar"
            @error="onAvatarError"
          />
          <!-- Fallback initials -->
          <div v-if="avatarError" class="hero__avatar-fallback">
            <span>YF</span>
          </div>
        </div>
        <!-- Status badge -->
        <div class="hero__status">
          <span class="hero__status-dot" />
          <span>{{ statusText }}</span>
        </div>
      </div>

      <!-- Text content -->
      <div class="hero__text">
        <div class="reveal reveal-delay-1">
          <p class="hero__greeting">你好，这边cn</p>
          <h1 class="hero__name">
            <!-- 【替换为你的名字】 -->
            <span class="hero__name-zh">鹞枫</span>
          </h1>
        </div>

        <div class="reveal reveal-delay-2">
          <div class="hero__roles">
            <span
              v-for="role in roles"
              :key="role"
              class="hero__role-tag"
            >{{ role }}</span>
          </div>
        </div>

        <div class="reveal reveal-delay-3">
          <p class="hero__bio">
            <!-- 【替换为你的一句话介绍】 -->
            热爱技术与创造，尝试将想法变为现实。
          </p>
        </div>

        <div class="hero__actions reveal reveal-delay-4">
          <a href="#about" class="hero__btn hero__btn--primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
            了解更多
          </a>
          <a href="#platforms" class="hero__btn hero__btn--secondary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            我的项目
          </a>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="hero__scroll-hint">
      <div class="hero__scroll-mouse">
        <div class="hero__scroll-wheel" />
      </div>
      <span>向下滚动</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const avatarError = ref(false)

function onAvatarError() {
  avatarError.value = true
}

// 【可替换为你的身份标签】
const roles = [
  '代码开发者',
  '摄影爱好者',
  '终身学习者',
]

// 【可替换为你的状态文字】
const statusText = '目前存活'
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 24px 80px;
  position: relative;
}

.hero__content {
  max-width: 1100px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 64px;
}

/* Avatar */
.hero__avatar-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.hero__avatar-ring {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  padding: 4px;
  background: var(--accent-gradient);
  box-shadow: 0 0 0 1px var(--glass-border), 0 16px 48px rgba(91, 110, 245, 0.30);
  transition: box-shadow var(--transition-normal), transform var(--transition-normal);
}

.hero__avatar-ring:hover {
  transform: scale(1.03);
  box-shadow: 0 0 0 1px var(--accent-primary), 0 20px 60px rgba(91, 110, 245, 0.45);
}

.hero__avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid transparent;
  background: var(--glass-bg);
  display: block;
}

.hero__avatar-fallback {
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  background: var(--accent-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.05em;
}

.hero__status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  font-size: 0.78rem;
  color: var(--text-secondary);
  white-space: nowrap;
}

.hero__status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.25);
  animation: pulse-dot 2s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.25); }
  50%       { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.10); }
}

/* Text */
.hero__text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.hero__greeting {
  font-size: 1rem;
  font-weight: 400;
  color: var(--text-secondary);
  margin-bottom: 4px;
  letter-spacing: 0.03em;
}

.hero__name {
  line-height: 1.1;
}

.hero__name-zh {
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.hero__roles {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.hero__role-tag {
  padding: 5px 14px;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}

.hero__role-tag:hover {
  background: var(--accent-gradient-soft);
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

.hero__bio {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--text-secondary);
  max-width: 500px;
}

/* Action buttons */
.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 8px;
}

.hero__btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-weight: 600;
  transition: all var(--transition-normal);
  letter-spacing: 0.02em;
}

.hero__btn svg {
  width: 16px;
  height: 16px;
}

.hero__btn--primary {
  background: var(--accent-gradient);
  color: #fff;
  box-shadow: 0 4px 20px rgba(91, 110, 245, 0.35);
}

.hero__btn--primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 32px rgba(91, 110, 245, 0.50);
  filter: brightness(1.05);
}

.hero__btn--secondary {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  color: var(--text-primary);
}

.hero__btn--secondary:hover {
  background: var(--glass-bg-hover);
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  transform: translateY(-3px);
}

/* Scroll hint */
.hero__scroll-hint {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  animation: fade-in-up 1.5s ease 1.5s both;
}

.hero__scroll-mouse {
  width: 22px;
  height: 36px;
  border: 2px solid var(--text-muted);
  border-radius: 11px;
  display: flex;
  justify-content: center;
  padding-top: 6px;
}

.hero__scroll-wheel {
  width: 3px;
  height: 8px;
  background: var(--text-muted);
  border-radius: 2px;
  animation: scroll-wheel 2s ease-in-out infinite;
}

@keyframes scroll-wheel {
  0%   { transform: translateY(0); opacity: 1; }
  80%  { transform: translateY(10px); opacity: 0; }
  81%  { transform: translateY(0); opacity: 0; }
  100% { opacity: 1; }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateX(-50%) translateY(10px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}

/* Responsive */
@media (max-width: 768px) {
  .hero__content {
    flex-direction: column;
    gap: 32px;
    text-align: center;
  }

  .hero__avatar-ring {
    width: 160px;
    height: 160px;
  }

  .hero__bio {
    max-width: 100%;
  }

  .hero__roles {
    justify-content: center;
  }

  .hero__actions {
    justify-content: center;
  }

  .hero__name-zh {
    font-size: 2.2rem;
  }
}
</style>

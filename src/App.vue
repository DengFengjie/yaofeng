<template>
  <!-- ================================================
       Two-layer crossfade wallpaper system
       Layer A and B alternate: one fades in while
       the other fades out, creating a smooth transition.
       ================================================ -->
  <div
    class="wallpaper-layer"
    :style="{ backgroundImage: `url(${layerA})`, opacity: activeLayer === 'a' ? 1 : 0 }"
  />
  <div
    class="wallpaper-layer"
    :style="{ backgroundImage: `url(${layerB})`, opacity: activeLayer === 'b' ? 1 : 0 }"
  />

  <!-- Colour overlay tint -->
  <div class="wallpaper-overlay-div" />

  <!-- Floating ambient orbs -->
  <div class="bg-orb bg-orb-1" />
  <div class="bg-orb bg-orb-2" />
  <div class="bg-orb bg-orb-3" />

  <!-- Navigation -->
  <NavBar />

  <!-- Main Content -->
  <main>
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <InterestsSection />
    <DevPlatformsSection />
    <SocialSection />
    <FooterSection />
  </main>

  <!-- Wallpaper indicator: dots + prev/next arrows -->
  <div v-if="totalCount > 1" class="wallpaper-indicator">
    <button class="wallpaper-arrow" @click="prevWallpaper" aria-label="上一张壁纸">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <polyline points="10,3 5,8 10,13" />
      </svg>
    </button>

    <button
      v-for="(_, i) in Array(totalCount)"
      :key="i"
      class="wallpaper-dot"
      :class="{ active: currentIndex === i }"
      @click="setWallpaperIndex(i)"
      :aria-label="`壁纸 ${i + 1}`"
    />

    <button class="wallpaper-arrow" @click="nextWallpaper" aria-label="下一张壁纸">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <polyline points="6,3 11,8 6,13" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import NavBar from '@/components/NavBar.vue'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import InterestsSection from '@/components/InterestsSection.vue'
import DevPlatformsSection from '@/components/DevPlatformsSection.vue'
import SocialSection from '@/components/SocialSection.vue'
import FooterSection from '@/components/FooterSection.vue'
import { useTheme } from '@/composables/useTheme'
import { useWallpaper } from '@/composables/useWallpaper'

// Initialize theme system
useTheme()

// =====================================================
// Wallpaper crossfade logic
// =====================================================
const {
  currentWallpaper,
  currentIndex,
  totalCount,
  nextWallpaper,
  prevWallpaper,
  setWallpaperIndex,
  init: initWallpaper,
} = useWallpaper()

// Two canvas layers; we alternate which is "on top"
const layerA = ref<string>('')
const layerB = ref<string>('')
const activeLayer = ref<'a' | 'b'>('a')

/**
 * Swap wallpaper: preload new image into the inactive layer,
 * then cross-fade by toggling activeLayer.
 */
async function applyWallpaper(url: string) {
  if (activeLayer.value === 'a') {
    // Put next wallpaper on layer B (currently hidden), then reveal B
    layerB.value = url
    await nextTick()
    activeLayer.value = 'b'
  } else {
    // Put next wallpaper on layer A (currently hidden), then reveal A
    layerA.value = url
    await nextTick()
    activeLayer.value = 'a'
  }
}

// React to wallpaper changes (both rotation and theme switch)
watch(currentWallpaper, (newUrl) => {
  applyWallpaper(newUrl)
})

// =====================================================
// Scroll Reveal — Intersection Observer
// =====================================================
let revealObserver: IntersectionObserver | null = null

function initRevealObserver() {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          revealObserver?.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  )
  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver?.observe(el)
  })
}

onMounted(() => {
  // Initialize wallpaper (random start + auto-rotate timer)
  initWallpaper()

  // Set both layers to the initial wallpaper so there's no flash
  const initial = currentWallpaper.value
  layerA.value = initial
  layerB.value = initial
  activeLayer.value = 'a'

  // Scroll reveal
  setTimeout(initRevealObserver, 100)
})

onUnmounted(() => {
  revealObserver?.disconnect()
})
</script>

<style>
#app {
  min-height: 100vh;
}

main {
  padding-top: 0;
}

section {
  scroll-margin-top: 80px;
}

/* Arrow buttons flanking the indicator dots */
.wallpaper-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: var(--text-muted);
  border-radius: 50%;
  transition: color var(--transition-fast), background var(--transition-fast);
  flex-shrink: 0;
}

.wallpaper-arrow svg {
  width: 14px;
  height: 14px;
}

.wallpaper-arrow:hover {
  color: var(--accent-primary);
  background: rgba(91, 110, 245, 0.1);
}
</style>

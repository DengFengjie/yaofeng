import { ref, watch, computed } from 'vue'
import { useTheme } from './useTheme'

// =====================================================
// 【自定义壁纸列表】
// 将图片放入对应文件夹后，在此处添加文件名即可
// =====================================================
const LIGHT_WALLPAPERS: string[] = [
  '/assets/wallpapers/light/1.png',
  '/assets/wallpapers/light/2.png',
  '/assets/wallpapers/light/3.png',
  '/assets/wallpapers/light/4.png',
  '/assets/wallpapers/light/5.png',
]

const DARK_WALLPAPERS: string[] = [
  '/assets/wallpapers/dark/1.png',
  '/assets/wallpapers/dark/2.png',
  '/assets/wallpapers/dark/3.png',
  '/assets/wallpapers/dark/4.png',
  '/assets/wallpapers/dark/5.png',
]

// =====================================================
// Rotation config
// =====================================================
/** 自动轮换间隔（毫秒），设为 0 禁用自动轮换 */
const AUTO_ROTATE_INTERVAL = 30_000 // 30 seconds, set 0 to disable

// Shared state (singleton)
const lightIndex = ref(0)
const darkIndex = ref(0)
const isTransitioning = ref(false)

let rotateTimer: ReturnType<typeof setInterval> | null = null

function randomIndex(max: number): number {
  return Math.floor(Math.random() * max)
}

function getList(theme: 'light' | 'dark'): string[] {
  return theme === 'light' ? LIGHT_WALLPAPERS : DARK_WALLPAPERS
}

export function useWallpaper() {
  const { resolvedTheme } = useTheme()

  const currentWallpaper = computed(() => {
    const list = getList(resolvedTheme.value)
    const idx = resolvedTheme.value === 'light' ? lightIndex.value : darkIndex.value
    return list[idx] ?? list[0]
  })

  /** Advance to next wallpaper with fade transition */
  function nextWallpaper() {
    if (isTransitioning.value) return
    isTransitioning.value = true

    const list = getList(resolvedTheme.value)
    if (list.length <= 1) {
      isTransitioning.value = false
      return
    }

    if (resolvedTheme.value === 'light') {
      lightIndex.value = (lightIndex.value + 1) % list.length
    } else {
      darkIndex.value = (darkIndex.value + 1) % list.length
    }

    // Allow CSS transition to complete before allowing next switch
    setTimeout(() => { isTransitioning.value = false }, 800)
  }

  /** Go to previous wallpaper */
  function prevWallpaper() {
    if (isTransitioning.value) return
    isTransitioning.value = true

    const list = getList(resolvedTheme.value)
    if (list.length <= 1) {
      isTransitioning.value = false
      return
    }

    if (resolvedTheme.value === 'light') {
      lightIndex.value = (lightIndex.value - 1 + list.length) % list.length
    } else {
      darkIndex.value = (darkIndex.value - 1 + list.length) % list.length
    }

    setTimeout(() => { isTransitioning.value = false }, 800)
  }

  /** Jump to a specific wallpaper by index */
  function setWallpaperIndex(index: number) {
    const list = getList(resolvedTheme.value)
    const clampedIdx = Math.max(0, Math.min(index, list.length - 1))
    if (resolvedTheme.value === 'light') {
      lightIndex.value = clampedIdx
    } else {
      darkIndex.value = clampedIdx
    }
  }

  const currentIndex = computed(() =>
    resolvedTheme.value === 'light' ? lightIndex.value : darkIndex.value
  )

  const totalCount = computed(() => getList(resolvedTheme.value).length)

  /** Initialize: pick a random starting wallpaper for each theme */
  function init() {
    if (LIGHT_WALLPAPERS.length > 1) {
      lightIndex.value = randomIndex(LIGHT_WALLPAPERS.length)
    }
    if (DARK_WALLPAPERS.length > 1) {
      darkIndex.value = randomIndex(DARK_WALLPAPERS.length)
    }

    // Start auto-rotate timer
    if (AUTO_ROTATE_INTERVAL > 0) {
      startAutoRotate()
    }
  }

  function startAutoRotate() {
    if (rotateTimer) clearInterval(rotateTimer)
    rotateTimer = setInterval(() => {
      nextWallpaper()
    }, AUTO_ROTATE_INTERVAL)
  }

  function stopAutoRotate() {
    if (rotateTimer) {
      clearInterval(rotateTimer)
      rotateTimer = null
    }
  }

  // Reset timer when theme changes so we don't immediately switch
  watch(resolvedTheme, () => {
    if (AUTO_ROTATE_INTERVAL > 0) {
      startAutoRotate()
    }
  })

  return {
    currentWallpaper,
    currentIndex,
    totalCount,
    isTransitioning,
    nextWallpaper,
    prevWallpaper,
    setWallpaperIndex,
    init,
    startAutoRotate,
    stopAutoRotate,
    /** Exported lists for reference */
    LIGHT_WALLPAPERS,
    DARK_WALLPAPERS,
  }
}

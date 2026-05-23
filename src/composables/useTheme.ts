import { ref, watch, onMounted } from 'vue'

export type Theme = 'light' | 'dark' | 'auto'

const STORAGE_KEY = 'profile-theme'

// Shared reactive state (singleton)
const currentTheme = ref<Theme>('auto')
const resolvedTheme = ref<'light' | 'dark'>('light')

function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  const html = document.documentElement
  if (theme === 'auto') {
    html.removeAttribute('data-theme')
    resolvedTheme.value = getSystemTheme()
  } else {
    html.setAttribute('data-theme', theme)
    resolvedTheme.value = theme
  }
}

export function useTheme() {
  onMounted(() => {
    // Load stored theme preference
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (stored && ['light', 'dark', 'auto'].includes(stored)) {
      currentTheme.value = stored
    } else {
      currentTheme.value = 'auto'
    }
    applyTheme(currentTheme.value)

    // Listen for system theme changes
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', () => {
      if (currentTheme.value === 'auto') {
        resolvedTheme.value = getSystemTheme()
      }
    })
  })

  watch(currentTheme, (newTheme) => {
    applyTheme(newTheme)
    localStorage.setItem(STORAGE_KEY, newTheme)
  })

  function toggleTheme() {
    // Cycle: auto → light → dark → auto
    if (currentTheme.value === 'auto') {
      currentTheme.value = resolvedTheme.value === 'dark' ? 'light' : 'dark'
    } else if (currentTheme.value === 'light') {
      currentTheme.value = 'dark'
    } else {
      currentTheme.value = 'auto'
    }
  }

  function setTheme(theme: Theme) {
    currentTheme.value = theme
  }

  return {
    currentTheme,
    resolvedTheme,
    toggleTheme,
    setTheme,
  }
}

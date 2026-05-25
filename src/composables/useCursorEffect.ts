/**
 * Enhanced cursor-follow particle effect.
 * - More particle types: orb, sparkle, ring, star, heart
 * - Larger and longer-lasting trail
 * - Rich rainbow / pastel colour palette
 * - Click burst effect
 */

type ParticleType = 'orb' | 'sparkle' | 'ring' | 'star'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  hue: number
  saturation: number
  lightness: number
  type: ParticleType
}

interface CursorState {
  x: number
  y: number
  prevX: number
  prevY: number
  speed: number
}

export function useCursorEffect() {
  let canvas: HTMLCanvasElement | null = null
  let ctx: CanvasRenderingContext2D | null = null
  let rafId = 0
  let particles: Particle[] = []
  let cursor: CursorState = { x: -999, y: -999, prevX: -999, prevY: -999, speed: 0 }

  // ── Theme-distinct colour palette ──
  // Dark mode → vibrant, neon-like hues (high sat & light)
  // Light mode → soft, pastel hues (medium sat & light)
  function getThemeColors(): { hue: number; sat: number; light: number } {
    const html = document.documentElement
    const isDark = html.getAttribute('data-theme') === 'dark' ||
      (!html.getAttribute('data-theme') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)

    if (isDark) {
      // 3 vibrant / neon colours
      const pools = [
        { hue: 260 + Math.random() * 60, sat: 85 + Math.random() * 15, light: 65 + Math.random() * 25 }, // purple-magenta
        { hue: 180 + Math.random() * 50, sat: 80 + Math.random() * 20, light: 55 + Math.random() * 25 }, // cyan-teal
        { hue: 340 + Math.random() * 50, sat: 85 + Math.random() * 15, light: 60 + Math.random() * 25 }, // pink-red
      ]
      return pools[Math.floor(Math.random() * pools.length)]
    } else {
      // 3 soft pastel colours
      const pools = [
        { hue: 220 + Math.random() * 60, sat: 40 + Math.random() * 25, light: 60 + Math.random() * 25 }, // lavender-blue
        { hue: 330 + Math.random() * 40, sat: 40 + Math.random() * 25, light: 60 + Math.random() * 25 }, // rose
        { hue: 30 + Math.random() * 40, sat: 40 + Math.random() * 25, light: 60 + Math.random() * 25 },  // peach-gold
      ]
      return pools[Math.floor(Math.random() * pools.length)]
    }
  }

  function spawnParticles(x: number, y: number, count: number) {
    const colors = getThemeColors()
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 0.3 + Math.random() * 1.5  // wider speed range
      const life = 50 + Math.random() * 80      // longer life: max ~130 frames
      const size = 2 + Math.random() * 5         // larger size: 2-7px

      // Random type selection — orb ~20%, sparkle ~30%, ring ~25%, star ~25%
      const roll = Math.random()
      let type: ParticleType
      if (roll < 0.20) type = 'orb'
      else if (roll < 0.50) type = 'sparkle'
      else if (roll < 0.75) type = 'ring'
      else type = 'star'

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life,
        maxLife: life,
        size,
        hue: colors.hue + (Math.random() - 0.5) * 30,
        saturation: colors.sat,
        lightness: colors.light,
        type,
      })
    }
  }

  /** Burst of particles on click — longer duration */
  function spawnClickBurst(x: number, y: number) {
    const count = 25 + Math.floor(Math.random() * 20) // 25-44 particles
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4
      const speed = 1 + Math.random() * 2.5
      const life = 60 + Math.random() * 70     // longer: 60-130 frames
      const colors = getThemeColors()

      // Click burst: mostly stars and sparkles, fewer orbs
      const roll = Math.random()
      let type: ParticleType
      if (roll < 0.45) type = 'star'
      else if (roll < 0.75) type = 'sparkle'
      else if (roll < 0.90) type = 'ring'
      else type = 'orb'

      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life,
        maxLife: life,
        size: 2.5 + Math.random() * 6,
        hue: colors.hue + (Math.random() - 0.5) * 60,
        saturation: colors.sat,
        lightness: colors.light + 15,
        type,
      })
    }
  }

  function drawParticle(p: Particle) {
    if (!ctx) return
    const progress = p.life / p.maxLife
    const alpha = progress * progress // fade out quadratically
    const scale = 0.2 + 0.8 * progress

    ctx.save()
    ctx.globalAlpha = alpha * 0.8
    ctx.translate(p.x, p.y)
    ctx.scale(scale, scale)

    const color = `hsl(${p.hue}, ${p.saturation}%, ${p.lightness}%)`
    const brightColor = `hsl(${p.hue}, ${p.saturation}%, ${Math.min(p.lightness + 20, 100)}%)`

    if (p.type === 'sparkle') {
      // 4-point star
      const s = p.size * 0.7
      ctx.fillStyle = brightColor
      ctx.beginPath()
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 - Math.PI / 2
        ctx.lineTo(Math.cos(a) * s, Math.sin(a) * s)
        const a2 = a + Math.PI / 4
        ctx.lineTo(Math.cos(a2) * s * 0.3, Math.sin(a2) * s * 0.3)
      }
      ctx.closePath()
      ctx.fill()
      // White core
      ctx.fillStyle = 'rgba(255,255,255,0.85)'
      ctx.beginPath()
      ctx.arc(0, 0, s * 0.12, 0, Math.PI * 2)
      ctx.fill()
    } else if (p.type === 'ring') {
      // Expanding hollow ring
      ctx.strokeStyle = color
      ctx.lineWidth = Math.max(0.6, p.size * 0.3)
      ctx.globalAlpha = alpha * 0.55
      ctx.beginPath()
      ctx.arc(0, 0, p.size * 1.4 * (1 - progress * 0.4), 0, Math.PI * 2)
      ctx.stroke()
    } else if (p.type === 'star') {
      // 5-point star
      const s = p.size * 0.6
      ctx.fillStyle = brightColor
      ctx.beginPath()
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2
        ctx.lineTo(Math.cos(a) * s, Math.sin(a) * s)
        const a2 = a + Math.PI / 5
        ctx.lineTo(Math.cos(a2) * s * 0.4, Math.sin(a2) * s * 0.4)
      }
      ctx.closePath()
      ctx.fill()
      // Glow
      ctx.fillStyle = 'rgba(255,255,255,0.5)'
      ctx.beginPath()
      ctx.arc(0, 0, s * 0.15, 0, Math.PI * 2)
      ctx.fill()
    } else {
      // Glowing orb
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 1.8)
      gradient.addColorStop(0, 'rgba(255,255,255,0.95)')
      gradient.addColorStop(0.25, brightColor)
      gradient.addColorStop(0.55, color)
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(0, 0, p.size * 1.8, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.restore()
  }

  function tick() {
    if (!ctx || !canvas) return

    // Full clear — never leaves artifacts
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Spawn new particles based on movement
    const dx = cursor.x - cursor.prevX
    const dy = cursor.y - cursor.prevY
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist > 2 && cursor.x > 0 && cursor.y > 0) {
      cursor.speed = Math.min(dist * 0.12, 7)
      // More particles on faster movement
      const count = Math.min(Math.floor(dist * 0.35) + 1, 8)
      spawnParticles(cursor.x, cursor.y, count)
    } else {
      cursor.speed *= 0.92
    }

    cursor.prevX = cursor.x
    cursor.prevY = cursor.y

    // Update & draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]
      p.x += p.vx
      p.y += p.vy
      p.vx *= 0.97
      p.vy *= 0.97
      p.life -= 1

      if (p.life <= 0) {
        particles.splice(i, 1)
        continue
      }

      drawParticle(p)
    }

    // Cap particles — higher limit for richer effect
    if (particles.length > 500) {
      particles.splice(0, particles.length - 500)
    }

    rafId = requestAnimationFrame(tick)
  }

  function onPointerMove(e: PointerEvent) {
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    cursor.x = e.clientX - rect.left
    cursor.y = e.clientY - rect.top
  }

  function onPointerDown(e: PointerEvent) {
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    spawnClickBurst(x, y)
  }

  function onPointerLeave() {
    cursor.x = -999
    cursor.y = -999
    cursor.prevX = -999
    cursor.prevY = -999
  }

  function resize() {
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  function init() {
    if (canvas) return

    canvas = document.createElement('canvas')
    canvas.id = 'cursor-effect-canvas'
    canvas.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 9999;
      pointer-events: none;
      touch-action: none;
    `
    document.body.appendChild(canvas)
    ctx = canvas.getContext('2d')!

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerleave', onPointerLeave)

    tick()
  }

  function destroy() {
    cancelAnimationFrame(rafId)
    window.removeEventListener('resize', resize)
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerdown', onPointerDown)
    window.removeEventListener('pointerleave', onPointerLeave)
    if (canvas) {
      canvas.remove()
      canvas = null
      ctx = null
    }
    particles = []
  }

  return { init, destroy }
}

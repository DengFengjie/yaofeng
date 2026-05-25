/**
 * Custom cursor + cursor-follow particle effect.
 * - Draws a themed cursor cursor: dark→neon crosshair, light→sparkle star
 * - Hides the system cursor globally
 * - Particle trail types: orb, sparkle, ring, star
 * - Click burst
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
  frame: number
}

function getIsDark(): boolean {
  const html = document.documentElement
  return html.getAttribute('data-theme') === 'dark' ||
    (!html.getAttribute('data-theme') &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
}

export function useCursorEffect() {
  let canvas: HTMLCanvasElement | null = null
  let ctx: CanvasRenderingContext2D | null = null
  let rafId = 0
  let particles: Particle[] = []
  let cursor: CursorState = { x: -999, y: -999, prevX: -999, prevY: -999, speed: 0, frame: 0 }
  let cursorStyleEl: HTMLStyleElement | null = null

  // ── Theme-distinct colour palette ──
  function getThemeColors(): { hue: number; sat: number; light: number } {
    const isDark = getIsDark()
    if (isDark) {
      const pools = [
        { hue: 260 + Math.random() * 60, sat: 85 + Math.random() * 15, light: 65 + Math.random() * 25 },
        { hue: 180 + Math.random() * 50, sat: 80 + Math.random() * 20, light: 55 + Math.random() * 25 },
        { hue: 340 + Math.random() * 50, sat: 85 + Math.random() * 15, light: 60 + Math.random() * 25 },
      ]
      return pools[Math.floor(Math.random() * pools.length)]
    } else {
      const pools = [
        { hue: 220 + Math.random() * 60, sat: 40 + Math.random() * 25, light: 60 + Math.random() * 25 },
        { hue: 330 + Math.random() * 40, sat: 40 + Math.random() * 25, light: 60 + Math.random() * 25 },
        { hue: 30 + Math.random() * 40, sat: 40 + Math.random() * 25, light: 60 + Math.random() * 25 },
      ]
      return pools[Math.floor(Math.random() * pools.length)]
    }
  }

  /** Draw the custom cursor at (x, y) */
  function drawCursor(x: number, y: number) {
    const c = ctx
    if (!c) return
    const isDark = getIsDark()

    c.save()
    c.translate(x, y)

    if (isDark) {
      // ── Dark mode: Cyan square + corner dots + white core ──
      const pulse = 1 + Math.sin(cursor.frame * 0.05) * 0.12
      const side = 20 * pulse
      const half = side / 2

      // Outer glow halo
      const halo = c.createRadialGradient(0, 0, 0, 0, 0, side * 1.4)
      halo.addColorStop(0, 'rgba(0,255,255,0.18)')
      halo.addColorStop(0.5, 'rgba(0,180,255,0.08)')
      halo.addColorStop(1, 'transparent')
      c.fillStyle = halo
      c.beginPath()
      c.arc(0, 0, side * 1.4, 0, Math.PI * 2)
      c.fill()

      // Outer square
      c.shadowColor = 'rgba(0,255,255,0.9)'
      c.shadowBlur = 15
      c.strokeStyle = 'rgba(0,240,255,0.95)'
      c.lineWidth = 2.5
      c.strokeRect(-half, -half, side, side)

      // Inner square
      const insetHalf = half * 0.65
      c.shadowColor = 'rgba(0,200,255,0.6)'
      c.shadowBlur = 15
      c.strokeStyle = 'rgba(0,220,255,0.5)'
      c.lineWidth = 1.2
      c.strokeRect(-insetHalf, -insetHalf, insetHalf * 2, insetHalf * 2)

      // Corner dots
      c.shadowBlur = 0
      c.shadowColor = 'rgba(0,255,255,0.9)'
      c.shadowBlur = 10
      c.fillStyle = '#fff'
      const cornerOff = half
      for (const [sx, sy] of [[-1,-1],[1,-1],[1,1],[-1,1]]) {
        c.beginPath()
        c.arc(sx * cornerOff, sy * cornerOff, 2.5, 0, Math.PI * 2)
        c.fill()
      }

      // Core glow dot
      c.shadowBlur = 0
      const coreR = 6
      const core = c.createRadialGradient(0, 0, 0, 0, 0, coreR)
      core.addColorStop(0, '#fff')
      core.addColorStop(0.3, 'rgba(200,255,255,0.95)')
      core.addColorStop(0.5, 'rgba(0,220,255,0.7)')
      core.addColorStop(1, 'transparent')
      c.fillStyle = core
      c.beginPath()
      c.arc(0, 0, coreR, 0, Math.PI * 2)
      c.fill()

      // Bright white center pin
      c.fillStyle = '#fff'
      c.shadowColor = 'rgba(255,255,255,0.9)'
      c.shadowBlur = 8
      c.beginPath()
      c.arc(0, 0, 2.5, 0, Math.PI * 2)
      c.fill()
    } else {
      // ── Light mode: Vibrant coral/pink star ──
      const pulse = 1 + Math.sin(cursor.frame * 0.06) * 0.12
      const s = 12 * pulse
      const coreR = 5

      // Outer glow
      const glow = c.createRadialGradient(0, 0, 0, 0, 0, s * 3)
      glow.addColorStop(0, 'rgba(255,80,120,0.20)')
      glow.addColorStop(0.5, 'rgba(255,80,120,0.08)')
      glow.addColorStop(1, 'transparent')
      c.fillStyle = glow
      c.beginPath()
      c.arc(0, 0, s * 3, 0, Math.PI * 2)
      c.fill()

      // 4-point sparkle
      c.shadowColor = 'rgba(255,60,100,0.7)'
      c.shadowBlur = 15
      c.fillStyle = '#ff4477'
      c.beginPath()
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 - Math.PI / 2
        c.lineTo(Math.cos(a) * s, Math.sin(a) * s)
        const a2 = a + Math.PI / 4
        c.lineTo(Math.cos(a2) * s * 0.25, Math.sin(a2) * s * 0.25)
      }
      c.closePath()
      c.fill()

      // Second sparkle layer — rotated, smaller, paler
      c.shadowBlur = 10
      c.fillStyle = '#ff88aa'
      c.globalAlpha = 0.5
      c.beginPath()
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2
        c.lineTo(Math.cos(a) * s * 0.5, Math.sin(a) * s * 0.5)
        const a2 = a + Math.PI / 4
        c.lineTo(Math.cos(a2) * s * 0.15, Math.sin(a2) * s * 0.15)
      }
      c.closePath()
      c.fill()
      c.globalAlpha = 1

      // White core glow
      c.shadowBlur = 0
      const core = c.createRadialGradient(0, 0, 0, 0, 0, coreR)
      core.addColorStop(0, '#fff')
      core.addColorStop(0.4, 'rgba(255,220,230,0.95)')
      core.addColorStop(1, 'transparent')
      c.fillStyle = core
      c.beginPath()
      c.arc(0, 0, coreR, 0, Math.PI * 2)
      c.fill()

      // Bright white center
      c.fillStyle = '#fff'
      c.shadowColor = 'rgba(255,255,255,0.8)'
      c.shadowBlur = 6
      c.beginPath()
      c.arc(0, 0, 2.5, 0, Math.PI * 2)
      c.fill()
    }

    c.restore()
  }

  function spawnParticles(x: number, y: number, count: number) {
    const colors = getThemeColors()
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 0.3 + Math.random() * 1.5
      const life = 50 + Math.random() * 80
      const size = 2 + Math.random() * 5

      const roll = Math.random()
      let type: ParticleType
      if (roll < 0.20) type = 'orb'
      else if (roll < 0.50) type = 'sparkle'
      else if (roll < 0.75) type = 'ring'
      else type = 'star'

      particles.push({
        x, y,
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

  function spawnClickBurst(x: number, y: number) {
    const count = 25 + Math.floor(Math.random() * 20)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4
      const speed = 1 + Math.random() * 2.5
      const life = 60 + Math.random() * 70
      const colors = getThemeColors()

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
    const alpha = progress * progress
    const scale = 0.2 + 0.8 * progress

    ctx.save()
    ctx.globalAlpha = alpha * 0.8
    ctx.translate(p.x, p.y)
    ctx.scale(scale, scale)

    const color = `hsl(${p.hue}, ${p.saturation}%, ${p.lightness}%)`
    const brightColor = `hsl(${p.hue}, ${p.saturation}%, ${Math.min(p.lightness + 20, 100)}%)`

    if (p.type === 'sparkle') {
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
      ctx.fillStyle = 'rgba(255,255,255,0.85)'
      ctx.beginPath()
      ctx.arc(0, 0, s * 0.12, 0, Math.PI * 2)
      ctx.fill()
    } else if (p.type === 'ring') {
      ctx.strokeStyle = color
      ctx.lineWidth = Math.max(0.6, p.size * 0.3)
      ctx.globalAlpha = alpha * 0.55
      ctx.beginPath()
      ctx.arc(0, 0, p.size * 1.4 * (1 - progress * 0.4), 0, Math.PI * 2)
      ctx.stroke()
    } else if (p.type === 'star') {
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
      ctx.fillStyle = 'rgba(255,255,255,0.5)'
      ctx.beginPath()
      ctx.arc(0, 0, s * 0.15, 0, Math.PI * 2)
      ctx.fill()
    } else {
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

    cursor.frame++
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Spawn new particles based on movement
    const dx = cursor.x - cursor.prevX
    const dy = cursor.y - cursor.prevY
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist > 2 && cursor.x > 0 && cursor.y > 0) {
      cursor.speed = Math.min(dist * 0.12, 7)
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

    // Cap particles
    if (particles.length > 500) {
      particles.splice(0, particles.length - 500)
    }

    // Draw custom cursor on top (always visible)
    if (cursor.x > 0 && cursor.y > 0) {
      drawCursor(cursor.x, cursor.y)
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

  function hideSystemCursor() {
    if (cursorStyleEl) return
    cursorStyleEl = document.createElement('style')
    cursorStyleEl.textContent = 'html, body, * { cursor: none !important; }'
    document.head.appendChild(cursorStyleEl)
  }

  function restoreSystemCursor() {
    if (cursorStyleEl) {
      cursorStyleEl.remove()
      cursorStyleEl = null
    }
  }

  function init() {
    if (canvas) return

    hideSystemCursor()

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
    restoreSystemCursor()
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

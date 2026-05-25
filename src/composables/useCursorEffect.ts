/**
 * A subtle, elegant cursor-follow particle effect.
 * When the pointer moves, a trail of tiny glowing orbs and sparkles
 * fades away behind it.
 */

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
  type: 'orb' | 'sparkle'
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

  // ── Theme-aware colours ──
  function getThemeColors(): { hue: number; sat: number; light: number } {
    const html = document.documentElement
    const isDark = html.getAttribute('data-theme') === 'dark' ||
      (!html.getAttribute('data-theme') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)

    if (isDark) {
      // Purple-pink range
      return { hue: 270 + Math.random() * 40, sat: 80, light: 70 + Math.random() * 20 }
    } else {
      // Teal-cyan range
      return { hue: 170 + Math.random() * 30, sat: 65, light: 50 + Math.random() * 25 }
    }
  }

  function spawnParticles(x: number, y: number, count: number) {
    const colors = getThemeColors()
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 0.3 + Math.random() * 1.2
      const life = 40 + Math.random() * 60
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life,
        maxLife: life,
        size: 1.5 + Math.random() * 3.5,
        hue: colors.hue + (Math.random() - 0.5) * 20,
        saturation: colors.sat,
        lightness: colors.light,
        type: Math.random() > 0.5 ? 'orb' : 'sparkle',
      })
    }
  }

  function drawParticle(p: Particle) {
    if (!ctx) return
    const progress = p.life / p.maxLife
    const alpha = progress * progress // fade out quadratically
    const scale = 0.3 + 0.7 * progress

    ctx.save()
    ctx.globalAlpha = alpha * 0.7
    ctx.translate(p.x, p.y)
    ctx.scale(scale, scale)

    const color = `hsl(${p.hue}, ${p.saturation}%, ${p.lightness}%)`

    if (p.type === 'sparkle') {
      // Draw a 4-point star
      const s = p.size * 0.6
      ctx.fillStyle = color
      ctx.beginPath()
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 - Math.PI / 2
        // outer point
        ctx.lineTo(Math.cos(a) * s, Math.sin(a) * s)
        // inner point
        const a2 = a + Math.PI / 4
        ctx.lineTo(Math.cos(a2) * s * 0.35, Math.sin(a2) * s * 0.35)
      }
      ctx.closePath()
      ctx.fill()
    } else {
      // Glowing orb
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size)
      gradient.addColorStop(0, 'rgba(255,255,255,0.9)')
      gradient.addColorStop(0.3, color)
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(0, 0, p.size, 0, Math.PI * 2)
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

    if (dist > 2) {
      cursor.speed = Math.min(dist * 0.15, 6)
      const count = Math.min(Math.floor(dist * 0.25) + 1, 5)
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
    if (particles.length > 300) {
      particles.splice(0, particles.length - 300)
    }

    rafId = requestAnimationFrame(tick)
  }

  function onPointerMove(e: PointerEvent) {
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    cursor.x = e.clientX - rect.left
    cursor.y = e.clientY - rect.top
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
    if (canvas) return // already initialized

    // Create canvas
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
    window.addEventListener('pointerleave', onPointerLeave)

    tick()
  }

  function destroy() {
    cancelAnimationFrame(rafId)

    window.removeEventListener('resize', resize)
    window.removeEventListener('pointermove', onPointerMove)
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

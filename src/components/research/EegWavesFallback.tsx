import { useEffect, useRef } from 'react'
import {
  CHANNELS,
  CYAN,
  CYAN_CHANNEL,
  FOV,
  GRAPHITE,
  LINE_LENGTH,
  POINTS,
  cameraDistance,
  channelY,
  drift,
  signal,
} from './eegSignal'

/**
 * 'eeg-waves' fallback for no-WebGL / low-tier GPUs: the same 8 channels and
 * motion, projected by hand onto a 2D canvas (same tilt, drift and camera as
 * the WebGL scene). No bloom; the cyan channel is the exact accent.
 */
export default function EegWavesFallback({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    let w = 0
    let h = 0
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    const start = performance.now()
    let raf = 0
    const draw = (now: number) => {
      const t = (now - start) / 1000
      const { rx, ry } = drift(t)
      const cx = Math.cos(rx)
      const sx = Math.sin(rx)
      const cy = Math.cos(ry)
      const sy = Math.sin(ry)
      const focal = h / 2 / Math.tan((FOV * Math.PI) / 360)
      const dist = cameraDistance(w / h)
      ctx.clearRect(0, 0, w, h)
      ctx.lineJoin = 'round'
      // Cyan last so it sits on top.
      const order = [...Array(CHANNELS).keys()].filter((c) => c !== CYAN_CHANNEL).concat(CYAN_CHANNEL)
      for (const ch of order) {
        const y0 = channelY(ch)
        ctx.beginPath()
        for (let i = 0; i < POINTS; i++) {
          const u = i / (POINTS - 1)
          const x = (u - 0.5) * LINE_LENGTH
          const y = y0 + signal(ch, u, t)
          // Euler XYZ (three.js default): rotate about Y, then X; z starts at 0.
          const x1 = x * cy
          const z1 = -x * sy
          const y2 = y * cx - z1 * sx
          const z2 = y * sx + z1 * cx
          const depth = dist - z2
          const px = w / 2 + (x1 / depth) * focal
          const py = h / 2 - (y2 / depth) * focal
          if (i === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
        const cyan = ch === CYAN_CHANNEL
        ctx.strokeStyle = cyan ? CYAN : GRAPHITE
        ctx.lineWidth = cyan ? 2 : 1.25
        ctx.stroke()
      }
      if (active) raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [active])

  return <canvas ref={ref} className="block h-full w-full" />
}

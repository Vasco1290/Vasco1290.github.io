import { Component, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { useInView } from 'framer-motion'
import type { ResearchVisual } from '../../content/site'
import { SCENES } from './scenes'

type Mode = 'webgl' | 'fallback'

// Capture override: ?scene=webgl | ?scene=fallback forces a renderer.
function readOverride(): Mode | null {
  const v = new URLSearchParams(window.location.search).get('scene')
  return v === 'webgl' || v === 'fallback' ? v : null
}

/**
 * WebGL only on tier >= 2 GPUs. detect-gpu reports type 'FALLBACK' (tier 1)
 * when it can't benchmark the GPU (unknown model or the benchmark CDN is
 * unreachable); that's trusted with WebGL on desktop but not on mobile.
 * No WebGL / blocklisted GPUs come back as tier 0.
 */
async function detectMode(): Promise<Mode> {
  try {
    const { getGPUTier } = await import('detect-gpu')
    const gpu = await getGPUTier()
    if (gpu.tier >= 2) return 'webgl'
    if (gpu.type === 'FALLBACK' && !gpu.isMobile) return 'webgl'
    return 'fallback'
  } catch {
    return 'fallback'
  }
}

/** If the WebGL scene throws (context creation, chunk load), switch to the fallback. */
class WebGLBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {
    this.props.onError()
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

/**
 * Hosts the 3D scene picked by a research entry's `visual` key. Mounts only
 * once the stage is near the viewport (lazy-loads three.js then), and pauses
 * rendering whenever it's off-screen.
 */
export default function ResearchVisualStage({ visual }: { visual: ResearchVisual }) {
  const ref = useRef<HTMLDivElement>(null)
  const near = useInView(ref, { once: true, margin: '100% 0px' })
  const visible = useInView(ref)
  const [mode, setMode] = useState<Mode | null>(null)

  useEffect(() => {
    if (!near || mode) return
    let cancelled = false
    const override = readOverride()
    if (override) setMode(override)
    else detectMode().then((m) => !cancelled && setMode(m))
    return () => {
      cancelled = true
    }
  }, [near, mode])

  const { WebGL, Fallback } = SCENES[visual]

  return (
    <div ref={ref} aria-hidden className="relative h-full w-full" data-scene-mode={mode ?? 'pending'}>
      {mode === 'webgl' && (
        <WebGLBoundary onError={() => setMode('fallback')}>
          <Suspense fallback={null}>
            <WebGL active={visible} />
          </Suspense>
        </WebGLBoundary>
      )}
      {mode === 'fallback' && <Fallback active={visible} />}
    </div>
  )
}

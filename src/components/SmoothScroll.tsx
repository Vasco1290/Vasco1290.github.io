import { useEffect, type ReactNode } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Bridges Lenis to GSAP with a single clock: gsap.ticker drives lenis.raf
 * (autoRaf is off), and ScrollTrigger syncs to the smoothed scroll position.
 *
 * IMPORTANT: lenis-react publishes the Lenis instance through React state, so a
 * parent ref is still `undefined` during the mount effect — registering the
 * ticker there silently no-ops and scroll never advances. Reading the instance
 * from context via useLenis (and keying the effect on it) registers the ticker
 * only once the instance actually exists.
 */
function LenisGsapBridge() {
  // Keep ScrollTrigger in sync with every (smoothed) Lenis scroll.
  const lenis = useLenis(ScrollTrigger.update)

  useEffect(() => {
    if (!lenis) return
    const onTick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(onTick)
    }
  }, [lenis])

  return null
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }} autoRaf={false}>
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  )
}

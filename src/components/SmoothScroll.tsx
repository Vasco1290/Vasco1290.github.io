import { useEffect, useRef, type ReactNode } from 'react'
import { ReactLenis, type LenisRef } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Lenis smooth scroll wired to GSAP ScrollTrigger the canonical way:
 * a single clock (gsap.ticker drives lenis.raf, autoRaf off) and
 * ScrollTrigger.update on every Lenis scroll — so ScrollTrigger reads the
 * smoothed position instead of fighting the native scroll event.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    const lenis = lenisRef.current?.lenis
    if (!lenis) return

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    const onTick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(onTick)
    }
  }, [])

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }} autoRaf={false} ref={lenisRef}>
      {children}
    </ReactLenis>
  )
}

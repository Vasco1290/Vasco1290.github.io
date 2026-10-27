import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ExtrudedText from '../ui/ExtrudedText'
import MetricNumber from '../ui/MetricNumber'
import { about, type AboutMetric } from '../../content/site'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const EASE = [0.22, 1, 0.36, 1] as const

const KEYWORDS = about.keywords.map((k) => `${k} · `).join('')

/** One metric that counts up from 0 and pulses cyan when it scrolls into view. */
function CountUpMetric({ metric, still }: { metric: AboutMetric; still: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const [display, setDisplay] = useState(still ? metric.value : 0)

  useEffect(() => {
    if (still) {
      setDisplay(metric.value)
      return
    }
    if (!inView) return
    const controls = animate(0, metric.value, {
      duration: 1.2,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, still, metric.value])

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-2 md:items-end"
      initial={still ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      {/* cyan pulse: a one-shot scale/brightness swell as it lands */}
      <motion.div
        animate={still || !inView ? undefined : { scale: [1, 1.08, 1] }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <MetricNumber suffix={metric.suffix}>{display}</MetricNumber>
      </motion.div>
      <span className="font-body text-sm text-graphite/60">{metric.label}</span>
    </motion.div>
  )
}

export default function AboutSection({
  still = false,
  bandProgress = 0,
}: {
  still?: boolean
  bandProgress?: number
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const bandRef = useRef<HTMLDivElement>(null)

  // Horizontal keyword band, driven by vertical scroll (ScrollTrigger scrub) —
  // not an autoplay marquee. In `still` mode it is parked at `bandProgress`.
  useGSAP(
    () => {
      const el = bandRef.current
      const section = sectionRef.current
      if (!el || !section) return
      // Measured lazily so it re-reads once Anton (much wider than the fallback)
      // has loaded; negative overshoot avoided with max(0, …).
      const distance = () => Math.max(0, el.scrollWidth - window.innerWidth)

      if (still) {
        const apply = () => gsap.set(el, { x: -bandProgress * distance() })
        apply()
        document.fonts?.ready.then(apply)
        return
      }

      gsap.fromTo(
        el,
        { x: 0 },
        {
          x: () => -distance(), // function value → recomputed on invalidate/refresh
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        },
      )
      // Recompute once the display font swaps in.
      document.fonts?.ready.then(() => ScrollTrigger.refresh())
    },
    { scope: sectionRef, dependencies: [still, bandProgress] },
  )

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col overflow-hidden bg-porcelain text-graphite"
    >
      <div className="mx-auto w-full max-w-[1440px] flex-1 p-[clamp(32px,8vw,120px)]">
        <span
          className="font-display leading-none text-cyan"
          style={{ fontSize: 32, letterSpacing: '-0.02em' }}
        >
          02
        </span>

        <div className="mt-14 grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-[1fr_auto] md:items-start">
          {/* Left: extruded heading + identity paragraph */}
          <div className="flex flex-col gap-8">
            <div style={{ perspective: 900 }}>
              <motion.div
                initial={still ? false : { opacity: 0, y: 44, rotateX: 16 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-20% 0px' }}
                transition={{ duration: 1.2, ease: EASE }}
                style={{ transformOrigin: 'bottom' }}
              >
                <ExtrudedText style={{ fontSize: 'clamp(56px, 9vw, 96px)', lineHeight: 0.95 }}>
                  {about.heading}
                </ExtrudedText>
              </motion.div>
            </div>

            <p className="max-w-[58ch] font-body text-base leading-relaxed text-graphite/80">
              {about.body}
            </p>
          </div>

          {/* Right: metrics stacked */}
          <div className="flex flex-col gap-10 md:items-end">
            {about.metrics.map((m) => (
              <CountUpMetric key={m.label} metric={m} still={still} />
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal keyword band (chrome, fading against porcelain). */}
      <div className="relative h-[clamp(150px,24vh,240px)] w-full overflow-hidden">
        <div
          ref={bandRef}
          aria-hidden
          className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap font-display uppercase leading-none"
          style={{ fontSize: 'clamp(120px, 20vw, 200px)', color: '#C8CDD2', letterSpacing: '-0.01em' }}
        >
          {KEYWORDS}
        </div>
      </div>
    </section>
  )
}

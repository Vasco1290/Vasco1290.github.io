import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import heroSubject from '../../docs/design/hero-subject-cutout.png'

const EASE = [0.22, 1, 0.36, 1] as const

// Carved-into-porcelain effect. NOTE: the spec's `text-shadow: inset ...` is
// invalid CSS (inset only exists on box-shadow), so it renders nothing. This is
// the working letterpress equivalent.
const ENGRAVE = '0 1px 0 rgba(255,255,255,0.65), 0 -1px 2px rgba(0,0,0,0.12)'

// Bottom fade so the subject dissolves into the page instead of ending on a
// hard horizontal edge (top 75% solid, bottom 25% fades out).
const SUBJECT_MASK =
  'linear-gradient(to bottom, #000 0%, #000 75%, transparent 100%)'

function RevealLine({
  text,
  startIndex,
  still,
}: {
  text: string
  startIndex: number
  still: boolean
}) {
  return (
    <span className="block">
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ lineHeight: 0.85 }}
        >
          <motion.span
            className="inline-block"
            initial={still ? false : { y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.4 + (startIndex + i) * 0.06 }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/** simProgress: 0..1 renders a specific scroll position statically (for
 * deterministic screenshots). null = live behaviour driven by useScroll. */
export default function Hero({ simProgress = null }: { simProgress?: number | null }) {
  const heroRef = useRef<HTMLElement>(null)
  const still = simProgress != null

  // Cursor parallax (hover-capable, live mode only).
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 100, damping: 20 })
  const py = useSpring(my, { stiffness: 100, damping: 20 })
  useEffect(() => {
    if (still || !window.matchMedia('(hover: hover)').matches) return
    const onMove = (e: MouseEvent) => {
      mx.set(((e.clientX / window.innerWidth) * 2 - 1) * 10)
      my.set(((e.clientY / window.innerHeight) * 2 - 1) * 10)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my, still])

  // Scroll parallax: subject lags (0.6x) and fades out over the last 30%.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const liveY = useTransform(scrollYProgress, [0, 1], ['0vh', '40vh'])
  const liveOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0])
  const simY = `${40 * (simProgress ?? 0)}vh`
  const simOpacity =
    (simProgress ?? 0) <= 0.7 ? 1 : Math.max(0, 1 - ((simProgress ?? 0) - 0.7) / 0.3)

  return (
    <section id="hero" ref={heroRef} className="relative h-screen w-full overflow-hidden bg-bone">
      {/* Layer 1 (behind): Anton display type, carved into the bone. Scrolls 1x. */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <h1
          className="select-none text-center font-display uppercase text-graphite"
          style={{
            fontSize: 'clamp(96px, 20vw, 280px)',
            lineHeight: 0.85,
            letterSpacing: '-0.02em',
            textShadow: ENGRAVE,
          }}
        >
          <RevealLine text="HARSHIT" startIndex={0} still={still} />
          <RevealLine text="RAWAL" startIndex={7} still={still} />
        </h1>
      </div>

      {/* Layer 2 (front): subject. Scroll wrapper (0.6x lag + fade) ->
          cursor-parallax -> entrance -> [ellipse shadow + masked image]. */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <motion.div style={still ? { y: simY, opacity: simOpacity } : { y: liveY, opacity: liveOpacity }}>
          <motion.div style={{ x: still ? 0 : px, y: still ? 0 : py }}>
            <motion.div
              initial={still ? false : { opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: EASE }}
            >
              <div className="relative" style={{ transform: 'translateY(4vh)' }}>
                {/* Ellipse ground shadow (~30% x 8% of the subject), blurred. */}
                <div
                  className="absolute left-1/2 -translate-x-1/2"
                  style={{
                    bottom: '12%',
                    width: '22vh',
                    height: '6vh',
                    background:
                      'radial-gradient(ellipse at center, rgba(58,58,58,0.2) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                  }}
                />
                <motion.img
                  src={heroSubject}
                  alt="Harshit Rawal — porcelain cyborg portrait"
                  className="relative h-[75vh] w-auto object-contain"
                  style={{
                    WebkitMaskImage: SUBJECT_MASK,
                    maskImage: SUBJECT_MASK,
                  }}
                  animate={still ? undefined : { scale: [1, 1.01, 1] }}
                  transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
                  draggable={false}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Color bridge: soften bone -> porcelain into Act II. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[10vh]"
        style={{ background: 'linear-gradient(to bottom, #EAE5DC 0%, #FAFAFA 100%)' }}
      />

      {/* Below hero: chrome-gradient divider + caption. */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-5 pb-12">
        <div
          className="h-px w-2/5"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #C8CDD2 50%, transparent 100%)' }}
        />
        <p className="font-body text-sm text-graphite">
          MS Applicant Fall 2027 · Perception Under Uncertainty · Mumbai
        </p>
      </div>
    </section>
  )
}

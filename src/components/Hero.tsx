import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import heroSubject from '../../docs/design/hero-subject-cutout.png'

const EASE = [0.22, 1, 0.36, 1] as const

// Carved-into-porcelain effect. NOTE: the spec's `text-shadow: inset ...` is
// invalid CSS (inset only exists on box-shadow), so it renders nothing. This is
// the working letterpress equivalent: a light highlight just below each stroke
// plus a faint dark shadow above, so the graphite type reads as engraved into
// the bone surface rather than printed on top.
const ENGRAVE = '0 1px 0 rgba(255,255,255,0.65), 0 -1px 2px rgba(0,0,0,0.12)'

/** One line of Anton type with a per-letter mask-reveal (wipe up). */
function RevealLine({ text, startIndex }: { text: string; startIndex: number }) {
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
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{
              duration: 0.8,
              ease: EASE,
              delay: 0.4 + (startIndex + i) * 0.06,
            }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  // Cursor parallax (hover-capable devices only).
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 100, damping: 20 })
  const py = useSpring(my, { stiffness: 100, damping: 20 })

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    const onMove = (e: MouseEvent) => {
      mx.set(((e.clientX / window.innerWidth) * 2 - 1) * 10)
      my.set(((e.clientY / window.innerHeight) * 2 - 1) * 10)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  return (
    <section className="relative h-screen w-full overflow-hidden bg-bone">
      {/* Layer 1 (behind): massive Anton display type, carved into the bone. */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <h1
          className="select-none text-center font-display uppercase text-graphite"
          style={{
            fontSize: 'clamp(96px, 18vw, 240px)',
            lineHeight: 0.85,
            letterSpacing: '-0.02em',
            textShadow: ENGRAVE,
          }}
        >
          <RevealLine text="HARSHIT" startIndex={0} />
          <RevealLine text="RAWAL" startIndex={7} />
        </h1>
      </div>

      {/* Layer 2 (front): the hero subject, right-of-center, occluding the type.
          Parallax wrapper -> entrance (fade + scale) -> breathing loop. */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 z-10 flex items-center"
        style={{ left: '50%', x: px, y: py }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <motion.img
            src={heroSubject}
            alt="Harshit Rawal — porcelain cyborg portrait"
            className="h-[60vh] w-auto object-contain"
            animate={{ scale: [1, 1.01, 1] }}
            transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
            draggable={false}
          />
        </motion.div>
      </motion.div>

      {/* Below hero: chrome-gradient divider + caption. */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-5 pb-12">
        <div
          className="h-px w-2/5"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, #C8CDD2 50%, transparent 100%)',
          }}
        />
        <p className="font-body text-sm text-graphite">
          MS Applicant Fall 2027 · Perception Under Uncertainty · Mumbai
        </p>
      </div>
    </section>
  )
}

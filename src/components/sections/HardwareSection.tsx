import { motion } from 'framer-motion'
import EngravedText from '../ui/EngravedText'
import ExtrudedText from '../ui/ExtrudedText'
import MetricNumber from '../ui/MetricNumber'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Act V — Hardware. Split 50/50: chrome (SILICON, engraved) | charcoal
 * (SYSTEMS, extruded). The halves slide in from their outer edges on scroll
 * (staggered), a 1px cyan vein runs down the split as the through-line.
 *
 * still = final composition (no reveal). revealProgress (0..1) parks the
 * curtains mid-assembly for deterministic capture.
 */
export default function HardwareSection({
  still = false,
  revealProgress = null,
}: {
  still?: boolean
  revealProgress?: number | null
}) {
  const staticMode = still || revealProgress != null
  const sp = still ? 1 : (revealProgress ?? 1)
  const leftX = `${-(1 - sp) * 100}%`
  const rightX = `${(1 - sp) * 100}%`

  const leftPanel = staticMode
    ? { initial: false as const, animate: { x: leftX } }
    : { initial: { x: '-100%' }, whileInView: { x: '0%' }, viewport: { once: true, margin: '-20% 0px' } }
  const rightPanel = staticMode
    ? { initial: false as const, animate: { x: rightX } }
    : { initial: { x: '100%' }, whileInView: { x: '0%' }, viewport: { once: true, margin: '-20% 0px' } }
  const vein = staticMode
    ? { initial: false as const, animate: { scaleY: sp, opacity: sp } }
    : { initial: { scaleY: 0, opacity: 0 }, whileInView: { scaleY: 1, opacity: 1 }, viewport: { once: true, margin: '-20% 0px' } }

  return (
    <section id="hardware" className="relative min-h-screen overflow-hidden bg-void text-bone">
      {/* Base is void so BOTH curtains (chrome and charcoal) visibly slide in. */}
      {/* Left half — chrome / SILICON (engraved). */}
      <motion.div
        className="absolute inset-y-0 left-0 flex w-1/2 items-center bg-chrome text-graphite"
        {...leftPanel}
        transition={{ duration: 1.2, ease: EASE }}
      >
        <div className="flex flex-col gap-6 pl-[clamp(24px,6vw,120px)] pr-[clamp(24px,4vw,64px)]">
          <EngravedText style={{ fontSize: 'clamp(56px, 7vw, 96px)', lineHeight: 0.9 }}>SILICON</EngravedText>
          <p className="max-w-[42ch] font-body text-base leading-relaxed text-graphite/75">
            Conformal WiFi localization on bare-metal Pi Zero + ESP8266 — calibrated
            coverage guarantees from RSSI alone, no extra sensors.
          </p>
          <div className="flex flex-col gap-1">
            <MetricNumber suffix="%" style={{ fontSize: 'clamp(40px, 4.5vw, 68px)' }}>
              90
            </MetricNumber>
            <span className="font-body text-xs uppercase tracking-[0.2em] text-graphite/50">
              localization coverage
            </span>
          </div>
        </div>
      </motion.div>

      {/* Right half — charcoal / SYSTEMS (extruded). */}
      <motion.div
        className="absolute inset-y-0 right-0 flex w-1/2 items-center justify-end bg-charcoal text-bone"
        {...rightPanel}
        transition={{ duration: 1.2, ease: EASE, delay: staticMode ? 0 : 0.2 }}
      >
        <div className="flex flex-col items-end gap-6 pr-[clamp(24px,6vw,120px)] pl-[clamp(24px,4vw,64px)] text-right">
          <ExtrudedText on="dark" style={{ fontSize: 'clamp(56px, 7vw, 96px)', lineHeight: 0.9 }}>
            SYSTEMS
          </ExtrudedText>
          <p className="max-w-[42ch] font-body text-base leading-relaxed text-bone/70">
            Two years of AV perception at Autonex — annotation pipelines, dataset
            curation, and model evaluation at fleet scale.
          </p>
          <div className="flex flex-col items-end gap-1">
            <MetricNumber suffix="M" style={{ fontSize: 'clamp(40px, 4.5vw, 68px)' }}>
              2
            </MetricNumber>
            <span className="font-body text-xs uppercase tracking-[0.2em] text-bone/40">
              frames annotated
            </span>
          </div>
        </div>
      </motion.div>

      {/* Cyan vein — the through-line down the split. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 z-30 w-px -translate-x-1/2"
        style={{ background: '#00E5FF', boxShadow: '0 0 8px #00E5FF, 0 0 20px rgba(0,229,255,0.5)', transformOrigin: 'top' }}
        {...vein}
        transition={{ duration: 0.9, ease: EASE, delay: staticMode ? 0 : 1.0 }}
      />

      {/* Spanning header across both halves. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-between px-[clamp(24px,6vw,120px)] pt-[clamp(32px,6vh,80px)]">
        <span className="font-display leading-none text-cyan" style={{ fontSize: 32, letterSpacing: '-0.02em' }}>
          05
        </span>
        <span className="font-body text-xs uppercase tracking-[0.3em] text-bone">Act V · Hardware</span>
      </div>
    </section>
  )
}

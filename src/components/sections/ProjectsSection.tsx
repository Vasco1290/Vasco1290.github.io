import { Fragment } from 'react'
import { motion } from 'framer-motion'
import ExtrudedText from '../ui/ExtrudedText'
import MetricNumber from '../ui/MetricNumber'
import EmissiveTrace from '../ui/EmissiveTrace'

const EASE = [0.22, 1, 0.36, 1] as const

type Project = {
  n: string
  name: string
  desc: string
  metric: { value: number; suffix?: string }
  metricLabel: string
  github: string
}

// Placeholder content — real metrics/links land post-Phase M.
const PROJECTS: Project[] = [
  {
    n: '01',
    name: 'RPO Paper',
    desc: 'PURSE extension for uncertainty-aware pose estimation of tumbling spacecraft.',
    metric: { value: 6, suffix: 'DoF' },
    metricLabel: 'pose estimate',
    github: 'https://github.com/Vasco1290/rpo-purse',
  },
  {
    n: '02',
    name: 'RSSI Conformal',
    desc: 'WiFi localization with conformal coverage guarantees on Pi Zero + ESP8266.',
    metric: { value: 90, suffix: '%' },
    metricLabel: 'coverage',
    github: 'https://github.com/Vasco1290/rssi-conformal',
  },
  {
    n: '03',
    name: 'CloudLab v2',
    desc: 'Go-based collaborative, reproducible development environments.',
    metric: { value: 12, suffix: 'k' },
    metricLabel: 'lines of Go',
    github: 'https://github.com/Vasco1290/cloudlab',
  },
  {
    n: '04',
    name: 'Mammoth',
    desc: 'A Rust rewrite of Hadoop, built from scratch for modern hardware.',
    metric: { value: 3, suffix: '×' },
    metricLabel: 'throughput',
    github: 'https://github.com/Vasco1290/mammoth',
  },
]

function CyanDivider() {
  return (
    <div
      aria-hidden
      className="h-px w-full"
      style={{ background: 'rgba(0,229,255,0.55)', boxShadow: '0 0 6px rgba(0,229,255,0.35)' }}
    />
  )
}

function ProjectBand({
  project,
  index,
  still,
  forceHover,
  compact,
}: {
  project: Project
  index: number
  still: boolean
  forceHover: boolean
  compact: boolean
}) {
  const fromLeft = index % 2 === 0 // 01 left, 02 right, 03 left, 04 right

  return (
    <motion.article
      className="group relative flex w-full items-center"
      style={{ minHeight: compact ? '360px' : '40vh' }}
      initial={still ? false : { opacity: 0, x: fromLeft ? -90 : 90 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      {/* Hover: cyan emissive trace along the top edge. */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-px ${
          forceHover ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
        style={{
          background: '#00E5FF',
          boxShadow: '0 0 8px #00E5FF, 0 0 16px rgba(0,229,255,0.5)',
          transition: 'opacity 400ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />

      <div className="flex w-full items-center gap-6 px-[clamp(24px,6vw,120px)]">
        {/* Left 30% — monumental cyan project number. */}
        <div className="w-[30%]">
          <motion.span
            className="block font-display tabular-nums leading-none text-cyan"
            style={{
              fontSize: 'clamp(110px, 15vw, 220px)',
              letterSpacing: '-0.02em',
              textShadow: '0 0 22px rgba(0,229,255,0.35)',
            }}
            initial={still ? false : { scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {project.n}
          </motion.span>
        </div>

        {/* Middle 40% — extruded name + one-line description. */}
        <div className="flex w-[40%] flex-col gap-4">
          <ExtrudedText on="dark" style={{ fontSize: 'clamp(36px, 4.4vw, 64px)', lineHeight: 0.95 }}>
            {project.name}
          </ExtrudedText>
          <p className="max-w-[40ch] font-body text-base leading-relaxed text-bone/70">{project.desc}</p>
        </div>

        {/* Right 30% — key metric + GitHub emissive-trace link. */}
        <div className="flex w-[30%] flex-col items-start gap-2 md:items-end">
          <div className={`projectband-metric ${forceHover ? 'is-hover' : ''}`}>
            <MetricNumber suffix={project.metric.suffix} style={{ fontSize: 'clamp(44px, 5vw, 76px)' }}>
              {project.metric.value}
            </MetricNumber>
          </div>
          <span className="font-body text-xs uppercase tracking-[0.2em] text-bone/40">
            {project.metricLabel}
          </span>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="relative mt-3 inline-block font-body text-sm text-bone/85 transition-colors hover:text-bone"
          >
            View on GitHub
            <EmissiveTrace on="dark" className="absolute -bottom-1 left-0" />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default function ProjectsSection({
  still = false,
  compact = false,
  hoverIndex = null,
}: {
  still?: boolean
  compact?: boolean
  hoverIndex?: number | null
}) {
  return (
    <section id="projects" className="relative bg-graphite text-bone">
      <div className="px-[clamp(24px,6vw,120px)] pt-[clamp(48px,9vh,120px)] pb-8">
        <span className="font-display leading-none text-cyan" style={{ fontSize: 32, letterSpacing: '-0.02em' }}>
          04
        </span>
        <p className="mt-3 font-body text-xs uppercase tracking-[0.25em] text-bone/50">Selected Engineering</p>
      </div>

      <div className="flex flex-col">
        {PROJECTS.map((project, i) => (
          <Fragment key={project.n}>
            {i > 0 && <CyanDivider />}
            <ProjectBand
              project={project}
              index={i}
              still={still}
              compact={compact}
              forceHover={hoverIndex === i}
            />
          </Fragment>
        ))}
      </div>
    </section>
  )
}

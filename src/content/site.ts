/**
 * All section content, as typed data. To change what the site SAYS, edit this
 * file only — components read from it and never hardcode copy.
 *
 * Everything below is placeholder until the post-Phase M content pass, unless
 * noted otherwise.
 */

export type Link = { label: string; href: string }

/* ------------------------------------------------------------------ About */

export type AboutMetric = { value: number; suffix?: string; label: string }

export const about: { heading: string; body: string; metrics: AboutMetric[]; keywords: string[] } = {
  heading: 'Perception Under Uncertainty',
  body:
    'I build perception systems that stay honest when the world drifts — ' +
    'uncertainty-aware models for robotics and autonomy, where knowing when a ' +
    "prediction can't be trusted matters as much as the prediction itself.",
  metrics: [
    { value: 1, label: 'Published preprint' },
    { value: 2, suffix: 'yr', label: 'AV perception at Autonex' },
    { value: 3, label: 'Hardware research projects' },
  ],
  /** The horizontal keyword band; rendered joined with " · ". */
  keywords: [
    'PERCEPTION',
    'UNCERTAINTY',
    'EDGE',
    'ROBOTICS',
    'CONFORMAL PREDICTION',
    'DISTRIBUTION SHIFT',
    'SAFETY CRITICAL',
  ],
}

/* --------------------------------------------------------------- Research */

/**
 * Which 3D scene an entry shows. Adding a key here forces a matching scene
 * in src/components/research/scenes.ts (the build fails until it exists).
 */
export type ResearchVisual = 'eeg-waves'

export type ResearchEntry = {
  id: string
  title: string
  /** If team is true, this must state YOUR specific contribution. */
  role: string
  summary: string
  tags: string[]
  links: Link[]
  visual: ResearchVisual
  status: 'active' | 'complete' | 'paused'
  team: boolean
}

export const research: { heading: string; entries: ResearchEntry[] } = {
  heading: 'Research Experience',
  /** The first entry is featured; the rest render as compact rows below. */
  entries: [
    {
      id: 'mindnav',
      title: 'MindNav',
      // DRAFT from Harshit's description; sharpen with specifics (dataset,
      // paradigm, methods, results) before outreach.
      role:
        'Team project — I worked on the neuroscience behind the signal, built ' +
        'the EEG data pipeline, and co-developed the decoding algorithms.',
      summary:
        'Hands-free typing from EEG brain signals. Reads electrical activity ' +
        'from the scalp and turns it into letters on screen, without touching ' +
        'a keyboard.',
      tags: ['EEG', 'BCI', 'Signal processing'],
      links: [],
      visual: 'eeg-waves',
      status: 'active', // PLACEHOLDER: status not yet confirmed
      team: true,
    },
  ],
}

/* --------------------------------------------------------------- Projects */

export type Project = {
  id: string
  name: string
  desc: string
  metric: { value: number; suffix?: string }
  metricLabel: string
  github: string
}

/** Band numbers (01, 02, …) come from list order. */
export const projects: Project[] = [
  {
    id: 'rpo-paper',
    name: 'RPO Paper',
    desc: 'PURSE extension for uncertainty-aware pose estimation of tumbling spacecraft.',
    metric: { value: 6, suffix: 'DoF' },
    metricLabel: 'pose estimate',
    github: 'https://github.com/Vasco1290/rpo-purse',
  },
  {
    id: 'rssi-conformal',
    name: 'RSSI Conformal',
    desc: 'WiFi localization with conformal coverage guarantees on Pi Zero + ESP8266.',
    metric: { value: 90, suffix: '%' },
    metricLabel: 'coverage',
    github: 'https://github.com/Vasco1290/rssi-conformal',
  },
  {
    id: 'cloudlab-v2',
    name: 'CloudLab v2',
    desc: 'Go-based collaborative, reproducible development environments.',
    metric: { value: 12, suffix: 'k' },
    metricLabel: 'lines of Go',
    github: 'https://github.com/Vasco1290/cloudlab',
  },
  {
    id: 'mammoth',
    name: 'Mammoth',
    desc: 'A Rust rewrite of Hadoop, built from scratch for modern hardware.',
    metric: { value: 3, suffix: '×' },
    metricLabel: 'throughput',
    github: 'https://github.com/Vasco1290/mammoth',
  },
]

/* --------------------------------------------------------------- Hardware */

export type HardwareEntry = {
  label: string
  body: string
  metric: { value: number; suffix?: string }
  metricLabel: string
}

export const hardware: { silicon: HardwareEntry; systems: HardwareEntry } = {
  /** Left half — chrome, engraved label. */
  silicon: {
    label: 'SILICON',
    body:
      'Conformal WiFi localization on bare-metal Pi Zero + ESP8266 — calibrated ' +
      'coverage guarantees from RSSI alone, no extra sensors.',
    metric: { value: 90, suffix: '%' },
    metricLabel: 'localization coverage',
  },
  /** Right half — charcoal, extruded label. */
  systems: {
    label: 'SYSTEMS',
    body:
      'Two years of AV perception at Autonex — annotation pipelines, dataset ' +
      'curation, and model evaluation at fleet scale.',
    metric: { value: 2, suffix: 'M' },
    metricLabel: 'frames annotated',
  },
}

/* ---------------------------------------------------------------- Contact */

/** Used from Phase I. Email and GitHub are real; LinkedIn URL is a placeholder. */
export const contact = {
  links: [
    { label: 'Email', display: 'harshitrawal72@gmail.com', href: 'mailto:harshitrawal72@gmail.com' },
    { label: 'GitHub', display: 'Vasco1290', href: 'https://github.com/Vasco1290' },
    { label: 'LinkedIn', display: 'Harshit Rawal', href: 'https://www.linkedin.com/in/PLACEHOLDER' },
  ],
  caption: 'Mumbai, India · Responds within 48h',
}

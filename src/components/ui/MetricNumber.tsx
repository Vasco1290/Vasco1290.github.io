import type { CSSProperties, ReactNode } from 'react'

/**
 * MetricNumber — a monumental display-scale data point: Anton, tabular-nums,
 * cyan, with an emissive glow. This is the display metric component (per the
 * build-plan Phase C spec); body-scale numbers inside paragraphs use Inter
 * tabular-nums instead (see CLAUDE.md typography).
 */
export default function MetricNumber({
  children,
  suffix,
  className = '',
  style,
}: {
  children: ReactNode
  suffix?: string
  className?: string
  style?: CSSProperties
}) {
  return (
    <span
      className={`inline-flex items-baseline font-display tabular-nums leading-none text-cyan ${className}`}
      style={{
        fontSize: 'clamp(48px, 7vw, 96px)',
        letterSpacing: '-0.01em',
        textShadow: '0 0 14px rgba(0,229,255,0.45), 0 0 30px rgba(0,229,255,0.22)',
        ...style,
      }}
    >
      {children}
      {suffix && (
        <span className="ml-1.5 font-body font-medium" style={{ fontSize: '0.3em', letterSpacing: 0 }}>
          {suffix}
        </span>
      )}
    </span>
  )
}

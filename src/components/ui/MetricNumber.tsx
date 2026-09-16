import type { ReactNode } from 'react'

/**
 * MetricNumber — a large cyan stat with a subtle emissive glow.
 * NOTE: build-plan Phase C calls this "Anton numeric", but the Design System /
 * CLAUDE.md typography rule says numeric metrics are Inter tabular-nums. Per the
 * "follow CLAUDE.md and flag it" rule this uses Inter tabular-nums (semibold);
 * flagged for review — trivial to switch to Anton if preferred.
 */
export default function MetricNumber({
  children,
  suffix,
  className = '',
}: {
  children: ReactNode
  suffix?: string
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-baseline font-body font-semibold tabular-nums text-cyan ${className}`}
      style={{
        fontSize: 'clamp(44px, 6vw, 80px)',
        lineHeight: 1,
        letterSpacing: '-0.02em',
        textShadow: '0 0 12px rgba(0,229,255,0.4), 0 0 26px rgba(0,229,255,0.22)',
      }}
    >
      {children}
      {suffix && (
        <span className="ml-1 font-body font-medium" style={{ fontSize: '0.42em', letterSpacing: 0 }}>
          {suffix}
        </span>
      )}
    </span>
  )
}

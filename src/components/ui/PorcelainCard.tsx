import type { ReactNode } from 'react'

/**
 * PorcelainCard — off-white tile with a hairline chrome trim and a soft inner
 * shadow (ceramic recess). On hover a cyan EmissiveTrace lights along the top
 * edge, its glow bleeding into the content.
 * `traceVisible` forces the hover trace on (for docs/screenshots).
 */
export default function PorcelainCard({
  children,
  traceVisible = false,
  className = '',
}: {
  children?: ReactNode
  traceVisible?: boolean
  className?: string
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[4px] bg-porcelain p-8 ${className}`}
      style={{
        border: '1px solid #C8CDD2',
        boxShadow:
          'inset 0 1px 2px rgba(255,255,255,0.85), inset 0 -1px 2px rgba(58,58,58,0.06), 0 1px 3px rgba(58,58,58,0.06)',
      }}
    >
      {/* Cyan top-edge trace — fades in on hover, glow bleeds inward. */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-px ${
          traceVisible ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
        style={{
          background: '#00E5FF',
          boxShadow: '0 0 8px #00E5FF, 0 0 16px rgba(0,229,255,0.5)',
          transition: 'opacity 400ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />
      {children}
    </div>
  )
}

import type { CSSProperties, ReactNode } from 'react'

/**
 * ExtrudedText — type RAISED off the material (a solid sculpted block).
 * Construction: a lit face plus stacked solid shadows that build a visible
 * side wall (extrusion thickness), then a soft blurred shadow cast onto the
 * surface below — a raised glossy form, like the chrome collar parts on the
 * reference. This is deliberately NOT the inverse of EngravedText: it adds real
 * thickness + a cast shadow that a carving never has.
 */
export default function ExtrudedText({
  children,
  depth = 5,
  className = '',
  style,
}: {
  children: ReactNode
  depth?: number
  className?: string
  style?: CSSProperties
}) {
  // Solid stacked layers = the extruded side wall (fades with depth).
  const wall = Array.from(
    { length: depth },
    (_, i) => `0 ${i + 1}px 0 rgba(58,58,58,${Math.max(0.05, 0.3 - i * 0.035).toFixed(3)})`,
  ).join(', ')
  const cast = `0 ${depth + 8}px ${depth + 10}px rgba(10,10,10,0.28)`
  const topLight = '0 -1px 0 rgba(255,255,255,0.9)'

  return (
    <span
      className={`font-display uppercase ${className}`}
      style={{
        color: '#F4F1EB', // lit top face, brighter than the surrounding surface
        textShadow: `${topLight}, ${wall}, ${cast}`,
        letterSpacing: '-0.01em',
        ...style,
      }}
    >
      {children}
    </span>
  )
}

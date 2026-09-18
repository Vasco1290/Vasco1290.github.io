import type { CSSProperties, ReactNode } from 'react'

/**
 * ExtrudedText — type RAISED off the material (a solid sculpted block).
 * Construction: a lit face plus stacked solid shadows that build a visible
 * side wall (extrusion thickness), then a soft blurred shadow cast onto the
 * surface below. This is deliberately NOT the inverse of EngravedText: it adds
 * real thickness + a cast shadow that a carving never has.
 *
 * Background-adaptive: on light grounds the walls/cast are graphite-toned; on
 * dark grounds (e.g. the graphite Projects bg) they go near-black so the
 * extrusion still reads, and the lit face stays bone.
 */
export default function ExtrudedText({
  children,
  depth = 5,
  on = 'light',
  className = '',
  style,
}: {
  children: ReactNode
  depth?: number
  on?: 'light' | 'dark'
  className?: string
  style?: CSSProperties
}) {
  const dark = on === 'dark'
  const wallRGB = dark ? '8,8,8' : '58,58,58'
  const wallBase = dark ? 0.5 : 0.3
  const wall = Array.from(
    { length: depth },
    (_, i) => `0 ${i + 1}px 0 rgba(${wallRGB},${Math.max(0.05, wallBase - i * 0.035).toFixed(3)})`,
  ).join(', ')
  const cast = dark
    ? `0 ${depth + 8}px ${depth + 10}px rgba(0,0,0,0.6)`
    : `0 ${depth + 8}px ${depth + 10}px rgba(10,10,10,0.28)`
  const topLight = dark ? '0 -1px 0 rgba(255,255,255,0.45)' : '0 -1px 0 rgba(255,255,255,0.9)'
  const face = dark ? '#ECE7DE' : '#F4F1EB'

  return (
    <span
      className={`font-display uppercase ${className}`}
      style={{
        color: face,
        textShadow: `${topLight}, ${wall}, ${cast}`,
        letterSpacing: '-0.01em',
        ...style,
      }}
    >
      {children}
    </span>
  )
}

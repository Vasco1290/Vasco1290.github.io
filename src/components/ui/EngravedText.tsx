import type { CSSProperties, ReactNode } from 'react'

/**
 * EngravedText — type carved INTO the material (a groove, not a shadow trick).
 * Construction: the fill is a top-dark → bottom-light gradient (clipped to the
 * glyphs) so the interior reads as a recessed channel whose upper wall is in
 * shadow and lower wall catches light — plus a bright specular lip just below,
 * exactly like the recessed cyan cracks / forehead dimples on the reference.
 * No cast shadow: a carving sits flush with the surface.
 */
export default function EngravedText({
  children,
  depth = 4,
  className = '',
  style,
}: {
  children: ReactNode
  depth?: number
  className?: string
  style?: CSSProperties
}) {
  return (
    <span
      className={`font-display uppercase ${className}`}
      style={{
        color: 'transparent',
        // Dark, legible groove: upper wall in deep shadow, lower wall catching
        // light — but never fading to the surface colour (which killed legibility).
        backgroundImage: 'linear-gradient(to bottom, #262626 0%, #4a4a4a 55%, #727272 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        // Asymmetric to sell the recess: crisp bright lip BELOW (near edge lit),
        // firmer shadow ABOVE-inside (upper wall in shade). depth deepens the shade.
        textShadow: `0 1px 0 rgba(255,255,255,0.9), 0 -1px ${Math.max(1, depth - 2)}px rgba(10,10,10,0.5)`,
        letterSpacing: '-0.01em',
        ...style,
      }}
    >
      {children}
    </span>
  )
}

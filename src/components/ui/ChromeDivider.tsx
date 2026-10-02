/**
 * ChromeDivider — 1px brushed-steel bar (transparent → chrome → transparent).
 * Not a flat line: the gradient makes it read as a machined seam.
 */
export default function ChromeDivider({
  width = '100%',
  className = '',
}: {
  width?: string
  className?: string
}) {
  return (
    <div
      aria-hidden
      className={`h-px ${className}`}
      style={{
        width,
        background: 'linear-gradient(90deg, transparent 0%, #C8CDD2 50%, transparent 100%)',
      }}
    />
  )
}

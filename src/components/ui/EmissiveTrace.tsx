/**
 * EmissiveTrace — a 1px cyan line that glows like the cyborg's lit cracks.
 * Single component, background-adaptive: the core is always the exact accent
 * (#00E5FF). On dark grounds the bloom spreads wide (neon); on light grounds
 * it tightens and gains opacity so the trace stays legible against low
 * cyan-on-white contrast without washing out.
 */
export default function EmissiveTrace({
  on = 'dark',
  width = '100%',
  className = '',
  vertical = false,
}: {
  on?: 'light' | 'dark'
  width?: string
  className?: string
  vertical?: boolean
}) {
  const glow =
    on === 'dark'
      ? '0 0 8px #00E5FF, 0 0 16px rgba(0,229,255,0.5)'
      : '0 0 5px rgba(0,229,255,0.9), 0 0 11px rgba(0,229,255,0.45)'

  return (
    <span
      aria-hidden
      className={`block ${className}`}
      style={{
        width: vertical ? '1px' : width,
        height: vertical ? width : '1px',
        background: '#00E5FF',
        boxShadow: glow,
      }}
    />
  )
}

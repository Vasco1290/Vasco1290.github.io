export default function HardwareSection() {
  return (
    <section id="hardware" className="relative min-h-screen">
      {/* Split background: chrome (left) / charcoal (right) — the duality. */}
      <div className="absolute inset-0 flex" aria-hidden>
        <div className="w-1/2 bg-chrome" />
        <div className="w-1/2 bg-charcoal" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-[1440px] flex-col p-[clamp(32px,8vw,120px)]">
        <span
          className="font-display leading-none text-cyan"
          style={{ fontSize: 32, letterSpacing: '-0.02em' }}
        >
          05
        </span>
        <div className="flex flex-1 items-center">
          {/* Heading spans the split; bone + dark shadow stays legible on both
              the light chrome and dark charcoal halves. */}
          <h2
            className="font-display uppercase text-bone"
            style={{
              fontSize: 'clamp(56px, 11vw, 96px)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              textShadow: '0 2px 24px rgba(10,10,10,0.55)',
            }}
          >
            Systems &amp; Silicon
          </h2>
        </div>
      </div>
    </section>
  )
}

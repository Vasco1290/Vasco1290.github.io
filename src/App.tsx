import Hero from './components/Hero'

// TEMPORARY stand-in for Act II (About), built for real in Phase B. It only
// exists now to give the hero something to scroll into so the hero->about
// transition can be built and captured.
function PlaceholderAbout() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-porcelain">
      <p className="font-body text-sm text-graphite/40">
        About (Act II) — placeholder, built in Phase B
      </p>
    </section>
  )
}

// Deterministic capture: ?sim=<0..1> renders a specific scroll position by
// translating the page inside a fixed viewport (the hidden preview pane
// throttles rAF and headless can't scroll, so live capture is unreliable).
// ?snapshot is ?sim=0.
function readSim(): number | null {
  if (typeof window === 'undefined') return null
  const p = new URLSearchParams(window.location.search)
  if (p.has('sim')) {
    const v = parseFloat(p.get('sim') || '0')
    return Number.isFinite(v) ? Math.max(0, Math.min(1, v)) : 0
  }
  return p.has('snapshot') ? 0 : null
}

export default function App() {
  const sim = readSim()

  if (sim != null) {
    return (
      <div style={{ height: '100vh', overflow: 'hidden' }}>
        <div style={{ transform: `translateY(${-sim * 100}vh)`, willChange: 'transform' }}>
          <Hero simProgress={sim} />
          <PlaceholderAbout />
        </div>
      </div>
    )
  }

  return (
    <>
      <Hero />
      <PlaceholderAbout />
    </>
  )
}

import SmoothScroll from './components/SmoothScroll'
import Hero from './components/Hero'
import AboutSection from './components/sections/AboutSection'
import ResearchSection from './components/sections/ResearchSection'
import ProjectsSection from './components/sections/ProjectsSection'
import HardwareSection from './components/sections/HardwareSection'
import VisionSection from './components/sections/VisionSection'
import ContactSection from './components/sections/ContactSection'
import ChromeDivider from './components/ui/ChromeDivider'
import DebugPage from './pages/DebugPage'

function Sections() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ChromeDivider />
      <ResearchSection />
      <ChromeDivider />
      <ProjectsSection />
      <ChromeDivider />
      <HardwareSection />
      <ChromeDivider />
      <VisionSection />
      <ChromeDivider />
      <ContactSection />
    </>
  )
}

// Deterministic capture: ?to=<vh> (or ?sim=<0..1> over the hero, ?snapshot=0)
// translates the page inside a fixed viewport so any scroll position renders
// statically — the hidden preview pane throttles rAF and headless can't scroll.
function readOffsetVh(): number | null {
  if (typeof window === 'undefined') return null
  const p = new URLSearchParams(window.location.search)
  if (p.has('to')) {
    const v = parseFloat(p.get('to') || '0')
    return Number.isFinite(v) ? Math.max(0, v) : 0
  }
  if (p.has('sim')) {
    const v = parseFloat(p.get('sim') || '0')
    return (Number.isFinite(v) ? Math.max(0, Math.min(1, v)) : 0) * 100
  }
  return p.has('snapshot') ? 0 : null
}

// Capture-only: park the About keyword band at a fixed progress (?band=<0..1>).
function readBandProgress(): number {
  if (typeof window === 'undefined') return 0
  const v = parseFloat(new URLSearchParams(window.location.search).get('band') || '0')
  return Number.isFinite(v) ? Math.max(0, Math.min(1, v)) : 0
}

export default function App() {
  // Component library documentation route.
  if (typeof window !== 'undefined' && window.location.pathname.replace(/\/$/, '') === '/debug') {
    return <DebugPage />
  }

  // Capture-only: render one section in isolation (?only=projects[&compact][&hover=<i>]).
  if (typeof window !== 'undefined') {
    const p = new URLSearchParams(window.location.search)
    if (p.get('only') === 'projects') {
      const hoverRaw = p.get('hover')
      const hoverIndex = hoverRaw != null && hoverRaw !== '' ? parseInt(hoverRaw, 10) : null
      return (
        <main className="bg-graphite">
          <ProjectsSection
            still
            compact={p.has('compact')}
            hoverIndex={hoverIndex != null && Number.isFinite(hoverIndex) ? hoverIndex : null}
          />
        </main>
      )
    }
  }

  const offsetVh = readOffsetVh()

  if (offsetVh != null) {
    return (
      <div style={{ height: '100vh', overflow: 'hidden' }}>
        <div style={{ transform: `translateY(${-offsetVh}vh)`, willChange: 'transform' }}>
          <Hero simProgress={Math.min(1, offsetVh / 100)} />
          <AboutSection still bandProgress={readBandProgress()} />
          <ChromeDivider />
          <ResearchSection />
          <ChromeDivider />
          <ProjectsSection still />
          <ChromeDivider />
          <HardwareSection />
          <ChromeDivider />
          <VisionSection />
          <ChromeDivider />
          <ContactSection />
        </div>
      </div>
    )
  }

  return (
    <SmoothScroll>
      <Sections />
    </SmoothScroll>
  )
}

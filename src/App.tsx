import { ReactLenis } from 'lenis/react'
import Hero from './components/Hero'
import AboutSection from './components/sections/AboutSection'
import ResearchSection from './components/sections/ResearchSection'
import ProjectsSection from './components/sections/ProjectsSection'
import HardwareSection from './components/sections/HardwareSection'
import VisionSection from './components/sections/VisionSection'
import ContactSection from './components/sections/ContactSection'

// 1px chrome-gradient divider between sections.
function ChromeDivider() {
  return (
    <div
      aria-hidden
      className="h-px w-full"
      style={{ background: 'linear-gradient(90deg, transparent 0%, #C8CDD2 50%, transparent 100%)' }}
    />
  )
}

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

export default function App() {
  const offsetVh = readOffsetVh()

  if (offsetVh != null) {
    return (
      <div style={{ height: '100vh', overflow: 'hidden' }}>
        <div style={{ transform: `translateY(${-offsetVh}vh)`, willChange: 'transform' }}>
          <Hero simProgress={Math.min(1, offsetVh / 100)} />
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
        </div>
      </div>
    )
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <Sections />
    </ReactLenis>
  )
}

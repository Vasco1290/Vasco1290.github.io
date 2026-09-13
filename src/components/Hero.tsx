import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'
import type { Mesh } from 'three'

/**
 * Placeholder subject for the composition test.
 *
 * This is intentionally a simple icosahedron — NOT the real cyborg head.
 * Its only job is to prove the type-behind-subject z-stacking and the cyan
 * emissive + bloom pipeline described in the canonical reference. The real
 * head model is swapped in only once this pipeline is approved.
 */
function PlaceholderSubject() {
  const meshRef = useRef<Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      // Ambient rotation, ~0.003 rad/frame on the Y axis.
      meshRef.current.rotation.y += 0.003
    }
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 0]} />
      <meshPhysicalMaterial
        // Cool porcelain-gray (not blown-out white) so the cyan emissive is
        // the brightest element and the bloom halo reads cyan, mirroring the
        // reference head: matte porcelain with glowing cyan fracture lines.
        color="#585d66"
        emissive="#00E5FF"
        emissiveIntensity={0.4}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
        roughness={0.2}
        metalness={0.1}
        // Tame the studio-env reflections so the glossy highlights don't bloom
        // white and drown the cyan.
        envMapIntensity={0.25}
      />
    </mesh>
  )
}

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-bg">
      {/* Layer 1 (behind): massive Anton display type. */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <h1
          className="select-none text-center font-display uppercase text-fg"
          style={{
            lineHeight: 0.85,
            letterSpacing: '-0.02em',
            // ~240px on desktop, scaling down responsively on narrow viewports.
            fontSize: 'clamp(88px, 24vw, 240px)',
          }}
        >
          Harshit
          <br />
          Rawal
        </h1>
      </div>

      {/* Layer 2 (front): transparent R3F canvas overlapping the type, so the
          subject visually occludes the letterforms — they collide in z-space. */}
      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          // preserveDrawingBuffer lets us read the rendered frame back
          // (screenshot export + the static-image fallback generated later).
          gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.35} />
          {/* Dimmed key so its white specular highlight stays below the bloom
              threshold; the cyan emissive becomes the brightest bloom source. */}
          <directionalLight position={[-5, 5, 5]} intensity={0.5} />

          <PlaceholderSubject />

          {/* Studio env for physically plausible reflections, dimmed so the
              reflections don't bloom white over the cyan. */}
          <Environment preset="studio" environmentIntensity={0.35} />

          <EffectComposer>
            <Bloom
              intensity={1.5}
              // Just below the cyan emissive's luminance (~0.29) so the cyan
              // blooms clearly while the dimmed white highlights stay under it.
              luminanceThreshold={0.18}
              luminanceSmoothing={0.9}
            />
            {/* postprocessing's EffectComposer disables the renderer's built-in
                tone mapping; without a ToneMapping pass, HDR values clip to pure
                white. ACES filmic maps highlights back into range so the subject
                reads as a glossy white form and only the brightest cyan blooms. */}
            <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
          </EffectComposer>
        </Canvas>
      </div>
    </section>
  )
}

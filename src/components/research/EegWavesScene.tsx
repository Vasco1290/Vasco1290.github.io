import { useEffect, useMemo, useRef, type ComponentRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { Color, type Group, type InterleavedBufferAttribute } from 'three'
import {
  CAMERA_Z,
  CHANNELS,
  CYAN,
  CYAN_CHANNEL,
  FOV,
  GRAPHITE,
  LINE_LENGTH,
  POINTS,
  cameraDistance,
  channelY,
  drift,
  signal,
} from './eegSignal'

/** Section ground, so the canvas is indistinguishable from the CSS chrome. */
const CHROME = '#C8CDD2'
/**
 * Bloom is luminance-thresholded, and the chrome ground (luminance ~0.61) is
 * nearly as bright as #00E5FF (~0.63). Pushing the cyan line slightly into
 * HDR makes it the only thing above the threshold, so only it blooms.
 */
const CYAN_HDR = new Color(CYAN).multiplyScalar(1.5)
const BLOOM_THRESHOLD = 0.8
/** Cursor nudge: max camera orbit, ~3°. */
const NUDGE = (3 * Math.PI) / 180

function Channel({ ch }: { ch: number }) {
  const ref = useRef<ComponentRef<typeof Line>>(null)
  const cyan = ch === CYAN_CHANNEL
  const y0 = channelY(ch)
  const points = useMemo(
    () =>
      Array.from({ length: POINTS }, (_, i) => [(i / (POINTS - 1) - 0.5) * LINE_LENGTH, y0, 0] as [number, number, number]),
    [y0],
  )

  // Rewrite the fat-line segment buffer in place each frame (no reallocation):
  // segment i occupies [startX, startY, startZ, endX, endY, endZ].
  useFrame(({ clock }) => {
    const mesh = ref.current
    if (!mesh) return
    const attr = mesh.geometry.getAttribute('instanceStart') as InterleavedBufferAttribute
    const arr = attr.data.array as Float32Array
    const t = clock.elapsedTime
    let px = 0
    let py = 0
    for (let i = 0; i < POINTS; i++) {
      const u = i / (POINTS - 1)
      const x = (u - 0.5) * LINE_LENGTH
      const y = y0 + signal(ch, u, t)
      if (i > 0) {
        const o = (i - 1) * 6
        arr[o] = px
        arr[o + 1] = py
        arr[o + 3] = x
        arr[o + 4] = y
      }
      px = x
      py = y
    }
    attr.data.needsUpdate = true
  })

  return (
    <Line
      ref={ref}
      points={points}
      color={cyan ? CYAN_HDR : GRAPHITE}
      lineWidth={cyan ? 2.4 : 1.25}
      toneMapped={false}
      frustumCulled={false}
      renderOrder={cyan ? 1 : 0}
    />
  )
}

/** The tilted channel stack, drifting very slowly around its base tilt. */
function Stack() {
  const group = useRef<Group>(null)
  useFrame(({ clock }) => {
    const { rx, ry } = drift(clock.elapsedTime)
    group.current?.rotation.set(rx, ry, 0)
  })
  return (
    <group ref={group}>
      {Array.from({ length: CHANNELS }, (_, ch) => (
        <Channel key={ch} ch={ch} />
      ))}
    </group>
  )
}

/** Camera rig: fits the stage aspect; cursor orbits it a few degrees, damped (hover devices only). */
function CameraNudge() {
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame(({ camera, size }, delta) => {
    const k = 1 - Math.exp(-delta * 2.5)
    const c = current.current
    c.x += (target.current.x - c.x) * k
    c.y += (target.current.y - c.y) * k
    const yaw = c.x * NUDGE
    const pitch = c.y * NUDGE
    const dist = cameraDistance(size.width / size.height)
    camera.position.set(
      Math.sin(yaw) * Math.cos(pitch) * dist,
      Math.sin(pitch) * dist,
      Math.cos(yaw) * Math.cos(pitch) * dist,
    )
    camera.lookAt(0, 0, 0)
  })
  return null
}

/** 'eeg-waves' WebGL scene. Lazy-loaded; `active` pauses the render loop off-screen. */
export default function EegWavesScene({ active }: { active: boolean }) {
  return (
    <Canvas
      flat
      dpr={[1, 2]}
      frameloop={active ? 'always' : 'demand'}
      camera={{ position: [0, 0, CAMERA_Z], fov: FOV }}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={[CHROME]} />
      <Stack />
      <CameraNudge />
      <EffectComposer multisampling={4}>
        <Bloom mipmapBlur luminanceThreshold={BLOOM_THRESHOLD} luminanceSmoothing={0.05} intensity={1.2} radius={0.5} />
      </EffectComposer>
    </Canvas>
  )
}

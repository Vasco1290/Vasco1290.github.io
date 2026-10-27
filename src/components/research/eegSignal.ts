/**
 * Shared model for the 'eeg-waves' visual: 8 EEG-like channels, each a slow,
 * noisy wave with its own speed and shape. Used by both the WebGL scene and
 * the 2D-canvas fallback so the two show the same motion. No three.js import
 * here — the fallback must stay out of the 3D chunk.
 */

export const CHANNELS = 8
/** The one channel drawn in cyan: the signal the system is "reading". */
export const CYAN_CHANNEL = 2
/** Samples per line. */
export const POINTS = 180
/** World units: line length and vertical gap between channels. */
export const LINE_LENGTH = 6
export const SPACING = 0.5

/** Base tilt (radians) so the stack recedes into depth; drift oscillates around it. */
export const TILT_X = -0.2
export const TILT_Y = 0.55
/** Camera distance and vertical field of view (degrees). */
export const CAMERA_Z = 9.5
export const FOV = 34
/** Stage aspect (w/h) the camera distance is tuned for (desktop half-column). */
const BASE_ASPECT = 1.15

/** Pull the camera back on narrower stages so the line ends never clip. */
export const cameraDistance = (aspect: number) => CAMERA_Z * Math.max(1, BASE_ASPECT / aspect)

export const GRAPHITE = '#3A3A3A'
export const CYAN = '#00E5FF'

function hash(n: number) {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return (s - Math.floor(s)) * 2 - 1
}

/** Smooth 1D value noise in [-1, 1]. */
function noise(x: number, seed: number) {
  const i = Math.floor(x)
  const f = x - i
  const u = f * f * (3 - 2 * f)
  const a = hash(i + seed * 57.3)
  const b = hash(i + 1 + seed * 57.3)
  return a + (b - a) * u
}

// Deterministic per-channel character: golden-ratio stepping spreads the
// frequencies/speeds so no two channels share a shape or tempo.
const frac = (x: number) => x - Math.floor(x)
const PARAMS = Array.from({ length: CHANNELS }, (_, ch) => ({
  amp: (0.1 + frac(ch * 0.381) * 0.06) * (ch === CYAN_CHANNEL ? 1.25 : 1),
  f1: 0.9 + frac(ch * 0.618) * 1.4, // slow carrier
  s1: 0.25 + frac(ch * 0.414) * 0.35,
  ph: frac(ch * 0.732) * Math.PI * 2,
  f2: 1.8 + frac(ch * 0.302) * 2.2, // drifting noise
  s2: 0.3 + frac(ch * 0.577) * 0.4,
  f3: 6 + frac(ch * 0.854) * 5, // fine jitter
  s3: 0.8 + frac(ch * 0.229) * 0.8,
  seed: ch * 13 + 1,
}))

/** Vertical displacement of channel `ch` at position u (0..1 along the line), time t (s). */
export function signal(ch: number, u: number, t: number) {
  const p = PARAMS[ch]
  const x = u * LINE_LENGTH
  return (
    p.amp *
    (0.55 * Math.sin(x * p.f1 + t * p.s1 + p.ph) +
      0.4 * noise(x * p.f2 - t * p.s2, p.seed) +
      0.16 * noise(x * p.f3 + t * p.s3, p.seed + 7))
  )
}

/** Resting height of channel `ch` (channel 0 at the top). */
export const channelY = (ch: number) => ((CHANNELS - 1) / 2 - ch) * SPACING

/** Very slow drift of the whole stack around the base tilt. */
export function drift(t: number) {
  return {
    rx: TILT_X + 0.035 * Math.sin(t * 0.09),
    ry: TILT_Y + 0.06 * Math.sin(t * 0.11 + 1.3),
  }
}

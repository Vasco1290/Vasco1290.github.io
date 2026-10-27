import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import type { ResearchVisual } from '../../content/site'
import EegWavesFallback from './EegWavesFallback'

export type SceneProps = { active: boolean }

/**
 * One entry per ResearchVisual key in site.ts. To add a scene: add the key
 * there, then a WebGL scene (lazy, so three.js stays out of the main bundle)
 * and a 2D fallback here.
 */
export const SCENES: Record<
  ResearchVisual,
  { WebGL: LazyExoticComponent<ComponentType<SceneProps>>; Fallback: ComponentType<SceneProps> }
> = {
  'eeg-waves': {
    WebGL: lazy(() => import('./EegWavesScene')),
    Fallback: EegWavesFallback,
  },
}

# Portfolio — Harshit Rawal

## Project
Personal portfolio positioning for:
- MS Fall 2027 applications (Texas universities)
- Long-term Synthesis Labs founder identity (surfaced in a "Vision"
  section, not as the primary brand)

Primary brand mark: HARSHIT RAWAL. Synthesis is design language and
long-term vision, not the site's identity.

## Canonical Visual Reference
`docs/design/banner-reference.png` is the source of truth for all
visual decisions. Re-view it whenever making design choices.

Extracted specifications from the reference:
- Head material: cracked white porcelain / ceramic, high gloss,
  visible surface fractures across face, skull, neck
- Fracture lines: emissive electric cyan (#00E5FF), glowing as if
  lit from within, following organic branching patterns
- Metal accents: small chrome studs/pins on temple, cheekbone, jaw
- Neck: partially transparent, revealing internal cyan-lit
  cabling/musculature
- Pose: three-quarter view, chin slightly raised, eyes closed or
  downcast — serene, contemplative, not aggressive
- Background: flat warm cream (#F4EFE6), no gradient, no vignette
- Lighting: soft key from upper-left, minimal fill, subtle rim light
  along jaw/shoulder
- COMPOSITIONAL RULE (critical): massive condensed display type sits
  BEHIND the 3D subject in z-space. The subject partially occludes
  the letterforms. Type is not overlaid on top of the model, and the
  model is not placed next to the type. They collide.

## Stack
- Vite + React 19 + TypeScript
- React Three Fiber + Drei + Postprocessing for 3D
- Tailwind CSS for layout and utility styling
- Framer Motion for component-level motion
- GSAP + ScrollTrigger for scroll-choreographed sequences
- Leva for dev-time 3D scene tweaking (dev only, strip from prod)

## Design Tokens
Colors (only three — do NOT introduce a fourth):
- bg: #F4EFE6 (warm cream)
- fg: #0A0A0A (near-black)
- accent: #00E5FF (electric cyan)

Cyan usage rules:
- Allowed: emissive material on 3D model, hover/active state on
  interactive elements, key numeric metrics, single-word emphasis
- Forbidden: body text, paragraph text, section labels, borders
  larger than 1px, backgrounds

Typography:
- Display: Anton, minimum 96px on hero, 64px on section headers
- Body: Inter, 16px base, line-height 1.6
- Numeric metrics: Anton or Inter tabular-nums, cyan color allowed

Spacing:
- 8px baseline grid
- Max content width: 1440px
- Section padding: 120px desktop / 60px mobile

Motion:
- Default easing: cubic-bezier(0.22, 1, 0.36, 1)
- Micro-interactions: 400ms
- Component entrances: 800ms
- Hero reveals: 1200ms

## Working Rules
- Only three colors. No fourth accent introduced under any pretext.
- Display type is Anton, minimum 96px on hero. Do not shrink for
  "balance" or "readability" — the scale is the point.
- Type-behind-subject composition on hero is non-negotiable. If a
  layout suggestion breaks this, reject it.
- Every 3D scene must have a static-image fallback for devices
  without WebGL or with low GPU tier. Detect and switch automatically.
- Mobile is a first-class target. The cyborg head renders on mobile
  too — reduce polycount and postprocessing quality, don't remove the
  scene.
- Content sections are NOT to be built until the visual language and
  3D pipeline are proven and approved.

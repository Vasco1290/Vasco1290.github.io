# Portfolio — Harshit Rawal

## Project
Personal portfolio positioning for:
- MS Fall 2027 applications (Texas universities)
- Long-term Synthesis Labs founder identity (surfaced in a "Vision"
  section, not as the primary brand)

Primary brand mark: HARSHIT RAWAL. Synthesis is design language and
long-term vision, not the site's identity.

## Visual References

Three canonical references in docs/design/:

1. hero-subject.png — The 2D image rendered as <img> in the
   Hero section (Phase A). This IS the hero image, used as-is.

2. material-reference.png — Surface material study. Reference
   this when building UI components in Phase C (porcelain cards,
   chrome dividers, emissive traces, engraved/extruded text).
   Every material treatment should be traceable to this reference.

3. composition-reference.png — Canonical composition rule: type
   behind subject. Reference whenever display type interacts
   with imagery. Subject occludes type; type is never overlaid
   on top of subject.

Re-view the appropriate reference before every design decision.
Multiple references may apply to a single decision.

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

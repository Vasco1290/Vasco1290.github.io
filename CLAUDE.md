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
- Tailwind CSS for layout and utility styling
- Lenis for smooth scroll
- Framer Motion for component-level motion
- GSAP + ScrollTrigger for scroll-choreographed sequences
- React Three Fiber + Drei + Postprocessing — Research section ONLY
  (Phase G); reinstalled there, procedural geometry, no .glb file
- detect-gpu for adaptive rendering and fallbacks (installed in Phase G;
  WebGL on tier >= 2, 2D fallback otherwise)

## Content
To change content, edit src/content/site.ts only. Components read all
copy, metrics, entries and links from it; never hardcode content in a
component.
- Research entries: the first entry is featured; others render as
  compact rows. Each entry's `visual` key picks its 3D scene from
  src/components/research/scenes.ts. Adding a new key to the
  ResearchVisual type fails the build until a WebGL scene and a 2D
  fallback are registered there.

## Design System (source of truth)

### Palette — seven neutrals + one emissive
| Token | Hex | Material |
|-------|-----|----------|
| bone | #EAE5DC | warm cream, slightly aged |
| porcelain | #FAFAFA | cold clean white |
| chrome | #C8CDD2 | brushed steel grey |
| graphite | #3A3A3A | carbon composite |
| charcoal | #1A1A1A | deep engineered black |
| void | #0A0A0A | true black |
| cyan | #00E5FF | emissive electric cyan |

### Cyan usage rules
Allowed: emissive glow, hover/active state, key numeric metrics,
focus rings (as glowing traces, not outlines), single-word emphasis
in body text.

Forbidden: body paragraph text, backgrounds, borders larger than 1px,
filled shapes, flat color blocks.

### Typography
- Display: Anton (Google Fonts), minimum 96px on hero, 64px on
  section headers
- Body: Inter (Google Fonts), 16px base, line-height 1.6
- Numeric metrics — two scales:
  - Display-scale metrics (the MetricNumber component): Anton,
    tabular-nums, cyan (with emissive glow)
  - Body-scale numbers within paragraphs: Inter, tabular-nums,
    inherits the paragraph colour
- Never mix more than these two families

### Spacing
- 8px baseline grid
- Max content width: 1440px
- Section padding: 120px desktop / 60px mobile

### Motion
- Default easing: cubic-bezier(0.22, 1, 0.36, 1)
- Micro: 400ms | Component entrance: 800ms | Hero/act reveals: 1200ms

### Material Coherence Principle
Every UI element (buttons, dividers, cards, section labels) is
visually made from a material that exists in the cyborg subject's
world — porcelain, chrome, carbon composite, cyan-emissive traces:
- Section dividers = 1px chrome-gradient bars, not flat lines
- Buttons = porcelain tiles, cyan emissive traces on hover
- Cards = chrome-edged, off-white fill, hairline metal trim
- Numbers/metrics = engraved (inset shadow) or extruded (drop shadow)
- Focus states = cyan emissive traces (glowing), never colored outlines
- Loading states = cyan pulse, matching cyborg vein glow

### Act structure (material temperature descent)
| Act | Section | Background | Material |
|-----|---------|-----------|----------|
| I | Hero | bone | warm porcelain |
| II | About | porcelain | clean ceramic |
| III | Research | chrome | brushed steel |
| IV | Projects | graphite | carbon composite |
| V | Hardware | split chrome + charcoal | duality |
| VI | Vision | void | pure darkness + neon |
| VII | Contact | bone | return to warmth |

Transitions between acts are smooth color interpolations (400ms during
scroll), not hard cuts.

### Component variants (src/components/ui, documented live at /debug)
- EmissiveTrace — one component, background-adaptive via `on`: 'light'
  (tighter, more opaque bloom for porcelain/chrome/bone) | 'dark' (wide
  neon bloom for graphite/charcoal/void). Core is always exactly #00E5FF.
- ExtrudedText — raised sculpture, background-adaptive via `on`: 'light'
  (default — graphite-toned walls/cast, for bone/porcelain/chrome) |
  'dark' (near-black walls/cast + bone face, for graphite/charcoal/void).
  Always use the variant matching the section's material.
- EngravedText — inset carving (shaded groove + bright lower lip); light
  grounds.
- MetricNumber — Anton tabular-nums display metric, cyan with glow.
- ChromeDivider (section seams) / PorcelainCard (chrome-trim tile, cyan
  trace on hover).

### Deliberate Omissions (do NOT "fix" these)
- Projects (Act IV) has NO large Anton section header. "Selected
  Engineering" appears only as a small eyebrow label under the "04"
  number. The full-width bands — monumental cyan numbers + extruded
  names — ARE the section identity. Do not add a section header here.

### Pending content changes (post-Phase M content pass ONLY, not before)
- Projects content is placeholder. To be removed: RPO Paper, CloudLab
  v2, Mammoth (all dropped). RSSI Conformal stays; replacements TBD.
- Until the content pass, keep the four placeholder bands so the section
  stays correctly sized for composition.

- Research: MindNav role line is a draft; status 'active' is unconfirmed.
- Contact: LinkedIn URL is a placeholder.

### Pending design checks
- Phase I: test EngravedText (dark groove, drop-shadow construction since
  Phase F) on "WORK TOGETHER" over bone specifically. If it reads as dark
  gradient type rather than a carving, design a proper light-faced variant
  then. (The lighter Phase C look was a text-shadow side effect, not a
  design; don't simply restore it.)

## Working Rules
- Palette is seven neutrals + cyan. Cyan is the ONLY accent; introduce
  no color outside the palette under any pretext.
- Display type is Anton, minimum 96px on hero / 64px on section
  headers. Do not shrink for "balance" or "readability" — the scale
  is the point.
- Type-behind-subject composition on the hero is non-negotiable: the
  subject image occludes the letterforms; type is never overlaid on
  top of the subject. If a layout suggestion breaks this, reject it.
- Every 3D scene (Research only) must have a static/SVG fallback for
  devices without WebGL or with low GPU tier. Detect and switch
  automatically.
- Mobile is a first-class target: scale type down, adapt layouts (see
  Phase K), never drop sections.
- The full build spec is docs/build-plan.md. Execute phases in order,
  STOP after each phase for approval, and keep the build deployable
  (npm run build + npm run dev clean) at every checkpoint.
- Do NOT add flair outside the spec: no glassmorphism, neomorphism,
  skeuomorphism, gradients (except palette temperature transitions),
  particles, custom cursors, sound, decorative SVGs, lorem ipsum, or
  UI libraries beyond what the plan specifies.

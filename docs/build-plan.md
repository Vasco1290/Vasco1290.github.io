# MASTER BUILD PROMPT v2 — Material Coherence Portfolio

**Repo:** `Vasco1290/Vasco1290.github.io`
**Branch:** `redesign/material-coherence`

---

## CONTEXT & PIVOT

Previous plan used a 3D `.glb` cyborg head as centerpiece. That is **ABANDONED**. New direction: the cyborg reference image lives in the hero as a 2D image, and the ENTIRE UI is built from materials that belong to the cyborg's world — porcelain, chrome, carbon composite, cyan-emissive traces. This is called **"Material Coherence."**

The site descends through a material-temperature gradient across seven acts, with cyan as the emissive throughline appearing in every section.

---

## EXECUTION RULES (READ FIRST, APPLIES TO ALL PHASES)

1. Execute PHASE 0 through PHASE M in order. **STOP after each phase**, commit with phase tag, wait for approval before proceeding.
2. Do NOT add: glassmorphism, neomorphism, skeuomorphism, gradients (except palette temperature transitions), particles, custom cursors, sound, decorative SVGs, lorem ipsum, UI libraries beyond what's specified, extra colors outside the palette.
3. Every phase remains deployable. `npm run build` succeeds and `npm run dev` renders cleanly at every checkpoint.
4. Re-view the visual references before every visual decision. Also re-read this prompt's Design System section at the start of each phase.
5. Screenshot each checkpoint and report back.

---

## DESIGN SYSTEM (SOURCE OF TRUTH)

### Palette — seven neutrals + one emissive

| Token | Hex | Material |
|-------|-----|----------|
| bone | `#EAE5DC` | warm cream, slightly aged |
| porcelain | `#FAFAFA` | cold clean white |
| chrome | `#C8CDD2` | brushed steel grey |
| graphite | `#3A3A3A` | carbon composite |
| charcoal | `#1A1A1A` | deep engineered black |
| void | `#0A0A0A` | true black |
| cyan | `#00E5FF` | emissive electric cyan |

### Cyan Usage Rules

**Allowed:** emissive glow, hover/active state, key numeric metrics, focus rings (as glowing traces, not outlines), single-word emphasis in body text.

**Forbidden:** body paragraph text, backgrounds, borders larger than 1px, filled shapes, flat color blocks.

### Typography

- **Display:** Anton (Google Fonts), minimum 96px on hero, 64px on section headers
- **Body:** Inter (Google Fonts), 16px base, line-height 1.6
- **Numeric metrics:** Inter tabular-nums, cyan color allowed
- **Rule:** never mix more than these two families

### Spacing

- 8px baseline grid
- Max content width: 1440px
- Section padding: 120px desktop / 60px mobile

### Motion

- Default easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- Micro: 400ms | Component entrance: 800ms | Hero/act reveals: 1200ms

### Material Coherence Principle

Every UI element (buttons, dividers, cards, section labels) is visually made from a material that exists in the cyborg subject's world. Specific treatments:

- Section dividers = 1px chrome-gradient bars, not flat lines
- Buttons = porcelain tiles with subtle surface texture, cyan emissive traces on hover
- Cards = chrome-edged, off-white fill with a hairline metal trim
- Numbers/metrics = engraved into surface (subtle inset shadow) OR extruded (subtle drop shadow) depending on section material
- Focus states = cyan emissive traces (glowing), never colored outlines
- Loading states = cyan pulse, matching cyborg vein glow

---

## ACT STRUCTURE (7 SECTIONS, MATERIAL TEMPERATURE DESCENT)

| Act | Section | Background | Material |
|-----|---------|-----------|----------|
| I | Hero | bone | warm porcelain |
| II | About | porcelain | clean ceramic |
| III | Research | chrome | brushed steel |
| IV | Projects | graphite | carbon composite |
| V | Hardware | split chrome + charcoal (50/50) | duality |
| VI | Vision | void | pure darkness + neon |
| VII | Contact | bone | return to warmth |

Transitions between acts are **SMOOTH color interpolations** (400ms during scroll), not hard cuts.

---

## REFERENCE ASSETS SETUP (do before Phase A)

Save the three provided images to `docs/design/`:

- `hero-subject.png` — the vertical portrait
- `material-reference.png` — the wider material study
- `composition-reference.png` — the banner with SYNTHESIS type

If `docs/design/banner-reference.png` exists and matches `composition-reference.png`, delete the old file after saving the new one.

Update `CLAUDE.md` — replace the existing "Canonical Visual Reference" section with:

```markdown
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
```

Commit as: `add multi-reference assets and update visual reference docs`

---

## PHASE 0 — RESET & PALETTE INSTALL

1. If working tree has uncommitted 3D scaffold work, prompt me before discarding.
2. Uninstall (if present): `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `leva`, `three`. These will be REINSTALLED in Phase G for the Research section only.
3. Update `tailwind.config.js` — replace colors object with:
   ```js
   colors: {
     bone: '#EAE5DC',
     porcelain: '#FAFAFA',
     chrome: '#C8CDD2',
     graphite: '#3A3A3A',
     charcoal: '#1A1A1A',
     void: '#0A0A0A',
     cyan: '#00E5FF',
   }
   ```
4. Verify Anton + Inter fonts still loaded in `index.html`.
5. Update `CLAUDE.md` with the new Design System section from this prompt (palette, typography, spacing, motion, material coherence).
6. Set html/body: `bg-bone`, `text-graphite`, `font-body`.
7. **Commit:** `phase 0: palette reset for material coherence`

---

## PHASE A — HERO (Act I, bone background)

Delete previous Hero component. Build fresh.

### Layout

- Full viewport, `bg-bone`
- Hero image at `docs/design/hero-subject.png` rendered as `<img>` positioned right-of-center, 60% viewport height, `object-fit: contain`
- Type "HARSHIT" and "RAWAL" in Anton, 240px desktop / 96px mobile
- Type positioned so the image partially occludes the letterforms (SAME compositional rule as the banner — subject in front, type behind)
- Type color: graphite (`#3A3A3A`) — NOT pure black, so it feels carved into the bone surface, not printed on top
- Add subtle inset shadow to type: `text-shadow: inset 2px 2px 4px rgba(0,0,0,0.15)` to suggest carved-into-porcelain effect

### Motion

- On load: image fades opacity 0→1 and scales 1.05→1 over 1200ms
- Type wipes up letter-by-letter (mask reveal) starting at 400ms, stagger 60ms per letter
- Cursor parallax: image translates ±10px based on mouse position, spring physics via Framer Motion `useMotionValue` + `useSpring` (stiffness 100, damping 20). Disable on touch devices via `matchMedia('(hover: hover)')`.
- Subtle breathing on image: scale 1→1.01→1 over 4s loop, ease-in-out

### Below hero

- Chrome-gradient divider bar, 1px height, 40% width, centered
- Small caption in Inter 14px: "MS Applicant Fall 2027 · Perception Under Uncertainty · Mumbai"

**CHECKPOINT A:** Hero renders with image + type, occlusion works, cursor parallax feels present but subtle, breathing is barely perceptible (this is intentional — not seasick).

**Commit:** `phase A: hero with cursor parallax + carved type`

---

## PHASE B — LENIS SMOOTH SCROLL + SECTION SHELLS

1. Install: `lenis` (check current package name), `framer-motion`, `gsap`, `@gsap/react`
2. Wrap App in Lenis root (lerp 0.1, smoothWheel true)
3. Create six additional section shells beyond Hero:
   `AboutSection`, `ResearchSection`, `ProjectsSection`, `HardwareSection`, `VisionSection`, `ContactSection`
4. Each section: `min-h-screen`, correct bg color per Act table above
5. Add placeholder Anton 96px heading per section:
   - About: "Perception Under Uncertainty"
   - Research: "Published Work"
   - Projects: "Selected Engineering"
   - Hardware: "Systems & Silicon"
   - Vision: "Synthesis Labs"
   - Contact: "Work Together"
6. Section numbers in Anton 32px, cyan, top-left of each section (01, 02, 03, ...)
7. Chrome-gradient divider bars between sections

**CHECKPOINT B:** Site scrollable through 7 sections with correct background colors, smooth Lenis scroll, no janky transitions.

**Commit:** `phase B: scroll architecture + section shells`

---

## PHASE C — MATERIAL COMPONENT LIBRARY

Build reusable components in `src/components/ui/`:

- **`<ChromeDivider />`** — 1px horizontal bar with subtle chrome gradient (linear-gradient from transparent → chrome → transparent). Optional width prop.
- **`<PorcelainCard />`** — off-white card with hairline chrome trim (1px border, chrome color, subtle inner shadow). Rounded 4px, generous padding. On hover: subtle cyan trace appears along top edge (1px cyan, box-shadow glow bleeding into content).
- **`<EmissiveTrace />`** — 1px cyan line with box-shadow glow (`0 0 8px cyan, 0 0 16px cyan/50%`). Used for focus states, active indicators, key underlines.
- **`<EngravedText>`** — text with inset shadow effect, appears carved into surface. Takes children + optional depth prop.
- **`<ExtrudedText>`** — text with drop shadow, appears raised. Same API as EngravedText.
- **`<MetricNumber>`** — large Anton numeric, tabular-nums, cyan color, with subtle glow. For stats and metrics.

**CHECKPOINT C:** Component library documented in a `/debug` route showing all components rendered together on bone background.

**Commit:** `phase C: material component library`

---

## PHASE D — ABOUT SECTION (Act II)

Background: porcelain (`#FAFAFA`)

### Content structure (placeholder text — real copy comes later)

- Section number "02" in cyan, top-left
- Heading "Perception Under Uncertainty" using `<ExtrudedText>` (extruded from porcelain surface)
- Below: Inter body paragraph, ~80 characters wide, graphite color, describing the research identity
- Right side: 3 `<MetricNumber>` stats stacked vertically:
  - "1" Published preprint
  - "2yr" AV perception at Autonex
  - "3" Hardware research projects

### Horizontal scroll band (innovative element for this section)

- As user scrolls vertically through this section, a band of Anton text 200px tall moves HORIZONTALLY across viewport
- Text reads: `PERCEPTION · UNCERTAINTY · EDGE · ROBOTICS · CONFORMAL PREDICTION · DISTRIBUTION SHIFT · SAFETY CRITICAL ·`
- Text is 240px Anton, chrome color (fading against porcelain bg)
- GSAP ScrollTrigger drives horizontal position
- Effect: as you scroll down, keywords sweep past horizontally, making YOUR IDENTITY the moving typography

### Entrance animations

- Heading extrudes up (translateZ effect) over 1200ms on scroll into view
- Metrics count up from 0 with cyan pulse when in view
- All using Framer Motion `whileInView`, `once: true`

**CHECKPOINT D:** About section reads as identity declaration, horizontal text band creates spatial dimension against vertical scroll, extruded text has clear depth.

**Commit:** `phase D: about section with horizontal keyword band`

---

## PHASE E — PROJECTS SECTION (Act IV, jumping ahead)

Background: graphite (`#3A3A3A`)
Text color: bone (light on dark)

### Layout: FULL-WIDTH HORIZONTAL BANDS, not cards in a grid

Each project = one band, min-height 40vh, full viewport width:

- **Left 30%:** massive Anton project number ("01", "02", "03") in cyan
- **Middle 40%:** project name in Anton 64px extruded (bone color), one-sentence description in Inter body
- **Right 30%:** one key metric using `<MetricNumber>` + GitHub link as `<EmissiveTrace>` underline

Bands stack vertically. Between bands: 1px cyan divider (not chrome here — the dark bg calls for cyan traces).

### Placeholder projects (real content comes later)

- 01 RPO Paper — PURSE extension for tumbling spacecraft
- 02 RSSI Conformal — WiFi localization on Pi Zero + ESP8266
- 03 CloudLab v2 — Go-based collaborative dev environment
- 04 Mammoth — Rust rewrite of Hadoop from scratch

### Motion

- Bands slide in from opposite sides on scroll (01 from left, 02 from right, alternating), staggered
- Project numbers scale-up from 0.9 to 1 with 400ms ease
- Hover on band: subtle emissive cyan trace appears along top edge, metric number pulses

**CHECKPOINT E:** Projects feel like magazine spread pages flipping past, not a grid of boxes. Each project has visual weight.

**Commit:** `phase E: projects as horizontal bands`

---

## PHASE F — HARDWARE SECTION (Act V, split-screen)

Background: SPLIT 50/50 vertical — left: chrome, right: charcoal
Header spans both halves.

### Left half (chrome bg, graphite text)

- "SILICON" label, Anton 32px, engraved treatment
- RSSI project details
- Small metric: sensor accuracy, coverage number

### Right half (charcoal bg, bone text)

- "SYSTEMS" label, Anton 32px, extruded treatment
- Autonex work details
- Small metric: annotation throughput or dataset scale

### Reveal

At scroll-into-view: the split reveals like curtains parting — left half slides in from left, right half slides in from right, staggered 200ms, 1200ms duration each.

### Cyan vein motif

A single 1px cyan trace runs across the split line vertically down the section, glowing subtly. This is the "through-line" that ties the two halves.

**CHECKPOINT F:** Split-screen composition reads as intentional duality (silicon/systems). Reveal animation feels cinematic.

**Commit:** `phase F: hardware split-screen`

---

## PHASE G — RESEARCH SECTION WITH 3D (Act III)

Background: chrome (`#C8CDD2`)

Reinstall for THIS SECTION ONLY: `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`

### Layout

**Left half: text content**
- Section number "03" in cyan
- Heading "Published Work" using `<EngravedText>`
- Paper title: "Uncertainty-Aware Pose Estimation for Tumbling Spacecraft via Conformal Prediction (extending PURSE)"
- One-paragraph abstract in Inter
- arXiv link as `<EmissiveTrace>` underlined text
- Key result: coverage % and efficiency % as `<MetricNumber>`

**Right half: R3F canvas with PROCEDURAL geometry (no `.glb` file)**
- Torus knot geometry OR custom shape suggesting a tumbling body
- MeshStandardMaterial: chrome-metallic (metalness 0.9, roughness 0.2), with cyan emissive edges via wireframe overlay
- Slow tumbling animation on 2 axes (0.003 and 0.005 rad/frame) — genuinely represents the paper's subject
- Environment preset "warehouse" from drei for reflections
- Postprocessing: Bloom on cyan emissive edges only

### Adaptive rendering

- Detect WebGL support and GPU tier
- Low tier / no WebGL: fallback to animated SVG diagram of the same shape (still tumbling, but 2D)

**CHECKPOINT G:** Research section is the site's "wow" moment — the 3D shape is EARNED because it represents the actual paper. Fallback works cleanly on low-tier devices.

**Commit:** `phase G: research with earned 3D geometry`

---

## PHASE H — VISION SECTION (Act VI, the emotional peak)

Background: void (`#0A0A0A`)
Text color: bone

Massive Anton "SYNTHESIS LABS" — 320px desktop, treated as **CYAN NEON TRACE**: transparent fill, cyan stroke (1px), box-shadow glow bleeding outward. This is the ONE moment where cyan takes over.

Below: one paragraph of Inter body, ~80 characters wide, bone color, describing the long-term vision.

### Domain pills

Below paragraph: 8 domain "pills" arranged in a loose scatter:

`Robotics · Embodied AI · BCI · Exoskeletons · HRI · Distributed Systems · Embedded · Space Robotics`

Each pill:
- Porcelain-tile visual (small padding, hairline chrome border, bone text on charcoal fill)
- Continuous ambient drift animation — pills slowly translate ±20px in random directions on 6-8 second loops with subtle rotate ±3deg
- Framer Motion `useAnimate` with continuous animation refs
- Hover: pill pauses drift, cyan trace appears on top edge

**Effect:** the pills feel like specifications for a future that hasn't solidified yet — always in motion, never settled.

### Optional atmospheric enhancement

Add `docs/design/material-reference.png` as a background element — positioned lower-right, opacity 0.08, `mix-blend-mode: luminosity`, giving the void bg subtle texture depth without competing with the neon-trace "SYNTHESIS LABS" type.

**CHECKPOINT H:** Vision section reads as manifesto. Neon-trace "SYNTHESIS LABS" is the site's emotional apex. Pill drift feels alive but not distracting.

**Commit:** `phase H: vision as manifesto`

---

## PHASE I — CONTACT SECTION (Act VII, return)

Background: bone (back to warmth — closes the visual loop)

### Sparse layout

- Small chrome divider at top
- "WORK TOGETHER" in Anton 96px, engraved treatment
- Three lines below, Inter 18px:
  - Email — `harshitrawal72@gmail.com` (as `<EmissiveTrace>` link)
  - GitHub — Vasco1290 (as `<EmissiveTrace>` link)
  - LinkedIn — Harshit Rawal (as `<EmissiveTrace>` link)
- Below links: small Inter 14px caption: "Mumbai, India · Responds within 48h"

### Motion

- Section fade-in on scroll, 1200ms
- Links have cyan trace that grows from left on hover (600ms)

**CHECKPOINT I:** Contact section feels like closing credits, not a form. Return to bone bg feels like completion.

**Commit:** `phase I: contact closing`

---

## PHASE J — CROSS-SECTION TRANSITIONS (color interpolation)

Between each section, implement smooth 400ms bg color transitions as user scrolls across boundary. Not instant flips.

### Technique

- Use GSAP ScrollTrigger with scrub to interpolate `document.body` bg color between adjacent section colors
- Ensure text colors also transition (graphite → bone → graphite across dark sections)

**CHECKPOINT J:** Scrolling through all 7 sections feels like a temperature descent and return, not a strobe of color flips.

**Commit:** `phase J: smooth cross-section transitions`

---

## PHASE K — ADAPTIVE + MOBILE

1. Install `detect-gpu`
2. GPU tier detection:
   - **Low:** no R3F in Research (use SVG fallback), simpler animations, no cursor parallax on hero
   - **Medium:** R3F with `dpr [1, 1.5]`, no postprocessing
   - **High:** full experience
3. Mobile (< 768px):
   - All Anton display type scales down 60%
   - Horizontal text band in About: still runs but shorter
   - Projects bands stack vertically (already do), reduce padding
   - Hardware split-screen becomes stacked halves (top/bottom instead of left/right)
   - Vision pills reduce to 6, less drift range
   - Cursor parallax disabled

**CHECKPOINT K:** Test in DevTools mobile emulation with CPU 6x throttle. Everything smooth and legible at 375px width.

**Commit:** `phase K: adaptive rendering + mobile`

---

## PHASE L — PERFORMANCE PASS

1. Bundle analysis: `npm run build && du -sh dist/`
   Target: **under 3MB total** (no `.glb` file → much lighter than original plan)
2. Image optimization: hero image → WebP or AVIF, multiple resolutions via `<picture>` element for responsive loading
3. Lazy-load Research section 3D (only mount when scrolled near)
4. Preload critical fonts with `<link rel="preload">`
5. Lighthouse targets: Perf > 90, A11y > 95, Best Practices > 95, SEO > 95
6. Report scores

**CHECKPOINT L:** Lighthouse scores meet targets. Bundle under 3MB.

**Commit:** `phase L: performance pass`

---

## PHASE M — PREVIEW DEPLOY

1. Deploy `redesign/material-coherence` branch to preview environment (Netlify or Vercel free tier — better preview UX than `gh-pages-preview`)
2. Verify all 7 sections work end-to-end at preview URL
3. Test on real mobile device if possible
4. Report preview URL

**CHECKPOINT M:** Live preview URL accessible. Full end-to-end experience validated.

**Commit:** `phase M: preview deploy live`

---

## POST-M (do not start without instruction)

- Real content copy for all 7 sections
- Real project data (arXiv link, GitHub links, actual metrics)
- SEO meta tags, OG image (use banner), favicon
- Merge `redesign/material-coherence` → `main`

**STOP after Phase M and wait for content instructions.**

---

## FINAL RULES

- STOP after each phase. Don't chain silently.
- If a spec conflicts with `CLAUDE.md`, follow `CLAUDE.md` and flag it.
- Screenshot each checkpoint and share.
- Do NOT touch `main` branch.
- If a phase fails, STOP and ask — do not paper over silently.
- If you're tempted to add flair not in this spec — don't.

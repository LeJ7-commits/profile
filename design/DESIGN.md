# Design system

Adapted from the **monopo saigon** style reference (refero.design): *a monochrome
editorial gallery floating on molten light.*

Tokens live in two places, kept in sync by hand:

| File | Purpose |
|------|---------|
| `src/styles/tokens.css` | Runtime source. A Tailwind v4 `@theme static` block, so each token is a utility class **and** a CSS variable. |
| `design/tokens.json` | The same tokens in W3C DTCG format, for Figma / Style Dictionary. |

## Principles kept from the reference

- **Monochrome interface.** Black, white and a few greys. Tailwind's default palette is wiped
  (`--color-*: initial`), so a stray `bg-blue-500` won't compile.
- **Colour is media, never UI.** Aurora colour shows up only as backdrop light (see below), never
  as text, borders or controls.
- **Radius is 0 or pill.** Cards, images and links are sharp. Buttons and tags are 75px pills.
  Nothing in between.
- **No shadows.** Surfaces separate through black/white bands and 1px hairlines.
- **Whisper weights.** 78px headlines at weight 300, display at 400. Never 600+ above 45px.
- **Patient motion.** `cubic-bezier(0.19, 1, 0.22, 1)` at 0.8–1.25s. Reveals use transforms only,
  and `prefers-reduced-motion` turns them off.
- **Editorial layout.** 1078px container, a 180px index column, left-aligned copy,
  single-column project rows.

## Deliberate departures

| Reference | Here | Why |
|-----------|------|-----|
| Iridescent sage → amber → oxblood | **Aurora:** green `#7cf2c5` → glacier blue `#5ab8ff` → violet `#8b5cf6` → night indigo `#140b3a` | Personal grade. Nordic aurora over a Stockholm night, and it reads as "data in motion" rather than "creative agency". |
| One chromatic gesture per page (hero only) | **Aurora everywhere, subtle:** the live shader in the hero and, dimmed 78%, behind the Nei.10X band; soft drifting washes (`AuroraWash`, `--aurora-wash-opacity: 0.2`) behind headings, metrics and contact; aurora dots in the stack marquee | Jay's call: carry the motion through the page while keeping all text and controls monochrome. |
| Video / canvas media | A small WebGL shader (`src/scripts/aurora.ts`) that reads the `--aurora-*` tokens | About 3 KB instead of a video. Pauses when off-screen, holds a still frame under reduced motion, and falls back to a CSS gradient without WebGL. |
| Roobert | Inter Variable (self-hosted via Fontsource) | Roobert is a commercial licence; Inter is the documented substitute. Put Roobert first in `--font-sans` if you license it. |
| Fixed px type scale | Fluid `clamp()` down to phone sizes | The 225px display has to survive at 390px wide. |
| Project imagery | Typeset pipeline "covers" (`Producer → S3 → Bronze → …`) on obsidian | Data work has no product photos. The architecture is the image. |
| Language switcher (EN / VN / 中文) | Location marker, `Stockholm · 59.33° N` | Single-language site. |

## Motion inventory

All motion lives in `src/scripts/motion.ts` and `src/styles/global.css`. It is plain TypeScript and
CSS, with no React or animation library. Every effect is progressive enhancement: the content is
final and readable without JavaScript, and `prefers-reduced-motion` turns all of it off.

| Effect | Where | How |
|--------|-------|-----|
| Live aurora | Hero; Nei.10X (dimmed) | `AuroraCanvas.astro` → WebGL shader reading `--aurora-*` tokens; pauses when off-screen |
| Drifting wash | About, metrics, Work, Experience, Toolkit, Contact | `AuroraWash.astro`: three blurred token-coloured blobs, transform-only keyframes |
| Word rise | Hero name, section titles, Nei.10X title and tagline, contact CTA | `SplitText mode="rise"`: words are split at build time and slide up from a mask, staggered 55ms |
| Word scrub | About manifesto | `SplitText mode="scrub"`: words brighten from 16% to full ink with scroll progress |
| Count-up | Headline metrics | `data-count-*` attributes with an ease-out-expo tween over 1.8s; tabular figures prevent layout shift |
| Stacking cards | Selected work (≥1024px) | Sticky cards offset 14px each; covered cards scale to 95% and fade. Turns itself off if a card is taller than the viewport |
| Magnetic pills | All pill buttons (fine pointers only) | Buttons move up to 6px toward the cursor, easing back with `--ease-glide` |
| Marquee | Between Experience and Nei.10X | Two copies of the list scroll with a linear 60s loop; pauses on hover |

Why not a component library (e.g. Skiper UI): those components are React + Framer Motion, and
most are paid. These effects cost a few KB of plain script and follow the design tokens directly.

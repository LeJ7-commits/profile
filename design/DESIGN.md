# Design system

Adapted from the **monopo saigon** style reference (refero.design): *a monochrome
editorial gallery floating on molten light.*

Tokens live in two places, kept in sync by hand:

| File | Purpose |
|------|---------|
| `src/styles/tokens.css` | Runtime source. A Tailwind v4 `@theme static` block, so each token is a utility class **and** a CSS variable. |
| `design/tokens.json` | The same tokens in W3C DTCG format, for Figma / Style Dictionary. |

## Principles kept from the reference

- **Near-monochrome interface.** Ink and paper tinted a few degrees toward the green anchor (`#070c0a`, `#f9faf7`), plus a few greys. Tailwind's default palette is wiped
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
| Iridescent sage → amber → oxblood | **Aurora:** deep forest ink, jade `#32a886` and deep teal `#0e4c40`, with pale gold `#ecc470` kept to thin highlights | One anchor hue (green) with a warm accent. Violet and blue were dropped: Hallmark's Floor bans the purple-to-blue gradient as the stock generated look. Nordic aurora over a Stockholm night. |
| One chromatic gesture per page (hero only) | **Aurora everywhere, subtle:** the live shader in the hero and, dimmed 78%, behind the Experience band; soft drifting washes (`AuroraWash`, `--aurora-wash-opacity: 0.2`) behind the light sections' headings, metrics and contact; aurora dots in the stack marquee | Jay's call: carry the motion through the page while keeping all text and controls monochrome. |
| Video / canvas media | A small WebGL shader (`src/scripts/aurora.ts`) that reads the `--aurora-*` tokens | About 3 KB instead of a video. Pauses when off-screen, holds a still frame under reduced motion, and falls back to a CSS gradient without WebGL. |
| Roobert | Inter Variable (self-hosted via Fontsource) | Roobert is a commercial licence and is no longer in the font stack, since nothing loads it. Add it back to `--font-sans` if you license it. |
| Fixed px type scale | Fluid `clamp()` down to phone sizes | The 225px display has to survive at 390px wide. |
| Uppercase tracked nav and labels (11px) | Sentence-case labels in the body face at 14px, untracked | Hallmark's Floor (gate 67) rules out tracked capitals as the stock label. Section labels above headings were removed too (gate 54): each heading names its own section. |

## Motion inventory

All motion lives in `src/scripts/motion.ts` and `src/styles/global.css`. It is plain TypeScript and
CSS, with no React or animation library. Every effect is progressive enhancement: the content is
final and readable without JavaScript, and `prefers-reduced-motion` turns all of it off.

| Effect | Where | How |
|--------|-------|-----|
| Live aurora | Hero; Experience (dimmed) | `AuroraCanvas.astro` → WebGL shader reading `--aurora-*` tokens; pauses when off-screen |
| Drifting wash | About, metrics, Toolkit, Contact | `AuroraWash.astro`: three blurred token-coloured blobs, transform-only keyframes |
| Word rise | Hero name, About manifesto, section titles, current employer, contact CTA | `SplitText mode="rise"`: words are split at build time and slide up from a mask, staggered 55ms |
| Word scrub | Available, currently unused | `SplitText mode="scrub"`: words brighten with scroll progress. Taken off the manifesto because a faded headline fails a 15-second skim |
| Count-up | Headline metrics | `data-count-*` attributes with an ease-out-expo tween over 1.8s; tabular figures prevent layout shift |
| Magnetic pills | All pill buttons (fine pointers only) | Buttons move up to 6px toward the cursor, easing back with `--ease-glide` |
| Marquee | Between Experience and Toolkit | Two copies of the list scroll with a linear 60s loop; pauses on hover |

Why not a component library (e.g. Skiper UI): those components are React + Framer Motion, and
most are paid. These effects cost a few KB of plain script and follow the design tokens directly.

## Hallmark polish pass (2026-10-30)

A polish-depth run of the Hallmark design skill: the layout, type and system stay, and only what its gates name changed.
It went from 12 FAIL and 17 REFLEX to 0 and 0 (linted with `sloplint --render`, 20 of 20 links kept).

| Changed | Gate |
|---------|------|
| Aurora palette re-graded off violet and blue | 2a |
| Ink and paper tinted instead of pure black and white | 7b |
| Labels in sentence case, untracked; eyebrow labels removed; hover no longer changes letter-spacing | 54, 67 |
| Glued arrows, dot-joined strings and decorative dots removed | 63 |
| Spacing through tokens; pressed (`:active`) states added; focus rings appear instantly | 24a, 26b, 15 |
| `overflow-x: clip` on `html` and `body`; balanced heads; short certification labels | 34, F3, 49b |
| Contrast on the hero nav and sentence (scrim); visually hidden duplicate headings removed | 40, 41, 44d |

Printed, not rebuilt (structural, so a deeper redesign would settle them): 58 (the Experience screen carries 167 words against a budget of about 80) and 59 (one section gap of 49px).

The stamp at the top of `src/styles/global.css` records the run.

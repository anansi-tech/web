# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build (standalone output)
npm run start    # serve the production build
```

No test suite. No linter configured. Type-check is not set up (plain JS, not TypeScript).

## Architecture

Next.js 14 App Router, React 18, Tailwind CSS 3. No backend — purely a marketing/landing site.

**Pages** (`app/`):
- `/` — homepage with full-page hero, product sections (Spice, Kairo, CaribCoin, pillars), stats, CTA
- `/spice` — dedicated Spice product page
- `/caribcoin` — CaribCoin charter page

**Layout** (`app/layout.js`): wraps every page with `<Header>`, `<Footer>`, and `<ScrollReveal>`. Fonts are loaded here and exposed as CSS variables (`--font-display` → Satoshi, `--font-body` → DM Sans, `--font-mono` → JetBrains Mono), then wired to Tailwind's `font-display`, `font-body`, `font-mono` utilities.

**Components** (`components/`):
- `Header.js` — client component; scroll-aware sticky nav. Detects whether the nav is scrolled past the hero (shows/hides the wordmark logo accordingly) and whether it's over a light-background section (`section-light` / `bg-anansi-white` selector) to flip between dark and light text/backdrop. The CTA label changes to "Launch App" on `/spice`.
- `ScrollReveal.js` — client component; uses `IntersectionObserver` to add the `visible` class to `.reveal` and `.reveal-stagger` elements as they enter the viewport. Re-initializes on pathname change.
- `Footer.js` — static footer.

## Design System

All colors are in `tailwind.config.js` under the `anansi` namespace. Key tokens:
- `anansi-black` (`#0A0A0B`) — primary page background
- `anansi-red` (`#DC2626`) — brand accent, used for all primary CTAs and highlights
- `anansi-gray-{300,400,500}` — body copy hierarchy on dark backgrounds
- `anansi-line` (`#1F1F23`) — dividers/borders on dark surfaces
- `anansi-white` (`#FAFAF7`) — used on light "inverted" sections

**Animation classes** (defined in `globals.css`):
- `.reveal` — fades up on scroll (managed by `ScrollReveal`)
- `.reveal-stagger` — staggered fade-up for child elements (auto-delays up to 5 children)
- `.animate-fade-up`, `.animate-fade-up-delay-{1,2,3}` — CSS keyframe animations for the hero (fire once on load)
- `.section-light` — marks a section with a white background so `Header` can flip its color scheme

**Brand assets** live in `public/brand/` (not committed to the repo; supply separately):
- `public/brand/symbol/anansi-symbol-color1.svg` — hero symbol
- `public/brand/symbol/anansi-symbol-dark.svg`, `anansi-symbol-white.svg` — nav logo variants
- `public/brand/wordmark/anansi-wordmark-primary.svg`, `anansi-wordmark-dotted.svg` — wordmark variants

## Deployment

`next.config.js` sets `output: 'standalone'`, so `npm run build` produces a self-contained Node server in `.next/standalone/`. The live site is `anansi.xyz`; Kairo is a separate subdomain at `kairo.anansi.xyz`. The Spice app lives at `spice.anansi.xyz` (external, linked from nav).

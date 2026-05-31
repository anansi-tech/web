# Round 36 — Brand v5 adoption: fix broken assets, align palette to official colors, rebrand meta

**Repo:** `web` (Next.js 14 App Router marketing site)

**Context:** The official brand pack lives at `public/v5/` but the code was never wired to it — every logo/favicon path in the code points at a `public/brand/` and `public/favicon/` layout that DOES NOT EXIST, so the nav logo, footer logo, hero marks, and favicon are all currently 404ing. Separately, the Tailwind tokens and hardcoded hexes use an off-brand red (`#DC2626`) and black (`#0A0A0B`) instead of the official palette. This round adopts v5 end to end.

**Official palette (authoritative — from `public/v5/colors.json`):**
- `void_black` = `#050505`
- `hunt_red` = `#C1121F`
- `ash_white` = `#F7F7F2`

**Red system = "B" (decided):** `#C1121F` is the canonical brand/logo red. Derive a UI scale from it — do NOT invent unrelated reds:
- `red` (primary, brand) = `#C1121F`
- `red-deep` (hover/pressed) = `#9E0E18`
- `red-bright` (focus rings, glows, gradients) = `#E11D2A`

CLAUDE.md applies: surgical, match existing structure, don't refactor working logic. Do NOT redesign layout, copy (except the meta strings in Task 5), or the Header scroll behavior — only swap asset paths, colors, and metadata.

---

## Step 0 — Inventory first (report, don't edit)

```bash
grep -rn "/brand/\|/favicon/" app components
grep -rn "DC2626\|220,38,38\|153,27,27\|0A0A0B\|#0A0A0A" app components
ls public/v5/brand/symbol/svg public/v5/brand/wordmark/svg public/v5/favicon public/v5/favicon/wordmark public/v5/social
```
Report all hits. Confirm the v5 files referenced in the tasks below all exist before editing.

---

## Task 1 — Tailwind tokens → official palette (`tailwind.config.js`)

In the `anansi` color namespace:
- `black`: `#0A0A0B` → `#050505`  (void_black; primary page bg)
- `deep`: `#050507` → `#000000`  (deepest, behind elevated)
- keep `surface`/`elevated` but re-tune to sit above pure void: `surface` `#0E0E10`, `elevated` `#161618`
- `red`: `#DC2626` → `#C1121F`  (brand)
- `red-deep`: `#991B1B` → `#9E0E18`  (hover/pressed)
- `red-glow`: `#EF4444` → `#E11D2A`  (rename intent to "bright"; keep the key name `red-glow` for compat OR add `red-bright` as an alias — do NOT remove `red-glow`, it's referenced)
- `red-muted`: `#7F1D1D` → `#7A0B14`  (deepened to match new brand red family)
- `white`: `#FAFAF7` → `#F7F7F2`  (ash_white)
- Leave gray scale, line tokens, legacy `cream/light/border` as-is (used by /spice and /caribcoin — don't break them).

## Task 2 — Header logo paths + red (`components/Header.js`)

Replace the broken symbol + wordmark sources with real v5 files. **Use the MONO wordmark in nav** (not full-color) — the red "A" must not compete with the red CTA button.
- Spider mark (the `pastHero` fade-in block):
  `light ? "/v5/brand/symbol/svg/anansi-symbol-fullcolor-transparent.svg" : "/v5/brand/symbol/svg/anansi-symbol-fullcolor-transparent.svg"`
  (the full-color symbol works on both; the mark is black+red and reads on light and dark. Keep the single source for both states — remove the dark/white branching since those files don't exist.)
- Wordmark:
  `light ? "/v5/brand/wordmark/svg/anansi-wordmark-mono-black.svg" : "/v5/brand/wordmark/svg/anansi-wordmark-mono-white.svg"`
  Update `width`/`height` to the real SVG intrinsic ratio (these wordmark SVGs are ~1117×123 viewBox — set width/height props accordingly, e.g. 1117 / 123, and keep the existing Tailwind `w-[84px] md:w-[102px] h-auto`).
- **Remove the `invert` hack** on the wordmark — with proper mono-white/mono-black variants you no longer invert; pick the file by `light`.
- Any `rgba(220,38,38,...)` in Header (e.g. CTA hover glow) → `rgba(193,18,31,...)`. `anansi-red` utility classes stay (they now resolve to the new hex automatically).

## Task 3 — Footer logo (`components/Footer.js`)

- Wordmark source → `/v5/brand/wordmark/svg/anansi-wordmark-fullcolor-dark-bg.svg` (footer sits on dark; use the full-color red-A variant here — footer is a fine place for the accent).
- **Remove the `invert` class** (full-color dark-bg variant is already correct for dark).
- Fix width/height props to the real ratio.
- `rgba(220,38,38,...)` glow → `rgba(193,18,31,...)`.

## Task 4 — Homepage + product page asset paths & reds (`app/page.js`, `app/spice/page.js`, `app/caribcoin/page.js`)

- Replace every broken image src with the correct v5 path:
  - hero spider (`/brand/symbol/anansi-symbol-color1.svg`) → `/v5/brand/symbol/svg/anansi-symbol-fullcolor-transparent.svg`
  - any `/brand/symbol/anansi-symbol-dark.svg` → same full-color symbol path
  - `/brand/wordmark/anansi-symbol-transparent.png` (the broken hero wordmark png) → `/v5/brand/wordmark/svg/anansi-wordmark-fullcolor-transparent.svg`
  - `/brand/wordmark/anansi-wordmark-dotted.svg` → `/v5/brand/wordmark/svg/anansi-wordmark-fullcolor-transparent.svg`
  - For the hero, if a large dramatic mark is wanted, the **stacked lockup** is available at `/v5/brand/lockups/svg/anansi-stacked-lockup-fullcolor-transparent.svg` — use it only if it matches the existing layout intent; otherwise keep symbol + separate wordmark as the code currently structures it. Do not redesign the hero.
- Replace SVG gradient stops `#DC2626` → `#C1121F`, and any `rgba(220,38,38,...)` → `rgba(193,18,31,...)`, `rgba(153,27,27,...)` → `rgba(122,11,20,...)`.
- Fix Image `width`/`height` props to match the real SVG ratios so Next/Image doesn't distort.

## Task 5 — Metadata / OG (`app/layout.js`)

- **Favicon → use the "A" wordmark mark** (decided: the spider is illegible at 16px; the A is crisp). Rewrite the `icons` block to the real files under `public/v5/favicon/wordmark/`:
```js
metadataBase: new URL("https://anansi.xyz"),
icons: {
  icon: [
    { url: "/v5/favicon/wordmark/favicon.svg", type: "image/svg+xml" },
    { url: "/v5/favicon/wordmark/favicon-32.png", type: "image/png", sizes: "32x32" },
    { url: "/v5/favicon/wordmark/favicon-16.png", type: "image/png", sizes: "16x16" },
    { url: "/v5/favicon/wordmark/favicon-192.png", type: "image/png", sizes: "192x192" },
    { url: "/v5/favicon/wordmark/favicon-512.png", type: "image/png", sizes: "512x512" },
  ],
  apple: [{ url: "/v5/favicon/wordmark/favicon-180.png", sizes: "180x180", type: "image/png" }],
  shortcut: ["/v5/favicon/wordmark/favicon-32.png"],
},
```
- **Description (drop "identity" — ZK Identity is gone; AI-first):**
  `"Applied AI and decentralized software for markets the world has ignored."`
- **OpenGraph:** add the social card + matching description, keep title:
```js
openGraph: {
  title: "Anansi Technology LLC",
  description: "Applied AI and decentralized software for markets the world has ignored.",
  url: "https://anansi.xyz",
  siteName: "Anansi",
  type: "website",
  images: [{ url: "/v5/social/anansi-social-card-1200x630.png", width: 1200, height: 630, alt: "Anansi" }],
},
```
- Add a matching `twitter` card:
```js
twitter: { card: "summary_large_image", title: "Anansi Technology LLC", description: "Applied AI and decentralized software for markets the world has ignored.", images: ["/v5/social/anansi-social-card-1200x630.png"] },
```
- Body className `bg-anansi-black text-anansi-white` stays (tokens now resolve to brand hexes).

## Task 6 — Update repo CLAUDE.md brand section

In `CLAUDE.md`, fix the now-wrong "Brand assets" block: assets live at `public/v5/`, nav uses mono wordmark variants, footer uses full-color dark-bg, favicon is the "A" wordmark mark, hero uses the spider symbol. Update the design-system hexes to `#050505 / #C1121F / #F7F7F2`. Note the red UI scale (`red` `#C1121F`, `red-deep` `#9E0E18`, `red-bright` `#E11D2A`).

---

## Out of scope (do NOT touch)
- Layout, section copy (except Task 5 meta strings), animations, fonts, Header scroll logic.
- The gray scale, line tokens, legacy cream/light/border.
- /spice and /caribcoin page structure beyond color-token + asset-path swaps.

## Verify
1. `grep -rn "/brand/\|DC2626\|220,38,38\|153,27,27" app components` → returns NOTHING (all paths now `/v5/...`, all reds brand).
2. `grep -rn "/favicon/favicon.ico\|16x16\|android-chrome\|apple-touch-icon" app` → nothing (old favicon names gone).
3. Every `src="/v5/..."` resolves to a file that exists (`ls` each).
4. `npm run build` succeeds.
5. `npm run dev` → nav logo renders (wordmark always, spider fades in on scroll), footer logo renders, favicon shows the red "A" in the tab, reds visibly match the logo's red (not orange), light sections still flip nav correctly.
6. Diff traces every change to a task above.

## Order
1. Step 0 grep + report.
2. Tasks 1–6.
3. Single commit: `Adopt v5 brand: wire real assets, align palette to #050505/#C1121F/#F7F7F2, A-mark favicon, refresh OG`.

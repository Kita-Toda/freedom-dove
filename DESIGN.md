# Unchained — Design System & Review

This document has two jobs:

1. **Part 1 — Design system (as-built):** the source of truth for how Unchained
   looks and moves *right now*. Any new page, component, or AI-generated change
   should match this. It is extracted from the shipped code, not aspirational.
2. **Part 2 — Design review:** an honest 0–10 rating of each design dimension,
   what a 10 looks like, and the specific fix.
3. **Part 3 — Punch-list:** the concrete issues, ordered, with file references.

Stack: Astro 5 + React 18 + Tailwind 3, with three.js (dove), framer-motion
(beams), GSAP + ScrollTrigger (scroll reveals).

Product name in the UI is **"Unchained"** (repo is `freedom-dove`). Mission:
end human trafficking and modern slavery.

---

## Part 1 — Design system (as-built)

## 1.1 Brand & voice

- **Positioning:** premium, editorial, cinematic. Dark canvas, gold light,
  serif display type. Reads closer to a fashion/film site than a typical NGO.
- **Emotional arc:** gravity → hope → action. The dove + beams hero opens with
  weight and light; stats and stories build credibility; every page closes on a
  call to act.
- **Tone:** declarative and mission-forward ("For The Forgotten. For The
  Voiceless.").

## 1.2 Color tokens

Defined in `tailwind.config.cjs` and mirrored as CSS variables in
`src/layouts/Layout.astro`. The palette is **strict** — every hex in `src/`
maps to one of these tokens (verified by grep; no off-palette colors).

| Token | Hex | Role |
|---|---|---|
| `black` | `#0a0a0a` | Base background (top of body gradient), footer |
| `charcoal` | `#1a1a1a` | Card / surface background, bottom of body gradient |
| `gold` | `#d4a574` | Primary accent — CTAs, links, eyebrow labels, primary stat |
| `gold-light` | `#e8c9a0` | Accent variant (link hover, 3rd accent in rotation) |
| `mauve` | `#8b6f8e` | Secondary accent — borders, gradient partner to gold |
| `mauve-light` | `#b8a0b8` | Secondary accent text (readable on dark) |
| `cream` | `#f5f1e8` | Body text, headings on dark |
| `gray-dark` | `#3a3a3a` | Defined; reserve for hairlines / disabled |

**Opacity conventions in use** (apply as `token/NN`):

| Alpha | Use |
|---|---|
| `/80` | Body paragraph text (`text-cream/80`) |
| `/70` | Secondary descriptions, captions |
| `/60`, `/50` | De-emphasized meta, footnotes |
| `/40`, `/30` | Card borders (resting) |
| `/20` | Section dividers, faint borders |

Accent gradients pair gold → mauve: `bg-gradient-to-r from-gold to-mauve`
(dividers, glow washes). Body background is a vertical gradient
`linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)`.

## 1.3 Typography

Loaded from Google Fonts in `Layout.astro`.

| Family | Weights | Role |
|---|---|---|
| **Playfair Display** (serif) | 600/700/900 | All headings (`h1`–`h6`) |
| **Geist** (sans) | 400–900 | Body, labels, buttons, UI |
| **Caveat** (script) | 700 | Handwritten accent — **currently loaded but unused** |

**Heading rule** (global in `Layout.astro`): Playfair Display, weight `900`,
`letter-spacing: -2px`. Pages also inline `style="letter-spacing: -2px"` on
large display headings; that is redundant with the global rule but harmless.

**Display scale in use:** `text-5xl` (stat numbers, sub-heads) → `text-6xl` /
`text-7xl` (section headlines) → `text-8xl` (hero headline, top CTA). Body:
`text-xl` (lead paragraphs), `text-lg` (standard body), `text-sm` (captions,
button labels), `text-xs` (eyebrow labels, footnotes).

**Eyebrow label recipe** (the signature kicker above every section headline):

```text
text-gold text-xs uppercase tracking-[0.2em] font-semibold opacity-80
```

**Tracking tokens** (`tailwind.config.cjs`): `button 0.75px`, `label 0.5px`,
`caption 0.5px`, `heading -0.5px`. Buttons in practice use `tracking-[0.75px]`.

## 1.4 Layout & spacing

- **Section rhythm:** `py-32 px-4 md:px-12`. Hero and major sections are
  `min-h-screen`.
- **Containers:** `max-w-6xl mx-auto` (content-rich pages: index, founder),
  `max-w-4xl mx-auto` (reading pages: about, get-involved), `max-w-2xl` /
  `max-w-3xl` for lead paragraphs.
- **Grid patterns:**
  - 2-col split (text ↔ visual): `grid md:grid-cols-2 gap-16`
  - 3-col stats / stories / actions: `grid md:grid-cols-3 gap-8`
  - 4-col pillars: `grid md:grid-cols-2 lg:grid-cols-4 gap-8`
- **Divider convention:** `border-t border-gold/20 pt-16` between sections on
  reading pages.

## 1.5 Components

Repeated patterns, documented as named specs. React implementations live in
`src/components/ui/` (see that folder's `README.md` and `USAGE.md`); the
Astro pages inline the same recipes.

**Glass Card** (the workhorse surface):

```text
bg-charcoal/50 border border-{accent}/30 rounded-2xl p-8 backdrop-blur-sm
hover:border-opacity-100 transition-colors duration-300
```

Optional blurred glow behind it:

```text
absolute -inset-2 bg-gradient-to-r {glow} rounded-2xl opacity-0
group-hover:opacity-100 transition-opacity duration-300 blur-xl
```

**Stat Card** (`StatCard.tsx`): Glass Card + `text-5xl font-black {accent}`
number, `text-lg font-bold text-cream` label, `text-sm text-cream/70` desc.

**Story Card:** Glass Card, `rounded-2xl p-8 md:p-12`, headline in accent,
region tag in `text-cream/60 uppercase tracking-wider`.

**Eyebrow Label:** see the recipe in §1.3.

**Pill Button** — two variants, always fully rounded:
- Filled: `px-8 py-4 bg-gold text-black font-bold rounded-full uppercase text-sm tracking-[0.75px] hover:scale-[1.02] transition-transform duration-200`
- Outline: `px-8 py-4 border-2 border-gold text-gold font-bold rounded-full uppercase text-sm tracking-[0.75px] hover:bg-gold hover:text-black transition-all duration-200`
- Large CTA variant bumps to `px-12 py-5` and adds `shadow-lg`.

**Accent rotation:** when rendering a set of cards, cycle accents in this
order — `gold → mauve-light → gold-light → cream`. Used for stats, pillars,
values, timeline nodes. This is a signature; keep it.

**Existing React UI set** (documented in `src/components/ui/README.md`):
`ActionCard`, `MediaCard`, `ImageGallery`, `StatCard`, `StoryCard`,
`BeamsBackground`, `DoveHero`, plus `Spotlight` and `DoveScene`.

## 1.6 Motion

- **Scroll reveal:** elements tagged `.scroll-reveal` start
  `opacity:0; translateY(32px)` and animate up via GSAP ScrollTrigger
  (`start: 'top 80%'`, `toggleActions: play none none reverse`). Staggered with
  a `--delay` custom property.
- **Section parallax:** each `<section>` drifts `~5vh` on scroll (`power1.inOut`).
- **Hover:** cards brighten border + reveal glow; buttons `scale-[1.02]`; icons
  `scale-110`. Active state `scale-0.97`.
- **Hero motion:** framer-motion `BeamsBackground` + three.js `DoveScene`.
- **Easing tokens** (`Layout.astro`): `--ease-out: cubic-bezier(0.23,1,0.32,1)`,
  `--ease-in-out: cubic-bezier(0.77,0,0.175,1)`, `--ease-drawer:
  cubic-bezier(0.32,0.72,0,1)`.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` disables scroll
  smoothing and all reveal/bounce animation. Honor this in every new animation.

## 1.7 Imagery & texture

- **Film grain:** fixed SVG fractal-noise overlay at `opacity 0.02`, `z-index:1`
  (`body::before` in `Layout.astro`). Gives the dark canvas depth.
- **Glow blobs:** large `blur-3xl` radial gradients in gold/mauve at low opacity
  behind hero content.
- **Gradient washes:** section backgrounds alternate
  `bg-gradient-to-b from-black to-charcoal` and `from-charcoal to-black`.

## 1.8 Accessibility baseline (already shipped — treat as the standard)

- Skip-to-content link (`.sr-only` → `focus:not-sr-only`) on the homepage.
- `.sr-only` utility for screen-reader-only text.
- `:focus-visible` outlines: `2px solid var(--gold)`, `outline-offset: 2px`.
- `prefers-reduced-motion` fully handled.
- Every `<img>` has descriptive `alt`.

New work must keep all five. Missing pieces are called out in Part 2.

---

## Part 2 — Design review

Rated against the as-built system. Scale: 10 = nothing to add, 7 = solid but
happy-path, 3 = shortcut.

| Dimension | Rating |
|---|---|
| Information architecture / wayfinding | **3/10** |
| Visual hierarchy | **8/10** |
| Design system consistency | **9/10** |
| Content / UX writing | **5/10** |
| Interaction & states | **5/10** |
| Accessibility | **7/10** |
| Craft / production-readiness | **6/10** |

## 2.1 Information architecture & wayfinding — 3/10 → now ~8/10 (fixed)

**Update:** A global `Nav.astro` now renders on every page via `Layout.astro`:
logo→home, primary links with `aria-current` active state, a gold "Get Involved"
CTA, a working mobile menu, transparent-over-hero → solid-on-scroll, plus a
global skip link and a `<main>` landmark. The original gap is recorded below.

**Gap (original):** There is no persistent navigation anywhere. The homepage
(`index.astro`) has no `<nav>`/`<header>` — only a footer with links. Interior
pages are worse and inconsistent: `about.astro` and `get-involved.astro` have a
one-off "Back to Home" link; `founder.astro` and `gallery.astro` have no way
out at all except the browser back button. This fails Krug's "trunk test": drop
a user on `/founder` and they cannot tell what the major sections are or how to
reach them.

**What 10 looks like:** a persistent top nav on every page — logo (→ home),
primary sections (Impact, Founder, Gallery, About, Get Involved), and a
high-contrast "Get Involved" CTA. Current section indicated. On the hero it can
be transparent and go solid on scroll. Mobile: a proper menu, not a dead end.

**Fix:** add a `Nav` component to `Layout.astro` so it renders on all pages,
driven by one source-of-truth link list (the same list the footer uses).
Mockups for three nav directions accompany this doc.

## 2.2 Visual hierarchy — 8/10

**Strength:** the eyebrow → headline → lead → CTA rhythm is clear and repeated,
so every section reads in the same order. Stat numbers at `text-5xl font-black`
in accent color anchor the eye correctly. Glow-on-hover directs attention
without shouting.

**What 10 looks like:** one deliberate focal anchor per section rather than
three equal-weight cards competing (the impact and pillars grids read as
"three of the same"). Vary card scale or feature one.

**Fix:** optional. Feature the lead stat/story in a set; let the rest be
secondary.

## 2.3 Design system consistency — 9/10

**Strength:** this is the best part of the build. Strict palette, one card
recipe, one button pair, one eyebrow label, a disciplined accent rotation, a
single section rhythm. It already behaves like a system with a style guide —
this document just writes it down.

**What 10 looks like:** the last inconsistencies removed (see 2.7) and the
unused `Caveat` font either used intentionally (e.g. survivor quotes) or cut
from the font load for performance.

**Fix:** decide Caveat's fate; align the two back-link icons (see 2.7).

## 2.4 Content / UX writing — 5/10 → now ~8/10 (fixed)

**Update:** All body paragraphs and card descriptions across the 5 pages were
converted to sentence case; headlines, eyebrow labels, stat labels, and button
text keep their intended casing, and proper nouns (Unchained, Sonia, Amara,
Phnom Penh, Nairobi, NGOs) were preserved. Original gap recorded below.

**Gap (original):** body paragraphs are set in Title Case On Every Word — e.g. "We Believe
In The Fundamental Right To Freedom For All Human Beings." Headlines in title
case are fine; **paragraphs** in title case are measurably harder to scan
(Redish, Krug: users scan, they don't read) and read as machine-generated,
which quietly undercuts a trust-critical NGO. It is consistent across all pages,
so it is clearly a choice — but it is the wrong one for body copy.

**What 10 looks like:** sentence case for all body and card copy; title case
reserved for headlines and labels. Same voice, far more scannable and human.

**Fix:** rewrite paragraph and card-description copy to sentence case across the
5 pages. Mechanical, high-impact.

## 2.5 Interaction & states — 5/10

**Gap:** the happy path is polished; the edges are unspecified. The three.js
`DoveScene` and framer `BeamsBackground` have no visible fallback — if WebGL is
unavailable or slow, the hero can render blank with the mission text floating
over nothing. The gallery has no loading or empty state. Buttons have hover /
active / focus, but there are no disabled or loading states for anything that
will eventually POST (donate, volunteer forms).

**What 10 looks like:** a static poster image or gradient behind the hero as a
WebGL fallback; skeleton/empty states for the gallery; defined loading/disabled
button states ready for when actions become real.

**Fix:** add a `<noscript>`/WebGL-fail fallback layer in `DoveHero`; specify
gallery loading + empty states; add button `:disabled` styling to the system.

**Fixed since:** the get-involved FAQ, previously reveal-on-`:hover` only
(invisible to keyboard and touch), is now a click/keyboard accordion with
`aria-expanded` + `aria-controls`, answers hidden by default. The duplicate
gallery skip link was removed in favor of the global one.

## 2.6 Accessibility — 7/10

**Strength:** skip link, `sr-only`, focus-visible outlines, reduced-motion,
alt text — a genuinely good baseline most sites skip.

**Gap to verify:** contrast. `gold #d4a574` on `charcoal #1a1a1a` is fine for
large text but lands near the WCAG AA 4.5:1 line for small text (`text-sm`
gold on charcoal); gold on pure `black` for small captions is worth measuring.
~~The skip link exists only on the homepage.~~ (Skip link is now global — see
2.1.) Emoji "icons" have no accessible label.

**What 10 looks like:** every text/background pair passes AA at its actual size;
skip link on every page (falls out of the nav fix); decorative emoji marked
`aria-hidden` or replaced with labeled SVG.

**Fix:** run a contrast pass on small gold text; move the skip link into the
shared layout; label or hide emoji.

## 2.7 Craft / production-readiness — 6/10

**Gaps:**
- ~~`founder.astro` loads images as `src="/src/images/Sonia_Qutami1.jpg"`. `/src`
  is a dev-server path; in the production Astro build these will 404.~~
  **Fixed** — images are now ESM-imported and served from the bundled
  `/_astro/` asset path (verified via `npm run build`).
- ~~`gallery.astro` uses Unsplash stock URLs with the same three photos cycled —
  placeholder content on a shipped page.~~ **Fixed** — now a campaign/events
  gallery of real, locally-bundled Unchained Gala posters (see punch-list #5).
- Back-link icon mismatch: `about.astro` uses a **downward** chevron path
  (`M15 19l-7 7…`) for a "Back to Home" link (wrong semantics); the dove hero's
  scroll cue legitimately uses a down arrow, and `get-involved.astro` uses a
  correct **left** arrow. Standardize on the left arrow for "back."
- Emoji as primary iconography (💝 🤝 🌐 🛡️ ⚖️ 📊 🌍 💫) renders differently on
  every OS and reads less premium than the rest of the system.

**What 10 looks like:** all assets resolve in production, real gallery imagery,
one consistent icon set (labeled SVG), no dev-only paths.

**Fix:** see punch-list.

---

## Part 3 — Punch-list

Ordered by severity. Each is an independent follow-up.

| # | Severity | Issue | Where | Fix |
|---|---|---|---|---|
| 1 | ~~Critical~~ ✅ Fixed | No persistent nav / wayfinding | `Nav.astro` in `Layout.astro` | Done — shared nav on all pages, `aria-current` active state, mobile menu, scroll-solid, global skip link + `<main>` landmark |
| 2 | ~~High~~ ✅ Fixed | Broken image paths (`/src/images/...`) | `founder.astro` | Done — ESM-imported, now served from `/_astro/` |
| 3 | ~~High~~ ✅ Fixed | Title-case body copy | all 5 `pages/*.astro` | Done — paragraphs/descriptions rewritten to sentence case; headings, labels, eyebrows kept as-is |
| 4 | Medium | No WebGL/hero fallback | `DoveHero.tsx`, `DoveScene.tsx` | Poster image / gradient fallback layer |
| 5 | ~~Medium~~ ✅ Fixed | Placeholder stock gallery (duplicated) | `gallery.astro` | Done — repurposed to a campaign/events gallery using 8 distinct real Unchained Gala posters (bundled locally), masonry layout, dead sublinks removed |
| 6 | ~~Medium~~ ✅ Fixed | Back-link icon wrong/inconsistent | `about.astro`, `get-involved.astro` | Done — redundant "Back to Home" links removed (nav logo covers it) |
| 7 | Medium | Emoji iconography | index/about/founder/get-involved | Labeled SVG icon set |
| 8 | Low | Verify small gold-text contrast (AA) | global | Measure; darken surface or lighten gold for small text |
| 9 | Low | `Caveat` loaded but unused | `Layout.astro` font link | Use intentionally (quotes) or drop from load |

---

*Part 1 is the standard to build against. Parts 2–3 are recommendations, not
committed work — apply them item by item.*

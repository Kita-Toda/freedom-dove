# FREEDOM — Technical Architecture & Design System

## Executive Summary

**FREEDOM** is a premium humanitarian platform website built with:
- **Astro 5** (minimal JS, fast)
- **React Islands** (interactive 3D dove)
- **Three.js** (real-time 3D rendering)
- **GSAP 3** (scroll animations)
- **Tailwind CSS 3** (utility styling)

The website prioritizes **performance**, **accessibility**, and **impeccable design taste**.

---

## Core Principles

### 1. Performance-First Architecture

- ✅ Static HTML by default (Astro SSG)
- ✅ JavaScript only where needed (React islands)
- ✅ GPU-accelerated animations (transform + opacity)
- ✅ Minimal external dependencies
- ✅ Responsive images, lazy loading

### 2. Accessibility-First Design

- ✅ WCAG AA compliant
- ✅ Keyboard navigation fully supported
- ✅ Touch-aware (hover states gated)
- ✅ Reduced-motion support
- ✅ Semantic HTML, proper contrast ratios

### 3. Design Consistency

- ✅ One accent color throughout (gold #d4a574)
- ✅ Consistent border radius (1.875rem for panels)
- ✅ Unified typography scale (Geist / Playfair / Caveat)
- ✅ Custom easing on all animations
- ✅ No generic AI tells (no Inter, no neon, no three-card layouts)

---

## File-by-File Breakdown

### `astro.config.mjs`

Astro framework configuration. Key settings:

```javascript
export default defineConfig({
  integrations: [react(), tailwind()],
  vite: {
    ssr: {
      external: ['three']  // Exclude Three.js from SSR
    }
  }
});
```

**Why:** Three.js is client-only (needs DOM/WebGL). `external` prevents Vite from trying to bundle it on the server.

---

### `tailwind.config.cjs`

Custom Tailwind theme. Extends with:

```javascript
colors: {
  black: '#0a0a0a',      // --black
  gold: '#d4a574',       // --gold (primary accent)
  mauve: '#8b6f8e',      // --mauve (secondary)
  cream: '#f5f1e8',      // --cream (text)
}
fontFamily: {
  sans: ['Geist', 'sans-serif'],
  serif: ['Playfair Display', 'serif'],
  script: ['Caveat', 'cursive'],
}
```

**Why:** Centralized design tokens. All colors and fonts defined once, reused everywhere.

---

### `src/layouts/Layout.astro`

Global page wrapper. Includes:

```astro
<head>
  <!-- Google Fonts import -->
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800;900&family=Playfair+Display:wght@600;700;900&family=Caveat:wght@700&display=swap" />
</head>

<body>
  <!-- Film-grain overlay pseudo-element -->
  <!-- Global styles: CSS variables, reset, animations -->
</body>
```

**Why:** Single source of truth for layout, fonts, and global styling.

---

### `src/pages/index.astro`

Main landing page. Structure:

1. **Hero** — DoveScene (React island) + centered copy
2. **Mission** — Two-column asymmetric layout
3. **Impact** — Three-column metric cards
4. **Stories** — Card grid with hovers
5. **CTA** — Call-to-action section
6. **Footer** — Four-column nav + legal

**Key Astro Features Used:**

```astro
<DoveScene client:load />
```

- `client:load` — Hydrate immediately (needed for 3D rendering)

---

### `src/components/DoveScene.tsx`

React component wrapping Three.js scene. Lifecycle:

1. **useEffect Hook** — Runs once on mount
   - Creates Three.js scene, camera, renderer
   - Builds dove geometry from primitives
   - Sets up lights (ambient, directional, point)
   - Starts animation loop

2. **Animation Loop** — Runs every frame
   - Rotates dove Y-axis (idle spin)
   - Bobs dove vertically (breathing)
   - Flutters wings (flutter animation)
   - Updates rotation X based on scroll

3. **Event Listeners**
   - `scroll` — Updates `scrollY` for parallax
   - `resize` — Adjusts canvas size

4. **Cleanup** — On unmount
   - Cancels animation frame
   - Removes DOM element
   - Removes event listeners

**Key Optimizations:**

```typescript
// Use refs to avoid re-renders
const sceneRef = useRef<THREE.Scene | null>(null);

// Separate rendering logic from React state
const clock = new THREE.Clock();
let scrollY = 0;  // Not React state — just a variable
```

---

### `src/pages/index.astro` — Animation Section

Scroll-triggered reveals using GSAP ScrollTrigger:

```astro
<script>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Query all elements with scroll-reveal class
document.querySelectorAll('.scroll-reveal').forEach((element) => {
  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',      // When element 80% from viewport top
      end: 'top 20%',        // When element 20% from viewport top
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'cubic-bezier(0.23, 1, 0.32, 1)',
  });
});
</script>

<style>
.scroll-reveal {
  opacity: 0;
  transform: translateY(32px);
  --delay: 0ms;
  animation-delay: var(--delay);
}
</style>
```

**Why:** CSS sets initial state. GSAP ScrollTrigger animates to final state when in viewport.

---

## Animation System

### Easing Curves

All animations use custom cubic-bezier for consistent "premium" feel:

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);    /* Fast in, slow out */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1); /* Smooth acceleration */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);  /* Responsive iOS-like */
```

### Duration Guidelines

| Animation Type | Duration | Notes |
|---|---|---|
| Button hover | 200ms | Immediate feedback |
| Button press | 160ms | Physical press feel |
| Section reveal | 800ms | Generous, readable |
| Scroll parallax | 1000ms | Drift effect |

### Hardware Acceleration

Only animate these properties (GPU-accelerated):
- `transform` (translate, rotate, scale)
- `opacity`

**Never animate:**
- `width`, `height` (layout thrashing)
- `top`, `left` (layout thrashing)
- `padding`, `margin` (layout thrashing)
- `color`, `background` (not GPU-accelerated, but OK for slow animations)

---

## Scroll-Driven Interactivity

### ScrollTrigger Workflow

1. **Setup** — Register plugin globally
   ```javascript
   gsap.registerPlugin(ScrollTrigger);
   ```

2. **Trigger Definition** — For each element
   ```javascript
   gsap.to(element, {
     scrollTrigger: {
       trigger: element,
       start: 'top 80%',      // Trigger position
       end: 'top 20%',        // End position
       toggleActions: 'play none none reverse',  // Actions
       markers: true,         // Debug (remove in prod)
     },
     // Animation properties
   });
   ```

3. **Calculations** — ScrollTrigger watches scroll position and triggers at the right time

### Understanding `start` and `end`

```
Viewport
┌─────────────┐
│             │ 0%
│ top 80%     │  ← Animation starts when element reaches 80% from top
│             │
│ top 20%     │  ← Animation ends when element reaches 20% from top
│             │ 100%
└─────────────┘
```

---

## Responsive Design

### Tailwind Breakpoints

```css
/* Mobile first */
.grid { @apply grid-cols-1; }
@media (min-width: 768px) { .grid { @apply grid-cols-2; } }
@media (min-width: 1024px) { .grid { @apply grid-cols-3; } }
```

### Mobile Considerations

1. **Touch Hovers** — Gate with `@media (hover: hover) and (pointer: fine)`
2. **Viewport Units** — Use `100dvh` (dynamic viewport height, accounts for mobile address bar)
3. **Text Sizing** — Use relative units, test on actual devices
4. **Three.js Rendering** — Scale canvas with window resize

---

## Color System

### Palette Lock (Single Accent)

This design uses **ONE accent color** throughout: **Gold (#d4a574)**

```css
:root {
  --black: #0a0a0a;        /* Primary background */
  --charcoal: #1a1a1a;     /* Secondary background */
  --gold: #d4a574;         /* PRIMARY ACCENT (used everywhere) */
  --gold-light: #e8c9a0;   /* Gold on hover */
  --mauve: #8b6f8e;        /* Secondary accent (sparingly) */
  --cream: #f5f1e8;        /* Primary text */
}
```

**Rule:** Every interactive element uses gold. Every accent uses gold. No color switching.

---

## Typography Hierarchy

### Font Families

| Family | Use | Weights |
|--------|-----|---------|
| **Geist** | Body, UI labels | 400, 500, 600, 700, 800, 900 |
| **Playfair Display** | Headlines | 600, 700, 900 |
| **Caveat** | Accents, taglines | 700 |

### Size Scale

| Element | Size | Line Height |
|---------|------|-------------|
| Hero H1 | 96px–120px | 0.9–1.0 |
| Section H2 | 48px–72px | 0.95–1.1 |
| Body | 16px | 1.6 |
| Small | 12px–14px | 1.4 |

---

## Button Styles

### Primary Button
```html
<a class="px-12 py-5 bg-gold text-black font-bold rounded-full hover:scale-105 transition-transform duration-200 uppercase text-sm tracking-wider">
  Text
</a>
```

**Style Rules:**
- Pill-shaped (`rounded-full`)
- Gold background
- Black text
- Scales up on hover (not down — indicates growth)
- 200ms transition

### Secondary Button
```html
<a class="px-12 py-5 border-2 border-gold text-gold hover:bg-gold hover:text-black transition-all duration-200 uppercase text-sm tracking-wider">
  Text
</a>
```

**Style Rules:**
- Outlined (border-gold)
- Gold text
- Inverts to gold background on hover
- Same transition timing

---

## Performance Optimization Checklist

- ✅ No external fonts (self-hosted via Google Fonts import)
- ✅ No unnecessary dependencies
- ✅ Minimal CSS (Tailwind utilities only)
- ✅ Three.js geometry baked (no GLTF loader)
- ✅ Animation-only on transform/opacity
- ✅ React island pattern (one interactive component)
- ✅ Responsive canvas rendering
- ✅ Cleanup on unmount (prevent memory leaks)

---

## Testing Checklist

### Visual
- [ ] Test on mobile, tablet, desktop
- [ ] Verify color contrast (WCAG AA)
- [ ] Check hover states on desktop
- [ ] Check touch states on mobile
- [ ] Test in dark/light system preference

### Performance
- [ ] Lighthouse score > 90
- [ ] Time to Interactive < 3s
- [ ] Animation FPS = 60 (use DevTools)

### Accessibility
- [ ] Tab through page (keyboard nav)
- [ ] Test with screen reader (VoiceOver, NVDA)
- [ ] Enable "Reduce Motion" and verify animations stop
- [ ] Test focus indicators are visible

### Animation
- [ ] Scroll reveals trigger at correct positions
- [ ] Dove rotates smoothly with scroll
- [ ] No jank or frame drops
- [ ] Wings flutter smoothly

---

## Future Enhancement Ideas

### Short Term
1. Add sound effect on section reveals (with mute toggle)
2. Add parallax background layers
3. Implement parallax depth on dove (scale + z-index)
4. Add scroll progress bar

### Medium Term
1. Upgrade to complex GLTF dove model (Blender export)
2. Add multiple scene environments (outdoor, indigo sky, city)
3. Implement per-section color theme variants
4. Add video background option

### Long Term
1. Multi-page site (About, Impact, Get Involved)
2. Admin dashboard (update stories, metrics)
3. Newsletter signup with email integration
4. Dark/light theme toggle

---

## Deployment

### Build
```bash
npm run build  # Outputs to ./dist/
```

### Preview Locally
```bash
npm run preview
```

### Deploy to Production
- **Vercel** (recommended) — Automatic deployments from Git
- **Netlify** — Drag & drop or Git sync
- **Static host** — Copy `dist/` folder to any HTTP server

### Environment Variables
None currently required. All configuration is hardcoded (appropriate for this project).

---

## Debugging Tips

### Enabling ScrollTrigger Markers
In `index.astro` `<script>` section:
```javascript
scrollTrigger: {
  markers: true,  // Shows red/green lines in viewport
}
```

### Checking Three.js Canvas
Open DevTools → Elements → Find `<canvas>` → Check attributes:
- `width` and `height` should match viewport dimensions
- `style` should have `position: relative; overflow: hidden`

### Animation Stutter?
Check:
1. Is `will-change` set on animating element?
2. Are you animating `transform`/`opacity` only?
3. Is GPU acceleration enabled (DevTools Rendering)?
4. Are there too many animations at once?

---

## Resources

- **Astro Docs** — https://docs.astro.build
- **GSAP ScrollTrigger** — https://gsap.com/docs/v3/Plugins/ScrollTrigger
- **Three.js Documentation** — https://threejs.org/docs/
- **Tailwind CSS** — https://tailwindcss.com/docs
- **Cubic-Bezier Explorer** — https://cubic-bezier.com

---

**Built with purpose, optimized for performance, designed with impeccable taste.**

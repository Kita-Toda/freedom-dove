# Freedom UI Components

Reusable React components from the Unchained humanitarian platform, published to 21st dev registry.

## Components

### 1. StatCard

Metric display card with large numbers, labels, and descriptions. Ideal for impact dashboards, KPI showcases, and stats pages.

#### Props

```typescript
interface StatCardProps {
  number: string;           // Large number to display (e.g., "31", "127K+", "$47M")
  label: string;            // Brief label (e.g., "Countries Active")
  description: string;      // Supporting text
  accentColor?: 'gold' | 'mauve' | 'gold-light' | 'cream';  // Color theme
  glowColor?: string;       // Tailwind gradient for hover effect
}
```

#### Usage

```tsx
import StatCard from '@/components/ui/StatCard';

export default function ImpactDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <StatCard
        number="31"
        label="Countries Active"
        description="Networks across 4 continents"
        accentColor="gold"
        glowColor="from-gold/25 to-gold/10"
      />
      <StatCard
        number="127K+"
        label="Survivors Supported"
        description="Direct services and care"
        accentColor="mauve"
      />
    </div>
  );
}
```

#### Features

- ✨ Hover glow effect with customizable gradient
- 🎨 4 color themes (gold, mauve, gold-light, cream)
- 📊 Responsive grid-ready layout
- ♿ WCAG accessible with semantic HTML

#### Demo

See `StatCard.demo.tsx` for full example with all color variants.

---

### 2. ActionCard

Multi-action option card with emoji, title, description, bulleted features, and call-to-action button. Perfect for service offerings and action grids.

#### Props

```typescript
interface ActionCardProps {
  title: string;                          // Card title
  description: string;                    // Main description text
  icon: string;                           // Emoji icon
  color: 'gold' | 'mauve' | 'gold-light' | 'cream';  // Color theme
  ctaText: string;                        // Button text
  ctaHref: string;                        // Button link
  features?: string[];                    // Optional list of features
}
```

#### Usage

```tsx
import ActionCard from '@/components/ui/ActionCard';

export default function GetInvolved() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ActionCard
        title="Donate"
        description="Every dollar funds survivor services."
        icon="💝"
        color="gold"
        ctaText="Donate Now"
        ctaHref="https://donate.example.org"
        features={[
          'Tax-deductible (501(c)(3))',
          'Monthly giving available',
          'Crypto accepted',
        ]}
      />
    </div>
  );
}
```

#### Features

- 🎨 Fully color-customizable with matching buttons
- ✨ Hover scale and glow effects
- 📋 Optional feature checklist with checkmarks
- 🔗 Built-in CTA button with link support
- 📱 Responsive grid layout

#### Button Variants

- **Primary (gold/mauve/gold-light)**: Solid background with text color
- **Secondary (cream)**: Border style with hover fill

#### Demo

See `ActionCard.demo.tsx` for 4-card layout with all color options.

---

### 3. StoryCard

Narrative card displaying stories, testimonials, or case studies with title, description, and region/attribution badge.

#### Props

```typescript
interface StoryCardProps {
  title: string;          // Story headline
  description: string;    // Story narrative
  region: string;         // Location or attribution label
}
```

#### Usage

```tsx
import StoryCard from '@/components/ui/StoryCard';

export default function Stories() {
  return (
    <div className="space-y-8 max-w-3xl">
      <StoryCard
        title="From Survivor to Advocate"
        description="After 8 years in exploitation, Amara escaped with help from our partners. Now she leads support groups and mentors 12 young women."
        region="Cambodia"
      />
      <StoryCard
        title="Justice Across Borders"
        description="Our data-sharing platform enabled law enforcement across 18 countries to coordinate. Result: 203 convictions."
        region="Global Network"
      />
    </div>
  );
}
```

#### Features

- 📖 Premium narrative layout with hover effects
- 🏷️ Region/location badge in top-right
- ✨ Gradient glow on hover
- 🎯 Full-width responsive design
- ♿ Semantic HTML for accessibility

#### Styling

- Border: gold with hover intensification
- Background: semi-transparent charcoal with backdrop blur
- Text: cream/mauve color palette
- Hover: Glow effect from gold/mauve gradient

#### Demo

See `StoryCard.demo.tsx` for 3-story layout example.

---

## Design System

All components follow the **Unchained design system**:

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Gold | `#d4a574` | Primary accent, CTAs |
| Mauve | `#8b6f8e` | Secondary accent |
| Cream | `#f5f1e8` | Primary text |
| Charcoal | `#1a1a1a` | Secondary background |
| Black | `#0a0a0a` | Primary background |

### Typography

- **Headings**: Playfair Display, 900 weight, letter-spacing -2px
- **Body**: Geist, 400–600 weight
- **Accent**: Caveat, 700 weight

### Motion

- **Hover transitions**: 200–300ms with `cubic-bezier(0.23, 1, 0.32, 1)`
- **Animations**: Smooth scale, glow, and color transitions
- **Reduced motion**: All animations respect `@media (prefers-reduced-motion: reduce)`

---

## Installation & Usage

### Two Paths: Local Development vs Registry

**See [USAGE.md](./USAGE.md) for detailed guide on:**
- ✅ Using components locally in Unchained (development)
- ✅ Installing components in other projects (registry)
- ✅ Publishing updates to 21st dev
- ✅ Real-world workflow examples

### Local Installation (Unchained Project)

Components are in `src/components/ui/`. Import directly:

```tsx
import StatCard from '@/components/ui/StatCard';
import ActionCard from '@/components/ui/ActionCard';
import StoryCard from '@/components/ui/StoryCard';
```

**Use this approach:** When developing/improving Unchained website

### Publishing to 21st dev Registry

```bash
# Publish individual components
npx @21st-dev/registry publish ./src/components/ui/StatCard.tsx \
  --description "Metric card for impact dashboards and stats displays" \
  --tags "card,metrics,stats,impact" \
  --demo ./src/components/ui/StatCard.demo.tsx

# After authentication, components are available at:
# https://21st.dev/community/components/{username}/{component-slug}
```

### Installing in Other Projects

```bash
# From team registry (after publishing)
npx @21st-dev/registry add @yourteam/stat-card
npx @21st-dev/registry add @yourteam/action-card
npx @21st-dev/registry add @yourteam/story-card

# Then import in your project
import StatCard from '@yourteam/stat-card';
```

**Use this approach:** When using components in OTHER projects (not Unchained)

---

## Extending Components

Each component is designed for extension via props. Common customizations:

**StatCard** — Change accent color or glow effect:
```tsx
<StatCard
  number="50M"
  label="People Impacted"
  description="By 2030"
  accentColor="mauve"
  glowColor="from-mauve/30 to-mauve/5"
/>
```

**ActionCard** — Customize button style via color prop:
```tsx
<ActionCard
  title="Partner"
  description="..."
  icon="🌐"
  color="cream"  // Renders as border button instead of solid
  ctaText="Get in Touch"
  ctaHref="mailto:partners@example.org"
/>
```

**StoryCard** — Use with any narrative content:
```tsx
<StoryCard
  title="Testimonial"
  description="User feedback about your service..."
  region="Real User"
/>
```

---

## Accessibility

All components include:

- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy
- ✅ Color contrast (WCAG AA minimum 4.5:1)
- ✅ Reduced motion support
- ✅ Focus indicators on interactive elements
- ✅ Alt text support (where applicable)

---

## Dependencies

- **React** 18.3.1+
- **Tailwind CSS** 3.4.1+

No external icon libraries required (uses emoji).

---

## License

Published under the Unchained humanitarian platform. Components are shared for team collaboration via 21st dev registry.

---

## Support

Questions or improvements? Check:
- `/src/components/ui/[Component].demo.tsx` for usage examples
- Color variants in component props interfaces
- Tailwind config for custom color definitions


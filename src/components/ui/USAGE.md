# Component Usage Guide

This document explains how to use the Unchained UI components locally and from the 21st dev registry.

## 📍 Two Paths: Local Development vs Registry

### Path 1: Local Development (Unchained Project)

**Use this approach when:**
- ✅ Building/modifying the Freedom/Unchained website
- ✅ Iterating on component design and functionality
- ✅ Testing changes in real-time

**Import from local files:**

```tsx
// In any .astro or .tsx file in the Unchained project
import StatCard from '@/components/ui/StatCard';
import ActionCard from '@/components/ui/ActionCard';
import StoryCard from '@/components/ui/StoryCard';

export default function ImpactPage() {
  return (
    <StatCard
      number="31"
      label="Countries Active"
      description="Networks across 4 continents"
      accentColor="gold"
    />
  );
}
```

**Location:** `src/components/ui/`  
**File:** `StatCard.tsx`, `ActionCard.tsx`, `StoryCard.tsx`

---

### Path 2: Registry Installation (Other Projects)

**Use this approach when:**
- ✅ Building OTHER projects (not Unchained)
- ✅ Sharing components across your team
- ✅ Installing from the 21st dev registry

**Installation:**

```bash
# Install individual components
npx @21st-dev/registry add @yourteam/stat-card
npx @21st-dev/registry add @yourteam/action-card
npx @21st-dev/registry add @yourteam/story-card
```

**Import in other projects:**

```tsx
// After installing from 21st dev registry
import StatCard from '@yourteam/stat-card';
import ActionCard from '@yourteam/action-card';
import StoryCard from '@yourteam/story-card';
```

---

## 🎯 Real-World Scenarios

### Scenario 1: Updating a Component (Unchained)

You're improving StatCard for better mobile responsiveness:

```bash
# 1. Edit locally
vim src/components/ui/StatCard.tsx

# 2. Test in dev server
npm run dev

# 3. Commit changes
git add src/components/ui/StatCard.tsx
git commit -m "refactor: improve StatCard mobile responsiveness"

# 4. When ready, republish to registry
npx @21st-dev/registry publish ./src/components/ui/StatCard.tsx \
  --description "Metric card for dashboards and stats" \
  --tags "card,metrics,stats"
```

### Scenario 2: Using in a New Project (Marketing Site)

You're building a new marketing site and want to reuse components:

```bash
# 1. Create new project
npm create astro@latest my-marketing-site

# 2. Install components from registry
npx @21st-dev/registry add @yourteam/stat-card
npx @21st-dev/registry add @yourteam/action-card

# 3. Use in your new site
import StatCard from '@yourteam/stat-card';

export default function HomePage() {
  return <StatCard number="100K+" label="Users" />;
}
```

### Scenario 3: Contributing an Improvement

A teammate improves ActionCard styling:

```bash
# 1. They work on ActionCard locally in Unchained
# 2. Their changes are tested in dev
# 3. They commit to the Unchained repo
# 4. We republish to registry (updates all teams)
# 5. Other projects automatically benefit from improvements
```

---

## 📦 Component Registry Status

### Currently Published to 21st dev

| Component | Status | Registry Link |
|-----------|--------|---------------|
| StatCard | ✅ Published | `@yourteam/stat-card` |
| ActionCard | ✅ Published | `@yourteam/action-card` |
| StoryCard | ✅ Published | `@yourteam/story-card` |

### How to Check

```bash
# Search for published components
npx @21st-dev/registry search "stat" --scope team

# Get info about a component
npx @21st-dev/registry info @yourteam/stat-card
```

---

## 🔄 Update Workflow

When you improve a component in Unchained:

```
Local Edit
    ↓
npm run dev (test)
    ↓
git commit (save)
    ↓
npx @21st-dev/registry publish (share)
    ↓
Other projects get update (they already have it installed)
```

**Note:** 21st dev registry auto-updates components. If you republish with the same slug, all projects using it get the latest version automatically.

---

## ⚙️ Configuration

### Unchained Project (.claude/settings.json)

```json
{
  "componentLibrary": {
    "local": "src/components/ui",
    "registry": "@yourteam",
    "strategy": "local-development",
    "autoPublish": false
  }
}
```

### Other Projects (components.json)

```json
{
  "registries": {
    "@yourteam": {
      "url": "https://21st.dev/r/yourteam/default/{name}.json",
      "headers": {
        "Authorization": "Bearer ${API_KEY_21ST}"
      }
    }
  }
}
```

---

## 📚 File Structure

### Local Components (Unchained)

```
src/components/ui/
├── StatCard.tsx           # Component implementation
├── StatCard.demo.tsx      # Demo with color variants
├── ActionCard.tsx
├── ActionCard.demo.tsx
├── StoryCard.tsx
├── StoryCard.demo.tsx
├── README.md              # Full documentation
├── USAGE.md               # This file
└── [other components...]
```

### Installed Components (Other Projects)

```
components/ui/
├── stat-card.tsx          # Auto-installed from registry
├── action-card.tsx
├── story-card.tsx
└── [other installed components...]
```

---

## 🔗 Integration Examples

### Using StatCard in Unchained (Local)

```astro
---
import StatCard from '@/components/ui/StatCard';
---

<section>
  <div class="grid grid-cols-3 gap-8">
    <StatCard
      number="31"
      label="Countries Active"
      description="Networks across 4 continents"
      accentColor="gold"
    />
    <StatCard
      number="127K+"
      label="Survivors Supported"
      description="Direct services"
      accentColor="mauve"
    />
  </div>
</section>
```

### Using ActionCard in Marketing Site (Registry)

```astro
---
import ActionCard from '@yourteam/action-card';
---

<section>
  <ActionCard
    title="Get Started"
    description="Join our community"
    icon="🚀"
    color="gold"
    ctaText="Learn More"
    ctaHref="/learn"
    features={[
      'Free tier available',
      'No credit card needed',
      'Support included'
    ]}
  />
</section>
```

---

## 🎯 Best Practices

### 1. Local Development First
- Always iterate and test locally before publishing
- Use `npm run dev` for real-time feedback
- Verify demo files work correctly

### 2. Clear Commit Messages
```bash
git commit -m "refactor: improve StatCard accessibility

- Add ARIA labels and semantic HTML
- Improve color contrast (WCAG AA)
- Add keyboard navigation support

Ready for republish to registry."
```

### 3. Document Breaking Changes
If you change component props, document the migration:

```markdown
## Migration Guide (v2.0)

### StatCard

**Before:**
```tsx
<StatCard number="31" label="Active" />
```

**After:**
```tsx
<StatCard number="31" label="Active" accentColor="gold" />
```

**Breaking:** `glowColor` prop renamed to `accentColor`
```

### 4. Version Registry Publishes
Tag releases when publishing major updates:

```bash
git tag -a v1.1.0-components -m "Components updated in registry"
git push origin v1.1.0-components
```

---

## 🚀 Workflow Summary

| Task | Command | Where |
|------|---------|-------|
| **Develop** | `npm run dev` | Local machine |
| **Test** | Visit `http://localhost:4323` | Browser |
| **Commit** | `git commit` | Unchained repo |
| **Publish** | `npx @21st-dev/registry publish` | 21st dev registry |
| **Install** | `npx @21st-dev/registry add` | Other projects |
| **Use** | `import from '@yourteam/...'` | Any project |

---

## ❓ FAQ

**Q: Should I use local or registry components in Unchained?**  
A: Always use **local** (`@/components/ui/`) in Unchained for fastest development.

**Q: When should I republish to the registry?**  
A: Publish after significant improvements or bug fixes that benefit other projects.

**Q: Do other projects auto-update when I republish?**  
A: Yes! 21st dev registry handles versioning automatically.

**Q: Can I use registry components in Unchained?**  
A: Yes, but it's slower. Stick with local imports for Unchained development.

**Q: What if I want different versions in different projects?**  
A: Use explicit version pinning in your `components.json` or package.json.

---

## 📖 Related Documentation

- **Component API:** See `README.md` for props and usage
- **Design System:** See `README.md` for colors and typography
- **Demo Code:** See `*.demo.tsx` files for working examples
- **Swarm Workflow:** See `.claude/SWARM.md` for team coordination

---

*Last Updated: 2026-07-14*  
*Approach: Local Development + Registry Distribution*

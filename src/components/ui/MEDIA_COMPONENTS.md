# Media Components — Dynamic Image Gallery System

Reusable React components for displaying images dynamically with filtering, overlays, and responsive layouts.

## Components Overview

### 1. MediaCard

Individual image card with optional overlay, title, description, and category badge.

#### Props

```typescript
interface MediaCardProps {
  image: string;           // Image URL or local path
  title: string;          // Title shown on overlay
  description?: string;   // Optional description text
  href?: string;          // Optional link (makes card clickable)
  category?: string;      // Optional category badge
  overlay?: boolean;      // Show overlay on hover (default: true)
}
```

#### Usage

```tsx
import MediaCard from '@/components/ui/MediaCard';

export default function Gallery() {
  return (
    <MediaCard
      image="https://example.com/image.jpg"
      title="Community Support"
      description="Local organizations providing aid"
      category="Impact"
      overlay={true}
    />
  );
}
```

#### Features

- 🖼️ Responsive image with object-fit
- ✨ Hover scale animation
- 📍 Gradient overlay on hover
- 🏷️ Optional category badge (gold accent)
- 🔗 Optional link functionality
- ♿ Accessible with semantic HTML

---

### 2. ImageGallery

Full-featured gallery component with filtering, multiple columns, and responsive design.

#### Props

```typescript
interface ImageGalleryProps {
  images: GalleryImage[];     // Array of images to display
  columns?: 1 | 2 | 3 | 4;   // Grid columns (default: 3)
  category?: string;          // Section category label
  title?: string;             // Gallery title
  description?: string;       // Gallery description
  showOverlay?: boolean;      // Show overlays (default: true)
}

interface GalleryImage {
  image: string;              // Image URL
  title: string;              // Image title
  description?: string;       // Image description
  category?: string;          // Filter category
  href?: string;              // Optional link
}
```

#### Usage

```tsx
import ImageGallery from '@/components/ui/ImageGallery';

export default function ImpactPage() {
  const images = [
    {
      image: '/img/community.jpg',
      title: 'Community Support',
      description: 'Local organizations...',
      category: 'Impact',
      href: '/impact/community',
    },
    {
      image: '/img/network.jpg',
      title: 'Global Network',
      description: 'Partners across continents...',
      category: 'Network',
    },
  ];

  return (
    <ImageGallery
      images={images}
      columns={3}
      category="Gallery"
      title="Our Impact in Action"
      description="Explore how we're working worldwide"
      showOverlay={true}
    />
  );
}
```

#### Features

- 📱 Responsive grid (1-4 columns)
- 🔍 Category filtering with buttons
- ✨ Smooth animations
- 🎨 Premium design language
- 📊 Dynamic category extraction
- 🔗 Optional links on cards
- 📍 Empty state handling

---

## Usage Patterns

### Pattern 1: Static Gallery (Unchained)

Use with hardcoded images:

```tsx
<ImageGallery
  images={[
    { image: '/images/img1.jpg', title: 'Title 1', category: 'Impact' },
    { image: '/images/img2.jpg', title: 'Title 2', category: 'Stories' },
  ]}
  columns={3}
  title="Impact Gallery"
/>
```

### Pattern 2: Dynamic Gallery (From API)

Fetch images from a backend:

```tsx
export default function DynamicGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => setImages(data));
  }, []);

  return (
    <ImageGallery
      images={images}
      columns={3}
      title="Dynamic Content"
    />
  );
}
```

### Pattern 3: Content Management

Pull images from a CMS:

```tsx
import { getGalleryImages } from '@/lib/cms';

export default function CMSGallery() {
  const images = await getGalleryImages('impact');

  return (
    <ImageGallery
      images={images}
      columns={2}
      category="Campaigns"
      title="Latest Updates"
    />
  );
}
```

---

## Styling & Customization

### Responsive Breakpoints

```
- Mobile: 1 column
- Tablet (768px): 2 columns
- Desktop (1024px): 3-4 columns
```

### Color Integration

Components use the Unchained design system:

| Element | Color | Usage |
|---------|-------|-------|
| Category Badge | Gold (#d4a574) | Accent |
| Title | Cream (#f5f1e8) | Primary text |
| Description | Cream 80% | Secondary text |
| Background | Charcoal (#1a1a1a) | Cards |
| Filter Button Active | Gold | Active state |
| Filter Button Inactive | Gold 40% | Hover state |

### Custom Styling

Override via Tailwind or CSS:

```tsx
<div className="media-gallery">
  <style>{`
    .media-gallery .media-card {
      border-radius: 8px;
    }
    .media-gallery .media-overlay {
      background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
    }
  `}</style>
  <ImageGallery images={images} />
</div>
```

---

## Integration with Local Images

### From Public Folder

```tsx
<MediaCard
  image="/images/story-1.jpg"
  title="Survivor Story"
  description="From Phnom Penh, Cambodia"
  category="Stories"
/>
```

### From Images Directory

Place images in `public/images/`:

```
public/
├── images/
│   ├── impact/
│   │   ├── community.jpg
│   │   └── network.jpg
│   ├── stories/
│   │   └── survivor-1.jpg
│   └── gallery.json (metadata)
```

Load with metadata:

```tsx
import galleryData from '/public/images/gallery.json';

export default function Gallery() {
  return <ImageGallery images={galleryData.images} />;
}
```

---

## Publishing to 21st dev

### Publish MediaCard

```bash
npx @21st-dev/registry publish ./src/components/ui/MediaCard.tsx \
  --description "Image card with overlay, title, and category badge. Perfect for galleries and portfolio displays." \
  --tags "card,image,media,gallery" \
  --demo ./src/components/ui/MediaCard.demo.tsx
```

### Publish ImageGallery

```bash
npx @21st-dev/registry publish ./src/components/ui/ImageGallery.tsx \
  --description "Dynamic gallery with filtering, responsive columns, and smooth animations. Supports 1-4 columns." \
  --tags "gallery,media,filter,portfolio" \
  --demo ./src/components/ui/ImageGallery.demo.tsx
```

### Install in Other Projects

```bash
npx @21st-dev/registry add @yourteam/media-card
npx @21st-dev/registry add @yourteam/image-gallery
```

---

## Dynamic Image Loading

### From External API

```tsx
export default function ExternalGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadImages() {
      try {
        const res = await fetch('https://api.example.com/gallery');
        const data = await res.json();
        setImages(data.images);
      } catch (error) {
        console.error('Failed to load images:', error);
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, []);

  if (loading) return <div>Loading...</div>;

  return <ImageGallery images={images} columns={3} />;
}
```

### From Astro Endpoint

```astro
---
// src/pages/gallery.astro
import ImageGallery from '../components/ui/ImageGallery';

const response = await fetch('https://api.example.com/gallery');
const { images } = await response.json();
---

<ImageGallery images={images} columns={3} />
```

---

## Accessibility

Both components include:

- ✅ Semantic HTML (`<section>`, `<button>`, `<img>`)
- ✅ Alt text support for images
- ✅ Keyboard navigation on filter buttons
- ✅ Focus indicators
- ✅ WCAG AA color contrast
- ✅ Responsive text sizes

### Add Alt Text

```tsx
<MediaCard
  image={photo}
  title="Community meeting"
  description="Meeting with local partners"
  // Alt text auto-generated from title
/>
```

---

## Performance Optimization

### Image Optimization

```tsx
// Use optimized images
<MediaCard
  image="https://example.com/image.jpg?w=600&h=400&q=80"
  title="Optimized image"
/>
```

### Lazy Loading

```tsx
// Image tags use loading="lazy" by default
<MediaCard
  image="https://example.com/image.jpg"
  title="Lazy loaded"
/>
```

### Responsive Images

```tsx
// Tailwind handles responsive scaling
<div className="grid md:grid-cols-3 gap-8">
  {images.map((img) => (
    <MediaCard key={img.title} {...img} />
  ))}
</div>
```

---

## Examples

### Example 1: Impact Gallery

```tsx
<ImageGallery
  images={impactPhotos}
  columns={3}
  category="Impact"
  title="Our Work Around the World"
  description="31 countries, 127K+ survivors supported"
/>
```

### Example 2: Story Showcase

```tsx
<ImageGallery
  images={survivorStories}
  columns={2}
  category="Stories"
  title="Voices of Hope"
  showOverlay={true}
/>
```

### Example 3: Filterable Portfolio

```tsx
<ImageGallery
  images={portfolioItems}
  columns={4}
  category="Portfolio"
  title="Case Studies"
  showOverlay={true}
/>
```

---

## FAQ

**Q: Can I use local images from /public?**  
A: Yes! Use `/images/filename.jpg` as the image path.

**Q: How do I filter by category?**  
A: ImageGallery auto-generates filter buttons based on image `category` prop.

**Q: Can I customize the grid columns?**  
A: Yes! Pass `columns={1|2|3|4}` prop to ImageGallery.

**Q: How do I make images clickable?**  
A: Pass `href` prop to MediaCard for individual links.

**Q: Does it support external image URLs?**  
A: Yes! Works with any valid image URL (public/images/... or https://...).

**Q: Can I load images from a database?**  
A: Yes! Fetch images in `useEffect` or Astro endpoint and pass to ImageGallery.

---

## Related Components

- **StatCard** — Metric display cards
- **ActionCard** — Call-to-action cards  
- **StoryCard** — Narrative cards
- **MediaCard** — Image cards (this doc)
- **ImageGallery** — Full gallery system (this doc)

---

*Last Updated: 2026-07-14*  
*Ready for 21st dev publishing*

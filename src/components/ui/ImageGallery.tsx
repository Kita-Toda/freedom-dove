import React, { useState } from 'react';
import MediaCard from './MediaCard';

interface GalleryImage {
  image: string;
  title: string;
  description?: string;
  category?: string;
  href?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: 1 | 2 | 3 | 4;
  category?: string;
  title?: string;
  description?: string;
  showOverlay?: boolean;
}

export default function ImageGallery({
  images,
  columns = 3,
  category,
  title,
  description,
  showOverlay = true,
}: ImageGalleryProps) {
  const [filter, setFilter] = useState<string | null>(null);

  // Extract unique categories
  const categories = Array.from(
    new Set(images.map((img) => img.category).filter(Boolean))
  );

  // Filter images
  const filteredImages = filter
    ? images.filter((img) => img.category === filter)
    : images;

  const columnClasses = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  };

  return (
    <section className="py-20 px-4 md:px-12 bg-gradient-to-b from-black to-charcoal">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {(title || category) && (
          <div className="mb-20">
            {category && (
              <div className="text-gold text-xs uppercase tracking-[0.2em] font-semibold opacity-80 mb-6">
                {category}
              </div>
            )}
            {title && (
              <h2 className="text-6xl md:text-7xl font-black text-cream leading-tight mb-8" style={{ letterSpacing: '-2px' }}>
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xl text-cream/80 max-w-2xl">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="mb-12 flex flex-wrap gap-4">
            <button
              onClick={() => setFilter(null)}
              className={`px-6 py-2 rounded-full font-semibold uppercase text-sm tracking-wider transition-all duration-300 ${
                filter === null
                  ? 'bg-gold text-black'
                  : 'border-2 border-gold/40 text-cream hover:border-gold'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-semibold uppercase text-sm tracking-wider transition-all duration-300 ${
                  filter === cat
                    ? 'bg-gold text-black'
                    : 'border-2 border-gold/40 text-cream hover:border-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        <div className={`grid grid-cols-1 ${columnClasses[columns]} gap-8`}>
          {filteredImages.map((img, i) => (
            <MediaCard
              key={i}
              image={img.image}
              title={img.title}
              description={img.description}
              category={img.category}
              href={img.href}
              overlay={showOverlay}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-cream/60 text-lg">
              No images found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

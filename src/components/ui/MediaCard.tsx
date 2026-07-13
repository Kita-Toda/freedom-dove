import React from 'react';

interface MediaCardProps {
  image: string;           // Image URL or path
  title: string;          // Title overlay
  description?: string;   // Optional description
  href?: string;          // Optional link
  category?: string;      // Optional category badge
  overlay?: boolean;      // Show overlay on hover
}

export default function MediaCard({
  image,
  title,
  description,
  href,
  category,
  overlay = true,
}: MediaCardProps) {
  const Content = (
    <div className="relative overflow-hidden rounded-2xl bg-charcoal h-80 group">
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
          {category && (
            <span className="text-gold text-xs uppercase tracking-widest font-semibold mb-2">
              {category}
            </span>
          )}
          <h3 className="text-2xl font-bold text-cream mb-2">{title}</h3>
          {description && (
            <p className="text-cream/80 text-sm leading-relaxed">{description}</p>
          )}
        </div>
      )}

      {/* Static overlay (no hover) */}
      {!overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-8">
          {category && (
            <span className="text-gold text-xs uppercase tracking-widest font-semibold mb-2">
              {category}
            </span>
          )}
          <h3 className="text-2xl font-bold text-cream">{title}</h3>
          {description && (
            <p className="text-cream/80 text-sm leading-relaxed">{description}</p>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {Content}
      </a>
    );
  }

  return Content;
}

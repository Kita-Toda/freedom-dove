import React from 'react';

interface StoryCardProps {
  title: string;
  description: string;
  region: string;
}

export default function StoryCard({
  title,
  description,
  region,
}: StoryCardProps) {
  return (
    <div className="group relative">
      <div className="absolute -inset-4 bg-gradient-to-r from-gold/10 to-mauve/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
      <div className="relative bg-charcoal border border-gold/20 rounded-2xl p-8 md:p-12 group-hover:border-gold/50 transition-colors duration-300">
        <div className="flex items-start justify-between mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-gold">{title}</h3>
          <span className="text-cream/60 text-sm uppercase tracking-wider font-semibold">
            {region}
          </span>
        </div>
        <p className="text-lg text-cream/80 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

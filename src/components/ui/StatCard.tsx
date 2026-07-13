import React from 'react';

interface StatCardProps {
  number: string;
  label: string;
  description: string;
  accentColor?: 'gold' | 'mauve' | 'gold-light' | 'cream';
  glowColor?: string;
}

export default function StatCard({
  number,
  label,
  description,
  accentColor = 'gold',
  glowColor = 'from-gold/25 to-gold/10',
}: StatCardProps) {
  const colorMap = {
    gold: 'text-gold border-gold/40',
    mauve: 'text-mauve-light border-mauve/40',
    'gold-light': 'text-gold-light border-gold-light/40',
    cream: 'text-cream border-cream/40',
  };

  return (
    <div className="relative group">
      <div className={`absolute -inset-2 bg-gradient-to-r ${glowColor} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`}></div>
      <div className={`relative bg-charcoal/50 border ${colorMap[accentColor]} rounded-2xl p-8 backdrop-blur-sm hover:border-opacity-100 transition-colors duration-300`}>
        <div className={`text-5xl font-black ${colorMap[accentColor].split(' ')[0]} mb-3`}>
          {number}
        </div>
        <div className="text-lg font-bold text-cream mb-2">{label}</div>
        <p className="text-cream/70 text-sm">{description}</p>
      </div>
    </div>
  );
}

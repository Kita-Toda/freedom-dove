import React from 'react';

interface ActionCardProps {
  title: string;
  description: string;
  icon: string;
  color: 'gold' | 'mauve' | 'gold-light' | 'cream';
  ctaText: string;
  ctaHref: string;
  features?: string[];
}

export default function ActionCard({
  title,
  description,
  icon,
  color,
  ctaText,
  ctaHref,
  features = [],
}: ActionCardProps) {
  const colorMap = {
    gold: {
      text: 'text-gold',
      border: 'border-gold/40',
      bg: 'hover:shadow-gold/20',
      button: 'bg-gold text-black',
    },
    mauve: {
      text: 'text-mauve-light',
      border: 'border-mauve/40',
      bg: 'hover:shadow-mauve/20',
      button: 'bg-mauve text-black',
    },
    'gold-light': {
      text: 'text-gold-light',
      border: 'border-gold-light/40',
      bg: 'hover:shadow-gold-light/20',
      button: 'bg-gold-light text-black',
    },
    cream: {
      text: 'text-cream',
      border: 'border-cream/40',
      bg: 'hover:shadow-cream/20',
      button: 'border-2 border-cream text-cream hover:bg-cream hover:text-black',
    },
  };

  const styles = colorMap[color];

  return (
    <div className="group">
      <div className={`relative bg-charcoal/50 border ${styles.border} rounded-3xl p-12 ${styles.bg} transition-all duration-300 h-full`}>
        <div className={`text-5xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <h2 className={`text-3xl font-bold ${styles.text} mb-4`}>{title}</h2>
        <p className="text-cream/80 leading-relaxed mb-8">{description}</p>

        {features.length > 0 && (
          <ul className="space-y-3 text-cream/70 text-sm mb-8">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <span className={`${styles.text} mr-3`}>✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <a
          href={ctaHref}
          className={`inline-block px-8 py-3 font-bold rounded-full hover:scale-[1.02] transition-transform duration-200 uppercase text-sm tracking-wider ${styles.button}`}
        >
          {ctaText}
        </a>
      </div>
    </div>
  );
}

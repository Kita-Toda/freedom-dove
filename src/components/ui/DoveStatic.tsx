interface DoveStaticProps {
  className?: string;
}

/**
 * Static dove used on mobile, on reduced-motion, and as the Suspense fallback
 * while the WebGL scene loads on desktop.
 *
 * Deliberately an inline SVG rather than an image: it is ~1KB, costs no network
 * request, stays sharp at any size, and replaces a 467KB three.js bundle on the
 * viewports least able to afford it.
 */
export default function DoveStatic({ className = '' }: DoveStaticProps) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      {/* On-brand glow behind the bird, matching the WebGL scene's gold spotlight */}
      <div
        className="absolute w-[70%] max-w-md aspect-square rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,165,116,0.22) 0%, transparent 70%)' }}
      />
      <svg
        viewBox="0 0 300 220"
        className="relative w-[62%] max-w-sm h-auto motion-safe:animate-dove-float"
        role="img"
        aria-label="A dove in flight"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="#d4a574">
          {/* Body, head and forked tail as one flowing shape */}
          <path d="M262 72l14 4c3 1 3 5 0 6l-16 6c-2 10-9 18-19 21-30 9-56 27-77 52l-18 22c-3 4-10 2-9-4l6-34c1-6 3-11 5-16-11 5-21 12-29 21l-14 15c-4 4-11 0-9-6l11-31c11-30 39-50 71-50 6 0 12 1 18 3l7-6c6-4 14-5 21-3l38-0z" />
          {/* Raised wing */}
          <path d="M168 104c-14-24-20-51-17-78 1-6 8-7 11-2 14 22 21 48 19 74-0 7-9 12-13 6z" />
          <circle cx="258" cy="80" r="3.2" fill="#0a0a0a" />
        </g>
      </svg>
    </div>
  );
}

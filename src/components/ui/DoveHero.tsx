import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BeamsBackground } from './BeamsBackground';
import DoveStatic from './DoveStatic';

// Lazily imported so three.js lands in its own chunk. Phones and reduced-motion
// users never request it at all — a static import would ship all 467KB to every
// visitor regardless of whether the scene is ever rendered.
const DoveScene = lazy(() => import('../DoveScene'));

interface DoveHeroProps {
  missionText?: string;
  showScrollPrompt?: boolean;
  beamsIntensity?: 'subtle' | 'medium' | 'strong';
}

export default function DoveHero({
  missionText = "For The Forgotten. For The Voiceless. For A World Without Chains.",
  showScrollPrompt = true,
  beamsIntensity = 'medium',
}: DoveHeroProps) {
  // Starts false so the first paint (and any SSR pass) is the cheap static dove;
  // the WebGL scene is opted into only after we know the viewport can afford it.
  const [use3D, setUse3D] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 768px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setUse3D(wide.matches && !reduced.matches);
    update();
    wide.addEventListener('change', update);
    reduced.addEventListener('change', update);
    return () => {
      wide.removeEventListener('change', update);
      reduced.removeEventListener('change', update);
    };
  }, []);

  return (
    <BeamsBackground intensity={beamsIntensity} className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Imagery */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent"></div>
        <div
          className="absolute top-1/4 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{background: 'radial-gradient(circle, rgba(212,165,116,0.15) 0%, transparent 70%)'}}
        ></div>
        <div
          className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full blur-3xl"
          style={{background: 'radial-gradient(circle, rgba(139,111,142,0.15) 0%, transparent 70%)'}}
        ></div>
      </div>

      {/* Hero content. Single centred column so the mission text sits directly
          under the dove at every size — it used to be absolutely positioned with
          a fixed mt-96, which on a 375px screen pushed it 556px down a mostly
          empty viewport. */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full flex-1 px-4 py-24 gap-8 md:gap-10">
        <div className="w-full h-[38vh] sm:h-[42vh] md:h-[52vh] max-h-[520px]">
          {use3D ? (
            <Suspense fallback={<DoveStatic />}>
              <DoveScene />
            </Suspense>
          ) : (
            <DoveStatic />
          )}
        </div>

        <p className="text-lg sm:text-xl text-cream font-light tracking-wide max-w-2xl mx-auto text-center text-balance">
          {missionText}
        </p>
      </div>

      {/* Scroll Prompt */}
      {showScrollPrompt && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none z-10">
          <div className="animate-bounce text-gold opacity-60">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      )}
    </BeamsBackground>
  );
}

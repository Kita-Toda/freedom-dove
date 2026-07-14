import React from 'react';
import DoveScene from '../DoveScene';

interface DoveHeroProps {
  missionText?: string;
  showScrollPrompt?: boolean;
}

export default function DoveHero({
  missionText = "For The Forgotten. For The Voiceless. For A World Without Chains.",
  showScrollPrompt = true,
}: DoveHeroProps) {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-black via-black to-charcoal">
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

      {/* Dove Scene */}
      <div className="w-full h-3/4">
        <DoveScene client:load />
      </div>

      {/* Mission Statement */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <div className="mt-96">
          <p className="text-xl text-cream font-light tracking-widest max-w-2xl mx-auto">
            {missionText}
          </p>
        </div>
      </div>

      {/* Scroll Prompt */}
      {showScrollPrompt && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none">
          <div className="animate-bounce text-gold opacity-60">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

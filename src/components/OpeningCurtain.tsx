/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Opening Curtain: Respectful autoplay & audio permission gateway
 */

import React from 'react';
import { Volume2, Sparkles, BookOpen } from 'lucide-react';

interface OpeningCurtainProps {
  onStart: () => void;
  onOpenDossier: () => void;
}

export const OpeningCurtain: React.FC<OpeningCurtainProps> = ({
  onStart,
  onOpenDossier
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#060403] flex flex-col items-center justify-center p-6 select-none overflow-hidden">
      {/* Subtle Golden Mandala Watermark */}
      <div className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-[#d4af37]/20 flex items-center justify-center pointer-events-none opacity-40 animate-[spin_120s_linear_infinite]">
        <div className="w-[80%] h-[80%] rounded-full border border-[#d4af37]/20 flex items-center justify-center">
          <div className="w-[70%] h-[70%] rounded-full border border-[#d4af37]/25" />
        </div>
      </div>

      {/* Central Card */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl space-y-6">
        {/* Sacred Flame / Om Symbol */}
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-t from-[#8c5211] to-[#d4af37] p-[2px] shadow-[0_0_35px_rgba(212,175,55,0.7)] flex items-center justify-center">
          <div className="w-full h-full bg-[#140d07] rounded-full flex items-center justify-center">
            <span className="font-yatra text-2xl md:text-3xl text-[#ffd700]">
              ॐ
            </span>
          </div>
        </div>

        {/* Title Presentation */}
        <div className="space-y-2">
          <div className="text-[11px] md:text-xs font-cinzel tracking-[0.35em] text-[#d4af37] uppercase">
            A Cinematic Storytelling Experience
          </div>
          <h1 className="font-cinzel text-3xl md:text-5xl font-black tracking-widest text-[#F5DEB3] drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            RAMAYANA
          </h1>
          <h2 className="font-cinzel text-sm md:text-xl font-bold tracking-[0.25em] text-[#E8C56A]">
            WHEN THE SCREEN BREAKS
          </h2>
          <p className="font-serif italic text-sm md:text-base text-[#cbbba9] opacity-80 pt-1">
            "Some stories were never meant to stay on a page."
          </p>
        </div>

        {/* Primary Action: Begin the Experience with Sound */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onStart}
            className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-[#8c5a1a] via-[#c28424] to-[#e6a832] text-black font-cinzel font-bold tracking-widest text-sm shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:shadow-[0_0_45px_rgba(212,175,55,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
            <span>ENTER THE EPIC WITH SOUND</span>
          </button>

          <button
            onClick={onOpenDossier}
            className="px-5 py-3 rounded-full bg-[#1a120b] hover:bg-[#2b1b11] text-[#ffd700] border border-[#d4af37]/40 font-cinzel text-xs tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Director's Dossier</span>
          </button>
        </div>

        {/* Technical Notice */}
        <div className="text-[11px] font-mono text-[#8c745e] pt-2 max-w-md">
          Autoplay experience: ~120 seconds duration. Features Sage Narrator Voice, Web Audio epic orchestra, and Three.js 3D Temple Sanctum.
        </div>
      </div>
    </div>
  );
};

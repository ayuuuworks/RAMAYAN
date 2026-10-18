/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Character Roster Banner: Recreating the top banner of the Director's Storyboard
 * Displays Lord Rama, Sita, Lakshmana, Hanuman, and Ravana with manhwa aesthetic.
 */

import React from 'react';
import { CHARACTERS } from '../data/storyboardData';
import { CharacterProfile } from '../types';

interface CharacterRosterBarProps {
  onSelectCharacter: (char: CharacterProfile) => void;
  selectedCharId?: string;
  isCompact?: boolean;
}

export const CharacterRosterBar: React.FC<CharacterRosterBarProps> = ({
  onSelectCharacter,
  selectedCharId,
  isCompact = false
}) => {
  return (
    <div className="w-full bg-gradient-to-b from-[#0e0a07] via-[#17100b] to-transparent pt-2 pb-3 px-3 sm:px-6 z-30 select-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
        {/* Left: 5 Iconic Character Cards */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {Object.values(CHARACTERS).map((char) => {
            const isSelected = selectedCharId === char.id;
            return (
              <button
                key={char.id}
                onClick={() => onSelectCharacter(char)}
                className={`group relative flex items-center gap-2 px-2.5 py-1.5 rounded-xl border transition-all duration-300 text-left ${
                  isSelected
                    ? 'bg-[#3b2713] border-[#ffd700] shadow-[0_0_15px_rgba(255,215,0,0.4)] scale-105'
                    : 'bg-[#150f0a]/90 hover:bg-[#26170d] border-[#382618] hover:border-[#8c6729]'
                }`}
              >
                {/* Character Manhwa Avatar */}
                <div
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden flex items-center justify-center border shadow-inner shrink-0"
                  style={{
                    backgroundColor: `${char.colorTheme}15`,
                    borderColor: `${char.colorTheme}60`
                  }}
                >
                  {renderCharacterIcon(char.id)}
                </div>

                {/* Character Name & Sanskrit Title */}
                <div className="flex flex-col">
                  <span className="font-cinzel text-xs font-bold text-[#F5DEB3] group-hover:text-[#ffd700] transition-colors leading-tight">
                    {char.name}
                  </span>
                  <span className="text-[10px] font-serif text-[#d4af37] opacity-80 leading-tight">
                    {char.sanskritName}
                  </span>
                </div>

                {/* Active Indicator */}
                {isSelected && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ffd700] ml-1 shadow-[0_0_6px_#ffd700]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Title Tag Badge (Matching Storyboard Top Right) */}
        <div className="hidden lg:flex flex-col items-end shrink-0 pl-4 border-l border-[#3a2717]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ffd700] animate-pulse" />
            <span className="font-cinzel text-xs font-bold tracking-widest text-[#ffd700]">
              RAMAYANA
            </span>
            <span className="text-[10px] font-mono text-[#a88a6d] tracking-widest">
              • LIVE MANHWA
            </span>
          </div>
          <span className="text-[10px] font-serif italic text-[#cbbba9] opacity-75">
            "Some stories were never meant to stay on a page."
          </span>
        </div>
      </div>
    </div>
  );
};

function renderCharacterIcon(id: string) {
  switch (id) {
    case 'rama':
      return (
        <svg viewBox="0 0 100 100" className="w-6 h-6 text-[#38bdf8]">
          <circle cx="50" cy="45" r="24" fill="#38bdf8" />
          <polygon points="40,24 50,5 60,24" fill="#ffd700" />
          <circle cx="50" cy="45" r="32" fill="none" stroke="#ffd700" strokeWidth="3" opacity="0.8" />
          {/* Eyes */}
          <ellipse cx="43" cy="45" rx="3" ry="1.5" fill="#0c4a6e" />
          <ellipse cx="57" cy="45" rx="3" ry="1.5" fill="#0c4a6e" />
        </svg>
      );
    case 'sita':
      return (
        <svg viewBox="0 0 100 100" className="w-6 h-6 text-[#f43f5e]">
          <circle cx="50" cy="46" r="22" fill="#fed7aa" />
          <path d="M 28,45 Q 50,15 72,45 L 72,75 L 28,75 Z" fill="#e11d48" opacity="0.9" />
          <circle cx="50" cy="30" r="3" fill="#ffd700" />
          {/* Lotus */}
          <circle cx="50" cy="80" r="8" fill="#fda4af" />
        </svg>
      );
    case 'lakshmana':
      return (
        <svg viewBox="0 0 100 100" className="w-6 h-6 text-[#fb923c]">
          <circle cx="50" cy="45" r="22" fill="#fed7aa" />
          <polygon points="42,25 50,12 58,25" fill="#f59e0b" />
          {/* Bow string */}
          <path d="M 75,15 Q 90,50 75,85" fill="none" stroke="#ffd700" strokeWidth="4" />
        </svg>
      );
    case 'hanuman':
      return (
        <svg viewBox="0 0 100 100" className="w-6 h-6 text-[#eab308]">
          <circle cx="50" cy="46" r="24" fill="#eab308" />
          <polygon points="38,24 50,8 62,24" fill="#ffd700" />
          <circle cx="50" cy="46" r="34" fill="none" stroke="#ffd700" strokeWidth="2.5" />
          {/* Golden Gada */}
          <circle cx="78" cy="32" r="8" fill="#ffd700" />
        </svg>
      );
    case 'ravana':
      return (
        <svg viewBox="0 0 100 100" className="w-7 h-7 text-[#ef4444]">
          {/* Fan of heads */}
          <circle cx="28" cy="45" r="8" fill="#450a0a" />
          <circle cx="50" cy="40" r="12" fill="#7f1d1d" stroke="#ffd700" strokeWidth="1" />
          <circle cx="72" cy="45" r="8" fill="#450a0a" />
          {/* Glowing Red Eyes */}
          <circle cx="46" cy="40" r="2" fill="#ef4444" />
          <circle cx="54" cy="40" r="2" fill="#ef4444" />
          {/* Swords */}
          <line x1="20" y1="20" x2="35" y2="40" stroke="#ffd700" strokeWidth="2" />
          <line x1="80" y1="20" x2="65" y2="40" stroke="#ffd700" strokeWidth="2" />
        </svg>
      );
    default:
      return null;
  }
}

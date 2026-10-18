/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Cinematic Scene Visuals Engine: Live Cinematic Real Manhwa-Inspired Visuals
 * High-impact comic speed lines, screen shakes, celestial auras, and bold manhwa character figures
 */

import React, { useEffect, useState } from 'react';
import { StoryScene, SupportedLanguage } from '../types';

interface CinematicSceneVisualsProps {
  scene: StoryScene;
  progress: number; // 0 to 1 within current scene
  isPlaying: boolean;
  language: SupportedLanguage;
  isPunchyMode?: boolean;
}

export const CinematicSceneVisuals: React.FC<CinematicSceneVisualsProps> = ({
  scene,
  progress,
  isPlaying,
  language,
  isPunchyMode = true
}) => {
  const [pulse, setPulse] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  // Screen shake on action impacts
  useEffect(() => {
    if (scene.directorNotes.actionImpact === 'heavy' || scene.directorNotes.actionImpact === 'colossal') {
      setIsShaking(true);
      const timer = setTimeout(() => setIsShaking(false), 900);
      return () => clearTimeout(timer);
    }
    setIsShaking(false);
  }, [scene.id, scene.directorNotes.actionImpact]);

  useEffect(() => {
    let animId: number;
    let t = 0;
    const loop = () => {
      t += 0.035;
      setPulse(Math.sin(t));
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Punchy Camera Transforms:
  // Instead of a sluggish linear zoom, we use a snappy power curve with dramatic punch cuts
  const punchZoom = isPunchyMode
    ? 1.05 + Math.pow(progress, 1.4) * 0.22 + (isShaking ? 0.08 : 0)
    : 1.0 + progress * 0.12;

  const shakeOffsetX = isShaking ? (Math.random() - 0.5) * 22 : 0;
  const shakeOffsetY = isShaking ? (Math.random() - 0.5) * 18 : 0;

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-black select-none ${
        isShaking ? 'animate-[pulse_0.1s_ease-in-out_infinite]' : ''
      }`}
    >
      {/* Dynamic Camera Transform Layer */}
      <div
        className="w-full h-full transition-transform duration-300 ease-out"
        style={{
          transform: `scale(${punchZoom}) translate(${shakeOffsetX}px, ${shakeOffsetY}px)`
        }}
      >
        {renderManhwaScene(scene.id, progress, pulse, isShaking)}
      </div>

      {/* Manga / Manhwa Action Speed Lines Overlay (Triggers on high impact scenes) */}
      {(scene.directorNotes.actionImpact === 'heavy' || scene.directorNotes.actionImpact === 'colossal' || isShaking) && (
        <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-70 z-20">
          <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
            {/* Radial Speed Lines from Center */}
            {[...Array(32)].map((_, i) => {
              const angle = (i / 32) * Math.PI * 2;
              const r1 = 180 + (i % 3) * 60;
              const r2 = 900;
              const x1 = 500 + Math.cos(angle) * r1;
              const y1 = 300 + Math.sin(angle) * r1;
              const x2 = 500 + Math.cos(angle) * r2;
              const y2 = 300 + Math.sin(angle) * r2;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#ffd700"
                  strokeWidth={2 + (i % 4) * 2}
                  opacity={0.4 + 0.5 * Math.sin(pulse * 8 + i)}
                />
              );
            })}
          </svg>
        </div>
      )}

      {/* Electric Spark & Golden Ember Field */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-75 z-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="electricGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="30%" stopColor="#ffd700" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ff4500" stopOpacity="0" />
            </radialGradient>
          </defs>
          {[...Array(28)].map((_, i) => {
            const cx = ((i * 39 + progress * 140) % 100);
            const cy = (100 - ((i * 59 + progress * 190) % 100));
            return (
              <circle
                key={i}
                cx={`${cx}%`}
                cy={`${cy}%`}
                r={1.8 + (i % 3) * 2}
                fill="url(#electricGlow)"
                opacity={0.4 + 0.6 * Math.sin(pulse * 5 + i)}
              />
            );
          })}
        </svg>
      </div>

      {/* Ornate Ancient Indian Manuscript Gold Filigree Border */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {/* Double Gold Framing */}
        <div className="absolute inset-2 md:inset-4 border-2 border-[#D4AF37]/50 rounded-sm pointer-events-none shadow-[inset_0_0_30px_rgba(212,175,55,0.25)]" />
        <div className="absolute inset-3 md:inset-6 border border-[#ffd700]/75 rounded-sm pointer-events-none" />

        {/* Four Corner Ornaments */}
        {['top-2 left-2 md:top-4 md:left-4', 'top-2 right-2 md:top-4 md:right-4 rotate-90', 'bottom-2 right-2 md:bottom-4 md:right-4 rotate-180', 'bottom-2 left-2 md:bottom-4 md:left-4 -rotate-90'].map((pos, idx) => (
          <div key={idx} className={`absolute ${pos} w-10 h-10 md:w-16 md:h-16 text-[#ffd700] drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]`}>
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M 0,0 L 50,0 C 45,15 35,25 25,35 C 15,45 0,50 0,50 Z" opacity="0.7" />
              <circle cx="18" cy="18" r="6" fill="#FFF" />
              <path d="M 0,0 L 80,0 L 70,8 L 8,8 L 8,70 L 0,80 Z" />
            </svg>
          </div>
        ))}

        {/* Top Centered Sanskrit Shloka Badge */}
        <div className="absolute top-2.5 md:top-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 bg-black/85 border border-[#ffd700]/40 px-5 py-1 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.8)] max-w-[90vw] truncate">
          <div className="w-2 h-2 rounded-full bg-[#ffd700] shadow-[0_0_6px_#ffd700] shrink-0" />
          <span className="text-[11px] md:text-xs font-cinzel tracking-wider text-[#ffd700] font-bold truncate">
            {scene.sanskritTitle}
          </span>
          <span className="text-[10px] md:text-xs font-serif text-[#F4E0B9] opacity-80 hidden sm:inline truncate">
            • {scene.hindiTitle}
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * HIGH-IMPACT MANHWA ANIME ARTWORK FOR EACH STORY MOMENT
 * Authentic figures with muscular silhouettes, cel-shaded glowing auras, sharp eyes, and dynamic compositions
 */
function renderManhwaScene(sceneId: number, progress: number, pulse: number, isShaking: boolean) {
  switch (sceneId) {
    case 0: // The Screen Breaks
      return (
        <div className="relative w-full h-full bg-[#080503] flex items-center justify-center overflow-hidden">
          {/* Cosmic Aura Explosion */}
          <div
            className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#ffd700] via-[#ff8c00] to-transparent blur-3xl opacity-50"
            style={{ transform: `scale(${1 + pulse * 0.15})` }}
          />

          {/* Central Manhwa Glowing Book with Bursting Light */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl">
            <div className="relative w-72 h-44 md:w-96 md:h-60 mb-6 drop-shadow-[0_0_60px_rgba(255,215,0,0.95)]">
              <svg viewBox="0 0 500 320" className="w-full h-full">
                {/* Book Spreading Open */}
                <path d="M 250,260 Q 150,290 40,250 Q 20,80 50,60 Q 160,40 250,80 Z" fill="#edd6b1" stroke="#b8860b" strokeWidth="5" />
                <path d="M 250,260 Q 350,290 460,250 Q 480,80 450,60 Q 340,40 250,80 Z" fill="#fff5e6" stroke="#b8860b" strokeWidth="5" />
                {/* Glowing Sanskrit Text Lines */}
                <path d="M 90,110 L 210,110" stroke="#996515" strokeWidth="4" strokeLinecap="round" />
                <path d="M 90,140 L 210,140" stroke="#996515" strokeWidth="4" strokeLinecap="round" />
                <path d="M 90,170 L 210,170" stroke="#996515" strokeWidth="4" strokeLinecap="round" />
                <path d="M 290,110 L 410,110" stroke="#996515" strokeWidth="4" strokeLinecap="round" />
                <path d="M 290,140 L 410,140" stroke="#996515" strokeWidth="4" strokeLinecap="round" />
                <path d="M 290,170 L 410,170" stroke="#996515" strokeWidth="4" strokeLinecap="round" />
                {/* Shattering Golden Shards (Screen Breaks Effect) */}
                <polygon points="250,40 280,10 240,20" fill="#ffd700" />
                <polygon points="210,20 230,-10 190,5" fill="#ffe066" />
                <polygon points="290,20 320,-5 280,15" fill="#ffe066" />
                <polygon points="170,40 140,10 160,35" fill="#ffd700" />
                <polygon points="330,40 360,10 340,35" fill="#ffd700" />
              </svg>
            </div>

            <h1 className="font-cinzel text-4xl md:text-6xl lg:text-7xl font-black tracking-widest text-[#FFF2D0] drop-shadow-[0_6px_25px_rgba(255,215,0,0.8)]">
              RAMAYANA
            </h1>
            <h2 className="font-cinzel text-lg md:text-2xl font-bold tracking-[0.35em] text-[#FFD700] mt-2 mb-2">
              WHEN THE SCREEN BREAKS
            </h2>
            <div className="font-yatra text-base md:text-xl text-[#FDE68A] tracking-wider mb-2">
              ॥ यतो धर्मस्ततो जयः ॥
            </div>
            <p className="font-serif italic text-sm md:text-base text-[#E0CEB0] opacity-85">
              "Some stories were never meant to stay on a page."
            </p>
          </div>
        </div>
      );

    case 1: // Ayodhya: The Kingdom of Light
      return (
        <div className="relative w-full h-full bg-gradient-to-b from-[#ff8c00] via-[#ea580c] to-[#9a3412] overflow-hidden">
          {/* Blazing Giant Sunburst */}
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-b from-[#fffbeb] via-[#fde047] to-transparent blur-3xl opacity-80"
            style={{ transform: `scale(${1 + pulse * 0.08})` }}
          />

          {/* Manhwa Ayodhya Palace Towers Silhouette */}
          <svg className="absolute bottom-20 md:bottom-28 w-full h-56 md:h-96" viewBox="0 0 1200 500" preserveAspectRatio="none">
            {/* Grand Vedic Temples & Ramparts */}
            <path d="M 0,500 L 0,260 L 50,250 L 100,120 L 150,250 L 200,260 L 260,190 L 320,60 L 380,190 L 440,260 L 520,160 L 600,20 L 680,160 L 760,260 L 840,180 L 920,50 L 1000,180 L 1080,260 L 1200,200 L 1200,500 Z" fill="#78350f" opacity="0.9" />
            <path d="M 80,500 L 140,320 L 220,180 L 320,80 L 420,180 L 500,320 L 600,40 L 700,320 L 800,160 L 900,320 L 1000,180 L 1120,320 L 1200,300 L 1200,500 Z" fill="#451a03" />
            {/* Golden Kalash Pinnacles with light flares */}
            <circle cx="320" cy="55" r="9" fill="#ffd700" />
            <circle cx="600" cy="15" r="14" fill="#ffd700" />
            <circle cx="920" cy="45" r="10" fill="#ffd700" />
          </svg>

          {/* Saffron Temple Banners along Shikhara Spire Peaks */}
          <div className="absolute top-24 md:top-36 inset-x-0 flex justify-around pointer-events-none">
            <div className="animate-flag-flutter origin-left">
              <svg width="60" height="30" viewBox="0 0 60 30">
                <polygon points="0,0 60,15 0,30" fill="#f97316" />
                <line x1="0" y1="0" x2="0" y2="30" stroke="#ffd700" strokeWidth="2" />
              </svg>
            </div>
            <div className="animate-flag-flutter-fast origin-left delay-300">
              <svg width="70" height="35" viewBox="0 0 70 35">
                <polygon points="0,0 70,18 0,35" fill="#f59e0b" />
                <line x1="0" y1="0" x2="0" y2="35" stroke="#ffd700" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Shimmering Sacred Sarayu River with Animated Saffron Flags */}
          <div className="absolute bottom-0 w-full h-28 md:h-44 bg-gradient-to-t from-[#0f172a] via-[#1e3a5f] to-[#b45309]">
            <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
              <path d="M 0,60 Q 250,30 500,60 T 1000,60 L 1000,200 L 0,200 Z" fill="#0b2238" opacity="0.8" />
              {/* Saffron flags along ghats with Cloth Flutter Animation Layer */}
              <line x1="200" y1="60" x2="200" y2="10" stroke="#78350f" strokeWidth="3" />
              <g className="animate-flag-flutter" style={{ transformOrigin: '200px 30px' }}>
                <polygon points="200,45 245,30 200,15" fill="#f97316" />
                <polygon points="200,40 230,30 200,20" fill="#fde047" opacity="0.6" />
              </g>

              <line x1="750" y1="60" x2="750" y2="10" stroke="#78350f" strokeWidth="3" />
              <g className="animate-flag-flutter-fast" style={{ transformOrigin: '750px 30px' }}>
                <polygon points="750,45 795,30 750,15" fill="#ea580c" />
                <polygon points="750,40 780,30 750,20" fill="#fde047" opacity="0.6" />
              </g>
            </svg>
          </div>

          {/* Manhwa Banner Tag */}
          <div className="absolute bottom-4 left-6 md:left-14 bg-black/80 border border-[#ffd700]/50 px-4 py-2 rounded-xl">
            <span className="font-cinzel text-xs md:text-sm text-[#ffd700] font-black tracking-widest block">
              AYODHYA • THE SUNREALM
            </span>
            <span className="font-yatra text-[11px] text-[#fde047]">
              रघुकुल रीत सदा चलि आई, प्रान जाहुं बरु बचनु न जाई
            </span>
          </div>
        </div>
      );

    case 2: // The Forest of Exile
      return (
        <div className="relative w-full h-full bg-gradient-to-b from-[#064e3b] via-[#065f46] to-[#022c22] overflow-hidden">
          {/* Volumetric Green Sunbeams */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#86efac]/20 to-transparent pointer-events-none" />

          {/* Massive Primeval Jungle Roots */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 700" preserveAspectRatio="none">
            <path d="M 0,0 C 180,240 220,320 200,700 L 100,700 C 140,320 80,200 0,0 Z" fill="#022c22" />
            <path d="M 1200,0 C 1020,240 980,320 1000,700 L 1100,700 C 1060,320 1120,200 1200,0 Z" fill="#022c22" />
          </svg>

          {/* Heroic Trio in Full Manhwa Action Silhouette with Animated Cloth Drapes */}
          <div className="absolute bottom-16 md:bottom-28 left-1/2 -translate-x-1/2 flex items-end gap-8 md:gap-14">
            {/* Lakshmana: Vigilant Guardian with Animated Warrior Sash */}
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 140 240" className="w-20 h-36 md:w-28 md:h-52 drop-shadow-[0_0_20px_rgba(251,146,60,0.7)]">
                <ellipse cx="70" cy="38" rx="15" ry="18" fill="#fed7aa" />
                <polygon points="58,22 70,8 82,22" fill="#f59e0b" />
                <path d="M 45,55 L 95,55 L 105,140 L 35,140 Z" fill="#c2410c" />
                
                {/* Animated Warrior Sash Drape */}
                <g className="animate-cloth-wave" style={{ transformOrigin: '70px 120px' }}>
                  <path d="M 60,110 Q 35,160 25,215 Q 50,195 70,180 Z" fill="#ea580c" opacity="0.95" />
                  <path d="M 25,215 L 30,225" stroke="#ffd700" strokeWidth="2" />
                </g>

                <line x1="50" y1="140" x2="45" y2="225" stroke="#fed7aa" strokeWidth="11" strokeLinecap="round" />
                <line x1="90" y1="140" x2="95" y2="225" stroke="#fed7aa" strokeWidth="11" strokeLinecap="round" />
                <path d="M 25,10 Q 5,100 25,200" fill="none" stroke="#ffd700" strokeWidth="6" />
                <line x1="25" y1="10" x2="25" y2="200" stroke="#fff" strokeWidth="2" />
              </svg>
              <span className="font-cinzel text-xs text-[#fb923c] font-bold mt-1">Lakshmana</span>
            </div>

            {/* Lord Rama: Divine Cyan Hero with Flowing Golden Pitambara Sash */}
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 160 280" className="w-24 h-44 md:w-36 md:h-64 drop-shadow-[0_0_35px_rgba(56,189,248,0.9)]">
                <ellipse cx="80" cy="40" rx="18" ry="22" fill="#38bdf8" />
                <circle cx="80" cy="40" r="28" fill="none" stroke="#ffd700" strokeWidth="3" opacity="0.9" />
                <polygon points="65,22 80,4 95,22" fill="#ffd700" />
                <path d="M 50,62 L 110,62 L 120,165 L 40,165 Z" fill="#d97706" />

                {/* Animated Golden Pitambara Cloth Drape */}
                <g className="animate-cloth-wave" style={{ transformOrigin: '80px 120px' }}>
                  <path d="M 75,95 Q 40,140 25,235 Q 60,210 90,195 Z" fill="#f59e0b" opacity="0.95" />
                  <path d="M 25,235 Q 55,215 85,200" stroke="#ffd700" strokeWidth="3" fill="none" />
                </g>

                <line x1="58" y1="165" x2="52" y2="265" stroke="#38bdf8" strokeWidth="13" strokeLinecap="round" />
                <line x1="102" y1="165" x2="108" y2="265" stroke="#38bdf8" strokeWidth="13" strokeLinecap="round" />
                <path d="M 125,10 Q 155,120 125,240" fill="none" stroke="#ffd700" strokeWidth="7" />
                <line x1="125" y1="10" x2="125" y2="240" stroke="#fff" strokeWidth="2" />
              </svg>
              <span className="font-cinzel text-xs md:text-sm text-[#38bdf8] font-black mt-1">Lord Rama</span>
            </div>

            {/* Mata Sita: Radiant Empress with Flowing Crimson Sari Pallu */}
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 140 240" className="w-20 h-36 md:w-28 md:h-52 drop-shadow-[0_0_25px_rgba(244,63,94,0.8)]">
                <ellipse cx="70" cy="40" rx="14" ry="17" fill="#fed7aa" />
                <path d="M 45,58 L 95,58 L 115,225 L 25,225 Z" fill="#e11d48" />

                {/* Animated Crimson Veil & Sari Pallu */}
                <g className="animate-veil-breeze" style={{ transformOrigin: '70px 60px' }}>
                  <path d="M 75,55 Q 120,105 130,225 Q 100,215 75,190 Z" fill="#be123c" opacity="0.95" />
                  <path d="M 130,225 Q 105,215 80,195" stroke="#ffd700" strokeWidth="3" fill="none" />
                </g>

                <circle cx="70" cy="22" r="4.5" fill="#ffd700" />
                <path d="M 38,65 Q 70,110 102,65" fill="none" stroke="#ffd700" strokeWidth="3.5" />
              </svg>
              <span className="font-cinzel text-xs text-[#f43f5e] font-bold mt-1">Mata Sita</span>
            </div>
          </div>
        </div>
      );

    case 3: // The Turning Point (Golden Deer)
      return (
        <div className="relative w-full h-full bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#090d16] overflow-hidden">
          {/* Mystical Moonlit Glade */}
          <div className="absolute top-10 left-16 w-36 h-36 rounded-full bg-[#f8fafc] opacity-70 blur-2xl" />

          {/* The Mystical Golden Deer (Mareecha) with Blazing Antlers */}
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/4 flex flex-col items-center"
            style={{ transform: `scale(${1.08 + pulse * 0.08})` }}
          >
            {/* Blinding Gold Aura */}
            <div className="absolute w-80 h-80 rounded-full bg-[#fde047] blur-3xl opacity-60" />

            <svg viewBox="0 0 280 260" className="w-56 h-52 md:w-80 md:h-76 drop-shadow-[0_0_50px_rgba(253,224,71,1)]">
              {/* Crystal Glowing Antlers */}
              <path d="M 100,70 L 70,20 M 70,20 L 45,15 M 70,20 L 75,5" stroke="#fef08a" strokeWidth="6" strokeLinecap="round" />
              <path d="M 125,70 L 155,20 M 155,20 L 180,15 M 155,20 L 150,5" stroke="#fef08a" strokeWidth="6" strokeLinecap="round" />
              {/* Golden Stag Body */}
              <ellipse cx="112" cy="80" rx="18" ry="14" fill="#ffd700" />
              <path d="M 112,85 Q 140,125 185,125 L 205,170 L 160,170 Q 125,160 108,110 Z" fill="#eab308" />
              {/* Slender Agile Legs */}
              <line x1="135" y1="170" x2="130" y2="245" stroke="#ffd700" strokeWidth="6" strokeLinecap="round" />
              <line x1="155" y1="170" x2="150" y2="245" stroke="#ffd700" strokeWidth="6" strokeLinecap="round" />
              <line x1="190" y1="170" x2="198" y2="245" stroke="#ffd700" strokeWidth="6" strokeLinecap="round" />
              {/* Glowing Ruby Eye */}
              <circle cx="106" cy="77" r="3.5" fill="#ef4444" />
            </svg>

            <div className="bg-black/90 border border-[#fde047] px-4 py-1.5 rounded-full mt-2">
              <span className="font-cinzel text-xs text-[#fde047] tracking-widest font-black uppercase">
                MAREECHA • THE GOLDEN DEER
              </span>
            </div>
          </div>
        </div>
      );

    case 4: // The Abduction
      return (
        <div className="relative w-full h-full bg-gradient-to-b from-[#450a0a] via-[#7f1d1d] to-[#1e0505] overflow-hidden">
          {/* Blood Lightning Strobe */}
          <div
            className="absolute inset-0 bg-[#fca5a5] pointer-events-none transition-opacity duration-100"
            style={{ opacity: isShaking || Math.sin(pulse * 12) > 0.8 ? 0.45 : 0 }}
          />

          {/* Ravana's Airborne Pushpaka Vimana Demon Chariot */}
          <div
            className="absolute top-1/5 right-1/4 md:right-1/3 flex flex-col items-center"
            style={{
              transform: `translate(${(progress - 0.5) * 110}px, ${(0.5 - progress) * 50}px)`
            }}
          >
            <svg viewBox="0 0 420 300" className="w-72 h-56 md:w-[420px] md:h-[300px] drop-shadow-[0_0_50px_rgba(239,68,68,0.95)]">
              {/* Blazing Winged Chariot with Fluttering War Flags */}
              <path d="M 40,190 Q 210,270 380,190 L 350,150 L 70,150 Z" fill="#78350f" stroke="#ffd700" strokeWidth="5" />
              
              {/* Animated Chariot Battle Flags streaming in hurricane */}
              <line x1="350" y1="150" x2="350" y2="70" stroke="#78350f" strokeWidth="4" />
              <g className="animate-flag-flutter-fast" style={{ transformOrigin: '350px 85px' }}>
                <polygon points="350,75 425,95 350,115" fill="#dc2626" />
                <polygon points="350,85 395,95 350,105" fill="#ffd700" />
              </g>

              {/* Spiked Demon Wheel */}
              <circle cx="210" cy="210" r="42" fill="#18181b" stroke="#ef4444" strokeWidth="6" />

              {/* Sita's streaming crimson veil caught in the tempest */}
              <g className="animate-sash-drift" style={{ transformOrigin: '210px 140px' }}>
                <path d="M 195,145 Q 120,110 30,130 Q 110,165 190,155 Z" fill="#e11d48" opacity="0.95" />
                <path d="M 30,130 Q 105,160 185,150" stroke="#ffd700" strokeWidth="3" fill="none" />
              </g>

              {/* Ten-Headed Sovereign Ravana */}
              <g fill="#450a0a">
                {[-4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((off, i) => (
                  <circle key={i} cx={210 + off * 14} cy="80" r="12" fill="#7f1d1d" stroke="#ffd700" strokeWidth="2" />
                ))}
                {/* Glowing Demonic Red Eyes */}
                {[-4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((off, i) => (
                  <circle key={i} cx={210 + off * 14} cy="79" r="2.8" fill="#ef4444" />
                ))}
                {/* Colossal Muscular Torso */}
                <path d="M 160,95 L 260,95 L 250,155 L 170,155 Z" fill="#270707" />
                {/* 20 Arms holding celestial blades */}
                <line x1="160" y1="105" x2="80" y2="55" stroke="#ffd700" strokeWidth="6" />
                <line x1="260" y1="105" x2="340" y2="55" stroke="#ffd700" strokeWidth="6" />
                <line x1="160" y1="125" x2="70" y2="105" stroke="#ffd700" strokeWidth="6" />
                <line x1="260" y1="125" x2="350" y2="105" stroke="#ffd700" strokeWidth="6" />
              </g>
            </svg>

            <div className="bg-black/90 border border-[#ef4444] px-4 py-1.5 rounded-full mt-2">
              <span className="font-cinzel text-xs text-[#ef4444] tracking-widest font-black uppercase">
                RAVANA • THE TEN-HEADED EMPEROR
              </span>
            </div>
          </div>
        </div>
      );

    case 5: // The Search and Alliance
      return (
        <div className="relative w-full h-full bg-gradient-to-b from-[#7c2d12] via-[#9a3412] to-[#431407] overflow-hidden">
          {/* Kishkindha Sunset Cliffs */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 700" preserveAspectRatio="none">
            <polygon points="0,500 250,320 500,460 800,280 1050,420 1200,300 1200,700 0,700" fill="#2d1305" />
          </svg>

          {/* Heroic Vow of Brotherhood: Rama & Hanuman */}
          <div className="absolute bottom-16 md:bottom-28 left-1/2 -translate-x-1/2 flex items-end gap-14 md:gap-24">
            {/* Lord Rama Standing Tall with Animated Angavastram */}
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 140 260" className="w-24 h-44 md:w-36 md:h-64 drop-shadow-[0_0_30px_rgba(56,189,248,0.85)]">
                <ellipse cx="70" cy="38" rx="16" ry="20" fill="#38bdf8" />
                <polygon points="56,20 70,4 84,20" fill="#ffd700" />
                <path d="M 45,60 L 95,60 L 105,160 L 35,160 Z" fill="#d97706" />

                {/* Animated Yellow Shawl Drape */}
                <g className="animate-cloth-wave" style={{ transformOrigin: '70px 100px' }}>
                  <path d="M 65,95 Q 35,145 20,225 Q 50,205 75,190 Z" fill="#f59e0b" opacity="0.9" />
                </g>

                <line x1="52" y1="160" x2="48" y2="250" stroke="#38bdf8" strokeWidth="12" strokeLinecap="round" />
                <line x1="88" y1="160" x2="92" y2="250" stroke="#38bdf8" strokeWidth="12" strokeLinecap="round" />
                <path d="M 105,10 Q 135,120 105,240" fill="none" stroke="#ffd700" strokeWidth="6" />
              </svg>
              <span className="font-cinzel text-xs text-[#38bdf8] font-bold">Lord Rama</span>
            </div>

            {/* Hanuman Kneeling in Deepest Surrender with Animated Prayer Sash */}
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 140 200" className="w-20 h-32 md:w-32 md:h-48 drop-shadow-[0_0_35px_rgba(234,179,8,0.9)]">
                <ellipse cx="70" cy="45" rx="18" ry="22" fill="#eab308" />
                <polygon points="58,25 70,6 82,25" fill="#ffd700" />
                <path d="M 45,70 L 95,70 L 90,140 L 50,140 Z" fill="#991b1b" />

                {/* Animated Devotional Red Scarf */}
                <g className="animate-veil-breeze" style={{ transformOrigin: '70px 75px' }}>
                  <path d="M 70,75 Q 110,110 115,185 Q 90,175 70,150 Z" fill="#dc2626" opacity="0.95" />
                  <path d="M 115,185 L 120,195" stroke="#ffd700" strokeWidth="2" />
                </g>

                <ellipse cx="60" cy="90" rx="9" ry="16" fill="#eab308" />
                <ellipse cx="80" cy="90" rx="9" ry="16" fill="#eab308" />
              </svg>
              <span className="font-cinzel text-xs text-[#eab308] font-bold">Hanuman</span>
            </div>
          </div>
        </div>
      );

    case 6: // Hanuman's Impossible Leap
      return (
        <div className="relative w-full h-full bg-gradient-to-b from-[#0f172a] via-[#1e3a8a] to-[#0c1322] overflow-hidden">
          {/* Roaring Sapphire Ocean Waves */}
          <div className="absolute bottom-0 w-full h-44 md:h-72 bg-gradient-to-t from-[#020617] via-[#0c4a6e] to-[#0284c7]">
            <svg className="w-full h-full" viewBox="0 0 1200 350" preserveAspectRatio="none">
              <path d="M 0,160 Q 200,110 400,170 T 800,160 T 1200,170 L 1200,350 L 0,350 Z" fill="#032541" />
              <path d="M 150,160 Q 190,145 230,165" stroke="#ffffff" strokeWidth="6" fill="none" />
              <path d="M 550,170 Q 590,155 630,175" stroke="#ffffff" strokeWidth="6" fill="none" />
            </svg>
          </div>

          {/* Colossal Hanuman Rocketing Across the Sky with Animated Flowing Scarf Layer */}
          <div
            className="absolute top-1/4 left-1/3 md:left-2/5 flex flex-col items-center"
            style={{
              transform: `translate(${(progress - 0.5) * 160}px, ${Math.sin(progress * Math.PI) * -45}px)`
            }}
          >
            <div className="absolute w-96 h-56 border-4 border-white/40 rounded-full blur-md" />

            <svg viewBox="0 0 340 220" className="w-72 h-44 md:w-[380px] md:h-[240px] drop-shadow-[0_0_60px_rgba(234,179,8,1)]">
              <ellipse cx="170" cy="110" rx="60" ry="30" fill="#eab308" transform="rotate(-15 170 110)" />
              <circle cx="230" cy="85" r="26" fill="#eab308" />
              <polygon points="222,62 236,36 250,62" fill="#ffd700" />

              {/* Animated Supersonic Streaming Crimson Sash Layer */}
              <g className="animate-sash-drift" style={{ transformOrigin: '120px 115px' }}>
                <path d="M 120,115 Q 70,140 10,95 Q 60,75 110,100 Z" fill="#dc2626" />
                <path d="M 125,125 Q 80,160 25,135 Q 70,110 115,115 Z" fill="#b91c1c" />
                <path d="M 125,125 Q 80,160 25,135" stroke="#ffd700" strokeWidth="3" fill="none" />
              </g>

              {/* Massive Golden Gada (Mace) */}
              <line x1="210" y1="105" x2="275" y2="45" stroke="#d4af37" strokeWidth="8" />
              <circle cx="282" cy="38" r="18" fill="#ffd700" />
            </svg>

            <div className="bg-black/90 border border-[#ffd700] px-5 py-1.5 rounded-full mt-2 shadow-[0_0_20px_#ffd700]">
              <span className="font-cinzel text-xs text-[#ffd700] tracking-widest font-black uppercase">
                THE IMPOSSIBLE LEAP • समुद्र लङ्घनम्
              </span>
            </div>
          </div>
        </div>
      );

    case 7: // The Discovery in Lanka
      return (
        <div className="relative w-full h-full bg-gradient-to-b from-[#090d16] via-[#0f172a] to-[#04060b] overflow-hidden">
          {/* Silvery Full Moon */}
          <div className="absolute top-12 right-20 w-36 h-36 rounded-full bg-[#f8fafc] opacity-75 blur-2xl" />

          {/* Ashoka Vatika Carved Pavilion */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 700" preserveAspectRatio="none">
            <path d="M 0,0 L 300,0 L 300,500 Q 240,460 180,500 L 180,700 L 0,700 Z" fill="#0f172a" />
            <path d="M 1200,0 L 900,0 L 900,500 Q 960,460 1020,500 L 1020,700 L 1200,700 Z" fill="#0f172a" />
            {/* Scarlet Ashoka Flowers */}
            <circle cx="260" cy="260" r="12" fill="#ef4444" />
            <circle cx="290" cy="290" r="14" fill="#ef4444" />
            <circle cx="940" cy="240" r="13" fill="#ef4444" />
          </svg>

          {/* Central Exchange: Queen Sita & Hanuman with Ring */}
          <div className="absolute bottom-16 md:bottom-28 left-1/2 -translate-x-1/2 flex items-end gap-16 md:gap-28">
            {/* Queen Sita Resolute in Sorrow with Flowing Crimson Sari Pallu */}
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 120 220" className="w-20 h-36 md:w-32 md:h-56 drop-shadow-[0_0_25px_rgba(244,63,94,0.85)]">
                <ellipse cx="60" cy="38" rx="14" ry="17" fill="#fed7aa" />
                <path d="M 40,56 L 80,56 L 95,200 L 25,200 Z" fill="#991b1b" />

                {/* Animated Mournful Silk Drape */}
                <g className="animate-veil-breeze" style={{ transformOrigin: '60px 56px' }}>
                  <path d="M 65,56 Q 100,105 108,195 Q 85,185 65,165 Z" fill="#b91c1c" opacity="0.9" />
                  <path d="M 108,195 L 112,205" stroke="#ffd700" strokeWidth="2" />
                </g>

                <circle cx="60" cy="22" r="4.5" fill="#ffd700" />
              </svg>
              <span className="font-cinzel text-xs text-[#f43f5e] font-bold">Queen Sita</span>
            </div>

            {/* Glowing Golden Ring of Rama */}
            <div className="flex flex-col items-center justify-center mb-16">
              <div
                className="w-10 h-10 rounded-full border-4 border-[#ffd700] shadow-[0_0_35px_#ffd700]"
                style={{ transform: `scale(${1 + pulse * 0.2})` }}
              />
              <span className="text-[10px] font-cinzel text-[#ffd700] font-black mt-2">
                श्री राम मुद्रिका
              </span>
            </div>

            {/* Hanuman Kneeling in Reverence with Animated Devotional Sash */}
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 120 180" className="w-20 h-32 md:w-30 md:h-48 drop-shadow-[0_0_30px_rgba(234,179,8,0.9)]">
                <ellipse cx="60" cy="40" rx="16" ry="19" fill="#eab308" />
                <path d="M 40,62 L 80,62 L 75,130 L 45,130 Z" fill="#991b1b" />

                <g className="animate-cloth-wave" style={{ transformOrigin: '60px 62px' }}>
                  <path d="M 50,65 Q 25,100 15,145 Q 40,135 60,120 Z" fill="#dc2626" opacity="0.9" />
                </g>

                <polygon points="50,24 60,8 70,24" fill="#ffd700" />
              </svg>
              <span className="font-cinzel text-xs text-[#eab308] font-bold">Hanuman</span>
            </div>
          </div>
        </div>
      );

    case 8: // The Gathering Storm & Bridge of Hope
      return (
        <div className="relative w-full h-full bg-gradient-to-b from-[#030712] via-[#0f172a] to-[#020617] overflow-hidden">
          {/* Ram Setu (Floating Inscribed Rocks) across the Sea */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 1200 700" className="w-full h-full" preserveAspectRatio="none">
              <rect y="320" width="1200" height="380" fill="#020d1a" />
              {/* Grand Causeway Highway toward Fortress Lanka */}
              <polygon points="550,320 650,320 840,700 360,700" fill="#1e293b" opacity="0.95" />

              {/* Animated Saffron Army Flags on the Coastal Cliffs */}
              <g className="animate-flag-flutter" style={{ transformOrigin: '280px 280px' }}>
                <polygon points="280,280 345,260 280,240" fill="#f97316" />
                <line x1="280" y1="340" x2="280" y2="230" stroke="#ffd700" strokeWidth="4" />
              </g>
              <g className="animate-flag-flutter-fast" style={{ transformOrigin: '880px 280px' }}>
                <polygon points="880,280 945,260 880,240" fill="#ea580c" />
                <line x1="880" y1="340" x2="880" y2="230" stroke="#ffd700" strokeWidth="4" />
              </g>

              {/* Floating Stones with glowing Devanagari "राम" */}
              {[
                { x: 490, y: 600, w: 120, h: 55 },
                { x: 620, y: 570, w: 130, h: 60 },
                { x: 530, y: 490, w: 105, h: 48 },
                { x: 610, y: 450, w: 100, h: 45 },
                { x: 560, y: 380, w: 80, h: 36 },
                { x: 585, y: 340, w: 60, h: 26 },
              ].map((stone, idx) => (
                <g key={idx}>
                  <rect x={stone.x} y={stone.y} width={stone.w} height={stone.h} rx="10" fill="#334155" stroke="#ffd700" strokeWidth="2.5" />
                  <text x={stone.x + stone.w / 2} y={stone.y + stone.h / 2 + 6} fill="#ffd700" fontSize="18" fontWeight="bold" textAnchor="middle" fontFamily="Yatra One, serif">
                    राम
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Distant Golden Fortress of Lanka */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-48 h-24 bg-gradient-to-t from-[#b45309] via-[#fde047] to-transparent clip-castle opacity-90 drop-shadow-[0_0_40px_rgba(253,224,71,0.8)]" />
            <span className="text-xs font-cinzel text-[#ffd700] tracking-widest mt-1 font-black">
              FORTRESS LANKA • लंकापुरी
            </span>
          </div>
        </div>
      );

    case 9: // The Great Battle & The Final Arrow
      return (
        <div className="relative w-full h-full bg-gradient-to-b from-[#450a0a] via-[#7f1d1d] to-[#180303] overflow-hidden">
          {/* Apocalyptic Smoke & Explosions */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#ea580c]/30 via-transparent to-transparent pointer-events-none" />

          {/* Left: Lord Rama Drawing Kodanda Bow with Animated Battle Drape */}
          <div className="absolute bottom-16 md:bottom-28 left-6 md:left-24 flex flex-col items-center">
            <svg viewBox="0 0 240 280" className="w-48 h-56 md:w-80 md:h-96 drop-shadow-[0_0_60px_rgba(56,189,248,1)]">
              <ellipse cx="70" cy="60" rx="20" ry="24" fill="#38bdf8" />
              <polygon points="55,38 70,16 85,38" fill="#ffd700" />
              <path d="M 45,84 L 95,84 L 105,190 L 35,190 Z" fill="#d97706" />

              {/* Animated Solar War Sash billowing forward */}
              <g className="animate-cloth-wave" style={{ transformOrigin: '70px 100px' }}>
                <path d="M 55,90 Q 20,135 10,210 Q 45,190 75,175 Z" fill="#f59e0b" opacity="0.95" />
                <path d="M 10,210 Q 40,195 70,180" stroke="#ffd700" strokeWidth="3" fill="none" />
              </g>

              {/* Massive Golden Kodanda Bow */}
              <path d="M 140,10 Q 210,110 140,250" fill="none" stroke="#ffd700" strokeWidth="8" />
              <line x1="70" y1="110" x2="140" y2="10" stroke="#fff" strokeWidth="3" />
              <line x1="70" y1="110" x2="140" y2="250" stroke="#fff" strokeWidth="3" />
              {/* Blinding Brahmastra Solar Arrow of Cosmic Light */}
              <line x1="60" y1="110" x2="260" y2="110" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
              <polygon points="260,98 295,110 260,122" fill="#ffffff" />
            </svg>
            <div className="bg-black/90 border border-[#38bdf8] px-4 py-1.5 rounded-full mt-2 shadow-[0_0_20px_#38bdf8]">
              <span className="font-cinzel text-xs text-[#38bdf8] font-black">
                LORD RAMA • BRAHMASTRA RELEASE
              </span>
            </div>
          </div>

          {/* Right: Ten-Headed Sovereign Ravana with Animated Dark Banners */}
          <div className="absolute bottom-16 md:bottom-28 right-6 md:right-24 flex flex-col items-center">
            <svg viewBox="0 0 300 280" className="w-56 h-56 md:w-96 md:h-96 drop-shadow-[0_0_50px_rgba(239,68,68,0.95)]">
              {/* Fan of 10 Heads */}
              {[-4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((off, i) => (
                <circle key={i} cx={150 + off * 13} cy="55" r="11" fill="#581c87" stroke="#ffd700" strokeWidth="2" />
              ))}
              {/* Blazing Red Eyes */}
              {[-4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((off, i) => (
                <circle key={i} cx={150 + off * 13} cy="54" r="2.8" fill="#ef4444" />
              ))}
              {/* Colossal Body */}
              <path d="M 95,70 L 205,70 L 190,200 L 110,200 Z" fill="#3b0764" />

              {/* Animated Dark Chariot Battle Flags behind Ravana */}
              <g className="animate-flag-flutter-fast" style={{ transformOrigin: '230px 40px' }}>
                <polygon points="230,40 285,25 230,10" fill="#991b1b" />
                <line x1="230" y1="80" x2="230" y2="5" stroke="#ffd700" strokeWidth="3" />
              </g>

              {/* 20 Armed Hands wielding weapons */}
              <line x1="95" y1="90" x2="25" y2="35" stroke="#ffd700" strokeWidth="5" />
              <line x1="95" y1="120" x2="15" y2="110" stroke="#ffd700" strokeWidth="5" />
              <line x1="205" y1="90" x2="275" y2="35" stroke="#ffd700" strokeWidth="5" />
              <line x1="205" y1="120" x2="285" y2="110" stroke="#ffd700" strokeWidth="5" />
            </svg>
            <div className="bg-black/90 border border-[#ef4444] px-4 py-1.5 rounded-full mt-2 shadow-[0_0_20px_#ef4444]">
              <span className="font-cinzel text-xs text-[#ef4444] font-black">
                RAVANA • DASHANANA
              </span>
            </div>
          </div>
        </div>
      );

    case 10: // The Return & Coronation
      return (
        <div className="relative w-full h-full bg-gradient-to-b from-[#451a03] via-[#78350f] to-[#1c0a00] overflow-hidden">
          {/* Rows of Ten Thousand Glowing Diyas */}
          <div className="absolute bottom-4 inset-x-0 flex justify-around px-6">
            {[...Array(14)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className="w-4 h-6 rounded-full bg-[#f59e0b] blur-[1px] shadow-[0_0_15px_#f59e0b]"
                  style={{ transform: `scaleY(${1 + Math.sin(pulse * 7 + i) * 0.3})` }}
                />
                <div className="w-6 h-2.5 rounded-b-full bg-[#9a3412]" />
              </div>
            ))}
          </div>

          {/* Grand Golden Simhasana Throne: Rama & Sita Crowned with Flowing Royal Mantles */}
          <div className="absolute bottom-16 md:bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <svg viewBox="0 0 360 250" className="w-80 h-56 md:w-[450px] md:h-[300px] drop-shadow-[0_0_70px_rgba(253,224,71,1)]">
              {/* Carved Royal Throne */}
              <path d="M 60,200 L 60,80 Q 180,10 300,80 L 300,200 Z" fill="#b45309" stroke="#ffd700" strokeWidth="6" />

              {/* Animated Royal Canopy Silk Banners */}
              <g className="animate-flag-flutter" style={{ transformOrigin: '80px 80px' }}>
                <polygon points="80,80 120,70 80,60" fill="#ea580c" />
              </g>
              <g className="animate-flag-flutter-fast" style={{ transformOrigin: '280px 80px' }}>
                <polygon points="280,80 320,70 280,60" fill="#ea580c" />
              </g>

              {/* Crowned Lord Rama with Animated Royal Silk Mantle */}
              <ellipse cx="145" cy="100" rx="18" ry="22" fill="#38bdf8" />
              <polygon points="132,78 145,46 158,78" fill="#ffd700" />
              <path d="M 120,122 L 170,122 L 175,200 L 115,200 Z" fill="#ffd700" />

              <g className="animate-cloth-wave" style={{ transformOrigin: '125px 125px' }}>
                <path d="M 120,130 Q 95,160 90,200 Q 110,195 125,185 Z" fill="#f59e0b" opacity="0.9" />
              </g>

              {/* Crowned Queen Sita with Animated Regal Crimson Wedding Veil */}
              <ellipse cx="215" cy="105" rx="16" ry="19" fill="#fed7aa" />
              <polygon points="205,85 215,58 225,85" fill="#ffd700" />
              <path d="M 195,125 L 235,125 L 245,200 L 185,200 Z" fill="#e11d48" />

              <g className="animate-veil-breeze" style={{ transformOrigin: '225px 125px' }}>
                <path d="M 230,130 Q 260,165 265,205 Q 245,200 230,185 Z" fill="#be123c" opacity="0.9" />
                <path d="M 265,205 L 270,210" stroke="#ffd700" strokeWidth="2" />
              </g>

              {/* Hanuman at Sacred Lotus Feet */}
              <ellipse cx="180" cy="220" rx="14" ry="12" fill="#eab308" />
            </svg>

            <h2 className="font-cinzel text-2xl md:text-4xl text-[#ffd700] font-black tracking-widest mt-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              THE CORONATION OF RAMA
            </h2>
            <div className="font-yatra text-base md:text-xl text-[#fde047] tracking-wider mt-1">
              ॥ रामो राज्यं प्रशासति • धर्मो जयति ॥
            </div>
          </div>
        </div>
      );

    case 11: // Epilogue
    default:
      return (
        <div className="relative w-full h-full bg-[#050403] flex items-center justify-center p-6 text-center">
          <div className="max-w-3xl flex flex-col items-center">
            {/* Sacred Golden Emblem of Kodanda */}
            <div className="w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-[#ffd700] p-5 flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(255,215,0,0.8)]">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#ffd700]">
                <path d="M 30,10 Q 75,50 30,90" fill="none" stroke="currentColor" strokeWidth="5" />
                <line x1="20" y1="50" x2="85" y2="50" stroke="currentColor" strokeWidth="5" />
                <polygon points="85,40 98,50 85,60" fill="currentColor" />
              </svg>
            </div>

            <h1 className="font-cinzel text-3xl md:text-5xl lg:text-6xl font-black tracking-widest text-[#FFF2D0] mb-3">
              WHEN DARKNESS FELL, DHARMA REMAINED.
            </h1>
            <div className="font-yatra text-xl md:text-2xl text-[#ffd700] tracking-widest mb-4">
              ॥ धर्मो रक्षति रक्षितः ॥
            </div>
            <p className="font-serif italic text-base md:text-xl text-[#FDE68A] opacity-90 max-w-xl">
              "The epic continues with every generation."
            </p>
          </div>
        </div>
      );
  }
}

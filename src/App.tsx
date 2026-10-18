/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * RAMAYANA: WHEN THE SCREEN BREAKS
 * Master Autoplay Cinematic Storytelling Orchestrator (Punchy Manhwa & Multilingual Edition)
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { STORY_SCENES, TOTAL_STORY_DURATION, CHARACTERS } from './data/storyboardData';
import { soundEngine } from './audio/SoundEngine';
import { narratorVoice } from './audio/NarratorVoice';
import { ThreeTempleSanctum } from './components/ThreeTempleSanctum';
import { CinematicSceneVisuals } from './components/CinematicSceneVisuals';
import { CharacterRosterBar } from './components/CharacterRosterBar';
import { CinemaDock } from './components/CinemaDock';
import { DirectorDossierModal } from './components/DirectorDossierModal';
import { OpeningCurtain } from './components/OpeningCurtain';
import { SupportedLanguage, CharacterProfile } from './types';

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isSubtitlesVisible, setIsSubtitlesVisible] = useState(true);
  const [language, setLanguage] = useState<SupportedLanguage>('hindi'); // Default to Hindi as requested
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.25);    // Default to Punchy 1.25x
  const [isPunchyMode, setIsPunchyMode] = useState<boolean>(true);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterProfile | null>(null);
  const [currentSubtitle, setCurrentSubtitle] = useState('');

  // Refs for animation loop
  const timeRef = useRef(0);
  const isPlayingRef = useRef(false);
  const playbackSpeedRef = useRef(1.25);
  playbackSpeedRef.current = playbackSpeed;
  const lastTickRef = useRef<number | null>(null);
  const currentChapterRef = useRef<number>(-1);
  const animFrameRef = useRef<number | null>(null);
  const languageRef = useRef<SupportedLanguage>('hindi');
  languageRef.current = language;

  // Determine current scene index
  const activeChapterIndex = Math.max(
    0,
    STORY_SCENES.findIndex(
      (sc) => currentTime >= sc.startTime && currentTime < sc.endTime
    )
  );
  const currentScene = STORY_SCENES[activeChapterIndex] || STORY_SCENES[0];

  const sceneDuration = currentScene.endTime - currentScene.startTime;
  const sceneProgress = Math.max(
    0,
    Math.min(1, (currentTime - currentScene.startTime) / (sceneDuration || 1))
  );

  // Transition progress: 0 = 3D temple, 1 = in story
  let transitionProgress = 1;
  if (currentScene.id === 0) {
    transitionProgress = Math.min(1, sceneProgress * 2.0);
  } else if (currentScene.id === 11) {
    transitionProgress = Math.max(0, 1 - sceneProgress * 2.0);
  }

  // Handle scene change triggers (Audio theme, SFX, Sage voice in selected language)
  const handleSceneChange = useCallback((newSceneIndex: number) => {
    const scene = STORY_SCENES[newSceneIndex];
    if (!scene) return;

    soundEngine.switchSceneTheme(scene.audioCue.theme);

    // Pick speech line based on selected language
    let speechText = scene.hindiNarration;
    if (languageRef.current === 'sanskrit') {
      speechText = scene.sanskritShloka;
    } else if (languageRef.current === 'english') {
      speechText = scene.narration;
    }

    if (isVoiceEnabled) {
      narratorVoice.speak(speechText, scene.audioCue.tempo);
    }
    setCurrentSubtitle(speechText);

    // Punchy scene SFX & impacts
    if (scene.id === 0) {
      soundEngine.playPageTurn();
      soundEngine.playTempleBell();
    } else if (scene.id === 4) {
      soundEngine.playThunderCrash();
      soundEngine.playImpactBoom();
    } else if (scene.id === 6) {
      soundEngine.playImpactBoom();
      soundEngine.playOceanRumble(8);
    } else if (scene.id === 9) {
      soundEngine.playImpactBoom();
      window.setTimeout(() => soundEngine.playArrowRelease(), 3200);
    } else if (scene.id === 11) {
      soundEngine.playPageTurn();
      soundEngine.playTempleBell();
    }
  }, [isVoiceEnabled]);

  // Master Clock Loop with dynamic playback speed
  useEffect(() => {
    const tick = (now: number) => {
      if (isPlayingRef.current && lastTickRef.current !== null) {
        const delta = ((now - lastTickRef.current) / 1000) * playbackSpeedRef.current;
        timeRef.current += delta;

        if (timeRef.current >= TOTAL_STORY_DURATION) {
          timeRef.current = TOTAL_STORY_DURATION;
          isPlayingRef.current = false;
          setIsPlaying(false);
        }

        setCurrentTime(timeRef.current);

        const newChapter = Math.max(
          0,
          STORY_SCENES.findIndex(
            (sc) => timeRef.current >= sc.startTime && timeRef.current < sc.endTime
          )
        );

        if (newChapter !== currentChapterRef.current) {
          currentChapterRef.current = newChapter;
          handleSceneChange(newChapter);
        }
      }

      lastTickRef.current = now;
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [handleSceneChange]);

  // Start Experience
  const handleStartExperience = () => {
    soundEngine.init();
    soundEngine.resume();
    setHasStarted(true);
    setIsPlaying(true);
    isPlayingRef.current = true;
    lastTickRef.current = performance.now();
    currentChapterRef.current = 0;
    handleSceneChange(0);
  };

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    const next = !isPlaying;
    setIsPlaying(next);
    isPlayingRef.current = next;
    if (next) {
      soundEngine.resume();
      lastTickRef.current = performance.now();
      if (isVoiceEnabled && !narratorVoice.getIsEnabled()) {
        const text = language === 'hindi' ? currentScene.hindiNarration : language === 'sanskrit' ? currentScene.sanskritShloka : currentScene.narration;
        narratorVoice.speak(text, currentScene.audioCue.tempo);
      }
    } else {
      narratorVoice.cancel();
    }
  };

  // Language Change
  const handleSelectLanguage = (lang: SupportedLanguage) => {
    setLanguage(lang);
    narratorVoice.setLanguage(lang);
    if (isPlaying) {
      const text = lang === 'hindi' ? currentScene.hindiNarration : lang === 'sanskrit' ? currentScene.sanskritShloka : currentScene.narration;
      narratorVoice.speak(text, currentScene.audioCue.tempo);
      setCurrentSubtitle(text);
    }
  };

  // Seek
  const handleSeek = (time: number) => {
    timeRef.current = Math.max(0, Math.min(TOTAL_STORY_DURATION, time));
    setCurrentTime(timeRef.current);

    const newChapter = Math.max(
      0,
      STORY_SCENES.findIndex(
        (sc) => timeRef.current >= sc.startTime && timeRef.current < sc.endTime
      )
    );

    currentChapterRef.current = newChapter;
    handleSceneChange(newChapter);
  };

  // Select Chapter
  const handleSelectChapter = (index: number) => {
    const targetScene = STORY_SCENES[index];
    if (targetScene) {
      handleSeek(targetScene.startTime);
    }
  };

  // Replay
  const handleReplay = () => {
    handleSeek(0);
    setIsPlaying(true);
    isPlayingRef.current = true;
  };

  // Toggle Mute
  const handleToggleMute = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  // Toggle Voice
  const handleToggleVoice = () => {
    const next = !isVoiceEnabled;
    setIsVoiceEnabled(next);
    narratorVoice.setEnabled(next);
    if (!next) {
      narratorVoice.cancel();
    } else if (isPlaying) {
      const text = language === 'hindi' ? currentScene.hindiNarration : language === 'sanskrit' ? currentScene.sanskritShloka : currentScene.narration;
      narratorVoice.speak(text, currentScene.audioCue.tempo);
    }
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleTogglePlay();
      } else if (e.key === 'm' || e.key === 'M') {
        handleToggleMute();
      } else if (e.key === 'v' || e.key === 'V') {
        handleToggleVoice();
      } else if (e.key === 'c' || e.key === 'C') {
        setIsSubtitlesVisible((prev) => !prev);
      } else if (e.key === 'r' || e.key === 'R') {
        handleReplay();
      } else if (e.key === 'd' || e.key === 'D') {
        setIsDossierOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isVoiceEnabled, isMuted, language]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-[#F4E0B9]">
      {/* 1. Opening Curtain (Respectful Audio Permission & Gateway) */}
      {!hasStarted && (
        <OpeningCurtain
          onStart={handleStartExperience}
          onOpenDossier={() => setIsDossierOpen(true)}
        />
      )}

      {/* 2. Top Character Roster Banner (Matching Director's Storyboard Top Row) */}
      <div className="absolute top-0 inset-x-0 z-40">
        <CharacterRosterBar
          onSelectCharacter={(char) => {
            setSelectedCharacter(char);
            setIsDossierOpen(true);
          }}
          selectedCharId={selectedCharacter?.id}
        />
      </div>

      {/* 3. Three.js 3D Temple Sanctum (Background Manuscript Altar) */}
      <ThreeTempleSanctum
        activeChapter={activeChapterIndex}
        isOpen={currentTime > 2}
        time={currentTime}
        transitionProgress={transitionProgress}
        onBookClick={handleTogglePlay}
      />

      {/* 4. Live Manhwa-Inspired Cinematic Scene Viewport */}
      {transitionProgress > 0.05 && (
        <div
          className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ease-in-out"
          style={{ opacity: transitionProgress }}
        >
          <CinematicSceneVisuals
            scene={currentScene}
            progress={sceneProgress}
            isPlaying={isPlaying}
            language={language}
            isPunchyMode={isPunchyMode}
          />
        </div>
      )}

      {/* 5. Multilingual Subtitles & Sanskrit Shloka HUD */}
      {isSubtitlesVisible && hasStarted && (
        <div className="fixed bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 z-40 w-[94vw] max-w-3xl pointer-events-none text-center">
          <div className="inline-block px-6 py-3 rounded-2xl bg-[#0d0906]/90 border border-[#d4af37]/40 shadow-[0_8px_32px_rgba(0,0,0,0.95)]">
            {/* Primary Devanagari / English Text */}
            <p className="font-serif text-base sm:text-lg md:text-xl text-[#FFF2D0] leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
              "{currentSubtitle || (language === 'hindi' ? currentScene.hindiNarration : language === 'sanskrit' ? currentScene.sanskritShloka : currentScene.narration)}"
            </p>

            {/* Accompanying Sanskrit Shloka / Meaning Sub-Bar */}
            {language !== 'sanskrit' && (
              <div className="mt-1.5 pt-1.5 border-t border-[#3d2c1d] flex items-center justify-center gap-2">
                <span className="font-yatra text-xs md:text-sm text-[#ffd700]">
                  {currentScene.sanskritShloka}
                </span>
              </div>
            )}
            {language === 'sanskrit' && (
              <div className="mt-1.5 pt-1.5 border-t border-[#3d2c1d] text-xs text-[#d4af37] font-serif italic">
                {currentScene.sanskritMeaning}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. CinemaDock: Unified Bottom Control Dock */}
      {hasStarted && (
        <CinemaDock
          currentTime={currentTime}
          activeChapterIndex={activeChapterIndex}
          isPlaying={isPlaying}
          isMuted={isMuted}
          isVoiceEnabled={isVoiceEnabled}
          isSubtitlesVisible={isSubtitlesVisible}
          language={language}
          playbackSpeed={playbackSpeed}
          isPunchyMode={isPunchyMode}
          onTogglePlay={handleTogglePlay}
          onSeek={handleSeek}
          onToggleMute={handleToggleMute}
          onToggleVoice={handleToggleVoice}
          onToggleSubtitles={() => setIsSubtitlesVisible(!isSubtitlesVisible)}
          onSelectLanguage={handleSelectLanguage}
          onChangeSpeed={setPlaybackSpeed}
          onTogglePunchyMode={() => setIsPunchyMode(!isPunchyMode)}
          onReplay={handleReplay}
          onSelectChapter={handleSelectChapter}
          onOpenDossier={() => setIsDossierOpen(true)}
        />
      )}

      {/* 7. Director's Dossier & Character Profiler Modal */}
      <DirectorDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />
    </div>
  );
}

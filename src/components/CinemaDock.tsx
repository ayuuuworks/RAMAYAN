/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * CinemaDock: Ergonomic, unified collapsible bottom control dock
 * Includes Multilingual Voice Selector (Hindi, Sanskrit, English) and Punchy Speed Controls
 */

import React, { useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Subtitles,
  Maximize2,
  Minimize2,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Sparkles,
  List,
  Zap,
  Languages
} from 'lucide-react';
import { STORY_SCENES, TOTAL_STORY_DURATION } from '../data/storyboardData';
import { SupportedLanguage } from '../types';

interface CinemaDockProps {
  currentTime: number;
  activeChapterIndex: number;
  isPlaying: boolean;
  isMuted: boolean;
  isVoiceEnabled: boolean;
  isSubtitlesVisible: boolean;
  language: SupportedLanguage;
  playbackSpeed: number;
  isPunchyMode: boolean;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onToggleMute: () => void;
  onToggleVoice: () => void;
  onToggleSubtitles: () => void;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  onChangeSpeed: (speed: number) => void;
  onTogglePunchyMode: () => void;
  onReplay: () => void;
  onSelectChapter: (index: number) => void;
  onOpenDossier: () => void;
}

export const CinemaDock: React.FC<CinemaDockProps> = ({
  currentTime,
  activeChapterIndex,
  isPlaying,
  isMuted,
  isVoiceEnabled,
  isSubtitlesVisible,
  language,
  playbackSpeed,
  isPunchyMode,
  onTogglePlay,
  onSeek,
  onToggleMute,
  onToggleVoice,
  onToggleSubtitles,
  onSelectLanguage,
  onChangeSpeed,
  onTogglePunchyMode,
  onReplay,
  onSelectChapter,
  onOpenDossier
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isChapterDrawerOpen, setIsChapterDrawerOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentScene = STORY_SCENES[activeChapterIndex] || STORY_SCENES[0];
  const progressPercent = (currentTime / TOTAL_STORY_DURATION) * 100;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95vw] max-w-[980px] pointer-events-none select-none">
      {/* Chapter Selection Drawer */}
      {isChapterDrawerOpen && !isCollapsed && (
        <div className="pointer-events-auto mb-3 bg-[#110d0a] border border-[#d4af37]/40 rounded-xl p-3 shadow-2xl max-h-60 overflow-y-auto">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#3d2c1d]">
            <span className="text-xs font-cinzel text-[#ffd700] uppercase tracking-wider font-semibold">
              Select Epic Chapter • कांड चयन
            </span>
            <button
              onClick={() => setIsChapterDrawerOpen(false)}
              className="text-[#99806a] hover:text-[#ffd700] text-xs px-2 py-0.5 rounded"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {STORY_SCENES.map((sc, idx) => (
              <button
                key={sc.id}
                onClick={() => {
                  onSelectChapter(idx);
                  setIsChapterDrawerOpen(false);
                }}
                className={`text-left p-2 rounded-lg transition-colors text-xs flex items-center justify-between border ${
                  activeChapterIndex === idx
                    ? 'bg-[#3b2713] border-[#ffd700] text-[#ffd700]'
                    : 'bg-[#1a1410] border-[#2c2016] text-[#cbbba9] hover:border-[#8c6729]'
                }`}
              >
                <div className="truncate pr-2">
                  <span className="font-mono text-[10px] text-[#8c6729] mr-1.5">{idx}</span>
                  <span className="font-cinzel">{sc.title}</span>
                  <span className="block text-[10px] text-[#d4af37] font-serif opacity-80 truncate">
                    {sc.hindiTitle}
                  </span>
                </div>
                <span className="font-mono text-[10px] opacity-60 shrink-0">
                  {formatTime(sc.startTime)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Collapse / Expand Cinema Mode Toggle */}
      <div className="flex justify-center mb-1">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="pointer-events-auto flex items-center gap-1.5 px-3 py-1 bg-[#1a130e] hover:bg-[#2c2017] text-[#ffd700] border border-[#d4af37]/40 rounded-full text-[11px] font-cinzel tracking-wider shadow-md"
        >
          {isCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Show Controls</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Cinema Mode</span>
            </>
          )}
        </button>
      </div>

      {/* Main Unified Dock Bar */}
      <div
        className={`pointer-events-auto bg-[#140f0c] border border-[#d4af37]/40 rounded-xl p-2.5 sm:p-3 shadow-[0_12px_36px_rgba(0,0,0,0.9)] transition-all duration-300 ${
          isCollapsed ? 'translate-y-24 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        }`}
      >
        {/* Timeline Scrubber */}
        <div className="relative mb-2.5">
          <div
            className="relative h-2 w-full bg-[#2a1e16] rounded-full cursor-pointer overflow-hidden"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPercent = (e.clientX - rect.left) / rect.width;
              onSeek(clickPercent * TOTAL_STORY_DURATION);
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-[#8c6729] via-[#d4af37] to-[#ffd700] rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
            {STORY_SCENES.map((sc) => (
              <div
                key={sc.id}
                className="absolute top-0 bottom-0 w-[2px] bg-black/60 pointer-events-none"
                style={{ left: `${(sc.startTime / TOTAL_STORY_DURATION) * 100}%` }}
              />
            ))}
          </div>
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between gap-2">
          {/* Left: Play / Pause, Replay, Time */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={onTogglePlay}
              className="p-1.5 sm:p-2 rounded-lg bg-[#2b1b11] hover:bg-[#3d2719] text-[#ffd700] border border-[#d4af37]/40 transition-colors"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              onClick={onReplay}
              className="p-1.5 sm:p-2 rounded-lg bg-[#1c130d] hover:bg-[#2c2017] text-[#cbbba9] hover:text-[#ffd700] border border-[#3d2c1d] transition-colors"
              title="Replay from Beginning"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <div className="font-mono text-[11px] text-[#d4af37] ml-1 hidden sm:inline">
              <span>{formatTime(currentTime)}</span>
              <span className="opacity-40 mx-1">/</span>
              <span className="opacity-60">{formatTime(TOTAL_STORY_DURATION)}</span>
            </div>
          </div>

          {/* Center: Language Switcher (Hindi, Sanskrit, English) */}
          <div className="flex items-center gap-1 bg-[#1c130d] border border-[#d4af37]/30 p-1 rounded-lg">
            <button
              onClick={() => onSelectLanguage('hindi')}
              className={`px-2 py-0.5 rounded text-xs font-yatra transition-colors ${
                language === 'hindi'
                  ? 'bg-[#d97706] text-black font-bold shadow-[0_0_8px_#d97706]'
                  : 'text-[#cbbba9] hover:text-[#ffd700]'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => onSelectLanguage('sanskrit')}
              className={`px-2 py-0.5 rounded text-xs font-yatra transition-colors ${
                language === 'sanskrit'
                  ? 'bg-[#d97706] text-black font-bold shadow-[0_0_8px_#d97706]'
                  : 'text-[#cbbba9] hover:text-[#ffd700]'
              }`}
            >
              संस्कृतम्
            </button>
            <button
              onClick={() => onSelectLanguage('english')}
              className={`px-2 py-0.5 rounded text-xs font-cinzel transition-colors ${
                language === 'english'
                  ? 'bg-[#d97706] text-black font-bold shadow-[0_0_8px_#d97706]'
                  : 'text-[#cbbba9] hover:text-[#ffd700]'
              }`}
            >
              ENG
            </button>
          </div>

          {/* Speed & Punchy Mode Selector */}
          <div className="flex items-center gap-1">
            <button
              onClick={onTogglePunchyMode}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-cinzel font-semibold transition-colors ${
                isPunchyMode
                  ? 'bg-[#7c2d12] text-[#fde047] border-[#fde047]/60 shadow-[0_0_10px_rgba(253,224,71,0.3)]'
                  : 'bg-[#1c130d] text-[#8c745e] border-[#2c2016]'
              }`}
              title="Toggle Punchy Action Camera & Speed Lines"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span className="hidden md:inline">Punchy</span>
            </button>

            {/* Playback Speed Toggles */}
            <button
              onClick={() => onChangeSpeed(playbackSpeed === 1 ? 1.25 : playbackSpeed === 1.25 ? 1.5 : 1)}
              className="px-2 py-1 rounded-lg bg-[#1c130d] hover:bg-[#2c2017] text-[#ffd700] border border-[#3d2c1d] text-[11px] font-mono font-bold"
              title="Cycle Speed (1x, 1.25x, 1.5x)"
            >
              {playbackSpeed}x
            </button>
          </div>

          {/* Right Controls: Voice, Mute, CC, Chapters, Dossier */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              onClick={onToggleVoice}
              className={`p-1.5 rounded-lg border transition-colors ${
                isVoiceEnabled
                  ? 'bg-[#2b1b11] text-[#ffd700] border-[#d4af37]/50'
                  : 'bg-[#1c130d] text-[#6b5847] border-[#2c2016]'
              }`}
              title={isVoiceEnabled ? 'Mute Narrator Voice' : 'Enable Narrator Voice'}
            >
              {isVoiceEnabled ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={onToggleMute}
              className={`p-1.5 rounded-lg border transition-colors ${
                !isMuted
                  ? 'bg-[#2b1b11] text-[#ffd700] border-[#d4af37]/50'
                  : 'bg-[#1c130d] text-[#6b5847] border-[#2c2016]'
              }`}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={onToggleSubtitles}
              className={`p-1.5 rounded-lg border transition-colors ${
                isSubtitlesVisible
                  ? 'bg-[#2b1b11] text-[#ffd700] border-[#d4af37]/50'
                  : 'bg-[#1c130d] text-[#6b5847] border-[#2c2016]'
              }`}
              title="Toggle Subtitles"
            >
              <Subtitles className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsChapterDrawerOpen(!isChapterDrawerOpen)}
              className="p-1.5 rounded-lg bg-[#1c130d] hover:bg-[#2c2017] text-[#cbbba9] hover:text-[#ffd700] border border-[#3d2c1d] transition-colors"
              title="View Chapters"
            >
              <List className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onOpenDossier}
              className="p-1.5 rounded-lg bg-[#3d2713] hover:bg-[#52351a] text-[#ffd700] border border-[#ffd700]/40 transition-colors"
              title="Director Dossier & Video Prompts"
            >
              <BookOpen className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg bg-[#1c130d] hover:bg-[#2c2017] text-[#cbbba9] hover:text-[#ffd700] border border-[#3d2c1d] transition-colors"
              title="Toggle Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

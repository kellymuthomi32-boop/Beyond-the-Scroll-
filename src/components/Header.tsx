import React, { useState } from 'react';
import { Volume2, VolumeX, Bookmark, Sparkles, Menu, X, Compass, Layers, Search } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

interface HeaderProps {
  savedCount: number;
  onOpenSaved: () => void;
  onOpenQuiz: () => void;
  isAmbienceActive: boolean;
  onToggleAmbience: () => void;
  viewMode: 'grid' | 'depth';
  onToggleViewMode: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  savedCount,
  onOpenSaved,
  onOpenQuiz,
  isAmbienceActive,
  onToggleAmbience,
  viewMode,
  onToggleViewMode,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#001020]/95 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          {/* Brand Logo & Title */}
          <a
            href="#top"
            className="flex items-center gap-2 sm:gap-3 shrink min-w-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f7a612] rounded-lg"
            aria-label="Beyond the Scroll home"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#f7a612]/40 p-0.5 group-hover:border-[#f7a612] transition-colors shadow-sm shadow-[#f7a612]/20 shrink-0">
              <img
                src="/logo.svg"
                alt="Beyond the Scroll Logo"
                className="w-full h-full object-contain"
                width={40}
                height={40}
              />
            </div>
            <div className="flex flex-col min-w-0 leading-tight">
              <span className="font-black tracking-wide text-xs sm:text-base text-white uppercase truncate">
                BEYOND THE <span className="text-[#f7a612]">SCROLL</span>
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest text-slate-400 font-semibold uppercase truncate hidden sm:block">
                WHERE CURIOSITY MEETS DISCOVERY
              </span>
            </div>
          </a>

          {/* Desktop Nav Links (Visible on large screens) */}
          <nav className="hidden lg:flex items-center gap-6 shrink-0" aria-label="Main Navigation">
            <a
              href="#discover"
              className="text-xs sm:text-sm font-medium text-slate-300 hover:text-[#f7a612] transition-colors whitespace-nowrap"
            >
              Discover
            </a>
            <a
              href="#daily-fact"
              className="text-xs sm:text-sm font-medium text-slate-300 hover:text-[#f7a612] transition-colors whitespace-nowrap"
            >
              Daily Pulse
            </a>
            <a
              href="#watch"
              className="text-xs sm:text-sm font-medium text-slate-300 hover:text-[#f7a612] transition-colors whitespace-nowrap"
            >
              Watch Shorts
            </a>
            <a
              href="#about"
              className="text-xs sm:text-sm font-medium text-slate-300 hover:text-[#f7a612] transition-colors whitespace-nowrap"
            >
              About
            </a>
          </nav>

          {/* Right Action Controls Hub */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => {
                onOpenSearch();
                soundFX.playClick();
              }}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white transition-colors flex items-center gap-2"
              title="Search discoveries (⌘K or /)"
              aria-label="Search discoveries"
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f7a612]" />
              <span className="hidden xl:inline text-slate-400 text-xs">Search</span>
              <kbd className="hidden xl:inline px-1.5 py-0.2 rounded bg-white/10 text-[9px] font-mono text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Abyss Scale Toggle (Desktop & Tablet) */}
            <button
              onClick={() => {
                onToggleViewMode();
                soundFX.playClick();
              }}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all border whitespace-nowrap ${
                viewMode === 'depth'
                  ? 'bg-[#f7a612] text-[#001020] border-[#f7a612] shadow-sm shadow-[#f7a612]/30'
                  : 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/15'
              }`}
              title="Toggle Vertical Ocean & Cosmic Scale View"
            >
              {viewMode === 'depth' ? (
                <>
                  <Layers className="w-3.5 h-3.5" />
                  <span>Grid</span>
                </>
              ) : (
                <>
                  <Compass className="w-3.5 h-3.5 text-[#f7a612]" />
                  <span>Abyss Scale</span>
                </>
              )}
            </button>

            {/* Soundscape Ambience Toggle (Desktop & Tablet) */}
            <button
              onClick={() => {
                onToggleAmbience();
                soundFX.playClick();
              }}
              className={`hidden md:flex p-2 rounded-full border transition-colors shrink-0 ${
                isAmbienceActive
                  ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-sm shadow-sky-500/30'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
              title={isAmbienceActive ? 'Mute Hydrophone Drone' : 'Enable Hydrophone Ambient Drone'}
              aria-label="Toggle atmospheric soundscape"
            >
              {isAmbienceActive ? (
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Saved Discoveries Button */}
            <button
              onClick={() => {
                onOpenSaved();
                soundFX.playClick();
              }}
              className="relative p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-medium text-slate-200 hover:border-[#f7a612]/60 transition-colors flex items-center gap-1.5 shrink-0"
              title="Saved discoveries"
              aria-label="View saved discoveries"
            >
              <Bookmark className={`w-3.5 h-3.5 ${savedCount > 0 ? 'text-[#f7a612] fill-[#f7a612]' : ''}`} />
              <span className="hidden sm:inline">Saved</span>
              <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-[#f7a612] text-black font-bold">
                {savedCount}
              </span>
            </button>

            {/* Curiosity Quiz CTA Button (Desktop & Tablet) */}
            <button
              onClick={() => {
                onOpenQuiz();
                soundFX.playClick();
              }}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#f7a612] to-[#e69500] hover:from-[#ffb224] hover:to-[#f7a612] text-[#001020] text-xs font-bold tracking-wide shadow-md shadow-[#f7a612]/20 transition-all hover:scale-105 active:scale-95 shrink-0 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Quiz</span>
            </button>

            {/* Mobile / Tablet Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/15 text-slate-200 hover:text-[#f7a612] transition-colors shrink-0"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#03182e]/98 backdrop-blur-2xl border-b border-white/10 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            <a
              href="#discover"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-[#f7a612] transition-colors"
            >
              Discover Facts
            </a>
            <button
              onClick={() => {
                onToggleViewMode();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-[#f7a612] transition-colors"
            >
              <span className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#f7a612]" />
                <span>Vertical Abyss Scale Mode</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f7a612]/20 text-[#f7a612]">
                {viewMode === 'depth' ? 'Active' : 'Switch'}
              </span>
            </button>
            <a
              href="#daily-fact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-[#f7a612] transition-colors"
            >
              Daily Curiosity Pulse
            </a>
            <a
              href="#watch"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-[#f7a612] transition-colors"
            >
              Watch YouTube Shorts
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-[#f7a612] transition-colors"
            >
              About & Editorial Standards
            </a>
          </nav>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <button
              onClick={() => {
                onToggleAmbience();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/5 text-xs text-slate-300 hover:bg-white/10 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-sky-400" />
                <span>Hydrophone Soundscape Drone</span>
              </span>
              <span className="text-[#f7a612] font-mono font-semibold">
                {isAmbienceActive ? 'Active' : 'Muted'}
              </span>
            </button>

            <button
              onClick={() => {
                onOpenQuiz();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#f7a612] text-[#001020] text-xs font-bold tracking-wide shadow-md shadow-[#f7a612]/30 active:scale-98 transition-transform"
            >
              <Sparkles className="w-4 h-4" />
              <span>Take Curiosity Quiz</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

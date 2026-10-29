import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, Volume2, Play, Search, ArrowUp, Layers } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

interface MobileQuickDockProps {
  onOpenSearch: () => void;
  onOpenQuiz: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  discoveryCount: number;
}

export const MobileQuickDock: React.FC<MobileQuickDockProps> = ({
  onOpenSearch,
  onOpenQuiz,
  activeSection,
  onNavigate,
  discoveryCount,
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'discover', label: `Discover (${discoveryCount})`, icon: Compass },
    { id: 'daily-fact', label: 'Pulse', icon: Sparkles },
    { id: 'watch', label: 'Shorts', icon: Play },
  ];

  return (
    <aside
      aria-label="Mobile quick navigation"
      className="sm:hidden fixed bottom-3 inset-x-0 z-40 flex justify-center px-3 pointer-events-none transition-all duration-300"
    >
      <div className="pointer-events-auto flex items-center gap-1 p-1.5 bg-[#011429]/95 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl shadow-black/80 max-w-full">
        {/* Quick Search Trigger */}
        <button
          type="button"
          onClick={() => {
            onOpenSearch();
            soundFX.playClick();
          }}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
          aria-label="Search discoveries"
          title="Search (⌘K)"
        >
          <Search className="w-3.5 h-3.5 text-[#f7a612]" />
        </button>

        <div className="w-px h-4 bg-white/15 mx-0.5" />

        {/* Section Quick Jump Buttons */}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onNavigate(item.id);
                soundFX.playClick();
              }}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-medium transition-all ${
                isActive
                  ? 'bg-[#f7a612] text-[#001020] font-bold shadow-sm shadow-[#f7a612]/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className={`w-3 h-3 ${isActive ? 'text-[#001020]' : 'text-[#f7a612]'}`} />
              <span className="whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}

        {/* Quiz trigger */}
        <button
          type="button"
          onClick={() => {
            onOpenQuiz();
            soundFX.playClick();
          }}
          className="px-2 py-1.5 rounded-full text-[11px] text-[#f7a612] hover:bg-[#f7a612]/10 font-semibold"
          title="Curiosity Quiz"
        >
          Quiz
        </button>

        {/* Scroll To Top pill (Fades in after scrolling down) */}
        {showScrollTop && (
          <>
            <div className="w-px h-4 bg-white/15 mx-0.5" />
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                soundFX.playClick();
              }}
              className="p-2 rounded-full bg-[#f7a612]/10 hover:bg-[#f7a612]/20 text-[#f7a612] border border-[#f7a612]/30 transition-colors"
              aria-label="Scroll back to top"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      </div>
    </aside>
  );
};

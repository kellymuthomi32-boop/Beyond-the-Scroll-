import React, { useState, useEffect, useRef } from 'react';
import { Search, Compass, Sparkles, Volume2, ArrowRight, X, Command } from 'lucide-react';
import { DISCOVERIES, DiscoveryItem } from '../data/discoveries';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDiscovery: (id: string) => void;
  onOpenQuiz: () => void;
  onToggleViewMode: () => void;
  onToggleAmbience: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectDiscovery,
  onOpenQuiz,
  onToggleViewMode,
  onToggleAmbience,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter discoveries
  const filtered = query.trim()
    ? DISCOVERIES.filter((d) => {
        const q = query.toLowerCase();
        return (
          d.title.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q) ||
          d.excerpt.toLowerCase().includes(q) ||
          d.fact.toLowerCase().includes(q) ||
          d.keyFacts.some((f) => f.toLowerCase().includes(q))
        );
      })
    : DISCOVERIES.slice(0, 6);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length + 3));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length + 3) % (filtered.length + 3));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex < filtered.length) {
        onSelectDiscovery(filtered[selectedIndex].id);
        onClose();
      } else if (selectedIndex === filtered.length) {
        onOpenQuiz();
        onClose();
      } else if (selectedIndex === filtered.length + 1) {
        onToggleViewMode();
        onClose();
      } else {
        onToggleAmbience();
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Palette Box */}
      <div
        className="relative w-full max-w-xl bg-[#03182e] border border-[#f7a612]/40 rounded-2xl shadow-2xl overflow-hidden z-10 text-slate-200"
        role="dialog"
        aria-modal="true"
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-[#001020]">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a discovery, creature, or concept (e.g. octopus, space, tardigrade)…"
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/5"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            {query.trim() ? `Found ${filtered.length} Discoveries` : 'Curated Highlights'}
          </div>

          {filtered.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectDiscovery(item.id);
                onClose();
              }}
              onMouseEnter={() => setSelectedIndex(idx)}
              className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all ${
                selectedIndex === idx
                  ? 'bg-[#f7a612] text-black font-semibold'
                  : 'hover:bg-white/5 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xl shrink-0">{item.symbol}</span>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">{item.title}</div>
                  <div
                    className={`text-[10px] font-mono truncate ${
                      selectedIndex === idx ? 'text-black/80' : 'text-slate-400'
                    }`}
                  >
                    {item.category} · {item.read} MIN READ
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 shrink-0 opacity-60 ml-2" />
            </button>
          ))}

          {/* Quick Actions Group */}
          <div className="px-3 pt-3 pb-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider border-t border-white/10 mt-2">
            Quick Platform Commands
          </div>

          <button
            onClick={() => {
              onOpenQuiz();
              onClose();
            }}
            onMouseEnter={() => setSelectedIndex(filtered.length)}
            className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all ${
              selectedIndex === filtered.length
                ? 'bg-[#f7a612] text-black font-semibold'
                : 'hover:bg-white/5 text-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-[#f7a612]" />
              <span className="text-xs">Take the Curiosity Quiz</span>
            </div>
            <span className="text-[10px] font-mono opacity-60">Interactive</span>
          </button>

          <button
            onClick={() => {
              onToggleViewMode();
              onClose();
            }}
            onMouseEnter={() => setSelectedIndex(filtered.length + 1)}
            className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all ${
              selectedIndex === filtered.length + 1
                ? 'bg-[#f7a612] text-black font-semibold'
                : 'hover:bg-white/5 text-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <Compass className="w-4 h-4 text-[#f7a612]" />
              <span className="text-xs">Toggle Vertical Abyss Scale View</span>
            </div>
            <span className="text-[10px] font-mono opacity-60">Elevator</span>
          </button>

          <button
            onClick={() => {
              onToggleAmbience();
              onClose();
            }}
            onMouseEnter={() => setSelectedIndex(filtered.length + 2)}
            className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all ${
              selectedIndex === filtered.length + 2
                ? 'bg-[#f7a612] text-black font-semibold'
                : 'hover:bg-white/5 text-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <Volume2 className="w-4 h-4 text-[#f7a612]" />
              <span className="text-xs">Toggle Procedural Soundscape Drone</span>
            </div>
            <span className="text-[10px] font-mono opacity-60">Audio</span>
          </button>
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-[#001020] border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-[#f7a612]">Beyond the Scroll Pro</span>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Volume2, Sparkles, ExternalLink, RefreshCw } from 'lucide-react';
import { DailyFact, FACTS } from '../data/facts';
import { soundFX } from '../utils/soundEffects';

interface DailyFactSectionProps {
  onSpeakFact: (fact: DailyFact) => void;
}

export const DailyFactSection: React.FC<DailyFactSectionProps> = ({ onSpeakFact }) => {
  const getInitialIndex = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const day = Math.floor((now.getTime() - start.getTime()) / 86400000);
    return day % FACTS.length;
  };

  const [currentIndex, setCurrentIndex] = useState(getInitialIndex());
  const [isAnimating, setIsAnimating] = useState(false);

  const fact = FACTS[currentIndex];

  const handleRandomFact = () => {
    soundFX.playClick();
    setIsAnimating(true);
    let nextIdx: number;
    do {
      nextIdx = Math.floor(Math.random() * FACTS.length);
    } while (nextIdx === currentIndex && FACTS.length > 1);

    setTimeout(() => {
      setCurrentIndex(nextIdx);
      setIsAnimating(false);
    }, 180);
  };

  return (
    <section className="py-6 sm:py-16 border-t border-white/10" id="daily-fact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-3.5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#03182e] via-[#052345] to-[#021427] border border-[#f7a612]/30 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-center">
            {/* Fact Image Column */}
            <div className="lg:col-span-5 relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[4/3] max-h-[170px] sm:max-h-none bg-[#001020] border border-white/15 shadow-xl group">
              <img
                src={fact.image}
                alt={fact.alt}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/octopus.jpg';
                }}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  isAnimating ? 'opacity-40' : 'opacity-100'
                }`}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Attribution */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[9px] sm:text-[10px] text-slate-200 bg-black/70 backdrop-blur-sm px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-white/15">
                <span className="truncate max-w-[70%]">{fact.credit}</span>
                <a
                  href={fact.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f7a612] hover:underline flex items-center gap-1 shrink-0 ml-1.5"
                >
                  <span>Source</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>

            {/* Fact Description Column */}
            <div className="lg:col-span-7 space-y-2.5 sm:space-y-4">
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono font-bold text-[#f7a612] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Daily Curiosity Pulse · {fact.category}</span>
              </div>

              <h2 className="font-serif text-lg sm:text-3xl font-bold text-white leading-snug">
                {fact.title}
              </h2>

              <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-normal">
                {fact.text}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    onSpeakFact(fact);
                    soundFX.playClick();
                  }}
                  className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#f7a612] text-[#001020] font-bold text-xs shadow-md shadow-[#f7a612]/20 hover:bg-[#ffb224] transition-all hover:scale-105 active:scale-95"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen to daily fact</span>
                </button>

                <button
                  type="button"
                  onClick={handleRandomFact}
                  className="flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 border border-white/15 text-xs font-medium hover:border-[#f7a612]/50 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-[#f7a612] ${isAnimating ? 'animate-spin' : ''}`} />
                  <span>Surprise me</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

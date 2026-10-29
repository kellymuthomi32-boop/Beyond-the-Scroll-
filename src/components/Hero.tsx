import React, { useState } from 'react';
import { ArrowUpRight, Play, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

interface HeroProps {
  onExploreClick: () => void;
  onOpenDiscovery: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenDiscovery }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotate({
      x: -(y / rect.height) * 12,
      y: (x / rect.width) * 12,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <section className="relative pt-4 pb-6 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-24 overflow-hidden" id="top">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-gradient-to-tr from-[#f7a612]/10 via-[#17344a]/20 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-[#f7a612]/30 text-[#f7a612] text-[11px] sm:text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Where curiosity meets discovery</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              The world is more <span className="text-[#f7a612] italic">amazing</span> than you think.
            </h1>

            <p className="text-xs sm:text-base lg:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Step beyond the ordinary. Explore extraordinary creatures with distributed brains, microscopic life that braves cosmic vacuum, deep space time machines, and mysteries that reshape how you see our universe.
            </p>

            {/* Action buttons */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3.5">
              <button
                onClick={() => {
                  onExploreClick();
                  soundFX.playClick();
                }}
                className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3.5 rounded-full bg-gradient-to-r from-[#f7a612] to-[#e69500] hover:from-[#ffb224] hover:to-[#f7a612] text-[#001020] font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-[#f7a612]/20 hover:shadow-[#f7a612]/40 transition-all hover:scale-105 active:scale-95"
              >
                <span>Start exploring</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href="#watch"
                onClick={() => soundFX.playClick()}
                className="flex items-center gap-1.5 px-3.5 py-2 sm:px-6 sm:py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 border border-white/15 hover:border-[#f7a612]/40 font-semibold text-xs sm:text-sm transition-all"
              >
                <Play className="w-3.5 h-3.5 text-[#f7a612] fill-[#f7a612]" />
                <span>Watch Shorts</span>
              </a>

              {/* Quick Jump to Octopus */}
              <button
                onClick={() => {
                  onOpenDiscovery('octopus');
                  soundFX.playClick();
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#12314a]/40 hover:bg-[#12314a]/80 border border-[#f7a612]/30 text-xs font-medium text-slate-200 transition-colors"
                title="Directly inspect Octopus deep dive"
              >
                <span>🐙 Octopus (3 Hearts)</span>
              </button>
            </div>

            {/* Metrics Bar */}
            <div className="pt-3 sm:pt-6 border-t border-white/10 grid grid-cols-3 gap-2 sm:gap-4 max-w-sm sm:max-w-md mx-auto lg:mx-0">
              <div>
                <div className="font-serif text-base sm:text-2xl font-bold text-white">12+</div>
                <div className="text-[10px] sm:text-xs text-slate-400 font-medium">Curated Topics</div>
              </div>
              <div>
                <div className="font-serif text-base sm:text-2xl font-bold text-[#f7a612]">100%</div>
                <div className="text-[10px] sm:text-xs text-slate-400 font-medium">Peer-Reviewed</div>
              </div>
              <div>
                <div className="font-serif text-base sm:text-2xl font-bold text-white">Audio</div>
                <div className="text-[10px] sm:text-xs text-slate-400 font-medium">Narrated</div>
              </div>
            </div>
          </div>

          {/* Right Visual Earth Art Column (Ultra-compact on mobile, full size on desktop) */}
          <div className="lg:col-span-5 flex justify-center mt-2 lg:mt-0">
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="relative w-32 h-32 sm:w-60 sm:h-60 lg:w-full lg:max-w-[380px] lg:h-auto lg:aspect-square rounded-full lg:rounded-3xl p-1.5 sm:p-3 bg-gradient-to-b from-[#0a223d] to-[#001020] border border-[#f7a612]/30 shadow-2xl shadow-black/80 group cursor-pointer"
              onClick={() => {
                onOpenDiscovery('space');
                soundFX.playClick();
              }}
              title="Click to view Hubble Deep Field space discovery"
            >
              {/* Earth Image Frame */}
              <div className="relative w-full h-full rounded-full lg:rounded-2xl overflow-hidden bg-[#001020]">
                <img
                  src="/images/earth.jpg"
                  alt="Planet Earth seen from space showing oceans, land and cloud systems"
                  className="w-full h-full object-cover object-center filter saturate-95 group-hover:scale-105 transition-transform duration-700"
                  fetchPriority="high"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#001020] via-transparent to-[#001020]/20 pointer-events-none" />

                {/* Orbit Rings */}
                <div className="absolute -inset-3 sm:-inset-4 border border-[#f7a612]/20 rounded-full animate-spin [animation-duration:45s] pointer-events-none" />

                {/* Floating Badges (Visible on tablet and desktop) */}
                <div className="hidden sm:flex absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-[#001020]/80 backdrop-blur-md border border-[#f7a612]/40 text-[10px] font-semibold text-white items-center gap-1 shadow-lg">
                  <span className="text-[#f7a612]">✧</span>
                  <span>Stay curious</span>
                </div>

                <div className="hidden lg:flex absolute bottom-8 left-3 z-10 px-3 py-1 rounded-full bg-[#001020]/80 backdrop-blur-md border border-white/20 text-[10px] font-mono tracking-wider text-slate-200 items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f7a612] animate-ping" />
                  <span>SCIENCE · NATURE · WONDER</span>
                </div>

                {/* Scientific Image Credit */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 lg:left-3 lg:translate-x-0 text-[8px] sm:text-[9px] text-slate-400 z-10 drop-shadow whitespace-nowrap">
                  NASA / USGS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

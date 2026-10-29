import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Bookmark, Volume2, ArrowUpRight, Sparkles } from 'lucide-react';
import { DiscoveryItem } from '../data/discoveries';
import { soundFX } from '../utils/soundEffects';

interface MobileDiscoveryReelProps {
  items: DiscoveryItem[];
  savedIds: Set<string>;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onOpen: (item: DiscoveryItem) => void;
  onListen: (item: DiscoveryItem, e: React.MouseEvent) => void;
}

export const MobileDiscoveryReel: React.FC<MobileDiscoveryReelProps> = ({
  items,
  savedIds,
  onToggleSave,
  onOpen,
  onListen,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, offsetWidth } = scrollContainerRef.current;
    if (offsetWidth === 0) return;
    const index = Math.round(scrollLeft / (offsetWidth * 0.8));
    setActiveIndex(Math.min(Math.max(index, 0), items.length - 1));
  };

  const scrollToIndex = (idx: number) => {
    if (!scrollContainerRef.current) return;
    const cardWidth = scrollContainerRef.current.offsetWidth * 0.82;
    scrollContainerRef.current.scrollTo({
      left: idx * cardWidth,
      behavior: 'smooth',
    });
    soundFX.playClick();
  };

  return (
    <div className="relative space-y-3">
      {/* Reel Header & Navigation */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
          <span className="text-[#f7a612] font-bold">Swipeable Reel</span>
          <span>·</span>
          <span>{activeIndex + 1} of {items.length}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
            disabled={activeIndex === 0}
            className="p-1.5 rounded-full bg-white/5 border border-white/10 disabled:opacity-30 text-white hover:bg-white/10"
            aria-label="Previous discovery"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(Math.min(activeIndex + 1, items.length - 1))}
            disabled={activeIndex === items.length - 1}
            className="p-1.5 rounded-full bg-white/5 border border-white/10 disabled:opacity-30 text-white hover:bg-white/10"
            aria-label="Next discovery"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Horizontal Snap Scroll Track */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 pb-2 pt-1 no-scrollbar -mx-4 px-4 scroll-smooth"
      >
        {items.map((item, idx) => {
          const isSaved = savedIds.has(item.id);
          return (
            <article
              key={item.id}
              onClick={() => onOpen(item)}
              className="w-[82vw] max-w-[310px] shrink-0 snap-center flex flex-col bg-[#03182e]/95 border border-white/10 hover:border-[#f7a612]/50 rounded-2xl overflow-hidden shadow-xl active:scale-[0.99] transition-transform cursor-pointer"
            >
              {/* Card Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#001020]">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  loading={idx < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/octopus.jpg';
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03182e] via-transparent to-black/30 pointer-events-none" />

                {/* Symbol */}
                <div className="absolute top-2.5 left-2.5 w-7 h-7 rounded-full bg-[#001020]/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-xs shadow">
                  {item.symbol}
                </div>

                {/* Bookmark Button */}
                <button
                  type="button"
                  onClick={(e) => onToggleSave(item.id, e)}
                  className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md border transition-all ${
                    isSaved
                      ? 'bg-[#f7a612] text-black border-[#f7a612]'
                      : 'bg-[#001020]/70 text-slate-300 border-white/20'
                  }`}
                  aria-label={isSaved ? `Remove ${item.title}` : `Save ${item.title}`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-black' : ''}`} />
                </button>
              </div>

              {/* Card Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-slate-400 mb-1">
                    <span className="text-[#f7a612] font-semibold">{item.category}</span>
                    <span>·</span>
                    <span>{item.read} MIN READ</span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-white leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={(e) => onListen(item, e)}
                    className="flex items-center gap-1 text-slate-300 hover:text-[#f7a612]"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-[#f7a612]" />
                    <span>Listen</span>
                  </button>

                  <span className="flex items-center gap-1 font-semibold text-[#f7a612]">
                    <span>Explore dive</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-1 pt-1">
        {items.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToIndex(idx)}
            className={`h-1.5 rounded-full transition-all ${
              idx === activeIndex
                ? 'w-5 bg-[#f7a612]'
                : 'w-1.5 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Jump to discovery ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

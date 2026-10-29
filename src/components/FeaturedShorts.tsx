import React, { useState } from 'react';
import { Play, ExternalLink, Tv, ChevronRight } from 'lucide-react';
import { VIDEO_SHORTS } from '../data/videoShorts';
import { soundFX } from '../utils/soundEffects';

export const FeaturedShorts: React.FC = () => {
  const [theaterMode, setTheaterMode] = useState(false);

  return (
    <section className={`py-8 sm:py-16 border-t border-white/10 transition-colors ${theaterMode ? 'bg-black/90' : 'bg-transparent'}`} id="watch">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#f7a612] uppercase tracking-wider mb-1">
              <Play className="w-3.5 h-3.5 fill-[#f7a612]" />
              <span>Watch and wonder</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              Big ideas. <span className="text-[#f7a612]">Short videos.</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Watch our curated YouTube Shorts right here, then jump to YouTube to share them or explore more discoveries.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => {
                setTheaterMode(!theaterMode);
                soundFX.playClick();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-colors"
              title="Toggle Cinema / Theater Dimming"
            >
              <Tv className="w-3.5 h-3.5 text-[#f7a612]" />
              <span className="text-[11px] sm:text-xs">{theaterMode ? 'Theater On' : 'Theater'}</span>
            </button>

            <a
              href="https://www.youtube.com/@DiscoverBeyondScroll"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.playClick()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#cc0000]/20 hover:bg-[#cc0000]/30 border border-[#cc0000]/40 text-red-300 text-xs font-semibold transition-colors"
            >
              <span>Subscribe ↗</span>
            </a>
          </div>
        </div>

        {/* Swipe hint on mobile */}
        <div className="flex md:hidden items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Swipe horizontally to browse shorts →</span>
          <span className="text-[#f7a612]">{VIDEO_SHORTS.length} videos</span>
        </div>

        {/* Video Shorts Swipeable Reel on mobile / Grid on desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 pb-2 no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible">
          {VIDEO_SHORTS.map((video) => (
            <article
              key={video.id}
              className="w-[76vw] max-w-[270px] shrink-0 snap-center md:w-auto flex flex-col bg-[#03182e]/90 rounded-2xl border border-white/10 overflow-hidden shadow-xl hover:border-[#f7a612]/40 transition-all p-3 space-y-2.5"
            >
              <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-400">
                <span className="text-[#f7a612] font-semibold">{video.badge}</span>
                <span>{video.duration}</span>
              </div>

              {/* YouTube 9:16 Portrait Embed */}
              <div className="relative aspect-[9/16] w-full max-w-[280px] sm:max-w-[320px] mx-auto rounded-xl overflow-hidden bg-black border border-white/15 shadow-inner">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.embedId}`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-sm sm:text-base font-bold text-white line-clamp-1">
                  {video.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-300 line-clamp-2">
                  {video.description}
                </p>
              </div>

              <a
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFX.playClick()}
                className="mt-auto flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 hover:bg-[#f7a612] hover:text-[#001020] text-slate-200 text-xs font-semibold border border-white/10 hover:border-[#f7a612] transition-all"
              >
                <span>Watch on YouTube ↗</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

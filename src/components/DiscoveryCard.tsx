import React from 'react';
import { Bookmark, Volume2, ArrowUpRight, ExternalLink } from 'lucide-react';
import { DiscoveryItem } from '../data/discoveries';

interface DiscoveryCardProps {
  item: DiscoveryItem;
  isSaved: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onOpen: (item: DiscoveryItem) => void;
  onListen: (item: DiscoveryItem, e: React.MouseEvent) => void;
  variant?: 'default' | 'compact';
}

export const DiscoveryCard: React.FC<DiscoveryCardProps> = ({
  item,
  isSaved,
  onToggleSave,
  onOpen,
  onListen,
  variant = 'default',
}) => {
  if (variant === 'compact') {
    return (
      <article
        onClick={() => onOpen(item)}
        className="group relative flex flex-col bg-[#03182e]/90 hover:bg-[#062242] border border-white/10 hover:border-[#f7a612]/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#001020]">
          <img
            src={item.image}
            alt={item.imageAlt}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/octopus.jpg';
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#03182e] via-transparent to-black/30 pointer-events-none" />

          {/* Symbol */}
          <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-[#001020]/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-xs shadow">
            {item.symbol}
          </div>

          {/* Save Button */}
          <button
            type="button"
            onClick={(e) => onToggleSave(item.id, e)}
            className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md border transition-all ${
              isSaved
                ? 'bg-[#f7a612] text-black border-[#f7a612]'
                : 'bg-[#001020]/70 text-slate-300 border-white/20'
            }`}
            aria-label={isSaved ? `Remove ${item.title}` : `Save ${item.title}`}
          >
            <Bookmark className={`w-3 h-3 ${isSaved ? 'fill-black' : ''}`} />
          </button>
        </div>

        <div className="p-3 flex-1 flex flex-col justify-between space-y-1.5">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
              <span className="text-[#f7a612] font-semibold">{item.category}</span>
              <span>·</span>
              <span>{item.read}m</span>
            </div>
            <h3 className="font-serif text-xs sm:text-sm font-bold text-white group-hover:text-[#f7a612] transition-colors line-clamp-2 leading-tight mt-0.5">
              {item.title}
            </h3>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-[#f7a612] font-semibold">
            <span>Explore</span>
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={() => onOpen(item)}
      className="group relative flex flex-col bg-[#03182e]/90 hover:bg-[#062242] border border-white/10 hover:border-[#f7a612]/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/60 cursor-pointer"
    >
      {/* Top Image Media Area */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#001020]">
        <img
          src={item.image}
          alt={item.imageAlt}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/octopus.jpg';
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Dark Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#03182e] via-transparent to-black/30 pointer-events-none" />

        {/* Symbol Icon Top Left */}
        <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-[#001020]/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-sm shadow">
          {item.symbol}
        </div>

        {/* Bookmark Button Top Right */}
        <button
          type="button"
          onClick={(e) => onToggleSave(item.id, e)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all ${
            isSaved
              ? 'bg-[#f7a612] text-black border-[#f7a612] shadow-md shadow-[#f7a612]/30'
              : 'bg-[#001020]/70 text-slate-300 border-white/20 hover:text-[#f7a612] hover:border-[#f7a612]/60'
          }`}
          aria-label={isSaved ? `Remove ${item.title} from saved` : `Save ${item.title}`}
          title={isSaved ? 'Saved to collection' : 'Save discovery'}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-black' : ''}`} />
        </button>

        {/* Image Source & Attribution Badge Bottom Left */}
        <a
          href={item.imageSource}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-2 left-3 text-[9px] max-w-[85%] truncate text-slate-300 hover:text-white bg-[#001020]/80 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10 hover:border-white/30 transition-colors flex items-center gap-1"
          title={`Credit: ${item.imageCredit}`}
        >
          <span>{item.imageCredit}</span>
          <ExternalLink className="w-2.5 h-2.5 opacity-70" />
        </a>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Metadata: Clean typographic text with bullet separators */}
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-slate-400 mb-2">
            <span className="text-[#f7a612] font-semibold">{item.category}</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span>{item.read} MIN READ</span>
            {item.depthOrScale && (
              <>
                <span aria-hidden="true" className="opacity-40 hidden sm:inline">·</span>
                <span className="truncate hidden sm:inline text-slate-400">{item.depthOrScale}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#f7a612] transition-colors leading-snug line-clamp-2">
            {item.title}
          </h3>

          {/* Excerpt */}
          <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
            {item.excerpt}
          </p>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <button
            type="button"
            onClick={(e) => onListen(item, e)}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-[#f7a612] transition-colors"
            title="Listen to audio narration"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#f7a612]" />
            <span>Listen</span>
          </button>

          <span className="flex items-center gap-1 text-xs font-semibold text-[#f7a612] group-hover:translate-x-0.5 transition-transform">
            <span>Explore</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
};

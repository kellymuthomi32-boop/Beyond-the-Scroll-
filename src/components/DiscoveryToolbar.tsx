import React from 'react';
import { Search, Sparkles, Volume2, Compass, Filter, Clock, X, LayoutGrid, Rows, GalleryHorizontal } from 'lucide-react';

interface DiscoveryToolbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  categories: string[];
  readTimeFilter: 'all' | 'quick' | 'deep';
  onReadTimeFilterChange: (filter: 'all' | 'quick' | 'deep') => void;
  onOpenDailyFactAudio: () => void;
  onOpenQuiz: () => void;
  viewMode: 'grid' | 'depth';
  onToggleViewMode: () => void;
  totalResults: number;
  mobileLayout?: 'reel' | 'compact' | 'feed';
  onMobileLayoutChange?: (layout: 'reel' | 'compact' | 'feed') => void;
}

export const DiscoveryToolbar: React.FC<DiscoveryToolbarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  categories,
  readTimeFilter,
  onReadTimeFilterChange,
  onOpenDailyFactAudio,
  onOpenQuiz,
  viewMode,
  onToggleViewMode,
  totalResults,
  mobileLayout = 'reel',
  onMobileLayoutChange,
}) => {
  return (
    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
      {/* Top Search & Action Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-2 bg-[#03182e]/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search discoveries, octopus, space, extreme life, neurons…"
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-10 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#f7a612] focus:ring-1 focus:ring-[#f7a612] transition-colors"
            aria-label="Search discoveries"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Toolbar Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={onOpenDailyFactAudio}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 hover:text-[#f7a612] hover:border-[#f7a612]/40 transition-colors"
          >
            <Volume2 className="w-4 h-4 text-[#f7a612]" />
            <span>Listen to Daily Pulse</span>
          </button>

          <button
            type="button"
            onClick={onOpenQuiz}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 hover:text-[#f7a612] hover:border-[#f7a612]/40 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#f7a612]" />
            <span>Take the Quiz</span>
          </button>

          <button
            type="button"
            onClick={onToggleViewMode}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
              viewMode === 'depth'
                ? 'bg-[#f7a612] text-[#001020] border-[#f7a612]'
                : 'bg-[#17344a]/50 text-slate-200 border-[#f7a612]/30 hover:bg-[#17344a]'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>{viewMode === 'depth' ? 'Grid View' : 'Vertical Abyss Scale'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Layout Switcher Bar */}
      {onMobileLayoutChange && (
        <div className="flex sm:hidden items-center justify-between p-1.5 bg-[#03182e]/90 rounded-xl border border-white/10 text-xs shadow-inner">
          <span className="text-[11px] font-mono text-slate-300 pl-2 font-semibold">Mobile layout:</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onMobileLayoutChange('reel')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                mobileLayout === 'reel' ? 'bg-[#f7a612] text-[#001020] font-bold shadow-sm' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
              title="Horizontal Swipe Reel (ultra compact ~380px)"
            >
              <GalleryHorizontal className="w-3 h-3" />
              <span>Reel</span>
            </button>
            <button
              type="button"
              onClick={() => onMobileLayoutChange('compact')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                mobileLayout === 'compact' ? 'bg-[#f7a612] text-[#001020] font-bold shadow-sm' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
              title="Compact 2-Column Grid"
            >
              <LayoutGrid className="w-3 h-3" />
              <span>2-Col</span>
            </button>
            <button
              type="button"
              onClick={() => onMobileLayoutChange('feed')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                mobileLayout === 'feed' ? 'bg-[#f7a612] text-[#001020] font-bold shadow-sm' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
              title="Detailed Feed"
            >
              <Rows className="w-3 h-3" />
              <span>Feed</span>
            </button>
          </div>
        </div>
      )}

      {/* Categories & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
          <button
            onClick={() => onSelectCategory('ALL')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === 'ALL'
                ? 'bg-[#f7a612] text-[#001020] font-bold shadow-sm shadow-[#f7a612]/30'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            All Discoveries
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#f7a612] text-[#001020] font-bold shadow-sm shadow-[#f7a612]/30'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Read Time & Result Count */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10 text-xs text-slate-300">
            <Clock className="w-3.5 h-3.5 ml-1 text-slate-400" />
            <button
              onClick={() => onReadTimeFilterChange('all')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                readTimeFilter === 'all' ? 'bg-[#f7a612] text-black font-semibold' : 'hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => onReadTimeFilterChange('quick')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                readTimeFilter === 'quick' ? 'bg-[#f7a612] text-black font-semibold' : 'hover:text-white'
              }`}
              title="Less than 4 min read"
            >
              &lt;4m
            </button>
            <button
              onClick={() => onReadTimeFilterChange('deep')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                readTimeFilter === 'deep' ? 'bg-[#f7a612] text-black font-semibold' : 'hover:text-white'
              }`}
              title="5+ min deep read"
            >
              5m+
            </button>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            {totalResults} {totalResults === 1 ? 'topic' : 'topics'}
          </div>
        </div>
      </div>
    </div>
  );
};

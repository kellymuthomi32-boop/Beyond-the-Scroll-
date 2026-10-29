import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { DISCOVERIES, DiscoveryItem } from './data/discoveries';
import { DailyFact, FACTS } from './data/facts';
import { audioService } from './utils/audioService';
import { soundFX } from './utils/soundEffects';

import { StarfieldCanvas } from './components/StarfieldCanvas';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DiscoveryToolbar } from './components/DiscoveryToolbar';
import { DiscoveryCard } from './components/DiscoveryCard';
import { MobileDiscoveryReel } from './components/MobileDiscoveryReel';
import { MobileQuickDock } from './components/MobileQuickDock';
import { DiscoveryDrawer } from './components/DiscoveryDrawer';
import { VerticalDepthExplorer } from './components/VerticalDepthExplorer';
import { DailyFactSection } from './components/DailyFactSection';
import { FeaturedShorts } from './components/FeaturedShorts';
import { CuriosityQuizModal } from './components/CuriosityQuizModal';
import { SavedDiscoveriesDrawer } from './components/SavedDiscoveriesDrawer';
import { AudioSynthesizerVisualizer } from './components/AudioSynthesizerVisualizer';
import { CommandPalette } from './components/CommandPalette';
import { InstitutionalModals, ModalType } from './components/InstitutionalModals';
import { Footer } from './components/Footer';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function App() {
  // Discovery Selection & Routing State
  const [activeDiscoveryId, setActiveDiscoveryId] = useState<string | null>(null);

  // Mobile layout & active section tracking
  const [mobileLayout, setMobileLayout] = useState<'reel' | 'compact' | 'feed'>('reel');
  const [mobileVisibleCount, setMobileVisibleCount] = useState<number>(6);
  const [activeSection, setActiveSection] = useState<string>('top');

  // Saved / Bookmarked items (persisted in localStorage)
  const [savedIds, setSavedIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem('beyond_scroll_saved');
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Modals & Drawers state
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'depth'>('grid');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [readTimeFilter, setReadTimeFilter] = useState<'all' | 'quick' | 'deep'>('all');

  // Audio State
  const [isAmbienceActive, setIsAmbienceActive] = useState(false);
  const [audioBarVisible, setAudioBarVisible] = useState(false);
  const [audioTitle, setAudioTitle] = useState('');
  const [audioStatus, setAudioStatus] = useState<'ready' | 'playing' | 'paused' | 'ended' | 'error'>('ready');
  const [audioStatusText, setAudioStatusText] = useState('Ready');
  const [playbackRate, setPlaybackRate] = useState(1.0);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3000);
  }, []);

  // Save changes to localStorage
  const saveToStorage = (newSet: Set<string>) => {
    try {
      localStorage.setItem('beyond_scroll_saved', JSON.stringify([...newSet]));
    } catch {
      // localStorage may be disabled
    }
  };

  const handleToggleSave = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundFX.playClick();
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast('Removed from saved discoveries');
      } else {
        next.add(id);
        showToast('★ Saved to your collection');
      }
      saveToStorage(next);
      return next;
    });
  };

  const handleClearAllSaved = () => {
    soundFX.playClick();
    const empty = new Set<string>();
    setSavedIds(empty);
    saveToStorage(empty);
    showToast('Cleared all saved discoveries');
  };

  // URL Hash Routing (#discover/:id sync)
  const syncDiscoveryRoute = useCallback(() => {
    const match = window.location.hash.match(/^#discover\/([a-z0-9-]+)$/i);
    if (match) {
      const matchedItem = DISCOVERIES.find((d) => d.id === match[1]);
      if (matchedItem) {
        setActiveDiscoveryId(matchedItem.id);
      }
    } else {
      setActiveDiscoveryId(null);
    }
  }, []);

  useEffect(() => {
    syncDiscoveryRoute();
    window.addEventListener('hashchange', syncDiscoveryRoute);
    window.addEventListener('popstate', syncDiscoveryRoute);
    return () => {
      window.removeEventListener('hashchange', syncDiscoveryRoute);
      window.removeEventListener('popstate', syncDiscoveryRoute);
    };
  }, [syncDiscoveryRoute]);

  // Global Keyboard shortcuts: Cmd+K, Ctrl+K, or / to open search
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  // Track active section for mobile quick navigation dock
  useEffect(() => {
    const sections = ['top', 'discover', 'daily-fact', 'watch', 'about'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenDiscovery = (itemOrId: DiscoveryItem | string) => {
    const id = typeof itemOrId === 'string' ? itemOrId : itemOrId.id;
    setActiveDiscoveryId(id);
    window.history.pushState({}, '', `#discover/${id}`);
    soundFX.playClick();
  };

  const handleCloseDiscovery = () => {
    setActiveDiscoveryId(null);
    if (/^#discover\/[a-z0-9-]+$/i.test(window.location.hash)) {
      window.history.pushState({}, '', window.location.pathname + window.location.search);
    }
  };

  // Audio Service Event Hookup
  useEffect(() => {
    audioService.setStatusCallback((status, text) => {
      setAudioStatus(status);
      if (status === 'playing') {
        setAudioStatusText('Narrating with browser voice');
      } else if (status === 'paused') {
        setAudioStatusText('Narration paused');
      } else if (status === 'ended') {
        setAudioStatusText('Finished narration');
      } else if (status === 'error') {
        setAudioStatusText(text || 'Narration error');
      }
    });

    return () => {
      audioService.setStatusCallback(null);
      audioService.stop();
    };
  }, []);

  const handleListenDiscovery = (item: DiscoveryItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundFX.playClick();
    const narrationText = item.audioNarration || `${item.excerpt} ${item.body}`;
    audioService.speak(item.title, narrationText, playbackRate);
    setAudioTitle(item.title);
    setAudioBarVisible(true);
  };

  const handleSpeakDailyFact = (fact: DailyFact) => {
    soundFX.playClick();
    audioService.speak(fact.title, fact.text, playbackRate);
    setAudioTitle(`Daily Fact: ${fact.title}`);
    setAudioBarVisible(true);
  };

  const handleAudioPlayPause = () => {
    soundFX.playClick();
    if (audioStatus === 'playing') {
      audioService.pause();
    } else {
      audioService.resume();
    }
  };

  const handleAudioStop = () => {
    soundFX.playClick();
    audioService.stop();
    setAudioBarVisible(false);
  };

  const handleAudioRateChange = (rate: number) => {
    setPlaybackRate(rate);
    audioService.setRate(rate);
  };

  const handleToggleAmbience = () => {
    const nextState = audioService.toggleAmbience();
    setIsAmbienceActive(nextState);
    if (nextState) {
      showToast('🌊 Atmospheric Hydrophone Drone activated');
    } else {
      showToast('Atmospheric drone muted');
    }
  };

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(DISCOVERIES.map((d) => d.category));
    return Array.from(set);
  }, []);

  // Filtered Discoveries
  const filteredDiscoveries = useMemo(() => {
    return DISCOVERIES.filter((item) => {
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesExcerpt = item.excerpt.toLowerCase().includes(q);
        const matchesBody = item.body.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        const matchesKeyFacts = item.keyFacts?.some((f) => f.toLowerCase().includes(q));
        if (!matchesTitle && !matchesExcerpt && !matchesBody && !matchesCategory && !matchesKeyFacts) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) {
        return false;
      }

      // Read time filter
      if (readTimeFilter === 'quick' && item.read >= 4) return false;
      if (readTimeFilter === 'deep' && item.read < 5) return false;

      return true;
    });
  }, [searchQuery, selectedCategory, readTimeFilter]);

  const activeDiscovery = activeDiscoveryId
    ? DISCOVERIES.find((d) => d.id === activeDiscoveryId) || null
    : null;

  const savedDiscoveriesList = useMemo(() => {
    return DISCOVERIES.filter((d) => savedIds.has(d.id));
  }, [savedIds]);

  const scrollToDiscover = () => {
    soundFX.playClick();
    const el = document.getElementById('discover');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    soundFX.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#001020] text-white selection:bg-[#f7a612] selection:text-black flex flex-col relative">
      {/* Background Particle Starfield Canvas */}
      <StarfieldCanvas />

      {/* Header */}
      <Header
        savedCount={savedIds.size}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        isAmbienceActive={isAmbienceActive}
        onToggleAmbience={handleToggleAmbience}
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode((m) => (m === 'grid' ? 'depth' : 'grid'))}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content */}
      <main id="main" className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreClick={scrollToDiscover}
          onOpenDiscovery={handleOpenDiscovery}
        />

        {/* Discovery Explorer Section */}
        <section className="py-12 border-t border-white/10" id="discover">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Head */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="text-xs font-mono font-bold text-[#f7a612] uppercase tracking-wider mb-1">
                  Explore the extraordinary
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                  Discover something <span className="text-[#f7a612]">remarkable.</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
                  Small discoveries with big stories behind them. Search, save, listen, and follow your curiosity into deep biology, space, and beyond.
                </p>
              </div>

              {/* View Mode Toggle Pill */}
              <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10 self-start sm:self-auto">
                <button
                  onClick={() => {
                    setViewMode('grid');
                    soundFX.playClick();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    viewMode === 'grid'
                      ? 'bg-[#f7a612] text-[#001020] font-bold shadow'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Curated Grid
                </button>
                <button
                  onClick={() => {
                    setViewMode('depth');
                    soundFX.playSonarPing();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    viewMode === 'depth'
                      ? 'bg-[#f7a612] text-[#001020] font-bold shadow'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Vertical Abyss Scale
                </button>
              </div>
            </div>

            {/* Discovery Toolbar */}
            <DiscoveryToolbar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              categories={categories}
              readTimeFilter={readTimeFilter}
              onReadTimeFilterChange={setReadTimeFilter}
              onOpenDailyFactAudio={() => handleSpeakDailyFact(FACTS[0])}
              onOpenQuiz={() => setIsQuizOpen(true)}
              viewMode={viewMode}
              onToggleViewMode={() => setViewMode((m) => (m === 'grid' ? 'depth' : 'grid'))}
              totalResults={filteredDiscoveries.length}
              mobileLayout={mobileLayout}
              onMobileLayoutChange={setMobileLayout}
            />

            {/* View Mode: Either Vertical Abyss or Curated Grid */}
            {viewMode === 'depth' ? (
              <VerticalDepthExplorer
                discoveries={DISCOVERIES}
                onOpenDiscovery={handleOpenDiscovery}
              />
            ) : (
              /* Discover Cards Presentation */
              filteredDiscoveries.length === 0 ? (
                <div className="p-10 text-center rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="text-2xl">🔍</div>
                  <h3 className="font-serif text-lg font-bold text-white">No discoveries match your criteria</h3>
                  <p className="text-xs text-slate-400">
                    Try adjusting your search query or reset category filters.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('ALL');
                      setReadTimeFilter('all');
                      soundFX.playClick();
                    }}
                    className="px-4 py-2 rounded-lg bg-[#f7a612] text-black text-xs font-bold"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                <>
                  {/* Mobile Screen Presentation (sm:hidden) */}
                  <div className="sm:hidden">
                    {mobileLayout === 'reel' && (
                      <MobileDiscoveryReel
                        items={filteredDiscoveries}
                        savedIds={savedIds}
                        onToggleSave={handleToggleSave}
                        onOpen={handleOpenDiscovery}
                        onListen={handleListenDiscovery}
                      />
                    )}

                    {mobileLayout === 'compact' && (
                      <div className="grid grid-cols-2 gap-3">
                        {filteredDiscoveries.map((item) => (
                          <DiscoveryCard
                            key={item.id}
                            item={item}
                            isSaved={savedIds.has(item.id)}
                            onToggleSave={handleToggleSave}
                            onOpen={handleOpenDiscovery}
                            onListen={handleListenDiscovery}
                            variant="compact"
                          />
                        ))}
                      </div>
                    )}

                    {mobileLayout === 'feed' && (
                      <div className="space-y-4">
                        {filteredDiscoveries.slice(0, mobileVisibleCount).map((item) => (
                          <DiscoveryCard
                            key={item.id}
                            item={item}
                            isSaved={savedIds.has(item.id)}
                            onToggleSave={handleToggleSave}
                            onOpen={handleOpenDiscovery}
                            onListen={handleListenDiscovery}
                            variant="default"
                          />
                        ))}

                        {filteredDiscoveries.length > 6 && (
                          <div className="pt-2 text-center">
                            {mobileVisibleCount < filteredDiscoveries.length ? (
                              <button
                                type="button"
                                onClick={() => {
                                  setMobileVisibleCount(filteredDiscoveries.length);
                                  soundFX.playClick();
                                }}
                                className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors"
                              >
                                <span>Show all {filteredDiscoveries.length} discoveries ({filteredDiscoveries.length - mobileVisibleCount} more)</span>
                                <ChevronDown className="w-4 h-4 text-[#f7a612]" />
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  setMobileVisibleCount(6);
                                  soundFX.playClick();
                                  document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="py-2 px-4 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 hover:text-white inline-flex items-center gap-1.5"
                              >
                                <span>Show top 6 discoveries</span>
                                <ChevronUp className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Tablet & Desktop Screen Presentation (hidden sm:grid) */}
                  <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {filteredDiscoveries.map((item) => (
                      <DiscoveryCard
                        key={item.id}
                        item={item}
                        isSaved={savedIds.has(item.id)}
                        onToggleSave={handleToggleSave}
                        onOpen={handleOpenDiscovery}
                        onListen={handleListenDiscovery}
                        variant="default"
                      />
                    ))}
                  </div>
                </>
              )
            )}
          </div>
        </section>

        {/* Daily Curiosity Pulse Section */}
        <DailyFactSection onSpeakFact={handleSpeakDailyFact} />

        {/* Featured YouTube Shorts Section */}
        <FeaturedShorts />

        {/* About & Mission Preview Section */}
        <section className="py-8 sm:py-16 border-t border-white/10" id="about">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="text-xs font-mono font-bold text-[#f7a612] uppercase tracking-wider">
                  Our mission
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  Go beyond the <span className="text-[#f7a612]">scroll.</span>
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Beyond the Scroll is a discovery brand for curious minds: science explained simply, nature's most extraordinary abilities, the wonders of space, and mysteries approached with empirical evidence and imagination.
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => {
                      setActiveModal('about');
                      soundFX.playClick();
                    }}
                    className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 border border-white/15 hover:border-[#f7a612]"
                  >
                    Read full story & standards ↗
                  </button>
                  <button
                    onClick={() => {
                      setActiveModal('contact');
                      soundFX.playClick();
                    }}
                    className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 border border-white/15 hover:border-[#f7a612]"
                  >
                    Send feedback / ideas
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 rounded-3xl bg-[#03182e]/90 border border-white/10 space-y-4">
                <h3 className="font-serif text-lg font-bold text-white">
                  Stay curious with our community
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Join hundreds of thousands of explorers following our daily scientific discoveries and YouTube Shorts.
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://www.youtube.com/@DiscoverBeyondScroll"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 hover:bg-[#cc0000]/20 border border-white/10 hover:border-red-500/40 text-xs font-semibold text-slate-200 flex items-center justify-between transition-colors"
                  >
                    <span>▶ YouTube Channel (@DiscoverBeyondScroll)</span>
                    <span className="text-[10px] text-slate-400">Subscribe ↗</span>
                  </a>
                  <a
                    href="https://www.tiktok.com/@beyondthe.scroll"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center justify-between transition-colors"
                  >
                    <span>♪ TikTok Profile (@beyondthe.scroll)</span>
                    <span className="text-[10px] text-slate-400">Follow ↗</span>
                  </a>
                  <a
                    href="https://www.pinterest.com/beyondthescrollofficial/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center justify-between transition-colors"
                  >
                    <span>⌖ Pinterest Community</span>
                    <span className="text-[10px] text-slate-400">Explore ↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        onOpenModal={(type) => {
          setActiveModal(type);
          soundFX.playClick();
        }}
        onScrollToTop={scrollToTop}
      />

      {/* Discovery Drawer (Targeted by #discover/:id, especially #discover/octopus) */}
      <DiscoveryDrawer
        item={activeDiscovery}
        isOpen={Boolean(activeDiscovery)}
        onClose={handleCloseDiscovery}
        isSaved={activeDiscovery ? savedIds.has(activeDiscovery.id) : false}
        onToggleSave={handleToggleSave}
        onListen={handleListenDiscovery}
        onSelectDiscovery={handleOpenDiscovery}
      />

      {/* Curiosity Quiz Modal */}
      <CuriosityQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />

      {/* Saved Discoveries Drawer */}
      <SavedDiscoveriesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedItems={savedDiscoveriesList}
        onOpenDiscovery={handleOpenDiscovery}
        onRemoveSaved={handleToggleSave}
        onClearAll={handleClearAllSaved}
      />

      {/* Upgraded Pro Audio Synthesizer & Visualizer */}
      <AudioSynthesizerVisualizer
        isVisible={audioBarVisible}
        title={audioTitle}
        status={audioStatus}
        statusText={audioStatusText}
        playbackRate={playbackRate}
        onRateChange={handleAudioRateChange}
        onPlayPause={handleAudioPlayPause}
        onStop={handleAudioStop}
        isAmbienceActive={isAmbienceActive}
        onToggleAmbience={handleToggleAmbience}
      />

      {/* Command Palette (Cmd+K / /) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectDiscovery={handleOpenDiscovery}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onToggleViewMode={() => setViewMode((m) => (m === 'grid' ? 'depth' : 'grid'))}
        onToggleAmbience={handleToggleAmbience}
      />

      {/* Institutional Modals (About, Editorial, Contact, Privacy) */}
      <InstitutionalModals
        modalType={activeModal}
        onClose={() => setActiveModal(null)}
      />

      {/* Floating Mobile Quick Jump Dock (Active on small screens) */}
      <MobileQuickDock
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        activeSection={activeSection}
        onNavigate={(secId) => {
          const el = document.getElementById(secId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        discoveryCount={filteredDiscoveries.length}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-16 sm:bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#f7a612] text-[#001020] text-xs font-bold shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}

import React from 'react';
import { X, Bookmark, ArrowUpRight, Trash2, Download, BookOpen } from 'lucide-react';
import { DiscoveryItem } from '../data/discoveries';

interface SavedDiscoveriesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedItems: DiscoveryItem[];
  onOpenDiscovery: (item: DiscoveryItem) => void;
  onRemoveSaved: (id: string) => void;
  onClearAll: () => void;
}

export const SavedDiscoveriesDrawer: React.FC<SavedDiscoveriesDrawerProps> = ({
  isOpen,
  onClose,
  savedItems,
  onOpenDiscovery,
  onRemoveSaved,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const handleExportList = () => {
    const content = savedItems.map((item, idx) => (
      `${idx + 1}. ${item.title}\nCategory: ${item.category}\nSource: ${item.sourceName} (${item.source})\nFact: ${item.fact}\nURL: ${window.location.origin}/#discover/${item.id}\n\n`
    )).join('');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `beyond-the-scroll-saved-discoveries-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <aside className="w-screen max-w-md bg-[#03182e] border-l border-[#f7a612]/30 shadow-2xl flex flex-col h-full overflow-hidden text-slate-200">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#001020]/90 sticky top-0 z-10">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#f7a612]">
                Your personal collection
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2 mt-0.5">
                <Bookmark className="w-5 h-5 text-[#f7a612] fill-[#f7a612]" />
                <span>Saved Discoveries ({savedItems.length})</span>
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Close saved discoveries"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List or Empty State */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {savedItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-slate-400">
                  <Bookmark className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium text-white text-sm">No saved discoveries yet</h3>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Click the bookmark icon on any card to curate your own personal research collection.
                  </p>
                </div>
              </div>
            ) : (
              savedItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-[#001020] border border-white/10 hover:border-[#f7a612]/40 transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="text-[#f7a612] font-semibold">{item.category}</span>
                    <span>{item.read} MIN READ</span>
                  </div>

                  <h3 className="font-serif text-sm font-bold text-white group-hover:text-[#f7a612] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {item.excerpt}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-white/5">
                    <button
                      onClick={() => {
                        onOpenDiscovery(item);
                        onClose();
                      }}
                      className="text-xs font-semibold text-[#f7a612] hover:underline flex items-center gap-1"
                    >
                      <span>Open discovery</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>

                    <button
                      onClick={() => onRemoveSaved(item.id)}
                      className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {savedItems.length > 0 && (
            <div className="p-4 border-t border-white/10 bg-[#001020] flex items-center justify-between gap-3">
              <button
                onClick={handleExportList}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-200 hover:text-white transition-colors"
                title="Export citation text file"
              >
                <Download className="w-3.5 h-3.5 text-[#f7a612]" />
                <span>Export List (.txt)</span>
              </button>

              <button
                onClick={onClearAll}
                className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
              >
                Clear all saved
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

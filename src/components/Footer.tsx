import React from 'react';
import { ArrowUp, ExternalLink, Sparkles } from 'lucide-react';
import { ModalType } from './InstitutionalModals';

interface FooterProps {
  onOpenModal: (type: ModalType) => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal, onScrollToTop }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-12 sm:mt-24 bg-gradient-to-b from-[#03182e] via-[#001020] to-[#010914] border-t border-[#f7a612]/30 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-8 sm:pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 lg:gap-12">
          {/* Brand Info Column */}
          <div className="md:col-span-5 space-y-3 sm:space-y-4">
            <a
              href="#top"
              onClick={onScrollToTop}
              className="inline-flex items-center gap-3.5 group"
              aria-label="Beyond the Scroll home"
            >
              <img
                src="/logo.svg"
                alt="Beyond the Scroll Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                width={48}
                height={48}
              />
              <div className="flex flex-col">
                <span className="font-black tracking-wider text-sm sm:text-base text-white uppercase leading-tight">
                  BEYOND <b className="text-[#f7a612]">THE SCROLL</b>
                </span>
                <span className="text-[9px] tracking-widest text-slate-400 font-semibold mt-0.5">
                  WHERE CURIOSITY MEETS DISCOVERY
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Curiosity has no limits. Explore remarkable biology, deep space, quantum phenomena, and the hidden wonders that make our world extraordinary.
            </p>

            {/* Social channels */}
            <div className="flex flex-wrap items-center gap-2 pt-1 sm:pt-2">
              <a
                href="https://www.youtube.com/@DiscoverBeyondScroll"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:border-[#f7a612] hover:bg-[#f7a612]/10 text-xs text-slate-200 transition-colors flex items-center gap-1.5"
              >
                <span>▶ YouTube</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
              <a
                href="https://www.tiktok.com/@beyondthe.scroll"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:border-[#f7a612] hover:bg-[#f7a612]/10 text-xs text-slate-200 transition-colors flex items-center gap-1.5"
              >
                <span>♪ TikTok</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
              <a
                href="https://www.pinterest.com/beyondthescrollofficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:border-[#f7a612] hover:bg-[#f7a612]/10 text-xs text-slate-200 transition-colors flex items-center gap-1.5"
              >
                <span>⌖ Pinterest</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            </div>
          </div>

          {/* Navigation Links Column (2-column on mobile) */}
          <div className="md:col-span-3 space-y-2 sm:space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Explore & Legal
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2 text-xs">
              <li>
                <a href="#discover" className="text-slate-400 hover:text-[#f7a612] transition-colors">
                  Discover facts
                </a>
              </li>
              <li>
                <a href="#daily-fact" className="text-slate-400 hover:text-[#f7a612] transition-colors">
                  Daily curiosity pulse
                </a>
              </li>
              <li>
                <a href="#watch" className="text-slate-400 hover:text-[#f7a612] transition-colors">
                  Watch Shorts
                </a>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('about')}
                  className="text-slate-400 hover:text-[#f7a612] transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('editorial')}
                  className="text-slate-400 hover:text-[#f7a612] transition-colors text-left"
                >
                  Editorial Standards & Citations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('contact')}
                  className="text-slate-400 hover:text-[#f7a612] transition-colors text-left"
                >
                  Contact & Feedback
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('privacy')}
                  className="text-slate-400 hover:text-[#f7a612] transition-colors text-left"
                >
                  Privacy Notice
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('cookies')}
                  className="text-slate-400 hover:text-[#f7a612] transition-colors text-left"
                >
                  Cookie & Local Storage Notice
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('terms')}
                  className="text-slate-400 hover:text-[#f7a612] transition-colors text-left"
                >
                  Terms of Use
                </button>
              </li>
            </ul>
          </div>

          {/* Note / Call To Action Column */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#f7a612]" />
              <span>Stay Curious</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              New questions lead to extraordinary discoveries. Keep exploring, keep learning, and share what surprises you with fellow curious minds.
            </p>
            <a
              href="#discover"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-[#f7a612] hover:text-[#001020] border border-white/15 hover:border-[#f7a612] text-xs font-semibold text-slate-200 transition-all"
            >
              <span>Explore discoveries ↑</span>
            </a>
          </div>
        </div>

        {/* Footer Bottom Copyright & Tagline */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-mono">
          <div>
            © {currentYear} Beyond the Scroll. All rights reserved.
          </div>
          <div className="text-slate-400">
            Fascinating facts · Extraordinary discoveries
          </div>
          <button
            onClick={onScrollToTop}
            className="flex items-center gap-1 text-slate-300 hover:text-[#f7a612] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

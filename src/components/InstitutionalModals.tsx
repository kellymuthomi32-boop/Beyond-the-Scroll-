import React, { useState } from 'react';
import { X, ShieldCheck, Mail, BookOpen, Send, CheckCircle2, ExternalLink } from 'lucide-react';

export type ModalType = 'about' | 'editorial' | 'contact' | 'privacy' | 'cookies' | 'terms' | null;

interface InstitutionalModalsProps {
  modalType: ModalType;
  onClose: () => void;
}

export const InstitutionalModals: React.FC<InstitutionalModalsProps> = ({ modalType, onClose }) => {
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackTopic, setFeedbackTopic] = useState('Suggestion');
  const [feedbackTitle, setFeedbackTitle] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  if (!modalType) return null;

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackSent(false);
      setFeedbackTitle('');
      setFeedbackMsg('');
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="relative w-full max-w-2xl bg-[#03182e] border border-[#f7a612]/30 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 text-slate-200 max-h-[85vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {modalType === 'about' && (
          <div className="space-y-4">
            <div className="text-xs font-mono text-[#f7a612] uppercase tracking-wider">
              Our Mission & Ethos
            </div>
            <h2 className="font-serif text-3xl font-bold text-white">
              Go Beyond the <span className="text-[#f7a612]">Scroll.</span>
            </h2>
            <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
              <p>
                Beyond the Scroll is an independent discovery platform designed for curious minds: science explained simply, nature's most extraordinary abilities, the wonders of space, and mysteries approached with rigorous empirical evidence and imagination.
              </p>
              <p>
                In an era dominated by superficial algorithmic feeds, we invite you to pause, dive deeper, and appreciate the astonishing biological, cosmological, and physical phenomena that make our reality awe-inspiring.
              </p>
              <p>
                From the distributed neural rings of the dumbo octopus to the vitrified cryptobiosis of tardigrades, every subject is meticulously researched and cited.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center gap-3">
              <a
                href="https://www.youtube.com/@DiscoverBeyondScroll"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200"
              >
                ▶ YouTube Channel
              </a>
              <a
                href="https://www.tiktok.com/@beyondthe.scroll"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200"
              >
                ♪ TikTok Profile
              </a>
            </div>
          </div>
        )}

        {modalType === 'editorial' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#f7a612] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Editorial & Fact-Checking Standards</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Rigorous Verification for Curious Minds
            </h2>
            <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
              <p>
                Our editorial mission is to make science captivating without compromising accuracy. We adhere to clear principles:
              </p>
              <div className="p-4 rounded-xl bg-[#001020] border border-white/10 space-y-2 text-xs">
                <div className="font-bold text-white">1. Primary Source Grounding</div>
                <p>Every claim is traced back to primary literature: peer-reviewed journals (Science, Nature, PNAS), institutional agencies (NASA, NOAA, Smithsonian), or academic university repositories.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#001020] border border-white/10 space-y-2 text-xs">
                <div className="font-bold text-white">2. Nuance Over Sensationalism</div>
                <p>We avoid hyperbolic headlines that distort scientific findings. When discussing animal cognition or regeneration, we explicitly frame boundaries and current limitations.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#001020] border border-white/10 space-y-2 text-xs">
                <div className="font-bold text-white">3. Open Corrections Policy</div>
                <p>Scientific consensus evolves. If an error or newly published finding supersedes an existing article, we promptly update the text and citation record.</p>
              </div>
            </div>
          </div>
        )}

        {modalType === 'contact' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#f7a612] uppercase tracking-wider">
              <Mail className="w-4 h-4" />
              <span>Contact & Community Feedback</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Help Curiosity <span className="text-[#f7a612]">Grow.</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Have a scientific correction, a fascinating discovery topic proposal, or feedback about the experience? Share your thoughts below.
            </p>

            {feedbackSent ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h3 className="font-semibold text-white text-base">Thank you for your feedback!</h3>
                <p className="text-xs text-slate-300">
                  Your message has been recorded. Our editorial team reviews community suggestions regularly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitFeedback} className="space-y-3 pt-2">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono text-slate-400 block mb-1">Feedback Category</label>
                    <select
                      value={feedbackTopic}
                      onChange={(e) => setFeedbackTopic(e.target.value)}
                      className="w-full bg-[#001020] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#f7a612]"
                    >
                      <option>Discovery Topic Suggestion</option>
                      <option>Scientific Fact Correction</option>
                      <option>Feature Request</option>
                      <option>General Feedback</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-slate-400 block mb-1">Subject / Discovery Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tardigrade Dsup gene"
                      value={feedbackTitle}
                      onChange={(e) => setFeedbackTitle(e.target.value)}
                      className="w-full bg-[#001020] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#f7a612]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">Your Message or Source Link</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your suggestion or include reference links..."
                    value={feedbackMsg}
                    onChange={(e) => setFeedbackMsg(e.target.value)}
                    className="w-full bg-[#001020] border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#f7a612]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#f7a612] text-[#001020] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#ffb224] transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Feedback</span>
                </button>
              </form>
            )}
          </div>
        )}

        {(modalType === 'privacy' || modalType === 'cookies' || modalType === 'terms') && (
          <div className="space-y-4">
            <div className="text-xs font-mono text-[#f7a612] uppercase tracking-wider">
              Transparent Legal & Privacy Terms
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              {modalType === 'privacy' ? 'Privacy Notice' : modalType === 'cookies' ? 'Cookie & Storage Notice' : 'Terms of Use'}
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p>
                <strong>Local Storage:</strong> Your saved discoveries and preferences (audio rate, soundscape settings) are stored locally in your browser's private local storage. We do not transmit or sell personal tracking profiles.
              </p>
              <p>
                <strong>Third-Party Media:</strong> Embedded YouTube videos, scientific image repositories, and Google Fonts connect to their respective providers. Those external platforms operate under their own privacy protocols.
              </p>
              <p>
                <strong>Educational Purpose:</strong> Beyond the Scroll provides educational insights for curious minds. While we strive for fidelity with current science, research advances continuously. Always consult linked primary literature before citing in academic theses.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

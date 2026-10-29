import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, AlertCircle, RefreshCw, Trophy, Flame, Share2, Copy, Check } from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/questions';
import { soundFX } from '../utils/soundEffects';

interface CuriosityQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CuriosityQuizModal: React.FC<CuriosityQuizModalProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [copiedScore, setCopiedScore] = useState(false);

  if (!isOpen) return null;

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIndex];

  const handlePickAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    if (index === currentQ.correct) {
      soundFX.playSuccessChime();
      setScore((prev) => prev + 1);
      setStreak((prev) => {
        const next = prev + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });
    } else {
      soundFX.playMissTone();
      setStreak(0);
    }
  };

  const handleNext = () => {
    soundFX.playClick();
    if (currentIndex >= QUIZ_QUESTIONS.length - 1) {
      setIsFinished(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    }
  };

  const handleRestart = () => {
    soundFX.playClick();
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setStreak(0);
    setIsFinished(false);
  };

  const handleShareScore = () => {
    soundFX.playClick();
    const text = `I just scored ${score}/${QUIZ_QUESTIONS.length} on Beyond the Scroll Curiosity Quiz! 🔬✨ Explore extraordinary science: ${window.location.origin}`;
    if (navigator.share) {
      navigator.share({ title: 'My Beyond the Scroll Score', text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopiedScore(true);
      setTimeout(() => setCopiedScore(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        className="relative w-full max-w-xl bg-[#03182e] border border-[#f7a612]/40 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 text-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"
          aria-label="Close quiz"
        >
          <X className="w-5 h-5" />
        </button>

        {!isFinished ? (
          <div className="space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-[#f7a612] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>QUESTION {currentIndex + 1} OF {QUIZ_QUESTIONS.length}</span>
                </span>
                
                {/* Live Streak indicator */}
                {streak > 1 && (
                  <span className="flex items-center gap-1 text-amber-400 font-bold bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/30">
                    <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-bounce" />
                    <span>{streak} Streak!</span>
                  </span>
                )}

                <span>Category: {currentQ.category}</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#f7a612] to-amber-300 h-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">
              {currentQ.q}
            </h3>

            {/* Answer Options */}
            <div className="space-y-2.5">
              {currentQ.a.map((option, idx) => {
                const isChosen = selectedAnswer === idx;
                const isCorrect = idx === currentQ.correct;
                let btnStyle = 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 hover:border-white/20';

                if (selectedAnswer !== null) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-600/30 border-emerald-500 text-emerald-200 font-semibold';
                  } else if (isChosen && !isCorrect) {
                    btnStyle = 'bg-rose-600/30 border-rose-500 text-rose-200';
                  } else {
                    btnStyle = 'opacity-50 bg-white/5 border-white/5 text-slate-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={selectedAnswer !== null}
                    onClick={() => handlePickAnswer(idx)}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {selectedAnswer !== null && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                    )}
                    {selectedAnswer !== null && isChosen && !isCorrect && (
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback / Why Explanation */}
            {selectedAnswer !== null && (
              <div className="p-4 rounded-xl bg-[#001020] border border-white/10 space-y-1">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  {selectedAnswer === currentQ.correct ? (
                    <span className="text-emerald-400">✓ Correct!</span>
                  ) : (
                    <span className="text-rose-400">✕ Not quite.</span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentQ.why}
                </p>
              </div>
            )}

            {/* Next / Submit Button */}
            {selectedAnswer !== null && (
              <button
                onClick={handleNext}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#f7a612] to-[#e69500] hover:from-[#ffb224] hover:to-[#f7a612] text-[#001020] font-bold text-xs tracking-wide shadow-lg shadow-[#f7a612]/20 transition-all hover:scale-102 active:scale-98"
              >
                {currentIndex === QUIZ_QUESTIONS.length - 1 ? 'See final score' : 'Next question →'}
              </button>
            )}
          </div>
        ) : (
          /* Quiz Results View */
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#f7a612]/20 border border-[#f7a612] mx-auto flex items-center justify-center text-[#f7a612] shadow-xl shadow-[#f7a612]/20">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-[#f7a612]">
                Quiz Complete
              </div>
              <h3 className="font-serif text-3xl font-bold text-white">
                You scored {score} of {QUIZ_QUESTIONS.length}
              </h3>
              <p className="text-sm text-slate-300 max-w-sm mx-auto">
                {score === QUIZ_QUESTIONS.length
                  ? 'Perfect score! Your curiosity and scientific insight are truly extraordinary.'
                  : score >= Math.ceil(QUIZ_QUESTIONS.length * 0.7)
                  ? 'Impressive score! You have a sharp eye for the wonders of nature and space.'
                  : 'Great exploration! Keep exploring—every single fact deepens your view of the universe.'}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleShareScore}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 text-xs font-semibold hover:border-[#f7a612]/50 transition-colors"
              >
                {copiedScore ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-[#f7a612]" />}
                <span>{copiedScore ? 'Score Copied' : 'Share Score'}</span>
              </button>

              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 text-xs font-semibold hover:border-[#f7a612]/50 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#f7a612]" />
                <span>Retry Quiz</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#f7a612] text-[#001020] text-xs font-bold hover:bg-[#ffb224] transition-all"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

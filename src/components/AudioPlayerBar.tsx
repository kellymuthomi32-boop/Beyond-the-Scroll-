import React from 'react';
import { Play, Pause, Square, Volume2, Sparkles } from 'lucide-react';

interface AudioPlayerBarProps {
  isVisible: boolean;
  title: string;
  status: 'ready' | 'playing' | 'paused' | 'ended' | 'error';
  statusText?: string;
  playbackRate: number;
  onRateChange: (rate: number) => void;
  onPlayPause: () => void;
  onStop: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  isVisible,
  title,
  status,
  statusText,
  playbackRate,
  onRateChange,
  onPlayPause,
  onStop,
}) => {
  if (!isVisible) return null;

  const isPlaying = status === 'playing';

  return (
    <div
      role="region"
      aria-label="Audio narration controls"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[min(92%,640px)] bg-[#03182e]/95 backdrop-blur-xl border border-[#f7a612]/40 rounded-2xl p-3 sm:p-4 shadow-2xl shadow-black/80 flex items-center justify-between gap-3 text-white transition-all animate-in slide-in-from-bottom duration-300"
    >
      {/* Play/Pause Button */}
      <button
        onClick={onPlayPause}
        className="w-10 h-10 rounded-full bg-[#f7a612] text-[#001020] flex items-center justify-center shrink-0 hover:bg-[#ffb224] transition-all shadow-md shadow-[#f7a612]/20 hover:scale-105 active:scale-95"
        aria-label={isPlaying ? 'Pause narration' : 'Resume narration'}
      >
        {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
      </button>

      {/* Title & Status */}
      <div className="flex-1 min-w-0 pr-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-white truncate max-w-[200px] sm:max-w-xs">
            {title || 'Scientific Audio Narration'}
          </span>
          {/* Animated sound wave bars when playing */}
          {isPlaying && (
            <div className="flex items-center gap-0.5 h-3">
              <span className="w-0.5 h-full bg-[#f7a612] animate-pulse" />
              <span className="w-0.5 h-2/3 bg-[#f7a612] animate-pulse [animation-delay:150ms]" />
              <span className="w-0.5 h-full bg-[#f7a612] animate-pulse [animation-delay:300ms]" />
            </div>
          )}
        </div>
        <div className="text-[11px] text-slate-400 font-mono truncate">
          {statusText || (isPlaying ? 'Narrating with browser voice' : 'Paused')}
        </div>
      </div>

      {/* Speed Selector */}
      <div className="flex items-center gap-1.5 shrink-0 bg-white/5 border border-white/10 rounded-lg px-2 py-1">
        <label htmlFor="audioSpeedSelect" className="text-[10px] font-mono text-slate-400 hidden sm:inline">
          Speed:
        </label>
        <select
          id="audioSpeedSelect"
          value={playbackRate}
          onChange={(e) => onRateChange(Number(e.target.value))}
          className="bg-transparent text-xs font-mono text-white focus:outline-none cursor-pointer"
          aria-label="Narration speed"
        >
          <option value="0.75" className="bg-[#03182e] text-white">0.75×</option>
          <option value="1" className="bg-[#03182e] text-white">1.0×</option>
          <option value="1.25" className="bg-[#03182e] text-white">1.25×</option>
          <option value="1.5" className="bg-[#03182e] text-white">1.5×</option>
          <option value="2" className="bg-[#03182e] text-white">2.0×</option>
        </select>
      </div>

      {/* Stop / Dismiss Button */}
      <button
        onClick={onStop}
        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors shrink-0"
        aria-label="Stop narration"
        title="Stop audio playback"
      >
        <Square className="w-3.5 h-3.5 fill-current" />
      </button>
    </div>
  );
};

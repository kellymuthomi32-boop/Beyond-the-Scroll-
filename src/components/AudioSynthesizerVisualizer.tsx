import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Square, Music, Sliders, Sparkles } from 'lucide-react';
import { audioService } from '../utils/audioService';

interface AudioSynthesizerVisualizerProps {
  isVisible: boolean;
  title: string;
  status: 'ready' | 'playing' | 'paused' | 'ended' | 'error';
  statusText?: string;
  playbackRate: number;
  onRateChange: (rate: number) => void;
  onPlayPause: () => void;
  onStop: () => void;
  isAmbienceActive: boolean;
  onToggleAmbience: () => void;
}

export const AudioSynthesizerVisualizer: React.FC<AudioSynthesizerVisualizerProps> = ({
  isVisible,
  title,
  status,
  statusText,
  playbackRate,
  onRateChange,
  onPlayPause,
  onStop,
  isAmbienceActive,
  onToggleAmbience,
}) => {
  const [ambientChannel, setAmbientChannel] = useState<'abyss' | 'cosmos'>('abyss');
  const [bars, setBars] = useState<number[]>(Array(16).fill(15));

  const isNarrating = status === 'playing';

  // Animated visualizer bars
  useEffect(() => {
    let animId: number;
    const animate = () => {
      if (isNarrating || isAmbienceActive) {
        setBars((prev) =>
          prev.map(() => Math.floor(Math.random() * (isNarrating ? 80 : 40) + 12))
        );
      } else {
        setBars((prev) => prev.map((v) => Math.max(8, v * 0.9)));
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isNarrating, isAmbienceActive]);

  if (!isVisible && !isAmbienceActive) return null;

  return (
    <div
      role="region"
      aria-label="Soundscape and Narration Dock"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[min(94%,760px)] bg-[#010c18]/95 backdrop-blur-2xl border border-[#f7a612]/40 rounded-2xl p-3.5 sm:p-4 shadow-2xl shadow-black/90 text-white transition-all animate-in slide-in-from-bottom duration-300"
    >
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Playback Controls & Title */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {isVisible && (
            <button
              onClick={onPlayPause}
              className="w-11 h-11 rounded-full bg-[#f7a612] text-[#001020] flex items-center justify-center shrink-0 hover:bg-[#ffb224] transition-all shadow-md shadow-[#f7a612]/30 hover:scale-105 active:scale-95"
              aria-label={isNarrating ? 'Pause narration' : 'Resume narration'}
            >
              {isNarrating ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-white truncate">
                {title || (isAmbienceActive ? 'Atmospheric Soundscape Active' : 'Audio Narration')}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#f7a612]/20 text-[#f7a612] shrink-0 border border-[#f7a612]/30 hidden sm:inline">
                PRO AUDIO
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono truncate flex items-center gap-2 mt-0.5">
              <span>{statusText || (isNarrating ? 'Narrating with browser voice' : 'Ambient sound active')}</span>
              {isAmbienceActive && (
                <>
                  <span className="text-slate-600">·</span>
                  <span className="text-sky-300">Hydrophone Drone 55Hz</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Real-time Spectrum Analyzer Bars */}
        <div className="flex items-end gap-1 h-8 px-2 bg-black/40 rounded-lg border border-white/5 shrink-0 self-center">
          {bars.map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}%` }}
              className={`w-1 rounded-full transition-all duration-75 ${
                i % 3 === 0 ? 'bg-[#f7a612]' : i % 2 === 0 ? 'bg-sky-400' : 'bg-amber-200'
              }`}
            />
          ))}
        </div>

        {/* Right Tools: Speed Selector & Soundscape Switcher */}
        <div className="flex items-center gap-2 shrink-0 justify-end">
          {isVisible && (
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1">
              <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">Rate:</span>
              <select
                value={playbackRate}
                onChange={(e) => onRateChange(Number(e.target.value))}
                className="bg-transparent text-xs font-mono text-white focus:outline-none cursor-pointer"
                aria-label="Speech playback speed"
              >
                <option value="0.75" className="bg-[#03182e]">0.75×</option>
                <option value="1" className="bg-[#03182e]">1.0×</option>
                <option value="1.25" className="bg-[#03182e]">1.25×</option>
                <option value="1.5" className="bg-[#03182e]">1.5×</option>
                <option value="2" className="bg-[#03182e]">2.0×</option>
              </select>
            </div>
          )}

          {/* Soundscape Ambience Toggle */}
          <button
            onClick={onToggleAmbience}
            className={`p-2 rounded-lg border transition-colors flex items-center gap-1.5 text-xs font-mono ${
              isAmbienceActive
                ? 'bg-sky-500/20 border-sky-400 text-sky-300'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
            title="Toggle procedural ambient soundscape"
          >
            {isAmbienceActive ? <Volume2 className="w-4 h-4 text-sky-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden md:inline">{isAmbienceActive ? 'Drone On' : 'Drone'}</span>
          </button>

          {/* Stop / Dismiss */}
          {isVisible && (
            <button
              onClick={onStop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title="Stop audio"
            >
              <Square className="w-4 h-4 fill-current" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

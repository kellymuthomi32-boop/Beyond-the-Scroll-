import React, { useState } from 'react';
import { Compass, Droplet, Sun, ArrowUpRight, ShieldCheck, Volume2, ArrowDown, ArrowUp } from 'lucide-react';
import { DiscoveryItem } from '../data/discoveries';
import { soundFX } from '../utils/soundEffects';

interface DepthMilestone {
  depth: number;
  title: string;
  zone: string;
  lightPct: number;
  pressureAtm: number;
  temperature: string;
  discoveryId?: string;
  symbol: string;
  description: string;
}

const MILESTONES: DepthMilestone[] = [
  {
    depth: 0,
    title: "Ocean Surface & Atmosphere",
    zone: "Epipelagic Sea Level",
    lightPct: 100,
    pressureAtm: 1,
    temperature: "22°C (71°F)",
    discoveryId: "bees",
    symbol: "🐝",
    description: "Sunlight is plentiful. Honeybees navigate using polarized ultraviolet rays and visual landmarks.",
  },
  {
    depth: 40,
    title: "Recreational Scuba Diving Limit",
    zone: "Sunlight Zone",
    lightPct: 85,
    pressureAtm: 5,
    temperature: "19°C (66°F)",
    discoveryId: "axolotl",
    symbol: "🦎",
    description: "Shallow freshwater lake habitats where axolotls maintain neoteny and regenerate limbs without scars.",
  },
  {
    depth: 200,
    title: "Twilight Zone Boundary (Mesopelagic)",
    zone: "Mesopelagic",
    lightPct: 1,
    pressureAtm: 21,
    temperature: "12°C (53°F)",
    discoveryId: "bioluminescence",
    symbol: "✨",
    description: "Photosynthesis is no longer possible. Over 90% of marine organisms here produce bioluminescent cold light.",
  },
  {
    depth: 1000,
    title: "Midnight Zone (Bathypelagic)",
    zone: "Bathypelagic",
    lightPct: 0,
    pressureAtm: 101,
    temperature: "4°C (39°F)",
    discoveryId: "deepsea",
    symbol: "🌊",
    description: "Absolute pitch darkness. Predators like the dragonfish hunt using invisible red bioluminescent photophores.",
  },
  {
    depth: 3000,
    title: "Abyssal Plain & Dumbo Octopus Realm",
    zone: "Abyssopelagic",
    lightPct: 0,
    pressureAtm: 301,
    temperature: "2°C (35°F)",
    discoveryId: "octopus",
    symbol: "🐙",
    description: "Dumbo octopuses glide effortlessly using ear-like fins and distribute sensory coordination across their arms.",
  },
  {
    depth: 6000,
    title: "The Hadal Trenches",
    zone: "Hadopelagic",
    lightPct: 0,
    pressureAtm: 601,
    temperature: "1.5°C (34°F)",
    discoveryId: "tardigrade",
    symbol: "🧬",
    description: "Crushing hydrostatic pressures where tardigrade proteins and piezolyte cell structures resist collapsing.",
  },
  {
    depth: 10928,
    title: "Challenger Deep — Mariana Trench",
    zone: "Hadal Floor",
    lightPct: 0,
    pressureAtm: 1086,
    temperature: "1°C (33°F)",
    symbol: "⚓",
    description: "The deepest known point on Earth. Pressure exceeds 1,000 kilograms per square centimeter.",
  },
];

interface VerticalDepthExplorerProps {
  onOpenDiscovery: (id: string) => void;
  discoveries: DiscoveryItem[];
}

export const VerticalDepthExplorer: React.FC<VerticalDepthExplorerProps> = ({
  onOpenDiscovery,
  discoveries,
}) => {
  const [selectedDepth, setSelectedDepth] = useState<number>(3000);

  const currentMilestone =
    MILESTONES.find((m) => m.depth === selectedDepth) ||
    MILESTONES.reduce((prev, curr) =>
      Math.abs(curr.depth - selectedDepth) < Math.abs(prev.depth - selectedDepth) ? curr : prev
    );

  const linkedDiscovery = currentMilestone.discoveryId
    ? discoveries.find((d) => d.id === currentMilestone.discoveryId)
    : null;

  const handleSelectDepth = (depth: number) => {
    setSelectedDepth(depth);
    soundFX.playSonarPing();
  };

  const handleStep = (direction: 'up' | 'down') => {
    const currentIndex = MILESTONES.findIndex((m) => m.depth === currentMilestone.depth);
    if (direction === 'down' && currentIndex < MILESTONES.length - 1) {
      handleSelectDepth(MILESTONES[currentIndex + 1].depth);
    } else if (direction === 'up' && currentIndex > 0) {
      handleSelectDepth(MILESTONES[currentIndex - 1].depth);
    }
  };

  // Dynamic depth gradient calculation
  const getDepthBg = () => {
    if (currentMilestone.depth <= 200) {
      return 'from-[#0b3b60] via-[#041c30] to-[#010b14]';
    } else if (currentMilestone.depth <= 1000) {
      return 'from-[#042038] via-[#02111f] to-[#000810]';
    } else if (currentMilestone.depth <= 4000) {
      return 'from-[#011424] via-[#010912] to-[#000408]';
    } else {
      return 'from-[#000d1a] via-[#00060d] to-[#000205]';
    }
  };

  return (
    <div className={`p-6 md:p-8 rounded-3xl bg-gradient-to-b ${getDepthBg()} border border-[#f7a612]/30 shadow-2xl space-y-8 my-8 transition-colors duration-700`}>
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#f7a612] uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Interactive Vertical Depth Scale & Bathymetry</span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
            Beyond the Surface: The Vertical Abyss
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Descend through sunlight, twilight, midnight, and hadal zones to inspect hydrostatic pressures and creature adaptations at their true ocean depths.
          </p>
        </div>

        {/* Live Gauges & Sonar Stepper */}
        <div className="flex items-center gap-3">
          <div className="grid grid-cols-3 gap-2 bg-[#001020]/90 p-3 rounded-2xl border border-white/10">
            <div className="text-center px-2">
              <div className="text-[10px] text-slate-400 font-mono flex items-center justify-center gap-1">
                <Droplet className="w-3 h-3 text-cyan-400" />
                <span>DEPTH</span>
              </div>
              <div className="text-sm font-bold text-white font-mono mt-0.5">
                {currentMilestone.depth}m
              </div>
            </div>

            <div className="text-center px-2 border-x border-white/10">
              <div className="text-[10px] text-slate-400 font-mono flex items-center justify-center gap-1">
                <Sun className="w-3 h-3 text-[#f7a612]" />
                <span>LIGHT</span>
              </div>
              <div className="text-sm font-bold text-[#f7a612] font-mono mt-0.5">
                {currentMilestone.lightPct}%
              </div>
            </div>

            <div className="text-center px-2">
              <div className="text-[10px] text-slate-400 font-mono flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>PRESSURE</span>
              </div>
              <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">
                {currentMilestone.pressureAtm} ATM
              </div>
            </div>
          </div>

          {/* Quick Submarine Stepper buttons */}
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => handleStep('up')}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white"
              title="Ascend towards surface"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleStep('down')}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white"
              title="Dive deeper into abyss"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Elevator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Depth Milestone Navigation */}
        <div className="lg:col-span-5 space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Bathypelagic Milestones</span>
            <span className="text-[10px] text-[#f7a612]">Click to Ping Sonar</span>
          </div>
          <div className="space-y-2 max-h-[460px] overflow-y-auto pr-2">
            {MILESTONES.map((m) => (
              <button
                key={m.depth}
                onClick={() => handleSelectDepth(m.depth)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${
                  currentMilestone.depth === m.depth
                    ? 'bg-[#f7a612]/20 border-[#f7a612] text-white shadow-md shadow-[#f7a612]/15 scale-101'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{m.symbol}</span>
                  <div>
                    <div className="font-semibold text-xs text-white">{m.title}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{m.zone}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-[#f7a612]">{m.depth}m</div>
                  <div className="text-[10px] text-slate-400 font-mono">{m.pressureAtm} atm</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Milestone Inspection Showcase */}
        <div className="lg:col-span-7 bg-[#000e1c]/90 rounded-2xl border border-white/10 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{currentMilestone.symbol}</span>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#f7a612]">
                  {currentMilestone.zone}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  {currentMilestone.title}
                </h3>
              </div>
            </div>
            <div className="text-right font-mono text-xs text-slate-400">
              <div>Temp: {currentMilestone.temperature}</div>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {currentMilestone.description}
          </p>

          {/* Linked Discovery Card if present */}
          {linkedDiscovery && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#03182e] to-[#0a223d] border border-[#f7a612]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#f7a612] uppercase tracking-wider font-semibold">
                  Featured Discovery at this Depth
                </span>
                <h4 className="font-serif text-base font-bold text-white">
                  {linkedDiscovery.title}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-1">
                  {linkedDiscovery.excerpt}
                </p>
              </div>

              <button
                onClick={() => {
                  onOpenDiscovery(linkedDiscovery.id);
                  soundFX.playClick();
                }}
                className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#f7a612] text-[#001020] text-xs font-bold hover:bg-[#ffb224] transition-all shadow-md shadow-[#f7a612]/20"
              >
                <span>Read Full Article</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Depth Environmental Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs">
            <div className="p-3 rounded-lg bg-white/5">
              <div className="text-slate-400 text-[10px] font-mono">WATER PRESSURE</div>
              <div className="text-white font-bold font-mono mt-0.5">
                {(currentMilestone.pressureAtm * 1.013).toFixed(1)} bar
              </div>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <div className="text-slate-400 text-[10px] font-mono">SOLAR PHOTONS</div>
              <div className="text-white font-bold font-mono mt-0.5">
                {currentMilestone.lightPct > 0 ? `${currentMilestone.lightPct}% Penetration` : 'Complete Darkness'}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 col-span-2 sm:col-span-1">
              <div className="text-slate-400 text-[10px] font-mono">LIFE ADAPTATION</div>
              <div className="text-[#f7a612] font-semibold truncate mt-0.5">
                {currentMilestone.depth > 2000 ? 'Piezolyte Proteins' : 'Visual Optic Cells'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

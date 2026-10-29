import React, { useState, useEffect } from 'react';
import { Heart, Brain, Eye, Sparkles, Activity, ShieldAlert, Waves, Volume2, VolumeX } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

type CamoMode = 'sand' | 'reef' | 'abyss' | 'warning';
type LocomotionMode = 'crawl' | 'swim';

interface ArmData {
  id: number;
  name: string;
  sensation: string;
  status: string;
  neuronCount: string;
}

const ARMS: ArmData[] = [
  { id: 1, name: "Right Anterior (Arm 1)", sensation: "Chemotactile receptors probing seawater pH", status: "Active exploratory reach", neuronCount: "42M neurons" },
  { id: 2, name: "Right Lateral (Arm 2)", sensation: "Tactile suction grip on basalt rock", status: "Anchored & stabilizing", neuronCount: "45M neurons" },
  { id: 3, name: "Right Ventral (Arm 3)", sensation: "Sucker sensory discs detecting crab chitin proteins", status: "Target acquisition", neuronCount: "44M neurons" },
  { id: 4, name: "Right Posterior (Arm 4)", sensation: "Proprioceptive sweep across sandy floor", status: "Locomotion thrust", neuronCount: "41M neurons" },
  { id: 5, name: "Left Posterior (Arm 5)", sensation: "Water current velocity tracking (hydrodynamic shear)", status: "Stabilizing current", neuronCount: "40M neurons" },
  { id: 6, name: "Left Ventral (Arm 6)", sensation: "Crevice curvature mapping with mechanoreceptors", status: "Subterranean search", neuronCount: "43M neurons" },
  { id: 7, name: "Left Lateral (Arm 7)", sensation: "Autonomous reflex coil response", status: "Independent recoiling", neuronCount: "46M neurons" },
  { id: 8, name: "Left Anterior (Arm 8)", sensation: "Visual-guided grasping gesture towards prey", status: "Tactical alignment", neuronCount: "45M neurons" },
];

export const OctopusBioLab: React.FC = () => {
  const [activeSubsystem, setActiveSubsystem] = useState<'circulatory' | 'neural' | 'camo' | 'rna'>('circulatory');
  const [camoMode, setCamoMode] = useState<CamoMode>('sand');
  const [locomotion, setLocomotion] = useState<LocomotionMode>('crawl');
  const [bpm, setBpm] = useState<number>(48);
  const [selectedArm, setSelectedArm] = useState<ArmData>(ARMS[0]);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [pulseTick, setPulseTick] = useState(0);

  // Heartbeat pulse cycle
  useEffect(() => {
    const intervalMs = Math.round(60000 / bpm);
    const timer = setInterval(() => {
      setPulseTick((t) => t + 1);
      if (soundEnabled && locomotion === 'crawl') {
        soundFX.playHeartbeat();
      }
    }, intervalMs);
    return () => clearInterval(timer);
  }, [bpm, soundEnabled, locomotion]);

  // Skin background styling based on camouflage mode
  const getCamoStyle = () => {
    switch (camoMode) {
      case 'sand':
        return {
          background: 'radial-gradient(circle at 40% 40%, #c49a45 0%, #7d5e23 50%, #3e2e10 100%)',
          borderColor: '#e0b253',
          label: 'Sand & Granite Camouflage',
          desc: 'Yellow-brown pheomelanin chromatophores expand to mimic textured benthic sediments.',
        };
      case 'reef':
        return {
          background: 'radial-gradient(circle at 50% 50%, #d94b26 0%, #872012 55%, #3d0a04 100%)',
          borderColor: '#f97316',
          label: 'Coral Reef Aposematic Warning',
          desc: 'Erythrophores and ommochromes pulse vivid crimson to blend with reef corals or deter hunters.',
        };
      case 'abyss':
        return {
          background: 'radial-gradient(circle at 60% 40%, #0d4a70 0%, #041f33 60%, #000c17 100%)',
          borderColor: '#38bdf8',
          label: 'Abyssal Transparent Luminescence',
          desc: 'Pigment sacs contract to microscopic dots, allowing downwelling oceanic photons to pass through.',
        };
      case 'warning':
        return {
          background: 'radial-gradient(circle at 50% 50%, #0ea5e9 0%, #023352 40%, #1e1b4b 100%)',
          borderColor: '#38bdf8',
          label: 'Iridescent Blue-Ring Threat Warning',
          desc: 'Sub-dermal iridophores reflect structural light through transparent muscle rings to flash deadly tetrodotoxin alerts.',
        };
    }
  };

  const currentCamo = getCamoStyle();

  return (
    <div className="p-5 sm:p-7 rounded-2xl bg-[#010b17] border border-[#f7a612]/30 space-y-6 text-slate-200 shadow-xl">
      {/* BioLab Header & Subsystem Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#f7a612] uppercase tracking-wider">
            <Activity className="w-4 h-4" />
            <span>Interactive Biological Laboratory</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
            Cephalopod Anatomy & Physiology Simulator
          </h3>
        </div>

        {/* Subsystem tabs */}
        <div className="flex items-center gap-1 bg-[#001020] p-1 rounded-xl border border-white/10 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveSubsystem('circulatory')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeSubsystem === 'circulatory'
                ? 'bg-[#f7a612] text-[#001020] font-bold shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>3 Hearts</span>
          </button>

          <button
            onClick={() => setActiveSubsystem('neural')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeSubsystem === 'neural'
                ? 'bg-[#f7a612] text-[#001020] font-bold shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>8 Arm Brains</span>
          </button>

          <button
            onClick={() => setActiveSubsystem('camo')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeSubsystem === 'camo'
                ? 'bg-[#f7a612] text-[#001020] font-bold shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Skin Camouflage</span>
          </button>

          <button
            onClick={() => setActiveSubsystem('rna')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeSubsystem === 'rna'
                ? 'bg-[#f7a612] text-[#001020] font-bold shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>RNA Editing</span>
          </button>
        </div>
      </div>

      {/* 1. CIRCULATORY SUBSYSTEM SIMULATION */}
      {activeSubsystem === 'circulatory' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#001020] border border-white/10">
            <div>
              <div className="text-xs font-mono text-slate-400">LOCOMOTION STATE</div>
              <div className="text-sm font-bold text-white mt-0.5">
                {locomotion === 'crawl' ? 'Crawling along Seabed (Standard)' : 'Active Swimming / Jet Propulsion'}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setLocomotion('crawl')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  locomotion === 'crawl'
                    ? 'bg-[#f7a612] text-black shadow'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                Crawling (3 Hearts Pumping)
              </button>
              <button
                onClick={() => setLocomotion('swim')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  locomotion === 'swim'
                    ? 'bg-rose-500 text-white shadow'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                Jet Swimming (Systemic Stops!)
              </button>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-lg border text-xs ${
                  soundEnabled ? 'border-[#f7a612] text-[#f7a612] bg-[#f7a612]/10' : 'border-white/10 text-slate-400'
                }`}
                title="Toggle Heartbeat Sound"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Interactive Heart Visualizer Schematic */}
          <div className="relative aspect-[16/9] w-full rounded-2xl bg-[#000814] border border-[#f7a612]/30 p-6 flex flex-col items-center justify-center overflow-hidden">
            {/* Blue Hemocyanin Blood Vessels Flow */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 400 220" preserveAspectRatio="none">
                <path
                  d="M100 110 Q200 40 300 110 Q200 180 100 110"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                  className={locomotion === 'crawl' ? 'animate-pulse' : ''}
                />
                <circle cx="100" cy="110" r="28" fill="none" stroke="#0ea5e9" strokeWidth="2" />
                <circle cx="300" cy="110" r="28" fill="none" stroke="#0ea5e9" strokeWidth="2" />
                <circle cx="200" cy="110" r="38" fill="none" stroke="#f7a612" strokeWidth="2" />
              </svg>
            </div>

            {/* 3 Hearts Interactive Nodes */}
            <div className="grid grid-cols-3 gap-6 sm:gap-12 w-full max-w-lg z-10 text-center">
              {/* Left Branchial Gill Heart */}
              <div className="p-4 rounded-xl bg-[#021b33] border border-[#38bdf8]/40 shadow-lg">
                <div
                  className={`w-12 h-12 mx-auto rounded-full bg-[#0284c7] flex items-center justify-center text-white transition-transform ${
                    pulseTick % 2 === 0 ? 'scale-110 shadow-lg shadow-sky-500/50' : 'scale-95'
                  }`}
                >
                  <Heart className="w-6 h-6 fill-current text-sky-200" />
                </div>
                <div className="text-xs font-bold text-sky-300 mt-2">Left Gill Heart</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">Pumps to Left Gill</div>
                <div className="text-[9px] font-mono text-emerald-400 mt-1">Pumping (Active)</div>
              </div>

              {/* Main Systemic Heart */}
              <div
                className={`p-4 rounded-xl border shadow-xl transition-all ${
                  locomotion === 'swim'
                    ? 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                    : 'bg-[#1b1502] border-[#f7a612] text-amber-200'
                }`}
              >
                <div
                  className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center transition-transform ${
                    locomotion === 'swim'
                      ? 'bg-rose-900/60 scale-90 border border-rose-500'
                      : pulseTick % 2 === 0
                      ? 'bg-[#f7a612] text-black scale-115 shadow-xl shadow-[#f7a612]/50'
                      : 'bg-[#d98b00] text-black scale-95'
                  }`}
                >
                  <Heart className="w-7 h-7 fill-current" />
                </div>
                <div className="text-xs font-bold mt-2">
                  {locomotion === 'swim' ? 'SYSTEMIC HEART HALTED' : 'Systemic Heart'}
                </div>
                <div className="text-[10px] text-slate-300 font-mono mt-0.5">Circulates to Viscera & Arms</div>
                <div className="text-[9px] font-mono mt-1 font-bold">
                  {locomotion === 'swim' ? (
                    <span className="text-rose-400">Ceased (0 BPM during swim)</span>
                  ) : (
                    <span className="text-[#f7a612]">{bpm} BPM active</span>
                  )}
                </div>
              </div>

              {/* Right Branchial Gill Heart */}
              <div className="p-4 rounded-xl bg-[#021b33] border border-[#38bdf8]/40 shadow-lg">
                <div
                  className={`w-12 h-12 mx-auto rounded-full bg-[#0284c7] flex items-center justify-center text-white transition-transform ${
                    pulseTick % 2 === 0 ? 'scale-110 shadow-lg shadow-sky-500/50' : 'scale-95'
                  }`}
                >
                  <Heart className="w-6 h-6 fill-current text-sky-200" />
                </div>
                <div className="text-xs font-bold text-sky-300 mt-2">Right Gill Heart</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">Pumps to Right Gill</div>
                <div className="text-[9px] font-mono text-emerald-400 mt-1">Pumping (Active)</div>
              </div>
            </div>

            {/* Explanation callout */}
            <div className="mt-6 text-center text-xs text-slate-300 max-w-md z-10 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
              {locomotion === 'swim' ? (
                <span className="text-rose-300">
                  ⚠️ When swimming, muscular mantle contraction pinches the systemic heart closed, depriving muscles of oxygen. This is why octopuses prefer crawling over open-water sprints.
                </span>
              ) : (
                <span>
                  ✓ Hemocyanin contains copper atoms instead of iron hemoglobin, imparting a rich sapphire blue tint that remains fluid and efficient in near-freezing deep sea waters.
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. NEURAL SUBSYSTEM SIMULATION */}
      {activeSubsystem === 'neural' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-mono text-slate-400 uppercase">Neural Architecture: </span>
              <span className="font-bold text-white">Central Ring Brain (~150M) + 8 Radial Arm Ganglia (~350M)</span>
            </div>
            <div className="font-mono text-[#f7a612]">Total Neurons: ~500 Million</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Arm Buttons Grid */}
            <div className="md:col-span-6 space-y-2">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Click Any Arm to Inspect Semi-Autonomous Sensory Stream:
              </div>
              <div className="grid grid-cols-2 gap-2">
                {ARMS.map((arm) => (
                  <button
                    key={arm.id}
                    onClick={() => {
                      setSelectedArm(arm);
                      soundFX.playClick();
                    }}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      selectedArm.id === arm.id
                        ? 'bg-[#f7a612]/20 border-[#f7a612] text-white shadow-md shadow-[#f7a612]/20'
                        : 'bg-[#001020] border-white/10 text-slate-300 hover:border-white/30'
                    }`}
                  >
                    <div className="font-bold text-white flex items-center justify-between">
                      <span>{arm.name}</span>
                      <span className="w-2 h-2 rounded-full bg-[#f7a612]" />
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-1">{arm.neuronCount}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Arm telemetry readout */}
            <div className="md:col-span-6 p-5 rounded-2xl bg-[#001020] border border-[#f7a612]/40 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <div className="text-[10px] font-mono text-[#f7a612] uppercase tracking-wider">
                    Autonomous Neural Node
                  </div>
                  <h4 className="font-serif text-lg font-bold text-white">
                    {selectedArm.name}
                  </h4>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {selectedArm.status}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 font-mono">Sensory Input Signal:</span>
                  <div className="p-2.5 rounded-lg bg-black/50 border border-white/5 font-mono text-cyan-300 mt-1">
                    "{selectedArm.sensation}"
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="p-2.5 rounded-lg bg-white/5">
                    <div className="text-slate-400 text-[10px] font-mono">CENTRAL SUPERVISION</div>
                    <div className="text-white font-semibold mt-0.5">Minimal (Delegated)</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5">
                    <div className="text-slate-400 text-[10px] font-mono">CHEMOTACTILE TASTE</div>
                    <div className="text-[#f7a612] font-semibold mt-0.5">Active on ~240 Suckers</div>
                  </div>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed pt-2">
                  Each sucker contains tens of thousands of sensory neurons sensitive to touch, texture, and taste molecules. If severed, an octopus arm can independently search for food and grasp objects for hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. CAMOUFLAGE MATRIX SIMULATION */}
      {activeSubsystem === 'camo' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-mono text-slate-400 uppercase">Adaptive Dermis: </span>
              <span className="font-bold text-white">Chromatophores + Iridophores + Leucophores + Papillae</span>
            </div>
            <div className="font-mono text-[#f7a612]">Transition Latency: &lt; 200 Milliseconds</div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'sand', label: 'Benthic Sand', icon: '🌾' },
              { id: 'reef', label: 'Coral Reef Alert', icon: '🪸' },
              { id: 'abyss', label: 'Abyssal Darkness', icon: '🌌' },
              { id: 'warning', label: 'Blue-Ring Warning', icon: '⚡' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setCamoMode(m.id as CamoMode);
                  soundFX.playClick();
                }}
                className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all flex items-center gap-2 ${
                  camoMode === m.id
                    ? 'bg-[#f7a612] text-black border-[#f7a612] shadow-md shadow-[#f7a612]/30'
                    : 'bg-[#001020] border-white/10 text-slate-300 hover:border-white/30'
                }`}
              >
                <span className="text-lg">{m.icon}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>

          {/* Morphing Visual Canvas */}
          <div
            style={currentCamo}
            className="p-8 rounded-2xl border-2 transition-all duration-700 min-h-[220px] flex flex-col justify-end text-white relative shadow-2xl overflow-hidden"
          >
            {/* Iridescent Rings overlay if warning mode */}
            {camoMode === 'warning' && (
              <div className="absolute inset-0 flex items-center justify-center gap-8 pointer-events-none opacity-80 animate-pulse">
                <div className="w-20 h-20 rounded-full border-4 border-cyan-400 shadow-[0_0_20px_#38bdf8]" />
                <div className="w-14 h-14 rounded-full border-4 border-cyan-400 shadow-[0_0_20px_#38bdf8]" />
                <div className="w-24 h-24 rounded-full border-4 border-cyan-400 shadow-[0_0_20px_#38bdf8]" />
              </div>
            )}

            <div className="bg-black/70 backdrop-blur-md p-4 rounded-xl max-w-md border border-white/20 z-10 space-y-1">
              <div className="text-[10px] font-mono text-[#f7a612] uppercase tracking-wider font-bold">
                Active Dermal Configuration
              </div>
              <h4 className="font-serif text-base font-bold text-white">
                {currentCamo.label}
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                {currentCamo.desc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. RNA EDITING VS DNA */}
      {activeSubsystem === 'rna' && (
        <div className="space-y-4 text-xs">
          <div>
            <h4 className="font-serif text-lg font-bold text-white">
              Dynamic RNA Recoding: Evolutionary Superpower
            </h4>
            <p className="text-slate-300 mt-1">
              Mammals rely on slow DNA mutations over generations. Cephalopods instead recode their own messenger RNA on the fly to survive drastic ocean temperature fluctuations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#001020] border border-white/10 space-y-2">
              <div className="text-slate-400 font-mono uppercase text-[10px]">MAMMALIAN GENETICS</div>
              <div className="font-bold text-white text-sm">Static mRNA Translation</div>
              <p className="text-slate-400 leading-relaxed">
                DNA is transcribed to RNA with less than 0.1% editing. Protein adaptations require hundreds of thousands of years of generational selection.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-[#021b33] to-[#04284d] border border-[#38bdf8]/40 space-y-2">
              <div className="text-cyan-400 font-mono uppercase text-[10px]">CEPHALOPOD RNA RECODING</div>
              <div className="font-bold text-sky-200 text-sm">60,000+ Active mRNA Edits</div>
              <p className="text-slate-200 leading-relaxed">
                Enzymes called ADARs convert adenosine to inosine in neural mRNA transcripts, altering potassium channel kinetics within days when polar currents sweep in.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

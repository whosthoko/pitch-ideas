import React from 'react';
import { Users, Sparkles, Activity, Layers, ArrowRight, Zap, Shield, Radio, Flame, Cpu } from 'lucide-react';

interface ProjectTeasersProps {
  project: 'dropsim' | 'virtualworlds';
  onBackToCommodities: () => void;
}

export const ProjectTeasers: React.FC<ProjectTeasersProps> = ({
  project,
  onBackToCommodities,
}) => {
  if (project === 'dropsim') {
    return (
      <div className="space-y-6">
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-4">
              <Users className="w-3.5 h-3.5" />
              <span>Project #2 in Suite • Queued for Next Phase</span>
            </div>

            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              DropSim: Multi-Agent Behavioral Staging Network
            </h2>

            <p className="text-slate-300 mt-4 leading-relaxed text-sm">
              An autonomous behavioral staging network that simulates consumer and market dynamics prior to high-stakes product drops. Rather than relying on unreliable stated-preference focus groups or burning prospective customer goodwill through fake "smoke-test" ad funnels, DropSim spins up a closed-loop digital ecosystem populated by <strong>500 to 2,000 persistent, economically constrained synthetic agents</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="text-amber-400 font-bold text-xs uppercase font-mono mb-1">500 - 2,000 Agents</div>
                <div className="text-sm font-semibold text-white">Bounded Bankrolls</div>
                <div className="text-xs text-slate-400 mt-1">Persistent synthetic personas with realistic budget limits and utility functions.</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="text-amber-400 font-bold text-xs uppercase font-mono mb-1">Synthetic Discourse</div>
                <div className="text-sm font-semibold text-white">Social Graph Interaction</div>
                <div className="text-xs text-slate-400 mt-1">Agents debate claims against competitor baselines across simulated social media networks.</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="text-amber-400 font-bold text-xs uppercase font-mono mb-1">Pre-Flight Deliverable</div>
                <div className="text-sm font-semibold text-white">Adversarial Friction Tear-Sheet</div>
                <div className="text-xs text-slate-400 mt-1">Delivered 48 hours before public launch with checkout abandon analytics.</div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between">
              <div className="text-xs font-mono text-slate-400">
                Ready to be built after we finish exploring Agentic Commodities.
              </div>
              <button
                onClick={onBackToCommodities}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all"
              >
                <span>Return to Agentic Commodities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Project #3 in Suite • Queued</span>
          </div>

          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Virtual Worlds: Generative Reactive Nightlife Ecosystem
          </h2>

          <p className="text-slate-300 mt-4 leading-relaxed text-sm">
            Virtual Worlds reimagines live entertainment through real-time generative computing. Instead of cycling through pre-rendered loops, the space dynamically renders shifting digital environments that perceive and react to crowd energy, sound, and movement on the fly. Applied to curated nightlife, it transforms clubbing from a passive visual show into a living, responsive ecosystem.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="text-purple-400 font-bold text-xs uppercase font-mono mb-1">Perception Layer</div>
              <div className="text-sm font-semibold text-white">Crowd Energy Sensing</div>
              <div className="text-xs text-slate-400 mt-1">Real-time computer vision and acoustic sensors capture density, BPM, and movement.</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="text-purple-400 font-bold text-xs uppercase font-mono mb-1">Generative Engine</div>
              <div className="text-sm font-semibold text-white">Zero Pre-Rendered Loops</div>
              <div className="text-xs text-slate-400 mt-1">Dynamic neural shaders and shaders render 3D environments responsive to DJ cadence.</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="text-purple-400 font-bold text-xs uppercase font-mono mb-1">Nightlife Curation</div>
              <div className="text-sm font-semibold text-white">Living Club Ecosystem</div>
              <div className="text-xs text-slate-400 mt-1">Transforms physical venues into responsive spatial audio-visual organisms.</div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between">
            <div className="text-xs font-mono text-slate-400">
              Ready to be built after Agentic Commodities and DropSim.
            </div>
            <button
              onClick={onBackToCommodities}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all"
            >
              <span>Return to Agentic Commodities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

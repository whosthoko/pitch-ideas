import React from 'react';
import { Users, Sparkles, ArrowRight } from 'lucide-react';

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
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 text-xs font-medium mb-3">
              <Users className="w-3.5 h-3.5 text-zinc-500" />
              <span>Project #2 in Suite • Next Step</span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
              DropSim: Multi-Agent Behavioral Staging Network
            </h2>

            <p className="text-zinc-600 mt-3 text-sm leading-relaxed">
              An autonomous behavioral staging network that simulates consumer and market dynamics prior to high-stakes product drops. Rather than relying on unreliable stated-preference focus groups or burning prospective customer goodwill through fake "smoke-test" ad funnels, DropSim spins up a closed-loop digital ecosystem populated by <strong>500 to 2,000 persistent, economically constrained synthetic agents</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6">
              <div className="bg-[#FAFAFA] p-4 rounded-xl border border-zinc-200/60">
                <div className="text-zinc-400 font-mono text-[11px] uppercase tracking-wider mb-1">500 - 2,000 Agents</div>
                <div className="text-sm font-semibold text-zinc-900">Bounded Bankrolls</div>
                <div className="text-xs text-zinc-500 mt-1">Persistent synthetic personas with realistic budget limits and utility functions.</div>
              </div>

              <div className="bg-[#FAFAFA] p-4 rounded-xl border border-zinc-200/60">
                <div className="text-zinc-400 font-mono text-[11px] uppercase tracking-wider mb-1">Social Graph</div>
                <div className="text-sm font-semibold text-zinc-900">Synthetic Discourse</div>
                <div className="text-xs text-zinc-500 mt-1">Agents debate claims against competitor baselines across simulated social media networks.</div>
              </div>

              <div className="bg-[#FAFAFA] p-4 rounded-xl border border-zinc-200/60">
                <div className="text-zinc-400 font-mono text-[11px] uppercase tracking-wider mb-1">Deliverable</div>
                <div className="text-sm font-semibold text-zinc-900">Friction Tear-Sheet</div>
                <div className="text-xs text-zinc-500 mt-1">Delivered 48 hours before public launch with checkout abandon analytics.</div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-zinc-100 flex items-center justify-between">
              <span className="text-xs text-zinc-400">
                Queued for our next step after Agentic Commodities.
              </span>
              <button
                onClick={onBackToCommodities}
                className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all shadow-xs"
              >
                <span>Back to Agentic Commodities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="max-w-2xl">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
            <span>Project #3 in Suite • Queued</span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
            Virtual Worlds: Generative Reactive Nightlife Ecosystem
          </h2>

          <p className="text-zinc-600 mt-3 text-sm leading-relaxed">
            Virtual Worlds reimagines live entertainment through real-time generative computing. Instead of cycling through pre-rendered loops, the space dynamically renders shifting digital environments that perceive and react to crowd energy, sound, and movement on the fly. Applied to curated nightlife, it transforms clubbing from a passive visual show into a living, responsive ecosystem.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6">
            <div className="bg-[#FAFAFA] p-4 rounded-xl border border-zinc-200/60">
              <div className="text-zinc-400 font-mono text-[11px] uppercase tracking-wider mb-1">Perception Layer</div>
              <div className="text-sm font-semibold text-zinc-900">Crowd Sensing</div>
              <div className="text-xs text-zinc-500 mt-1">Computer vision and acoustic sensors capture density, BPM, and movement.</div>
            </div>

            <div className="bg-[#FAFAFA] p-4 rounded-xl border border-zinc-200/60">
              <div className="text-zinc-400 font-mono text-[11px] uppercase tracking-wider mb-1">Generative Engine</div>
              <div className="text-sm font-semibold text-zinc-900">Zero Static Loops</div>
              <div className="text-xs text-zinc-500 mt-1">Real-time shaders render shifting visual environments responsive to musical energy.</div>
            </div>

            <div className="bg-[#FAFAFA] p-4 rounded-xl border border-zinc-200/60">
              <div className="text-zinc-400 font-mono text-[11px] uppercase tracking-wider mb-1">Curated Nightlife</div>
              <div className="text-sm font-semibold text-zinc-900">Living Ecosystem</div>
              <div className="text-xs text-zinc-500 mt-1">Transforms venues into responsive spatial audio-visual environments.</div>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-zinc-100 flex items-center justify-between">
            <span className="text-xs text-zinc-400">
              Queued for after DropSim.
            </span>
            <button
              onClick={onBackToCommodities}
              className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all shadow-xs"
            >
              <span>Back to Agentic Commodities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

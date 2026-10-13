import React from 'react';
import { Shield, Sparkles, Cpu, Layers, Zap } from 'lucide-react';

interface NavbarProps {
  currentProject: 'commodities' | 'dropsim' | 'virtualworlds';
  onSelectProject: (p: 'commodities' | 'dropsim' | 'virtualworlds') => void;
  activeTab: 'visual' | 'simulator' | 'zk-studio' | 'architecture';
  onSelectTab: (tab: 'visual' | 'simulator' | 'zk-studio' | 'architecture') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentProject,
  onSelectProject,
  activeTab,
  onSelectTab,
}) => {
  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Minimalist Project Switcher (Notion / OpenAI Style) */}
        <div className="flex items-center justify-between h-13 border-b border-zinc-100 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-zinc-400 font-medium text-[11px] tracking-wide uppercase mr-1">
              Projects
            </span>
            <div className="flex items-center bg-zinc-100 p-0.5 rounded-lg space-x-1 border border-zinc-200/60">
              <button
                onClick={() => onSelectProject('commodities')}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  currentProject === 'commodities'
                    ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200/80'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Agentic Commodities</span>
              </button>

              <button
                onClick={() => onSelectProject('dropsim')}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  currentProject === 'dropsim'
                    ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200/80'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                <span>DropSim</span>
              </button>

              <button
                onClick={() => onSelectProject('virtualworlds')}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  currentProject === 'virtualworlds'
                    ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200/80'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                <span>Virtual Worlds</span>
              </button>
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-4 text-[11px] text-zinc-500">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>TEE Sandbox Active</span>
            </span>
            <span className="text-zinc-300">•</span>
            <span>Zero-Knowledge Proofs</span>
          </div>
        </div>

        {/* Brand Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-3">
          <div>
            <div className="flex items-center space-x-2.5">
              <h1 className="text-xl font-bold tracking-tight text-zinc-900 m-0">
                Agentic Commodities
              </h1>
              <span className="text-[11px] font-mono bg-zinc-100 text-zinc-700 border border-zinc-200 px-2 py-0.5 rounded-md font-medium">
                Protocol Overview
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Autonomous compliance, clearing, and negotiation protocol for private OTC physical trade
            </p>
          </div>

          {/* Minimalist Sub-tabs */}
          {currentProject === 'commodities' && (
            <div className="flex items-center bg-zinc-100 p-1 rounded-xl border border-zinc-200/80 text-xs self-start sm:self-auto">
              <button
                onClick={() => onSelectTab('visual')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === 'visual'
                    ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200/70'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-zinc-700" />
                <span>System Visual</span>
              </button>

              <button
                onClick={() => onSelectTab('zk-studio')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === 'zk-studio'
                    ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200/70'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-zinc-700" />
                <span>ZK Proofs</span>
              </button>

              <button
                onClick={() => onSelectTab('simulator')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === 'simulator'
                    ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200/70'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-zinc-700" />
                <span>Negotiation Stepper</span>
              </button>

              <button
                onClick={() => onSelectTab('architecture')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === 'architecture'
                    ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200/70'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-zinc-700" />
                <span>Architecture</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

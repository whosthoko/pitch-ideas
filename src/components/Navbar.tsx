import React from 'react';
import { ShieldCheck, Cpu, Terminal, EyeOff, Lock, Layers, Zap, Sparkles } from 'lucide-react';

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
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      {/* Top project navigation switcher */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 border-b border-slate-800/60 text-xs">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-slate-400 uppercase tracking-widest text-[11px] font-semibold">
              Project Showcase
            </span>
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 space-x-1">
              <button
                onClick={() => onSelectProject('commodities')}
                className={`flex items-center space-x-2 px-3 py-1 rounded-md font-medium transition-all ${
                  currentProject === 'commodities'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Agentic Commodities</span>
                <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 text-[10px] px-1.5 py-0.2 rounded font-mono">
                  ACTIVE
                </span>
              </button>

              <button
                onClick={() => onSelectProject('dropsim')}
                className={`flex items-center space-x-2 px-3 py-1 rounded-md font-medium transition-all ${
                  currentProject === 'dropsim'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>DropSim</span>
                <span className="bg-slate-800 text-slate-400 text-[10px] px-1.5 py-0.2 rounded font-mono">
                  NEXT
                </span>
              </button>

              <button
                onClick={() => onSelectProject('virtualworlds')}
                className={`flex items-center space-x-2 px-3 py-1 rounded-md font-medium transition-all ${
                  currentProject === 'virtualworlds'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span>Virtual Worlds</span>
                <span className="bg-slate-800 text-slate-400 text-[10px] px-1.5 py-0.2 rounded font-mono">
                  QUEUED
                </span>
              </button>
            </div>
          </div>

          {/* Enclave Live Status telemetry */}
          <div className="hidden md:flex items-center space-x-4 font-mono text-[11px] text-slate-400">
            <div className="flex items-center space-x-1.5 text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-md">
              <Cpu className="w-3.5 h-3.5" />
              <span>TEE: Nitro SGX Enclave v4.2</span>
            </div>
            <div className="flex items-center space-x-1.5 text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-1 rounded-md">
              <Lock className="w-3.5 h-3.5" />
              <span>Halo2 / Groth16 POF+POP Active</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-300 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md">
              <EyeOff className="w-3.5 h-3.5 text-amber-400" />
              <span>Zero Leakage Sandbox</span>
            </div>
          </div>
        </div>

        {/* Main Header Row */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/5">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold tracking-tight text-white m-0">
                  AGENTIC COMMODITIES
                </h1>
                <span className="text-[11px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-medium">
                  Autonomous OTC Clearing Protocol
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Encrypted Execution Sandbox • Sovereign Software Agents • ZK-POF & ZK-POP Verification • Programmatic Escrow
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="hidden lg:flex items-center space-x-5 text-right font-mono">
            <div>
              <div className="text-[10px] text-slate-500 uppercase">Shielded OTC Volume</div>
              <div className="text-sm font-semibold text-emerald-400">$2,418,920,000</div>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <div className="text-[10px] text-slate-500 uppercase">Active Enclave Agents</div>
              <div className="text-sm font-semibold text-white">142 Sovereign Bots</div>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <div className="text-[10px] text-slate-500 uppercase">ZK Proof Latency</div>
              <div className="text-sm font-semibold text-cyan-400">18.4 ms avg</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs for Agentic Commodities */}
        {currentProject === 'commodities' && (
          <nav className="flex space-x-1 overflow-x-auto pb-2 pt-1 border-t border-slate-800/40 text-sm">
            <button
              onClick={() => onSelectTab('visual')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === 'visual'
                  ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>System Visual (Buyer ↔ Sandbox ↔ Seller)</span>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.2 rounded font-mono">
                CORE VISUAL
              </span>
            </button>

            <button
              onClick={() => onSelectTab('zk-studio')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === 'zk-studio'
                  ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>ZK Proof Engine (POF & POP)</span>
            </button>

            <button
              onClick={() => onSelectTab('simulator')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === 'simulator'
                  ? 'bg-slate-800 text-indigo-400 border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Zap className="w-4 h-4 text-indigo-400" />
              <span>Step-by-Step Negotiation Stepper</span>
            </button>

            <button
              onClick={() => onSelectTab('architecture')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === 'architecture'
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Layers className="w-4 h-4 text-slate-400" />
              <span>Security & Threat Model</span>
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

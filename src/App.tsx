import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { NegotiationSimulator } from './components/NegotiationSimulator';
import { ZkProofStudio } from './components/ZkProofStudio';
import { DarkLiquidityMatrix } from './components/DarkLiquidityMatrix';
import { ArchitectureFlow } from './components/ArchitectureFlow';
import { AgentMandateBuilder } from './components/AgentMandateBuilder';
import { ProjectTeasers } from './components/ProjectTeasers';
import type { BlindedOrder } from './types/commodities';
import { Shield, Cpu, Lock, Terminal, Globe } from 'lucide-react';

export function App() {
  const [currentProject, setCurrentProject] = useState<'commodities' | 'dropsim' | 'virtualworlds'>('commodities');
  const [activeTab, setActiveTab] = useState<'simulator' | 'zk-studio' | 'dark-pool' | 'architecture' | 'agent-builder'>('simulator');

  const handleSelectOrderForNegotiation = (order: BlindedOrder) => {
    setActiveTab('simulator');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Institutional Top Header */}
      <Navbar
        currentProject={currentProject}
        onSelectProject={setCurrentProject}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentProject === 'commodities' ? (
          <div>
            {activeTab === 'simulator' && <NegotiationSimulator />}
            {activeTab === 'zk-studio' && <ZkProofStudio />}
            {activeTab === 'dark-pool' && (
              <DarkLiquidityMatrix onSelectOrderForNegotiation={handleSelectOrderForNegotiation} />
            )}
            {activeTab === 'architecture' && <ArchitectureFlow />}
            {activeTab === 'agent-builder' && <AgentMandateBuilder />}
          </div>
        ) : (
          <ProjectTeasers
            project={currentProject}
            onBackToCommodities={() => setCurrentProject('commodities')}
          />
        )}
      </main>

      {/* Institutional Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-slate-300 font-semibold">Agentic Commodities Protocol v2.4</span>
            <span>•</span>
            <span>Zero-Knowledge OTC Clearing</span>
          </div>

          <div className="flex items-center space-x-6 text-[11px]">
            <span className="flex items-center space-x-1.5 text-slate-400">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Nitro Enclaves Active</span>
            </span>
            <span className="flex items-center space-x-1.5 text-slate-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Groth16 / Halo2 Verified</span>
            </span>
            <span className="flex items-center space-x-1.5 text-slate-400">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>ISDA/EFET Legal Integration</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

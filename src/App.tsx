import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { AgenticCommoditiesVisual } from './components/AgenticCommoditiesVisual';
import { NegotiationSimulator } from './components/NegotiationSimulator';
import { ZkProofStudio } from './components/ZkProofStudio';
import { ArchitectureFlow } from './components/ArchitectureFlow';
import { ProjectTeasers } from './components/ProjectTeasers';
import { Shield, Cpu, Lock } from 'lucide-react';

export function App() {
  const [currentProject, setCurrentProject] = useState<'commodities' | 'dropsim' | 'virtualworlds'>('commodities');
  const [activeTab, setActiveTab] = useState<'visual' | 'simulator' | 'zk-studio' | 'architecture'>('visual');

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 flex flex-col font-sans selection:bg-zinc-900 selection:text-white">
      {/* Institutional Top Header */}
      <Navbar
        currentProject={currentProject}
        onSelectProject={setCurrentProject}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {currentProject === 'commodities' ? (
          <div>
            {activeTab === 'visual' && <AgenticCommoditiesVisual />}
            {activeTab === 'zk-studio' && <ZkProofStudio />}
            {activeTab === 'simulator' && <NegotiationSimulator />}
            {activeTab === 'architecture' && <ArchitectureFlow />}
          </div>
        ) : (
          <ProjectTeasers
            project={currentProject}
            onBackToCommodities={() => setCurrentProject('commodities')}
          />
        )}
      </main>

      {/* Minimalist Footer */}
      <footer className="border-t border-zinc-200 bg-white py-6 text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-zinc-700 font-medium">Agentic Commodities Protocol</span>
            <span className="text-zinc-300">•</span>
            <span className="text-zinc-400">Zero-Knowledge OTC Physical Clearing</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] text-zinc-400">
            <span>Confidential Enclaves</span>
            <span>•</span>
            <span>Groth16 / Halo2 Circuits</span>
            <span>•</span>
            <span>ISDA / EFET Legal Escrow</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

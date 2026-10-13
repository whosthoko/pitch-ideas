import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { AgenticCommoditiesVisual } from './components/AgenticCommoditiesVisual';
import { DropSimVisual } from './components/DropSimVisual';
import { VirtualWorldsVisual } from './components/VirtualWorldsVisual';

export function App() {
  const [currentProject, setCurrentProject] = useState<'commodities' | 'dropsim' | 'virtualworlds'>('virtualworlds');

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 flex flex-col font-sans selection:bg-zinc-900 selection:text-white">
      {/* Top Header */}
      <Navbar
        currentProject={currentProject}
        onSelectProject={setCurrentProject}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {currentProject === 'commodities' && <AgenticCommoditiesVisual />}
        {currentProject === 'dropsim' && <DropSimVisual />}
        {currentProject === 'virtualworlds' && <VirtualWorldsVisual />}
      </main>

      {/* Minimalist Footer */}
      <footer className="border-t border-zinc-200 bg-white py-6 text-xs text-zinc-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className={`w-1.5 h-1.5 rounded-full ${currentProject === 'commodities' ? 'bg-emerald-500' : currentProject === 'dropsim' ? 'bg-amber-500' : 'bg-purple-500'}`} />
            <span className="text-zinc-700 font-medium">
              {currentProject === 'commodities' ? 'Agentic Commodities Protocol' : currentProject === 'dropsim' ? 'DropSim Behavioral Staging Network' : 'Virtual Worlds Generative Nightlife'}
            </span>
            <span className="text-zinc-300">•</span>
            <span className="text-zinc-400">
              {currentProject === 'commodities' ? 'Zero-Knowledge OTC Physical Clearing' : currentProject === 'dropsim' ? 'Multi-Agent Closed-Loop Behavioral Staging' : 'Real-Time Generative Environments'}
            </span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] text-zinc-400 font-mono">
            {currentProject === 'commodities' ? (
              <>
                <span>Hardware Enclaves</span>
                <span>•</span>
                <span>zk-SNARKs</span>
                <span>•</span>
                <span>Programmatic Escrow</span>
              </>
            ) : currentProject === 'dropsim' ? (
              <>
                <span>Synthetic Discourse</span>
                <span>•</span>
                <span>Bounded Bankrolls</span>
                <span>•</span>
                <span>48h Friction Tear-Sheet</span>
              </>
            ) : (
              <>
                <span>Crowd Sensing</span>
                <span>•</span>
                <span>Neural Shaders</span>
                <span>•</span>
                <span>Spatial Ecosystem</span>
              </>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

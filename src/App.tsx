import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { AgenticCommoditiesVisual } from './components/AgenticCommoditiesVisual';
import { ProjectTeasers } from './components/ProjectTeasers';

export function App() {
  const [currentProject, setCurrentProject] = useState<'commodities' | 'dropsim' | 'virtualworlds'>('commodities');

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 flex flex-col font-sans selection:bg-zinc-900 selection:text-white">
      {/* Top Header */}
      <Navbar
        currentProject={currentProject}
        onSelectProject={setCurrentProject}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {currentProject === 'commodities' ? (
          <AgenticCommoditiesVisual />
        ) : (
          <ProjectTeasers
            project={currentProject}
            onBackToCommodities={() => setCurrentProject('commodities')}
          />
        )}
      </main>

      {/* Minimalist Footer */}
      <footer className="border-t border-zinc-200 bg-white py-6 text-xs text-zinc-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-zinc-700 font-medium">Agentic Commodities Protocol</span>
            <span className="text-zinc-300">•</span>
            <span className="text-zinc-400">Zero-Knowledge OTC Physical Clearing</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] text-zinc-400 font-mono">
            <span>Hardware Enclaves</span>
            <span>•</span>
            <span>zk-SNARKs</span>
            <span>•</span>
            <span>Programmatic Escrow</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

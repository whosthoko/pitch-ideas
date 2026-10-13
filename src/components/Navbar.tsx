import React from 'react';

interface NavbarProps {
  currentProject: 'commodities' | 'dropsim' | 'virtualworlds';
  onSelectProject: (p: 'commodities' | 'dropsim' | 'virtualworlds') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentProject,
  onSelectProject,
}) => {
  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Minimalist Project Switcher (Notion / OpenAI Style) */}
        <div className="flex items-center justify-between h-14 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-zinc-400 font-medium text-[11px] uppercase tracking-wider mr-1">
              Projects
            </span>
            <div className="flex items-center bg-zinc-100 p-0.5 rounded-lg space-x-1 border border-zinc-200/60">
              <button
                onClick={() => onSelectProject('commodities')}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
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
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
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
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
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

          <div className="hidden sm:flex items-center space-x-3 text-[11px] text-zinc-500 font-mono">
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>TEE Sandbox Active</span>
            </span>
            <span className="text-zinc-300">•</span>
            <span>Zero-Knowledge Proofs</span>
          </div>
        </div>
      </div>
    </header>
  );
};

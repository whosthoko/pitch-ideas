import React, { useState } from 'react';
import { 
  Building2, 
  Cpu, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  EyeOff, 
  Coins, 
  Ship, 
  Scale, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Info,
  RefreshCw,
  Zap,
  Globe
} from 'lucide-react';

export const AgenticCommoditiesVisual: React.FC = () => {
  // Active stage for interactive walkthrough
  // 'overview' | 'identities' | 'zk-proofs' | 'negotiation' | 'escrow-unmask'
  const [activeStage, setActiveStage] = useState<'overview' | 'identities' | 'zk-proofs' | 'negotiation' | 'escrow-unmask'>('overview');
  
  // Toggle unmasked state in the visual
  const [isUnmasked, setIsUnmasked] = useState<boolean>(false);

  // Selected commodity for the visual representation
  const [commodity, setCommodity] = useState<'LNG' | 'Crude' | 'Copper'>('LNG');

  const commoditySpecs = {
    LNG: {
      name: 'Liquefied Natural Gas (LNG)',
      volume: '3,400,000 MMBtu (65,000 MT)',
      value: '$47.1M USD',
      collar: '$13.60 - $14.10 / MMBtu',
      buyerNeed: 'Gate Terminal Rotterdam (Nov 15-18)',
      sellerAllocation: 'Storage Tank #04, Maasvlakte',
      buyerName: 'Helios Energy Trading S.A. (Geneva)',
      sellerName: 'Nordic Cryo Logistics B.V. (Rotterdam)',
    },
    Crude: {
      name: 'Brent Crude Oil',
      volume: '600,000 Barrels (Aframax)',
      value: '$47.6M USD',
      collar: '$78.50 - $80.20 / bbl',
      buyerNeed: 'FOB Sullom Voe Terminal (Nov 20-22)',
      sellerAllocation: 'North Sea Crude Berth 2',
      buyerName: 'Aura Petroleum Global (London)',
      sellerName: 'Statoil Maritime Refineries (Oslo)',
    },
    Copper: {
      name: 'Grade A Copper Cathodes',
      volume: '2,500 Metric Tonnes (LME)',
      value: '$24.4M USD',
      collar: '$9,700 - $9,850 / MT',
      buyerNeed: 'Bonded Warehouse Yangshan (Dec 01-08)',
      sellerAllocation: 'SGS Inspected Lot #CU-9918',
      buyerName: 'Pacific Metals Manufacturing (Tokyo)',
      sellerName: 'Andean Mining Copper Corp (Santiago)',
    },
  }[commodity];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Description & Concept Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Agentic Commodities System Architecture</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          Private OTC Physical Trade Through Sovereign Software Agents
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          A visual representation of the system connecting two counterparties. The central encrypted protocol handles identity shielding, mathematical proofs of capital and cargo, and autonomous term negotiation—unmasking corporate identities <span className="text-emerald-400 font-semibold">strictly</span> when terms lock into programmatic escrow.
        </p>

        {/* Commodity Selector Pill */}
        <div className="pt-2 flex items-center justify-center space-x-2 text-xs font-mono">
          <span className="text-slate-500">Commodity Example:</span>
          {(['LNG', 'Crude', 'Copper'] as const).map((c) => (
            <button
              key={c}
              onClick={() => {
                setCommodity(c);
                setIsUnmasked(false);
              }}
              className={`px-3 py-1 rounded-lg transition-all ${
                commodity === c
                  ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 font-bold'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {c === 'LNG' ? 'LNG Cargo' : c === 'Crude' ? 'Brent Crude' : 'Copper Cathodes'}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Visual Stage Navigator */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
        <button
          onClick={() => { setActiveStage('overview'); setIsUnmasked(false); }}
          className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-2 ${
            activeStage === 'overview'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>1. Full System Overview</span>
        </button>

        <button
          onClick={() => { setActiveStage('identities'); setIsUnmasked(false); }}
          className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-2 ${
            activeStage === 'identities'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <EyeOff className="w-3.5 h-3.5" />
          <span>2. Shielded Identities</span>
        </button>

        <button
          onClick={() => { setActiveStage('zk-proofs'); setIsUnmasked(false); }}
          className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-2 ${
            activeStage === 'zk-proofs'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>3. Zero-Knowledge Proofs (POF & POP)</span>
        </button>

        <button
          onClick={() => { setActiveStage('negotiation'); setIsUnmasked(false); }}
          className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-2 ${
            activeStage === 'negotiation'
              ? 'bg-indigo-500 text-slate-950 font-bold shadow-lg shadow-indigo-500/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>4. Autonomous Agent Negotiation</span>
        </button>

        <button
          onClick={() => { setActiveStage('escrow-unmask'); setIsUnmasked(true); }}
          className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-2 ${
            activeStage === 'escrow-unmask'
              ? 'bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-400/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Unlock className="w-3.5 h-3.5" />
          <span>5. Escrow Lock & Unmasking</span>
        </button>
      </div>

      {/* Main 3-Column Diagram (Buyer <--> The System <--> Seller) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: THE BUYER (Corporate Entity + Sovereign Buyer Agent) */}
        {/* ========================================================================= */}
        <div className={`lg:col-span-3.5 lg:col-span-4 rounded-3xl p-6 border transition-all flex flex-col justify-between ${
          activeStage === 'identities' || activeStage === 'zk-proofs' || activeStage === 'negotiation'
            ? 'bg-slate-900/90 border-blue-500/50 shadow-xl shadow-blue-500/5'
            : 'bg-slate-900/60 border-slate-800'
        }`}>
          <div>
            {/* Persona Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shadow-inner">
                  <Building2 className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold">
                    Counterparty A
                  </span>
                  <h3 className="text-base font-bold text-white">THE BUYER</h3>
                  <div className="text-[11px] text-slate-400">Industrial / Energy Consumer</div>
                </div>
              </div>
            </div>

            {/* Corporate Identity Shielding */}
            <div className={`p-4 rounded-2xl border transition-all mb-4 text-xs ${
              isUnmasked || activeStage === 'escrow-unmask'
                ? 'bg-blue-950/40 border-blue-500/40 text-blue-200'
                : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}>
              <div className="flex items-center justify-between font-mono text-[11px] mb-2">
                <span className="flex items-center space-x-1.5 font-bold">
                  {isUnmasked || activeStage === 'escrow-unmask' ? (
                    <Unlock className="w-3.5 h-3.5 text-blue-400" />
                  ) : (
                    <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                  )}
                  <span>Corporate Identity</span>
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  isUnmasked || activeStage === 'escrow-unmask'
                    ? 'bg-blue-900/60 text-blue-300'
                    : 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                }`}>
                  {isUnmasked || activeStage === 'escrow-unmask' ? 'UNMASKED' : 'SHIELDED'}
                </span>
              </div>

              {isUnmasked || activeStage === 'escrow-unmask' ? (
                <div className="space-y-1 font-mono text-slate-200">
                  <div className="font-bold text-white text-sm">{commoditySpecs.buyerName}</div>
                  <div className="text-[11px] text-slate-400">LEI: 549300V31G7WXYZ091 • Swiss Jurisdiction</div>
                  <div className="text-[11px] text-emerald-400">Bank: UBS Switzerland AG (Escrow Connected)</div>
                </div>
              ) : (
                <div className="space-y-1 font-mono text-slate-400">
                  <div className="text-white font-bold tracking-wider">Blinded ID: 0x7F2e...4C91</div>
                  <div className="text-[11px] text-amber-300/80">Corporate name & banking coordinates veiled</div>
                </div>
              )}
            </div>

            {/* What Buyer Keeps Private (Never Revealed) */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 mb-4 text-xs space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center space-x-1.5">
                <Lock className="w-3 h-3 text-rose-400" />
                <span>Permanently Private (In Enclave)</span>
              </div>
              <ul className="space-y-1.5 text-slate-400 text-[11px]">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                  <span>Actual Bank Account Balances</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                  <span>Commercial Credit Facility Limits</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                  <span>Internal Treasury Cashflow Models</span>
                </li>
              </ul>
            </div>

            {/* Delegated Sovereign Buyer Agent */}
            <div className="bg-gradient-to-br from-blue-950/30 to-slate-950 border border-blue-500/30 rounded-2xl p-4 text-xs">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1.5 text-blue-400 font-bold">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Sovereign Buyer Software Agent</span>
                </div>
                <span className="text-[10px] font-mono text-blue-300 bg-blue-950 px-1.5 py-0.2 rounded border border-blue-800">
                  Autonomous
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Empowered to negotiate within mandated collars:
              </p>
              <div className="mt-2 space-y-1 font-mono text-[11px] text-slate-300">
                <div>• Target Volume: <span className="text-white font-bold">{commoditySpecs.volume}</span></div>
                <div>• Price Ceiling: <span className="text-emerald-400 font-bold">{commoditySpecs.collar.split('-')[1]?.trim()}</span></div>
                <div>• Generates: <span className="text-cyan-400 font-bold">ZK-POF (Proof of Funds)</span></div>
              </div>
            </div>
          </div>

          {/* Outgoing Arrow to System */}
          <div className="mt-4 pt-3 border-t border-slate-800 text-center font-mono text-[11px] text-blue-400 flex items-center justify-center space-x-1">
            <span>Passes ZK-POF Proof & Collar</span>
            <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CENTER COLUMN: THE SYSTEM (Agentic Commodities Protocol Sandbox) */}
        {/* ========================================================================= */}
        <div className={`lg:col-span-5 rounded-3xl p-6 border transition-all flex flex-col justify-between relative ${
          activeStage === 'overview'
            ? 'bg-slate-900 border-emerald-500/40 shadow-2xl shadow-emerald-500/10'
            : 'bg-slate-900/90 border-slate-700'
        }`}>
          {/* Subtle glowing background */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-cyan-500/5 to-transparent rounded-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* System Title */}
            <div className="text-center pb-4 border-b border-slate-800 mb-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-2 shadow-sm">
                <Cpu className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Encrypted Execution Sandbox</span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-wide">
                AGENTIC COMMODITIES PROTOCOL
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Hardware-isolated confidential enclave handling 5 core automated mechanisms:
              </p>
            </div>

            {/* The 5 Things the System Handles */}
            <div className="space-y-3">
              {/* Thing 1: Blinded Identity Gateway */}
              <div className={`p-3.5 rounded-2xl border transition-all ${
                activeStage === 'identities'
                  ? 'bg-amber-950/40 border-amber-500/60 ring-1 ring-amber-500/40'
                  : 'bg-slate-950/80 border-slate-800'
              }`}>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <EyeOff className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-white">1. Blinded Cryptographic Identities</span>
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-1.5 py-0.2 rounded">Shielded</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                      Replaces corporate names and banking coordinates with ephemeral blinded hashes throughout discovery and bidding.
                    </p>
                  </div>
                </div>
              </div>

              {/* Thing 2: ZK Capital & Physical Verifier */}
              <div className={`p-3.5 rounded-2xl border transition-all ${
                activeStage === 'zk-proofs'
                  ? 'bg-cyan-950/40 border-cyan-500/60 ring-1 ring-cyan-500/40'
                  : 'bg-slate-950/80 border-slate-800'
              }`}>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-white">2. Zero-Knowledge Verifier (POF & POP)</span>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.2 rounded">0-Leakage</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                      <strong>POF:</strong> Verifies buyer capital capacity without reading bank statements. <br />
                      <strong>POP:</strong> Verifies seller warehouse receipt & assay without reading supplier contracts.
                    </p>
                  </div>
                </div>
              </div>

              {/* Thing 3: Autonomous Agent Negotiation Sandbox */}
              <div className={`p-3.5 rounded-2xl border transition-all ${
                activeStage === 'negotiation'
                  ? 'bg-indigo-950/40 border-indigo-500/60 ring-1 ring-indigo-500/40'
                  : 'bg-slate-950/80 border-slate-800'
              }`}>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Scale className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-white">3. Autonomous Collar & Term Negotiation</span>
                      <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950/60 px-1.5 py-0.2 rounded">Nash Equilibrium</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                      Software agents negotiate price collars (${commoditySpecs.collar}), cargo delivery dates (laycan window), and demurrage caps algorithmically.
                    </p>
                  </div>
                </div>
              </div>

              {/* Thing 4 & 5: Programmatic Escrow & Unmasking */}
              <div className={`p-3.5 rounded-2xl border transition-all ${
                activeStage === 'escrow-unmask' || isUnmasked
                  ? 'bg-emerald-950/50 border-emerald-500/60 ring-1 ring-emerald-500/40'
                  : 'bg-slate-950/80 border-slate-800'
              }`}>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    {isUnmasked || activeStage === 'escrow-unmask' ? (
                      <Unlock className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Lock className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-white">4 & 5. Programmatic Escrow & Strict Unmasking</span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded font-bold">Execution Lock</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                      Funds & cargo title lock into multi-sig escrow simultaneously. Blinders fall away <strong className="text-emerald-400">strictly at the point of contract execution</strong>, unmasking parties into an enforceable master agreement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Trigger Button at center bottom */}
          <div className="mt-5 pt-4 border-t border-slate-800 relative z-10 flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400">
              Contract Value: <strong className="text-white">{commoditySpecs.value}</strong>
            </span>
            <button
              onClick={() => {
                setIsUnmasked(!isUnmasked);
                if (!isUnmasked) setActiveStage('escrow-unmask');
                else setActiveStage('overview');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                isUnmasked || activeStage === 'escrow-unmask'
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
              }`}
            >
              {isUnmasked || activeStage === 'escrow-unmask' ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Re-Shield Identities</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Simulate Escrow Unmasking</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: THE SELLER (Corporate Entity + Sovereign Seller Agent) */}
        {/* ========================================================================= */}
        <div className={`lg:col-span-3.5 lg:col-span-4 rounded-3xl p-6 border transition-all flex flex-col justify-between ${
          activeStage === 'identities' || activeStage === 'zk-proofs' || activeStage === 'negotiation'
            ? 'bg-slate-900/90 border-emerald-500/50 shadow-xl shadow-emerald-500/5'
            : 'bg-slate-900/60 border-slate-800'
        }`}>
          <div>
            {/* Persona Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-inner">
                  <Ship className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    Counterparty B
                  </span>
                  <h3 className="text-base font-bold text-white">THE SELLER</h3>
                  <div className="text-[11px] text-slate-400">Refinery / Terminal / Producer</div>
                </div>
              </div>
            </div>

            {/* Corporate Identity Shielding */}
            <div className={`p-4 rounded-2xl border transition-all mb-4 text-xs ${
              isUnmasked || activeStage === 'escrow-unmask'
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}>
              <div className="flex items-center justify-between font-mono text-[11px] mb-2">
                <span className="flex items-center space-x-1.5 font-bold">
                  {isUnmasked || activeStage === 'escrow-unmask' ? (
                    <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                  )}
                  <span>Corporate Identity</span>
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  isUnmasked || activeStage === 'escrow-unmask'
                    ? 'bg-emerald-900/60 text-emerald-300'
                    : 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                }`}>
                  {isUnmasked || activeStage === 'escrow-unmask' ? 'UNMASKED' : 'SHIELDED'}
                </span>
              </div>

              {isUnmasked || activeStage === 'escrow-unmask' ? (
                <div className="space-y-1 font-mono text-slate-200">
                  <div className="font-bold text-white text-sm">{commoditySpecs.sellerName}</div>
                  <div className="text-[11px] text-slate-400">LEI: 724500Q89LKJH0123 • Netherlands Port Authority</div>
                  <div className="text-[11px] text-emerald-400">Assay: SGS Quality Certificate #SGS-2026-LNG-8812</div>
                </div>
              ) : (
                <div className="space-y-1 font-mono text-slate-400">
                  <div className="text-white font-bold tracking-wider">Blinded ID: 0x3B8a...1F04</div>
                  <div className="text-[11px] text-amber-300/80">Vessel manifests, source contracts veiled</div>
                </div>
              )}
            </div>

            {/* What Seller Keeps Private (Never Revealed) */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 mb-4 text-xs space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center space-x-1.5">
                <Lock className="w-3 h-3 text-rose-400" />
                <span>Permanently Private (In Enclave)</span>
              </div>
              <ul className="space-y-1.5 text-slate-400 text-[11px]">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                  <span>Upstream Supplier & Offtake Contracts</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                  <span>Refinery / Extraction Cost Margin Basis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                  <span>Carrier Vessel IMO Prior to Settlement</span>
                </li>
              </ul>
            </div>

            {/* Delegated Sovereign Seller Agent */}
            <div className="bg-gradient-to-br from-emerald-950/30 to-slate-950 border border-emerald-500/30 rounded-2xl p-4 text-xs">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Sovereign Seller Software Agent</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800">
                  Autonomous
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Empowered to negotiate within mandated collars:
              </p>
              <div className="mt-2 space-y-1 font-mono text-[11px] text-slate-300">
                <div>• Allocated Parcel: <span className="text-white font-bold">{commoditySpecs.volume}</span></div>
                <div>• Price Floor: <span className="text-emerald-400 font-bold">{commoditySpecs.collar.split('-')[0]?.trim()}</span></div>
                <div>• Generates: <span className="text-cyan-400 font-bold">ZK-POP (Physical Allocation)</span></div>
              </div>
            </div>
          </div>

          {/* Incoming Arrow from System */}
          <div className="mt-4 pt-3 border-t border-slate-800 text-center font-mono text-[11px] text-emerald-400 flex items-center justify-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5 animate-pulse" />
            <span>Passes ZK-POP Proof & Floor</span>
          </div>
        </div>
      </div>

      {/* Dynamic Stage Explanation Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <Info className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white">
              {activeStage === 'overview' && 'System Architecture at a Glance'}
              {activeStage === 'identities' && 'How Blinded Cryptographic Identities Protect Both Parties'}
              {activeStage === 'zk-proofs' && 'How Zero-Knowledge Proofs Verify Solvency & Cargo Without Data Leaks'}
              {activeStage === 'negotiation' && 'How Sovereign Software Agents Autonomously Reach Agreement'}
              {activeStage === 'escrow-unmask' && 'The Point of Execution: Programmatic Escrow & Strict Unmasking'}
            </h4>
            <div className="text-xs text-slate-400 font-mono">
              Core Principles of the Agentic Commodities Protocol
            </div>
          </div>
        </div>

        <div className="text-sm text-slate-300 leading-relaxed space-y-3">
          {activeStage === 'overview' && (
            <p>
              The <strong>Buyer</strong> on the left and the <strong>Seller</strong> on the right never communicate directly over email, phone, or broker chat. Instead, both parties deploy <strong>Sovereign Software Agents</strong> into a hardware-isolated confidential enclave in the center. The enclave handles bilateral verification, algorithmic bargaining within price collars, and programmatic escrow settlement—completely shielding corporate identities until binding legal terms lock.
            </p>
          )}

          {activeStage === 'identities' && (
            <p>
              In traditional OTC markets, the moment an energy giant asks for 600,000 barrels of crude, brokers and clearing desks leak the trade, causing prices to spike against the buyer. With Agentic Commodities, corporate identities, banking coordinates, and vessel manifests are replaced with ephemeral cryptographic keys (<code className="text-amber-400 bg-slate-950 px-1 py-0.5 rounded">0x7F2...</code> and <code className="text-amber-400 bg-slate-950 px-1 py-0.5 rounded">0x3B8...</code>). Nobody outside the enclave knows who is on either side.
            </p>
          )}

          {activeStage === 'zk-proofs' && (
            <p>
              How do you trust an anonymous counterparty? Through <strong>Zero-Knowledge Proofs</strong>. The buyer submits a <strong>ZK-POF (Proof of Funds)</strong> mathematically proving they have &gt; 105% of the escrow capital without revealing bank statements or treasury balances. The seller submits a <strong>ZK-POP (Proof of Physical Allocation)</strong> mathematically proving they hold title to the physical cargo and accredited SGS assay without revealing upstream supplier contracts or profit margins.
            </p>
          )}

          {activeStage === 'negotiation' && (
            <p>
              Inside the enclave, the sovereign software agents autonomously exchange bids and counter-offers within their delegated price collars (<code className="text-indigo-400 bg-slate-950 px-1 py-0.5 rounded">{commoditySpecs.collar}</code>), delivery schedules, and demurrage limits. The algorithms calculate optimal game-theoretic convergence curves without human emotional delay or manual broker intervention.
            </p>
          )}

          {activeStage === 'escrow-unmask' && (
            <p>
              When both agents reach consensus within their collar bounds, smart contracts simultaneously lock funds into multi-sig escrow and pledge the physical title. <strong>Strictly at this moment of contract execution</strong>, the cryptographic blinders dissolve: the counterparties are unmasked, generating binding legal schedules (ISDA / EFET standard) with verified custodian banking coordinates and bills of lading.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

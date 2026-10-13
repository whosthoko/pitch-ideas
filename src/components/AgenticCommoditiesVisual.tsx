import React, { useState } from 'react';
import { 
  Building2, 
  Cpu, 
  Lock, 
  Unlock, 
  EyeOff, 
  ArrowRight, 
  ArrowLeft,
  Ship,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileText
} from 'lucide-react';

export const AgenticCommoditiesVisual: React.FC = () => {
  const [isUnmasked, setIsUnmasked] = useState<boolean>(false);
  const [commodity, setCommodity] = useState<'LNG' | 'Crude' | 'Copper'>('LNG');

  const commoditySpecs = {
    LNG: {
      name: 'Liquefied Natural Gas (LNG)',
      volume: '3,400,000 MMBtu (65,000 MT)',
      value: '$47.1M USD',
      collar: '$13.60 - $14.10 / MMBtu',
      delivery: 'Gate Terminal Rotterdam (Nov 15-18)',
      buyerName: 'Helios Energy Trading S.A.',
      buyerLocation: 'Geneva, Switzerland',
      sellerName: 'Nordic Cryo Logistics B.V.',
      sellerLocation: 'Rotterdam, Netherlands',
    },
    Crude: {
      name: 'Brent Crude Oil (Light Sweet)',
      volume: '600,000 Barrels (Aframax)',
      value: '$47.6M USD',
      collar: '$78.50 - $80.20 / bbl',
      delivery: 'FOB Sullom Voe Terminal (Nov 20-22)',
      buyerName: 'Aura Petroleum Global',
      buyerLocation: 'London, United Kingdom',
      sellerName: 'Statoil Maritime Refineries',
      sellerLocation: 'Oslo, Norway',
    },
    Copper: {
      name: 'Grade A Refined Copper Cathodes',
      volume: '2,500 Metric Tonnes (LME)',
      value: '$24.4M USD',
      collar: '$9,700 - $9,850 / MT',
      delivery: 'Bonded Warehouse Yangshan (Dec 01-08)',
      buyerName: 'Pacific Metals Manufacturing',
      buyerLocation: 'Tokyo, Japan',
      sellerName: 'Andean Mining Copper Corp',
      sellerLocation: 'Santiago, Chile',
    },
  }[commodity];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Notion-Style Clean Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 pt-2">
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs border border-zinc-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Autonomous Clearing Protocol</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900">
          Agentic Commodities
        </h2>
        <p className="text-zinc-500 text-sm sm:text-base leading-relaxed">
          Autonomous compliance, clearing, and negotiation protocol for private over-the-counter physical trade through sovereign software agents.
        </p>

        {/* Minimalist Commodity Switcher */}
        <div className="pt-2 flex items-center justify-center space-x-1.5 text-xs">
          <span className="text-zinc-400 mr-1">Market:</span>
          {(['LNG', 'Crude', 'Copper'] as const).map((c) => (
            <button
              key={c}
              onClick={() => {
                setCommodity(c);
                setIsUnmasked(false);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                commodity === c
                  ? 'bg-zinc-900 text-white font-medium shadow-xs'
                  : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50'
              }`}
            >
              {c === 'LNG' ? 'LNG Cargo' : c === 'Crude' ? 'Brent Crude' : 'Copper Cathodes'}
            </button>
          ))}
        </div>
      </div>

      {/* Main 3-Column Visual: Buyer <---> The System <---> Seller */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: THE BUYER */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center border border-zinc-200/60">
                  <Building2 className="w-4 h-4 text-zinc-700" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Party A</div>
                  <h3 className="text-sm font-semibold text-zinc-900">The Buyer</h3>
                </div>
              </div>
              <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200/60 px-2 py-0.5 rounded-md font-medium">
                Consumer / Utility
              </span>
            </div>

            {/* Corporate Identity Card */}
            <div className={`p-3 rounded-xl border text-xs transition-all ${
              isUnmasked
                ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                : 'bg-zinc-50 border-zinc-200/70 text-zinc-600'
            }`}>
              <div className="flex items-center justify-between mb-1 text-[11px]">
                <span className="font-medium text-zinc-700 flex items-center space-x-1">
                  {isUnmasked ? (
                    <Unlock className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <EyeOff className="w-3 h-3 text-zinc-400" />
                  )}
                  <span>Corporate Identity</span>
                </span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-medium ${
                  isUnmasked
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-zinc-200/70 text-zinc-600'
                }`}>
                  {isUnmasked ? 'UNMASKED' : 'BLINDED'}
                </span>
              </div>

              {isUnmasked ? (
                <div className="space-y-0.5 text-zinc-800 mt-1.5">
                  <div className="font-semibold text-zinc-900">{commoditySpecs.buyerName}</div>
                  <div className="text-[11px] text-zinc-500">{commoditySpecs.buyerLocation}</div>
                  <div className="text-[10px] text-emerald-700 font-medium">✓ Bank escrow confirmed</div>
                </div>
              ) : (
                <div className="text-zinc-600 mt-1">
                  <div className="font-mono font-medium text-zinc-900">0x7F2e...4C91</div>
                  <div className="text-[11px] text-zinc-500">Identity & banking coordinates veiled</div>
                </div>
              )}
            </div>

            {/* Private Vault */}
            <div className="bg-[#FAFAFA] border border-zinc-200/60 rounded-xl p-3 text-xs space-y-1.5">
              <div className="text-[11px] font-medium text-zinc-500 flex items-center space-x-1">
                <Lock className="w-3 h-3 text-zinc-400" />
                <span>Permanently Shielded</span>
              </div>
              <ul className="text-[11px] text-zinc-600 space-y-1 pl-1">
                <li className="flex items-center space-x-1.5">
                  <span className="w-1 h-1 rounded-full bg-zinc-400" />
                  <span>Bank account records & SWIFT coords</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1 h-1 rounded-full bg-zinc-400" />
                  <span>Commercial balance sheet & credit lines</span>
                </li>
              </ul>
            </div>

            {/* Delegated Sovereign Agent */}
            <div className="bg-zinc-50/70 border border-zinc-200 rounded-xl p-3 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-medium text-zinc-900 flex items-center space-x-1.5">
                  <Cpu className="w-3.5 h-3.5 text-zinc-600" />
                  <span>Sovereign Buyer Agent</span>
                </span>
                <span className="text-[10px] text-zinc-500 bg-white border border-zinc-200 px-1.5 py-0.2 rounded">
                  Autonomous
                </span>
              </div>
              <div className="text-[11px] text-zinc-600 space-y-0.5 pt-0.5">
                <div>• Needed: <span className="font-medium text-zinc-900">{commoditySpecs.volume}</span></div>
                <div>• Price Collar: <span className="font-medium text-zinc-900">Max {commoditySpecs.collar.split('-')[1]?.trim()}</span></div>
                <div>• Proof: <span className="font-mono text-zinc-800 bg-zinc-200/60 px-1 rounded">ZK-POF (Capital Capacity)</span></div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-100 text-center text-[11px] text-zinc-400 flex items-center justify-center space-x-1">
            <span>Delegates to Enclave</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CENTER COLUMN: THE SYSTEM (Encrypted Sandbox Protocol) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-zinc-300 shadow-sm flex flex-col justify-between relative">
          <div>
            {/* System Title */}
            <div className="text-center pb-3 border-b border-zinc-100 mb-3.5">
              <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 text-[11px] font-medium mb-1">
                <Cpu className="w-3 h-3 text-zinc-600" />
                <span>Encrypted Execution Sandbox</span>
              </div>
              <h3 className="text-base font-semibold text-zinc-900">
                The Clearing Protocol
              </h3>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Hardware-isolated enclave handling 5 automated operations:
              </p>
            </div>

            {/* The 5 Automated Operations */}
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl border border-zinc-200/70 bg-[#FAFAFA] flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-md bg-zinc-200/60 text-zinc-700 font-mono text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <div className="font-medium text-zinc-900 text-xs">Blinded Identities</div>
                  <div className="text-[11px] text-zinc-500">Corporate identities veiled during discovery & bidding.</div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl border border-zinc-200/70 bg-[#FAFAFA] flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-md bg-zinc-200/60 text-zinc-700 font-mono text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <div className="font-medium text-zinc-900 text-xs">Zero-Knowledge Verifier</div>
                  <div className="text-[11px] text-zinc-500">Verifies capital (POF) & cargo (POP) with 0% data leakage.</div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl border border-zinc-200/70 bg-[#FAFAFA] flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-md bg-zinc-200/60 text-zinc-700 font-mono text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <div className="font-medium text-zinc-900 text-xs">Autonomous Negotiation</div>
                  <div className="text-[11px] text-zinc-500">Software agents negotiate price collars & delivery dates.</div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl border border-zinc-200/70 bg-[#FAFAFA] flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-md bg-zinc-200/60 text-zinc-700 font-mono text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <div className="font-medium text-zinc-900 text-xs">Programmatic Escrow</div>
                  <div className="text-[11px] text-zinc-500">Multi-sig contract holds funds and cargo title simultaneously.</div>
                </div>
              </div>

              <div className={`p-2.5 rounded-xl border transition-all flex items-start space-x-2.5 ${
                isUnmasked
                  ? 'bg-emerald-50/70 border-emerald-300'
                  : 'bg-[#FAFAFA] border-zinc-200/70'
              }`}>
                <span className={`w-5 h-5 rounded-md font-mono text-[11px] flex items-center justify-center shrink-0 mt-0.5 ${
                  isUnmasked ? 'bg-emerald-200 text-emerald-900 font-bold' : 'bg-zinc-200/60 text-zinc-700'
                }`}>
                  5
                </span>
                <div>
                  <div className="font-medium text-zinc-900 text-xs">Strict Execution Unmasking</div>
                  <div className="text-[11px] text-zinc-500">Blinders unmask <strong className="text-zinc-800">strictly at the point of contract lock</strong>.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Trigger Button */}
          <div className="pt-3 border-t border-zinc-100 flex items-center justify-between mt-3">
            <span className="text-[11px] text-zinc-500">
              Value: <strong className="text-zinc-800">{commoditySpecs.value}</strong>
            </span>
            <button
              onClick={() => setIsUnmasked(!isUnmasked)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-xs ${
                isUnmasked
                  ? 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border border-zinc-200'
                  : 'bg-zinc-900 text-white hover:bg-zinc-800'
              }`}
            >
              {isUnmasked ? 'Re-Shield Blinders' : 'Simulate Escrow Unmasking'}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: THE SELLER */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center border border-zinc-200/60">
                  <Ship className="w-4 h-4 text-zinc-700" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Party B</div>
                  <h3 className="text-sm font-semibold text-zinc-900">The Seller</h3>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2 py-0.5 rounded-md font-medium">
                Producer / Terminal
              </span>
            </div>

            {/* Corporate Identity Card */}
            <div className={`p-3 rounded-xl border text-xs transition-all ${
              isUnmasked
                ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                : 'bg-zinc-50 border-zinc-200/70 text-zinc-600'
            }`}>
              <div className="flex items-center justify-between mb-1 text-[11px]">
                <span className="font-medium text-zinc-700 flex items-center space-x-1">
                  {isUnmasked ? (
                    <Unlock className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <EyeOff className="w-3 h-3 text-zinc-400" />
                  )}
                  <span>Identity State</span>
                </span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-medium ${
                  isUnmasked
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-zinc-200/70 text-zinc-600'
                }`}>
                  {isUnmasked ? 'UNMASKED' : 'BLINDED'}
                </span>
              </div>

              {isUnmasked ? (
                <div className="space-y-0.5 text-zinc-800 mt-1.5">
                  <div className="font-semibold text-zinc-900">{commoditySpecs.sellerName}</div>
                  <div className="text-[11px] text-zinc-500">{commoditySpecs.sellerLocation}</div>
                  <div className="text-[10px] text-emerald-700 font-medium">✓ SGS assay certificate verified</div>
                </div>
              ) : (
                <div className="text-zinc-600 mt-1">
                  <div className="font-mono font-medium text-zinc-900">0x3B8a...1F04</div>
                  <div className="text-[11px] text-zinc-500">Supplier contract & vessel manifests veiled</div>
                </div>
              )}
            </div>

            {/* Private Vault */}
            <div className="bg-[#FAFAFA] border border-zinc-200/60 rounded-xl p-3 text-xs space-y-1.5">
              <div className="text-[11px] font-medium text-zinc-500 flex items-center space-x-1">
                <Lock className="w-3 h-3 text-zinc-400" />
                <span>Permanently Shielded</span>
              </div>
              <ul className="text-[11px] text-zinc-600 space-y-1 pl-1">
                <li className="flex items-center space-x-1.5">
                  <span className="w-1 h-1 rounded-full bg-zinc-400" />
                  <span>Upstream supplier & offtake contracts</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1 h-1 rounded-full bg-zinc-400" />
                  <span>Cost basis margins & vessel manifests</span>
                </li>
              </ul>
            </div>

            {/* Delegated Sovereign Agent */}
            <div className="bg-zinc-50/70 border border-zinc-200 rounded-xl p-3 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-medium text-zinc-900 flex items-center space-x-1.5">
                  <Cpu className="w-3.5 h-3.5 text-zinc-600" />
                  <span>Sovereign Seller Agent</span>
                </span>
                <span className="text-[10px] text-zinc-500 bg-white border border-zinc-200 px-1.5 py-0.2 rounded">
                  Autonomous
                </span>
              </div>
              <div className="text-[11px] text-zinc-600 space-y-0.5 pt-0.5">
                <div>• Allocated: <span className="font-medium text-zinc-900">{commoditySpecs.volume}</span></div>
                <div>• Price Collar: <span className="font-medium text-zinc-900">Min {commoditySpecs.collar.split('-')[0]?.trim()}</span></div>
                <div>• Proof: <span className="font-mono text-zinc-800 bg-zinc-200/60 px-1 rounded">ZK-POP (Physical Title)</span></div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-100 text-center text-[11px] text-zinc-400 flex items-center justify-center space-x-1">
            <ArrowLeft className="w-3 h-3" />
            <span>Delegates to Enclave</span>
          </div>
        </div>
      </div>

      {/* 3 Simple Consolidated Insight Cards (Notion-Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-xs space-y-1.5">
          <div className="text-xs font-semibold text-zinc-900 flex items-center space-x-1.5">
            <EyeOff className="w-3.5 h-3.5 text-zinc-500" />
            <span>1. Zero Identity Disclosure</span>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Corporate identities, banking coordinates, and vessel manifests remain permanently shielded throughout discovery and negotiation, preventing market front-running.
          </p>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-xs space-y-1.5">
          <div className="text-xs font-semibold text-zinc-900 flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
            <span>2. Zero-Knowledge Proofs</span>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            ZK-POF mathematically verifies buyer capital capacity, while ZK-POP verifies seller physical allocations without exposing bank records, supplier contracts, or balance sheets.
          </p>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-xs space-y-1.5">
          <div className="text-xs font-semibold text-zinc-900 flex items-center space-x-1.5">
            <Lock className="w-3.5 h-3.5 text-zinc-500" />
            <span>3. Escrow & Strict Unmasking</span>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            When software agents reach consensus on deal terms, binding legal terms lock into programmatic escrow, unmasking corporate entities strictly at execution.
          </p>
        </div>
      </div>
    </div>
  );
};

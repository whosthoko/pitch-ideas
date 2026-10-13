import React, { useState } from 'react';
import { 
  Building2, 
  Cpu, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  EyeOff, 
  Scale, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Info,
  Ship,
  CheckCircle2,
  FileText
} from 'lucide-react';

export const AgenticCommoditiesVisual: React.FC = () => {
  const [activeStage, setActiveStage] = useState<'overview' | 'identities' | 'zk-proofs' | 'negotiation' | 'escrow-unmask'>('overview');
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
      delivery: 'FOB Sullom Voe (Nov 20-22)',
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
      {/* Intro Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 pt-2">
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs border border-zinc-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>System Visual Architecture</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
          How Agentic Commodities Works
        </h2>
        <p className="text-zinc-500 text-sm leading-relaxed">
          A sovereign buyer and seller interact through an encrypted execution sandbox. Corporate identities and bank records remain shielded, unmasking strictly at contract execution.
        </p>

        {/* Minimalist Commodity Selector */}
        <div className="pt-2 flex items-center justify-center space-x-1 text-xs">
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

      {/* Notion-Style Stage Pill Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
        <button
          onClick={() => { setActiveStage('overview'); setIsUnmasked(false); }}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            activeStage === 'overview'
              ? 'bg-zinc-900 text-white font-medium'
              : 'bg-zinc-100/80 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60'
          }`}
        >
          1. Full Overview
        </button>

        <button
          onClick={() => { setActiveStage('identities'); setIsUnmasked(false); }}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            activeStage === 'identities'
              ? 'bg-zinc-900 text-white font-medium'
              : 'bg-zinc-100/80 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60'
          }`}
        >
          2. Shielded Identities
        </button>

        <button
          onClick={() => { setActiveStage('zk-proofs'); setIsUnmasked(false); }}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            activeStage === 'zk-proofs'
              ? 'bg-zinc-900 text-white font-medium'
              : 'bg-zinc-100/80 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60'
          }`}
        >
          3. ZK Proofs (POF & POP)
        </button>

        <button
          onClick={() => { setActiveStage('negotiation'); setIsUnmasked(false); }}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            activeStage === 'negotiation'
              ? 'bg-zinc-900 text-white font-medium'
              : 'bg-zinc-100/80 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60'
          }`}
        >
          4. Autonomous Negotiation
        </button>

        <button
          onClick={() => { setActiveStage('escrow-unmask'); setIsUnmasked(true); }}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            activeStage === 'escrow-unmask'
              ? 'bg-emerald-600 text-white font-medium shadow-xs'
              : 'bg-emerald-50 text-emerald-800 border border-emerald-200/60 hover:bg-emerald-100/60'
          }`}
        >
          5. Escrow & Unmasking
        </button>
      </div>

      {/* 3-Column Minimalist Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* ========================================================================= */}
        {/* LEFT: THE BUYER */}
        {/* ========================================================================= */}
        <div className={`lg:col-span-4 bg-white rounded-2xl p-5 border transition-all flex flex-col justify-between shadow-xs ${
          activeStage === 'identities' || activeStage === 'zk-proofs' || activeStage === 'negotiation'
            ? 'border-blue-300 ring-2 ring-blue-50'
            : 'border-zinc-200/80'
        }`}>
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

            {/* Corporate Identity Shield */}
            <div className={`p-3 rounded-xl border text-xs transition-all ${
              isUnmasked || activeStage === 'escrow-unmask'
                ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                : 'bg-zinc-50 border-zinc-200/70 text-zinc-600'
            }`}>
              <div className="flex items-center justify-between mb-1 text-[11px]">
                <span className="font-medium text-zinc-700 flex items-center space-x-1">
                  {isUnmasked || activeStage === 'escrow-unmask' ? (
                    <Unlock className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <EyeOff className="w-3 h-3 text-zinc-400" />
                  )}
                  <span>Identity State</span>
                </span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  isUnmasked || activeStage === 'escrow-unmask'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-zinc-200/60 text-zinc-600'
                }`}>
                  {isUnmasked || activeStage === 'escrow-unmask' ? 'UNMASKED' : 'BLINDED'}
                </span>
              </div>

              {isUnmasked || activeStage === 'escrow-unmask' ? (
                <div className="space-y-0.5 text-zinc-800 mt-1.5">
                  <div className="font-semibold text-zinc-900">{commoditySpecs.buyerName}</div>
                  <div className="text-[11px] text-zinc-500">{commoditySpecs.buyerLocation}</div>
                  <div className="text-[10px] text-emerald-700">✓ Bank escrow verified</div>
                </div>
              ) : (
                <div className="text-zinc-600 mt-1">
                  <div className="font-mono font-medium text-zinc-900">0x7F2e...4C91</div>
                  <div className="text-[11px] text-zinc-500">Corporate identity & bank coords shielded</div>
                </div>
              )}
            </div>

            {/* What Buyer Keeps Private */}
            <div className="bg-[#FAFAFA] border border-zinc-200/60 rounded-xl p-3 text-xs space-y-1.5">
              <div className="text-[11px] font-medium text-zinc-500 flex items-center space-x-1">
                <Lock className="w-3 h-3 text-zinc-400" />
                <span>Permanently Shielded</span>
              </div>
              <ul className="text-[11px] text-zinc-600 space-y-1 pl-1">
                <li className="flex items-center space-x-1.5">
                  <span className="w-1 h-1 rounded-full bg-zinc-400" />
                  <span>Bank accounts & credit facility limits</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1 h-1 rounded-full bg-zinc-400" />
                  <span>Internal treasury balance sheets</span>
                </li>
              </ul>
            </div>

            {/* Sovereign Software Agent */}
            <div className="bg-zinc-50/60 border border-zinc-200 rounded-xl p-3 text-xs space-y-1.5">
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
                <div>• Volume: <span className="font-medium text-zinc-900">{commoditySpecs.volume}</span></div>
                <div>• Price Ceiling: <span className="font-medium text-zinc-900">{commoditySpecs.collar.split('-')[1]?.trim()}</span></div>
                <div>• Passes: <span className="font-mono text-zinc-800 bg-zinc-200/50 px-1 rounded">ZK-POF (Proof of Funds)</span></div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-100 text-center text-[11px] text-zinc-400 flex items-center justify-center space-x-1">
            <span>Delegates to Enclave</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CENTER: THE AGENTIC COMMODITIES SYSTEM */}
        {/* ========================================================================= */}
        <div className={`lg:col-span-4 bg-white rounded-2xl p-5 border transition-all flex flex-col justify-between shadow-sm relative ${
          activeStage === 'overview'
            ? 'border-zinc-300 ring-2 ring-zinc-100'
            : 'border-zinc-200'
        }`}>
          <div>
            {/* Header */}
            <div className="text-center pb-3 border-b border-zinc-100 mb-4">
              <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 text-[11px] font-medium mb-1">
                <Cpu className="w-3 h-3 text-zinc-600" />
                <span>Encrypted Execution Sandbox</span>
              </div>
              <h3 className="text-base font-semibold text-zinc-900">
                Agentic Commodities Protocol
              </h3>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Hardware-isolated enclave handling 5 automated operations:
              </p>
            </div>

            {/* The 5 Automated Operations */}
            <div className="space-y-2.5 text-xs">
              {/* 1. Blinded Identities */}
              <div className={`p-2.5 rounded-xl border transition-all ${
                activeStage === 'identities'
                  ? 'bg-zinc-50 border-zinc-400 font-medium'
                  : 'bg-white border-zinc-200/70'
              }`}>
                <div className="flex items-start space-x-2.5">
                  <div className="w-6 h-6 rounded-md bg-zinc-100 flex items-center justify-center shrink-0 mt-0.5 text-zinc-700 font-mono text-[11px]">
                    1
                  </div>
                  <div>
                    <div className="text-xs font-medium text-zinc-900">Blinded Identities</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">
                      Veils corporate entities and coordinates during discovery and negotiation.
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. ZK Verifier */}
              <div className={`p-2.5 rounded-xl border transition-all ${
                activeStage === 'zk-proofs'
                  ? 'bg-zinc-50 border-zinc-400 font-medium'
                  : 'bg-white border-zinc-200/70'
              }`}>
                <div className="flex items-start space-x-2.5">
                  <div className="w-6 h-6 rounded-md bg-zinc-100 flex items-center justify-center shrink-0 mt-0.5 text-zinc-700 font-mono text-[11px]">
                    2
                  </div>
                  <div>
                    <div className="text-xs font-medium text-zinc-900">Zero-Knowledge Verifier</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">
                      Verifies capital capacity (POF) & physical cargo (POP) with 0% data exposure.
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Autonomous Negotiation */}
              <div className={`p-2.5 rounded-xl border transition-all ${
                activeStage === 'negotiation'
                  ? 'bg-zinc-50 border-zinc-400 font-medium'
                  : 'bg-white border-zinc-200/70'
              }`}>
                <div className="flex items-start space-x-2.5">
                  <div className="w-6 h-6 rounded-md bg-zinc-100 flex items-center justify-center shrink-0 mt-0.5 text-zinc-700 font-mono text-[11px]">
                    3
                  </div>
                  <div>
                    <div className="text-xs font-medium text-zinc-900">Collar & Term Negotiation</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">
                      Agents negotiate price collars ({commoditySpecs.collar}) & laycan schedules autonomously.
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 & 5. Escrow & Unmasking */}
              <div className={`p-2.5 rounded-xl border transition-all ${
                activeStage === 'escrow-unmask' || isUnmasked
                  ? 'bg-emerald-50/60 border-emerald-300 font-medium'
                  : 'bg-white border-zinc-200/70'
              }`}>
                <div className="flex items-start space-x-2.5">
                  <div className="w-6 h-6 rounded-md bg-zinc-100 flex items-center justify-center shrink-0 mt-0.5 text-zinc-700 font-mono text-[11px]">
                    4-5
                  </div>
                  <div>
                    <div className="text-xs font-medium text-zinc-900">Escrow Lock & Strict Unmasking</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">
                      Programmatic escrow locks funds & title. Blinders drop <strong className="text-zinc-800">strictly at execution</strong>.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Minimalist Action Button */}
          <div className="pt-3 border-t border-zinc-100 flex items-center justify-between mt-4">
            <span className="text-[11px] text-zinc-500">
              Value: <strong className="text-zinc-800">{commoditySpecs.value}</strong>
            </span>
            <button
              onClick={() => {
                setIsUnmasked(!isUnmasked);
                if (!isUnmasked) setActiveStage('escrow-unmask');
                else setActiveStage('overview');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isUnmasked || activeStage === 'escrow-unmask'
                  ? 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                  : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-xs'
              }`}
            >
              {isUnmasked || activeStage === 'escrow-unmask' ? 'Re-Shield Blinders' : 'Simulate Unmasking'}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT: THE SELLER */}
        {/* ========================================================================= */}
        <div className={`lg:col-span-4 bg-white rounded-2xl p-5 border transition-all flex flex-col justify-between shadow-xs ${
          activeStage === 'identities' || activeStage === 'zk-proofs' || activeStage === 'negotiation'
            ? 'border-emerald-300 ring-2 ring-emerald-50'
            : 'border-zinc-200/80'
        }`}>
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

            {/* Corporate Identity Shield */}
            <div className={`p-3 rounded-xl border text-xs transition-all ${
              isUnmasked || activeStage === 'escrow-unmask'
                ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                : 'bg-zinc-50 border-zinc-200/70 text-zinc-600'
            }`}>
              <div className="flex items-center justify-between mb-1 text-[11px]">
                <span className="font-medium text-zinc-700 flex items-center space-x-1">
                  {isUnmasked || activeStage === 'escrow-unmask' ? (
                    <Unlock className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <EyeOff className="w-3 h-3 text-zinc-400" />
                  )}
                  <span>Identity State</span>
                </span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  isUnmasked || activeStage === 'escrow-unmask'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-zinc-200/60 text-zinc-600'
                }`}>
                  {isUnmasked || activeStage === 'escrow-unmask' ? 'UNMASKED' : 'BLINDED'}
                </span>
              </div>

              {isUnmasked || activeStage === 'escrow-unmask' ? (
                <div className="space-y-0.5 text-zinc-800 mt-1.5">
                  <div className="font-semibold text-zinc-900">{commoditySpecs.sellerName}</div>
                  <div className="text-[11px] text-zinc-500">{commoditySpecs.sellerLocation}</div>
                  <div className="text-[10px] text-emerald-700">✓ SGS quality assay verified</div>
                </div>
              ) : (
                <div className="text-zinc-600 mt-1">
                  <div className="font-mono font-medium text-zinc-900">0x3B8a...1F04</div>
                  <div className="text-[11px] text-zinc-500">Supplier contract & vessel manifests veiled</div>
                </div>
              )}
            </div>

            {/* What Seller Keeps Private */}
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
                  <span>Cost basis margins & vessel tracking</span>
                </li>
              </ul>
            </div>

            {/* Sovereign Software Agent */}
            <div className="bg-zinc-50/60 border border-zinc-200 rounded-xl p-3 text-xs space-y-1.5">
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
                <div>• Price Floor: <span className="font-medium text-zinc-900">{commoditySpecs.collar.split('-')[0]?.trim()}</span></div>
                <div>• Passes: <span className="font-mono text-zinc-800 bg-zinc-200/50 px-1 rounded">ZK-POP (Physical Title)</span></div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-100 text-center text-[11px] text-zinc-400 flex items-center justify-center space-x-1">
            <ArrowLeft className="w-3 h-3" />
            <span>Delegates to Enclave</span>
          </div>
        </div>
      </div>

      {/* Notion-Style Clean Detail Callout */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 sm:p-6 text-xs sm:text-sm text-zinc-600 shadow-xs space-y-2">
        <div className="flex items-center space-x-2 text-zinc-900 font-medium">
          <Info className="w-4 h-4 text-zinc-500" />
          <span>
            {activeStage === 'overview' && 'Protocol Mechanics'}
            {activeStage === 'identities' && 'Zero Identity Disclosure Principle'}
            {activeStage === 'zk-proofs' && 'Mathematical Verification without Data Leakage'}
            {activeStage === 'negotiation' && 'Autonomous Algorithmic Bidding'}
            {activeStage === 'escrow-unmask' && 'Point-of-Execution Escrow & Legal Unmasking'}
          </span>
        </div>

        <p className="leading-relaxed text-zinc-500 pl-6">
          {activeStage === 'overview' &&
            'The buyer and seller deploy sovereign agents into the central enclave. The protocol verifies financial solvency and physical cargo allocations without exposing balance sheets or contracts, allowing agents to negotiate price collars and lock into escrow before unmasking.'}
          {activeStage === 'identities' &&
            'Traditional commodity desks suffer from front-running whenever large volumes enter the market. Blinded cryptographic identities ensure neither human brokers nor algorithms know who is trading until final execution.'}
          {activeStage === 'zk-proofs' &&
            'Zero-knowledge proofs (zk-SNARKs) mathematically prove that the buyer has sufficient capital capacity (POF) and the seller holds legal title to the cargo (POP) with 100% mathematical certainty and zero data leakage.'}
          {activeStage === 'negotiation' &&
            'Software agents autonomously exchange offers within mandated price collars and delivery schedules, converging on fair settlement without human emotional friction or market signaling.'}
          {activeStage === 'escrow-unmask' &&
            'When consensus is reached, funds lock into multi-sig escrow and physical cargo title is sealed. Blinders fall away strictly at this moment, producing binding legal contracts with verified counterparties.'}
        </p>
      </div>
    </div>
  );
};

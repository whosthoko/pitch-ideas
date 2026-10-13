import React, { useState } from 'react';
import { 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Sliders, 
  Code, 
  FileCheck, 
  Copy, 
  Check, 
  Scale, 
  AlertCircle,
  Zap
} from 'lucide-react';
import { COMMODITIES } from '../data/mockData';

export const AgentMandateBuilder: React.FC = () => {
  const [agentRole, setAgentRole] = useState<'BUYER' | 'SELLER'>('BUYER');
  const [selectedCommodityId, setSelectedCommodityId] = useState<string>(COMMODITIES[0].id);
  const [strategyType, setStrategyType] = useState<'NASH_CONCESSION' | 'AGGRESSIVE_COLLAR' | 'TIT_FOR_TAT'>('NASH_CONCESSION');
  const [maxSlippagePct, setMaxSlippagePct] = useState<number>(3.5);
  const [marginBufferPct, setMarginBufferPct] = useState<number>(105);
  const [jurisdiction, setJurisdiction] = useState<string>('Geneva (Swiss Chambers Arbitration)');
  const [copied, setCopied] = useState<boolean>(false);

  const selectedCommodity = COMMODITIES.find((c) => c.id === selectedCommodityId) || COMMODITIES[0];

  const generatedPolicy = {
    mandateVersion: '2.4.0-SOVEREIGN-TEE',
    enclaveAttestation: {
      type: 'NITRO_ENCLAVE_SNP',
      measurementHash: '0x39a1b89ef488d011ca848201a09d3b44781ec983',
      signingKeyBlinded: '0x7F2e09B8a1139487c2b4e',
    },
    agentRole,
    commodity: {
      id: selectedCommodity.id,
      name: selectedCommodity.name,
      standardUnit: selectedCommodity.standardUnit,
      benchmarkUSD: selectedCommodity.benchmarkPrice,
    },
    algorithmicBounds: {
      strategy: strategyType,
      targetPriceUSD: selectedCommodity.benchmarkPrice,
      collarBound:
        agentRole === 'BUYER'
          ? { ceilingUSD: Number((selectedCommodity.benchmarkPrice * (1 + maxSlippagePct / 100)).toFixed(2)) }
          : { floorUSD: Number((selectedCommodity.benchmarkPrice * (1 - maxSlippagePct / 100)).toFixed(2)) },
      maxRoundsBeforeTimeout: 8,
      concessionCurveAlpha: 0.72,
    },
    cryptographicClearing: {
      zkProofRequired: agentRole === 'BUYER' ? 'ZK-POP-PhysicalAllocation' : 'ZK-POF-CapitalCapacity',
      escrowMarginBuffer: `${marginBufferPct}%`,
      disputeJurisdiction: jurisdiction,
      unmaskingCondition: 'SIMULTANEOUS_ESCROW_DUAL_KEY_LOCK',
    },
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(generatedPolicy, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>Sovereign Agent Mandate Builder</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Configure Your Autonomous Physical Trading Agent
          </h2>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            Specify price collar tolerance, game-theoretic negotiation concessions, and cryptographic clearing rules. Once signed, this policy compiles into an encrypted bytecode payload verified inside a confidential enclave.
          </p>
        </div>
      </div>

      {/* Grid: Editor & Live Generated Policy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Controls (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-5 text-xs">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2 pb-3 border-b border-slate-800">
              <Sliders className="w-4 h-4 text-pink-400" />
              <span>Mandate Configuration Parameters</span>
            </h3>

            {/* Agent Role */}
            <div>
              <label className="text-slate-400 block mb-2 font-medium">Agent Mandate Role</label>
              <div className="grid grid-cols-2 gap-3 font-mono">
                <button
                  type="button"
                  onClick={() => setAgentRole('BUYER')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    agentRole === 'BUYER'
                      ? 'bg-blue-950/60 border-blue-500/60 text-blue-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  BUYER AGENT (POF Capital)
                </button>
                <button
                  type="button"
                  onClick={() => setAgentRole('SELLER')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    agentRole === 'SELLER'
                      ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  SELLER AGENT (POP Cargo)
                </button>
              </div>
            </div>

            {/* Commodity Target */}
            <div>
              <label className="text-slate-400 block mb-1.5 font-medium">Physical Cargo Market</label>
              <select
                value={selectedCommodityId}
                onChange={(e) => setSelectedCommodityId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-pink-500"
              >
                {COMMODITIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.ticker}) — Benchmark ${c.benchmarkPrice} /{c.standardUnit}
                  </option>
                ))}
              </select>
            </div>

            {/* Strategy Selection */}
            <div>
              <label className="text-slate-400 block mb-1.5 font-medium">Bargaining Strategy Algorithm</label>
              <div className="space-y-2">
                {[
                  {
                    id: 'NASH_CONCESSION',
                    title: 'Nash Equilibrium Concession Curve (Recommended)',
                    desc: 'Autonomously converges towards fair market mid-point with mathematical Pareto optimality.',
                  },
                  {
                    id: 'AGGRESSIVE_COLLAR',
                    title: 'Hard Collar Defense (Walk Away on Threshold)',
                    desc: 'Zero concession beyond fixed limit. Aborts if counterparty does not yield.',
                  },
                  {
                    id: 'TIT_FOR_TAT',
                    title: 'Bilateral Tit-for-Tat Step Adaptation',
                    desc: 'Mirrors the concession step size of the counterparty agent in each negotiation round.',
                  },
                ].map((strat) => (
                  <div
                    key={strat.id}
                    onClick={() => setStrategyType(strat.id as any)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      strategyType === strat.id
                        ? 'bg-pink-950/30 border-pink-500/50 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-white">{strat.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{strat.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Max Slippage Collar */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-400 font-medium">Maximum Collar Slippage Tolerance</span>
                <span className="font-mono text-pink-400 font-bold">{maxSlippagePct}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="8.0"
                step="0.5"
                value={maxSlippagePct}
                onChange={(e) => setMaxSlippagePct(Number(e.target.value))}
                className="w-full accent-pink-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Escrow Margin Buffer */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-400 font-medium">Programmatic Escrow Margin Buffer</span>
                <span className="font-mono text-emerald-400 font-bold">{marginBufferPct}%</span>
              </div>
              <input
                type="range"
                min="100"
                max="115"
                step="1"
                value={marginBufferPct}
                onChange={(e) => setMarginBufferPct(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Legal Arbitration */}
            <div>
              <label className="text-slate-400 block mb-1.5 font-medium">Binding Legal Arbitration Fallback</label>
              <select
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-pink-500"
              >
                <option value="Geneva (Swiss Chambers Arbitration)">Geneva (Swiss Chambers' Arbitration Institution)</option>
                <option value="London (LCIA Physical Commodities)">London (LCIA Physical Commodity Arbitration)</option>
                <option value="Singapore (SIAC Physical Oil & Gas)">Singapore (SIAC Physical Energy Rules)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Compiled Policy JSON & Enclave Seal (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Code className="w-4 h-4 text-emerald-400" />
                  <span>Compiled Enclave Sovereign Policy</span>
                </h3>

                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy JSON</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-[460px] leading-relaxed">
                {JSON.stringify(generatedPolicy, null, 2)}
              </pre>
            </div>

            <div className="pt-4 border-t border-slate-800 mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Signed with Local KMS • Hardware TEE Enclave Ready</span>
              </div>
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center space-x-1.5"
              >
                <Zap className="w-4 h-4" />
                <span>Deploy to Enclave</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

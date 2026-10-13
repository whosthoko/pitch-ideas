import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  Eye, 
  Cpu, 
  Terminal, 
  CheckCircle2, 
  FileCode2, 
  Coins, 
  Ship, 
  Layers, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { MOCK_ZK_PROOFS } from '../data/mockData';

export const ZkProofStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'POF' | 'POP'>('POF');
  const [isProving, setIsProving] = useState<boolean>(false);
  const [proofVerified, setProofVerified] = useState<boolean>(true);
  
  // Interactive POF inputs
  const [targetEscrowUSD, setTargetEscrowUSD] = useState<number>(47090000);
  const [actualSecretBalanceUSD, setActualSecretBalanceUSD] = useState<number>(142850000);
  const [selectedBank, setSelectedBank] = useState<string>('UBS Switzerland AG');

  // Interactive POP inputs
  const [targetVolumeUnits, setTargetVolumeUnits] = useState<number>(3400000);
  const [actualAllocatedUnits, setActualAllocatedUnits] = useState<number>(3400000);
  const [secretSupplier, setSecretSupplier] = useState<string>('Qatargas LNG Long-Term Off-Take #2019');
  const [secretCostBasis, setSecretCostBasis] = useState<number>(8.40);

  const [simulatedProofTime, setSimulatedProofTime] = useState<number>(18.4);
  const [generatedHash, setGeneratedHash] = useState<string>('0x8fba3d201149e917d2bb91f2cc095a4387879e6027aeb8c399b801a2399cb174');

  const handleGenerateProof = () => {
    setIsProving(true);
    setProofVerified(false);

    setTimeout(() => {
      setIsProving(false);
      setProofVerified(true);
      const randomTime = Number((16 + Math.random() * 8).toFixed(1));
      setSimulatedProofTime(randomTime);
      const newHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setGeneratedHash(newHash);
    }, 1200);
  };

  const isBalanceSufficient = actualSecretBalanceUSD >= targetEscrowUSD;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero-Knowledge Proof Verification Studio</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Cryptographic Capital (POF) & Physical Title (POP) Proofs
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
              In traditional OTC physical commodity trading, counterparties must constantly expose their banking coordinates, 
              balance sheets, and supplier source contracts to brokers and credit rating desks. Agentic Commodities replaces 
              disclosure with <strong>Zero-Knowledge SNARKs</strong>: proving you have the capital and the cargo without disclosing a single line of balance or source pricing.
            </p>
          </div>

          {/* Circuit Tabs */}
          <div className="flex bg-slate-950 border border-slate-800 rounded-xl p-1 text-xs font-mono self-start lg:self-auto">
            <button
              onClick={() => {
                setActiveTab('POF');
                setGeneratedHash('0x8fba3d201149e917d2bb91f2cc095a4387879e6027aeb8c399b801a2399cb174');
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'POF'
                  ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Coins className="w-4 h-4 text-emerald-400" />
              <span>ZK-POF (Proof of Funds)</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('POP');
                setGeneratedHash('0x418a09ee1b8d96b994d80a13ef0177bb3201460d19dca12b5049a8fe1009cd3a');
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'POP'
                  ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Ship className="w-4 h-4 text-cyan-400" />
              <span>ZK-POP (Physical Allocation)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Input / Witness Parameters (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>
                  {activeTab === 'POF' ? 'Buyer Capital Circuit Parameters' : 'Seller Physical Circuit Parameters'}
                </span>
              </h3>
              <span className="text-[10px] font-mono bg-cyan-950/60 text-cyan-400 border border-cyan-800/40 px-2 py-0.5 rounded">
                Witness Generator
              </span>
            </div>

            {activeTab === 'POF' ? (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1.5 flex items-center justify-between">
                    <span>Public Escrow Requirement (Threshold USD)</span>
                    <span className="text-emerald-400 font-mono font-bold">
                      ${targetEscrowUSD.toLocaleString()}
                    </span>
                  </label>
                  <input
                    type="range"
                    min="10000000"
                    max="100000000"
                    step="5000000"
                    value={targetEscrowUSD}
                    onChange={(e) => setTargetEscrowUSD(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                    <span>$10M</span>
                    <span>$50M</span>
                    <span>$100M</span>
                  </div>
                </div>

                <div className="bg-amber-950/20 border border-amber-900/40 rounded-xl p-3.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400 font-bold flex items-center space-x-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Private Shielded Witness (NEVER REVEALED)</span>
                    </span>
                    <span className="text-[10px] font-mono text-amber-300">Confidential</span>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">True Available Liquid Capital (Bank Balance)</label>
                    <input
                      type="number"
                      value={actualSecretBalanceUSD}
                      onChange={(e) => setActualSecretBalanceUSD(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-amber-500"
                    />
                    <div className="text-[10px] text-slate-400 mt-1">
                      {isBalanceSufficient ? (
                        <span className="text-emerald-400">✓ Balance exceeds requirement by ${(actualSecretBalanceUSD - targetEscrowUSD).toLocaleString()}</span>
                      ) : (
                        <span className="text-rose-400">✗ Balance below requirement - Proof will fail!</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Custodian Bank (Secret)</label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-500"
                    >
                      <option value="UBS Switzerland AG">UBS Switzerland AG (Zurich)</option>
                      <option value="JPMorgan Chase NA">JPMorgan Chase N.A. (Commodity Desk NY)</option>
                      <option value="BNP Paribas">BNP Paribas (Geneva Commodities Branch)</option>
                      <option value="Standard Chartered">Standard Chartered Bank (Singapore)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleGenerateProof}
                  disabled={isProving}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
                >
                  {isProving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Synthesizing Groth16 zk-SNARK...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Compute & Verify ZK-POF Proof</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1.5 flex items-center justify-between">
                    <span>Public Allocation Requirement (Physical Volume)</span>
                    <span className="text-cyan-400 font-mono font-bold">
                      {targetVolumeUnits.toLocaleString()} MMBtu
                    </span>
                  </label>
                  <input
                    type="range"
                    min="1000000"
                    max="6000000"
                    step="200000"
                    value={targetVolumeUnits}
                    onChange={(e) => setTargetVolumeUnits(Number(e.target.value))}
                    className="w-full accent-cyan-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                    <span>1,000,000</span>
                    <span>3,400,000 (Standard)</span>
                    <span>6,000,000</span>
                  </div>
                </div>

                <div className="bg-amber-950/20 border border-amber-900/40 rounded-xl p-3.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400 font-bold flex items-center space-x-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Private Shielded Witness (NEVER REVEALED)</span>
                    </span>
                    <span className="text-[10px] font-mono text-amber-300">Confidential</span>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Upstream Supplier Contract (Trade Secret)</label>
                    <input
                      type="text"
                      value={secretSupplier}
                      onChange={(e) => setSecretSupplier(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 block mb-1">Secret Cost Basis ($/unit)</label>
                      <input
                        type="number"
                        step="0.10"
                        value={secretCostBasis}
                        onChange={(e) => setSecretCostBasis(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Carrier IMO Number</label>
                      <input
                        type="text"
                        defaultValue="IMO 9759850"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleGenerateProof}
                  disabled={isProving}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50"
                >
                  {isProving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Generating Halo2 KZG Proof...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Compute & Verify ZK-POP Proof</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Side-by-Side Dual Reality (Public vs Shielded) (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero-Leakage Cryptographic Verification</span>
              </h3>
              <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400">
                <span>Latency:</span>
                <span className="text-emerald-400 font-bold">{simulatedProofTime} ms</span>
              </div>
            </div>

            {/* Verification Result Banner */}
            <div className={`p-4 rounded-xl border mb-5 transition-all ${
              proofVerified && isBalanceSufficient
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-xs font-bold text-white font-mono">
                      MATHEMATICAL PROOF VERIFIED: BOOLEAN TRUE
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Verifier evaluated polynomial commitments in Nitro Enclave. Constraint check passed without reading private witness.
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
                  Zero Knowledge
                </span>
              </div>
            </div>

            {/* Split Comparison: What Counterparty Sees vs What Remains Shielded */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Public Verifier View */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-bold text-cyan-400 flex items-center space-x-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Public Verifier State</span>
                  </span>
                  <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                    Visible to Counterparty
                  </span>
                </div>

                <div className="space-y-2 text-[11px] font-mono text-slate-300">
                  <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                    <div className="text-[10px] text-slate-400">Statement:</div>
                    <div className="text-emerald-400 font-bold">
                      {activeTab === 'POF' ? `Capital >= $${targetEscrowUSD.toLocaleString()}` : `Allocated >= ${targetVolumeUnits.toLocaleString()} MMBtu`}
                    </div>
                  </div>

                  <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                    <div className="text-[10px] text-slate-400">Circuit Proof Hash:</div>
                    <div className="truncate text-slate-200">{generatedHash}</div>
                  </div>

                  <div className="bg-slate-900/80 p-2 rounded border border-slate-800">
                    <div className="text-[10px] text-slate-400">Attestation Timestamp:</div>
                    <div className="text-slate-300">Block #19,402,185 (Enclave Epoch 44)</div>
                  </div>

                  <div className="text-[10px] text-slate-400 italic pt-1">
                    ✓ Counterparty knows with 100% mathematical certainty that terms are met.
                  </div>
                </div>
              </div>

              {/* Private Shielded Witness View */}
              <div className="bg-slate-950 border border-amber-900/40 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-bold text-amber-400 flex items-center space-x-1.5">
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Permanently Shielded</span>
                  </span>
                  <span className="text-[10px] text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/40">
                    0-Leakage Witness
                  </span>
                </div>

                <div className="space-y-2 text-[11px] font-mono text-slate-300">
                  {activeTab === 'POF' ? (
                    <>
                      <div className="bg-slate-900/80 p-2 rounded border border-slate-800 line-through text-slate-400">
                        <div className="text-[10px] text-amber-400 font-normal">Hidden Balance Sheet:</div>
                        <div>Total Balance: ${actualSecretBalanceUSD.toLocaleString()}</div>
                      </div>
                      <div className="bg-slate-900/80 p-2 rounded border border-slate-800 line-through text-slate-400">
                        <div className="text-[10px] text-amber-400 font-normal">Hidden Bank Identity:</div>
                        <div>{selectedBank}</div>
                      </div>
                      <div className="bg-slate-900/80 p-2 rounded border border-slate-800 line-through text-slate-400">
                        <div className="text-[10px] text-amber-400 font-normal">Credit Line Covenants:</div>
                        <div>Investment Grade BBB+ Facility</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-slate-900/80 p-2 rounded border border-slate-800 line-through text-slate-400">
                        <div className="text-[10px] text-amber-400 font-normal">Hidden Off-Take Source:</div>
                        <div>{secretSupplier}</div>
                      </div>
                      <div className="bg-slate-900/80 p-2 rounded border border-slate-800 line-through text-slate-400">
                        <div className="text-[10px] text-amber-400 font-normal">Hidden Profit Margin:</div>
                        <div>Cost Basis: ${secretCostBasis.toFixed(2)} / MMBtu</div>
                      </div>
                      <div className="bg-slate-900/80 p-2 rounded border border-slate-800 line-through text-slate-400">
                        <div className="text-[10px] text-amber-400 font-normal">Hidden Vessel Tracking:</div>
                        <div>IMO 9759850 (LNG Al Huwaila)</div>
                      </div>
                    </>
                  )}
                  <div className="text-[10px] text-amber-400/90 italic pt-1">
                    🔒 Stripped from public circuits. Stays in enclave until contract execution.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Protocol Architecture Comparison Banner */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-4 flex items-center space-x-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <span>Legacy Physical Commodities OTC vs. Agentic Commodities Protocol</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-rose-950/60 space-y-2.5">
            <div className="text-rose-400 font-bold uppercase text-[11px] flex items-center space-x-1.5">
              <span>Legacy OTC Physical Brokering</span>
            </div>
            <ul className="space-y-2 text-slate-400 leading-relaxed">
              <li className="flex items-start space-x-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span><strong>Information Leakage:</strong> Brokers, clearing houses, and counterparties see full bank accounts, balance sheets, and vessel tracking before trading begins.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span><strong>Front-Running & Price Distortion:</strong> Knowledge of large physical parcel purchases leaks into paper futures (NYMEX/ICE/LME), shifting the collar against the buyer.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span><strong>Human Negotiation Delay:</strong> Weeks of back-and-forth emails, term-sheet redlines, and bilateral KYC compliance friction.</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-emerald-950/60 space-y-2.5">
            <div className="text-emerald-400 font-bold uppercase text-[11px] flex items-center space-x-1.5">
              <span>Agentic Commodities Protocol</span>
            </div>
            <ul className="space-y-2 text-slate-300 leading-relaxed">
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Mathematical Proof of Funds & Title:</strong> ZK-POF & ZK-POP mathematically verify solvency and parcel validity in milliseconds without revealing private books.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Zero Information Leakage:</strong> Encrypted hardware enclaves guarantee that no human broker or paper market can front-run pending OTC physical transactions.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Programmatic Unmasking:</strong> Corporate identities and bank wire details are strictly revealed at the exact millisecond contract terms lock into multi-sig escrow.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

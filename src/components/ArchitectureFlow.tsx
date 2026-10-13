import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Lock, 
  Unlock, 
  Key, 
  FileCheck2, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  AlertTriangle,
  Coins,
  Ship,
  Scale,
  Sparkles
} from 'lucide-react';

export const ArchitectureFlow: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Confidential Enclave Ingestion',
      subtitle: 'Delegated Sovereign Mandates',
      desc: 'Institutional traders sign bounded trading policies into a hardware-isolated confidential enclave (AWS Nitro / AMD SEV-SNP). Secret parameters never leave hardware memory.',
      icon: Cpu,
      color: 'blue',
      badge: 'Hardware TEE Attestation',
    },
    {
      num: '02',
      title: 'Blinded Ephemeral Discovery',
      subtitle: 'Permanent Corporate Shielding',
      desc: 'Buyer and seller agents discover matching counterparties using blinded cryptographic public keys. Corporate LEI, banking coordinates, and vessel manifests remain strictly veiled.',
      icon: Lock,
      color: 'amber',
      badge: 'Zero Identity Disclosure',
    },
    {
      num: '03',
      title: 'Zero-Knowledge Verification',
      subtitle: 'zk-SNARK POF & POP Circuits',
      desc: 'Groth16 & Halo2 circuits mathematically prove buyer capital capacity (POF) and seller physical warehouse/terminal title (POP) without exposing bank balance sheets or supplier contracts.',
      icon: ShieldCheck,
      color: 'cyan',
      badge: 'ZK-POF & ZK-POP',
    },
    {
      num: '04',
      title: 'Algorithmic Collar Bidding',
      subtitle: 'Game-Theoretic Convergence',
      desc: 'Sovereign agents autonomously negotiate within bounded price collars, laycan delivery dates, and demurrage caps to reach an optimal bilateral settlement curve.',
      icon: Scale,
      color: 'indigo',
      badge: 'Autonomous Bidding',
    },
    {
      num: '05',
      title: 'Escrow Lock & Unmasking',
      subtitle: 'Point of Contract Execution',
      desc: 'When terms converge, funds & cargo title lock into programmatic multi-sig escrow. Strict cryptographic unmasking triggers, generating enforceable legal master agreements.',
      icon: Sparkles,
      color: 'emerald',
      badge: 'Binding Settlement',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Protocol Architecture & Security Model</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            How Autonomous OTC Physical Clearing Operates
          </h2>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            The Agentic Commodities architecture reconciles two previously opposing market necessities: <strong className="text-slate-200">absolute corporate privacy</strong> against front-running brokers, and <strong className="text-emerald-400">100% mathematical certainty</strong> of counterparty capital capacity and physical cargo delivery.
          </p>
        </div>
      </div>

      {/* 5-Step Process Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={s.num}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between relative group hover:border-slate-700 transition-all shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-mono text-slate-400 group-hover:text-emerald-400/80 transition-colors">
                    {s.num}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>

                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                  {s.subtitle}
                </div>
                <h4 className="text-sm font-bold text-white mb-2 leading-snug">{s.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-emerald-300 border border-emerald-900/50">
                  {s.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cryptographic Guarantees & Threat Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
          </div>
          <h4 className="text-sm font-bold text-white">Front-Running Elimination</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            In paper commodity markets, word of a 600,000-barrel crude order leaks within seconds to Wall Street high-frequency trading desks. With Agentic Commodities, orders exist only within hardware enclave memory as blinded commitments until clearing is finalized.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <Coins className="w-5 h-5 text-cyan-400" />
          </div>
          <h4 className="text-sm font-bold text-white">Mathematical Solvency (POF)</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Sellers no longer need to rely on outdated letter-of-credit paper trails or commercial credit agencies. The buyer's sovereign agent generates a zero-knowledge proof verifying unencumbered cash buffer with 0% balance leakage.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Ship className="w-5 h-5 text-emerald-400" />
          </div>
          <h4 className="text-sm font-bold text-white">Physical Title Integrity (POP)</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Phantom physical cargo fraud is eliminated. Sellers prove refinery allocation, storage tank receipts, and accredited assay standards (GIIGNL, ASTM, GAFTA) cryptographically linked to the specific parcel before negotiation can advance.
          </p>
        </div>
      </div>
    </div>
  );
};

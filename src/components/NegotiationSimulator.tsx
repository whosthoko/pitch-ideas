import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Shield, 
  Cpu, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  AlertCircle, 
  Play, 
  RotateCcw, 
  FastForward, 
  FileText, 
  ArrowRight, 
  Coins, 
  Building2, 
  Ship, 
  Scale, 
  Key, 
  Check, 
  Info,
  DollarSign,
  Activity,
  Layers,
  Sparkles,
  EyeOff
} from 'lucide-react';
import type { CommodityItem, NegotiationMessage, NegotiationStepStatus } from '../types/commodities';
import { COMMODITIES } from '../data/mockData';

export const NegotiationSimulator: React.FC = () => {
  const [selectedCommodity, setSelectedCommodity] = useState<CommodityItem>(COMMODITIES[0]);
  
  // Custom negotiation parameters
  const [volume, setVolume] = useState<number>(COMMODITIES[0].defaultVolume);
  const [buyerCeiling, setBuyerCeiling] = useState<number>(14.10);
  const [sellerFloor, setSellerFloor] = useState<number>(13.60);
  const [simSpeed, setSimSpeed] = useState<'normal' | 'fast' | 'instant'>('normal');

  // Simulation state
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [status, setStatus] = useState<NegotiationStepStatus>('PENDING');
  const [messages, setMessages] = useState<NegotiationMessage[]>([]);
  const [agreedPrice, setAgreedPrice] = useState<number | null>(null);
  const [showContractModal, setShowContractModal] = useState<boolean>(false);

  const timerRef = useRef<any>(null);
  const logsContainerRef = useRef<HTMLDivElement | null>(null);

  // When commodity changes, update default parameters
  const handleCommodityChange = (comm: CommodityItem) => {
    setSelectedCommodity(comm);
    setVolume(comm.defaultVolume);
    const benchmark = comm.benchmarkPrice;
    setBuyerCeiling(Number((benchmark * 1.03).toFixed(2)));
    setSellerFloor(Number((benchmark * 0.97).toFixed(2)));
    resetSimulation();
  };

  const resetSimulation = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsRunning(false);
    setCurrentStep(0);
    setStatus('PENDING');
    setMessages([]);
    setAgreedPrice(null);
  };

  // Build the script of negotiation messages based on selected parameters
  const generateNegotiationScript = (): { stepStatus: NegotiationStepStatus; msg: NegotiationMessage; agreedPrice?: number }[] => {
    const totalContractValue = (volume * selectedCommodity.benchmarkPrice).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
    const midPrice = Number(((buyerCeiling + sellerFloor) / 2).toFixed(2));
    const finalValue = (volume * midPrice).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });

    return [
      {
        stepStatus: 'DISCOVERING',
        msg: {
          id: 'step-1',
          timestamp: '00:00.120',
          sender: 'ENCLAVE_KERNEL',
          type: 'DISCOVERY',
          content: `Encrypted Sandbox Initialized in Nitro Enclave. Sovereign Buyer (0x7F2e...4C91) and Seller (0x3B8a...1F04) have established an ephemeral shielded channel. Identity shielding active.`,
          dataPayload: { statusBadge: 'Enclave Handshake OK' },
        },
      },
      {
        stepStatus: 'ZK_POF_VERIFIED',
        msg: {
          id: 'step-2',
          timestamp: '00:00.450',
          sender: 'BUYER_AGENT',
          type: 'ZK_VERIFICATION',
          content: `[ZK-POF PROOF SUBMITTED]: Buyer Sovereign Agent proves capital capacity >= ${totalContractValue} via Groth16 circuit. Verifier confirms unencumbered funds in Tier-1 custodian. Bank name, account number, and balance sheet 100% shielded.`,
          dataPayload: { zkProofHash: '0x8fba...b174', statusBadge: 'POF Verified' },
        },
      },
      {
        stepStatus: 'ZK_POP_VERIFIED',
        msg: {
          id: 'step-3',
          timestamp: '00:00.780',
          sender: 'SELLER_AGENT',
          type: 'ZK_VERIFICATION',
          content: `[ZK-POP PROOF SUBMITTED]: Seller Sovereign Agent proves physical allocation of ${volume.toLocaleString()} ${selectedCommodity.standardUnit} via Halo2 circuit. Storage terminal receipt & SGS quality assay verified. Upstream supplier contract, refinery costs & vessel manifest 100% shielded.`,
          dataPayload: { zkProofHash: '0x418a...cd3a', statusBadge: 'POP Verified' },
        },
      },
      {
        stepStatus: 'COLLAR_NEGOTIATION',
        msg: {
          id: 'step-4',
          timestamp: '00:01.210',
          sender: 'BUYER_AGENT',
          type: 'BID',
          content: `Initial Bid Collar: ${selectedCommodity.priceUnit.replace('USD', `$${sellerFloor.toFixed(2)}`)} for ${volume.toLocaleString()} ${selectedCommodity.standardUnit}. Incoterms: ${selectedCommodity.incoterms[0]}. Laycan window: 72 hrs.`,
          dataPayload: { price: sellerFloor, volume: volume },
        },
      },
      {
        stepStatus: 'COLLAR_NEGOTIATION',
        msg: {
          id: 'step-5',
          timestamp: '00:01.590',
          sender: 'SELLER_AGENT',
          type: 'ASK',
          content: `Autonomous Counter-Offer: Seller agent rejects floor; counters at ${selectedCommodity.priceUnit.replace('USD', `$${buyerCeiling.toFixed(2)}`)}. Demurrage rate capped at $35,000/day. Laycan window accepted.`,
          dataPayload: { price: buyerCeiling, volume: volume },
        },
      },
      {
        stepStatus: 'COLLAR_NEGOTIATION',
        msg: {
          id: 'step-6',
          timestamp: '00:02.040',
          sender: 'BUYER_AGENT',
          type: 'COUNTER_OFFER',
          content: `Algorithmic Concession: Buyer adjusts price collar ceiling upward to ${selectedCommodity.priceUnit.replace('USD', `$${(midPrice - 0.05).toFixed(2)}`)}, requesting 5-day payment settlement post-discharge.`,
          dataPayload: { price: Number((midPrice - 0.05).toFixed(2)), volume: volume },
        },
      },
      {
        stepStatus: 'TERMS_CONVERGED',
        msg: {
          id: 'step-7',
          timestamp: '00:02.480',
          sender: 'SELLER_AGENT',
          type: 'CONVERGENCE',
          content: `COLLAR CONVERGENCE REACHED: Sovereign algorithms converge at ${selectedCommodity.priceUnit.replace('USD', `$${midPrice.toFixed(2)}`)}. Total cleared settlement: ${finalValue}. Bilateral mathematical lock confirmed.`,
          dataPayload: { price: midPrice, collarSpread: 0 },
        },
      },
      {
        stepStatus: 'ESCROW_LOCKED',
        msg: {
          id: 'step-8',
          timestamp: '00:02.920',
          sender: 'ENCLAVE_KERNEL',
          type: 'ESCROW_LOCK',
          content: `PROGRAMMATIC ESCROW LOCKED: Smart contract holds ${finalValue} capital capacity with 105% margin buffer. Title allocation sealed with terminal registry lock. Point of execution reached.`,
          dataPayload: { statusBadge: 'Escrow Multi-Sig Active' },
        },
      },
      {
        stepStatus: 'UNMASKED',
        msg: {
          id: 'step-9',
          timestamp: '00:03.350',
          sender: 'ENCLAVE_KERNEL',
          type: 'UNMASKING',
          content: `[CEREMONY COMPLETE - BLINDERS REMOVED]: Counterparties unmasked strictly at escrow lock! Buyer: Helios Energy Trading S.A. (Geneva) | Seller: Nordic Cryo Logistics B.V. (Rotterdam). Verified legal contracts generated.`,
          dataPayload: { statusBadge: 'Binding Legal Contract Sealed' },
        },
        agreedPrice: midPrice,
      },
    ];
  };

  const script = generateNegotiationScript();

  // Scroll to bottom of message logs
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Main step runner
  const runNextStep = (stepIdx: number) => {
    if (stepIdx >= script.length) {
      setIsRunning(false);
      return;
    }

    const item = script[stepIdx];
    setCurrentStep(stepIdx + 1);
    setStatus(item.stepStatus);
    setMessages((prev) => [...prev, item.msg]);

    if (item.agreedPrice !== undefined) {
      setAgreedPrice(item.agreedPrice);
      // Trigger confetti on successful unmasking and escrow lock
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#06b6d4', '#6366f1', '#f59e0b'],
      });
    }

    if (stepIdx + 1 < script.length && isRunning) {
      const delay = simSpeed === 'fast' ? 700 : simSpeed === 'instant' ? 100 : 1800;
      timerRef.current = setTimeout(() => {
        runNextStep(stepIdx + 1);
      }, delay);
    } else if (stepIdx + 1 >= script.length) {
      setIsRunning(false);
    }
  };

  const startSimulation = () => {
    resetSimulation();
    setIsRunning(true);
  };

  useEffect(() => {
    if (isRunning && currentStep === 0) {
      runNextStep(0);
    }
  }, [isRunning, currentStep]);

  // Step by step manual trigger
  const handleStepOnce = () => {
    if (currentStep < script.length) {
      setIsRunning(false);
      runNextStep(currentStep);
    }
  };

  // Progress percentage
  const progressPct = Math.round((currentStep / script.length) * 100);

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>TEE Enclave Sandbox Negotiation Demo</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Autonomous OTC Physical Trade & Zero-Knowledge Settlement
            </h2>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              Watch sovereign software agents negotiate physical cargo terms inside a hardware-isolated confidential enclave. 
              Zero-knowledge proofs verify capital capacity (POF) and physical allocations (POP) in real time with <strong className="text-slate-200">zero disclosure</strong> of bank accounts or supplier contracts. Identities unmask <strong className="text-emerald-400">only</strong> when programmatic escrow locks.
            </p>
          </div>

          {/* Quick controls */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={startSimulation}
              disabled={isRunning}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg ${
                isRunning
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20 hover:shadow-emerald-500/30'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{currentStep > 0 && currentStep < script.length ? 'Resume Run' : 'Execute Autonomous Match'}</span>
            </button>

            <button
              onClick={handleStepOnce}
              disabled={isRunning || currentStep >= script.length}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium text-sm bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 transition-all disabled:opacity-50"
            >
              <FastForward className="w-4 h-4 text-cyan-400" />
              <span>Step-by-Step</span>
            </button>

            <button
              onClick={resetSimulation}
              className="flex items-center space-x-1.5 px-3 py-2.5 rounded-xl font-medium text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all border border-slate-800"
              title="Reset Simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Speed toggle */}
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 text-xs font-mono">
              <button
                onClick={() => setSimSpeed('normal')}
                className={`px-2.5 py-1 rounded-lg ${simSpeed === 'normal' ? 'bg-slate-800 text-emerald-400' : 'text-slate-500'}`}
              >
                1x
              </button>
              <button
                onClick={() => setSimSpeed('fast')}
                className={`px-2.5 py-1 rounded-lg ${simSpeed === 'fast' ? 'bg-slate-800 text-emerald-400' : 'text-slate-500'}`}
              >
                2x
              </button>
              <button
                onClick={() => setSimSpeed('instant')}
                className={`px-2.5 py-1 rounded-lg ${simSpeed === 'instant' ? 'bg-slate-800 text-emerald-400' : 'text-slate-500'}`}
              >
                Instant
              </button>
            </div>
          </div>
        </div>

        {/* Commodity Selector Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
            <span>Select Physical OTC Cargo Market</span>
            <span className="text-slate-400">5 Institutional Commodities Preloaded</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {COMMODITIES.map((comm) => {
              const isSelected = selectedCommodity.id === comm.id;
              return (
                <button
                  key={comm.id}
                  onClick={() => handleCommodityChange(comm)}
                  className={`text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-slate-800/90 border-emerald-500/50 shadow-md shadow-emerald-500/5'
                      : 'bg-slate-950/40 border-slate-800/70 hover:border-slate-700 hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">{comm.ticker}</span>
                    <span className="text-[10px] text-slate-400 px-1.5 py-0.5 rounded bg-slate-900">
                      {comm.category}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-200 truncate">{comm.name}</div>
                  <div className="text-xs text-slate-400 font-mono mt-1">
                    ${comm.benchmarkPrice.toLocaleString()} <span className="text-[10px] text-slate-400">/{comm.standardUnit}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Split Grid: Agents & Enclave Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Buyer Sovereign Agent (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 relative overflow-hidden shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">BUYER SOVEREIGN AGENT</h3>
                  <div className="text-[11px] font-mono text-slate-400 flex items-center space-x-1">
                    <span>Attestation:</span>
                    <span className="text-blue-300">Intel SGX-DCAP v3</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-950/60 text-blue-400 border border-blue-800/50">
                  Autonomous Buy Mandate
                </span>
              </div>
            </div>

            {/* Cryptographic Masking Card */}
            <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-3.5 mb-4 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="flex items-center space-x-1.5">
                  <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                  <span>Blinded Enclave Identity</span>
                </span>
                <span className="text-[10px] text-amber-400 bg-amber-950/40 border border-amber-800/30 px-1.5 py-0.2 rounded">
                  {status === 'UNMASKED' ? 'REVEALED' : 'SHIELDED'}
                </span>
              </div>

              {status === 'UNMASKED' ? (
                <div className="space-y-1.5 pt-1 text-slate-200 border-t border-slate-800 animate-fadeIn">
                  <div className="text-emerald-400 font-bold flex items-center space-x-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Helios Energy Trading S.A.</span>
                  </div>
                  <div className="text-slate-400 text-[11px]">Geneva, Switzerland • LEI: 549300V31G7WXYZ091</div>
                  <div className="text-slate-400 text-[11px] truncate">
                    Custodian: UBS Switzerland AG (Zurich)
                  </div>
                  <div className="text-slate-400 text-[11px]">Wire: CH93-0023-0182-9938-1823</div>
                </div>
              ) : (
                <div className="space-y-1 text-slate-300">
                  <div className="font-semibold text-white tracking-wider">0x7F2e...4C91</div>
                  <div className="text-[11px] text-slate-400 truncate">Pubkey: 0x0489...e1a2f98</div>
                  <div className="text-[11px] text-amber-300/80 italic flex items-center space-x-1">
                    <Lock className="w-3 h-3" />
                    <span>Corporate identity, bank & credit lines shielded</span>
                  </div>
                </div>
              )}
            </div>

            {/* Zero-Knowledge POF Badge */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 mb-4">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono text-slate-300 flex items-center space-x-1.5">
                  <Coins className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ZK-POF (Proof of Funds)</span>
                </span>
                {currentStep >= 2 ? (
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>VERIFIED</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-slate-400">Awaiting Handshake</span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Proves buyer holds &gt; 105% escrow capital without revealing bank balances or credit limits to the seller.
              </p>
              {currentStep >= 2 && (
                <div className="mt-2 text-[10px] font-mono bg-slate-900 border border-emerald-500/20 text-emerald-300 p-1.5 rounded truncate">
                  Hash: 0x8fba3d201149e917d2bb91f2cc095a4387879e6027aeb8c399b801a2399cb174
                </div>
              )}
            </div>

            {/* Agent Parameters & Collar Settings */}
            <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Target Collar Ceiling</span>
                <span className="font-mono text-white font-semibold">${buyerCeiling.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Desired Cargo Volume</span>
                <span className="font-mono text-slate-200">
                  {volume.toLocaleString()} {selectedCommodity.standardUnit}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Delivery Specification</span>
                <span className="font-mono text-slate-300">{selectedCommodity.incoterms[0]}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Acceptable Laycan</span>
                <span className="font-mono text-slate-300">{selectedCommodity.specs.laycanDays} days window</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column: Encrypted Enclave Execution Sandbox (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col h-[580px] shadow-sm">
            {/* Sandbox Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-mono font-bold uppercase text-white tracking-wider">
                  Enclave Execution Stream
                </span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                Step {currentStep} of {script.length} ({progressPct}%)
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-950 h-1.5 rounded-full my-3 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-cyan-500 via-emerald-400 to-emerald-300 h-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            {/* Stage Indicators */}
            <div className="grid grid-cols-4 gap-1 text-[10px] font-mono text-center pb-3 border-b border-slate-800">
              <div className={`p-1 rounded ${currentStep >= 1 ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-400'}`}>
                1. Handshake
              </div>
              <div className={`p-1 rounded ${currentStep >= 3 ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-400'}`}>
                2. ZK Verify
              </div>
              <div className={`p-1 rounded ${currentStep >= 7 ? 'bg-slate-800 text-indigo-400 font-bold' : 'text-slate-400'}`}>
                3. Bidding
              </div>
              <div className={`p-1 rounded ${currentStep >= 9 ? 'bg-emerald-950 text-emerald-300 font-bold border border-emerald-800' : 'text-slate-400'}`}>
                4. Unmask
              </div>
            </div>

            {/* Live Stream Logs */}
            <div
              ref={logsContainerRef}
              className="flex-1 overflow-y-auto space-y-3 py-3 pr-1 text-xs font-mono"
            >
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 p-4">
                  <Shield className="w-10 h-10 mb-2 opacity-30 text-emerald-400" />
                  <p className="text-xs">Enclave standing by.</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Click "Execute Autonomous Match" or "Step-by-Step" above to initiate trade.
                  </p>
                </div>
              ) : (
                messages.map((m) => {
                  const isKernel = m.sender === 'ENCLAVE_KERNEL';
                  const isBuyer = m.sender === 'BUYER_AGENT';
                  const isSeller = m.sender === 'SELLER_AGENT';

                  return (
                    <div
                      key={m.id}
                      className={`p-3 rounded-xl border transition-all ${
                        isKernel
                          ? 'bg-slate-950 border-emerald-900/60 text-slate-200'
                          : isBuyer
                          ? 'bg-blue-950/20 border-blue-900/40 text-blue-200'
                          : 'bg-emerald-950/20 border-emerald-900/40 text-emerald-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] mb-1.5 opacity-80">
                        <span className="font-bold flex items-center space-x-1">
                          {isKernel && <Cpu className="w-3 h-3 text-cyan-400" />}
                          {isBuyer && <Shield className="w-3 h-3 text-blue-400" />}
                          {isSeller && <Ship className="w-3 h-3 text-emerald-400" />}
                          <span>{m.sender.replace('_', ' ')}</span>
                        </span>
                        <span>{m.timestamp}</span>
                      </div>
                      <p className="leading-relaxed text-[11px]">{m.content}</p>

                      {m.dataPayload?.zkProofHash && (
                        <div className="mt-2 text-[10px] bg-slate-950/80 px-2 py-1 rounded text-cyan-400 border border-cyan-800/30 truncate">
                          Proof Hash: {m.dataPayload.zkProofHash}
                        </div>
                      )}
                      {m.dataPayload?.price && (
                        <div className="mt-2 inline-block text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded font-bold border border-slate-700">
                          Collar Quote: ${m.dataPayload.price.toFixed(2)}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Final Settlement Bar */}
            {status === 'UNMASKED' && agreedPrice && (
              <div className="pt-3 border-t border-slate-800 animate-fadeIn">
                <div className="bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border border-emerald-500/40 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">
                      Contract Executed & Cleared
                    </div>
                    <div className="text-sm font-bold text-white font-mono">
                      Cleared at ${agreedPrice.toFixed(2)} / {selectedCommodity.standardUnit}
                    </div>
                  </div>
                  <button
                    onClick={() => setShowContractModal(true)}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Contract</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Seller Sovereign Agent (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 relative overflow-hidden shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <Ship className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">SELLER SOVEREIGN AGENT</h3>
                  <div className="text-[11px] font-mono text-slate-400 flex items-center space-x-1">
                    <span>Attestation:</span>
                    <span className="text-emerald-300">AMD SEV-SNP Enclave</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
                  Autonomous Sell Mandate
                </span>
              </div>
            </div>

            {/* Cryptographic Masking Card */}
            <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-3.5 mb-4 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="flex items-center space-x-1.5">
                  <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                  <span>Blinded Enclave Identity</span>
                </span>
                <span className="text-[10px] text-amber-400 bg-amber-950/40 border border-amber-800/30 px-1.5 py-0.2 rounded">
                  {status === 'UNMASKED' ? 'REVEALED' : 'SHIELDED'}
                </span>
              </div>

              {status === 'UNMASKED' ? (
                <div className="space-y-1.5 pt-1 text-slate-200 border-t border-slate-800 animate-fadeIn">
                  <div className="text-emerald-400 font-bold flex items-center space-x-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Nordic Cryo Logistics B.V.</span>
                  </div>
                  <div className="text-slate-400 text-[11px]">Rotterdam, Netherlands • LEI: 724500Q89LKJH0123</div>
                  <div className="text-slate-400 text-[11px] truncate">
                    Terminal: Gate Terminal Maasvlakte Tank 04
                  </div>
                  <div className="text-slate-400 text-[11px]">SGS Assay: #SGS-2026-LNG-8812</div>
                </div>
              ) : (
                <div className="space-y-1 text-slate-300">
                  <div className="font-semibold text-white tracking-wider">0x3B8a...1F04</div>
                  <div className="text-[11px] text-slate-400 truncate">Pubkey: 0x0377...a839cc1</div>
                  <div className="text-[11px] text-amber-300/80 italic flex items-center space-x-1">
                    <Lock className="w-3 h-3" />
                    <span>Cargo source, vessel IMO & cost basis shielded</span>
                  </div>
                </div>
              )}
            </div>

            {/* Zero-Knowledge POP Badge */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 mb-4">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono text-slate-300 flex items-center space-x-1.5">
                  <Ship className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ZK-POP (Physical Allocation)</span>
                </span>
                {currentStep >= 3 ? (
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>VERIFIED</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-slate-400">Awaiting Handshake</span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Proves physical title, warehouse receipt, and certified assay without revealing supplier cost or manifest.
              </p>
              {currentStep >= 3 && (
                <div className="mt-2 text-[10px] font-mono bg-slate-900 border border-emerald-500/20 text-emerald-300 p-1.5 rounded truncate">
                  Hash: 0x418a09ee1b8d96b994d80a13ef0177bb3201460d19dca12b5049a8fe1009cd3a
                </div>
              )}
            </div>

            {/* Agent Parameters & Collar Settings */}
            <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Target Collar Floor</span>
                <span className="font-mono text-white font-semibold">${sellerFloor.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Physical Parcel Allocated</span>
                <span className="font-mono text-slate-200">
                  {volume.toLocaleString()} {selectedCommodity.standardUnit}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Terminal Location</span>
                <span className="font-mono text-slate-300">{selectedCommodity.specs.deliveryRegion}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Quality Standard</span>
                <span className="font-mono text-slate-300 truncate max-w-[180px]">{selectedCommodity.specs.assayStandard}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Unmasked Contract & Escrow Modal */}
      {showContractModal && agreedPrice && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">Programmatic Escrow Execution & Legal Schedule</h3>
              </div>
              <button
                onClick={() => setShowContractModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 text-sm font-mono"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-4 py-4 text-xs font-mono">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-slate-400 uppercase text-[10px]">Execution Timestamp & Enclave Seal</div>
                <div className="text-emerald-400 font-bold">2026-10-13T22:38:40.129Z • Block #19,402,185</div>
                <div className="text-slate-300 text-[11px] truncate">
                  Escrow Contract Address: 0x981C4F98c764a88E490918077Dfa9C3941F7b322
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-blue-400 font-bold uppercase text-[10px] flex items-center space-x-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Unmasked Buyer</span>
                  </div>
                  <div className="text-white font-semibold">Helios Energy Trading S.A.</div>
                  <div className="text-slate-400">Jurisdiction: Geneva, Switzerland</div>
                  <div className="text-slate-400">LEI: 549300V31G7WXYZ091</div>
                  <div className="text-slate-400">Custodian: UBS Switzerland AG</div>
                  <div className="text-emerald-400 text-[10px]">✓ Capital Escrow: Locked 105% Margin</div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-emerald-400 font-bold uppercase text-[10px] flex items-center space-x-1">
                    <Ship className="w-3.5 h-3.5" />
                    <span>Unmasked Seller</span>
                  </div>
                  <div className="text-white font-semibold">Nordic Cryo Logistics B.V.</div>
                  <div className="text-slate-400">Jurisdiction: Rotterdam, Netherlands</div>
                  <div className="text-slate-400">LEI: 724500Q89LKJH0123</div>
                  <div className="text-slate-400">Terminal: Gate Terminal Maasvlakte Tank 04</div>
                  <div className="text-emerald-400 text-[10px]">✓ Physical Title: Programmatically Pledged</div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-slate-400 uppercase text-[10px]">Binding Legal & Delivery Terms</div>
                <div className="text-slate-200">
                  <strong>Master Agreement:</strong> EFET / BP Physical LNG Master Schedule (2026 Edition)
                </div>
                <div className="text-slate-200">
                  <strong>Total Cleared Quantity:</strong> {volume.toLocaleString()} {selectedCommodity.standardUnit}
                </div>
                <div className="text-slate-200">
                  <strong>Settlement Price:</strong> ${agreedPrice.toFixed(2)} / {selectedCommodity.standardUnit} ($
                  {(volume * agreedPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })})
                </div>
                <div className="text-slate-200">
                  <strong>Incoterms & Port:</strong> {selectedCommodity.incoterms[0]} ({selectedCommodity.specs.deliveryRegion})
                </div>
                <div className="text-slate-200">
                  <strong>Quality Certificate:</strong> {selectedCommodity.specs.assayStandard}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowContractModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

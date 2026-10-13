import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  Flame, 
  ShoppingCart, 
  XCircle, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  TrendingUp, 
  Coins, 
  MessageSquare, 
  RotateCcw,
  Zap,
  Tag,
  Scale,
  ShieldAlert,
  Info
} from 'lucide-react';

interface SyntheticAgent {
  id: string;
  name: string;
  role: string;
  avatarBg: string;
  bankroll: number;
  remainingBankroll: number;
  trait: string;
  reactionDiscourse: string;
  decision: 'PURCHASED' | 'ABANDONED_PRICE' | 'ABANDONED_SKEPTICISM' | 'ABANDONED_SHIPPING';
  decisionQuote: string;
}

export const DropSimVisual: React.FC = () => {
  // Preset Product Drops
  const [selectedProduct, setSelectedProduct] = useState<'glasses' | 'watch' | 'earbuds'>('glasses');
  const [simulationState, setSimulationState] = useState<'IDLE' | 'DISCOURSE' | 'DECISIONS'>('DECISIONS');

  const productData = {
    glasses: {
      name: 'Horizon AR Spatial Glasses',
      category: 'Consumer Wearables',
      price: 499,
      collateral: 'All-day 18hr battery, 1080p Micro-OLED spatial display, instant neural voice transcription, 42g titanium frame.',
      competitorBaseline: 'Ray-Ban Meta ($299) • Apple Vision Pro ($3,499)',
      leadTime: '8-week ship date',
      agents: [
        {
          id: 'agent-1',
          name: 'Maya',
          role: 'Tech Early Adopter',
          avatarBg: 'bg-blue-100 text-blue-700',
          bankroll: 1200,
          remainingBankroll: 701,
          trait: 'High novelty bias, tech optimist',
          reactionDiscourse: '18-hour battery with full spatial display at 42 grams? If the weight distribution is real, this replaces my phone on commutes.',
          decision: 'PURCHASED',
          decisionQuote: 'Executed checkout at $499. Novelty factor and weight spec justified the premium over Ray-Ban.',
        },
        {
          id: 'agent-2',
          name: 'Marcus',
          role: 'Hardware Spec Cynic',
          avatarBg: 'bg-amber-100 text-amber-700',
          bankroll: 800,
          remainingBankroll: 800,
          trait: 'Validates claims against physics & benchmarks',
          reactionDiscourse: 'Physics check: a 42g frame cannot physically fit a battery supporting micro-OLED compute for 18 hours without external tethering.',
          decision: 'ABANDONED_SKEPTICISM',
          decisionQuote: 'Abandoned at checkout. Refused to convert without verified third-party hardware teardown.',
        },
        {
          id: 'agent-3',
          name: 'Liam',
          role: 'Budget Pragmatist',
          avatarBg: 'bg-zinc-200 text-zinc-700',
          bankroll: 400,
          remainingBankroll: 400,
          trait: 'Price sensitive, evaluates competitor delta',
          reactionDiscourse: 'Ray-Ban Meta is $299. Is the spatial display worth an extra $200 when I can already take photos and voice memo for $299?',
          decision: 'ABANDONED_PRICE',
          decisionQuote: 'Abandoned cart. Price delta exceeds perceived utility gain over the $299 market baseline.',
        },
        {
          id: 'agent-4',
          name: 'Elena',
          role: 'Design Purist',
          avatarBg: 'bg-purple-100 text-purple-700',
          bankroll: 2200,
          remainingBankroll: 1701,
          trait: 'High disposable income, sensitive to delivery delays',
          reactionDiscourse: 'Minimalist titanium aesthetic is gorgeous. But 8 weeks delivery latency is a massive friction point for impulse buying.',
          decision: 'PURCHASED',
          decisionQuote: 'Executed checkout at $499. Aesthetic passed threshold, tolerated 8-week shipping queue.',
        },
        {
          id: 'agent-5',
          name: 'Devon',
          role: 'Mainstream Follower',
          avatarBg: 'bg-emerald-100 text-emerald-700',
          bankroll: 600,
          remainingBankroll: 600,
          trait: 'Socially influenced by peer consensus',
          reactionDiscourse: 'Marcus brought up a great point about the battery weight. I was about to buy, but I will wait to see if early reviews pan out.',
          decision: 'ABANDONED_SKEPTICISM',
          decisionQuote: 'Abandoned during review stage. Influenced by negative sentiment in synthetic discourse graph.',
        },
      ] as SyntheticAgent[],
      tearSheet: {
        simulatedCount: 1200,
        conversionRate: 19.4,
        totalRevenueUSD: 116400,
        primaryFriction: 'Battery Feasibility Skepticism (36% drop-off)',
        secondaryFriction: 'Price Elasticity vs $299 Baseline (42% drop-off)',
        keyRecommendation: 'Release independent lab battery run-time verification 48h prior to launch to recover cynical early adopters.',
      },
    },
    watch: {
      name: 'Chronos Mechanical Smartwatch',
      category: 'Luxury Tech',
      price: 850,
      collateral: 'Swiss automatic winding rotor paired with hidden sapphire OLED biometric sensors, 300m titanium dive casing.',
      competitorBaseline: 'Apple Watch Ultra ($799) • Garmin Marq ($1,900)',
      leadTime: 'Immediate dispatch',
      agents: [
        {
          id: 'agent-1',
          name: 'Maya',
          role: 'Tech Early Adopter',
          avatarBg: 'bg-blue-100 text-blue-700',
          bankroll: 1200,
          remainingBankroll: 350,
          trait: 'Curious about hybrid mechanical engineering',
          reactionDiscourse: 'A mechanical rotor generating energy for biometric sensors is revolutionary if water resistance holds up.',
          decision: 'PURCHASED',
          decisionQuote: 'Executed checkout at $850. Hybrid mechanical appeal converted immediately.',
        },
        {
          id: 'agent-2',
          name: 'Marcus',
          role: 'Spec Cynic',
          avatarBg: 'bg-amber-100 text-amber-700',
          bankroll: 800,
          remainingBankroll: 800,
          trait: 'Evaluates sensor refresh rate',
          reactionDiscourse: 'Does the rotor generate enough microwatts for continuous optical heart-rate monitoring during workouts?',
          decision: 'ABANDONED_SKEPTICISM',
          decisionQuote: 'Abandoned. Suspected intermittent sensor polling compromises athletic tracking data.',
        },
        {
          id: 'agent-3',
          name: 'Liam',
          role: 'Budget Pragmatist',
          avatarBg: 'bg-zinc-200 text-zinc-700',
          bankroll: 500,
          remainingBankroll: 500,
          trait: 'Strict budget constraint',
          reactionDiscourse: '$850 is higher than my entire quarterly tech hardware allowance.',
          decision: 'ABANDONED_PRICE',
          decisionQuote: 'Abandoned cart immediately. Price strictly outside bounded bankroll envelope.',
        },
        {
          id: 'agent-4',
          name: 'Elena',
          role: 'Design Purist',
          avatarBg: 'bg-purple-100 text-purple-700',
          bankroll: 3000,
          remainingBankroll: 2150,
          trait: 'Collector of luxury horology',
          reactionDiscourse: 'Pure horological perfection. Titanium finish and discrete screen means I can wear this to black-tie dinners.',
          decision: 'PURCHASED',
          decisionQuote: 'Executed checkout at $850. High willingness-to-pay for dual luxury utility.',
        },
        {
          id: 'agent-5',
          name: 'Devon',
          role: 'Mainstream Follower',
          avatarBg: 'bg-emerald-100 text-emerald-700',
          bankroll: 900,
          remainingBankroll: 900,
          trait: 'Prefers standard smartwatch ecosystems',
          reactionDiscourse: 'Without watchOS integration, will this sync smoothly with my existing fitness rings and health alerts?',
          decision: 'ABANDONED_SKEPTICISM',
          decisionQuote: 'Abandoned. Proprietary OS ecosystem friction prevented checkout.',
        },
      ] as SyntheticAgent[],
      tearSheet: {
        simulatedCount: 1500,
        conversionRate: 14.8,
        totalRevenueUSD: 188700,
        primaryFriction: 'Ecosystem Lock-in Resistance (48% drop-off)',
        secondaryFriction: 'Price Barrier for Non-Horology Consumers (39% drop-off)',
        keyRecommendation: 'Emphasize Apple Health and Strava API export compatibility in above-the-fold landing page copy.',
      },
    },
    earbuds: {
      name: 'Solace Sound Neural Earbuds',
      category: 'Personal Audio',
      price: 249,
      collateral: 'Adaptive neural spatial acoustic cancellation, lossless 24-bit wireless streaming, custom planar magnetic drivers.',
      competitorBaseline: 'Sony WF-1000XM5 ($279) • AirPods Pro ($249)',
      leadTime: 'Ships next business day',
      agents: [
        {
          id: 'agent-1',
          name: 'Maya',
          role: 'Tech Early Adopter',
          avatarBg: 'bg-blue-100 text-blue-700',
          bankroll: 1200,
          remainingBankroll: 951,
          trait: 'Audiophile curiosity',
          reactionDiscourse: 'Planar magnetic drivers in true wireless earbuds at $249? That matches wired studio monitor fidelity.',
          decision: 'PURCHASED',
          decisionQuote: 'Purchased at $249. Audio specs beat existing Sony benchmark.',
        },
        {
          id: 'agent-2',
          name: 'Marcus',
          role: 'Spec Cynic',
          avatarBg: 'bg-amber-100 text-amber-700',
          bankroll: 800,
          remainingBankroll: 551,
          trait: 'Checked latency frequency response curve',
          reactionDiscourse: 'Frequency response graphs look exceptionally flat. Codec support includes LDAC and aptX Lossless.',
          decision: 'PURCHASED',
          decisionQuote: 'Purchased at $249. Spec verification passed benchmark test.',
        },
        {
          id: 'agent-3',
          name: 'Liam',
          role: 'Budget Pragmatist',
          avatarBg: 'bg-zinc-200 text-zinc-700',
          bankroll: 300,
          remainingBankroll: 51,
          trait: 'Evaluates price parity with AirPods',
          reactionDiscourse: '$249 matches AirPods Pro exactly, but without Apple ecosystem seamless switching.',
          decision: 'ABANDONED_PRICE',
          decisionQuote: 'Abandoned cart. At price parity, lack of ecosystem convenience tipped balance.',
        },
        {
          id: 'agent-4',
          name: 'Elena',
          role: 'Design Purist',
          avatarBg: 'bg-purple-100 text-purple-700',
          bankroll: 2000,
          remainingBankroll: 1751,
          trait: 'Matte aluminum case design lover',
          reactionDiscourse: 'The brushed aluminum charging cradle looks like a piece of Scandinavian sculpture.',
          decision: 'PURCHASED',
          decisionQuote: 'Purchased at $249. Case craftsmanship and acoustic response met standards.',
        },
        {
          id: 'agent-5',
          name: 'Devon',
          role: 'Mainstream Follower',
          avatarBg: 'bg-emerald-100 text-emerald-700',
          bankroll: 600,
          remainingBankroll: 351,
          trait: 'Follows early audiophile consensus',
          reactionDiscourse: 'Both Maya and Marcus are raving about the planar drivers. Consensus looks extremely solid.',
          decision: 'PURCHASED',
          decisionQuote: 'Purchased at $249. Positive social momentum in discourse graph drove conversion.',
        },
      ] as SyntheticAgent[],
      tearSheet: {
        simulatedCount: 1800,
        conversionRate: 31.2,
        totalRevenueUSD: 139938,
        primaryFriction: 'Ecosystem Switching Resistance (31% drop-off)',
        secondaryFriction: 'Brand Awareness vs Sony/Apple (22% drop-off)',
        keyRecommendation: 'Highlight fast-pair Bluetooth multipoint switching to neutralize AirPods ecosystem advantage.',
      },
    },
  }[selectedProduct];

  const triggerSimulation = () => {
    setSimulationState('DISCOURSE');
    setTimeout(() => {
      setSimulationState('DECISIONS');
    }, 1000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Notion-Style Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 pt-2">
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs border border-zinc-200">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span>Behavioral Staging Network</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900">
          DropSim
        </h2>
        <p className="text-zinc-500 text-sm sm:text-base leading-relaxed">
          Simulating consumer and market dynamics prior to high-stakes product drops using 500 to 2,000 economically constrained synthetic agents.
        </p>

        {/* Product Selector */}
        <div className="pt-2 flex items-center justify-center space-x-1.5 text-xs">
          <span className="text-zinc-400 mr-1">Product Drop:</span>
          {(['glasses', 'watch', 'earbuds'] as const).map((p) => (
            <button
              key={p}
              onClick={() => {
                setSelectedProduct(p);
                setSimulationState('DECISIONS');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedProduct === p
                  ? 'bg-zinc-900 text-white font-medium shadow-xs'
                  : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50'
              }`}
            >
              {p === 'glasses' ? 'AR Glasses ($499)' : p === 'watch' ? 'Titanium Watch ($850)' : 'Neural Earbuds ($249)'}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. THE PRODUCT DROP (Collateral Release Card) */}
      {/* ========================================================================= */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 sm:p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-mono uppercase bg-amber-50 text-amber-700 border border-amber-200/60 px-2 py-0.5 rounded-md font-medium">
                Live Drop Staging
              </span>
              <span className="text-xs text-zinc-400 font-mono">{productData.category}</span>
            </div>
            <h3 className="text-xl font-bold text-zinc-900">{productData.name}</h3>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-xs text-zinc-400">Launch Price</div>
              <div className="text-xl font-bold font-mono text-zinc-900">${productData.price}</div>
            </div>
            <button
              onClick={triggerSimulation}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-medium flex items-center space-x-1.5 transition-all shadow-xs"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Re-Simulate Drop</span>
            </button>
          </div>
        </div>

        {/* Collateral & Competitor Baseline Specs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs">
          <div className="bg-[#FAFAFA] p-3 rounded-xl border border-zinc-200/60 space-y-1">
            <div className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Product Collateral Ingested</div>
            <div className="text-zinc-700 leading-relaxed">{productData.collateral}</div>
          </div>

          <div className="bg-[#FAFAFA] p-3 rounded-xl border border-zinc-200/60 space-y-1">
            <div className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Competitor Benchmarks</div>
            <div className="text-zinc-700 leading-relaxed">{productData.competitorBaseline}</div>
          </div>

          <div className="bg-[#FAFAFA] p-3 rounded-xl border border-zinc-200/60 space-y-1">
            <div className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Shipping & Delivery Friction</div>
            <div className="text-zinc-700 leading-relaxed">{productData.leadTime}</div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. AGENTS REACTING IN REAL TIME (The Synthetic Social Discourse & Decisions) */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-zinc-700" />
            <h4 className="text-sm font-semibold text-zinc-900">
              Synthetic Agent Reactions & Economic Decisions
            </h4>
            <span className="text-[11px] text-zinc-400 font-mono bg-zinc-100 px-2 py-0.5 rounded">
              Sample Cohort of 5 / 1,200 Agents
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs text-zinc-500">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Purchased</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Abandoned</span>
            </span>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productData.agents.map((agent) => {
            const isPurchased = agent.decision === 'PURCHASED';

            return (
              <div
                key={agent.id}
                className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div>
                  {/* Agent Profile Header */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-zinc-100">
                    <div className="flex items-center space-x-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${agent.avatarBg}`}>
                        {agent.name[0]}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-zinc-900">{agent.name}</div>
                        <div className="text-[10px] text-zinc-400">{agent.role}</div>
                      </div>
                    </div>

                    <div className="text-right font-mono text-[11px]">
                      <div className="text-zinc-400 text-[9px] uppercase">Bankroll</div>
                      <div className="text-zinc-700 font-semibold">${agent.bankroll}</div>
                    </div>
                  </div>

                  {/* Synthetic Discourse (What Agent Said on the Network) */}
                  <div className="mt-3 space-y-1">
                    <div className="text-[10px] uppercase font-medium tracking-wider text-zinc-400 flex items-center space-x-1">
                      <MessageSquare className="w-3 h-3 text-zinc-400" />
                      <span>Social Discourse Graph</span>
                    </div>
                    <p className="text-xs text-zinc-600 italic bg-[#FAFAFA] p-2.5 rounded-xl border border-zinc-200/50 leading-relaxed">
                      "{agent.reactionDiscourse}"
                    </p>
                  </div>
                </div>

                {/* Economic Decision Outcome */}
                <div className="pt-2 border-t border-zinc-100 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
                      Checkout Flow
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-medium flex items-center space-x-1 ${
                        isPurchased
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}
                    >
                      {isPurchased ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Purchased (-${productData.price})</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 text-rose-600" />
                          <span>Abandoned Cart</span>
                        </>
                      )}
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-500 leading-snug">
                    {agent.decisionQuote}
                  </p>

                  {isPurchased && (
                    <div className="text-[10px] font-mono text-zinc-400">
                      Bankroll remaining: ${agent.remainingBankroll}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. THE 48-HOUR PRE-FLIGHT ADVERSARIAL FRICTION TEAR-SHEET */}
      {/* ========================================================================= */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-zinc-700" />
            <h4 className="text-sm font-semibold text-zinc-900">
              Pre-Flight Adversarial Friction Tear-Sheet
            </h4>
          </div>
          <span className="text-[11px] font-mono bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded border border-zinc-200">
            Delivered 48 Hours Before Public Launch
          </span>
        </div>

        {/* High Level Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-[#FAFAFA] p-3.5 rounded-xl border border-zinc-200/60">
            <div className="text-zinc-400 text-[10px] uppercase font-mono">Simulated Population</div>
            <div className="text-lg font-bold text-zinc-900 font-mono mt-0.5">
              {productData.tearSheet.simulatedCount.toLocaleString()} Agents
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">Economically constrained bankrolls</div>
          </div>

          <div className="bg-[#FAFAFA] p-3.5 rounded-xl border border-zinc-200/60">
            <div className="text-zinc-400 text-[10px] uppercase font-mono">Simulated Conversion Rate</div>
            <div className="text-lg font-bold text-emerald-700 font-mono mt-0.5">
              {productData.tearSheet.conversionRate}%
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              Est. Revenue: ${productData.tearSheet.totalRevenueUSD.toLocaleString()}
            </div>
          </div>

          <div className="bg-[#FAFAFA] p-3.5 rounded-xl border border-zinc-200/60">
            <div className="text-zinc-400 text-[10px] uppercase font-mono">Top Drop-Off Friction</div>
            <div className="text-xs font-semibold text-rose-700 mt-1 leading-snug">
              {productData.tearSheet.primaryFriction}
            </div>
            <div className="text-[10px] text-zinc-400 mt-1">
              Secondary: {productData.tearSheet.secondaryFriction}
            </div>
          </div>
        </div>

        {/* Actionable Strategic Fix */}
        <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-3.5 text-xs">
          <div className="font-semibold text-amber-900 flex items-center space-x-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Pre-Flight Optimization Recommendation</span>
          </div>
          <p className="text-amber-800 leading-relaxed">
            {productData.tearSheet.keyRecommendation}
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. THEN WE EXPLAIN (Why this replaces focus groups & smoke tests) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-xs space-y-1.5">
          <div className="text-xs font-semibold text-zinc-900 flex items-center space-x-1.5">
            <Scale className="w-3.5 h-3.5 text-zinc-500" />
            <span>1. Replaces Unreliable Focus Groups</span>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Traditional focus groups suffer from stated-preference bias: users say "I would buy that" because it costs nothing. DropSim agents operate with bounded virtual bankrolls, utility trade-offs, and competing alternatives.
          </p>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-xs space-y-1.5">
          <div className="text-xs font-semibold text-zinc-900 flex items-center space-x-1.5">
            <Flame className="w-3.5 h-3.5 text-zinc-500" />
            <span>2. Eliminates "Smoke-Test" Ad Burn</span>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Fake landing pages and mock ad funnels burn customer goodwill and alienate prospective early adopters. DropSim stages the drop in a closed-loop synthetic social ecosystem with zero brand reputational risk.
          </p>
        </div>

        <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-xs space-y-1.5">
          <div className="text-xs font-semibold text-zinc-900 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
            <span>3. 48-Hour Pre-Flight Tear-Sheet</span>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Delivers adversarial friction diagnostics 48 hours before public launch—uncovering price resistance, claim disbelief, and checkout friction before real marketing dollars are deployed.
          </p>
        </div>
      </div>
    </div>
  );
};

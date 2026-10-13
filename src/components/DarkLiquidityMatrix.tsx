import React, { useState } from 'react';
import { 
  EyeOff, 
  ShieldCheck, 
  Cpu, 
  Filter, 
  Search, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Lock, 
  CheckCircle2, 
  Clock, 
  Zap,
  Globe,
  SlidersHorizontal
} from 'lucide-react';
import type { BlindedOrder } from '../types/commodities';
import { MOCK_BLINDED_ORDERS, COMMODITIES } from '../data/mockData';

interface DarkLiquidityMatrixProps {
  onSelectOrderForNegotiation: (order: BlindedOrder) => void;
}

export const DarkLiquidityMatrix: React.FC<DarkLiquidityMatrixProps> = ({
  onSelectOrderForNegotiation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSide, setSelectedSide] = useState<'ALL' | 'BUY' | 'SELL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredOrders = MOCK_BLINDED_ORDERS.filter((order) => {
    const comm = COMMODITIES.find((c) => c.id === order.commodityId);
    if (!comm) return false;

    if (selectedCategory !== 'ALL' && comm.category !== selectedCategory) {
      return false;
    }
    if (selectedSide !== 'ALL' && order.side !== selectedSide) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        comm.name.toLowerCase().includes(q) ||
        comm.ticker.toLowerCase().includes(q) ||
        order.deliveryPort.toLowerCase().includes(q) ||
        order.blindedAddress.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-3">
              <EyeOff className="w-3.5 h-3.5" />
              <span>Blinded Physical OTC Dark Pool</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Shielded RFQ Matrix & Verified Sovereign Liquidity
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-3xl leading-relaxed">
              Global physical commodity volumes published as cryptographic commitments. Counterparty corporate balance sheets and vessel tracking remain completely shielded until sovereign agents converge on terms and lock escrow.
            </p>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono">
            <div className="bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl">
              <div className="text-slate-400 text-[10px] uppercase">Shielded Pool Depth</div>
              <div className="text-emerald-400 font-bold text-base mt-0.5">$2,418,920,000</div>
            </div>
            <div className="bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl">
              <div className="text-slate-400 text-[10px] uppercase">ZK Validated Quotes</div>
              <div className="text-white font-bold text-base mt-0.5">100% Math Verified</div>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex bg-slate-950 border border-slate-800 rounded-xl p-1 text-xs font-mono">
              {['ALL', 'Energy', 'Metals', 'Critical Minerals', 'Agriculture'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex bg-slate-950 border border-slate-800 rounded-xl p-1 text-xs font-mono">
              {(['ALL', 'BUY', 'SELL'] as const).map((side) => (
                <button
                  key={side}
                  onClick={() => setSelectedSide(side)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    selectedSide === side
                      ? side === 'BUY'
                        ? 'bg-blue-950 text-blue-400 border border-blue-800'
                        : side === 'SELL'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-slate-800 text-white border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {side}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search commodity, port, ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 w-64"
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 text-[11px] uppercase">
                <th className="py-3.5 px-4 font-semibold">Side & Blinded ID</th>
                <th className="py-3.5 px-4 font-semibold">Commodity Cargo</th>
                <th className="py-3.5 px-4 font-semibold">Allocated Volume</th>
                <th className="py-3.5 px-4 font-semibold">Indicative Collar Range</th>
                <th className="py-3.5 px-4 font-semibold">Delivery Port & Laycan</th>
                <th className="py-3.5 px-4 font-semibold">ZK Verification</th>
                <th className="py-3.5 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    No active blinded orders match your current filters.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const comm = COMMODITIES.find((c) => c.id === order.commodityId);
                  if (!comm) return null;

                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-slate-850/50 transition-colors group"
                    >
                      {/* Side & Blinded ID */}
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              order.side === 'BUY'
                                ? 'bg-blue-950/80 text-blue-400 border border-blue-800/60'
                                : 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                            }`}
                          >
                            {order.side}
                          </span>
                          <span className="text-white font-bold tracking-wider">{order.blindedAddress}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1 flex items-center space-x-1">
                          <Cpu className="w-3 h-3 text-cyan-400" />
                          <span>{order.enclaveSecurityLevel} Enclave</span>
                          <span>•</span>
                          <span>{order.timestamp}</span>
                        </div>
                      </td>

                      {/* Commodity */}
                      <td className="py-4 px-4">
                        <div className="text-slate-200 font-semibold">{comm.name}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5 flex items-center space-x-2">
                          <span className="text-emerald-400">{comm.ticker}</span>
                          <span>•</span>
                          <span>{comm.category}</span>
                        </div>
                      </td>

                      {/* Volume */}
                      <td className="py-4 px-4">
                        <div className="text-white font-bold">{order.volume.toLocaleString()}</div>
                        <div className="text-[10px] text-slate-400">{order.unit}</div>
                      </td>

                      {/* Collar Range */}
                      <td className="py-4 px-4">
                        <div className="text-emerald-300 font-bold">
                          ${order.indicativeCollar.min.toFixed(2)} - ${order.indicativeCollar.max.toFixed(2)}
                        </div>
                        <div className="text-[10px] text-slate-400">USD / {order.unit}</div>
                      </td>

                      {/* Delivery Port & Laycan */}
                      <td className="py-4 px-4">
                        <div className="text-slate-200 flex items-center space-x-1">
                          <Globe className="w-3 h-3 text-slate-400" />
                          <span>{order.deliveryPort}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{order.laycanWindow}</div>
                      </td>

                      {/* ZK Verification */}
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          {order.pofStatus && (
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>ZK-POF Valid ($ Escrow)</span>
                            </span>
                          )}
                          {order.popStatus && (
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] bg-cyan-950/60 text-cyan-400 border border-cyan-800/40">
                              <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                              <span>ZK-POP Valid (Cargo Title)</span>
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => onSelectOrderForNegotiation(order)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/30 hover:border-emerald-500 font-semibold text-xs transition-all flex items-center space-x-1 ml-auto"
                        >
                          <Zap className="w-3 h-3" />
                          <span>Deploy Agent</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

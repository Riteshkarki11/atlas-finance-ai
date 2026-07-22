'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import TerminalSidebar from '@/components/TerminalSidebar';
import TerminalHeader from '@/components/TerminalHeader';

interface PeerMetric {
  ticker: string;
  name: string;
  price: string;
  mcap: string;
  pe: string;
  evEbitda: string;
  grossMargin: string;
  operatingMargin: string;
  roe: string;
  roic: string;
  netDebtEbitda: string;
  dcfUpside: string;
  aiScore: number;
  recommendation: 'BUY' | 'HOLD' | 'SELL';
}

const PEER_DATA: PeerMetric[] = [
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corp.',
    price: '$138.70',
    mcap: '$3.41T',
    pe: '42.1x',
    evEbitda: '34.2x',
    grossMargin: '72.4%',
    operatingMargin: '54.2%',
    roe: '48.2%',
    roic: '38.4%',
    netDebtEbitda: '0.12x',
    dcfUpside: '+18.4%',
    aiScore: 94,
    recommendation: 'BUY',
  },
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: '$224.30',
    mcap: '$3.28T',
    pe: '31.4x',
    evEbitda: '24.1x',
    grossMargin: '45.8%',
    operatingMargin: '30.2%',
    roe: '147.2%',
    roic: '54.2%',
    netDebtEbitda: '0.45x',
    dcfUpside: '+4.2%',
    aiScore: 82,
    recommendation: 'HOLD',
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corp.',
    price: '$448.90',
    mcap: '$3.12T',
    pe: '36.8x',
    evEbitda: '25.6x',
    grossMargin: '69.8%',
    operatingMargin: '44.6%',
    roe: '38.5%',
    roic: '28.1%',
    netDebtEbitda: '0.22x',
    dcfUpside: '+12.1%',
    aiScore: 91,
    recommendation: 'BUY',
  },
  {
    ticker: 'AMZN',
    name: 'Amazon.com Inc.',
    price: '$186.50',
    mcap: '$1.94T',
    pe: '41.0x',
    evEbitda: '18.2x',
    grossMargin: '48.2%',
    operatingMargin: '10.8%',
    roe: '21.4%',
    roic: '14.5%',
    netDebtEbitda: '0.85x',
    dcfUpside: '+22.5%',
    aiScore: 88,
    recommendation: 'BUY',
  },
];

export default function ComparePage() {
  const [selectedPeers, setSelectedPeers] = useState<string[]>(['NVDA', 'AAPL', 'MSFT', 'AMZN']);
  const [newTicker, setNewTicker] = useState('');

  const handleAddTicker = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTicker.trim() && selectedPeers.length < 5) {
      const formatted = newTicker.trim().toUpperCase();
      if (!selectedPeers.includes(formatted)) {
        setSelectedPeers([...selectedPeers, formatted]);
      }
      setNewTicker('');
    }
  };

  const handleRemove = (ticker: string) => {
    setSelectedPeers(selectedPeers.filter((t) => t !== ticker));
  };

  const activePeers = PEER_DATA.filter((p) => selectedPeers.includes(p.ticker));

  return (
    <div className="flex min-h-screen bg-[#0D0F11] text-[#F7F6F2] font-sans">
      <TerminalSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TerminalHeader />

        <main className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2D3139] pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs mono text-[#8C9097] uppercase">
                <span>Peer Intelligence</span>
                <span>•</span>
                <span className="text-[#B8892B]">Comparative Comps Desk</span>
              </div>
              <h1 className="serif text-2xl font-bold text-white mt-1">
                Multi-Company Peer Benchmarking
              </h1>
            </div>

            {/* Quick Add Ticker Form */}
            <form onSubmit={handleAddTicker} className="flex gap-2 text-xs mono">
              <input
                type="text"
                placeholder="Add ticker (e.g. GOOGL)..."
                value={newTicker}
                onChange={(e) => setNewTicker(e.target.value)}
                className="px-3 py-1.5 bg-[#14171B] border border-[#2D3139] text-white uppercase focus:outline-none focus:border-[#1B5E4A] rounded"
              />
              <button
                type="submit"
                disabled={selectedPeers.length >= 5}
                className="px-4 py-1.5 bg-[#1B5E4A] hover:bg-[#144738] text-white font-bold rounded uppercase transition-colors disabled:opacity-50"
              >
                + Add Target
              </button>
            </form>
          </div>

          {/* Peer Matrix Table */}
          <div className="bg-[#14171B] border border-[#2D3139] rounded-sm p-4 overflow-x-auto">
            <table className="w-full text-left text-xs mono">
              <thead>
                <tr className="border-b border-[#2D3139] text-[#8C9097] uppercase">
                  <th className="pb-3 w-48">Financial Metric</th>
                  {activePeers.map((peer) => (
                    <th key={peer.ticker} className="pb-3 min-w-[160px]">
                      <div className="flex justify-between items-center pr-2">
                        <div>
                          <span className="font-bold text-white block text-sm">{peer.ticker}</span>
                          <span className="text-[10px] text-[#8C9097] font-normal block">{peer.name}</span>
                        </div>
                        {selectedPeers.length > 2 && (
                          <button
                            onClick={() => handleRemove(peer.ticker)}
                            className="text-[#D98E85] hover:text-white text-xs p-1"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#212529]">
                {/* Market Data Category */}
                <tr className="bg-[#0D0F11]">
                  <td colSpan={activePeers.length + 1} className="py-2 px-2 text-[#B8892B] font-bold uppercase text-[10px]">
                    1. Valuation & Market Capitalization
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 text-[#8C9097] font-semibold">Share Price</td>
                  {activePeers.map((p) => (<td key={p.ticker} className="py-2.5 font-bold text-white">{p.price}</td>))}
                </tr>
                <tr>
                  <td className="py-2.5 text-[#8C9097]">Market Cap</td>
                  {activePeers.map((p) => (<td key={p.ticker} className="py-2.5 text-[#C5C8D0]">{p.mcap}</td>))}
                </tr>
                <tr>
                  <td className="py-2.5 text-[#8C9097]">P/E Multiple (NTM)</td>
                  {activePeers.map((p) => (<td key={p.ticker} className="py-2.5 text-[#C5C8D0]">{p.pe}</td>))}
                </tr>
                <tr>
                  <td className="py-2.5 text-[#8C9097]">EV / EBITDA</td>
                  {activePeers.map((p) => (<td key={p.ticker} className="py-2.5 text-[#C5C8D0]">{p.evEbitda}</td>))}
                </tr>

                {/* Profitability & Returns Category */}
                <tr className="bg-[#0D0F11]">
                  <td colSpan={activePeers.length + 1} className="py-2 px-2 text-[#B8892B] font-bold uppercase text-[10px]">
                    2. Profitability & Capital Efficiency
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 text-[#8C9097]">Gross Margin</td>
                  {activePeers.map((p) => (<td key={p.ticker} className="py-2.5 text-white font-semibold">{p.grossMargin}</td>))}
                </tr>
                <tr>
                  <td className="py-2.5 text-[#8C9097]">Operating Margin</td>
                  {activePeers.map((p) => (<td key={p.ticker} className="py-2.5 text-white font-semibold">{p.operatingMargin}</td>))}
                </tr>
                <tr>
                  <td className="py-2.5 text-[#8C9097]">Return on Invested Capital (ROIC)</td>
                  {activePeers.map((p) => (<td key={p.ticker} className="py-2.5 font-bold text-[#7FBF9E]">{p.roic}</td>))}
                </tr>
                <tr>
                  <td className="py-2.5 text-[#8C9097]">Return on Equity (ROE)</td>
                  {activePeers.map((p) => (<td key={p.ticker} className="py-2.5 text-white">{p.roe}</td>))}
                </tr>

                {/* Balance Sheet Risk */}
                <tr className="bg-[#0D0F11]">
                  <td colSpan={activePeers.length + 1} className="py-2 px-2 text-[#B8892B] font-bold uppercase text-[10px]">
                    3. Leverage & Risk
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 text-[#8C9097]">Net Debt / EBITDA</td>
                  {activePeers.map((p) => (<td key={p.ticker} className="py-2.5 text-[#C5C8D0]">{p.netDebtEbitda}</td>))}
                </tr>

                {/* DCF Valuation & AI Score */}
                <tr className="bg-[#0D0F11]">
                  <td colSpan={activePeers.length + 1} className="py-2 px-2 text-[#B8892B] font-bold uppercase text-[10px]">
                    4. Atlas Terminal Synthesis
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 text-[#8C9097] font-semibold">DCF Intrinsic Upside</td>
                  {activePeers.map((p) => (
                    <td key={p.ticker} className={`py-2.5 font-bold ${p.dcfUpside.startsWith('+') ? 'text-[#7FBF9E]' : 'text-[#D98E85]'}`}>
                      {p.dcfUpside}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 text-[#8C9097] font-semibold">AI Conviction Score</td>
                  {activePeers.map((p) => (
                    <td key={p.ticker} className="py-2.5">
                      <span className="px-2 py-0.5 bg-[#1B5E4A] text-white font-bold rounded">
                        {p.aiScore} / 100
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2.5 text-[#8C9097] font-semibold">Deal Rating</td>
                  {activePeers.map((p) => (
                    <td key={p.ticker} className="py-2.5">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${p.recommendation === 'BUY' ? 'bg-[#1B5E4A] text-white' : 'bg-[#B8892B] text-black'}`}>
                        {p.recommendation}
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
'use client';

import React, { useState } from 'react';

interface WatchlistPeer {
  ticker: string;
  name: string;
  price: string;
  pe: number;
  pb: number;
  roe: number;
  debtToEquity: number;
  evEbitda: number;
}

const SECTOR_GROUPS: Record<string, WatchlistPeer[]> = {
  'Banking Sector (India)': [
    { ticker: 'SBIN.NS', name: 'State Bank of India', price: '₹842.50', pe: 10.2, pb: 1.45, roe: 18.2, debtToEquity: 1.12, evEbitda: 8.4 },
    { ticker: 'HDFCBANK.NS', name: 'HDFC Bank Ltd', price: '₹1,620.00', pe: 18.5, pb: 2.62, roe: 16.8, debtToEquity: 0.85, evEbitda: 13.2 },
    { ticker: 'PNB.NS', name: 'Punjab National Bank', price: '₹122.40', pe: 11.4, pb: 0.98, roe: 12.1, debtToEquity: 1.25, evEbitda: 9.1 },
  ],
  'Global Tech Giants': [
    { ticker: 'NVDA', name: 'NVIDIA Corporation', price: '$135.20', pe: 72.8, pb: 48.2, roe: 115.4, debtToEquity: 0.42, evEbitda: 54.1 },
    { ticker: 'MSFT', name: 'Microsoft Corporation', price: '$448.90', pe: 36.2, pb: 12.8, roe: 38.5, debtToEquity: 0.28, evEbitda: 24.6 },
    { ticker: 'AAPL', name: 'Apple Inc.', price: '$224.30', pe: 33.1, pb: 50.4, roe: 145.2, debtToEquity: 1.45, evEbitda: 25.1 },
  ]
};

export default function SectorWatchlist() {
  const [selectedSector, setSelectedSector] = useState('Banking Sector (India)');
  const peerList = SECTOR_GROUPS[selectedSector];

  return (
    <div className="bg-[#14171B] border border-[#2D3139] p-5 rounded-sm space-y-4 font-mono text-xs">
      
      {/* Header & Sector Switcher */}
      <div className="flex flex-wrap justify-between items-center gap-4 border-b border-[#2D3139] pb-3">
        <h3 className="text-sm font-bold text-[#B8892B] uppercase">
          Sector Comparison Watchlist
        </h3>

        <div className="flex gap-2">
          {Object.keys(SECTOR_GROUPS).map((group) => (
            <button
              key={group}
              onClick={() => setSelectedSector(group)}
              className={`px-3 py-1.5 rounded-sm transition-colors ${
                selectedSector === group 
                  ? 'bg-[#B8892B] text-black font-bold' 
                  : 'bg-[#0D0F11] border border-[#2D3139] text-[#8C9097] hover:text-white'
              }`}
            >
              {group}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Grid Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0D0F11] border-b border-[#2D3139] text-[#8C9097]">
              <th className="p-3">Company Ticker</th>
              <th className="p-3 text-right">Price</th>
              <th className="p-3 text-right">P/E Ratio</th>
              <th className="p-3 text-right">P/B Ratio</th>
              <th className="p-3 text-right">EV/EBITDA</th>
              <th className="p-3 text-right text-[#7FBF9E]">ROE %</th>
              <th className="p-3 text-right">Debt / Equity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2D3139]/40 text-[#C5C8D0]">
            {peerList.map((peer) => (
              <tr key={peer.ticker} className="hover:bg-[#1F232B] transition-colors">
                <td className="p-3">
                  <span className="font-bold text-white block">{peer.ticker}</span>
                  <span className="text-[10px] text-[#8C9097]">{peer.name}</span>
                </td>
                <td className="p-3 text-right font-serif font-bold text-white">{peer.price}</td>
                <td className="p-3 text-right font-mono">{peer.pe}x</td>
                <td className="p-3 text-right font-mono">{peer.pb}x</td>
                <td className="p-3 text-right font-mono">{peer.evEbitda}x</td>
                <td className="p-3 text-right font-mono text-[#7FBF9E] font-bold">{peer.roe}%</td>
                <td className="p-3 text-right font-mono">{peer.debtToEquity}x</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
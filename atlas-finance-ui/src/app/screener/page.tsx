'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import TerminalSidebar from '@/components/TerminalSidebar';
import TerminalHeader from '@/components/TerminalHeader';

const SCREENER_RESULTS = [
  { ticker: 'NVDA', name: 'NVIDIA Corp', sector: 'Technology', mcap: '$3.41T', pe: 42.1, roic: '38.4%', dcfDiscount: '+18.4%', aiScore: 94 },
  { ticker: 'AAPL', name: 'Apple Inc', sector: 'Technology', mcap: '$3.28T', pe: 31.4, roic: '54.2%', dcfDiscount: '+4.2%', aiScore: 82 },
  { ticker: 'MSFT', name: 'Microsoft Corp', sector: 'Technology', mcap: '$3.12T', pe: 36.8, roic: '28.1%', dcfDiscount: '+12.1%', aiScore: 91 },
  { ticker: 'AMZN', name: 'Amazon.com Inc', sector: 'Consumer Cyclical', mcap: '$1.94T', pe: 41.0, roic: '14.5%', dcfDiscount: '+22.5%', aiScore: 88 },
  { ticker: 'TSLA', name: 'Tesla Inc', sector: 'Automotive', mcap: '$670B', pe: 58.2, roic: '11.2%', dcfDiscount: '-12.0%', aiScore: 61 },
];

export default function ScreenerPage() {
  const [minScore, setMinScore] = useState(80);

  const filtered = SCREENER_RESULTS.filter((r) => r.aiScore >= minScore);

  return (
    <div className="flex min-h-screen bg-[#0D0F11] text-[#F7F6F2] font-sans">
      <TerminalSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TerminalHeader />

        <main className="p-6 space-y-6 overflow-y-auto flex-1">
          <div className="flex justify-between items-center border-b border-[#2D3139] pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs mono text-[#8C9097] uppercase">
                <span>Multi-Factor Screening</span>
                <span>•</span>
                <span className="text-[#B8892B]">Quantitative Equity Screener</span>
              </div>
              <h1 className="serif text-2xl font-bold text-white mt-1">
                Institutional Equity & Fundamental Screener
              </h1>
            </div>
          </div>

          <div className="bg-[#14171B] border border-[#2D3139] p-4 rounded-sm flex items-center gap-6 text-xs mono">
            <div>
              <label className="text-[#8C9097] block mb-1">Min AI Conviction Score ({minScore})</label>
              <input
                type="range"
                min="50"
                max="95"
                value={minScore}
                onChange={(e) => setMinScore(parseInt(e.target.value))}
                className="accent-[#1B5E4A] cursor-pointer"
              />
            </div>
          </div>

          <div className="bg-[#14171B] border border-[#2D3139] rounded-sm p-4">
            <table className="w-full text-left text-xs mono">
              <thead>
                <tr className="border-b border-[#2D3139] text-[#8C9097] uppercase">
                  <th className="pb-2">Ticker</th>
                  <th className="pb-2">Sector</th>
                  <th className="pb-2">Market Cap</th>
                  <th className="pb-2">P/E</th>
                  <th className="pb-2">ROIC</th>
                  <th className="pb-2">DCF Upside</th>
                  <th className="pb-2">AI Score</th>
                  <th className="pb-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#212529]">
                {filtered.map((stock) => (
                  <tr key={stock.ticker} className="hover:bg-[#1A1E24]">
                    <td className="py-3 font-bold text-white">
                      <Link href={`/company/${stock.ticker}`} className="hover:text-[#B8892B]">
                        {stock.ticker} <span className="text-[10px] text-[#8C9097] block font-normal">{stock.name}</span>
                      </Link>
                    </td>
                    <td className="py-3 text-[#C5C8D0]">{stock.sector}</td>
                    <td className="py-3">{stock.mcap}</td>
                    <td className="py-3">{stock.pe}x</td>
                    <td className="py-3 font-bold text-[#7FBF9E]">{stock.roic}</td>
                    <td className="py-3 font-bold text-[#7FBF9E]">{stock.dcfDiscount}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 bg-[#1B5E4A] text-white font-bold rounded">
                        {stock.aiScore}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <Link href={`/company/${stock.ticker}`} className="px-2.5 py-1 bg-[#212529] hover:bg-[#2D3139] text-white rounded">
                        Workspace
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
'use client';

import React, { useState } from 'react';

interface CompanyMetrics {
  ticker: string;
  name: string;
  sector: string;
  marketCap: string;
  price: number;
  intrinsicValue: number;
  upside: number;
  peRatio: number;
  wacc: number;
  signal: 'BUY' | 'HOLD' | 'SELL';
}

const STOCK_DATABASE: CompanyMetrics[] = [
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    sector: 'Semiconductors',
    marketCap: '$3.41T',
    price: 138.70,
    intrinsicValue: 164.30,
    upside: 18.4,
    peRatio: 48.2,
    wacc: 10.2,
    signal: 'BUY',
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    sector: 'Software — Infrastructure',
    marketCap: '$3.12T',
    price: 420.50,
    intrinsicValue: 462.00,
    upside: 9.8,
    peRatio: 35.1,
    wacc: 8.5,
    signal: 'BUY',
  },
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Consumer Electronics',
    marketCap: '$3.28T',
    price: 224.20,
    intrinsicValue: 210.00,
    upside: -6.3,
    peRatio: 32.4,
    wacc: 8.1,
    signal: 'HOLD',
  },
  {
    ticker: 'AMD',
    name: 'Advanced Micro Devices',
    sector: 'Semiconductors',
    marketCap: '$252.8B',
    price: 156.10,
    intrinsicValue: 185.00,
    upside: 18.5,
    peRatio: 112.5,
    wacc: 11.0,
    signal: 'BUY',
  },
  {
    ticker: 'INTC',
    name: 'Intel Corporation',
    sector: 'Semiconductors',
    marketCap: '$98.4B',
    price: 23.10,
    intrinsicValue: 18.50,
    upside: -19.9,
    peRatio: 88.2,
    wacc: 11.8,
    signal: 'SELL',
  },
];

export default function StockScreener() {
  const [filterSignal, setFilterSignal] = useState<string>('ALL');
  const [sortKey, setSortKey] = useState<keyof CompanyMetrics>('upside');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredStocks = STOCK_DATABASE.filter((stock) => {
    if (filterSignal === 'ALL') return true;
    return stock.signal === filterSignal;
  }).sort((a, b) => {
    const valA = a[sortKey];
    const valB = b[sortKey];

    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortOrder === 'desc' ? valB - valA : valA - valB;
    }
    return 0;
  });

  const toggleSort = (key: keyof CompanyMetrics) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  return (
    <section className="mt-16 border-t border-[#DBDAD2] pt-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="mono text-xs uppercase tracking-widest text-[#0F3B2E] mb-1">
            Comparative Valuation Engine
          </div>
          <h2 className="serif text-3xl font-semibold">Peer Valuation Screener & Signal Comparison</h2>
        </div>

        {/* Signal Filters */}
        <div className="flex border border-[#14171B] bg-[#F7F6F2] p-1 text-xs mono">
          {['ALL', 'BUY', 'HOLD', 'SELL'].map((sig) => (
            <button
              key={sig}
              onClick={() => setFilterSignal(sig)}
              className={`px-3 py-1 font-medium transition-colors cursor-pointer ${
                filterSignal === sig ? 'bg-[#14171B] text-[#F7F6F2]' : 'text-[#4A4E52] hover:text-[#14171B]'
              }`}
            >
              {sig}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="hazy-card shadow-[6px_6px_0_#0F3B2E] overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs mono">
          <thead>
            <tr className="bg-white/80 border-b border-[#DBDAD2] text-[#4A4E52] uppercase">
              <th className="p-3 border-r border-[#DBDAD2]">Ticker / Company</th>
              <th className="p-3 border-r border-[#DBDAD2]">Sector</th>
              <th className="p-3 border-r border-[#DBDAD2] text-right">Market Cap</th>
              <th className="p-3 border-r border-[#DBDAD2] text-right">Mkt Price</th>
              <th className="p-3 border-r border-[#DBDAD2] text-right">DCF Intrinsic</th>
              <th 
                onClick={() => toggleSort('upside')}
                className="p-3 border-r border-[#DBDAD2] text-right cursor-pointer hover:bg-black/5"
              >
                Upside / Downside {sortKey === 'upside' ? (sortOrder === 'desc' ? '↓' : '↑') : ''}
              </th>
              <th className="p-3 border-r border-[#DBDAD2] text-right">Applied WACC</th>
              <th className="p-3 text-center">Signal</th>
            </tr>
          </thead>
          <tbody>
            {filteredStocks.map((s) => (
              <tr key={s.ticker} className="border-b border-[#DBDAD2] hover:bg-white/50 transition-colors">
                <td className="p-3 border-r border-[#DBDAD2] font-semibold text-[#14171B]">
                  <span className="text-[#0F3B2E] font-bold mr-2">{s.ticker}</span>
                  <span className="text-[#4A4E52] font-normal hidden lg:inline">{s.name}</span>
                </td>
                <td className="p-3 border-r border-[#DBDAD2] text-[#4A4E52]">{s.sector}</td>
                <td className="p-3 border-r border-[#DBDAD2] text-right font-medium">{s.marketCap}</td>
                <td className="p-3 border-r border-[#DBDAD2] text-right">${s.price.toFixed(2)}</td>
                <td className="p-3 border-r border-[#DBDAD2] text-right font-bold text-[#0F3B2E]">
                  ${s.intrinsicValue.toFixed(2)}
                </td>
                <td className={`p-3 border-r border-[#DBDAD2] text-right font-bold ${
                  s.upside >= 0 ? 'text-[#1B5E4A]' : 'text-[#A0382B]'
                }`}>
                  {s.upside >= 0 ? `+${s.upside.toFixed(1)}%` : `${s.upside.toFixed(1)}%`}
                </td>
                <td className="p-3 border-r border-[#DBDAD2] text-right text-[#4A4E52]">{s.wacc}%</td>
                <td className="p-3 text-center">
                  <span className={`px-2 py-0.5 text-[10px] font-bold ${
                    s.signal === 'BUY'
                      ? 'bg-[#1B5E4A] text-[#F7F6F2]'
                      : s.signal === 'HOLD'
                      ? 'bg-[#B8892B] text-[#F7F6F2]'
                      : 'bg-[#A0382B] text-[#F7F6F2]'
                  }`}>
                    {s.signal}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
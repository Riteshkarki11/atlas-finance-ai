'use client';

import React, { useState } from 'react';

export default function HeroDashboard() {
  const [tickerInput, setTickerInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Default state initialized to NVDA
  const [activeData, setActiveData] = useState({
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 138.70,
    upside: 18.4,
    intrinsicValue: 164.30,
    wacc: 10.2,
    signal: 'BUY',
  });

  const [wacc, setWacc] = useState(10.2);

  // Fetch real live ticker data from our yahoo-finance2 API route
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tickerInput.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/quote?symbol=${encodeURIComponent(tickerInput.trim())}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Ticker not found');

      setActiveData({
        ticker: data.ticker,
        name: data.name,
        price: data.price,
        upside: data.upside,
        intrinsicValue: data.intrinsicValue,
        wacc: data.wacc,
        signal: data.signal,
      });
      setWacc(data.wacc);
      setTickerInput('');
    } catch (err: any) {
      setError(err.message || 'Error fetching ticker data');
    } finally {
      setLoading(false);
    }
  };

  // Dynamic intrinsic value calculation linked to WACC slider
  const dynamicIntrinsic = (activeData.intrinsicValue * (activeData.wacc / wacc)).toFixed(2);

  return (
    <div className="hazy-card shadow-[6px_6px_0_#0F3B2E] p-6 rounded-sm">
      {/* Header & Live Status */}
      <div className="flex justify-between items-center pb-3 border-b border-[#DBDAD2] mono text-xs text-[#4A4E52] uppercase">
        <span>DCF — {activeData.ticker} · Live Valuation</span>
        <div className="flex gap-1.5 items-center">
          <span className="w-2 h-2 rounded-full bg-[#1B5E4A] animate-pulse"></span>
          <span className="text-[#0F3B2E] font-bold">Yahoo Finance Feed</span>
        </div>
      </div>

      {/* Ticker Search Bar */}
      <form onSubmit={handleSearch} className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Search any ticker (e.g. TSLA, AAPL, AMZN, INFY.NS)..."
          value={tickerInput}
          onChange={(e) => setTickerInput(e.target.value)}
          className="flex-1 px-3 py-2 bg-white border border-[#14171B] text-xs mono uppercase placeholder:normal-case focus:outline-none focus:ring-1 focus:ring-[#0F3B2E]"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-[#14171B] text-[#F7F6F2] text-xs mono font-bold hover:bg-[#0F3B2E] transition-colors cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Fetching...' : 'Analyze'}
        </button>
      </form>
      {error && <p className="text-[#A0382B] text-[11px] mono mt-1">{error}</p>}

      {/* Company Name Banner */}
      <div className="mt-4 p-3 bg-white/50 border border-[#DBDAD2] flex justify-between items-center">
        <div>
          <span className="serif text-xl font-bold text-[#14171B] block">{activeData.ticker}</span>
          <span className="text-xs text-[#4A4E52]">{activeData.name}</span>
        </div>
        <span className={`px-2.5 py-1 text-xs mono font-bold text-white ${
          activeData.signal === 'BUY' ? 'bg-[#1B5E4A]' : activeData.signal === 'HOLD' ? 'bg-[#B8892B]' : 'bg-[#A0382B]'
        }`}>
          {activeData.signal}
        </span>
      </div>

      {/* Dynamic Slider */}
      <div className="my-4 p-3 bg-white/70 border border-[#DBDAD2]">
        <div className="flex justify-between text-xs font-medium mb-1">
          <span>WACC Assumption</span>
          <span className="mono text-[#0F3B2E] font-semibold">{wacc}%</span>
        </div>
        <input 
          type="range" 
          min="6" 
          max="15" 
          step="0.1" 
          value={wacc} 
          onChange={(e) => setWacc(parseFloat(e.target.value))}
          className="w-full accent-[#1B5E4A] cursor-pointer"
        />
      </div>

      {/* Metrics Ledger */}
      <div className="py-2 space-y-2 text-sm">
        <div className="flex justify-between border-b border-dashed border-[#DBDAD2] pb-1.5">
          <span>Live Market Price</span>
          <span className="mono font-semibold">${activeData.price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-b border-dashed border-[#DBDAD2] pb-1.5">
          <span>Implied Upside</span>
          <span className={`mono font-semibold ${activeData.upside >= 0 ? 'text-[#1B5E4A]' : 'text-[#A0382B]'}`}>
            {activeData.upside >= 0 ? `+${activeData.upside}%` : `${activeData.upside}%`}
          </span>
        </div>
      </div>

      {/* Calculated Result Box */}
      <div className="mt-4 p-4 bg-white/80 border border-[#DBDAD2]">
        <span className="text-xs uppercase tracking-wider text-[#4A4E52]">DCF Intrinsic Value / Share</span>
        <div className="serif text-4xl font-semibold text-[#0F3B2E] my-1 mono">
          ${dynamicIntrinsic}
        </div>
      </div>
    </div>
  );
}
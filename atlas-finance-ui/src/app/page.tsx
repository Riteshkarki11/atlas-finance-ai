'use client';

import React, { useState } from 'react';
import HeroDashboard from '@/components/HeroDashboard';
import FinancialStatements from '@/components/financials/FinancialStatements';
import FinancialChart from '@/components/FinancialChart';
import StockScreener from '@/components/StockScreener';
import SensitivityMatrix from '@/components/SensitivityMatrix';
import SignalAuditTrail from '@/components/SignalAuditTrail';
import PortfolioTracker from '@/components/PortfolioTracker';
import SettingsPanel from '@/components/SettingsPanel';
import Footer from '@/components/Footer';
import ValuationChart from '@/components/ValuationChart';
import ValuationSensitivityGrid from '@/components/ValuationSensitivityGrid';



// File: app/page.tsx

import SearchBar from '@/components/SearchBar';
import LiveCompanyView from '@/components/LiveCompanyView';

export default function Home() {
  const [activeTicker, setActiveTicker] = useState('NVDA');

  return (
    <div className="min-h-screen bg-[#08090A] text-zinc-100 font-sans antialiased">
      {/* Header with Live Search */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08090A]/80 backdrop-blur-xl px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-black text-sm">
            A
          </div>
          <span className="font-semibold text-lg text-white">Atlas Financial Intelligence</span>
        </div>

        {/* Dynamic Search Bar */}
        <SearchBar onSelectCompany={(ticker) => setActiveTicker(ticker)} />
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* Quick Ticker Shortcuts */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {['NVDA', 'MSFT', 'AAPL', 'RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS', 'TSLA'].map((ticker) => (
            <button
              key={ticker}
              onClick={() => setActiveTicker(ticker)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-semibold border transition-all ${
                activeTicker === ticker
                  ? 'bg-amber-500 text-black border-amber-400 shadow-md'
                  : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
              }`}
            >
              {ticker}
            </button>
          ))}
        </div>

        {/* Live Data Card */}
        <LiveCompanyView initialTicker={activeTicker} />
      </main>
    </div>
  );
}
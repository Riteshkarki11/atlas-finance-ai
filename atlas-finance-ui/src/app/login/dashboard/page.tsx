'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import TerminalSidebar from '@/components/TerminalSidebar';
import TerminalHeader from '@/components/TerminalHeader';

// Static market summary indices
const MARKET_INDICES = [
  { name: 'S&P 500', value: '5,582.40', change: '+0.42%', positive: true },
  { name: 'NASDAQ', value: '17,872.10', change: '+0.81%', positive: true },
  { name: 'DOW JONES', value: '40,842.15', change: '-0.12%', positive: false },
  { name: 'NIFTY 50', value: '24,478.20', change: '-0.15%', positive: false },
  { name: 'GOLD', value: '$2,412.80', change: '+0.65%', positive: true },
  { name: 'BRENT CRUDE', value: '$82.40', change: '+1.10%', positive: true },
  { name: 'BITCOIN', value: '$64,210.00', change: '+2.34%', positive: true },
  { name: 'USD/INR', value: '83.52', change: '+0.04%', positive: true },
];

// Top Watchlist Companies
const WATCHLIST = [
  { ticker: 'NVDA', name: 'NVIDIA Corp.', price: '$138.70', change: '+2.14%', pe: '42.1', aiSignal: 'BUY' },
  { ticker: 'AAPL', name: 'Apple Inc.', price: '$224.30', change: '-0.42%', pe: '31.4', aiSignal: 'HOLD' },
  { ticker: 'MSFT', name: 'Microsoft Corp.', price: '$448.90', change: '+0.95%', pe: '36.8', aiSignal: 'BUY' },
  { ticker: 'AMZN', name: 'Amazon.com Inc.', price: '$186.50', change: '+1.22%', pe: '41.0', aiSignal: 'BUY' },
  { ticker: 'TSLA', name: 'Tesla Inc.', price: '$210.80', change: '-3.15%', pe: '58.2', aiSignal: 'SELL' },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', price: '$178.40', change: '+0.60%', pe: '24.1', aiSignal: 'BUY' },
];

// Upcoming Economic Calendar Events
const ECONOMIC_CALENDAR = [
  { date: 'TODAY 14:00', event: 'FOMC Interest Rate Decision', forecast: '5.25%', prior: '5.25%', impact: 'HIGH' },
  { date: 'TOMORROW 08:30', event: 'US Core CPI (MoM)', forecast: '0.2%', prior: '0.3%', impact: 'HIGH' },
  { date: 'JUL 25', event: 'US Initial Jobless Claims', forecast: '238K', prior: '243K', impact: 'MED' },
  { date: 'JUL 26', event: 'US Q2 GDP (Annualized)', forecast: '2.1%', prior: '1.4%', impact: 'HIGH' },
];

export default function MissionControlDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1D' | '1W' | '1M' | 'YTD'>('1D');

  return (
    <div className="flex min-h-screen bg-[#0D0F11] text-[#F7F6F2] font-sans">
      {/* Sidebar Navigation */}
      <TerminalSidebar />

      {/* Main Terminal Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TerminalHeader />

        <main className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Header Title & Quick Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2D3139] pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs mono text-[#8C9097] uppercase">
                <span>Mission Control</span>
                <span>•</span>
                <span className="text-[#B8892B]">Live Terminal Feed</span>
              </div>
              <h1 className="serif text-2xl font-bold text-white mt-1">
                Global Markets & Executive Overview
              </h1>
            </div>

            <div className="flex items-center gap-2 text-xs mono">
              {(['1D', '1W', '1M', 'YTD'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`px-3 py-1.5 rounded transition-colors ${
                    selectedTimeframe === tf
                      ? 'bg-[#1B5E4A] text-white font-bold'
                      : 'bg-[#14171B] border border-[#2D3139] text-[#8C9097] hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* 1. Global Market Indices Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {MARKET_INDICES.map((idx) => (
              <div
                key={idx.name}
                className="bg-[#14171B] border border-[#2D3139] p-3 rounded-sm flex flex-col justify-between"
              >
                <span className="text-[10px] mono text-[#8C9097] font-semibold">{idx.name}</span>
                <div className="mt-1">
                  <div className="text-sm font-semibold mono text-white">{idx.value}</div>
                  <div
                    className={`text-[11px] mono font-bold ${
                      idx.positive ? 'text-[#7FBF9E]' : 'text-[#D98E85]'
                    }`}
                  >
                    {idx.change}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 2. Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Columns: Portfolio Summary & Watchlist */}
            <div className="lg:col-span-2 space-y-6">
              {/* Portfolio Performance Banner */}
              <div className="bg-[#14171B] border border-[#2D3139] p-5 rounded-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs mono uppercase text-[#8C9097]">Institutional Fund Strategy #1</span>
                    <h2 className="text-3xl font-bold mono text-white mt-1">$14,285,400.00</h2>
                  </div>
                  <div className="text-right">
                    <span className="text-xs mono uppercase text-[#8C9097]">Today's P&L</span>
                    <div className="text-lg font-bold mono text-[#7FBF9E]">+$184,200.00 (+1.31%)</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#212529] text-xs mono">
                  <div>
                    <span className="text-[#8C9097] block">CASH POSITION</span>
                    <span className="font-semibold text-white">$1,420,000 (9.9%)</span>
                  </div>
                  <div>
                    <span className="text-[#8C9097] block">PORTFOLIO BETA</span>
                    <span className="font-semibold text-white">1.12</span>
                  </div>
                  <div>
                    <span className="text-[#8C9097] block">SHARPE RATIO</span>
                    <span className="font-semibold text-[#B8892B]">2.14</span>
                  </div>
                </div>
              </div>

              {/* Watchlist Table */}
              <div className="bg-[#14171B] border border-[#2D3139] rounded-sm p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="serif text-lg font-bold text-white">Core Equity Watchlist</h3>
                  <Link href="/screener" className="text-xs mono text-[#B8892B] hover:underline">
                    View Full Screener →
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs mono">
                    <thead>
                      <tr className="border-b border-[#2D3139] text-[#8C9097] uppercase">
                        <th className="pb-2">Ticker</th>
                        <th className="pb-2">Price</th>
                        <th className="pb-2">Change</th>
                        <th className="pb-2">P/E</th>
                        <th className="pb-2">AI Signal</th>
                        <th className="pb-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#212529]">
                      {WATCHLIST.map((item) => (
                        <tr key={item.ticker} className="hover:bg-[#1A1E24] transition-colors">
                          <td className="py-3 font-bold text-white">
                            <Link href={`/company/${item.ticker}`} className="hover:text-[#B8892B]">
                              {item.ticker}
                              <span className="block text-[10px] font-normal text-[#8C9097]">
                                {item.name}
                              </span>
                            </Link>
                          </td>
                          <td className="py-3 font-semibold">{item.price}</td>
                          <td
                            className={`py-3 font-bold ${
                              item.change.startsWith('+') ? 'text-[#7FBF9E]' : 'text-[#D98E85]'
                            }`}
                          >
                            {item.change}
                          </td>
                          <td className="py-3 text-[#C5C8D0]">{item.pe}x</td>
                          <td className="py-3">
                            <span
                              className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                                item.aiSignal === 'BUY'
                                  ? 'bg-[#1B5E4A] text-white'
                                  : item.aiSignal === 'HOLD'
                                  ? 'bg-[#B8892B] text-black'
                                  : 'bg-[#A0382B] text-white'
                              }`}
                            >
                              {item.aiSignal}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <Link
                              href={`/company/${item.ticker}`}
                              className="px-2.5 py-1 bg-[#212529] hover:bg-[#2D3139] text-white rounded text-[10px]"
                            >
                              Workspace
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column: Top AI Signal & Macro Calendar */}
            <div className="space-y-6">
              {/* Highlight AI Signal */}
              <div className="bg-[#14171B] border border-[#1B5E4A] p-5 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#1B5E4A] text-white px-3 py-1 text-[9px] mono font-bold uppercase">
                  Top Conviction Signal
                </div>
                <div className="text-xs mono text-[#8C9097] uppercase mb-1">AI Recommendation Engine</div>
                <h3 className="serif text-xl font-bold text-white">NVIDIA Corporation (NVDA)</h3>

                <div className="my-4 flex items-baseline gap-3">
                  <span className="serif text-3xl font-bold text-[#7FBF9E]">BUY</span>
                  <span className="text-xs mono text-[#C5C8D0]">Confidence Score: <strong className="text-white">89%</strong></span>
                </div>

                <p className="text-xs text-[#C5C8D0] leading-relaxed mb-4">
                  DCF valuation model indicates a <strong className="text-[#7FBF9E]">18.4% potential upside</strong> ($164.30 intrinsic value vs $138.70 current market price), backed by accelerating Blackwell architecture demand and enterprise AI CapEx expansion.
                </p>

                <Link
                  href="/models/dcf"
                  className="block text-center w-full py-2 bg-[#1B5E4A] hover:bg-[#144738] text-white font-bold text-xs mono uppercase rounded transition-colors"
                >
                  Inspect Valuation Model →
                </Link>
              </div>

              {/* Macro Economic Calendar */}
              <div className="bg-[#14171B] border border-[#2D3139] p-4 rounded-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="serif text-base font-bold text-white">Macro Calendar</h3>
                  <span className="text-[10px] mono text-[#8C9097]">EST TIME</span>
                </div>

                <div className="space-y-3 text-xs mono">
                  {ECONOMIC_CALENDAR.map((cal, i) => (
                    <div key={i} className="p-2.5 bg-[#0D0F11] border border-[#212529] rounded">
                      <div className="flex justify-between text-[10px] text-[#8C9097] mb-1">
                        <span>{cal.date}</span>
                        <span
                          className={`font-bold ${
                            cal.impact === 'HIGH' ? 'text-[#D98E85]' : 'text-[#B8892B]'
                          }`}
                        >
                          {cal.impact} IMPACT
                        </span>
                      </div>
                      <div className="font-semibold text-white">{cal.event}</div>
                      <div className="flex justify-between text-[10px] text-[#8C9097] mt-1.5 pt-1 border-t border-[#1F2329]">
                        <span>Fcst: {cal.forecast}</span>
                        <span>Prior: {cal.prior}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
'use client';

import React from 'react';
import Link from 'next/link'; // <--- Added missing Next.js Link import
import TerminalSidebar from '@/components/TerminalSidebar';
import TerminalHeader from '@/components/TerminalHeader';

interface Holding {
  ticker: string;
  name: string;
  shares: string;
  price: string;
  weight: string;
  val: string;
  pnl: string;
}

const HOLDINGS: Holding[] = [
  { ticker: 'NVDA', name: 'NVIDIA Corp', shares: '25,000', price: '$138.70', weight: '24.2%', val: '$3,467,500', pnl: '+$420,100' },
  { ticker: 'MSFT', name: 'Microsoft Corp', shares: '7,500', price: '$448.90', weight: '23.5%', val: '$3,366,750', pnl: '+$185,200' },
  { ticker: 'AAPL', name: 'Apple Inc', shares: '12,000', price: '$224.30', weight: '18.8%', val: '$2,691,600', pnl: '-$32,400' },
  { ticker: 'AMZN', name: 'Amazon.com Inc', shares: '14,000', price: '$186.50', weight: '18.2%', val: '$2,611,000', pnl: '+$112,000' },
  { ticker: 'CASH', name: 'USD Reserve', shares: '---', price: '1.00', weight: '15.3%', val: '$2,148,550', pnl: '0.00' },
];

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen bg-[#0D0F11] text-[#F7F6F2] font-sans">
      <TerminalSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TerminalHeader />

        <main className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-[#2D3139] pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs mono text-[#8C9097] uppercase">
                <span>Asset Management</span>
                <span>•</span>
                <span className="text-[#B8892B]">Institutional Fund Analytics</span>
              </div>
              <h1 className="serif text-2xl font-bold text-white mt-1">
                Portfolio Holdings & Value at Risk (VaR)
              </h1>
            </div>
          </div>

          {/* Risk Metrics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs mono">
            <div className="bg-[#14171B] border border-[#2D3139] p-4 rounded-sm">
              <span className="text-[#8C9097] block uppercase text-[10px]">Total Assets Under Management</span>
              <div className="text-2xl font-bold text-white my-1">$14,285,400</div>
              <span className="text-[#7FBF9E] font-semibold">+$184,200 Today (+1.31%)</span>
            </div>

            <div className="bg-[#14171B] border border-[#2D3139] p-4 rounded-sm">
              <span className="text-[#8C9097] block uppercase text-[10px]">Daily Value at Risk (95% VaR)</span>
              <div className="text-2xl font-bold text-[#D98E85] my-1">$214,200</div>
              <span className="text-[#8C9097]">1.50% Maximum Projected Daily Loss</span>
            </div>

            <div className="bg-[#14171B] border border-[#2D3139] p-4 rounded-sm">
              <span className="text-[#8C9097] block uppercase text-[10px]">Portfolio Sharpe Ratio</span>
              <div className="text-2xl font-bold text-[#B8892B] my-1">2.14</div>
              <span className="text-[#8C9097]">Benchmark: S&P 500 (1.42)</span>
            </div>

            <div className="bg-[#14171B] border border-[#2D3139] p-4 rounded-sm">
              <span className="text-[#8C9097] block uppercase text-[10px]">Portfolio Beta</span>
              <div className="text-2xl font-bold text-white my-1">1.12</div>
              <span className="text-[#8C9097]">Aggressive Growth Allocation</span>
            </div>
          </div>

          {/* Holdings Table */}
          <div className="bg-[#14171B] border border-[#2D3139] rounded-sm p-4 text-xs mono">
            <h3 className="serif text-base font-bold text-white mb-3">Core Position Breakdown</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#2D3139] text-[#8C9097] uppercase">
                  <th className="pb-2">Asset</th>
                  <th className="pb-2">Shares</th>
                  <th className="pb-2">Market Price</th>
                  <th className="pb-2">Weight</th>
                  <th className="pb-2">Position Value</th>
                  <th className="pb-2 text-right">Unrealized P&L</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#212529]">
                {HOLDINGS.map((h) => (
                  <tr key={h.ticker} className="hover:bg-[#1A1E24] transition-colors">
                    <td className="py-3 font-bold text-white">
                      {h.ticker !== 'CASH' ? (
                        <Link href={`/company/${h.ticker}`} className="hover:text-[#B8892B] transition-colors">
                          {h.ticker}
                          <span className="text-[10px] text-[#8C9097] font-normal block">{h.name}</span>
                        </Link>
                      ) : (
                        <div>
                          {h.ticker}
                          <span className="text-[10px] text-[#8C9097] font-normal block">{h.name}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3 text-[#C5C8D0]">{h.shares}</td>
                    <td className="py-3">{h.price}</td>
                    <td className="py-3 font-semibold text-[#B8892B]">{h.weight}</td>
                    <td className="py-3 font-bold text-white">{h.val}</td>
                    <td className={`py-3 text-right font-bold ${
                      h.pnl.startsWith('+') ? 'text-[#7FBF9E]' : h.pnl.startsWith('-') ? 'text-[#D98E85]' : 'text-white'
                    }`}>
                      {h.pnl}
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
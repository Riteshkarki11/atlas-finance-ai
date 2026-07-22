'use client';

import React, { useState } from 'react';

interface Position {
  symbol: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  targetPrice: number;
}

const INITIAL_POSITIONS: Position[] = [
  { symbol: 'NVDA', shares: 150, avgCost: 110.50, currentPrice: 138.70, targetPrice: 164.30 },
  { symbol: 'MSFT', shares: 45, avgCost: 380.00, currentPrice: 420.50, targetPrice: 462.00 },
  { symbol: 'AMD', shares: 80, avgCost: 140.20, currentPrice: 156.10, targetPrice: 185.00 },
];

export default function PortfolioTracker() {
  const [positions] = useState<Position[]>(INITIAL_POSITIONS);

  const totalValue = positions.reduce((acc, p) => acc + p.shares * p.currentPrice, 0);
  const totalCost = positions.reduce((acc, p) => acc + p.shares * p.avgCost, 0);
  const totalGain = totalValue - totalCost;
  const gainPercentage = (totalGain / totalCost) * 100;

  return (
    <section className="mt-16 border-t border-[#DBDAD2] pt-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="mono text-xs uppercase tracking-widest text-[#0F3B2E] mb-1">
            Institutional Portfolio Module
          </div>
          <h2 className="serif text-3xl font-semibold">Tracked Positions & Target Upsides</h2>
        </div>

        {/* Portfolio Quick Stats */}
        <div className="flex gap-4 mono text-xs">
          <div className="bg-white/80 p-3 border border-[#DBDAD2] hazy-card">
            <span className="text-[#4A4E52] block">Total Value</span>
            <span className="font-bold text-sm text-[#0F3B2E]">${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </div>
          <div className="bg-white/80 p-3 border border-[#DBDAD2] hazy-card">
            <span className="text-[#4A4E52] block">Unrealized P&L</span>
            <span className={`font-bold text-sm ${totalGain >= 0 ? 'text-[#1B5E4A]' : 'text-[#9C3B32]'}`}>
              {totalGain >= 0 ? '+' : ''}${totalGain.toLocaleString(undefined, { maximumFractionDigits: 2 })} ({gainPercentage.toFixed(1)}%)
            </span>
          </div>
        </div>
      </div>

      <div className="hazy-card shadow-[6px_6px_0_#0F3B2E] overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs mono">
          <thead>
            <tr className="bg-white/80 border-b border-[#DBDAD2] text-[#4A4E52] uppercase">
              <th className="p-3 border-r border-[#DBDAD2]">Position</th>
              <th className="p-3 border-r border-[#DBDAD2] text-right">Shares</th>
              <th className="p-3 border-r border-[#DBDAD2] text-right">Avg Cost</th>
              <th className="p-3 border-r border-[#DBDAD2] text-right">Current Price</th>
              <th className="p-3 border-r border-[#DBDAD2] text-right">DCF Target</th>
              <th className="p-3 border-r border-[#DBDAD2] text-right">Unrealized P&L</th>
              <th className="p-3 text-right">Target Upside</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DBDAD2]">
            {positions.map((p) => {
              const posValue = p.shares * p.currentPrice;
              const posCost = p.shares * p.avgCost;
              const posGain = posValue - posCost;
              const targetUpside = ((p.targetPrice - p.currentPrice) / p.currentPrice) * 100;

              return (
                <tr key={p.symbol} className="hover:bg-white/50">
                  <td className="p-3 border-r border-[#DBDAD2] font-bold text-[#0F3B2E]">{p.symbol}</td>
                  <td className="p-3 border-r border-[#DBDAD2] text-right">{p.shares}</td>
                  <td className="p-3 border-r border-[#DBDAD2] text-right">${p.avgCost.toFixed(2)}</td>
                  <td className="p-3 border-r border-[#DBDAD2] text-right">${p.currentPrice.toFixed(2)}</td>
                  <td className="p-3 border-r border-[#DBDAD2] text-right font-semibold">${p.targetPrice.toFixed(2)}</td>
                  <td className={`p-3 border-r border-[#DBDAD2] text-right font-semibold ${posGain >= 0 ? 'text-[#1B5E4A]' : 'text-[#9C3B32]'}`}>
                    {posGain >= 0 ? '+' : ''}${posGain.toFixed(2)}
                  </td>
                  <td className="p-3 text-right font-bold text-[#1B5E4A]">
                    +{targetUpside.toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
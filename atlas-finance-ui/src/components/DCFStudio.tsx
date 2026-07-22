// File: components/DCFStudio.tsx
'use client';

import React, { useState } from 'react';

interface DCFProps {
  freeCashFlow: number;
  totalDebt: number;
  totalCash: number;
  sharesOutstanding: number;
  currentPrice: number;
  currency: string;
}

export default function DCFStudio({
  freeCashFlow,
  totalDebt,
  totalCash,
  sharesOutstanding,
  currentPrice,
  currency,
}: DCFProps) {
  const [growthRate, setGrowthRate] = useState<number>(12); // %
  const [discountRate, setDiscountRate] = useState<number>(9); // %
  const [terminalGrowth, setTerminalGrowth] = useState<number>(3); // %

  // Calculate 5-year projected FCF
  const g = growthRate / 100;
  const d = discountRate / 100;
  const tg = terminalGrowth / 100;

  let presentValueFCF = 0;
  let currentFCF = freeCashFlow > 0 ? freeCashFlow : 1e8; // Fallback if negative/zero

  for (let year = 1; year <= 5; year++) {
    const projectedFCF = currentFCF * Math.pow(1 + g, year);
    presentValueFCF += projectedFCF / Math.pow(1 + d, year);
  }

  // Terminal Value Calculation
  const terminalValue = (currentFCF * Math.pow(1 + g, 5) * (1 + tg)) / (d - tg);
  const presentTerminalValue = terminalValue / Math.pow(1 + d, 5);

  const enterpriseValue = presentValueFCF + presentTerminalValue;
  const equityValue = enterpriseValue + totalCash - totalDebt;
  const intrinsicValuePerShare = Math.max(0, equityValue / (sharesOutstanding || 1));

  const marginOfSafety = ((intrinsicValuePerShare - currentPrice) / currentPrice) * 100;

  return (
    <div className="bg-[#111317] border border-white/10 p-6 md:p-8 rounded-3xl space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-4 gap-2">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>⚡ Dynamic DCF Valuation Studio</span>
          </h2>
          <p className="text-xs text-zinc-400">Discounted Cash Flow intrinsic fair value calculator.</p>
        </div>
        <div className="text-left md:text-right">
          <div className="text-2xl font-mono font-bold text-amber-400">
            {currency}{intrinsicValuePerShare.toFixed(2)}
          </div>
          <span className={`text-xs font-semibold ${marginOfSafety >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {marginOfSafety >= 0 ? `+${marginOfSafety.toFixed(1)}% Undervalued` : `${marginOfSafety.toFixed(1)}% Overvalued`}
          </span>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-black/30 p-4 rounded-2xl border border-white/5 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-zinc-400">5-Yr Cash Flow Growth Rate</span>
            <span className="text-amber-400 font-mono font-bold">{growthRate}%</span>
          </div>
          <input
            type="range"
            min="1"
            max="35"
            value={growthRate}
            onChange={(e) => setGrowthRate(Number(e.target.value))}
            className="w-full accent-amber-500 bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>

        <div className="bg-black/30 p-4 rounded-2xl border border-white/5 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-zinc-400">Discount Rate (WACC)</span>
            <span className="text-amber-400 font-mono font-bold">{discountRate}%</span>
          </div>
          <input
            type="range"
            min="6"
            max="18"
            value={discountRate}
            onChange={(e) => setDiscountRate(Number(e.target.value))}
            className="w-full accent-amber-500 bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
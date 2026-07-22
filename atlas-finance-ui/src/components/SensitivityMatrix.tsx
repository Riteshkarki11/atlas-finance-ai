'use client';

import React, { useState } from 'react';

const TICKERS = [
  { symbol: 'NVDA', name: 'NVIDIA Corporation', baseVal: 164.30 },
  { symbol: 'AAPL', name: 'Apple Inc.', baseVal: 224.50 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', baseVal: 448.10 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', baseVal: 182.90 },
];

export default function SensitivityMatrix() {
  const [selectedTicker, setSelectedTicker] = useState(TICKERS[0]);
  const [discountRate, setDiscountRate] = useState(10.0);

  const waccSteps = [8.5, 9.25, 10.0, 10.75, 11.5];
  const gSteps = [2.0, 2.5, 3.0, 3.5, 4.0];

  // Simple dynamic matrix calculator relative to base valuation
  const calculateVal = (wacc: number, g: number) => {
    const baseVal = selectedTicker.baseVal;
    const factor = (10.0 / wacc) * (1 + (g - 3.0) / 100);
    return (baseVal * factor).toFixed(2);
  };

  return (
    <section className="mt-16 border-t border-[#DBDAD2] pt-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="mono text-xs uppercase tracking-widest text-[#0F3B2E] mb-1">
            Dynamic Scenario Analysis
          </div>
          <h2 className="serif text-3xl font-semibold">Valuation Sensitivity Matrix</h2>
        </div>

        {/* Ticker Selector */}
        <div className="flex items-center gap-2">
          <span className="mono text-xs text-[#4A4E52] uppercase">Active Ticker:</span>
          <select
            value={selectedTicker.symbol}
            onChange={(e) => {
              const found = TICKERS.find((t) => t.symbol === e.target.value);
              if (found) setSelectedTicker(found);
            }}
            className="mono text-xs font-semibold px-3 py-2 bg-white border border-[#14171B] cursor-pointer focus:outline-none"
          >
            {TICKERS.map((t) => (
              <option key={t.symbol} value={t.symbol}>
                {t.symbol} — {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Scenario Controls */}
        <div className="hazy-card shadow-[6px_6px_0_#0F3B2E] p-6 space-y-6">
          <h3 className="serif text-xl font-semibold border-b border-[#DBDAD2] pb-2">
            Base Case Assumptions
          </h3>

          <div>
            <label className="mono text-xs text-[#4A4E52] uppercase block mb-2">
              Discount Rate (WACC): <span className="text-[#0F3B2E] font-semibold">{discountRate}%</span>
            </label>
            <input
              type="range"
              min="8.0"
              max="12.0"
              step="0.25"
              value={discountRate}
              onChange={(e) => setDiscountRate(parseFloat(e.target.value))}
              className="w-full accent-[#1B5E4A] cursor-pointer"
            />
          </div>

          <div className="p-4 bg-white/80 border border-[#DBDAD2] space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#4A4E52]">Selected Ticker:</span>
              <span className="mono font-semibold">{selectedTicker.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#4A4E52]">Base Fair Value:</span>
              <span className="mono font-semibold">${selectedTicker.baseVal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-dashed border-[#DBDAD2] pt-2">
              <span className="text-[#4A4E52]">Implied Margin of Safety:</span>
              <span className="mono font-semibold text-[#1B5E4A]">+18.4%</span>
            </div>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="lg:col-span-2 hazy-card shadow-[6px_6px_0_#0F3B2E] p-6 overflow-x-auto">
          <div className="mono text-xs text-[#4A4E52] uppercase mb-4">
            Intrinsic Value / Share ($) — WACC vs. Terminal Growth (g)
          </div>
          <table className="w-full text-center text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-[#14171B] mono text-[#4A4E52]">
                <th className="py-2.5 text-left bg-white/40">WACC \ g</th>
                {gSteps.map((g) => (
                  <th key={g} className="py-2.5">{g.toFixed(1)}%</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DBDAD2] mono">
              {waccSteps.map((wacc) => {
                const isBaseWacc = wacc === 10.0;
                return (
                  <tr key={wacc} className={isBaseWacc ? 'bg-[#1B5E4A]/10 font-bold' : 'hover:bg-[#1B5E4A]/5'}>
                    <td className="py-3 text-left font-semibold text-[#14171B] bg-white/40 px-2">
                      {wacc.toFixed(2)}%
                    </td>
                    {gSteps.map((g) => {
                      const isBaseCell = isBaseWacc && g === 3.0;
                      const val = calculateVal(wacc, g);
                      return (
                        <td
                          key={g}
                          className={`py-3 ${
                            isBaseCell
                              ? 'bg-[#1B5E4A] text-[#F7F6F2] font-bold shadow-inner'
                              : 'text-[#14171B]'
                          }`}
                        >
                          ${val}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
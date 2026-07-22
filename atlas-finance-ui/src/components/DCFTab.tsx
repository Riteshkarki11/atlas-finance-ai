'use client';

import React, { useState } from 'react';

interface DCFTabProps {
  currency: string;
  currentPrice: number;
}

export default function DCFTab({ currency, currentPrice }: DCFTabProps) {
  // Input State Variables
  const [wacc, setWacc] = useState<number>(10.5); // Discount Rate (%)
  const [terminalGrowth, setTerminalGrowth] = useState<number>(4.0); // Perpetual Growth (%)
  const [revenueGrowth, setRevenueGrowth] = useState<number>(12.0); // Year 1-5 CAGR (%)
  const [ebitdaMargin, setEbitdaMargin] = useState<number>(20.0); // Operating Margin (%)
  const [taxRate, setTaxRate] = useState<number>(25.2); // Indian Corporate Tax Benchmark (%)

  // Financial Base Figures (in Crores / Millions)
  const baseRevenue = 900102; 
  const netDebt = 120500;
  const sharesOutstanding = 676.5; // In Crores / Millions

  // 5-Year Unlevered Free Cash Flow (UFCF) Projection Engine
  const years = [1, 2, 3, 4, 5];
  let accumulatedPV = 0;

  const projections = years.map((year) => {
    const projectedRev = baseRevenue * Math.pow(1 + revenueGrowth / 100, year);
    const projectedEbitda = projectedRev * (ebitdaMargin / 100);
    const projectedEbit = projectedEbitda * 0.78; // Approx Depreciation adjustment
    const nopat = projectedEbit * (1 - taxRate / 100);
    const ufcf = nopat * 0.85; // Less CapEx & Working Capital reinvestment
    
    const discountFactor = Math.pow(1 + wacc / 100, year);
    const presentValue = ufcf / discountFactor;
    accumulatedPV += presentValue;

    return { year, projectedRev, ufcf, presentValue };
  });

  // Terminal Value Calculation (Gordon Growth Model)
  const finalYearUFCF = projections[4].ufcf;
  const terminalValue = (finalYearUFCF * (1 + terminalGrowth / 100)) / ((wacc - terminalGrowth) / 100);
  const pvTerminalValue = terminalValue / Math.pow(1 + wacc / 100, 5);

  // Enterprise & Equity Value Bridge
  const enterpriseValue = accumulatedPV + pvTerminalValue;
  const equityValue = enterpriseValue - netDebt;
  const intrinsicValuePerShare = equityValue / sharesOutstanding;

  const marginOfSafety = ((intrinsicValuePerShare - currentPrice) / currentPrice) * 100;

  // Sensitivity Matrix Calculations
  const waccRange = [wacc - 1.0, wacc - 0.5, wacc, wacc + 0.5, wacc + 1.0];
  const gRange = [terminalGrowth - 0.5, terminalGrowth, terminalGrowth + 0.5];

  const calculateSensitivity = (w: number, g: number) => {
    let pvSum = 0;
    years.forEach((yr) => {
      const ufcf = (baseRevenue * Math.pow(1 + revenueGrowth / 100, yr)) * (ebitdaMargin / 100) * 0.78 * (1 - taxRate / 100) * 0.85;
      pvSum += ufcf / Math.pow(1 + w / 100, yr);
    });
    const lastFCF = (baseRevenue * Math.pow(1 + revenueGrowth / 100, 5)) * (ebitdaMargin / 100) * 0.78 * (1 - taxRate / 100) * 0.85;
    const tv = (lastFCF * (1 + g / 100)) / ((w - g) / 100);
    const pvTv = tv / Math.pow(1 + w / 100, 5);
    const eqVal = (pvSum + pvTv) - netDebt;
    return eqVal / sharesOutstanding;
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      
      {/* 1. Valuation Summary Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#14171B] border border-[#2D3139] p-4 rounded-sm">
          <span className="text-[#8C9097] block">Current Market Price</span>
          <span className="text-xl font-bold text-white font-serif">{currency}{currentPrice.toLocaleString()}</span>
        </div>

        <div className="bg-[#14171B] border border-[#2D3139] p-4 rounded-sm">
          <span className="text-[#8C9097] block">Intrinsic Value (DCF)</span>
          <span className="text-xl font-bold text-[#B8892B] font-serif">{currency}{intrinsicValuePerShare.toFixed(2)}</span>
        </div>

        <div className="bg-[#14171B] border border-[#2D3139] p-4 rounded-sm">
          <span className="text-[#8C9097] block">Margin of Safety</span>
          <span className={`text-xl font-bold ${marginOfSafety >= 0 ? 'text-[#7FBF9E]' : 'text-[#E55353]'}`}>
            {marginOfSafety >= 0 ? '+' : ''}{marginOfSafety.toFixed(1)}%
          </span>
        </div>

        <div className="bg-[#14171B] border border-[#2D3139] p-4 rounded-sm">
          <span className="text-[#8C9097] block">Implied Valuation Status</span>
          <span className={`text-xs uppercase font-bold px-2 py-1 rounded inline-block mt-1 ${
            marginOfSafety > 10 
              ? 'bg-[#1B5E4A]/30 text-[#7FBF9E] border border-[#1B5E4A]' 
              : marginOfSafety < -10 
              ? 'bg-[#E55353]/20 text-[#E55353] border border-[#E55353]' 
              : 'bg-[#B8892B]/20 text-[#B8892B] border border-[#B8892B]'
          }`}>
            {marginOfSafety > 10 ? 'Undervalued' : marginOfSafety < -10 ? 'Overvalued' : 'Fairly Valued'}
          </span>
        </div>
      </div>

      {/* 2. Interactive Assumption Controls & Sensitivity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sliders Console */}
        <div className="bg-[#14171B] border border-[#2D3139] p-5 rounded-sm space-y-4">
          <h3 className="text-sm font-bold text-[#B8892B] uppercase border-b border-[#2D3139] pb-2">
            Model Valuation Parameters
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[#C5C8D0] mb-1">
                <span>Discount Rate (WACC)</span>
                <span className="font-bold text-white">{wacc}%</span>
              </div>
              <input 
                type="range" min="7.0" max="16.0" step="0.25" value={wacc}
                onChange={(e) => setWacc(parseFloat(e.target.value))}
                className="w-full accent-[#B8892B] bg-[#0D0F11] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[#C5C8D0] mb-1">
                <span>Terminal Growth Rate</span>
                <span className="font-bold text-white">{terminalGrowth}%</span>
              </div>
              <input 
                type="range" min="1.0" max="7.0" step="0.25" value={terminalGrowth}
                onChange={(e) => setTerminalGrowth(parseFloat(e.target.value))}
                className="w-full accent-[#B8892B] bg-[#0D0F11] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[#C5C8D0] mb-1">
                <span>5Y Revenue Growth (CAGR)</span>
                <span className="font-bold text-white">{revenueGrowth}%</span>
              </div>
              <input 
                type="range" min="2.0" max="25.0" step="0.5" value={revenueGrowth}
                onChange={(e) => setRevenueGrowth(parseFloat(e.target.value))}
                className="w-full accent-[#B8892B] bg-[#0D0F11] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[#C5C8D0] mb-1">
                <span>Operating EBITDA Margin</span>
                <span className="font-bold text-white">{ebitdaMargin}%</span>
              </div>
              <input 
                type="range" min="5.0" max="35.0" step="0.5" value={ebitdaMargin}
                onChange={(e) => setEbitdaMargin(parseFloat(e.target.value))}
                className="w-full accent-[#B8892B] bg-[#0D0F11] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 2D Sensitivity Analysis Grid */}
        <div className="lg:col-span-2 bg-[#14171B] border border-[#2D3139] p-5 rounded-sm space-y-4">
          <h3 className="text-sm font-bold text-[#B8892B] uppercase border-b border-[#2D3139] pb-2 flex justify-between">
            <span>2D Sensitivity Matrix (WACC vs Terminal Growth)</span>
            <span className="text-[10px] text-[#8C9097]">Intrinsic Value per Share</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-[#0D0F11] border-b border-[#2D3139] text-[#8C9097]">
                  <th className="p-2 border-r border-[#2D3139]">g \ WACC</th>
                  {waccRange.map((w) => (
                    <th key={w} className={`p-2 ${w === wacc ? 'text-[#B8892B] font-bold' : ''}`}>
                      {w.toFixed(1)}%
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2D3139]/40">
                {gRange.map((g) => (
                  <tr key={g}>
                    <td className={`p-2 bg-[#0D0F11] border-r border-[#2D3139] font-bold ${
                      g === terminalGrowth ? 'text-[#B8892B]' : 'text-[#8C9097]'
                    }`}>
                      {g.toFixed(1)}%
                    </td>
                    {waccRange.map((w) => {
                      const val = calculateSensitivity(w, g);
                      const isBase = w === wacc && g === terminalGrowth;
                      return (
                        <td key={w} className={`p-2 font-mono ${
                          isBase 
                            ? 'bg-[#B8892B]/20 text-[#B8892B] font-bold border border-[#B8892B]' 
                            : val > currentPrice 
                            ? 'text-[#7FBF9E]' 
                            : 'text-[#E55353]'
                        }`}>
                          {currency}{val.toFixed(0)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 3. Free Cash Flow Cash Projection Table */}
      <div className="bg-[#14171B] border border-[#2D3139] rounded-sm overflow-x-auto">
        <div className="p-4 bg-[#0D0F11] border-b border-[#2D3139] text-xs font-bold text-[#B8892B] uppercase">
          Unlevered Free Cash Flow Projections (5-Year Window)
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0D0F11] border-b border-[#2D3139] text-[#8C9097]">
              <th className="p-3">Projection Year</th>
              {projections.map((p) => (
                <th key={p.year} className="p-3 text-right">Year {p.year}</th>
              ))}
              <th className="p-3 text-right text-[#B8892B]">Terminal Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2D3139]/40 text-[#C5C8D0]">
            <tr>
              <td className="p-3 font-semibold text-white">Projected Revenue</td>
              {projections.map((p) => (
                <td key={p.year} className="p-3 text-right">{currency}{Math.round(p.projectedRev).toLocaleString()}</td>
              ))}
              <td className="p-3 text-right text-[#8C9097]">—</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-white">Unlevered Free Cash Flow (UFCF)</td>
              {projections.map((p) => (
                <td key={p.year} className="p-3 text-right text-[#7FBF9E] font-bold">
                  {currency}{Math.round(p.ufcf).toLocaleString()}
                </td>
              ))}
              <td className="p-3 text-right text-[#B8892B] font-bold">
                {currency}{Math.round(terminalValue).toLocaleString()}
              </td>
            </tr>
            <tr className="bg-[#181C22]">
              <td className="p-3 font-semibold text-white">Present Value (PV at {wacc}%)</td>
              {projections.map((p) => (
                <td key={p.year} className="p-3 text-right text-white font-bold">
                  {currency}{Math.round(p.presentValue).toLocaleString()}
                </td>
              ))}
              <td className="p-3 text-right text-[#B8892B] font-bold">
                {currency}{Math.round(pvTerminalValue).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
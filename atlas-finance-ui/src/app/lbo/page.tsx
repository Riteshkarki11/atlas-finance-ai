'use client';

import React, { useState } from 'react';
import TerminalSidebar from '@/components/TerminalSidebar';
import TerminalHeader from '@/components/TerminalHeader';

export default function LBOPage() {
  // Model Assumptions State
  const [entryMultiple, setEntryMultiple] = useState<number>(12.5);
  const [exitMultiple, setExitMultiple] = useState<number>(11.0);
  const [leverageRatio, setLeverageRatio] = useState<number>(5.0); // 5.0x Debt / EBITDA
  const [ebitda, setEbitda] = useState<number>(4500); // $4.5B EBITDA
  const [holdingPeriod, setHoldingPeriod] = useState<number>(5);

  // Derived Private Equity Metrics
  const entryEV = ebitda * entryMultiple;
  const initialDebt = ebitda * leverageRatio;
  const sponsorEquity = entryEV - initialDebt;

  // Simplified 5-Year Debt Paydown & Exit Calculation
  const cumulativeDebtPaydown = ebitda * 0.45 * holdingPeriod; // Approx 45% FCF conversion to debt paydown
  const exitDebt = Math.max(0, initialDebt - cumulativeDebtPaydown);
  const exitEV = ebitda * 1.15 * exitMultiple; // Assuming ~15% EBITDA expansion
  const exitEquity = exitEV - exitDebt;

  // Returns Calculation
  const moic = exitEquity / sponsorEquity;
  const irr = (Math.pow(moic, 1 / holdingPeriod) - 1) * 100;

  return (
    <div className="flex min-h-screen bg-[#0D0F11] text-[#F7F6F2] font-sans">
      <TerminalSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TerminalHeader />

        <main className="p-6 space-y-6 overflow-y-auto flex-1 font-mono text-xs">
          {/* Header */}
          <div className="border-b border-[#2D3139] pb-4 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 text-[#8C9097] uppercase">
                <span>Private Equity Workstation</span>
                <span>•</span>
                <span className="text-[#B8892B]">LBO Returns & Debt Sizing</span>
              </div>
              <h1 className="serif text-2xl font-bold text-white mt-1">
                LBO Workbench: Target Valuation
              </h1>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 bg-[#14171B] border border-[#2D3139] text-[#7FBF9E] font-bold rounded uppercase">
                Sponsor Mode: ACTIVE
              </span>
            </div>
          </div>

          {/* Key Return Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#14171B] border border-[#2D3139] p-4 rounded-sm">
              <span className="text-[#8C9097] text-[10px] uppercase block">5-Yr Sponsor IRR</span>
              <div className="text-2xl font-bold text-[#7FBF9E] mt-1">{irr.toFixed(1)}%</div>
              <span className="text-[10px] text-[#8C9097] mt-1 block">Target: &gt; 20.0%</span>
            </div>

            <div className="bg-[#14171B] border border-[#2D3139] p-4 rounded-sm">
              <span className="text-[#8C9097] text-[10px] uppercase block">MoIC (Multiple on Invested Capital)</span>
              <div className="text-2xl font-bold text-[#B8892B] mt-1">{moic.toFixed(2)}x</div>
              <span className="text-[10px] text-[#8C9097] mt-1 block">Cash-on-Cash Return</span>
            </div>

            <div className="bg-[#14171B] border border-[#2D3139] p-4 rounded-sm">
              <span className="text-[#8C9097] text-[10px] uppercase block">Initial Sponsor Equity</span>
              <div className="text-2xl font-bold text-white mt-1">${(sponsorEquity / 1000).toFixed(2)}B</div>
              <span className="text-[10px] text-[#8C9097] mt-1 block">{((sponsorEquity / entryEV) * 100).toFixed(1)}% Equity Check</span>
            </div>

            <div className="bg-[#14171B] border border-[#2D3139] p-4 rounded-sm">
              <span className="text-[#8C9097] text-[10px] uppercase block">Exit Enterprise Value</span>
              <div className="text-2xl font-bold text-white mt-1">${(exitEV / 1000).toFixed(2)}B</div>
              <span className="text-[10px] text-[#8C9097] mt-1 block">At {exitMultiple.toFixed(1)}x Exit Multiple</span>
            </div>
          </div>

          {/* Controls & Debt Tranches Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LBO Assumptions Panel */}
            <div className="bg-[#14171B] border border-[#2D3139] p-5 rounded-sm space-y-4">
              <h3 className="serif text-sm font-bold text-white uppercase border-b border-[#212529] pb-2">
                Deal Structure Parameters
              </h3>

              {/* Entry Multiple Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[#8C9097]">
                  <span>Entry EV/EBITDA</span>
                  <span className="text-white font-bold">{entryMultiple.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="6.0"
                  max="20.0"
                  step="0.5"
                  value={entryMultiple}
                  onChange={(e) => setEntryMultiple(parseFloat(e.target.value))}
                  className="w-full accent-[#B8892B] bg-[#0D0F11]"
                />
              </div>

              {/* Exit Multiple Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[#8C9097]">
                  <span>Exit EV/EBITDA</span>
                  <span className="text-white font-bold">{exitMultiple.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="6.0"
                  max="20.0"
                  step="0.5"
                  value={exitMultiple}
                  onChange={(e) => setExitMultiple(parseFloat(e.target.value))}
                  className="w-full accent-[#B8892B] bg-[#0D0F11]"
                />
              </div>

              {/* Total Leverage Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[#8C9097]">
                  <span>Leverage (Debt / EBITDA)</span>
                  <span className="text-white font-bold">{leverageRatio.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="8.0"
                  step="0.25"
                  value={leverageRatio}
                  onChange={(e) => setLeverageRatio(parseFloat(e.target.value))}
                  className="w-full accent-[#1B5E4A] bg-[#0D0F11]"
                />
              </div>

              {/* Holding Period Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[#8C9097]">
                  <span>Holding Period</span>
                  <span className="text-white font-bold">{holdingPeriod} Years</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="7"
                  step="1"
                  value={holdingPeriod}
                  onChange={(e) => setHoldingPeriod(parseInt(e.target.value))}
                  className="w-full accent-[#1B5E4A] bg-[#0D0F11]"
                />
              </div>
            </div>

            {/* Debt Capital Structure Breakdown */}
            <div className="lg:col-span-2 bg-[#14171B] border border-[#2D3139] p-5 rounded-sm space-y-4">
              <h3 className="serif text-sm font-bold text-white uppercase border-b border-[#212529] pb-2">
                Tranche Schedule & Returns Sensitivity
              </h3>

              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#2D3139] text-[#8C9097] text-[10px] uppercase">
                    <th className="py-2">Capital Tranche</th>
                    <th className="py-2">Multiple</th>
                    <th className="py-2 text-right">Amount ($M)</th>
                    <th className="py-2 text-right">% Capital</th>
                    <th className="py-2 text-right">Pricing / Yield</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#212529]">
                  <tr>
                    <td className="py-2.5 font-bold text-white">Revolver / Term Loan A</td>
                    <td className="py-2.5 text-[#8C9097]">2.0x</td>
                    <td className="py-2.5 text-right font-bold text-white">${(ebitda * 2.0).toLocaleString()}M</td>
                    <td className="py-2.5 text-right text-[#8C9097]">{(((ebitda * 2.0) / entryEV) * 100).toFixed(1)}%</td>
                    <td className="py-2.5 text-right text-[#7FBF9E]">SOFR + 275 bps</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">Senior Secured Term Loan B</td>
                    <td className="py-2.5 text-[#8C9097]">{(leverageRatio - 3.5).toFixed(1)}x</td>
                    <td className="py-2.5 text-right font-bold text-white">${(ebitda * Math.max(0, leverageRatio - 3.5)).toLocaleString()}M</td>
                    <td className="py-2.5 text-right text-[#8C9097]">{(((ebitda * Math.max(0, leverageRatio - 3.5)) / entryEV) * 100).toFixed(1)}%</td>
                    <td className="py-2.5 text-right text-[#7FBF9E]">SOFR + 425 bps</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">Subordinated / Mezzanine Debt</td>
                    <td className="py-2.5 text-[#8C9097]">1.5x</td>
                    <td className="py-2.5 text-right font-bold text-white">${(ebitda * 1.5).toLocaleString()}M</td>
                    <td className="py-2.5 text-right text-[#8C9097]">{(((ebitda * 1.5) / entryEV) * 100).toFixed(1)}%</td>
                    <td className="py-2.5 text-right text-[#B8892B]">11.5% PIK</td>
                  </tr>
                  <tr className="bg-[#0D0F11]">
                    <td className="py-2.5 font-bold text-[#B8892B]">Sponsor Equity Check</td>
                    <td className="py-2.5 text-[#8C9097]">{(entryMultiple - leverageRatio).toFixed(1)}x</td>
                    <td className="py-2.5 text-right font-bold text-[#B8892B]">${sponsorEquity.toLocaleString()}M</td>
                    <td className="py-2.5 text-right text-[#B8892B]">{((sponsorEquity / entryEV) * 100).toFixed(1)}%</td>
                    <td className="py-2.5 text-right text-[#7FBF9E]">Target {irr.toFixed(1)}% IRR</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
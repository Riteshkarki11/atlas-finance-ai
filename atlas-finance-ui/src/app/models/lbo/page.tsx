'use client';

import React, { useState } from 'react';
import TerminalSidebar from '@/components/TerminalSidebar';
import TerminalHeader from '@/components/TerminalHeader';

export default function LBOModelPage() {
  // LBO Assumptions State
  const [purchasePrice, setPurchasePrice] = useState(10000); // $M
  const [entryEbitda, setEntryEbitda] = useState(1000); // $M
  const [seniorDebtPct, setSeniorDebtPct] = useState(50); // %
  const [mezzDebtPct, setMezzDebtPct] = useState(20); // %
  const [exitMultiple, setExitMultiple] = useState(10.0); // x
  const [holdingPeriod, setHoldingPeriod] = useState(5); // Years
  const [revenueGrowth, setRevenueGrowth] = useState(8.0); // %
  const [ebitdaMargin, setEbitdaMargin] = useState(25.0); // %

  // Calculations
  const entryMultiple = (purchasePrice / entryEbitda).toFixed(1);
  const totalDebtPct = seniorDebtPct + mezzDebtPct;
  const equityPct = Math.max(0, 100 - totalDebtPct);
  
  const sponsorEquityEntry = (purchasePrice * equityPct) / 100;
  const seniorDebt = (purchasePrice * seniorDebtPct) / 100;
  const mezzDebt = (purchasePrice * mezzDebtPct) / 100;

  // Year N EBITDA Projection & Exit Enterprise Value
  const exitEbitda = entryEbitda * Math.pow(1 + revenueGrowth / 100, holdingPeriod);
  const exitEV = exitEbitda * exitMultiple;

  // Estimated Debt Paydown over holding period (Assume ~30% debt amortized via FCF)
  const exitDebt = (seniorDebt + mezzDebt) * 0.7;
  const exitSponsorEquity = Math.max(0, exitEV - exitDebt);

  // Returns
  const moic = sponsorEquityEntry > 0 ? (exitSponsorEquity / sponsorEquityEntry) : 0;
  const irr = sponsorEquityEntry > 0 && moic > 0 ? (Math.pow(moic, 1 / holdingPeriod) - 1) * 100 : 0;

  return (
    <div className="flex min-h-screen bg-[#0D0F11] text-[#F7F6F2] font-sans">
      <TerminalSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TerminalHeader />

        <main className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2D3139] pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs mono text-[#8C9097] uppercase">
                <span>IB Valuation Desk</span>
                <span>•</span>
                <span className="text-[#B8892B]">LBO Leveraged Buyout Model</span>
              </div>
              <h1 className="serif text-2xl font-bold text-white mt-1">
                Sponsor Buyout & Return Analysis Engine
              </h1>
            </div>

            <div className="flex items-center gap-3 text-xs mono">
              <span className="px-3 py-1 bg-[#212529] border border-[#2D3139] text-[#C5C8D0] rounded">
                Entry Multiple: <strong className="text-white">{entryMultiple}x EBITDA</strong>
              </span>
            </div>
          </div>

          {/* Model Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Transaction Inputs */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#14171B] border border-[#2D3139] p-5 rounded-sm space-y-5 text-xs mono">
                <h3 className="serif text-base font-bold text-white border-b border-[#212529] pb-2">
                  1. Transaction & Capital Structure Assumptions
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#8C9097] block mb-1">Target EV ($M)</label>
                    <input
                      type="number"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(parseFloat(e.target.value) || 0)}
                      className="w-full p-2 bg-[#0D0F11] border border-[#2D3139] text-white focus:outline-none focus:border-[#1B5E4A]"
                    />
                  </div>
                  <div>
                    <label className="text-[#8C9097] block mb-1">LTM EBITDA ($M)</label>
                    <input
                      type="number"
                      value={entryEbitda}
                      onChange={(e) => setEntryEbitda(parseFloat(e.target.value) || 0)}
                      className="w-full p-2 bg-[#0D0F11] border border-[#2D3139] text-white focus:outline-none focus:border-[#1B5E4A]"
                    />
                  </div>
                  <div>
                    <label className="text-[#8C9097] block mb-1">Senior Debt Tranche (% Cap)</label>
                    <input
                      type="number"
                      value={seniorDebtPct}
                      onChange={(e) => setSeniorDebtPct(parseFloat(e.target.value) || 0)}
                      className="w-full p-2 bg-[#0D0F11] border border-[#2D3139] text-white focus:outline-none focus:border-[#1B5E4A]"
                    />
                  </div>
                  <div>
                    <label className="text-[#8C9097] block mb-1">Mezzanine Debt (% Cap)</label>
                    <input
                      type="number"
                      value={mezzDebtPct}
                      onChange={(e) => setMezzDebtPct(parseFloat(e.target.value) || 0)}
                      className="w-full p-2 bg-[#0D0F11] border border-[#2D3139] text-white focus:outline-none focus:border-[#1B5E4A]"
                    />
                  </div>
                </div>

                <h3 className="serif text-base font-bold text-white border-b border-[#212529] pb-2 pt-2">
                  2. Operational Growth & Exit Multiples
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#8C9097] block mb-1">Holding Period (Years)</label>
                    <input
                      type="number"
                      value={holdingPeriod}
                      onChange={(e) => setHoldingPeriod(parseFloat(e.target.value) || 1)}
                      className="w-full p-2 bg-[#0D0F11] border border-[#2D3139] text-white focus:outline-none focus:border-[#1B5E4A]"
                    />
                  </div>
                  <div>
                    <label className="text-[#8C9097] block mb-1">Exit EBITDA Multiple (x)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={exitMultiple}
                      onChange={(e) => setExitMultiple(parseFloat(e.target.value) || 0)}
                      className="w-full p-2 bg-[#0D0F11] border border-[#2D3139] text-white focus:outline-none focus:border-[#1B5E4A]"
                    />
                  </div>
                  <div>
                    <label className="text-[#8C9097] block mb-1">Annual Revenue Growth (%)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={revenueGrowth}
                      onChange={(e) => setRevenueGrowth(parseFloat(e.target.value) || 0)}
                      className="w-full p-2 bg-[#0D0F11] border border-[#2D3139] text-white focus:outline-none focus:border-[#1B5E4A]"
                    />
                  </div>
                  <div>
                    <label className="text-[#8C9097] block mb-1">Target EBITDA Margin (%)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={ebitdaMargin}
                      onChange={(e) => setEbitdaMargin(parseFloat(e.target.value) || 0)}
                      className="w-full p-2 bg-[#0D0F11] border border-[#2D3139] text-white focus:outline-none focus:border-[#1B5E4A]"
                    />
                  </div>
                </div>
              </div>

              {/* Sources & Uses Ledger */}
              <div className="bg-[#14171B] border border-[#2D3139] p-5 rounded-sm text-xs mono">
                <h3 className="serif text-base font-bold text-white mb-3">Sources & Uses of Funds</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2 border-r border-[#212529] pr-4">
                    <span className="text-[#B8892B] font-bold block uppercase">Sources ($M)</span>
                    <div className="flex justify-between"><span>Senior Debt ({seniorDebtPct}%):</span> <span>${seniorDebt.toFixed(0)}</span></div>
                    <div className="flex justify-between"><span>Mezzanine Debt ({mezzDebtPct}%):</span> <span>${mezzDebt.toFixed(0)}</span></div>
                    <div className="flex justify-between font-bold text-white pt-1 border-t border-[#212529]">
                      <span>Sponsor Equity ({equityPct}%):</span> <span>${sponsorEquityEntry.toFixed(0)}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[#B8892B] font-bold block uppercase">Uses ($M)</span>
                    <div className="flex justify-between"><span>Purchase Enterprise Value:</span> <span>${purchasePrice.toFixed(0)}</span></div>
                    <div className="flex justify-between text-[#8C9097]"><span>Estimated Advisory/Financing Fees:</span> <span>Included</span></div>
                    <div className="flex justify-between font-bold text-white pt-1 border-t border-[#212529]">
                      <span>Total Uses:</span> <span>${purchasePrice.toFixed(0)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Private Equity Return Dashboard */}
            <div className="space-y-6">
              <div className="bg-[#14171B] border border-[#1B5E4A] p-6 rounded-sm text-center">
                <span className="text-[10px] mono text-[#8C9097] uppercase">Sponsor Return Summary</span>
                <div className="my-4">
                  <span className="text-xs mono text-[#8C9097] block mb-1">Projected Sponsor IRR</span>
                  <div className="serif text-4xl font-bold text-[#7FBF9E] mono">{irr.toFixed(1)}%</div>
                </div>

                <div className="pt-4 border-t border-[#212529] grid grid-cols-2 gap-2 text-xs mono">
                  <div>
                    <span className="text-[#8C9097] block">MOIC / Cash Multiple</span>
                    <span className="text-lg font-bold text-white">{moic.toFixed(2)}x</span>
                  </div>
                  <div>
                    <span className="text-[#8C9097] block">Exit EV (${holdingPeriod} Yr)</span>
                    <span className="text-lg font-bold text-white">${exitEV.toFixed(0)}M</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#14171B] border border-[#2D3139] p-5 rounded-sm text-xs mono space-y-3">
                <h4 className="font-bold text-white border-b border-[#212529] pb-2">Deal Feasibility Assessment</h4>
                <div className="flex justify-between">
                  <span className="text-[#8C9097]">Sponsor Target Threshold:</span>
                  <span className="text-white">20.0% IRR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C9097]">Hurdle Status:</span>
                  <span className={`font-bold ${irr >= 20 ? 'text-[#7FBF9E]' : 'text-[#D98E85]'}`}>
                    {irr >= 20 ? 'MEETS HURDLE' : 'BELOW THRESHOLD'}
                  </span>
                </div>
                <p className="text-[11px] text-[#8C9097] leading-relaxed pt-2 border-t border-[#212529]">
                  {irr >= 20
                    ? 'This transaction generates returns above standard PE hurdle rates. Cash flow generation supports required debt service schedule.'
                    : 'Consider increasing leverage, expanding exit multiple, or negotiating lower purchase enterprise value.'}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import TerminalSidebar from '@/components/TerminalSidebar';
import TerminalHeader from '@/components/TerminalHeader';

export default function MAPage() {
  // Acquirer
  const [acquirerPrice, setAcquirerPrice] = useState(150);
  const [acquirerEps, setAcquirerEps] = useState(6.50);
  const [acquirerShares, setAcquirerShares] = useState(1000); // M

  // Target
  const [targetPrice, setTargetPrice] = useState(50);
  const [targetEps, setTargetEps] = useState(2.20);
  const [targetShares, setTargetShares] = useState(200); // M

  // Deal Mechanics
  const [offerPremium, setOfferPremium] = useState(25); // %
  const [synergies, setSynergies] = useState(150); // $M pre-tax
  const [stockFinancingPct, setStockFinancingPct] = useState(60); // % Stock (40% Debt)
  const [debtInterestRate, setDebtInterestRate] = useState(6.0); // %

  // Calculations
  const targetOfferPrice = targetPrice * (1 + offerPremium / 100);
  const totalDealValue = targetOfferPrice * targetShares;

  const stockConsideration = (totalDealValue * stockFinancingPct) / 100;
  const debtConsideration = totalDealValue - stockConsideration;

  const newSharesIssued = stockConsideration / acquirerPrice;
  const totalProFormaShares = acquirerShares + newSharesIssued;

  // Earnings Combination
  const acquirerEarnings = acquirerPrice * acquirerShares / (acquirerPrice / acquirerEps);
  const targetEarnings = targetShares * targetEps;
  const annualDebtInterest = debtConsideration * (debtInterestRate / 100) * (1 - 0.21); // After tax at 21%
  const afterTaxSynergies = synergies * (1 - 0.21);

  const combinedEarnings = acquirerEarnings + targetEarnings + afterTaxSynergies - annualDebtInterest;
  const proFormaEps = combinedEarnings / totalProFormaShares;

  const epsAccretion = proFormaEps - acquirerEps;
  const epsAccretionPct = (epsAccretion / acquirerEps) * 100;
  const isAccretive = epsAccretion >= 0;

  return (
    <div className="flex min-h-screen bg-[#0D0F11] text-[#F7F6F2] font-sans">
      <TerminalSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TerminalHeader />

        <main className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2D3139] pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs mono text-[#8C9097] uppercase">
                <span>IB M&A Advisory Desk</span>
                <span>•</span>
                <span className="text-[#B8892B]">Merger Accretion / Dilution Engine</span>
              </div>
              <h1 className="serif text-2xl font-bold text-white mt-1">
                Strategic M&A & Combination Analysis
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs mono">
            {/* Column 1 & 2: Inputs */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#14171B] border border-[#2D3139] p-5 rounded-sm space-y-4">
                <h3 className="serif text-base font-bold text-white border-b border-[#212529] pb-2">
                  1. Acquirer & Target Inputs
                </h3>

                <div className="grid grid-cols-2 gap-6">
                  {/* Acquirer Column */}
                  <div className="space-y-3">
                    <span className="text-[#B8892B] font-bold block">ACQUIRER CO.</span>
                    <div>
                      <label className="text-[#8C9097] block mb-1">Share Price ($)</label>
                      <input
                        type="number"
                        value={acquirerPrice}
                        onChange={(e) => setAcquirerPrice(parseFloat(e.target.value) || 0)}
                        className="w-full p-2 bg-[#0D0F11] border border-[#2D3139] text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[#8C9097] block mb-1">Standalone EPS ($)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={acquirerEps}
                        onChange={(e) => setAcquirerEps(parseFloat(e.target.value) || 0)}
                        className="w-full p-2 bg-[#0D0F11] border border-[#2D3139] text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Target Column */}
                  <div className="space-y-3">
                    <span className="text-[#B8892B] font-bold block">TARGET CO.</span>
                    <div>
                      <label className="text-[#8C9097] block mb-1">Share Price ($)</label>
                      <input
                        type="number"
                        value={targetPrice}
                        onChange={(e) => setTargetPrice(parseFloat(e.target.value) || 0)}
                        className="w-full p-2 bg-[#0D0F11] border border-[#2D3139] text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[#8C9097] block mb-1">Standalone EPS ($)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={targetEps}
                        onChange={(e) => setTargetEps(parseFloat(e.target.value) || 0)}
                        className="w-full p-2 bg-[#0D0F11] border border-[#2D3139] text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <h3 className="serif text-base font-bold text-white border-b border-[#212529] pb-2 pt-2">
                  2. Offer Premium & Financing Structure
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[#8C9097] block mb-1">Offer Premium (%)</label>
                    <input
                      type="number"
                      value={offerPremium}
                      onChange={(e) => setOfferPremium(parseFloat(e.target.value) || 0)}
                      className="w-full p-2 bg-[#0D0F11] border border-[#2D3139] text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[#8C9097] block mb-1">Stock Consideration (%)</label>
                    <input
                      type="number"
                      value={stockFinancingPct}
                      onChange={(e) => setStockFinancingPct(parseFloat(e.target.value) || 0)}
                      className="w-full p-2 bg-[#0D0F11] border border-[#2D3139] text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[#8C9097] block mb-1">Pre-Tax Synergies ($M)</label>
                    <input
                      type="number"
                      value={synergies}
                      onChange={(e) => setSynergies(parseFloat(e.target.value) || 0)}
                      className="w-full p-2 bg-[#0D0F11] border border-[#2D3139] text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Impact Summary */}
            <div className="space-y-6">
              <div className={`border p-6 rounded-sm text-center ${isAccretive ? 'bg-[#14171B] border-[#1B5E4A]' : 'bg-[#14171B] border-[#A0382B]'}`}>
                <span className="text-[10px] text-[#8C9097] uppercase">M&A Transaction Impact</span>
                <div className="my-4">
                  <span className="text-xs text-[#8C9097] block mb-1">Pro Forma EPS Impact</span>
                  <div className={`serif text-4xl font-bold mono ${isAccretive ? 'text-[#7FBF9E]' : 'text-[#D98E85]'}`}>
                    {epsAccretionPct >= 0 ? `+${epsAccretionPct.toFixed(2)}%` : `${epsAccretionPct.toFixed(2)}%`}
                  </div>
                  <span className={`inline-block mt-2 px-2.5 py-0.5 text-[10px] font-bold uppercase rounded ${isAccretive ? 'bg-[#1B5E4A] text-white' : 'bg-[#A0382B] text-white'}`}>
                    {isAccretive ? 'ACCRETIVE DEAL' : 'DILUTIVE DEAL'}
                  </span>
                </div>

                <div className="pt-4 border-t border-[#212529] space-y-2 text-left">
                  <div className="flex justify-between"><span>Offer Price per Share:</span> <span className="font-bold text-white">${targetOfferPrice.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Total Transaction Value:</span> <span className="font-bold text-white">${(totalDealValue / 1000).toFixed(2)}B</span></div>
                  <div className="flex justify-between"><span>Standalone EPS:</span> <span className="text-white">${acquirerEps.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Pro Forma EPS:</span> <span className="font-bold text-[#7FBF9E]">${proFormaEps.toFixed(2)}</span></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
'use client';

import React, { useState } from 'react';

export default function FinancialStatements() {
  const [activeTab, setActiveTab] = useState<'income' | 'dcf'>('dcf');

  return (
    <section className="mt-16 border-t border-[#DBDAD2] pt-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="mono text-xs uppercase tracking-widest text-[#0F3B2E] mb-1">
            Audit Ledger & Financial Projections
          </div>
          <h2 className="serif text-3xl font-semibold">Model Breakdown & Valuation Signals</h2>
        </div>

        {/* Tab Toggle Buttons */}
        <div className="flex border border-[#14171B] bg-[#F7F6F2] p-1 text-xs mono">
          <button
            onClick={() => setActiveTab('dcf')}
            className={`px-4 py-1.5 font-medium transition-colors ${
              activeTab === 'dcf' ? 'bg-[#14171B] text-[#F7F6F2]' : 'text-[#4A4E52] hover:text-[#14171B]'
            }`}
          >
            DCF Model Projections
          </button>
          <button
            onClick={() => setActiveTab('income')}
            className={`px-4 py-1.5 font-medium transition-colors ${
              activeTab === 'income' ? 'bg-[#14171B] text-[#F7F6F2]' : 'text-[#4A4E52] hover:text-[#14171B]'
            }`}
          >
            Income Statement
          </button>
        </div>
      </div>

      {/* Financial Table Card */}
      <div className="hazy-card shadow-[6px_6px_0_#0F3B2E] p-6 overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b-2 border-[#14171B] text-[#4A4E52] uppercase mono text-xs">
              <th className="py-3">Financial Metric ($ Millions)</th>
              <th className="py-3 text-right">FY2024A</th>
              <th className="py-3 text-right">FY2025E</th>
              <th className="py-3 text-right">FY2026E</th>
              <th className="py-3 text-right">FY2027E</th>
              <th className="py-3 text-right">CAGR / Margin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DBDAD2] mono text-xs">
            {activeTab === 'dcf' ? (
              <>
                <tr className="hover:bg-[#1B5E4A]/5">
                  <td className="py-3 font-semibold text-[#14171B] font-sans">Total Revenue</td>
                  <td className="py-3 text-right">$60,922</td>
                  <td className="py-3 text-right">$126,000</td>
                  <td className="py-3 text-right">$152,900</td>
                  <td className="py-3 text-right">$181,200</td>
                  <td className="py-3 text-right text-[#1B5E4A] font-semibold">+43.8%</td>
                </tr>
                <tr className="hover:bg-[#1B5E4A]/5">
                  <td className="py-3 font-semibold text-[#14171B] font-sans">EBITDA</td>
                  <td className="py-3 text-right">$34,478</td>
                  <td className="py-3 text-right">$78,120</td>
                  <td className="py-3 text-right">$96,327</td>
                  <td className="py-3 text-right">$114,156</td>
                  <td className="py-3 text-right text-[#1B5E4A]">63.0%</td>
                </tr>
                <tr className="hover:bg-[#1B5E4A]/5">
                  <td className="py-3 font-semibold text-[#14171B] font-sans">Less: Taxes & CapEx</td>
                  <td className="py-3 text-right">($4,210)</td>
                  <td className="py-3 text-right">($8,500)</td>
                  <td className="py-3 text-right">($10,200)</td>
                  <td className="py-3 text-right">($12,100)</td>
                  <td className="py-3 text-right text-[#9C3B32]">-6.6%</td>
                </tr>
                <tr className="bg-[#1B5E4A]/10 font-bold border-t-2 border-[#14171B]">
                  <td className="py-3 text-[#0F3B2E] font-sans">Unlevered Free Cash Flow (FCF)</td>
                  <td className="py-3 text-right">$27,021</td>
                  <td className="py-3 text-right">$59,820</td>
                  <td className="py-3 text-right">$75,610</td>
                  <td className="py-3 text-right">$89,200</td>
                  <td className="py-3 text-right text-[#1B5E4A]">$251.6B PV</td>
                </tr>
              </>
            ) : (
              <>
                <tr className="hover:bg-[#1B5E4A]/5">
                  <td className="py-3 font-semibold text-[#14171B] font-sans">Gross Profit</td>
                  <td className="py-3 text-right">$44,282</td>
                  <td className="py-3 text-right">$94,500</td>
                  <td className="py-3 text-right">$116,204</td>
                  <td className="py-3 text-right">$137,712</td>
                  <td className="py-3 text-right text-[#1B5E4A]">76.0%</td>
                </tr>
                <tr className="hover:bg-[#1B5E4A]/5">
                  <td className="py-3 font-semibold text-[#14171B] font-sans">Operating Expenses (OpEx)</td>
                  <td className="py-3 text-right">($11,328)</td>
                  <td className="py-3 text-right">($18,200)</td>
                  <td className="py-3 text-right">($21,400)</td>
                  <td className="py-3 text-right">($25,100)</td>
                  <td className="py-3 text-right text-[#9C3B32]">13.8%</td>
                </tr>
                <tr className="bg-[#1B5E4A]/10 font-bold border-t-2 border-[#14171B]">
                  <td className="py-3 text-[#0F3B2E] font-sans">Net Income</td>
                  <td className="py-3 text-right">$29,760</td>
                  <td className="py-3 text-right">$64,500</td>
                  <td className="py-3 text-right">$79,100</td>
                  <td className="py-3 text-right">$93,500</td>
                  <td className="py-3 text-right text-[#1B5E4A]">51.6%</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
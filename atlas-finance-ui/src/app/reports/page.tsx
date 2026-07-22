'use client';

import React, { useState } from 'react';
import TerminalSidebar from '@/components/TerminalSidebar';
import TerminalHeader from '@/components/TerminalHeader';

export default function ReportGeneratorPage() {
  const [reportType, setReportType] = useState('EQUITY_RESEARCH');
  const [ticker, setTicker] = useState('NVDA');

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
                <span>Output Desk</span>
                <span>•</span>
                <span className="text-[#B8892B]">Institutional Report Generator</span>
              </div>
              <h1 className="serif text-2xl font-bold text-white mt-1">
                PDF & Excel Investment Memo Publishing
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs mono">
            {/* Report Configuration */}
            <div className="space-y-4 bg-[#14171B] border border-[#2D3139] p-5 rounded-sm">
              <h3 className="serif text-base font-bold text-white border-b border-[#212529] pb-2">
                Report Specifications
              </h3>

              <div>
                <label className="text-[#8C9097] block mb-1">Target Ticker</label>
                <input
                  type="text"
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value.toUpperCase())}
                  className="w-full p-2 bg-[#0D0F11] border border-[#2D3139] text-white uppercase focus:outline-none focus:border-[#1B5E4A]"
                />
              </div>

              <div>
                <label className="text-[#8C9097] block mb-1">Report Template</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full p-2 bg-[#0D0F11] border border-[#2D3139] text-white focus:outline-none"
                >
                  <option value="EQUITY_RESEARCH">Equity Research Memo (IC Format)</option>
                  <option value="DCF_VALUATION">DCF Valuation Brief</option>
                  <option value="LBO_MEMO">LBO Sponsor Pitch Deck Summary</option>
                  <option value="MA_ACCRETION">M&A Accretion / Dilution Report</option>
                </select>
              </div>

              <div className="pt-4 space-y-2">
                <button className="w-full py-2.5 bg-[#1B5E4A] hover:bg-[#144738] text-white font-bold uppercase rounded">
                  Export Institutional PDF Report
                </button>
                <button className="w-full py-2.5 bg-[#212529] hover:bg-[#2D3139] border border-[#2D3139] text-white font-bold uppercase rounded">
                  Export Financial Model (.XLSX)
                </button>
              </div>
            </div>

            {/* Document Preview Window */}
            <div className="lg:col-span-2 bg-[#14171B] border border-[#2D3139] p-6 rounded-sm space-y-4">
              <div className="flex justify-between items-center border-b border-[#212529] pb-3">
                <span className="text-[10px] text-[#B8892B] uppercase">Live Document Render</span>
                <span className="text-[10px] text-[#8C9097]">CONFIDENTIAL — FOR INVESTMENT COMMITTEE USE ONLY</span>
              </div>

              <div className="bg-[#0D0F11] border border-[#212529] p-6 rounded space-y-4 text-[#C5C8D0]">
                <div className="flex justify-between items-start border-b border-[#212529] pb-4">
                  <div>
                    <h2 className="serif text-xl font-bold text-white">EQUITY RESEARCH MEMORANDUM</h2>
                    <span className="text-xs text-[#8C9097] block mt-0.5">SUBJECT: {ticker} VALUATION & CONVICTION ANALYSIS</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#7FBF9E] block">RATING: OVERWEIGHT</span>
                    <span className="text-[10px] text-[#8C9097]">DATE: {new Date().toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="space-y-3 leading-relaxed text-xs">
                  <p><strong className="text-white">1. Core Investment Thesis:</strong> High barriers to entry in accelerated computing architectures combined with full-stack software lock-in provide sustained competitive advantage.</p>
                  <p><strong className="text-white">2. Valuation Summary:</strong> Base case 5-year DCF yields an intrinsic share value exceeding current trading ranges by 15%+.</p>
                  <p><strong className="text-white">3. Risk Factors:</strong> Hardware customer concentration and semiconductor trade restrictions.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
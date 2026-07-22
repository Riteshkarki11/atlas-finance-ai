'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import TerminalSidebar from '@/components/TerminalSidebar';
import TerminalHeader from '@/components/TerminalHeader';

// Mock Financial Statements Data Structure
const INCOME_STATEMENT = [
  { metric: 'Total Revenue', fy21: '$61,271M', fy22: '$79,495M', fy23: '$96,773M', fy24: '$126,020M', yoy: '+30.2%' },
  { metric: 'Cost of Goods Sold (COGS)', fy21: '$24,720M', fy22: '$29,200M', fy23: '$31,450M', fy24: '$34,800M', yoy: '+10.6%' },
  { metric: 'Gross Profit', fy21: '$36,551M', fy22: '$50,295M', fy23: '$65,323M', fy24: '$91,220M', yoy: '+39.6%' },
  { metric: 'Operating Expenses (OpEx)', fy21: '$12,400M', fy22: '$15,100M', fy23: '$18,200M', fy24: '$22,400M', yoy: '+23.0%' },
  { metric: 'EBITDA', fy21: '$26,151M', fy22: '$37,195M', fy23: '$49,123M', fy24: '$71,820M', yoy: '+46.2%' },
  { metric: 'Net Income', fy21: '$21,450M', fy22: '$29,760M', fy23: '$39,810M', fy24: '$58,400M', yoy: '+46.7%' },
];

const RATIOS = [
  { category: 'Liquidity', items: [{ name: 'Current Ratio', value: '2.14x' }, { name: 'Quick Ratio', value: '1.85x' }, { name: 'Cash Ratio', value: '0.92x' }] },
  { category: 'Profitability', items: [{ name: 'Gross Margin', value: '72.38%' }, { name: 'Operating Margin', value: '54.20%' }, { name: 'ROE', value: '48.2%' }, { name: 'ROIC', value: '38.4%' }] },
  { category: 'Leverage', items: [{ name: 'Debt to Equity', value: '0.38x' }, { name: 'Interest Coverage', value: '42.1x' }, { name: 'Net Debt / EBITDA', value: '0.12x' }] },
  { category: 'Valuation', items: [{ name: 'P/E Ratio', value: '42.10x' }, { name: 'EV / EBITDA', value: '34.20x' }, { name: 'P/B Ratio', value: '18.40x' }, { name: 'FCF Yield', value: '2.85%' }] },
];

export default function CompanyWorkspacePage() {
  const params = useParams();
  const ticker = (params?.ticker as string)?.toUpperCase() || 'NVDA';

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'FINANCIALS' | 'RATIOS' | 'AI_REPORT'>('OVERVIEW');
  const [statementType, setStatementType] = useState<'IS' | 'BS' | 'CF'>('IS');
  const [tickerData, setTickerData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch real quote data from the API endpoint
  useEffect(() => {
    async function loadQuote() {
      try {
        setLoading(true);
        const res = await fetch(`/api/quote?symbol=${encodeURIComponent(ticker)}`);
        const data = await res.json();
        if (res.ok) {
          setTickerData(data);
        } else {
          setTickerData({ ticker, name: `${ticker} Corp.`, price: 138.70, change: 2.14, upside: 18.4, peRatio: 42.1, marketCap: '3.4T', intrinsicValue: 164.30, signal: 'BUY' });
        }
      } catch {
        setTickerData({ ticker, name: `${ticker} Corp.`, price: 138.70, change: 2.14, upside: 18.4, peRatio: 42.1, marketCap: '3.4T', intrinsicValue: 164.30, signal: 'BUY' });
      } finally {
        setLoading(false);
      }
    }
    loadQuote();
  }, [ticker]);

  return (
    <div className="flex min-h-screen bg-[#0D0F11] text-[#F7F6F2] font-sans">
      <TerminalSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TerminalHeader />

        <main className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Company Workspace Header Banner */}
          <div className="bg-[#14171B] border border-[#2D3139] p-6 rounded-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#212529] pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs mono text-[#8C9097] uppercase">
                  <span>Ticker Workspace</span>
                  <span>•</span>
                  <span>NASDAQ / Global Feed</span>
                </div>
                <div className="flex items-baseline gap-3 mt-1">
                  <h1 className="serif text-3xl font-bold text-white">{ticker}</h1>
                  <span className="text-sm text-[#8C9097]">{loading ? 'Loading metadata...' : tickerData?.name}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs mono">
                <div>
                  <span className="text-[#8C9097] block text-[10px]">MARKET PRICE</span>
                  <span className="text-2xl font-bold text-white">${tickerData?.price || '---'}</span>
                </div>
                <div className="h-8 w-[1px] bg-[#2D3139]"></div>
                <div>
                  <span className="text-[#8C9097] block text-[10px]">AI CONVICTION</span>
                  <span className={`px-2.5 py-1 text-xs font-bold text-white rounded ${
                    tickerData?.signal === 'BUY' ? 'bg-[#1B5E4A]' : 'bg-[#B8892B]'
                  }`}>
                    {tickerData?.signal || 'BUY'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-4 text-xs mono">
              <div>
                <span className="text-[#8C9097] block">Market Cap</span>
                <span className="font-semibold text-white">{tickerData?.marketCap || 'N/A'}</span>
              </div>
              <div>
                <span className="text-[#8C9097] block">P/E Ratio</span>
                <span className="font-semibold text-white">{tickerData?.peRatio || 'N/A'}x</span>
              </div>
              <div>
                <span className="text-[#8C9097] block">DCF Intrinsic</span>
                <span className="font-semibold text-[#7FBF9E]">${tickerData?.intrinsicValue || '---'}</span>
              </div>
              <div>
                <span className="text-[#8C9097] block">Implied Upside</span>
                <span className="font-semibold text-[#7FBF9E]">+{tickerData?.upside || '0'}%</span>
              </div>
              <div>
                <span className="text-[#8C9097] block">52 Wk High/Low</span>
                <span className="font-semibold text-white">$140.76 / $45.20</span>
              </div>
              <div>
                <span className="text-[#8C9097] block">Analyst Rating</span>
                <span className="font-semibold text-[#B8892B]">Strong Buy (4.8/5)</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#2D3139] gap-2 text-xs mono">
            {[
              { id: 'OVERVIEW', label: 'Company Overview' },
              { id: 'FINANCIALS', label: 'Financial Statements' },
              { id: 'RATIOS', label: 'Fundamental Ratios' },
              { id: 'AI_REPORT', label: 'AI Equity Research Memo' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 font-bold uppercase transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-[#1B5E4A] text-white bg-[#14171B]'
                    : 'border-transparent text-[#8C9097] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content 1: Overview */}
          {activeTab === 'OVERVIEW' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-[#14171B] border border-[#2D3139] p-5 rounded-sm">
                  <h3 className="serif text-lg font-bold text-white mb-3">Business Profile</h3>
                  <p className="text-xs text-[#C5C8D0] leading-relaxed">
                    {ticker} designs accelerated computing platforms for AI, data centers, autonomous machines, and graphics. The company operates through two segments: Compute & Networking, and Graphics. Its core growth driver continues to be enterprise data center AI hardware deployments and full-stack software subscriptions.
                  </p>
                </div>

                <div className="bg-[#14171B] border border-[#2D3139] p-5 rounded-sm">
                  <h3 className="serif text-lg font-bold text-white mb-3">Key Investment Highlights</h3>
                  <ul className="space-y-2 text-xs text-[#C5C8D0] list-disc list-inside">
                    <li>Dominant GPU market share (&gt;80%) in enterprise artificial intelligence model training and inference.</li>
                    <li>Sustained gross margins above 70% due to software moat (CUDA platform lock-in).</li>
                    <li>Strong balance sheet with negligible net leverage and industry-leading ROIC.</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-[#14171B] border border-[#2D3139] p-5 rounded-sm text-xs mono space-y-3">
                  <h3 className="serif text-base font-bold text-white border-b border-[#212529] pb-2">Valuation Models Desk</h3>
                  <Link href="/models/dcf" className="block p-3 bg-[#0D0F11] border border-[#2D3139] hover:border-[#1B5E4A] rounded">
                    <span className="font-bold text-white block">DCF Valuation Engine →</span>
                    <span className="text-[10px] text-[#8C9097]">Adjust WACC & Terminal Growth rates</span>
                  </Link>
                  <Link href="/models/lbo" className="block p-3 bg-[#0D0F11] border border-[#2D3139] hover:border-[#1B5E4A] rounded">
                    <span className="font-bold text-white block">LBO Modeling Desk →</span>
                    <span className="text-[10px] text-[#8C9097]">Run private equity buyout returns</span>
                  </Link>
                  <Link href="/models/ma" className="block p-3 bg-[#0D0F11] border border-[#2D3139] hover:border-[#1B5E4A] rounded">
                    <span className="font-bold text-white block">M&A Accretion/Dilution →</span>
                    <span className="text-[10px] text-[#8C9097]">Model merger synergies & EPS impact</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 2: Financial Statements */}
          {activeTab === 'FINANCIALS' && (
            <div className="bg-[#14171B] border border-[#2D3139] p-5 rounded-sm">
              <div className="flex justify-between items-center mb-4 text-xs mono">
                <div className="flex gap-2">
                  <button
                    onClick={() => setStatementType('IS')}
                    className={`px-3 py-1 rounded ${statementType === 'IS' ? 'bg-[#1B5E4A] text-white' : 'bg-[#212529] text-[#8C9097]'}`}
                  >
                    Income Statement
                  </button>
                  <button
                    onClick={() => setStatementType('BS')}
                    className={`px-3 py-1 rounded ${statementType === 'BS' ? 'bg-[#1B5E4A] text-white' : 'bg-[#212529] text-[#8C9097]'}`}
                  >
                    Balance Sheet
                  </button>
                  <button
                    onClick={() => setStatementType('CF')}
                    className={`px-3 py-1 rounded ${statementType === 'CF' ? 'bg-[#1B5E4A] text-white' : 'bg-[#212529] text-[#8C9097]'}`}
                  >
                    Cash Flow
                  </button>
                </div>
                <button className="px-3 py-1 bg-[#212529] hover:bg-[#2D3139] text-[#B8892B] rounded">
                  Download Excel (.XLSX)
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs mono">
                  <thead>
                    <tr className="border-b border-[#2D3139] text-[#8C9097] uppercase">
                      <th className="pb-2">Line Item ($ USD)</th>
                      <th className="pb-2">FY2021</th>
                      <th className="pb-2">FY2022</th>
                      <th className="pb-2">FY2023</th>
                      <th className="pb-2">FY2024</th>
                      <th className="pb-2 text-right">YoY Growth</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#212529]">
                    {INCOME_STATEMENT.map((row, i) => (
                      <tr key={i} className="hover:bg-[#1A1E24]">
                        <td className="py-3 font-semibold text-white">{row.metric}</td>
                        <td className="py-3 text-[#C5C8D0]">{row.fy21}</td>
                        <td className="py-3 text-[#C5C8D0]">{row.fy22}</td>
                        <td className="py-3 text-[#C5C8D0]">{row.fy23}</td>
                        <td className="py-3 font-bold text-white">{row.fy24}</td>
                        <td className="py-3 text-right font-bold text-[#7FBF9E]">{row.yoy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab Content 3: Financial Ratios */}
          {activeTab === 'RATIOS' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {RATIOS.map((group) => (
                <div key={group.category} className="bg-[#14171B] border border-[#2D3139] p-5 rounded-sm">
                  <h3 className="serif text-base font-bold text-[#B8892B] mb-3 uppercase tracking-wider">
                    {group.category} Ratios
                  </h3>
                  <div className="space-y-2 text-xs mono divide-y divide-[#212529]">
                    {group.items.map((item) => (
                      <div key={item.name} className="flex justify-between pt-2">
                        <span className="text-[#8C9097]">{item.name}</span>
                        <span className="font-bold text-white">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab Content 4: AI Research Memo */}
          {activeTab === 'AI_REPORT' && (
            <div className="bg-[#14171B] border border-[#1B5E4A] p-6 rounded-sm space-y-4">
              <div className="flex justify-between items-center border-b border-[#212529] pb-3">
                <div>
                  <span className="text-[10px] mono text-[#B8892B] uppercase">Institutional Equity Research Memo</span>
                  <h2 className="serif text-xl font-bold text-white">Investment Thesis: {ticker}</h2>
                </div>
                <span className="px-3 py-1 bg-[#1B5E4A] text-white text-xs mono font-bold rounded">
                  CONVICTION: OVERWEIGHT
                </span>
              </div>

              <div className="text-xs text-[#C5C8D0] space-y-3 leading-relaxed">
                <p>
                  <strong className="text-white">Executive Summary:</strong> Based on multi-factor fundamental modeling and DCF cash flow projections, {ticker} presents a high-conviction opportunity. Free cash flow generation is projected to scale significantly due to market dominance in high-performance computing platforms.
                </p>
                <p>
                  <strong className="text-white">Key Risk Factors:</strong> Supply chain concentration in foundry manufacturing partners, potential geopolitical export constraints, and customer CapEx moderation cycles.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
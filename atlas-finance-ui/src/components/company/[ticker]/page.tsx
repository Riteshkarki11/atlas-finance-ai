'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import GlobalTickerMarquee from '@/components/GlobalTickerMarquee';
import UniversalSearch from '@/components/UniversalSearch';
import FinancialsTab from '@/components/FinancialsTab';
import RatiosTab from '@/components/RatiosTab';
import DCFTab from '@/components/DCFTab';
import FNOAnalyticsTab from '@/components/FNOAnalyticsTab';
import SectorWatchlist from '@/components/SectorWatchlist';
import AIResearchDesk from '@/components/AIResearchDesk';
import IPODesk from '@/components/IPODesk';


// Mock company data structure tailored for NSE & US stocks
const MOCK_COMPANY_DATA: Record<string, any> = {
  'RELIANCE.NS': {
    name: 'Reliance Industries Limited',
    ticker: 'RELIANCE.NS',
    exchange: 'NSE',
    currency: '₹',
    price: 3120.50,
    change: '+1.45%',
    isPositive: true,
    marketCap: '₹21.11 Lakh Cr',
    enterpriseValue: '₹23.85 Lakh Cr',
    peRatio: 28.4,
    pbRatio: 2.65,
    evEbitda: 14.8,
    roe: 9.8,
    roce: 10.4,
    sector: 'Oil & Gas / Retail / Telecom',
    industry: 'Integrated Oil & Gas',
    country: 'India',
    promoterHolding: 50.39,
    promoterPledged: 0.0, // Critical Indian Governance metric
    fiiHolding: 21.85,
    diiHolding: 16.42,
    beneishMScore: -2.85, // Safe (< -1.78)
    piotroskiFScore: 7, // Strong (0-9 scale)
    altmanZScore: 3.12, // Safe zone
    summary: 'Reliance Industries Limited is an Indian multinational conglomerate headquartered in Mumbai. Its businesses include energy, petrochemicals, natural gas, retail, telecommunications, mass media, and textiles.',
  },
  'NVDA': {
    name: 'NVIDIA Corporation',
    ticker: 'NVDA',
    exchange: 'NASDAQ',
    currency: '$',
    price: 135.20,
    change: '+3.12%',
    isPositive: true,
    marketCap: '$3.32 Trillion',
    enterpriseValue: '$3.28 Trillion',
    peRatio: 72.8,
    pbRatio: 48.2,
    evEbitda: 54.1,
    roe: 115.4,
    roce: 88.2,
    sector: 'Technology',
    industry: 'Semiconductors',
    country: 'United States',
    promoterHolding: 4.2, // Insider holding
    promoterPledged: 0.0,
    fiiHolding: 68.4,
    diiHolding: 18.2,
    beneishMScore: -2.42,
    piotroskiFScore: 8,
    altmanZScore: 18.5,
    summary: 'NVIDIA Corporation designs graphics processing units (GPUs) for the gaming and professional markets, as well as system-on-a-chip units (SoCs) for the mobile computing and automotive markets.',
  }
};

export default function CompanyWorkspace() {
  const params = useParams();
  const rawTicker = (params.ticker as string) || 'RELIANCE.NS';
  const tickerKey = rawTicker.toUpperCase();

  // Fallback to RELIANCE if ticker not in mock dictionary
  const company = MOCK_COMPANY_DATA[tickerKey] || {
    ...MOCK_COMPANY_DATA['RELIANCE.NS'],
    name: `${tickerKey} (Data Preview)`,
    ticker: tickerKey,
  };

  const [activeTab, setActiveTab] = useState<
    'overview' | 'financials' | 'ratios' | 'forensics' | 'dcf' | 'lbo' | 'fno' | 'ai'
  >('overview');

  return (
    <div className="min-h-screen bg-[#0D0F11] text-[#F7F6F2] font-mono flex flex-col justify-between">
      {/* Top Global Ticker Marquee */}
      <GlobalTickerMarquee />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 w-full flex-grow space-y-6">
        
        {/* Universal Search Header */}
        <div className="py-2">
          <UniversalSearch />
        </div>

        {/* 1. Header Snapshot Banner */}
        <div className="bg-[#14171B] border border-[#2D3139] p-6 rounded-sm">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 border-b border-[#2D3139] pb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-serif text-2xl md:text-3xl font-bold text-white">
                  {company.name}
                </h1>
                <span className="text-xs bg-[#0D0F11] border border-[#B8892B] text-[#B8892B] px-2 py-0.5 rounded font-bold">
                  {company.exchange}: {company.ticker}
                </span>
                <span className="text-xs text-[#8C9097] border border-[#2D3139] px-2 py-0.5 rounded">
                  {company.country}
                </span>
              </div>
              <p className="text-xs text-[#8C9097]">
                {company.sector} · <span className="text-[#C5C8D0]">{company.industry}</span>
              </p>
            </div>

            {/* Price & Valuation Callout */}
            <div className="flex items-end gap-6">
              <div className="text-right">
                <div className="text-xs text-[#8C9097] uppercase">Live Quote</div>
                <div className="text-3xl font-bold text-white font-serif">
                  {company.currency}{company.price.toLocaleString()}
                </div>
                <div className={`text-xs font-bold ${company.isPositive ? 'text-[#7FBF9E]' : 'text-[#E55353]'}`}>
                  {company.isPositive ? '▲' : '▼'} {company.change}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 pt-4 text-xs">
            <div>
              <span className="text-[#8C9097] block">Market Cap</span>
              <span className="text-white font-bold">{company.marketCap}</span>
            </div>
            <div>
              <span className="text-[#8C9097] block">Enterprise Value</span>
              <span className="text-white font-bold">{company.enterpriseValue}</span>
            </div>
            <div>
              <span className="text-[#8C9097] block">P/E Ratio</span>
              <span className="text-white font-bold">{company.peRatio}x</span>
            </div>
            <div>
              <span className="text-[#8C9097] block">EV/EBITDA</span>
              <span className="text-white font-bold">{company.evEbitda}x</span>
            </div>
            <div>
              <span className="text-[#8C9097] block">ROE</span>
              <span className="text-[#7FBF9E] font-bold">{company.roe}%</span>
            </div>
            <div>
              <span className="text-[#8C9097] block">ROCE</span>
              <span className="text-[#7FBF9E] font-bold">{company.roce}%</span>
            </div>
          </div>
        </div>

        {/* 2. Institutional Navigation Tabs */}
        <div className="flex overflow-x-auto border-b border-[#2D3139] bg-[#14171B] text-xs uppercase scrollbar-none">
          {[
            { id: 'overview', label: '1. Overview' },
            { id: 'financials', label: '2. Financials' },
            { id: 'ratios', label: '3. Ratios' },
            { id: 'forensics', label: '4. Forensics & Governance' },
            { id: 'dcf', label: '5. DCF Valuation' },
            { id: 'lbo', label: '6. LBO & M&A' },
            { id: 'fno', label: '7. F&O & Derivatives' },
            { id: 'ai', label: '8. AI Research Desk' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3.5 whitespace-nowrap font-semibold transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-[#B8892B] text-[#B8892B] bg-[#0D0F11]'
                  : 'border-transparent text-[#8C9097] hover:text-white hover:bg-[#1F232B]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 3. Tab Content Renderers */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Summary */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#14171B] border border-[#2D3139] p-6 rounded-sm">
                <h3 className="text-sm font-bold text-[#B8892B] uppercase mb-3 border-b border-[#2D3139] pb-2">
                  Business Summary
                </h3>
                <p className="text-xs text-[#C5C8D0] leading-relaxed">{company.summary}</p>
              </div>

              {/* Shareholding Breakdown */}
              <div className="bg-[#14171B] border border-[#2D3139] p-6 rounded-sm">
                <h3 className="text-sm font-bold text-[#B8892B] uppercase mb-4 border-b border-[#2D3139] pb-2 flex justify-between">
                  <span>Shareholding Pattern & Ownership</span>
                  <span className="text-[10px] text-[#8C9097]">Latest Disclosure</span>
                </h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-[#C5C8D0]">Promoter & Group</span>
                      <span className="text-white font-bold">{company.promoterHolding}%</span>
                    </div>
                    <div className="w-full bg-[#0D0F11] h-2 rounded-full overflow-hidden border border-[#2D3139]">
                      <div className="bg-[#1B5E4A] h-full" style={{ width: `${company.promoterHolding}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-[#C5C8D0]">Foreign Institutional Investors (FII)</span>
                      <span className="text-white font-bold">{company.fiiHolding}%</span>
                    </div>
                    <div className="w-full bg-[#0D0F11] h-2 rounded-full overflow-hidden border border-[#2D3139]">
                      <div className="bg-[#B8892B] h-full" style={{ width: `${company.fiiHolding}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-[#C5C8D0]">Domestic Institutional Investors (DII / MFs)</span>
                      <span className="text-white font-bold">{company.diiHolding}%</span>
                    </div>
                    <div className="w-full bg-[#0D0F11] h-2 rounded-full overflow-hidden border border-[#2D3139]">
                      <div className="bg-[#3B82F6] h-full" style={{ width: `${company.diiHolding}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Governance & Risk Side Panel */}
            <div className="space-y-6">
              <div className="bg-[#14171B] border border-[#2D3139] p-6 rounded-sm space-y-4">
                <h3 className="text-sm font-bold text-[#B8892B] uppercase border-b border-[#2D3139] pb-2">
                  Governance & Audit Desk
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center p-2.5 bg-[#0D0F11] border border-[#2D3139] rounded-sm">
                    <div>
                      <span className="block font-bold text-white">Promoter Pledging</span>
                      <span className="text-[10px] text-[#8C9097]">Encumbered Shares</span>
                    </div>
                    <span className={`font-bold ${company.promoterPledged > 0 ? 'text-[#E55353]' : 'text-[#7FBF9E]'}`}>
                      {company.promoterPledged}%
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-2.5 bg-[#0D0F11] border border-[#2D3139] rounded-sm">
                    <div>
                      <span className="block font-bold text-white">Beneish M-Score</span>
                      <span className="text-[10px] text-[#8C9097]">Earnings Manipulation Risk</span>
                    </div>
                    <span className="text-[#7FBF9E] font-bold">{company.beneishMScore} (Safe)</span>
                  </div>

                  <div className="flex justify-between items-center p-2.5 bg-[#0D0F11] border border-[#2D3139] rounded-sm">
                    <div>
                      <span className="block font-bold text-white">Piotroski F-Score</span>
                      <span className="text-[10px] text-[#8C9097]">Financial Health (0-9)</span>
                    </div>
                    <span className="text-[#7FBF9E] font-bold">{company.piotroskiFScore} / 9</span>
                  </div>

                  <div className="flex justify-between items-center p-2.5 bg-[#0D0F11] border border-[#2D3139] rounded-sm">
                    <div>
                      <span className="block font-bold text-white">Altman Z-Score</span>
                      <span className="text-[10px] text-[#8C9097]">Insolvency / Bankruptcy Risk</span>
                    </div>
                    <span className="text-[#7FBF9E] font-bold">{company.altmanZScore}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Fallback Preview for unbuilt tabs */}
        {activeTab !== 'overview' && (
          <div className="bg-[#14171B] border border-[#2D3139] p-12 text-center rounded-sm space-y-3">
            <div className="text-[#B8892B] font-bold text-sm uppercase">
              {activeTab.toUpperCase()} Module Active
            </div>
            <p className="text-xs text-[#8C9097] max-w-md mx-auto">
              This institutional sub-dashboard is ready for full API binding or interactive modeling components.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
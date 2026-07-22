'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchResult {
  ticker: string;
  name: string;
  exchange: 'NSE' | 'BSE' | 'NASDAQ' | 'NYSE';
  sector: string;
  type: 'STOCK' | 'ETF' | 'MUTUAL_FUND';
}

const SAMPLE_DATABASE: SearchResult[] = [
  { ticker: 'RELIANCE', name: 'Reliance Industries Ltd', exchange: 'NSE', sector: 'Energy & Retail', type: 'STOCK' },
  { ticker: 'TCS', name: 'Tata Consultancy Services', exchange: 'NSE', sector: 'IT Services', type: 'STOCK' },
  { ticker: 'HDFCBANK', name: 'HDFC Bank Ltd', exchange: 'NSE', sector: 'Banking & Financials', type: 'STOCK' },
  { ticker: 'SBIN', name: 'State Bank of India', exchange: 'NSE', sector: 'Banking', type: 'STOCK' },
  { ticker: 'INFY', name: 'Infosys Limited', exchange: 'NSE', sector: 'IT Services', type: 'STOCK' },
  { ticker: 'NVDA', name: 'NVIDIA Corporation', exchange: 'NASDAQ', sector: 'Semiconductors', type: 'STOCK' },
  { ticker: 'MSFT', name: 'Microsoft Corporation', exchange: 'NASDAQ', sector: 'Software', type: 'STOCK' },
  { ticker: 'NIFTYBEES', name: 'Nippon India ETF Nifty BeES', exchange: 'NSE', sector: 'Index Fund', type: 'ETF' },
];

export default function UniversalSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const filteredResults = query.trim() === '' 
    ? [] 
    : SAMPLE_DATABASE.filter(item => 
        item.ticker.toLowerCase().includes(query.toLowerCase()) ||
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.sector.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (ticker: string, exchange: string) => {
    const formattedTicker = exchange === 'NSE' ? `${ticker}.NS` : exchange === 'BSE' ? `${ticker}.BO` : ticker;
    setIsOpen(false);
    setQuery('');
    router.push(`/company/${formattedTicker}`);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto font-mono">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search NSE / BSE / US Tickers (e.g. RELIANCE, TCS, HDFCBANK, NVDA)..."
          className="w-full bg-[#14171B] border border-[#2D3139] text-white px-4 py-3.5 pl-10 rounded-sm focus:outline-none focus:border-[#B8892B] text-xs transition-colors placeholder-[#6C7078]"
        />
        <svg className="w-4 h-4 text-[#8C9097] absolute left-3.5 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && filteredResults.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-[#14171B] border border-[#2D3139] mt-1 z-50 rounded-sm shadow-2xl max-h-80 overflow-y-auto">
          {filteredResults.map((item) => (
            <div
              key={item.ticker}
              onClick={() => handleSelect(item.ticker, item.exchange)}
              className="px-4 py-3 hover:bg-[#1F232B] cursor-pointer border-b border-[#2D3139]/50 flex justify-between items-center text-xs transition-colors"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{item.ticker}</span>
                  <span className="text-[10px] bg-[#0D0F11] border border-[#2D3139] text-[#B8892B] px-1.5 py-0.5 rounded">
                    {item.exchange}
                  </span>
                </div>
                <div className="text-[#8C9097] text-[11px] mt-0.5">{item.name} · {item.sector}</div>
              </div>
              <span className="text-[10px] text-[#7FBF9E] uppercase font-semibold">
                {item.type} →
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
'use client';

import React, { useState, useEffect } from 'react';

interface SearchResult {
  ticker: string;
  name: string;
  exchange: string;
  country: string;
  flag: string;
  type: 'EQUITY' | 'BANK' | 'ETF';
}

const SAMPLE_DATABASE: SearchResult[] = [
  { ticker: 'NVDA', name: 'NVIDIA Corporation', exchange: 'NASDAQ', country: 'US', flag: '🇺🇸', type: 'EQUITY' },
  { ticker: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', country: 'US', flag: '🇺🇸', type: 'EQUITY' },
  { ticker: 'JPM', name: 'JPMorgan Chase & Co.', exchange: 'NYSE', country: 'US', flag: '🇺🇸', type: 'BANK' },
  { ticker: 'RELIANCE.NS', name: 'Reliance Industries Ltd.', exchange: 'NSE', country: 'IN', flag: '🇮🇳', type: 'EQUITY' },
  { ticker: 'HDFCBANK.NS', name: 'HDFC Bank Limited', exchange: 'NSE', country: 'IN', flag: '🇮🇳', type: 'BANK' },
  { ticker: 'ASML.AS', name: 'ASML Holding N.V.', exchange: 'Euronext Amsterdam', country: 'NL', flag: '🇳🇱', type: 'EQUITY' },
];

export default function TickerSearchModal({
  isOpen,
  onClose,
  onSelectTicker,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectTicker: (ticker: SearchResult) => void;
}) {
  const [query, setQuery] = useState('');

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = SAMPLE_DATABASE.filter(
    (item) =>
      item.ticker.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.exchange.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-[#14171B] border border-[#2D3139] rounded-lg shadow-2xl overflow-hidden font-mono text-xs">
        {/* Search Header */}
        <div className="p-4 border-b border-[#2D3139] flex items-center gap-3">
          <span className="text-[#8C9097] text-sm">🔍</span>
          <input
            type="text"
            autoFocus
            placeholder="Search symbol, company name, or exchange (e.g. NVDA, RELIANCE.NS, JPM)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white font-mono text-sm focus:outline-none placeholder-[#8C9097]"
          />
          <span className="px-2 py-1 bg-[#0D0F11] border border-[#2D3139] text-[10px] text-[#8C9097] rounded">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto divide-y divide-[#212529]">
          {results.length > 0 ? (
            results.map((item) => (
              <button
                key={item.ticker}
                onClick={() => {
                  onSelectTicker(item);
                  onClose();
                }}
                className="w-full p-3 flex items-center justify-between hover:bg-[#1A1E24] transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{item.flag}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{item.ticker}</span>
                      <span className="text-[9px] px-1.5 py-0.5 bg-[#212529] border border-[#2D3139] text-[#B8892B] rounded font-semibold uppercase">
                        {item.type}
                      </span>
                    </div>
                    <span className="text-[#8C9097] text-[11px] block">{item.name}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[#C5C8D0] font-semibold">{item.exchange}</span>
                  <span className="text-[#8C9097] text-[10px] block">{item.country}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="p-6 text-center text-[#8C9097]">
              No instruments found matching &quot;{query}&quot;. Try equity tickers like NVDA or INFY.NS.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { DYNAMIC_SECTORS } from '@/lib/sectorData';

interface SearchBarProps {
  onSelectCompany: (ticker: string) => void;
}

export default function SearchBar({ onSelectCompany }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Flatten all tickers from DYNAMIC_SECTORS for autocomplete
  const allTickers = DYNAMIC_SECTORS.flatMap((sectorGroup) => sectorGroup.tickers);

  // Filter matching companies from the sector list
  const filteredTickers = query.trim()
    ? allTickers.filter(
        (t) =>
          t.symbol.toLowerCase().includes(query.toLowerCase()) ||
          t.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (ticker: string) => {
    onSelectCompany(ticker);
    setQuery('');
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      handleSelect(query.trim().toUpperCase());
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="relative flex items-center">
        <svg
          className="absolute left-3.5 w-4 h-4 text-zinc-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder="Search ticker (e.g. NVDA, TCS.NS, RELIANCE.NS)..."
          className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 focus:bg-black/60 transition-all font-sans"
        />

        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 text-zinc-400 hover:text-white text-xs"
          >
            ✕
          </button>
        )}
      </div>

      {/* Autocomplete Results Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#121418] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto backdrop-blur-2xl">
          <div className="p-2 space-y-1">
            {/* Custom Direct Search Action */}
            <button
              onClick={() => handleSelect(query.trim().toUpperCase())}
              className="w-full text-left px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-all text-xs font-semibold flex justify-between items-center"
            >
              <span>Fetch live ticker &quot;{query.toUpperCase()}&quot;</span>
              <span className="text-[10px] font-mono uppercase bg-amber-500 text-black px-1.5 py-0.5 rounded font-bold">
                Press Enter ↵
              </span>
            </button>

            {filteredTickers.length > 0 && (
              <>
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-zinc-400 border-b border-white/5 mt-2">
                  Suggested Companies
                </div>
                {filteredTickers.map((item) => (
                  <button
                    key={item.symbol}
                    onClick={() => handleSelect(item.symbol)}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-white group-hover:text-amber-400 transition-colors">
                          {item.symbol}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 font-mono">
                          {item.market}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-400 truncate max-w-[220px]">
                        {item.name}
                      </div>
                    </div>
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
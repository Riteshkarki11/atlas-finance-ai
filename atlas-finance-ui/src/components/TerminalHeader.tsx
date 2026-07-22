'use client';

import React, { useState } from 'react';
import TickerSearchModal from './TickerSearchModal';

export default function TerminalHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedTicker, setSelectedTicker] = useState('NVDA');

  return (
    <>
      <header className="h-12 border-b border-[#2D3139] bg-[#0D0F11] flex items-center justify-between px-4 font-mono text-xs">
        {/* Search Trigger Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-3 px-3 py-1.5 bg-[#14171B] border border-[#2D3139] hover:border-[#1B5E4A] rounded text-[#8C9097] transition-colors"
        >
          <span>🔍</span>
          <span className="text-white font-bold">{selectedTicker}</span>
          <span className="text-[10px] hidden sm:inline text-[#8C9097]">
            Press <kbd className="px-1 py-0.5 bg-[#212529] border border-[#2D3139] rounded">⌘K</kbd> to search globally
          </span>
        </button>

        <div className="flex items-center gap-4 text-[10px] text-[#8C9097]">
          <span>FEED: <strong className="text-[#7FBF9E]">SEC 10-K LIVE</strong></span>
          <span>LATENCY: <strong className="text-white">12ms</strong></span>
        </div>
      </header>

      <TickerSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTicker={(item) => setSelectedTicker(item.ticker)}
      />
    </>
  );
}

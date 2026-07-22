// File: components/Watchlist.tsx
'use client';

import React, { useState, useEffect } from 'react';

interface WatchlistItem {
  ticker: string;
  name: string;
  price: number;
  currency: string;
  peRatio: number;
  deRatio: number;
  fcf: number;
  shares: number;
  buyPrice?: number;
}

interface WatchlistProps {
  onSelectTicker: (ticker: string) => void;
  currentTicker: string;
}

export default function Watchlist({ onSelectTicker, currentTicker }: WatchlistProps) {
  const [watchlist, setWatchlist] = useState<string[]>(['NVDA', 'AAPL', 'MSFT']);
  const [itemsData, setItemsData] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newTicker, setNewTicker] = useState<string>('');

  // Load from localStorage on initial render
  useEffect(() => {
    const saved = localStorage.getItem('atlas_watchlist');
    if (saved) {
      try {
        setWatchlist(JSON.parse(saved));
      } catch (e) {
        console.error('Failed parsing saved watchlist');
      }
    }
  }, []);

  // Save to localStorage when updated
  useEffect(() => {
    localStorage.setItem('atlas_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Fetch live market data for all watchlist stocks
  useEffect(() => {
    async function fetchWatchlistData() {
      if (watchlist.length === 0) {
        setItemsData([]);
        return;
      }
      setLoading(true);
      try {
        const fetched = await Promise.all(
          watchlist.map(async (t) => {
            const res = await fetch(`/api/stock?ticker=${encodeURIComponent(t)}`);
            const json = await res.json();
            if (!json.success) return null;
            return {
              ticker: json.ticker,
              name: json.name,
              price: json.price,
              currency: json.currency,
              peRatio: json.peRatio,
              deRatio: json.deRatio,
              fcf: json.freeCashFlow || 0,
              shares: json.sharesOutstanding || 1,
            };
          })
        );
        setItemsData(fetched.filter((item): item is WatchlistItem => item !== null));
      } catch (err) {
        console.error('Error fetching watchlist data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchWatchlistData();
  }, [watchlist]);

  const addTicker = () => {
    const formatted = newTicker.trim().toUpperCase();
    if (formatted && !watchlist.includes(formatted)) {
      setWatchlist([...watchlist, formatted]);
      setNewTicker('');
    }
  };

  const removeTicker = (tToRemove: string) => {
    setWatchlist(watchlist.filter((t) => t !== tToRemove));
  };

  const addCurrentTicker = () => {
    if (currentTicker && !watchlist.includes(currentTicker.toUpperCase())) {
      setWatchlist([...watchlist, currentTicker.toUpperCase()]);
    }
  };

  // Helper function to generate dynamic financial rationale
  const getAIRationale = (item: WatchlistItem) => {
    const isHighDebt = item.deRatio > 1.5;
    const isCheapPE = item.peRatio > 0 && item.peRatio < 25;
    const isHighPE = item.peRatio > 50;

    if (isHighDebt) {
      return { label: 'Caution: High Debt', style: 'text-red-400 bg-red-500/10 border-red-500/20' };
    }
    if (isCheapPE && item.fcf > 0) {
      return { label: 'Value Buy Candidate', style: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
    }
    if (isHighPE) {
      return { label: 'Growth / Premium PE', style: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
    }
    return { label: 'Stable Health', style: 'text-blue-400 bg-blue-500/10 border-blue-500/20' };
  };

  return (
    <div className="bg-[#111317] border border-white/10 p-6 md:p-8 rounded-3xl space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>⭐ Watchlist & Portfolio Tracker</span>
          </h2>
          <p className="text-xs text-zinc-400">Persisted locally with real-time financial rationale flags.</p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={addCurrentTicker}
            disabled={watchlist.includes(currentTicker.toUpperCase())}
            className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-xl border border-white/10 transition-colors disabled:opacity-40"
          >
            + Add Current ({currentTicker})
          </button>
          <input
            type="text"
            placeholder="Symbol..."
            value={newTicker}
            onChange={(e) => setNewTicker(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTicker()}
            className="bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 font-mono w-28"
          />
          <button
            onClick={addTicker}
            disabled={!newTicker.trim()}
            className="px-3 py-1.5 bg-amber-500 text-black text-xs font-bold rounded-xl hover:bg-amber-400 transition-colors disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-8 text-center text-xs font-mono text-amber-400 animate-pulse">
          Refreshing live portfolio quotes...
        </div>
      ) : itemsData.length === 0 ? (
        <div className="py-8 text-center text-xs text-zinc-500 font-mono">
          Your watchlist is empty. Add a symbol above to start tracking.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {itemsData.map((item) => {
            const rationale = getAIRationale(item);
            const isSelected = item.ticker === currentTicker.toUpperCase();

            return (
              <div
                key={item.ticker}
                className={`p-5 rounded-2xl border transition-all cursor-pointer relative group ${
                  isSelected
                    ? 'bg-amber-500/5 border-amber-500/40 shadow-lg shadow-amber-500/5'
                    : 'bg-black/30 border-white/5 hover:border-white/20'
                }`}
                onClick={() => onSelectTicker(item.ticker)}
              >
                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTicker(item.ticker);
                  }}
                  className="absolute top-3 right-3 text-zinc-600 hover:text-red-400 text-xs p-1"
                  title="Remove from Watchlist"
                >
                  ✕
                </button>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-base font-mono">{item.ticker}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${rationale.style}`}
                      >
                        {rationale.label}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 truncate max-w-[200px]">{item.name}</p>
                  </div>

                  <div className="flex justify-between items-baseline pt-2 border-t border-white/5">
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase block">Live Price</span>
                      <span className="text-lg font-bold font-mono text-white">
                        {item.currency}{item.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-zinc-500 uppercase block">P/E | D/E</span>
                      <span className="text-xs font-mono text-zinc-300">
                        {item.peRatio ? `${item.peRatio}x` : 'N/A'} | {item.deRatio}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
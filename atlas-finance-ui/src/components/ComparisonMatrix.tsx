// File: components/ComparisonMatrix.tsx
'use client';

import React, { useState, useEffect } from 'react';

interface StockComparisonData {
  ticker: string;
  name: string;
  price: number;
  currency: string;
  peRatio: number;
  deRatio: number;
  freeCashFlow: number;
  revenue: number;
  fcfMargin: number;
}

export default function ComparisonMatrix({ currentTicker }: { currentTicker: string }) {
  const [tickers, setTickers] = useState<string[]>([currentTicker, 'MSFT', 'AAPL']);
  const [inputTicker, setInputTicker] = useState('');
  const [comparisonData, setComparisonData] = useState<StockComparisonData[]>([]);
  const [loading, setLoading] = useState(false);

  // Sync current ticker if changed externally
  useEffect(() => {
    if (!tickers.includes(currentTicker)) {
      setTickers((prev) => [currentTicker, ...prev.slice(0, 3)]);
    }
  }, [currentTicker]);

  // Fetch live comparison metrics
  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      try {
        const results = await Promise.all(
          tickers.map(async (t) => {
            const res = await fetch(`/api/stock?ticker=${encodeURIComponent(t)}`);
            const json = await res.json();
            if (!json.success) return null;

            const rev = json.revenue || 0;
            const fcf = json.freeCashFlow || 0;
            const fcfMargin = rev > 0 ? (fcf / rev) * 100 : 0;

            return {
              ticker: json.ticker,
              name: json.name,
              price: json.price,
              currency: json.currency,
              peRatio: json.peRatio,
              deRatio: json.deRatio,
              freeCashFlow: fcf,
              revenue: rev,
              fcfMargin: fcfMargin,
            };
          })
        );
        setComparisonData(results.filter((item): item is StockComparisonData => item !== null));
      } catch (err) {
        console.error('Failed fetching comparison tickers', err);
      } finally {
        setLoading(false);
      }
    }

    if (tickers.length > 0) {
      fetchAll();
    }
  }, [tickers]);

  const addTicker = () => {
    const formatted = inputTicker.trim().toUpperCase();
    if (formatted && !tickers.includes(formatted) && tickers.length < 4) {
      setTickers([...tickers, formatted]);
      setInputTicker('');
    }
  };

  const removeTicker = (tToRemove: string) => {
    if (tickers.length > 1) {
      setTickers(tickers.filter((t) => t !== tToRemove));
    }
  };

  // Metric Leader Calculations
  const lowestPE = Math.min(...comparisonData.map((d) => (d.peRatio > 0 ? d.peRatio : Infinity)));
  const lowestDE = Math.min(...comparisonData.map((d) => d.deRatio));
  const highestFCFMargin = Math.max(...comparisonData.map((d) => d.fcfMargin));

  return (
    <div className="bg-[#111317] border border-white/10 p-6 md:p-8 rounded-3xl space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>⚔️ Multi-Stock Comparison Matrix</span>
          </h2>
          <p className="text-xs text-zinc-400">Side-by-side valuation & financial health benchmarking.</p>
        </div>

        {/* Add Ticker Control */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Add ticker (e.g. TSLA)..."
            value={inputTicker}
            onChange={(e) => setInputTicker(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTicker()}
            disabled={tickers.length >= 4}
            className="bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 disabled:opacity-50 font-mono"
          />
          <button
            onClick={addTicker}
            disabled={tickers.length >= 4 || !inputTicker.trim()}
            className="px-3 py-1.5 bg-amber-500 text-black text-xs font-bold rounded-xl hover:bg-amber-400 transition-colors disabled:opacity-50"
          >
            + Add
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-8 text-center text-xs font-mono text-amber-400 animate-pulse">
          Fetching side-by-side live metrics...
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400">
                <th className="py-3 px-4 uppercase tracking-wider">Metric</th>
                {comparisonData.map((stock) => (
                  <th key={stock.ticker} className="py-3 px-4 font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold text-sm">{stock.ticker}</span>
                      {tickers.length > 1 && (
                        <button
                          onClick={() => removeTicker(stock.ticker)}
                          className="text-zinc-500 hover:text-red-400 text-xs ml-2"
                          title="Remove ticker"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    <div className="text-[10px] text-zinc-400 font-sans truncate max-w-[120px]">
                      {stock.name}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {/* Live Price */}
              <tr>
                <td className="py-3 px-4 font-sans text-zinc-400 font-medium">Live Share Price</td>
                {comparisonData.map((s) => (
                  <td key={s.ticker} className="py-3 px-4 text-white font-bold">
                    {s.currency}{s.price.toFixed(2)}
                  </td>
                ))}
              </tr>

              {/* P/E Ratio */}
              <tr>
                <td className="py-3 px-4 font-sans text-zinc-400 font-medium">
                  P/E Ratio
                  <span className="block text-[10px] text-zinc-500 font-normal">Lower is cheaper</span>
                </td>
                {comparisonData.map((s) => {
                  const isLeader = s.peRatio > 0 && s.peRatio === lowestPE;
                  return (
                    <td
                      key={s.ticker}
                      className={`py-3 px-4 ${
                        isLeader ? 'text-emerald-400 font-bold bg-emerald-500/10 rounded-lg' : 'text-zinc-200'
                      }`}
                    >
                      {s.peRatio ? `${s.peRatio}x` : 'N/A'}
                      {isLeader && <span className="ml-1 text-[10px] uppercase font-sans">★ Leader</span>}
                    </td>
                  );
                })}
              </tr>

              {/* Debt-to-Equity */}
              <tr>
                <td className="py-3 px-4 font-sans text-zinc-400 font-medium">
                  Debt-to-Equity
                  <span className="block text-[10px] text-zinc-500 font-normal">Lower is safer</span>
                </td>
                {comparisonData.map((s) => {
                  const isLeader = s.deRatio === lowestDE;
                  return (
                    <td
                      key={s.ticker}
                      className={`py-3 px-4 ${
                        isLeader ? 'text-emerald-400 font-bold bg-emerald-500/10 rounded-lg' : 'text-zinc-200'
                      }`}
                    >
                      {s.deRatio}
                      {isLeader && <span className="ml-1 text-[10px] uppercase font-sans">★ Leader</span>}
                    </td>
                  );
                })}
              </tr>

              {/* Free Cash Flow Margin */}
              <tr>
                <td className="py-3 px-4 font-sans text-zinc-400 font-medium">
                  FCF Conversion Margin
                  <span className="block text-[10px] text-zinc-500 font-normal">Higher is better</span>
                </td>
                {comparisonData.map((s) => {
                  const isLeader = s.fcfMargin === highestFCFMargin && s.fcfMargin > 0;
                  return (
                    <td
                      key={s.ticker}
                      className={`py-3 px-4 ${
                        isLeader ? 'text-emerald-400 font-bold bg-emerald-500/10 rounded-lg' : 'text-zinc-200'
                      }`}
                    >
                      {s.fcfMargin.toFixed(1)}%
                      {isLeader && <span className="ml-1 text-[10px] uppercase font-sans">★ Leader</span>}
                    </td>
                  );
                })}
              </tr>

              {/* Free Cash Flow Total */}
              <tr>
                <td className="py-3 px-4 font-sans text-zinc-400 font-medium">Annual Free Cash Flow</td>
                {comparisonData.map((s) => (
                  <td key={s.ticker} className="py-3 px-4 text-emerald-400 font-bold">
                    {s.currency}{(s.freeCashFlow / 1e9).toFixed(2)}B
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
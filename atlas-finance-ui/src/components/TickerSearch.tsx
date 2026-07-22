'use client';

import React, { useState } from 'react';

interface TickerSearchProps {
  onSelectTicker: (data: any) => void;
}

export default function TickerSearch({ onSelectTicker }: TickerSearchProps) {
  const [inputSymbol, setInputSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputSymbol.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/quote?symbol=${encodeURIComponent(inputSymbol.trim())}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Symbol not found');

      onSelectTicker(data);
      setInputSymbol('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSearch} className="flex items-center gap-2 max-w-lg">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Type any symbol (e.g. TSLA, GOOGL, MSFT, INFY.NS)..."
            value={inputSymbol}
            onChange={(e) => setInputSymbol(e.target.value)}
            className="w-full px-4 py-2.5 bg-paper-card border border-ink text-xs mono uppercase placeholder:normal-case focus:outline-none focus:ring-1 focus:ring-ledger-green"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-ink text-paper text-xs mono font-bold hover:bg-ledger-green transition-colors cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Fetching...' : 'Analyze Ticker'}
        </button>
      </form>
      {error && <p className="text-ledger-red text-xs mono mt-2">{error}</p>}
    </div>
  );
}
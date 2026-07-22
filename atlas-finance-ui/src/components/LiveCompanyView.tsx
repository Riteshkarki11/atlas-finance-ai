// File: components/LiveCompanyView.tsx
'use client';

import { useState, useEffect } from 'react';
import DCFStudio from './DCFStudio';
import RatioBreakdown from './RatioBreakdown';
import ValuationChart from './ValuationChart';
import FinancialStatements from './FinancialStatements';
import ComparisonMatrix from './ComparisonMatrix';
import ExportPDF from './ExportPDF';
import Watchlist from './Watchlist';

export default function LiveCompanyView({
  initialTicker = 'NVDA',
}: {
  initialTicker?: string;
}) {
  const [ticker, setTicker] = useState<string>(initialTicker);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStock() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/stock?ticker=${encodeURIComponent(ticker)}`);
        const json = await res.json();
        if (json.success) {
          setData(json);
        } else {
          setError(json.error || 'Failed to load ticker data');
        }
      } catch (err) {
        setError('Network error fetching stock data');
      } finally {
        setLoading(false);
      }
    }

    fetchStock();
  }, [ticker]);

  return (
    <div className="space-y-8">
      {/* Watchlist / Portfolio Section */}
      <Watchlist onSelectTicker={(t) => setTicker(t)} currentTicker={ticker} />

      {loading ? (
        <div className="bg-[#111317] border border-white/10 p-12 rounded-3xl text-center space-y-4">
          <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-amber-400 font-mono">
            Fetching live market price & financial statements for {ticker}...
          </p>
        </div>
      ) : error || !data ? (
        <div className="bg-[#111317] border border-red-500/20 p-8 rounded-3xl text-center text-xs text-red-400 font-mono">
          {error || 'Unable to retrieve data for this ticker.'}
        </div>
      ) : (
        <>
          {/* Overview Header with PDF Export Action */}
          <div className="bg-[#111317] border border-white/10 p-8 rounded-3xl flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                {data.market} Live Equity
              </span>
              <h1 className="text-3xl font-bold text-white mt-1">
                {data.name} ({data.ticker})
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="text-left sm:text-right">
                <span className="text-xs text-zinc-400 uppercase">Live Market Price</span>
                <div className="text-3xl font-bold font-mono text-white">
                  {data.currency}
                  {data.price.toFixed(2)}
                </div>
              </div>

              <ExportPDF targetId="report-container" ticker={data.ticker} companyName={data.name} />
            </div>
          </div>

          {/* Main Container Target for PDF Snapshot */}
          <div id="report-container" className="space-y-8 p-2 bg-[#08090a]">
            {/* Dynamic DCF Valuation Studio */}
            <DCFStudio
              freeCashFlow={data.freeCashFlow}
              totalDebt={data.totalDebt}
              totalCash={data.totalCash}
              sharesOutstanding={data.sharesOutstanding}
              currentPrice={data.price}
              currency={data.currency}
            />

            {/* Plain English Ratio Breakdown */}
            <RatioBreakdown
              peRatio={data.peRatio}
              deRatio={data.deRatio}
              freeCashFlow={data.freeCashFlow}
              revenue={data.revenue}
              currency={data.currency}
            />

            {/* Historical Growth Trajectory Chart */}
            <ValuationChart
              historicalData={data.historicalFinancials}
              currency={data.currency}
            />

            {/* Dynamic Financial Statements */}
            <FinancialStatements
              currency={data.currency}
              incomeStatement={data.incomeStatement}
              balanceSheet={data.balanceSheet}
              cashFlowStatement={data.cashFlowStatement}
            />

            {/* Side-by-Side Multi-Stock Comparison Matrix */}
            <ComparisonMatrix currentTicker={data.ticker} />
          </div>
        </>
      )}
    </div>
  );
}
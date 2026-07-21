"use client";

import { formatCurrency } from "../../lib/format";

interface PriceDashboardProps {
  companyName: string;
  symbol: string;

  currentPrice: number;
  change: number;
  changePercent: number;

  high52Week: number;
  low52Week: number;

  marketCap?: number;
  peRatio?: number;
}

export default function PriceDashboard({
  companyName,
  symbol,
  currentPrice,
  change,
  changePercent,
  high52Week,
  low52Week,
  marketCap,
  peRatio,
}: PriceDashboardProps) {

  const positive = change >= 0;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-white">
            {companyName}
          </h1>

          <p className="mt-2 text-slate-400">
            {symbol}
          </p>

        </div>

        <div className="text-right">

          <h2 className="text-5xl font-bold text-white">
            {formatCurrency(currentPrice)}
          </h2>

          <p
            className={`mt-2 text-lg font-semibold ${
              positive ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {positive ? "+" : ""}
            {change.toFixed(2)} ({changePercent.toFixed(2)}%)
          </p>

        </div>

      </div>

      <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="rounded-xl border border-slate-800 p-5">
          <p className="text-slate-400 text-sm">
            52 Week High
          </p>

          <h3 className="mt-3 text-2xl font-bold text-emerald-400">
            {formatCurrency(high52Week)}
          </h3>
        </div>

        <div className="rounded-xl border border-slate-800 p-5">
          <p className="text-slate-400 text-sm">
            52 Week Low
          </p>

          <h3 className="mt-3 text-2xl font-bold text-red-400">
            {formatCurrency(low52Week)}
          </h3>
        </div>

        <div className="rounded-xl border border-slate-800 p-5">
          <p className="text-slate-400 text-sm">
            Market Cap
          </p>

          <h3 className="mt-3 text-2xl font-bold text-white">
            {marketCap
              ? formatCurrency(marketCap)
              : "--"}
          </h3>
        </div>

        <div className="rounded-xl border border-slate-800 p-5">
          <p className="text-slate-400 text-sm">
            P/E Ratio
          </p>

          <h3 className="mt-3 text-2xl font-bold text-white">
            {peRatio?.toFixed(2) ?? "--"}
          </h3>
        </div>

      </div>

    </div>
  );
}
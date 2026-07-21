"use client";

import {
  formatMarketCap,
  formatTicker,
} from "../../lib/format";

interface CompanyHeaderProps {
  companyName: string;
  symbol: string;
  exchange?: string;
  sector?: string;
  industry?: string;
  country?: string;
  currency?: string;
  marketCap?: number;
}

export default function CompanyHeader({
  companyName,
  symbol,
  exchange,
  sector,
  industry,
  country,
  currency,
  marketCap,
}: CompanyHeaderProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        {/* Left */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-white">
            {companyName}
          </h1>

          <p className="text-lg text-slate-400">
            {formatTicker(exchange, symbol)}
          </p>

          <p className="text-slate-400">
            {[sector, industry].filter(Boolean).join(" • ")}
          </p>
        </div>

        {/* Right */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
          <div>
            <p className="text-slate-400">Market Cap</p>

            <p className="text-lg font-semibold text-white">
              {formatMarketCap(marketCap)}
            </p>
          </div>

          <div>
            <p className="text-slate-400">Country</p>

            <p className="text-lg font-semibold text-white">
              {country ?? "-"}
            </p>
          </div>

          <div>
            <p className="text-slate-400">Currency</p>

            <p className="text-lg font-semibold text-white">
              {currency ?? "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import { Portfolio } from "../../types/portfolio";
import { formatCurrency } from "../../lib/format";

interface Props {
  portfolio: Portfolio;
}

export default function TopMovers({
  portfolio,
}: Props) {

  const gainers = [...portfolio.holdings]
    .sort((a, b) => b.gainLossPercent - a.gainLossPercent)
    .slice(0, 5);

  const losers = [...portfolio.holdings]
    .sort((a, b) => a.gainLossPercent - b.gainLossPercent)
    .slice(0, 5);

  return (

    <div className="grid gap-8 lg:grid-cols-2">

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

        <h2 className="mb-6 text-xl font-bold text-green-400">
          Top Gainers
        </h2>

        <div className="space-y-5">

          {gainers.map((holding) => (

            <div
              key={holding.symbol}
              className="flex items-center justify-between"
            >

              <div>

                <p className="font-semibold text-white">
                  {holding.symbol}
                </p>

                <p className="text-sm text-slate-400">
                  {holding.companyName}
                </p>

              </div>

              <div className="text-right">

                <p className="font-semibold text-green-400">
                  {holding.gainLossPercent.toFixed(2)}%
                </p>

                <p className="text-sm text-slate-400">
                  {formatCurrency(holding.gainLoss)}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

        <h2 className="mb-6 text-xl font-bold text-red-400">
          Top Losers
        </h2>

        <div className="space-y-5">

          {losers.map((holding) => (

            <div
              key={holding.symbol}
              className="flex items-center justify-between"
            >

              <div>

                <p className="font-semibold text-white">
                  {holding.symbol}
                </p>

                <p className="text-sm text-slate-400">
                  {holding.companyName}
                </p>

              </div>

              <div className="text-right">

                <p className="font-semibold text-red-400">
                  {holding.gainLossPercent.toFixed(2)}%
                </p>

                <p className="text-sm text-slate-400">
                  {formatCurrency(holding.gainLoss)}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}
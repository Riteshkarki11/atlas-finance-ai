"use client";

import { Portfolio } from "../../types/portfolio";
import { formatCurrency } from "../../lib/format";

interface Props {
  portfolio: Portfolio;
}

export default function Watchlist({
  portfolio,
}: Props) {

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Watchlist
      </h2>

      <div className="space-y-4">

        {portfolio.watchlist.map((stock) => {

          const positive = stock.change >= 0;

          return (

            <div
              key={stock.symbol}
              className="flex items-center justify-between rounded-xl border border-slate-800 p-4"
            >

              <div>

                <p className="font-semibold text-white">
                  {stock.symbol}
                </p>

                <p className="text-sm text-slate-400">
                  {stock.companyName}
                </p>

              </div>

              <div className="text-right">

                <p className="font-semibold text-white">
                  {formatCurrency(stock.price)}
                </p>

                <p
                  className={`text-sm font-medium ${
                    positive
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {stock.change >= 0 ? "+" : ""}
                  {stock.change.toFixed(2)}
                  {" ("}
                  {stock.changePercent.toFixed(2)}%
                  {")"}
                </p>

              </div>

            </div>

          );

        })}

      </div>

    </div>

  );

}
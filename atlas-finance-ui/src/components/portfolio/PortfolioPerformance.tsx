"use client";

import { Portfolio } from "../../types/portfolio";
import PortfolioChart from "./PortfolioChart";
import { formatCurrency } from "../../lib/format";

interface Props {
  portfolio: Portfolio;
}

export default function PortfolioPerformance({
  portfolio,
}: Props) {

  const latest =
    portfolio.performance.length > 0
      ? portfolio.performance[
          portfolio.performance.length - 1
        ]
      : null;

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Portfolio Performance
          </h2>

          <p className="mt-2 text-slate-400">
            Historical portfolio value over time
          </p>

        </div>

        {latest && (

          <div className="text-right">

            <p className="text-sm text-slate-400">
              Latest Portfolio Value
            </p>

            <h3 className="mt-2 text-3xl font-bold text-white">
              {formatCurrency(latest.value)}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {latest.date}
            </p>

          </div>

        )}

      </div>

      <PortfolioChart
        data={portfolio.performance}
      />

    </div>

  );

}
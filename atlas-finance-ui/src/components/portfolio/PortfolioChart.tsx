"use client";

import { PortfolioPerformancePoint } from "../../types/portfolio";

interface Props {
  data: PortfolioPerformancePoint[];
}

export default function PortfolioChart({
  data,
}: Props) {

  return (

    <div className="flex h-96 items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-950">

      <div className="text-center">

        <h3 className="text-xl font-semibold text-white">
          Portfolio Performance Chart
        </h3>

        <p className="mt-3 text-slate-400">
          Ready for Recharts / Chart.js integration
        </p>

        <p className="mt-2 text-sm text-slate-500">
          {data.length} historical data points loaded
        </p>

      </div>

    </div>

  );

}
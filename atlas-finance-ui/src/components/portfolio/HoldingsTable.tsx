"use client";

import { Portfolio } from "../../types/portfolio";
import HoldingRow from "./HoldingRow";

interface Props {
  portfolio: Portfolio;
}

export default function HoldingsTable({
  portfolio,
}: Props) {

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">

      <div className="border-b border-slate-800 px-6 py-5">

        <h2 className="text-2xl font-bold text-white">
          Holdings
        </h2>

        <p className="mt-2 text-slate-400">
          Current portfolio positions
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-950">

            <tr>

              <th className="px-4 py-4 text-left text-sm font-semibold text-slate-300">
                Company
              </th>

              <th className="px-4 py-4 text-right text-sm font-semibold text-slate-300">
                Shares
              </th>

              <th className="px-4 py-4 text-right text-sm font-semibold text-slate-300">
                Avg Cost
              </th>

              <th className="px-4 py-4 text-right text-sm font-semibold text-slate-300">
                Current
              </th>

              <th className="px-4 py-4 text-right text-sm font-semibold text-slate-300">
                Market Value
              </th>

              <th className="px-4 py-4 text-right text-sm font-semibold text-slate-300">
                Gain / Loss
              </th>

              <th className="px-4 py-4 text-right text-sm font-semibold text-slate-300">
                Allocation
              </th>

            </tr>

          </thead>

          <tbody>

            {portfolio.holdings.map((holding) => (

              <HoldingRow
                key={holding.symbol}
                holding={holding}
              />

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}
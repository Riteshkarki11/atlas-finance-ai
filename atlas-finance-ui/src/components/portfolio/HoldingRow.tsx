"use client";

import { Holding } from "../../types/portfolio";
import { formatCurrency } from "../../lib/format";

interface Props {
  holding: Holding;
}

export default function HoldingRow({
  holding,
}: Props) {

  const positive = holding.gainLoss >= 0;

  return (

    <tr className="border-b border-slate-800 hover:bg-slate-800/40 transition-colors">

      <td className="px-4 py-4">

        <div>

          <p className="font-semibold text-white">
            {holding.symbol}
          </p>

          <p className="text-sm text-slate-400">
            {holding.companyName}
          </p>

        </div>

      </td>

      <td className="px-4 py-4 text-right text-white">
        {holding.shares.toLocaleString()}
      </td>

      <td className="px-4 py-4 text-right text-white">
        {formatCurrency(holding.averageCost)}
      </td>

      <td className="px-4 py-4 text-right text-white">
        {formatCurrency(holding.currentPrice)}
      </td>

      <td className="px-4 py-4 text-right font-semibold text-white">
        {formatCurrency(holding.marketValue)}
      </td>

      <td
        className={`px-4 py-4 text-right font-semibold ${
          positive
            ? "text-green-400"
            : "text-red-400"
        }`}
      >
        {formatCurrency(holding.gainLoss)}

        <div className="text-sm">

          {holding.gainLossPercent.toFixed(2)}%

        </div>

      </td>

      <td className="px-4 py-4 text-right text-white">
        {holding.allocation.toFixed(2)}%
      </td>

    </tr>

  );

}
"use client";

import { Portfolio } from "../../types/portfolio";
import { formatCurrency } from "../../lib/format";

interface Props {
  portfolio: Portfolio;
}

export default function TransactionHistory({
  portfolio,
}: Props) {

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">

      <div className="border-b border-slate-800 px-6 py-5">

        <h2 className="text-2xl font-bold text-white">
          Transaction History
        </h2>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-950">

            <tr>

              <th className="px-4 py-4 text-left text-slate-300">
                Date
              </th>

              <th className="px-4 py-4 text-left text-slate-300">
                Symbol
              </th>

              <th className="px-4 py-4 text-left text-slate-300">
                Type
              </th>

              <th className="px-4 py-4 text-right text-slate-300">
                Shares
              </th>

              <th className="px-4 py-4 text-right text-slate-300">
                Price
              </th>

              <th className="px-4 py-4 text-right text-slate-300">
                Amount
              </th>

            </tr>

          </thead>

          <tbody>

            {portfolio.transactions.map((tx) => (

              <tr
                key={tx.id}
                className="border-b border-slate-800 hover:bg-slate-800/40"
              >

                <td className="px-4 py-4 text-white">
                  {tx.date}
                </td>

                <td className="px-4 py-4 font-semibold text-white">
                  {tx.symbol}
                </td>

                <td
                  className={`px-4 py-4 font-semibold ${
                    tx.type === "BUY"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {tx.type}
                </td>

                <td className="px-4 py-4 text-right text-white">
                  {tx.shares.toLocaleString()}
                </td>

                <td className="px-4 py-4 text-right text-white">
                  {formatCurrency(tx.price)}
                </td>

                <td className="px-4 py-4 text-right font-semibold text-white">
                  {formatCurrency(tx.amount)}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}
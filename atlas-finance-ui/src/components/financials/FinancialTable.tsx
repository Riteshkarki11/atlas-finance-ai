"use client";

import FinancialMetricCell from "./FinancialMetricCell";

interface Row {
  label: string;
  values: (number | null | undefined)[];
}

interface Props {
  periods: string[];
  rows: Row[];
}

export default function FinancialTable({
  periods,
  rows,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800">
      <table className="min-w-full border-collapse">

        <thead className="bg-slate-900 sticky top-0">

          <tr>

            <th className="sticky left-0 bg-slate-900 px-5 py-4 text-left text-white border-b border-slate-800">
              Metric
            </th>

            {periods.map((period) => (
              <th
                key={period}
                className="px-5 py-4 text-right text-slate-300 border-b border-slate-800 whitespace-nowrap"
              >
                {period}
              </th>
            ))}

          </tr>

        </thead>

        <tbody>

          {rows.map((row) => (

            <tr
              key={row.label}
              className="hover:bg-slate-900/60 transition"
            >

              <td className="sticky left-0 bg-slate-950 px-5 py-4 border-b border-slate-800 font-medium text-white">
                {row.label}
              </td>

              {row.values.map((value, index) => (
                <FinancialMetricCell
                  key={index}
                  value={value}
                />
              ))}

            </tr>

          ))}

        </tbody>

      </table>
    </div>
  );
}
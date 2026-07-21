"use client";

import { Allocation } from "../../types/portfolio";
import { formatCurrency } from "../../lib/format";

interface Props {
  title: string;
  allocations: Allocation[];
}

export default function AllocationCard({
  title,
  allocations,
}: Props) {

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-xl font-bold text-white">
        {title}
      </h2>

      <div className="space-y-5">

        {allocations.map((item) => (

          <div key={item.name}>

            <div className="mb-2 flex justify-between">

              <span className="text-white">
                {item.name}
              </span>

              <span className="text-slate-300">
                {item.percentage.toFixed(1)}%
              </span>

            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-800">

              <div
                className="h-full rounded-full bg-blue-500"
                style={{
                  width: `${item.percentage}%`,
                }}
              />

            </div>

            <p className="mt-2 text-sm text-slate-400">
              {formatCurrency(item.value)}
            </p>

          </div>

        ))}

      </div>

    </div>

  );

}
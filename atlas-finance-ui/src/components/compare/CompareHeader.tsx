"use client";

interface Props {
  symbols: string[];
}

export default function CompareHeader({
  symbols,
}: Props) {

  return (

    <thead className="bg-slate-950">

      <tr>

        <th className="sticky left-0 bg-slate-950 px-5 py-4 text-left text-sm font-semibold text-slate-300">
          Metric
        </th>

        {symbols.map((symbol) => (

          <th
            key={symbol}
            className="px-5 py-4 text-center"
          >

            <div className="flex flex-col items-center">

              <div className="rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold">

                {symbol || "-"}

              </div>

            </div>

          </th>

        ))}

      </tr>

    </thead>

  );

}
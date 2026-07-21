"use client";

import MetricBadge from "./MetricBadge";

interface Props {

  label: string;

  values: (number | string)[];

  suffix?: string;

  precision?: number;

  positiveGood?: boolean;

}

export default function ComparisonRow({

  label,

  values,

  suffix,

  precision,

  positiveGood,

}: Props) {

  return (

    <tr className="border-b border-slate-800 hover:bg-slate-800/40">

      <td className="sticky left-0 bg-slate-900 px-5 py-4 font-medium text-white">

        {label}

      </td>

      {values.map((value, index) => (

        <td
          key={index}
          className="px-5 py-4 text-center"
        >

          <MetricBadge
            value={value}
            suffix={suffix}
            precision={precision}
            positiveGood={positiveGood}
          />

        </td>

      ))}

    </tr>

  );

}
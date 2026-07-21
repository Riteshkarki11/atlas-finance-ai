"use client";

import { formatCurrency } from "../../lib/format";

interface Props {
  value?: number | null;
  percent?: boolean;
  currency?: boolean;
  decimals?: number;
}

export default function FinancialMetricCell({
  value,
  percent = false,
  currency = true,
  decimals = 2,
}: Props) {
  if (value === undefined || value === null) {
    return (
      <td className="px-4 py-3 text-center text-slate-500">
        —
      </td>
    );
  }

  const positive = value >= 0;

  let display = "";

  if (currency) {
    display = formatCurrency(value);
  } else if (percent) {
    display = `${value.toFixed(decimals)}%`;
  } else {
    display = value.toLocaleString();
  }

  return (
    <td
      className={`px-4 py-3 text-right font-medium ${
        positive ? "text-emerald-400" : "text-red-400"
      }`}
    >
      {display}
    </td>
  );
}
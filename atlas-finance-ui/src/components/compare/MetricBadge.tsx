"use client";

interface Props {

  value: number | string;

  suffix?: string;

  precision?: number;

  positiveGood?: boolean;

}

export default function MetricBadge({

  value,

  suffix = "",

  precision = 2,

  positiveGood = true,

}: Props) {

  if (
    value === null ||
    value === undefined
  ) {

    return (
      <span className="text-slate-500">
        —
      </span>
    );

  }

  if (typeof value === "string") {

    return (
      <span className="font-medium text-white">
        {value}
      </span>
    );

  }

  const color =
    positiveGood
      ? value >= 0
        ? "text-green-400"
        : "text-red-400"
      : "text-white";

  return (

    <span
      className={`font-semibold ${color}`}
    >

      {value.toFixed(precision)}
      {suffix}

    </span>

  );

}
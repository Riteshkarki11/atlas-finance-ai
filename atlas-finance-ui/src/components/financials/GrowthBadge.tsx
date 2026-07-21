"use client";

interface Props {
  growth: number;
}

export default function GrowthBadge({
  growth,
}: Props) {

  const positive = growth >= 0;

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        positive
          ? "bg-emerald-500/20 text-emerald-400"
          : "bg-red-500/20 text-red-400"
      }`}
    >
      {positive ? "+" : ""}
      {growth.toFixed(2)}%
    </span>
  );
}
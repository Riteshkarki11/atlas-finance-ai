"use client";

interface Props {
  value: number;
  inverse?: boolean;
}

export default function RatioBadge({
  value,
  inverse = false,
}: Props) {

  const good = inverse ? value < 1 : value >= 1;

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        good
          ? "bg-emerald-500/20 text-emerald-400"
          : "bg-red-500/20 text-red-400"
      }`}
    >
      {value.toFixed(2)}
    </span>
  );
}
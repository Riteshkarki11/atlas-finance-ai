"use client";

interface Props {
  title: string;
  value: number | string;
  suffix?: string;
  description?: string;
  positive?: boolean;
}

export default function RatioCard({
  title,
  value,
  suffix = "",
  description,
  positive = true,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500">

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h2
        className={`mt-4 text-4xl font-bold ${
          positive
            ? "text-emerald-400"
            : "text-red-400"
        }`}
      >
        {value}
        {suffix}
      </h2>

      {description && (
        <p className="mt-3 text-sm text-slate-500">
          {description}
        </p>
      )}

    </div>
  );
}
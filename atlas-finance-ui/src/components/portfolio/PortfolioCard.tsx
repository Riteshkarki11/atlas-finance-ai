"use client";

interface Props {

  title: string;

  value: string;

  subtitle?: string;

  positive?: boolean;

}

export default function PortfolioCard({

  title,

  value,

  subtitle,

  positive,

}: Props) {

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h2
        className={`mt-3 text-3xl font-bold ${
          positive === undefined
            ? "text-white"
            : positive
            ? "text-green-400"
            : "text-red-400"
        }`}
      >
        {value}
      </h2>

      {subtitle && (
        <p className="mt-2 text-sm text-slate-400">
          {subtitle}
        </p>
      )}

    </div>

  );

}
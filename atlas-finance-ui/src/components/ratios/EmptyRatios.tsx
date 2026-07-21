"use client";

interface Props {
  title?: string;
}

export default function EmptyRatios({
  title = "Financial ratios unavailable",
}: Props) {

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">

      <h2 className="text-2xl font-semibold text-white">
        {title}
      </h2>

      <p className="mt-3 text-slate-400">
        Ratio data could not be loaded for this company.
      </p>

    </div>
  );
}
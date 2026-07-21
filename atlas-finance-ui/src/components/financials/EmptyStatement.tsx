"use client";

interface Props {
  title?: string;
}

export default function EmptyStatement({
  title = "Financial statements unavailable",
}: Props) {

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-12 text-center">

      <h3 className="text-2xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 text-slate-400">
        No financial statement data is currently available.
      </p>

    </div>
  );
}
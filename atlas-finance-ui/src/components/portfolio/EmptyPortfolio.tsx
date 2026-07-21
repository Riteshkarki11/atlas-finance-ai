"use client";

interface Props {
  title?: string;
}

export default function EmptyPortfolio({
  title = "No Portfolio Found",
}: Props) {

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-16 text-center">

      <h2 className="text-3xl font-bold text-white">
        {title}
      </h2>

      <p className="mt-4 text-slate-400">
        Your portfolio is empty. Add holdings to begin tracking performance.
      </p>

    </div>

  );

}
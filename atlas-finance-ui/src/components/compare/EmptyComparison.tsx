"use client";

interface Props {
  message?: string;
}

export default function EmptyComparison({

  message = "Select two or more companies to begin comparison.",

}: Props) {

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-16 text-center">

      <h2 className="text-3xl font-bold text-white">

        Compare Companies

      </h2>

      <p className="mt-4 text-slate-400">

        {message}

      </p>

    </div>

  );

}
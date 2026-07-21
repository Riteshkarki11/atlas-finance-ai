"use client";

interface Props {

  title: string;

  description: string;

}

export default function EmptyState({

  title,

  description,

}: Props) {

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-16 text-center">

      <h2 className="text-3xl font-bold text-white">

        {title}

      </h2>

      <p className="mt-4 text-slate-400">

        {description}

      </p>

    </div>

  );

}
"use client";

export default function LoadingRatios() {

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {Array.from({ length: 12 }).map((_, i) => (

        <div
          key={i}
          className="h-36 animate-pulse rounded-2xl bg-slate-800"
        />

      ))}

    </div>
  );
}
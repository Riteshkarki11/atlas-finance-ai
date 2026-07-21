"use client";

export default function LoadingComparison() {

  return (

    <div className="space-y-8 animate-pulse">

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {[...Array(4)].map((_, index) => (

          <div
            key={index}
            className="h-24 rounded-2xl bg-slate-800"
          />

        ))}

      </div>

      <div className="h-[900px] rounded-2xl bg-slate-800" />

    </div>

  );

}
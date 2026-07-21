"use client";

export default function LoadingPortfolio() {

  return (

    <div className="space-y-8 animate-pulse">

      <div className="grid gap-6 md:grid-cols-4">

        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-36 rounded-2xl bg-slate-800"
          />
        ))}

      </div>

      <div className="h-96 rounded-2xl bg-slate-800" />

      <div className="h-[500px] rounded-2xl bg-slate-800" />

    </div>

  );

}
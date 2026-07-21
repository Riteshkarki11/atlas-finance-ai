"use client";

export default function LoadingStatement() {

  return (
    <div className="space-y-4 animate-pulse">

      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="h-12 rounded-lg bg-slate-800"
        />
      ))}

    </div>
  );
}
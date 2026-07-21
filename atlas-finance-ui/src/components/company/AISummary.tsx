interface AISummaryProps {
  summary: string;
}

export default function AISummary({
  summary,
}: AISummaryProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
      <h2 className="mb-4 text-2xl font-bold text-white">
        AI Investment Summary
      </h2>

      <p className="leading-8 text-slate-300">
        {summary}
      </p>
    </div>
  );
}
interface RecommendationCardProps {
  recommendation: string;
  confidence: number;
}

export default function RecommendationCard({
  recommendation,
  confidence,
}: RecommendationCardProps) {
  const styles = {
    BUY: "bg-green-500/20 text-green-400",
    HOLD: "bg-yellow-500/20 text-yellow-400",
    SELL: "bg-red-500/20 text-red-400",
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-sm uppercase tracking-wide text-slate-400">
        Recommendation
      </p>

      <div
        className={`mt-4 inline-flex rounded-full px-5 py-2 text-lg font-bold ${
          styles[recommendation as keyof typeof styles]
        }`}
      >
        {recommendation}
      </div>

      <div className="mt-8">
        <p className="text-sm text-slate-400">Confidence</p>

        <h2 className="mt-2 text-4xl font-bold text-white">
          {confidence}%
        </h2>
      </div>
    </div>
  );
}
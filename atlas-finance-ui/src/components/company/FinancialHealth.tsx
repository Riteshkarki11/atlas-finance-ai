"use client";

import ProgressBar from "../ui/ProgressBar";

interface FinancialHealthProps {
  valuation: number;
  growth: number;
  profitability: number;
  liquidity: number;
  leverage: number;
  risk: number;
}

function overallColor(score: number) {
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-yellow-400";
  if (score >= 40) return "text-orange-400";
  return "text-red-400";
}

export default function FinancialHealth({
  valuation,
  growth,
  profitability,
  liquidity,
  leverage,
  risk,
}: FinancialHealthProps) {
  const overall = Math.round(
    (
      valuation +
      growth +
      profitability +
      liquidity +
      leverage +
      risk
    ) / 6
  );

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Financial Health
          </h2>

          <p className="mt-1 text-slate-400">
            AI evaluation of the company's financial fundamentals
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-slate-400">
            Overall Score
          </p>

          <h2 className={`text-5xl font-bold ${overallColor(overall)}`}>
            {overall}
          </h2>
        </div>
      </div>

      <div className="space-y-6">
        <ProgressBar label="Valuation" value={valuation} />
        <ProgressBar label="Growth" value={growth} />
        <ProgressBar label="Profitability" value={profitability} />
        <ProgressBar label="Liquidity" value={liquidity} />
        <ProgressBar label="Leverage" value={leverage} />
        <ProgressBar label="Risk" value={risk} />
      </div>
    </div>
  );
}
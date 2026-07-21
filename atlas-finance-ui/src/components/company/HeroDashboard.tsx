"use client";

import { formatCurrency } from "../../lib/format";

interface HeroDashboardProps {
  recommendation: string;
  confidence: number;
  score: number;
  grade: string;

  intrinsicValue: number;
  currentPrice?: number;

  marginOfSafety: number;

  currency?: string;
}

export default function HeroDashboard({
  recommendation,
  confidence,
  score,
  grade,
  intrinsicValue,
  currentPrice,
  marginOfSafety,
  currency,
}: HeroDashboardProps) {

  const recommendationColor =
    recommendation === "BUY"
      ? "text-emerald-400"
      : recommendation === "HOLD"
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Recommendation */}

        <div>

          <p className="text-slate-400 uppercase text-sm">
            Recommendation
          </p>

          <h1
            className={`mt-3 text-5xl font-bold ${recommendationColor}`}
          >
            {recommendation}
          </h1>

          <p className="mt-6 text-slate-400">
            Confidence
          </p>

          <h3 className="text-3xl font-bold text-white">
            {confidence}%
          </h3>

        </div>

        {/* Score */}

        <div>

          <p className="text-slate-400 uppercase text-sm">
            AI Score
          </p>

          <h1 className="mt-3 text-6xl font-bold text-white">
            {score}
          </h1>

          <p className="mt-6 text-slate-400">
            Grade
          </p>

          <h3 className="text-3xl font-bold text-blue-400">
            {grade}
          </h3>

        </div>

        {/* Valuation */}

        <div>

          <p className="text-slate-400 uppercase text-sm">
            Intrinsic Value
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {formatCurrency(intrinsicValue)}
          </h2>

          <p className="mt-6 text-slate-400">
            Margin of Safety
          </p>

          <h3
            className={`text-3xl font-bold ${
              marginOfSafety >= 0
                ? "text-emerald-400"
                : "text-red-400"
            }`}
          >
            {marginOfSafety.toFixed(2)}%
          </h3>

        </div>

      </div>

    </div>
  );
}
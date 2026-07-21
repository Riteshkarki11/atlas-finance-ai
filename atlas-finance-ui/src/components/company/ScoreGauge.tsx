"use client";

import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

interface ScoreGaugeProps {
  score: number;
  recommendation: string;
}

export default function ScoreGauge({
  score,
  recommendation,
}: ScoreGaugeProps) {
  const data = [
    {
      name: "Score",
      value: score,
      fill:
        score >= 80
          ? "#22c55e"
          : score >= 60
          ? "#f59e0b"
          : "#ef4444",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
      <h3 className="mb-6 text-center text-lg font-semibold text-slate-300">
        Overall Investment Score
      </h3>

      <div className="relative h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="75%"
            outerRadius="100%"
            data={data}
            startAngle={180}
            endAngle={0}
            barSize={18}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />

            <RadialBar
              background
              dataKey="value"
              cornerRadius={12}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold text-white">
            {score.toFixed(1)}
          </span>

          <span className="mt-2 text-slate-400">
            /100
          </span>

          <span
            className={`mt-5 rounded-full px-4 py-2 text-sm font-bold ${
              recommendation === "BUY"
                ? "bg-green-500/20 text-green-400"
                : recommendation === "HOLD"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {recommendation}
          </span>
        </div>
      </div>
    </div>
  );
}
"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: "positive" | "negative" | "neutral";
}

export default function StatCard({
  title,
  value,
  subtitle,
  trend = "neutral",
}: StatCardProps) {
  const trendStyles = {
    positive: {
      icon: TrendingUp,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    negative: {
      icon: TrendingDown,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
    neutral: {
      icon: Minus,
      color: "text-slate-400",
      bg: "bg-slate-700/40",
    },
  };

  const { icon: Icon, color, bg } = trendStyles[trend];

  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-2xl">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium uppercase tracking-wide text-slate-400">
          {title}
        </span>

        <div className={`rounded-full p-2 ${bg}`}>
          <Icon size={18} className={color} />
        </div>
      </div>

      <h2 className="mt-6 text-4xl font-bold text-white">
        {value}
      </h2>

      {subtitle && (
        <p className={`mt-3 text-sm ${color}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
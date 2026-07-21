"use client";

interface ProgressBarProps {
  label: string;
  value: number;
}

function getStatus(value: number) {
  if (value >= 80)
    return {
      text: "Excellent",
      color: "text-emerald-400",
      gradient: "from-emerald-400 to-green-500",
      glow: "shadow-emerald-500/30",
    };

  if (value >= 60)
    return {
      text: "Good",
      color: "text-yellow-400",
      gradient: "from-yellow-400 to-orange-400",
      glow: "shadow-yellow-500/30",
    };

  if (value >= 40)
    return {
      text: "Average",
      color: "text-orange-400",
      gradient: "from-orange-400 to-orange-500",
      glow: "shadow-orange-500/30",
    };

  return {
    text: "Poor",
    color: "text-red-400",
    gradient: "from-red-400 to-red-600",
    glow: "shadow-red-500/30",
  };
}

export default function ProgressBar({
  label,
  value,
}: ProgressBarProps) {
  const status = getStatus(value);

  return (
    <div className="group space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-white">
            {label}
          </h4>

          <p className={`text-sm ${status.color}`}>
            {status.text}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2">
          <span className={`text-lg font-bold ${status.color}`}>
            {value}
          </span>

          <span className="text-slate-400">
            {" "}
            /100
          </span>
        </div>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          style={{ width: `${value}%` }}
          className={`
            h-full
            rounded-full
            bg-gradient-to-r
            ${status.gradient}
            ${status.glow}
            transition-all
            duration-1000
            ease-out
            group-hover:brightness-110
          `}
        />
      </div>
    </div>
  );
}
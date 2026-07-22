// File: components/RatioBreakdown.tsx
'use client';

import React from 'react';

interface RatioProps {
  peRatio: number;
  deRatio: number;
  freeCashFlow: number;
  revenue: number;
  currency: string;
}

export default function RatioBreakdown({ peRatio, deRatio, freeCashFlow, revenue, currency }: RatioProps) {
  const fcfMargin = revenue > 0 ? ((freeCashFlow / revenue) * 100).toFixed(1) : 'N/A';

  return (
    <div className="bg-[#111317] border border-white/10 p-6 md:p-8 rounded-3xl space-y-6">
      <h2 className="text-xl font-bold text-white">📊 Plain-English Health Insights</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-black/30 border border-white/5 p-5 rounded-2xl space-y-2">
          <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Valuation Multiple</span>
          <div className="text-2xl font-bold text-amber-400 font-mono">{peRatio ? `${peRatio}x P/E` : 'N/A'}</div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            {peRatio > 40
              ? 'High market expectations; investors are paying a premium for fast growth.'
              : peRatio > 0
              ? 'Fair valuation relative to earnings generated over trailing 12 months.'
              : 'Negative earnings or non-standard corporate structure.'}
          </p>
        </div>

        <div className="bg-black/30 border border-white/5 p-5 rounded-2xl space-y-2">
          <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Balance Sheet Leverage</span>
          <div className="text-2xl font-bold text-white font-mono">{deRatio ? `${deRatio} D/E` : 'Debt Free'}</div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            {deRatio < 0.5
              ? 'Exceptionally safe leverage. Company operates with low default risk.'
              : deRatio < 1.5
              ? 'Balanced debt structures supporting organic business operations.'
              : 'High leverage structure; higher sensitivity to interest rate fluctuations.'}
          </p>
        </div>

        <div className="bg-black/30 border border-white/5 p-5 rounded-2xl space-y-2">
          <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Free Cash Flow Conversion</span>
          <div className="text-2xl font-bold text-emerald-400 font-mono">{fcfMargin}% Margin</div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Measures how efficiently sales convert into pure cash after capital expenditure investments.
          </p>
        </div>
      </div>
    </div>
  );
}
'use client';

import React, { useState } from 'react';

export default function ValuationSensitivityGrid({
  baseWacc = 10.2,
  baseGrowth = 3.0,
  baseValuation = 164.3,
}: {
  baseWacc?: number;
  baseGrowth?: number;
  baseValuation?: number;
}) {
  const waccRange = [9.0, 9.5, 10.2, 11.0, 11.5];
  const growthRange = [2.0, 2.5, 3.0, 3.5, 4.0];

  const calculateCellValuation = (wacc: number, growth: number) => {
    const waccDiff = (wacc - baseWacc) * 12.5;
    const growthDiff = (growth - baseGrowth) * 15.0;
    return (baseValuation - waccDiff + growthDiff).toFixed(2);
  };

  return (
    <div className="bg-[#14171B] border border-[#2D3139] p-5 rounded-sm font-mono text-xs space-y-3">
      <div className="flex justify-between items-center border-b border-[#212529] pb-2">
        <h3 className="serif text-sm font-bold text-white uppercase">
          Valuation Sensitivity Matrix (WACC vs. Terminal Growth)
        </h3>
        <span className="text-[10px] text-[#B8892B]">Base Intrinsic Value: ${baseValuation.toFixed(2)}</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr>
              <th className="p-2 border border-[#2D3139] bg-[#0D0F11] text-[#8C9097] text-[10px] uppercase">
                WACC \ Growth
              </th>
              {growthRange.map((g) => (
                <th key={g} className="p-2 border border-[#2D3139] bg-[#0D0F11] text-white">
                  {g.toFixed(1)}%
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {waccRange.map((w) => (
              <tr key={w}>
                <td className="p-2 border border-[#2D3139] bg-[#0D0F11] font-bold text-[#8C9097]">
                  {w.toFixed(1)}%
                </td>
                {growthRange.map((g) => {
                  const val = parseFloat(calculateCellValuation(w, g));
                  const isBase = w === baseWacc && g === baseGrowth;
                  return (
                    <td
                      key={g}
                      className={`p-2.5 border border-[#2D3139] transition-all cursor-pointer ${
                        isBase
                          ? 'bg-[#1B5E4A] text-white font-bold ring-2 ring-[#7FBF9E]'
                          : val > baseValuation
                          ? 'bg-[#1B5E4A]/20 text-[#7FBF9E] hover:bg-[#1B5E4A]/40'
                          : 'bg-[#D98E85]/10 text-[#D98E85] hover:bg-[#D98E85]/30'
                      }`}
                    >
                      ${val.toFixed(2)}
                      {isBase && <span className="block text-[8px] uppercase tracking-wider">Base Case</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
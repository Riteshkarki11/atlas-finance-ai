'use client';

import React, { useState } from 'react';

interface MetricPoint {
  period: string;
  revenue: number;
  fcf: number;
  margin: number;
}

const ANNUAL_DATA: MetricPoint[] = [
  { period: '2022A', revenue: 26974, fcf: 8128, margin: 30.1 },
  { period: '2023A', revenue: 26914, fcf: 3808, margin: 14.1 },
  { period: '2024A', revenue: 60922, fcf: 27021, margin: 44.3 },
  { period: '2025E', revenue: 126000, fcf: 59820, margin: 47.4 },
  { period: '2026E', revenue: 152900, fcf: 75610, margin: 49.4 },
  { period: '2027E', revenue: 181200, fcf: 89200, margin: 49.2 },
];

const QUARTERLY_DATA: MetricPoint[] = [
  { period: 'Q1 25', revenue: 26044, fcf: 14936, margin: 57.3 },
  { period: 'Q2 25', revenue: 30040, fcf: 13484, margin: 44.8 },
  { period: 'Q3 25', revenue: 35082, fcf: 16790, margin: 47.8 },
  { period: 'Q4 25', revenue: 34834, fcf: 14610, margin: 41.9 },
];

export default function FinancialChart() {
  const [mode, setMode] = useState<'annual' | 'quarterly'>('annual');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const data = mode === 'annual' ? ANNUAL_DATA : QUARTERLY_DATA;
  const maxRevenue = Math.max(...data.map((d) => d.revenue));

  return (
    <section className="mt-16 border-t border-[#DBDAD2] pt-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="mono text-xs uppercase tracking-widest text-[#0F3B2E] mb-1">
            Visual Analytics Engine
          </div>
          <h2 className="serif text-3xl font-semibold">Revenue & Unlevered Free Cash Flow Trend</h2>
        </div>

        {/* View Toggle */}
        <div className="flex border border-[#14171B] bg-[#F7F6F2] p-1 text-xs mono">
          <button
            onClick={() => {
              setMode('annual');
              setHoveredIdx(null);
            }}
            className={`px-4 py-1.5 font-medium transition-colors cursor-pointer ${
              mode === 'annual' ? 'bg-[#14171B] text-[#F7F6F2]' : 'text-[#4A4E52] hover:text-[#14171B]'
            }`}
          >
            Annual Projections
          </button>
          <button
            onClick={() => {
              setMode('quarterly');
              setHoveredIdx(null);
            }}
            className={`px-4 py-1.5 font-medium transition-colors cursor-pointer ${
              mode === 'quarterly' ? 'bg-[#14171B] text-[#F7F6F2]' : 'text-[#4A4E52] hover:text-[#14171B]'
            }`}
          >
            Quarterly Breakdown
          </button>
        </div>
      </div>

      {/* Chart Card */}
      <div className="hazy-card shadow-[6px_6px_0_#0F3B2E] p-6 relative">
        {/* Legend */}
        <div className="flex items-center justify-between border-b border-[#DBDAD2] pb-4 mb-6 text-xs mono">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#1B5E4A] inline-block"></span>
              <span className="text-[#14171B]">Total Revenue ($M)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#B8892B] inline-block"></span>
              <span className="text-[#14171B]">Unlevered FCF ($M)</span>
            </div>
          </div>
          <span className="text-[#4A4E52]">Hover bars for detailed margins</span>
        </div>

        {/* SVG Native Bar Chart */}
        <div className="h-64 flex items-end justify-between gap-4 pt-8 pb-4 relative px-4">
          {data.map((item, idx) => {
            const revHeight = (item.revenue / maxRevenue) * 100;
            const fcfHeight = (item.fcf / maxRevenue) * 100;
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={item.period}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
              >
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute -top-12 z-30 bg-[#14171B] text-[#F7F6F2] text-[11px] mono p-2 shadow-md rounded-xs border border-[#DBDAD2] whitespace-nowrap">
                    <div>Rev: ${(item.revenue / 1000).toFixed(1)}B</div>
                    <div>FCF: ${(item.fcf / 1000).toFixed(1)}B ({item.margin}%)</div>
                  </div>
                )}

                {/* Bars Container */}
                <div className="w-full flex items-end justify-center gap-1.5 h-full">
                  {/* Revenue Bar */}
                  <div
                    style={{ height: `${revHeight}%` }}
                    className={`w-1/2 transition-all duration-300 rounded-t-xs ${
                      isHovered ? 'bg-[#0F3B2E]' : 'bg-[#1B5E4A]'
                    }`}
                  />
                  {/* FCF Bar */}
                  <div
                    style={{ height: `${fcfHeight}%` }}
                    className={`w-1/2 transition-all duration-300 rounded-t-xs ${
                      isHovered ? 'bg-[#966E20]' : 'bg-[#B8892B]'
                    }`}
                  />
                </div>

                {/* Period Label */}
                <span className={`text-xs mono mt-3 ${isHovered ? 'font-bold text-[#0F3B2E]' : 'text-[#4A4E52]'}`}>
                  {item.period}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

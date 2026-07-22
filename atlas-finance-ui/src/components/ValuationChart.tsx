// File: components/ValuationChart.tsx
'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts';

interface ChartProps {
  historicalData: {
    year: string;
    revenue: number;
    netIncome: number;
    operatingCashFlow: number;
    capEx: number;
  }[];
  currency: string;
}

export default function ValuationChart({ historicalData, currency }: ChartProps) {
  const [chartType, setChartType] = useState<'revenue' | 'cashflow'>('revenue');

  if (!historicalData || historicalData.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#111317] border border-white/10 p-6 md:p-8 rounded-3xl space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>📈 Financial Trajectory & Growth Trends</span>
          </h2>
          <p className="text-xs text-zinc-400">Historical performance in Billions ({currency}).</p>
        </div>

        <div className="flex gap-2 bg-black/40 p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setChartType('revenue')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              chartType === 'revenue' ? 'bg-amber-500 text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Revenue vs Net Income
          </button>
          <button
            onClick={() => setChartType('cashflow')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              chartType === 'cashflow' ? 'bg-amber-500 text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Cash Flow vs CapEx
          </button>
        </div>
      </div>

      <div className="h-72 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'revenue' ? (
            <BarChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="year" stroke="#a1a1aa" fontSize={12} tickLine={false} />
              <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} tickFormatter={(v) => `${currency}${v}B`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '12px' }}
                formatter={(value: any) => [`${currency}${Number(value).toFixed(2)}B`, '']}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="revenue" name="Revenue" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              <Bar dataKey="netIncome" name="Net Income" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : (
            <AreaChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="year" stroke="#a1a1aa" fontSize={12} tickLine={false} />
              <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} tickFormatter={(v) => `${currency}${v}B`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '12px' }}
                formatter={(value: any) => [`${currency}${Number(value).toFixed(2)}B`, '']}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Area type="monotone" dataKey="operatingCashFlow" name="Op. Cash Flow" stroke="#10b981" fill="#10b98130" />
              <Area type="monotone" dataKey="capEx" name="Capital Expenditure" stroke="#ef4444" fill="#ef444430" />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
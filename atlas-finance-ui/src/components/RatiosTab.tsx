'use client';

import React from 'react';

export default function RatiosTab() {
  const ratioCategories = [
    {
      title: 'Valuation Multiple Ratios',
      ratios: [
        { name: 'Price-to-Earnings (P/E)', value: '28.4x', benchmark: '24.2x Industry', status: 'Fair' },
        { name: 'Price-to-Book (P/B)', value: '2.65x', benchmark: '2.10x Industry', status: 'Safe' },
        { name: 'Enterprise Value to EBITDA', value: '14.8x', benchmark: '12.5x Sector', status: 'Fair' },
        { name: 'EV / Net Sales', value: '2.62x', benchmark: '2.20x Sector', status: 'Safe' },
      ],
    },
    {
      title: 'Profitability & Capital Returns',
      ratios: [
        { name: 'Return on Equity (ROE)', value: '9.8%', benchmark: '> 12.0% Target', status: 'Moderate' },
        { name: 'Return on Capital Employed (ROCE)', value: '10.4%', benchmark: '> 10.0% Target', status: 'Strong' },
        { name: 'Operating EBITDA Margin %', value: '19.8%', benchmark: '17.5% Average', status: 'Strong' },
        { name: 'Net Profit Margin %', value: '10.1%', benchmark: '8.5% Average', status: 'Strong' },
      ],
    },
    {
      title: 'Solvency & Debt Health',
      ratios: [
        { name: 'Debt to Equity Ratio', value: '0.38x', benchmark: '< 1.0x Threshold', status: 'Strong' },
        { name: 'Interest Coverage Ratio', value: '6.21x', benchmark: '> 3.0x Benchmark', status: 'Strong' },
        { name: 'Current Ratio', value: '1.18x', benchmark: '> 1.0x Liquidity', status: 'Safe' },
        { name: 'Altman Z-Score', value: '3.12', benchmark: '> 2.99 Safe Zone', status: 'Safe' },
      ],
    },
    {
      title: 'Working Capital Efficiency',
      ratios: [
        { name: 'Inventory Turnover Days', value: '42 Days', benchmark: '45 Days Sector', status: 'Efficient' },
        { name: 'Debtor / Receivable Days', value: '18 Days', benchmark: '25 Days Sector', status: 'Strong' },
        { name: 'Creditor / Payable Days', value: '65 Days', benchmark: '60 Days Sector', status: 'Normal' },
        { name: 'Cash Conversion Cycle (CCC)', value: '-5 Days', benchmark: 'Neg. Working Cap', status: 'Optimal' },
      ],
    },
  ];

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ratioCategories.map((cat, idx) => (
          <div key={idx} className="bg-[#14171B] border border-[#2D3139] p-5 rounded-sm space-y-4">
            <h3 className="text-sm font-bold text-[#B8892B] uppercase border-b border-[#2D3139] pb-2">
              {cat.title}
            </h3>

            <div className="space-y-3">
              {cat.ratios.map((item, rIdx) => (
                <div 
                  key={rIdx}
                  className="flex justify-between items-center p-3 bg-[#0D0F11] border border-[#2D3139] rounded-sm hover:border-[#B8892B]/50 transition-colors"
                >
                  <div>
                    <span className="block font-bold text-white">{item.name}</span>
                    <span className="text-[10px] text-[#8C9097]">{item.benchmark}</span>
                  </div>

                  <div className="text-right">
                    <span className="block font-bold text-base text-white">{item.value}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded uppercase font-bold bg-[#1B5E4A]/30 text-[#7FBF9E] border border-[#1B5E4A]">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
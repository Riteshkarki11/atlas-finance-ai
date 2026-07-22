'use client';

import React from 'react';

interface FNOAnalyticsTabProps {
  ticker: string;
  currentPrice: number;
}

export default function FNOAnalyticsTab({ ticker, currentPrice }: FNOAnalyticsTabProps) {
  // Mock derivatives & sentiment data for Indian stock/index
  const fnoData = {
    pcrVolume: 1.12, // Bullish (> 1.0)
    pcrOi: 0.94, // Neutral
    maxPain: 3100, // Strike with maximum option buyer loss
    futuresPrice: 3128.40,
    futuresPremium: 7.90, // Contango (+7.90)
    totalCallsOi: '1.42 Cr',
    totalPutsOi: '1.34 Cr',
    oiBuildupSignal: 'LONG_BUILDUP', // Long Buildup / Short Accumulation / Short Covering / Long Unwinding
    deliveryPercentage: 58.4, // NSE Delivery Volume %
  };

  const optionChainStrikes = [
    { strike: 3000, callOi: 120000, callIv: 16.2, putOi: 850000, putIv: 18.4, isMaxPain: false },
    { strike: 3050, callOi: 240000, callIv: 15.8, putOi: 620000, putIv: 17.1, isMaxPain: false },
    { strike: 3100, callOi: 510000, callIv: 14.5, putOi: 540000, putIv: 15.2, isMaxPain: true }, // Max Pain
    { strike: 3150, callOi: 890000, callIv: 14.1, putOi: 210000, putIv: 14.8, isMaxPain: false },
    { strike: 3200, callOi: 1250000, callIv: 13.8, putOi: 95000, putIv: 14.2, isMaxPain: false },
  ];

  return (
    <div className="space-y-6 font-mono text-xs">
      
      {/* 1. Derivatives Metric Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-[#14171B] border border-[#2D3139] p-4 rounded-sm">
          <span className="text-[#8C9097] block">Put-Call Ratio (PCR OI)</span>
          <span className="text-xl font-bold text-white font-serif">{fnoData.pcrOi}</span>
          <span className="text-[10px] text-[#7FBF9E] block">Mildly Bullish</span>
        </div>

        <div className="bg-[#14171B] border border-[#2D3139] p-4 rounded-sm">
          <span className="text-[#8C9097] block">Max Pain Price</span>
          <span className="text-xl font-bold text-[#B8892B] font-serif">₹{fnoData.maxPain}</span>
          <span className="text-[10px] text-[#8C9097] block">Key Expiry Anchor</span>
        </div>

        <div className="bg-[#14171B] border border-[#2D3139] p-4 rounded-sm">
          <span className="text-[#8C9097] block">Futures Sentiment</span>
          <span className="text-sm font-bold text-[#7FBF9E] uppercase block mt-1">
            {fnoData.oiBuildupSignal.replace('_', ' ')}
          </span>
          <span className="text-[10px] text-[#8C9097]">Prem: +₹{fnoData.futuresPremium}</span>
        </div>

        <div className="bg-[#14171B] border border-[#2D3139] p-4 rounded-sm">
          <span className="text-[#8C9097] block">Delivery Volume %</span>
          <span className="text-xl font-bold text-white font-serif">{fnoData.deliveryPercentage}%</span>
          <span className="text-[10px] text-[#7FBF9E] block">Institutional Interest</span>
        </div>

        <div className="bg-[#14171B] border border-[#2D3139] p-4 rounded-sm">
          <span className="text-[#8C9097] block">Total F&O Open Interest</span>
          <span className="text-xl font-bold text-white font-serif">{fnoData.totalCallsOi}</span>
          <span className="text-[10px] text-[#8C9097] block">Calls vs Puts</span>
        </div>
      </div>

      {/* 2. Option Chain & Max Pain Snapshot */}
      <div className="bg-[#14171B] border border-[#2D3139] rounded-sm overflow-hidden">
        <div className="p-4 bg-[#0D0F11] border-b border-[#2D3139] flex justify-between items-center">
          <span className="text-xs font-bold text-[#B8892B] uppercase">
            Option Chain Analytics & Open Interest Distribution ({ticker})
          </span>
          <span className="text-[10px] text-[#8C9097]">Current Spot: ₹{currentPrice}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-[#0D0F11] border-b border-[#2D3139] text-[#8C9097]">
                <th colSpan={2} className="p-2 border-r border-[#2D3139] text-[#E55353]">CALL OPTIONS (CE)</th>
                <th className="p-2 border-r border-[#2D3139]">STRIKE PRICE</th>
                <th colSpan={2} className="p-2 text-[#7FBF9E]">PUT OPTIONS (PE)</th>
              </tr>
              <tr className="bg-[#181C22] border-b border-[#2D3139] text-[10px] text-[#8C9097]">
                <th className="p-2">Call OI</th>
                <th className="p-2 border-r border-[#2D3139]">Call IV %</th>
                <th className="p-2 border-r border-[#2D3139]">Strike</th>
                <th className="p-2">Put IV %</th>
                <th className="p-2">Put OI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2D3139]/40 text-[#C5C8D0]">
              {optionChainStrikes.map((row) => (
                <tr 
                  key={row.strike} 
                  className={`hover:bg-[#1F232B] transition-colors ${
                    row.isMaxPain ? 'bg-[#B8892B]/10 font-bold border-y border-[#B8892B]' : ''
                  }`}
                >
                  <td className="p-2.5 text-[#E55353]">{row.callOi.toLocaleString()}</td>
                  <td className="p-2.5 border-r border-[#2D3139] text-[#8C9097]">{row.callIv}%</td>
                  <td className="p-2.5 border-r border-[#2D3139] font-bold text-white flex justify-center items-center gap-2">
                    ₹{row.strike}
                    {row.isMaxPain && (
                      <span className="text-[9px] bg-[#B8892B] text-black px-1 rounded uppercase font-bold">
                        Max Pain
                      </span>
                    )}
                  </td>
                  <td className="p-2.5 border-r border-[#2D3139] text-[#8C9097]">{row.putIv}%</td>
                  <td className="p-2.5 text-[#7FBF9E]">{row.putOi.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
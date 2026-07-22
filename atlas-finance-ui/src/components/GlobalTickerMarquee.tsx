'use client';

import React from 'react';

interface MarketIndex {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
  region: 'INDIA' | 'US' | 'GLOBAL' | 'COMMODITY';
}

const GLOBAL_INDICES: MarketIndex[] = [
  { symbol: '^NSEI', name: 'NIFTY 50', price: '24,187.70', change: '+0.42%', isPositive: true, region: 'INDIA' },
  { symbol: '^BANKNIFTY', name: 'NIFTY BANK', price: '57,835.35', change: '-0.19%', isPositive: false, region: 'INDIA' },
  { symbol: '^BSESN', name: 'SENSEX', price: '79,480.20', change: '+0.35%', isPositive: true, region: 'INDIA' },
  { symbol: '^IXIC', name: 'NASDAQ', price: '18,287.15', change: '+0.88%', isPositive: true, region: 'US' },
  { symbol: '^GSPC', name: 'S&P 500', price: '5,564.40', change: '+0.54%', isPositive: true, region: 'US' },
  { symbol: '^N225', name: 'NIKKEI 225', price: '39,580.00', change: '-0.31%', isPositive: false, region: 'GLOBAL' },
  { symbol: 'USDINR=X', name: 'USD / INR', price: '₹83.62', change: '-0.04%', isPositive: false, region: 'GLOBAL' },
  { symbol: 'GC=F', name: 'GOLD (10g)', price: '₹72,450', change: '+0.28%', isPositive: true, region: 'COMMODITY' },
  { symbol: 'CL=F', name: 'CRUDE OIL', price: '$78.40', change: '-0.65%', isPositive: false, region: 'COMMODITY' },
];

export default function GlobalTickerMarquee() {
  return (
    <div className="w-full bg-[#080A0C] border-b border-[#2D3139] overflow-hidden py-2 text-xs font-mono select-none">
      <div className="flex w-max animate-marquee space-x-8 hover:[animation-play-state:paused]">
        {[...GLOBAL_INDICES, ...GLOBAL_INDICES].map((item, idx) => (
          <div key={`${item.symbol}-${idx}`} className="flex items-center gap-2 px-2 border-r border-[#1F232B] last:border-r-0">
            <span className={`text-[9px] px-1 rounded font-bold ${
              item.region === 'INDIA' ? 'bg-[#1B5E4A]/30 text-[#7FBF9E] border border-[#1B5E4A]' : 'bg-[#2D3139]/40 text-[#8C9097]'
            }`}>
              {item.region}
            </span>
            <span className="text-[#C5C8D0] font-semibold">{item.name}</span>
            <span className="text-white">{item.price}</span>
            <span className={`flex items-center font-bold ${item.isPositive ? 'text-[#7FBF9E]' : 'text-[#E55353]'}`}>
              {item.isPositive ? '▲' : '▼'} {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
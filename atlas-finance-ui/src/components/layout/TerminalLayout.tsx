'use client';

import { useRealTimePrice } from '@/hooks/useRealTimePrice';

export default function TerminalHeader({ ticker = 'RELIANCE', initialPrice = 3120.50 }) {
  const { price, change } = useRealTimePrice(ticker, initialPrice);

  return (
    <div className="flex items-center gap-4 bg-[#0D0F11] p-3 text-mono">
      <span className="font-bold text-white">{ticker}</span>
      <span className="text-xl text-[#B8892B]">₹{price.toFixed(2)}</span>
      <span className={`text-xs ${change >= 0 ? 'text-[#7FBF9E]' : 'text-[#E55353]'}`}>
        {change >= 0 ? '+' : ''}{change.toFixed(2)}
      </span>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';

export function useRealTimePrice(ticker: string, initialPrice: number) {
  const [price, setPrice] = useState<number>(initialPrice);
  const [change, setChange] = useState<number>(0);

  useEffect(() => {
    // Connect to your WebSocket Server / Provider (e.g., Binance, Polygon, or Custom NSE WS Proxy)
    const ws = new WebSocket(`wss://ws.finnhub.io?token=${process.env.NEXT_PUBLIC_FINNHUB_KEY}`);

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'subscribe', symbol: ticker }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'trade' && data.data[0]) {
        const lastPrice = data.data[0].p;
        setPrice((prev) => {
          setChange(lastPrice - prev);
          return lastPrice;
        });
      }
    };

    return () => {
      ws.close();
    };
  }, [ticker]);

  return { price, change };
}
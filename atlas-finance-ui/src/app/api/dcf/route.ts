import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ticker = 'NVDA', wacc = 10.2, terminalGrowth = 3.0, revGrowth = 21.4 } = body;

    // Simulate backend DCF math engine execution
    const basePrices: Record<string, number> = {
      NVDA: 138.70,
      MSFT: 420.50,
      AAPL: 224.20,
      AMD: 156.10,
    };

    const currentPrice = basePrices[ticker] || 100.0;
    const waccAdjustment = 10.2 / wacc;
    const growthAdjustment = 1 + (terminalGrowth - 3.0) / 100;
    const intrinsicValue = currentPrice * 1.184 * waccAdjustment * growthAdjustment;
    const marginOfSafety = ((intrinsicValue - currentPrice) / currentPrice) * 100;

    return NextResponse.json({
      ticker,
      currentPrice,
      intrinsicValue: parseFloat(intrinsicValue.toFixed(2)),
      marginOfSafety: parseFloat(marginOfSafety.toFixed(1)),
      signal: marginOfSafety > 10 ? 'BUY' : marginOfSafety < -5 ? 'SELL' : 'HOLD',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process DCF model computation' }, { status: 500 });
  }
}
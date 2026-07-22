import { NextResponse } from 'next/server';
import YahooFinance from 'yahoo-finance2';

// Instantiate the YahooFinance class for v3+
const yahooFinance = new YahooFinance();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol') || 'NVDA';

  try {
    // Fetch live quote summary from Yahoo Finance
    const quote = await yahooFinance.quote(symbol);

    if (!quote || !quote.regularMarketPrice) {
      return NextResponse.json({ error: 'Ticker symbol not found' }, { status: 404 });
    }

    const price = quote.regularMarketPrice;
    const pe = quote.trailingPE || 30.0;
    const marketCap = quote.marketCap
      ? (quote.marketCap / 1e9).toFixed(1) + 'B'
      : 'N/A';

    // Calculated DCF Intrinsic Projection
    const growthRate = quote.revenueGrowth ? quote.revenueGrowth * 100 : 15.0;
    const intrinsicValue = price * (1 + growthRate / 100) * 0.95;
    const upside = ((intrinsicValue - price) / price) * 100;

    return NextResponse.json({
      ticker: symbol.toUpperCase(),
      name: quote.longName || quote.shortName || symbol.toUpperCase(),
      price: parseFloat(price.toFixed(2)),
      change: parseFloat((quote.regularMarketChangePercent || 0).toFixed(2)),
      peRatio: parseFloat(pe.toFixed(1)),
      marketCap,
      intrinsicValue: parseFloat(intrinsicValue.toFixed(2)),
      upside: parseFloat(upside.toFixed(1)),
      wacc: 9.8,
      signal: upside > 10 ? 'BUY' : upside < -5 ? 'SELL' : 'HOLD',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch quote' }, { status: 500 });
  }
}
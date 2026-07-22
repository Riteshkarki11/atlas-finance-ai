// File: app/api/stock/route.ts
import { NextResponse } from 'next/server';
import YahooFinance from 'yahoo-finance2';

// Instantiate the client as required by yahoo-finance2 v3+
const yahooFinance = new YahooFinance();

// Cache route responses on the server edge for 5 minutes (300 seconds)
export const revalidate = 300;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ticker = searchParams.get('ticker') || 'NVDA';

  try {
    const quote = (await yahooFinance.quote(ticker)) as any;

    const quoteSummary = (await yahooFinance.quoteSummary(ticker, {
      modules: [
        'financialData',
        'defaultKeyStatistics',
        'summaryDetail',
        'incomeStatementHistory',
        'balanceSheetHistory',
        'cashflowStatementHistory',
      ],
    })) as any;

    const price = quote?.regularMarketPrice || 0;
    const peRatio = quoteSummary?.summaryDetail?.trailingPE || 0;
    const debtToEquity = quoteSummary?.financialData?.debtToEquity || 0;
    const freeCashFlow = quoteSummary?.financialData?.freeCashflow || 0;
    const totalRevenue = quoteSummary?.financialData?.totalRevenue || 0;
    const sharesOutstanding = quoteSummary?.defaultKeyStatistics?.sharesOutstanding || 1;
    const totalDebt = quoteSummary?.financialData?.totalDebt || 0;
    const totalCash = quoteSummary?.financialData?.totalCash || 0;

    const incomeHistory = quoteSummary?.incomeStatementHistory?.incomeStatementHistory || [];
    const cashFlowHistory = quoteSummary?.cashflowStatementHistory?.cashflowStatements || [];
    const balanceHistory = quoteSummary?.balanceSheetHistory?.balanceSheetStatements || [];

    const historicalFinancials = incomeHistory
      .map((item: any, idx: number) => {
        const year = item?.endDate ? new Date(item.endDate).getFullYear().toString() : `Y-${idx}`;
        const cfItem = cashFlowHistory[idx] || {};
        return {
          year,
          revenue: (item?.totalRevenue?.raw || 0) / 1e9,
          netIncome: (item?.netIncome?.raw || 0) / 1e9,
          operatingCashFlow: (cfItem?.totalCashFromOperatingActivities?.raw || 0) / 1e9,
          capEx: Math.abs(cfItem?.capitalExpenditures?.raw || 0) / 1e9,
        };
      })
      .reverse();

    const latestIncome = incomeHistory[0] || {};
    const latestBalance = balanceHistory[0] || {};
    const latestCashFlow = cashFlowHistory[0] || {};

    const response = NextResponse.json({
      success: true,
      ticker: ticker.toUpperCase(),
      name: quote?.longName || quote?.shortName || ticker,
      price: price,
      currency: quote?.currency === 'INR' ? '₹' : '$',
      market: ticker.endsWith('.NS') || ticker.endsWith('.BO') ? 'NSE' : 'US',
      peRatio: peRatio ? parseFloat(Number(peRatio).toFixed(2)) : 0,
      deRatio: debtToEquity ? parseFloat((Number(debtToEquity) / 100).toFixed(2)) : 0,
      freeCashFlow: freeCashFlow,
      revenue: totalRevenue,
      sharesOutstanding: sharesOutstanding,
      totalDebt: totalDebt,
      totalCash: totalCash,
      historicalFinancials: historicalFinancials,
      incomeStatement: {
        totalRevenue: latestIncome?.totalRevenue?.raw || totalRevenue,
        grossProfit: latestIncome?.grossProfit?.raw || 0,
        operatingIncome: latestIncome?.operatingIncome?.raw || 0,
        netIncome: latestIncome?.netIncome?.raw || 0,
      },
      balanceSheet: {
        totalAssets: latestBalance?.totalAssets?.raw || 0,
        totalLiab: latestBalance?.totalLiab?.raw || totalDebt,
        totalStockholderEquity: latestBalance?.totalStockholderEquity?.raw || 0,
        cash: latestBalance?.cash?.raw || totalCash,
      },
      cashFlowStatement: {
        operatingCashflow: latestCashFlow?.totalCashFromOperatingActivities?.raw || 0,
        capitalExpenditures: latestCashFlow?.capitalExpenditures?.raw || 0,
        freeCashFlow: freeCashFlow,
      },
      lastUpdated: new Date().toISOString(),
    });

    response.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
    return response;
  } catch (error: any) {
    console.error('Yahoo Finance Error:', error);
    return NextResponse.json(
      { success: false, error: `Failed to fetch live data for ${ticker}` },
      { status: 500 }
    );
  }
}
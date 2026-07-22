// File: app/api/stock/route.ts
import { NextResponse } from 'next/server';
import YahooFinance from 'yahoo-finance2';

const yahooFinance = new YahooFinance({
  suppressNotices: ['yahooSurvey'],
});

export const revalidate = 300;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ticker = searchParams.get('ticker') || 'NVDA';

  try {
    const quote = (await yahooFinance.quote(ticker)) as any;

    const quoteSummary = (await yahooFinance.quoteSummary(ticker, {
      modules: ['financialData', 'defaultKeyStatistics', 'summaryDetail'],
    })) as any;

    // Fetch time series data properly instead of deprecated history modules
    let financialsTimeSeries: any = {};
    try {
      financialsTimeSeries = await yahooFinance.fundamentalsTimeSeries(ticker, {
        period1: '2022-01-01',
        module: 'all',
      });
    } catch (e) {
      console.warn('Could not fetch fundamentals time series:', e);
    }

    const price = quote?.regularMarketPrice || 0;
    const peRatio = quoteSummary?.summaryDetail?.trailingPE || 0;
    const debtToEquity = quoteSummary?.financialData?.debtToEquity || 0;
    const freeCashFlow = quoteSummary?.financialData?.freeCashflow || 0;
    const totalRevenue = quoteSummary?.financialData?.totalRevenue || 0;
    const sharesOutstanding = quoteSummary?.defaultKeyStatistics?.sharesOutstanding || 1;
    const totalDebt = quoteSummary?.financialData?.totalDebt || 0;
    const totalCash = quoteSummary?.financialData?.totalCash || 0;

    // Map time series results safely
    const timeseriesList = Array.isArray(financialsTimeSeries) ? financialsTimeSeries : [];
    const historicalFinancials = timeseriesList.map((item: any) => ({
      year: item?.date ? new Date(item.date).getFullYear().toString() : '',
      revenue: (item?.totalRevenue || 0) / 1e9,
      netIncome: (item?.netIncomeCommonStockholders || item?.netIncome || 0) / 1e9,
      operatingCashFlow: (item?.operatingCashFlow || 0) / 1e9,
      capEx: Math.abs(item?.capitalExpenditures || 0) / 1e9,
    })).filter((x: any) => x.year);

    const latest = timeseriesList[timeseriesList.length - 1] || {};

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
        totalRevenue: latest?.totalRevenue || totalRevenue,
        grossProfit: latest?.grossProfit || 0,
        operatingIncome: latest?.operatingIncome || 0,
        netIncome: latest?.netIncomeCommonStockholders || 0,
      },
      balanceSheet: {
        totalAssets: latest?.totalAssets || 0,
        totalLiab: latest?.totalLiab || totalDebt,
        totalStockholderEquity: latest?.stockholdersEquity || 0,
        cash: latest?.cashAndCashEquivalents || totalCash,
      },
      cashFlowStatement: {
        operatingCashflow: latest?.operatingCashFlow || 0,
        capitalExpenditures: Math.abs(latest?.capitalExpenditures || 0),
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
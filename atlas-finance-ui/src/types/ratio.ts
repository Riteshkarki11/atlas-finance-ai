export interface FinancialRatios {

  symbol: string;

  // --------------------
  // Valuation
  // --------------------

  peRatio: number;
  forwardPE: number;
  pegRatio: number;

  priceToBook: number;
  priceToSales: number;

  evRevenue: number;
  evEbitda: number;

  // --------------------
  // Profitability
  // --------------------

  grossMargin: number;
  operatingMargin: number;
  ebitdaMargin: number;
  netMargin: number;

  roe: number;
  roa: number;
  roic: number;

  // --------------------
  // Liquidity
  // --------------------

  currentRatio: number;
  quickRatio: number;
  cashRatio: number;

  // --------------------
  // Solvency
  // --------------------

  debtToEquity: number;
  debtToAssets: number;

  interestCoverage: number;

  financialLeverage: number;

  // --------------------
  // Efficiency
  // --------------------

  assetTurnover: number;
  inventoryTurnover: number;

  receivableTurnover: number;
  payableTurnover: number;

  // --------------------
  // Per Share
  // --------------------

  eps: number;

  revenuePerShare: number;

  bookValuePerShare: number;

  freeCashFlowPerShare: number;
}
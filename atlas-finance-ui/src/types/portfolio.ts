export interface Holding {
  symbol: string;
  companyName: string;
  shares: number;
  averageCost: number;
  currentPrice: number;
  marketValue: number;
  gainLoss: number;
  gainLossPercent: number;
  allocation: number;
}

export interface Allocation {
  name: string;
  value: number;
  percentage: number;
}

export interface Transaction {
  id: string;
  date: string;
  symbol: string;
  type: "BUY" | "SELL";
  shares: number;
  price: number;
  amount: number;
}

export interface WatchlistItem {
  symbol: string;
  companyName: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface PortfolioPerformancePoint {
  date: string;
  value: number;
}

export interface Portfolio {

  totalValue: number;

  cash: number;

  totalGainLoss: number;

  totalGainLossPercent: number;

  todayGainLoss: number;

  todayGainLossPercent: number;

  holdings: Holding[];

  assetAllocation: Allocation[];

  sectorAllocation: Allocation[];

  transactions: Transaction[];

  watchlist: WatchlistItem[];

  performance: PortfolioPerformancePoint[];
}
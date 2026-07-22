export interface SectorDefinition {
  sector: string;
  icon: string;
  description: string;
  tickers: { symbol: string; name: string; market: 'US' | 'NSE' }[];
}

export const DYNAMIC_SECTORS: SectorDefinition[] = [
  {
    sector: 'Technology & AI',
    icon: '⚡',
    description: 'Semiconductors, Enterprise Software, Cloud Infrastructure & Hardware',
    tickers: [
      { symbol: 'NVDA', name: 'NVIDIA Corp', market: 'US' },
      { symbol: 'MSFT', name: 'Microsoft Corp', market: 'US' },
      { symbol: 'AAPL', name: 'Apple Inc', market: 'US' },
      { symbol: 'GOOGL', name: 'Alphabet Inc', market: 'US' },
      { symbol: 'TCS.NS', name: 'Tata Consultancy Services', market: 'NSE' },
      { symbol: 'INFY.NS', name: 'Infosys Ltd', market: 'NSE' },
      { symbol: 'HCLTECH.NS', name: 'HCL Technologies', market: 'NSE' },
    ]
  },
  {
    sector: 'Banking & Financials',
    icon: '🏦',
    description: 'Commercial Banking, Payment Processing & Investment Lenders',
    tickers: [
      { symbol: 'HDFCBANK.NS', name: 'HDFC Bank Ltd', market: 'NSE' },
      { symbol: 'ICICIBANK.NS', name: 'ICICI Bank Ltd', market: 'NSE' },
      { symbol: 'SBIN.NS', name: 'State Bank of India', market: 'NSE' },
      { symbol: 'JPM', name: 'JPMorgan Chase & Co', market: 'US' },
      { symbol: 'V', name: 'Visa Inc', market: 'US' },
    ]
  },
  {
    sector: 'Energy & Conglomerates',
    icon: '⛽',
    description: 'Oil Exploration, Refining, Petrochemicals & Power Utilities',
    tickers: [
      { symbol: 'RELIANCE.NS', name: 'Reliance Industries', market: 'NSE' },
      { symbol: 'NTPC.NS', name: 'NTPC Ltd', market: 'NSE' },
      { symbol: 'XOM', name: 'Exxon Mobil Corp', market: 'US' },
      { symbol: 'ONGC.NS', name: 'Oil & Natural Gas Corp', market: 'NSE' },
    ]
  }
];
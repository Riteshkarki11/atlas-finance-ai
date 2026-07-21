export interface InvestmentReport {
  symbol: string;

  company_name: string;
  exchange?: string;
  sector?: string;
  industry?: string;
  country?: string;
  currency?: string;
  market_cap?: number;
  logo?: string;

  recommendation: string;
  confidence: number;
  score: number;
  grade: string;

  intrinsic_value: number;

  valuation_score: number;
  growth_score: number;
  profitability_score: number;
  liquidity_score: number;
  leverage_score: number;
  risk_score: number;

  summary: string;

  strengths: string[];
  risks: string[];
}
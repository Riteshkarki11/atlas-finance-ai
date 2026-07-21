export interface InvestmentReport {
  symbol: string;

  summary: string;

  recommendation: string;

  confidence: number;

  score: number;

  grade: string;

  intrinsic_value: number;

  margin_of_safety:number;
  
  strengths: string[];

  risks: string[];
}
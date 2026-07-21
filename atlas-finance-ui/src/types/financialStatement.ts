export interface FinancialStatementPeriod {
  date: string;
  calendarYear: string;
}

export interface IncomeStatement {
  date: string;
  calendarYear: string;

  revenue: number;
  costOfRevenue: number;
  grossProfit: number;

  operatingIncome: number;
  ebitda: number;
  ebit: number;

  incomeBeforeTax: number;
  incomeTaxExpense: number;
  netIncome: number;

  eps: number;
  epsDiluted: number;
}

export interface BalanceSheet {
  date: string;
  calendarYear: string;

  cashAndCashEquivalents: number;

  totalCurrentAssets: number;
  totalAssets: number;

  totalCurrentLiabilities: number;
  totalLiabilities: number;

  totalDebt: number;

  totalStockholdersEquity: number;

  workingCapital: number;
}

export interface CashFlowStatement {
  date: string;
  calendarYear: string;

  operatingCashFlow: number;

  capitalExpenditure: number;

  freeCashFlow: number;

  investingCashFlow: number;

  financingCashFlow: number;

  netCashFlow: number;
}

export interface FinancialStatementsResponse {
  symbol: string;

  incomeStatement: IncomeStatement[];

  balanceSheet: BalanceSheet[];

  cashFlow: CashFlowStatement[];
}
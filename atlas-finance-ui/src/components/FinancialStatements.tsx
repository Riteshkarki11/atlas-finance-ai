// File: components/FinancialStatements.tsx
'use client';

import React, { useState } from 'react';

interface FinancialsProps {
  currency: string;
  incomeStatement: {
    totalRevenue: number;
    grossProfit: number;
    operatingIncome: number;
    netIncome: number;
  };
  balanceSheet: {
    totalAssets: number;
    totalLiab: number;
    totalStockholderEquity: number;
    cash: number;
  };
  cashFlowStatement: {
    operatingCashflow: number;
    capitalExpenditures: number;
    freeCashFlow: number;
  };
}

export default function FinancialStatements({
  currency,
  incomeStatement,
  balanceSheet,
  cashFlowStatement,
}: FinancialsProps) {
  const [activeTab, setActiveTab] = useState<'income' | 'balance' | 'cashflow'>('income');

  const formatAmount = (val: number) => {
    if (!val) return 'N/A';
    return `${currency}${(val / 1e9).toFixed(2)}B`;
  };

  return (
    <div className="bg-[#111317] border border-white/10 p-6 md:p-8 rounded-3xl space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
        <h2 className="text-xl font-bold text-white">📑 Financial Statements</h2>
        <div className="flex gap-2 bg-black/40 p-1 rounded-xl border border-white/5">
          {(['income', 'balance', 'cashflow'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                activeTab === tab ? 'bg-amber-500 text-black shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab === 'income' ? 'Income' : tab === 'balance' ? 'Balance Sheet' : 'Cash Flow'}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 font-mono text-sm">
        {activeTab === 'income' && (
          <>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-zinc-400">Total Revenue</span>
              <span className="text-white font-bold">{formatAmount(incomeStatement.totalRevenue)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-zinc-400">Gross Profit</span>
              <span className="text-white font-bold">{formatAmount(incomeStatement.grossProfit)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-zinc-400">Operating Income</span>
              <span className="text-white font-bold">{formatAmount(incomeStatement.operatingIncome)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-zinc-400">Net Income</span>
              <span className="text-emerald-400 font-bold">{formatAmount(incomeStatement.netIncome)}</span>
            </div>
          </>
        )}

        {activeTab === 'balance' && (
          <>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-zinc-400">Cash & Equivalents</span>
              <span className="text-white font-bold">{formatAmount(balanceSheet.cash)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-zinc-400">Total Assets</span>
              <span className="text-white font-bold">{formatAmount(balanceSheet.totalAssets)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-zinc-400">Total Liabilities</span>
              <span className="text-white font-bold">{formatAmount(balanceSheet.totalLiab)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-zinc-400">Stockholders Equity</span>
              <span className="text-amber-400 font-bold">{formatAmount(balanceSheet.totalStockholderEquity)}</span>
            </div>
          </>
        )}

        {activeTab === 'cashflow' && (
          <>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-zinc-400">Operating Cash Flow</span>
              <span className="text-white font-bold">{formatAmount(cashFlowStatement.operatingCashflow)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-zinc-400">Capital Expenditures</span>
              <span className="text-red-400 font-bold">{formatAmount(cashFlowStatement.capitalExpenditures)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-zinc-400">Free Cash Flow</span>
              <span className="text-emerald-400 font-bold">{formatAmount(cashFlowStatement.freeCashFlow)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
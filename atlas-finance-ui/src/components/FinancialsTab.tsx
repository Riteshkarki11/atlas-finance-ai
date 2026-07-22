'use client';

import React, { useState } from 'react';

interface FinancialsTabProps {
  currency?: string;
}

type StatementType = 'income' | 'balance' | 'cashflow';
type Periodicity = 'annual' | 'quarterly';

interface FinancialRow {
  metric: string;
  values: number[];
  highlight?: boolean;
}

export default function FinancialsTab({ currency = 'INR' }: FinancialsTabProps) {
  const [statementType, setStatementType] = useState<StatementType>('income');
  const [periodicity, setPeriodicity] = useState<Periodicity>('annual');
  const [isCommonSize, setIsCommonSize] = useState<boolean>(false);

  // Time periods
  const annualYears = ['FY20', 'FY21', 'FY22', 'FY23', 'FY24'];
  const quarterlyPeriods = ['Q1FY24', 'Q2FY24', 'Q3FY24', 'Q4FY24', 'Q1FY25'];
  const currentPeriods = periodicity === 'annual' ? annualYears : quarterlyPeriods;

  // Datasets
  const incomeData: FinancialRow[] = [
    { metric: 'Revenue from Operations', values: [596925, 466924, 699962, 879468, 900102], highlight: true },
    { metric: 'Other Income', values: [13826, 16327, 14947, 11782, 12540] },
    { metric: 'Total Revenue', values: [610751, 483251, 714909, 891250, 912642], highlight: true },
    { metric: 'Raw Materials & Inventory Costs', values: [340150, 245120, 412500, 520100, 510400] },
    { metric: 'Employee Benefit Expenses', values: [14188, 14810, 18720, 22400, 25100] },
    { metric: 'Other Operating Expenses', values: [167400, 142100, 158200, 182300, 198500] },
    { metric: 'Operating Profit (EBITDA)', values: [89013, 81221, 125489, 166450, 178642], highlight: true },
    { metric: 'Depreciation & Amortization', values: [22203, 26572, 29799, 37000, 41200] },
    { metric: 'Operating Profit (EBIT)', values: [66810, 54649, 95690, 129450, 137442], highlight: true },
    { metric: 'Finance Costs / Interest', values: [19677, 21189, 14584, 19570, 22100] },
    { metric: 'Profit Before Tax (PBT)', values: [47133, 33460, 81106, 109880, 115342], highlight: true },
    { metric: 'Tax Expense', values: [7254, 1722, 16254, 23000, 24800] },
    { metric: 'Net Profit (PAT)', values: [39879, 31738, 64852, 86880, 90542], highlight: true },
  ];

  const balanceData: FinancialRow[] = [
    { metric: 'Share Capital', values: [6339, 6339, 6765, 6765, 6765], highlight: true },
    { metric: 'Reserves & Surplus', values: [446992, 463720, 508480, 563210, 612450], highlight: true },
    { metric: 'Total Shareholders Funds', values: [453331, 470059, 515245, 569975, 619215], highlight: true },
    { metric: 'Long-Term Borrowings', values: [218220, 235100, 210400, 224500, 215000] },
    { metric: 'Short-Term Borrowings', values: [86450, 62100, 54300, 48200, 52100] },
    { metric: 'Total Debt', values: [304670, 297200, 264700, 272700, 267100], highlight: true },
    { metric: 'Property, Plant & Equipment (PPE)', values: [521300, 541200, 580100, 621000, 685000], highlight: true },
    { metric: 'Capital Work-in-Progress (CWIP)', values: [109100, 125400, 118200, 95400, 87200] },
    { metric: 'Cash & Cash Equivalents', values: [81200, 92100, 110500, 134200, 142100], highlight: true },
    { metric: 'Total Assets', values: [1021400, 1085200, 1162400, 1254800, 1342100], highlight: true },
  ];

  const cashflowData: FinancialRow[] = [
    { metric: 'Operating Cash Flow (CFO)', values: [98120, 89200, 110450, 142100, 156200], highlight: true },
    { metric: 'Capital Expenditures (CapEx)', values: [-76200, -68400, -82100, -91200, -98500] },
    { metric: 'Free Cash Flow (FCF)', values: [21920, 20800, 28350, 50900, 57700], highlight: true },
    { metric: 'Investing Cash Flow (CFI)', values: [-82100, -71200, -89400, -98100, -104200], highlight: true },
    { metric: 'Financing Cash Flow (CFF)', values: [-12400, -11200, -15600, -22400, -31200], highlight: true },
    { metric: 'Net Cash Flow', values: [3620, 6800, 5450, 21600, 20800], highlight: true },
  ];

  // Active dataset selector
  const activeData =
    statementType === 'income'
      ? incomeData
      : statementType === 'balance'
      ? balanceData
      : cashflowData;

  // Base values for common-size calculations
  const baseValues = activeData[0]?.values || [];

  // CSV Export handler
  const exportCSV = () => {
    const headers = ['Financial Line Item', ...currentPeriods, 'CAGR / Growth'];
    const rows = activeData.map((row) => {
      const cagr = (((row.values[4] / row.values[0]) ** (1 / 4) - 1) * 100).toFixed(1) + '%';
      return [row.metric, ...row.values, cagr].join(',');
    });
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${statementType}_statement_${periodicity}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 font-mono text-xs text-zinc-200">
      {/* Controls Bar */}
      <div className="bg-[#14171B] border border-[#2D3139] p-3 rounded-sm flex flex-wrap justify-between items-center gap-3">
        {/* Statement Switcher */}
        <div className="flex bg-[#0D0F11] border border-[#2D3139] rounded-sm p-1">
          {(['income', 'balance', 'cashflow'] as StatementType[]).map((type) => (
            <button
              key={type}
              onClick={() => setStatementType(type)}
              className={`px-3 py-1.5 rounded-sm capitalize transition-all ${
                statementType === type
                  ? 'bg-[#B8892B] text-black font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {type === 'income' ? 'Income Statement' : type === 'balance' ? 'Balance Sheet' : 'Cash Flow'}
            </button>
          ))}
        </div>

        {/* Toggles & Options */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#0D0F11] border border-[#2D3139] px-3 py-1.5 rounded-sm">
            <span className="text-zinc-400">Period:</span>
            <button
              onClick={() => setPeriodicity(periodicity === 'annual' ? 'quarterly' : 'annual')}
              className="text-[#B8892B] font-bold uppercase hover:underline"
            >
              {periodicity}
            </button>
          </div>

          <button
            onClick={() => setIsCommonSize(!isCommonSize)}
            className={`px-3 py-1.5 border rounded-sm transition-colors ${
              isCommonSize
                ? 'bg-[#1B5E4A]/40 border-[#1B5E4A] text-[#7FBF9E] font-semibold'
                : 'border-[#2D3139] text-zinc-400 hover:text-white'
            }`}
          >
            % Common Size
          </button>

          <button
            onClick={exportCSV}
            className="bg-[#1F232B] hover:bg-[#2D3139] border border-[#2D3139] text-zinc-200 hover:text-white px-3 py-1.5 rounded-sm transition-colors flex items-center gap-1.5"
          >
            <span>📥</span> Export CSV
          </button>
        </div>
      </div>

      {/* Main Financial Data Table */}
      <div className="bg-[#14171B] border border-[#2D3139] rounded-sm overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0D0F11] border-b border-[#2D3139] text-zinc-400">
              <th className="p-3 font-semibold uppercase">
                Financial Line Item ({currency} Cr)
              </th>
              {currentPeriods.map((period) => (
                <th key={period} className="p-3 text-right font-semibold">
                  {period}
                </th>
              ))}
              <th className="p-3 text-right font-semibold text-[#B8892B]">
                {periodicity === 'annual' ? '5Y CAGR' : 'QoQ Growth'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2D3139]/40">
            {activeData.map((row, idx) => {
              const startVal = row.values[0];
              const endVal = row.values[row.values.length - 1];
              const cagr =
                startVal > 0 && endVal > 0
                  ? (((endVal / startVal) ** (1 / (row.values.length - 1)) - 1) * 100).toFixed(1)
                  : 'N/A';

              return (
                <tr
                  key={idx}
                  className={`transition-colors hover:bg-[#1F232B]/60 ${
                    row.highlight ? 'bg-[#181C22] font-semibold text-white' : 'text-zinc-300'
                  }`}
                >
                  <td className="p-3 flex items-center gap-2">
                    {row.highlight && (
                      <span className="w-1.5 h-1.5 bg-[#B8892B] rounded-full shrink-0"></span>
                    )}
                    <span className={row.highlight ? 'text-white' : 'text-zinc-300'}>
                      {row.metric}
                    </span>
                  </td>
                  {row.values.map((val, vIdx) => {
                    const displayVal = isCommonSize
                      ? `${((val / (baseValues[vIdx] || 1)) * 100).toFixed(1)}%`
                      : val.toLocaleString();
                    return (
                      <td
                        key={vIdx}
                        className={`p-3 text-right font-mono ${
                          val < 0 ? 'text-red-400' : 'text-zinc-200'
                        }`}
                      >
                        {displayVal}
                      </td>
                    );
                  })}
                  <td className="p-3 text-right font-mono font-semibold text-[#7FBF9E]">
                    {cagr !== 'N/A' ? `${cagr}%` : 'N/A'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
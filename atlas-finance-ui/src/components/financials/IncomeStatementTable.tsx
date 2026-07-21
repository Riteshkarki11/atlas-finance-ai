"use client";

import FinancialTable from "./FinancialTable";
import { IncomeStatement } from "../../types/financialStatement";

interface Props {
  data: IncomeStatement[];
}

export default function IncomeStatementTable({
  data,
}: Props) {

  const periods = data.map((x) => x.calendarYear);

  const rows = [

    {
      label: "Revenue",
      values: data.map((x) => x.revenue),
    },

    {
      label: "Cost of Revenue",
      values: data.map((x) => x.costOfRevenue),
    },

    {
      label: "Gross Profit",
      values: data.map((x) => x.grossProfit),
    },

    {
      label: "Operating Income",
      values: data.map((x) => x.operatingIncome),
    },

    {
      label: "EBITDA",
      values: data.map((x) => x.ebitda),
    },

    {
      label: "EBIT",
      values: data.map((x) => x.ebit),
    },

    {
      label: "Income Before Tax",
      values: data.map((x) => x.incomeBeforeTax),
    },

    {
      label: "Income Tax",
      values: data.map((x) => x.incomeTaxExpense),
    },

    {
      label: "Net Income",
      values: data.map((x) => x.netIncome),
    },

    {
      label: "EPS",
      values: data.map((x) => x.eps),
    },

    {
      label: "Diluted EPS",
      values: data.map((x) => x.epsDiluted),
    },

  ];

  return (
    <FinancialTable
      periods={periods}
      rows={rows}
    />
  );
}
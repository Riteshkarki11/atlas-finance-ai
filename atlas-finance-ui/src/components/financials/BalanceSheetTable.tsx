"use client";

import FinancialTable from "./FinancialTable";
import { BalanceSheet } from "../../types/financialStatement";

interface Props {
  data: BalanceSheet[];
}

export default function BalanceSheetTable({
  data,
}: Props) {
  const periods = data.map((x) => x.calendarYear);

  const rows = [
    {
      label: "Cash",
      values: data.map(
        (x) => x.cashAndCashEquivalents
      ),
    },

    {
      label: "Current Assets",
      values: data.map(
        (x) => x.totalCurrentAssets
      ),
    },

    {
      label: "Total Assets",
      values: data.map(
        (x) => x.totalAssets
      ),
    },

    {
      label: "Current Liabilities",
      values: data.map(
        (x) => x.totalCurrentLiabilities
      ),
    },

    {
      label: "Total Liabilities",
      values: data.map(
        (x) => x.totalLiabilities
      ),
    },

    {
      label: "Total Debt",
      values: data.map(
        (x) => x.totalDebt
      ),
    },

    {
      label: "Shareholders' Equity",
      values: data.map(
        (x) => x.totalStockholdersEquity
      ),
    },

    {
      label: "Working Capital",
      values: data.map(
        (x) => x.workingCapital
      ),
    },
  ];

  return (
    <FinancialTable
      periods={periods}
      rows={rows}
    />
  );
}
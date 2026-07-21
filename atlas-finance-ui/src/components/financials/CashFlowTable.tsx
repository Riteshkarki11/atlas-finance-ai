"use client";

import FinancialTable from "./FinancialTable";
import { CashFlowStatement } from "../../types/financialStatement";

interface Props {
  data: CashFlowStatement[];
}

export default function CashFlowTable({
  data,
}: Props) {

  const periods = data.map((x) => x.calendarYear);

  const rows = [

    {
      label: "Operating Cash Flow",
      values: data.map(
        (x) => x.operatingCashFlow
      ),
    },

    {
      label: "Capital Expenditure",
      values: data.map(
        (x) => x.capitalExpenditure
      ),
    },

    {
      label: "Free Cash Flow",
      values: data.map(
        (x) => x.freeCashFlow
      ),
    },

    {
      label: "Investing Cash Flow",
      values: data.map(
        (x) => x.investingCashFlow
      ),
    },

    {
      label: "Financing Cash Flow",
      values: data.map(
        (x) => x.financingCashFlow
      ),
    },

    {
      label: "Net Cash Flow",
      values: data.map(
        (x) => x.netCashFlow
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
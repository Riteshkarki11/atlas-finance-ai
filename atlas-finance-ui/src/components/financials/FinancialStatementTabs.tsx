"use client";

import { useState } from "react";

import {
  FinancialStatementsResponse,
} from "../../types/financialStatement";

import IncomeStatementTable from "./IncomeStatementTable";
import BalanceSheetTable from "./BalanceSheetTable";
import CashFlowTable from "./CashFlowTable";

interface Props {
  statements: FinancialStatementsResponse;
}

export default function FinancialStatementTabs({
  statements,
}: Props) {

  const [tab, setTab] = useState<
    "income" | "balance" | "cashflow"
  >("income");

  const tabs = [
    {
      id: "income",
      label: "Income Statement",
    },
    {
      id: "balance",
      label: "Balance Sheet",
    },
    {
      id: "cashflow",
      label: "Cash Flow",
    },
  ];

  return (
    <div className="space-y-6">

      <div className="flex flex-wrap gap-3">

        {tabs.map((item) => (

          <button
            key={item.id}
            onClick={() =>
              setTab(item.id as any)
            }
            className={`rounded-lg px-5 py-2 font-medium transition ${
              tab === item.id
                ? "bg-blue-600 text-white"
                : "bg-slate-900 text-slate-400 hover:bg-slate-800"
            }`}
          >
            {item.label}
          </button>

        ))}

      </div>

      {tab === "income" && (
        <IncomeStatementTable
          data={statements.incomeStatement}
        />
      )}

      {tab === "balance" && (
        <BalanceSheetTable
          data={statements.balanceSheet}
        />
      )}

      {tab === "cashflow" && (
        <CashFlowTable
          data={statements.cashFlow}
        />
      )}

    </div>
  );
}
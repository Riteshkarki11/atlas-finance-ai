"use client";

import { useEffect, useState } from "react";

import financialStatementsService from "../../services/financialStatements";

import {
  FinancialStatementsResponse,
} from "../../types/financialStatement";

import StatementHeader from "./StatementHeader";
import PageSkeleton from "../common/PageSkeleton";
import EmptyState from "../common/EmptyState";
import FinancialStatementTabs from "./FinancialStatementTabs";

interface Props {
  symbol: string;
}

export default function FinancialStatements({
  symbol,
}: Props) {

  const [loading, setLoading] = useState(true);

  const [statements, setStatements] =
    useState<FinancialStatementsResponse | null>(
      null
    );

  useEffect(() => {

    async function load() {

      try {

        const response =
          await financialStatementsService.getStatements(
            symbol
          );

        setStatements(response);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    load();

  }, [symbol]);

  if (loading) {
    return <PageSkeleton />;
  }

  if (!statements) {
    return <EmptyState
       title="No Financial Statements"
       description="Financial statement data is unavailable."
    />;
  }

  return (

    <div className="space-y-8">

      <StatementHeader
        title="Financial Statements"
        subtitle="Income Statement • Balance Sheet • Cash Flow"
      />

      <FinancialStatementTabs
        statements={statements}
      />

    </div>

  );
}
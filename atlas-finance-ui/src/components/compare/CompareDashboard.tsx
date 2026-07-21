"use client";

import { useEffect, useState } from "react";

import companyComparisonService
  from "../../services/companyComparison";

import {
  CompanyComparison,
} from "../../types/companyComparison";

import CompanySelector from "./CompanySelector";
import ComparisonTable from "./ComparisonTable";
import PageSkeleton from "../common/PageSkeleton";
import EmptyState from "../common/EmptyState";

export default function CompareDashboard() {

  const [symbols, setSymbols] = useState([
    "AAPL",
    "MSFT",
    "",
    "",
  ]);

  const [companies, setCompanies] =
    useState<CompanyComparison[]>([]);

  const [loading, setLoading] =
    useState(false);

  function updateSymbol(
    index: number,
    value: string
  ) {

    const next = [...symbols];

    next[index] = value.toUpperCase();

    setSymbols(next);

  }

  useEffect(() => {

    const activeSymbols =
      symbols.filter(Boolean);

    if (activeSymbols.length < 2) {

      setCompanies([]);

      return;

    }

    async function loadComparison() {

      try {

        setLoading(true);

        const result =
          await companyComparisonService.compareCompanies(
            activeSymbols
          );

        setCompanies(result);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    loadComparison();

  }, [symbols]);

  return (

    <div className="space-y-10">

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {symbols.map((symbol, index) => (

          <CompanySelector
            key={index}
            value={symbol}
            onChange={(ticker) =>
              updateSymbol(index, ticker)
            }
            placeholder={`Ticker ${index + 1}`}
          />

        ))}

      </div>

      {loading ? (

        <PageSkeleton />

      ) : companies.length >= 2 ? (

        <ComparisonTable
          companies={companies}
        />

      ) : (

        <EmptyState
        title="Compare Companies"
        description="Select at least two companies to begin comparison."
    />

      )}

    </div>

  );

}
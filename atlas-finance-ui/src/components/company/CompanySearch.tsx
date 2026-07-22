"use client";

import { useState } from "react";

import {useCompany} from "../../hooks/useCompany";

import CompanyHeader from "./CompanyHeader";
import HeroDashboard from "./HeroDashboard";
import FinancialHealth from "./FinancialHealth";
import AISummary from "../company/AISummary";

import ListCard from "../ui/ListCard";

export default function CompanySearch() {
  const [input, setInput] = useState("");
  const [symbol, setSymbol] = useState("");

  const { data, isLoading, error } = useCompany(symbol);

  const handleAnalyze = () => {
    const ticker = input.trim().toUpperCase();

    if (!ticker) return;

    setSymbol(ticker);
  };

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="flex flex-col gap-4 md:flex-row">
        <input
          type="text"
          value={input}
          placeholder="Search company (AAPL, MSFT, NVDA...)"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
          className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-white outline-none transition focus:border-blue-500"
        />

        <button
          onClick={handleAnalyze}
          disabled={isLoading}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-500 bg-red-500/10 p-4 text-red-300">
          <p className="font-semibold">
            Unable to fetch company analysis.
          </p>

          <p className="mt-2 text-sm">
            {error instanceof Error
              ? error.message
              : "Unknown error occurred."}
          </p>
        </div>
      )}

      {/* Dashboard */}
      {data && (
        <div className="space-y-8">
          {/* Company Header */}
          <CompanyHeader
            companyName={data.company_name}
            symbol={data.symbol}
            exchange={data.exchange}
            sector={data.sector}
            industry={data.industry}
            country={data.country}
            currency={data.currency}
            marketCap={data.market_cap}
          />

          {/* Hero Dashboard */}
          <HeroDashboard
            recommendation={data.recommendation}
            confidence={data.confidence}
            score={data.score}
            grade={data.grade}
            intrinsicValue={data.intrinsic_value}
            currentPrice={data.current_price}
            marginOfSafety={data.margin_of_safety}
            currency={data.currency}
          />

          {/* Financial Health */}
          <FinancialHealth
            valuation={data.valuation_score}
            growth={data.growth_score}
            profitability={data.profitability_score}
            liquidity={data.liquidity_score}
            leverage={data.leverage_score}
            risk={data.risk_score}
          />

          {/* AI Summary */}
          <AISummary summary={data.summary} />

          {/* Strengths & Risks */}
          <div className="grid gap-6 lg:grid-cols-2">
            <ListCard
              title="Strengths"
              icon="✅"
              items={data.strengths}
            />

            <ListCard
              title="Risks"
              icon="⚠️"
              items={data.risks}
            />
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import PortfolioCard from "./PortfolioCard";

import { Portfolio } from "../../types/portfolio";

import { formatCurrency } from "../../lib/format";

interface Props {
  portfolio: Portfolio;
}

export default function PortfolioSummary({
  portfolio,
}: Props) {

  return (

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <PortfolioCard
        title="Portfolio Value"
        value={formatCurrency(portfolio.totalValue)}
      />

      <PortfolioCard
        title="Today's P/L"
        value={formatCurrency(portfolio.todayGainLoss)}
        subtitle={`${portfolio.todayGainLossPercent.toFixed(2)}%`}
        positive={portfolio.todayGainLoss >= 0}
      />

      <PortfolioCard
        title="Overall Return"
        value={formatCurrency(portfolio.totalGainLoss)}
        subtitle={`${portfolio.totalGainLossPercent.toFixed(2)}%`}
        positive={portfolio.totalGainLoss >= 0}
      />

      <PortfolioCard
        title="Cash Balance"
        value={formatCurrency(portfolio.cash)}
      />

    </div>

  );

}
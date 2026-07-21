"use client";

import { useEffect, useState } from "react";

import ratioService from "../../services/ratios";

import { FinancialRatios } from "../../types/ratio";

import RatioCategory from "./RatioCategory";
import PageSkeleton from "../common/PageSkeleton";
import EmptyState from "../common/EmptyState";

interface Props {
  symbol: string;
}

export default function RatioDashboard({
  symbol,
}: Props) {

  const [loading, setLoading] = useState(true);

  const [ratios, setRatios] =
    useState<FinancialRatios | null>(null);

  useEffect(() => {

    async function load() {

      try {

        const data =
          await ratioService.getRatios(symbol);

        setRatios(data);

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

  if (!ratios) {
    return <EmptyState
    title="No Ratios"
    description="Financial ratio data is unavailable."
    />;
  }

  return (

    <div className="space-y-12">

      <RatioCategory
        title="Valuation"
        description="Market valuation multiples"
        ratios={[
          {
            title: "P/E Ratio",
            value: ratios.peRatio,
          },
          {
            title: "Forward P/E",
            value: ratios.forwardPE,
          },
          {
            title: "PEG Ratio",
            value: ratios.pegRatio,
          },
          {
            title: "Price / Book",
            value: ratios.priceToBook,
          },
          {
            title: "Price / Sales",
            value: ratios.priceToSales,
          },
          {
            title: "EV / Revenue",
            value: ratios.evRevenue,
          },
          {
            title: "EV / EBITDA",
            value: ratios.evEbitda,
          },
        ]}
      />

      <RatioCategory
        title="Profitability"
        description="Profit generation efficiency"
        ratios={[
          {
            title: "Gross Margin",
            value: ratios.grossMargin,
            suffix: "%",
          },
          {
            title: "Operating Margin",
            value: ratios.operatingMargin,
            suffix: "%",
          },
          {
            title: "EBITDA Margin",
            value: ratios.ebitdaMargin,
            suffix: "%",
          },
          {
            title: "Net Margin",
            value: ratios.netMargin,
            suffix: "%",
          },
          {
            title: "ROE",
            value: ratios.roe,
            suffix: "%",
          },
          {
            title: "ROA",
            value: ratios.roa,
            suffix: "%",
          },
          {
            title: "ROIC",
            value: ratios.roic,
            suffix: "%",
          },
        ]}
      />

      <RatioCategory
        title="Liquidity"
        description="Short-term financial health"
        ratios={[
          {
            title: "Current Ratio",
            value: ratios.currentRatio,
          },
          {
            title: "Quick Ratio",
            value: ratios.quickRatio,
          },
          {
            title: "Cash Ratio",
            value: ratios.cashRatio,
          },
        ]}
      />

      <RatioCategory
        title="Solvency"
        description="Long-term financial stability"
        ratios={[
          {
            title: "Debt / Equity",
            value: ratios.debtToEquity,
          },
          {
            title: "Debt / Assets",
            value: ratios.debtToAssets,
          },
          {
            title: "Interest Coverage",
            value: ratios.interestCoverage,
          },
          {
            title: "Financial Leverage",
            value: ratios.financialLeverage,
          },
        ]}
      />

      <RatioCategory
        title="Efficiency"
        description="Operational efficiency metrics"
        ratios={[
          {
            title: "Asset Turnover",
            value: ratios.assetTurnover,
          },
          {
            title: "Inventory Turnover",
            value: ratios.inventoryTurnover,
          },
          {
            title: "Receivable Turnover",
            value: ratios.receivableTurnover,
          },
          {
            title: "Payable Turnover",
            value: ratios.payableTurnover,
          },
        ]}
      />

      <RatioCategory
        title="Per Share"
        description="Per-share metrics"
        ratios={[
          {
            title: "EPS",
            value: ratios.eps,
          },
          {
            title: "Revenue / Share",
            value: ratios.revenuePerShare,
          },
          {
            title: "Book Value / Share",
            value: ratios.bookValuePerShare,
          },
          {
            title: "FCF / Share",
            value: ratios.freeCashFlowPerShare,
          },
        ]}
      />

    </div>

  );
}
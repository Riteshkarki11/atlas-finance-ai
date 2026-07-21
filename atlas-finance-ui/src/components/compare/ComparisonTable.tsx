"use client";

import { CompanyComparison } from "../../types/companyComparison";

import CompareHeader from "./CompareHeader";
import ComparisonSection from "./ComparisonSection";

interface Props {
  companies: CompanyComparison[];
}

export default function ComparisonTable({
  companies,
}: Props) {

  const symbols = companies.map(c => c.symbol);

  return (

    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">

      <table className="min-w-full">

        <CompareHeader symbols={symbols} />

        <ComparisonSection
          title="Market Information"
          companies={companies}
          metrics={[
            { label: "Market Cap", key: "marketCap" },
            { label: "Enterprise Value", key: "enterpriseValue" },
            { label: "P/E", key: "pe" },
            { label: "P/B", key: "pb" },
            { label: "P/S", key: "ps" },
            { label: "EV / EBITDA", key: "evEbitda" },
            {
              label: "Dividend Yield",
              key: "dividendYield",
              suffix: "%",
            },
          ]}
        />

        <ComparisonSection
          title="Profitability"
          companies={companies}
          metrics={[
            {
              label: "ROE",
              key: "roe",
              suffix: "%",
            },
            {
              label: "ROA",
              key: "roa",
              suffix: "%",
            },
            {
              label: "Gross Margin",
              key: "grossMargin",
              suffix: "%",
            },
            {
              label: "Operating Margin",
              key: "operatingMargin",
              suffix: "%",
            },
            {
              label: "Net Margin",
              key: "netMargin",
              suffix: "%",
            },
          ]}
        />

        <ComparisonSection
          title="Growth"
          companies={companies}
          metrics={[
            {
              label: "Revenue Growth",
              key: "revenueGrowth",
              suffix: "%",
            },
            {
              label: "EPS Growth",
              key: "epsGrowth",
              suffix: "%",
            },
            {
              label: "FCF Growth",
              key: "fcfGrowth",
              suffix: "%",
            },
          ]}
        />

        <ComparisonSection
          title="Financial Health"
          companies={companies}
          metrics={[
            {
              label: "Debt / Equity",
              key: "debtToEquity",
            },
            {
              label: "Current Ratio",
              key: "currentRatio",
            },
            {
              label: "Quick Ratio",
              key: "quickRatio",
            },
            {
              label: "Interest Coverage",
              key: "interestCoverage",
            },
          ]}
        />

        <ComparisonSection
          title="Efficiency"
          companies={companies}
          metrics={[
            {
              label: "Asset Turnover",
              key: "assetTurnover",
            },
            {
              label: "Inventory Turnover",
              key: "inventoryTurnover",
            },
            {
              label: "Receivable Turnover",
              key: "receivableTurnover",
            },
          ]}
        />

        <ComparisonSection
          title="Per Share"
          companies={companies}
          metrics={[
            {
              label: "EPS",
              key: "eps",
            },
            {
              label: "Book Value / Share",
              key: "bvps",
            },
            {
              label: "FCF / Share",
              key: "fcfPerShare",
            },
          ]}
        />

      </table>

    </div>

  );

}
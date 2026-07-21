"use client";

import { CompanyOverview } from "../../types/companyOverview";
import { formatCurrency } from "../../lib/format";

interface Props {
  company: CompanyOverview;
}

export default function CompanyMetrics({
  company,
}: Props) {

  const metrics = [

    {
      label: "Market Cap",
      value: formatCurrency(company.marketCap),
    },

    {
      label: "Enterprise Value",
      value: formatCurrency(company.enterpriseValue),
    },

    {
      label: "Shares Outstanding",
      value: company.sharesOutstanding.toLocaleString(),
    },

    {
      label: "Average Volume",
      value: company.averageVolume.toLocaleString(),
    },

    {
      label: "52 Week High",
      value: formatCurrency(company.high52Week),
    },

    {
      label: "52 Week Low",
      value: formatCurrency(company.low52Week),
    },

  ];

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Key Metrics
      </h2>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        {metrics.map((metric) => (

          <div
            key={metric.label}
            className="rounded-xl border border-slate-800 p-5"
          >

            <p className="text-sm text-slate-400">
              {metric.label}
            </p>

            <h3 className="mt-3 text-xl font-semibold text-white">
              {metric.value}
            </h3>

          </div>

        ))}

      </div>

    </div>

  );

}
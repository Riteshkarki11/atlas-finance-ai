"use client";

import { CompanyOverview } from "../../types/companyOverview";
import { formatCurrency } from "../../lib/format";

interface Props {
  company: CompanyOverview;
}

export default function CompanyFacts({
  company,
}: Props) {

  const facts = [

    {
      label: "CEO",
      value: company.ceo,
    },

    {
      label: "Employees",
      value: company.employees.toLocaleString(),
    },

    {
      label: "Market Cap",
      value: formatCurrency(company.marketCap),
    },

    {
      label: "Enterprise Value",
      value: formatCurrency(company.enterpriseValue),
    },

    {
      label: "Beta",
      value: company.beta.toFixed(2),
    },

    {
      label: "Dividend Yield",
      value: `${company.dividendYield.toFixed(2)}%`,
    },

  ];

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Company Facts
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {facts.map((fact) => (

          <div
            key={fact.label}
            className="rounded-xl border border-slate-800 p-5"
          >

            <p className="text-sm text-slate-400">
              {fact.label}
            </p>

            <h3 className="mt-3 text-xl font-semibold text-white">
              {fact.value}
            </h3>

          </div>

        ))}

      </div>

    </div>

  );

}
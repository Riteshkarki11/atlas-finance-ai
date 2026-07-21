"use client";

import { CompanyOverview } from "../../types/companyOverview";

interface Props {
  company: CompanyOverview;
}

export default function CompanyHero({
  company,
}: Props) {

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

        <div>

          <h1 className="text-5xl font-bold text-white">
            {company.companyName}
          </h1>

          <div className="mt-4 flex flex-wrap gap-3">

            <span className="rounded-lg bg-blue-600 px-3 py-1 text-white">
              {company.symbol}
            </span>

            <span className="rounded-lg bg-slate-800 px-3 py-1 text-slate-300">
              {company.exchange}
            </span>

            <span className="rounded-lg bg-slate-800 px-3 py-1 text-slate-300">
              {company.currency}
            </span>

          </div>

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <p className="text-slate-400">
              Sector
            </p>

            <h3 className="mt-2 text-xl font-semibold text-white">
              {company.sector}
            </h3>

          </div>

          <div>

            <p className="text-slate-400">
              Industry
            </p>

            <h3 className="mt-2 text-xl font-semibold text-white">
              {company.industry}
            </h3>

          </div>

          <div>

            <p className="text-slate-400">
              Country
            </p>

            <h3 className="mt-2 text-xl font-semibold text-white">
              {company.country}
            </h3>

          </div>

          <div>

            <p className="text-slate-400">
              IPO
            </p>

            <h3 className="mt-2 text-xl font-semibold text-white">
              {company.ipoDate}
            </h3>

          </div>

        </div>

      </div>

    </div>

  );

}
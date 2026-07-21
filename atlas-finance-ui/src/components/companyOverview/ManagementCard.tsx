"use client";

import { CompanyOverview } from "../../types/companyOverview";

interface Props {
  company: CompanyOverview;
}

export default function ManagementCard({
  company,
}: Props) {

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Management
      </h2>

      <div className="space-y-6">

        <div>

          <p className="text-slate-400">
            Chief Executive Officer
          </p>

          <h3 className="mt-2 text-2xl font-semibold text-white">
            {company.ceo}
          </h3>

        </div>

        <div>

          <p className="text-slate-400">
            Total Employees
          </p>

          <h3 className="mt-2 text-xl font-semibold text-white">
            {company.employees.toLocaleString()}
          </h3>

        </div>

        <div>

          <p className="text-slate-400">
            IPO Date
          </p>

          <h3 className="mt-2 text-xl font-semibold text-white">
            {company.ipoDate}
          </h3>

        </div>

      </div>

    </div>

  );

}
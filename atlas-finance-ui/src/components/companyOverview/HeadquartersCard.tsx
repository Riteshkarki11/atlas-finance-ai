"use client";

import { CompanyOverview } from "../../types/companyOverview";

interface Props {
  company: CompanyOverview;
}

export default function HeadquartersCard({
  company,
}: Props) {

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Headquarters
      </h2>

      <div className="space-y-4">

        <p className="text-slate-300">
          {company.address}
        </p>

        <p className="text-slate-300">
          {company.city}
        </p>

        <p className="text-slate-300">
          {company.state}
        </p>

        <p className="text-slate-300">
          {company.country}
        </p>

        <p className="text-slate-300">
          {company.zip}
        </p>

      </div>

    </div>

  );

}
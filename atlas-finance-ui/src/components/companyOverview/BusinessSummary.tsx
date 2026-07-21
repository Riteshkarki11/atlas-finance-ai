"use client";

import { CompanyOverview } from "../../types/companyOverview";

interface Props {
  company: CompanyOverview;
}

export default function BusinessSummary({
  company,
}: Props) {

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="text-2xl font-bold text-white">
        Business Summary
      </h2>

      <p className="mt-6 leading-8 text-slate-300 whitespace-pre-line">
        {company.description}
      </p>

    </div>

  );

}
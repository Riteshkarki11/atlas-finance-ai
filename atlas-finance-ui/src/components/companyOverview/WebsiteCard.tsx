"use client";

import { CompanyOverview } from "../../types/companyOverview";

interface Props {
  company: CompanyOverview;
}

export default function WebsiteCard({
  company,
}: Props) {

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Contact
      </h2>

      <div className="space-y-6">

        <div>

          <p className="text-slate-400">
            Website
          </p>

          <a
            href={company.website}
            target="_blank"
            rel="noreferrer"
            className="mt-2 block text-blue-400 hover:text-blue-300 break-all"
          >
            {company.website}
          </a>

        </div>

        <div>

          <p className="text-slate-400">
            Phone
          </p>

          <p className="mt-2 text-white">
            {company.phone}
          </p>

        </div>

      </div>

    </div>

  );

}
"use client";
import PriceDashboard from "../../components/company/PriceDashboard";
import DashboardLayout from "../../components/layout/DashboardLayout";
import CompanySearch from "../../components/company/CompanySearch";

export default function CompanyPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Company Analysis
          </h1>

          <p className="mt-2 text-slate-400">
            Search any publicly traded company and generate an AI-powered investment report.
          </p>
        </div>

        <CompanySearch /> 

      </div>
    </DashboardLayout>
  );
}
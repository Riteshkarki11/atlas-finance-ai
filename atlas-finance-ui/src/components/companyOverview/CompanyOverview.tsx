"use client";

import { useEffect, useState } from "react";

import companyOverviewService from "../../services/companyOverview";

import {
  CompanyOverview as CompanyOverviewType,
} from "../../types/companyOverview";

import PageSkeleton from "../common/PageSkeleton";
import EmptyState from "../common/EmptyState";

import CompanyHero from "./CompanyHero";
import BusinessSummary from "./BusinessSummary";
import CompanyFacts from "./CompanyFacts";
import ManagementCard from "./ManagementCard";
import HeadquartersCard from "./HeadquartersCard";
import WebsiteCard from "./WebsiteCard";
import CompanyMetrics from "./CompanyMetrics";

interface Props {
  symbol: string;
}

export default function CompanyOverview({
  symbol,
}: Props) {

  const [loading, setLoading] = useState(true);

  const [company, setCompany] =
    useState<CompanyOverviewType | null>(null);

  useEffect(() => {

    async function load() {

      try {

        const data =
          await companyOverviewService.getCompanyOverview(symbol);

        setCompany(data);

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

  if (!company) {
        return (
            <EmptyState
                title="Company Not Found"
                description="Unable to load company information."
            />
        );
  }

  return (

    <div className="space-y-10">

      <CompanyHero company={company} />

      <BusinessSummary company={company} />

      <CompanyFacts company={company} />

      <div className="grid gap-8 lg:grid-cols-3">

        <ManagementCard company={company} />

        <HeadquartersCard company={company} />

        <WebsiteCard company={company} />

      </div>

      <CompanyMetrics company={company} />

    </div>

  );

}
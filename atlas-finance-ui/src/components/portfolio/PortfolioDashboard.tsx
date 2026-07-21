"use client";

import { useEffect, useState } from "react";

import portfolioService from "../../services/portfolio";

import { Portfolio } from "../../types/portfolio";

import PageSkeleton from "../common/PageSkeleton";
import EmptyState from "../common/EmptyState";

import PortfolioSummary from "./PortfolioSummary";
import PortfolioPerformance from "./PortfolioPerformance";
import HoldingsTable from "./HoldingsTable";
import AllocationCard from "./AllocationCard";
import SectorAllocation from "./SectorAllocation";
import TopMovers from "./TopMovers";
import Watchlist from "./Watchlist";
import TransactionHistory from "./TransactionHistory";

export default function PortfolioDashboard() {

  const [loading, setLoading] = useState(true);

  const [portfolio, setPortfolio] =
    useState<Portfolio | null>(null);

  useEffect(() => {

    async function loadPortfolio() {

      try {

        const data =
          await portfolioService.getPortfolio();

        setPortfolio(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    loadPortfolio();

  }, []);

  if (loading) {
      return <PageSkeleton />;
  }

  if (!portfolio) {
        return (
            <EmptyState
                title="No Portfolio"
                description="Your portfolio is currently empty."
            />
        );
  }

  return (

    <div className="space-y-10">

      <PortfolioSummary portfolio={portfolio} />

      <PortfolioPerformance portfolio={portfolio} />

      <HoldingsTable portfolio={portfolio} />

      <div className="grid gap-8 lg:grid-cols-2">

        <AllocationCard
          title="Asset Allocation"
          allocations={portfolio.assetAllocation}
        />

        <SectorAllocation
          portfolio={portfolio}
        />

      </div>

      <TopMovers portfolio={portfolio} />

      <Watchlist portfolio={portfolio} />

      <TransactionHistory portfolio={portfolio} />

    </div>

  );

}
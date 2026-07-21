"use client";

import { Portfolio } from "../../types/portfolio";
import AllocationCard from "./AllocationCard";

interface Props {
  portfolio: Portfolio;
}

export default function SectorAllocation({
  portfolio,
}: Props) {

  return (

    <AllocationCard
      title="Sector Allocation"
      allocations={portfolio.sectorAllocation}
    />

  );

}
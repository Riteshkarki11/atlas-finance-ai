"use client";

import { useQuery } from "@tanstack/react-query";
import { getInvestmentReport } from "../services/company";

export function useCompany(symbol: string) {
  return useQuery({
    queryKey: ["company", symbol],

    queryFn: () => getInvestmentReport(symbol),

    enabled: symbol.length > 0,
  });
}
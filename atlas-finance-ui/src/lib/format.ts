export function formatCurrency(
  value?: number | null,
  currency = "USD"
): string {
  if (value == null) return "-";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
export function formatMarketCap(value?: number | null): string {
  if (value == null) return "-";

  const abs = Math.abs(value);

  if (abs >= 1_000_000_000_000) {
    return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
  }

  if (abs >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  }

  if (abs >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }

  if (abs >= 1_000) {
    return `$${(value / 1_000).toFixed(2)}K`;
  }

  return formatCurrency(value);
}

export function formatTicker(
  exchange?: string | null,
  symbol?: string | null
): string {
  if (!symbol) return "-";
  if (!exchange) return symbol;

  return `${exchange} : ${symbol}`;
}
from pydantic import BaseModel


class GrowthMetric(BaseModel):
    latest: float | None = None


class GrowthAnalysisResponse(BaseModel):
    symbol: str

    revenue_growth: GrowthMetric
    net_income_growth: GrowthMetric
    eps_growth: GrowthMetric
    free_cash_flow_growth: GrowthMetric
    asset_growth: GrowthMetric
    equity_growth: GrowthMetric
from pydantic import BaseModel


class TrendPoint(BaseModel):
    year: str
    growth: float | None


class TrendAnalysisResponse(BaseModel):
    symbol: str

    revenue_growth: list[TrendPoint]
    net_income_growth: list[TrendPoint]
    eps_growth: list[TrendPoint]
    free_cash_flow_growth: list[TrendPoint]
    asset_growth: list[TrendPoint]
    equity_growth: list[TrendPoint]
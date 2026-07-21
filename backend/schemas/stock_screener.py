from typing import Optional

from pydantic import BaseModel


class StockScreenerRequest(BaseModel):
    market: Optional[str] = "US"

    sector: Optional[str] = None
    industry: Optional[str] = None

    min_market_cap: Optional[float] = None
    max_market_cap: Optional[float] = None

    min_pe: Optional[float] = None
    max_pe: Optional[float] = None

    min_roe: Optional[float] = None
    min_roa: Optional[float] = None

    min_revenue_growth: Optional[float] = None

    max_debt_to_equity: Optional[float] = None

    recommendation: Optional[str] = None

    sort_by: str = "score"
    sort_order: str = "desc"

    limit: int = 25


class StockResult(BaseModel):
    symbol: str
    company: str

    sector: Optional[str]
    industry: Optional[str]

    market_cap: float

    pe: float

    roe: float

    revenue_growth: float

    debt_to_equity: float

    recommendation: str

    score: float


class StockScreenerResponse(BaseModel):
    count: int
    stocks: list[StockResult]
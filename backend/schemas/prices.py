from datetime import date

from pydantic import BaseModel


class PricePoint(BaseModel):
    date: date
    close: float


class PriceHistoryResponse(BaseModel):
    symbol: str
    current_price: float
    change: float
    change_percent: float
    high_52_week: float
    low_52_week: float
    prices: list[PricePoint]
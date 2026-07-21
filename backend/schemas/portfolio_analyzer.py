from pydantic import BaseModel



class Holding(BaseModel):
    symbol: str
    shares: float


class PortfolioAnalyzerRequest(BaseModel):
    holdings: list[Holding]


class SectorAllocation(BaseModel):
    sector: str
    percentage: float

class HoldingAnalysis(BaseModel):
    symbol: str
    shares: float
    current_price: float
    market_value: float

class PortfolioAnalyzerResponse(BaseModel):
    portfolio_value: float
    total_holdings: int
    holdings: list[HoldingAnalysis]
    sector_allocation: list[SectorAllocation]
    diversification_score: float
    risk_score: float
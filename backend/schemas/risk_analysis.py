from pydantic import BaseModel


class Holding(BaseModel):
    symbol: str
    shares: float


class RiskAnalysisRequest(BaseModel):
    holdings: list[Holding]


class RiskHolding(BaseModel):
    symbol: str
    beta: float
    volatility: float


class RiskAnalysisResponse(BaseModel):
    portfolio_beta: float
    portfolio_volatility: float
    portfolio_risk: str
    holdings: list[RiskHolding]
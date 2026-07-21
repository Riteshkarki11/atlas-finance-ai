from pydantic import BaseModel


class InvestmentReportResponse(BaseModel):
    symbol: str

    # AI Summary
    summary: str

    # AI Recommendation
    recommendation: str
    confidence: int

    # Overall Rating
    score: float
    grade: str

    # Individual Scores
    valuation_score: float
    growth_score: float
    profitability_score: float
    liquidity_score: float
    leverage_score: float
    risk_score: float
    margin_of_safety: float
    # DCF

    intrinsic_value: float
    # AI Insights
    strengths: list[str]
    risks: list[str]
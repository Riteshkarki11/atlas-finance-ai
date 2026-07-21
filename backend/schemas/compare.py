from pydantic import BaseModel


class CompareRequest(BaseModel):
    symbols: list[str]


class CompanyRanking(BaseModel):
    rank: int
    symbol: str
    score: float
    recommendation: str


class CompareResponse(BaseModel):
    ranking: list[CompanyRanking]
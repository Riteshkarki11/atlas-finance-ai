from pydantic import BaseModel


class SearchResult(BaseModel):
    symbol: str
    company_name: str
    exchange: str | None = None
    sector: str | None = None
    industry: str | None = None
    country: str | None = None


class SearchResponse(BaseModel):
    query: str
    total_results: int
    results: list[SearchResult]
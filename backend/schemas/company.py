from pydantic import BaseModel


class CompanyProfile(BaseModel):
    symbol: str
    company_name: str

    exchange: str | None = None
    sector: str | None = None
    industry: str | None = None

    market_cap: int | None = None
    current_price: float | None = None

    employees: int | None = None
    ceo: str | None = None
    ceo_since: str | None = None

    country: str | None = None
    headquarters: str | None = None

    website: str | None = None
    description: str | None = None

    beta: float | None = None
    logo: str | None = None
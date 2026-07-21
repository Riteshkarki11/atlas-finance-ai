from pydantic import BaseModel


class IncomeStatement(BaseModel):
    date: str
    period: str

    revenue: int | None = None
    cost_of_revenue: int | None = None

    gross_profit: int | None = None

    operating_income: int | None = None

    net_income: int | None = None

    eps: float | None = None


class IncomeStatementResponse(BaseModel):
    symbol: str
    statements: list[IncomeStatement]
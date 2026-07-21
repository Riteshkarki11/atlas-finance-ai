from pydantic import BaseModel


class BalanceSheet(BaseModel):
    date: str
    period: str

    cash_and_cash_equivalents: int | None = None
    total_current_assets: int | None = None
    total_assets: int | None = None

    total_current_liabilities: int | None = None
    total_liabilities: int | None = None

    total_stockholders_equity: int | None = None

    total_debt: int | None = None


class BalanceSheetResponse(BaseModel):
    symbol: str
    statements: list[BalanceSheet]
from pydantic import BaseModel


class CashFlowStatement(BaseModel):
    date: str
    period: str

    operating_cash_flow: int | None = None
    capital_expenditure: int | None = None
    free_cash_flow: int | None = None

    net_cash_from_investing: int | None = None
    net_cash_from_financing: int | None = None

    net_change_in_cash: int | None = None


class CashFlowResponse(BaseModel):
    symbol: str
    statements: list[CashFlowStatement]
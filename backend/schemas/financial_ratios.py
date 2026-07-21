from pydantic import BaseModel


class LiquidityRatios(BaseModel):
    current_ratio: float | None = None


class LeverageRatios(BaseModel):
    debt_to_equity: float | None = None


class ProfitabilityRatios(BaseModel):
    gross_margin: float | None = None
    operating_margin: float | None = None
    net_margin: float | None = None
    roe: float | None = None
    roa: float | None = None


class CashFlowRatios(BaseModel):
    free_cash_flow_margin: float | None = None


class FinancialRatiosResponse(BaseModel):
    symbol: str

    liquidity: LiquidityRatios

    leverage: LeverageRatios

    profitability: ProfitabilityRatios

    cash_flow: CashFlowRatios
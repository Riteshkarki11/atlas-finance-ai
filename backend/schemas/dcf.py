from pydantic import BaseModel


class DCFResponse(BaseModel):
    symbol: str

    current_price: float | None

    intrinsic_value: float | None

    enterprise_value: float | None

    terminal_value: float | None

    free_cash_flow_growth: float | None

    discount_rate: float

    terminal_growth_rate: float

    margin_of_safety: float | None

    recommendation: str
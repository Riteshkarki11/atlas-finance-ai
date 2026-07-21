def forecast_free_cash_flows(
    current_fcf: float,
    growth_rate: float,
    years: int = 5,
) -> list[float]:

    cash_flows = []
    fcf = current_fcf

    for _ in range(years):
        fcf *= (1 + growth_rate / 100)
        cash_flows.append(fcf)

    return cash_flows


def discount_cash_flows(
    cash_flows: list[float],
    discount_rate: float,
) -> float:

    present_value = 0.0

    for i, cash_flow in enumerate(cash_flows, start=1):
        present_value += cash_flow / ((1 + discount_rate / 100) ** i)

    return present_value


def terminal_value(
    final_cash_flow: float,
    discount_rate: float,
    terminal_growth_rate: float,
) -> float:

    return (
        final_cash_flow * (1 + terminal_growth_rate / 100)
    ) / ((discount_rate - terminal_growth_rate) / 100)
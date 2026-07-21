from backend.schemas.dcf import DCFResponse
from backend.services.base_service import BaseService
from backend.utils.dcf_utils import (
    forecast_free_cash_flows,
    discount_cash_flows,
    terminal_value,
)
from backend.services.growth_analysis_service import growth_analysis_service

class DCFService(BaseService):

    def get_dcf(self, symbol: str):

        symbol = symbol.strip().upper()

        cash = self.provider.cash_flow(symbol).statements
        profile = self.provider.company_profile(symbol)
        prices = self.provider.historical_prices(symbol)

        latest_cash = cash[0]

        current_price = prices.prices[0].close

        current_fcf = latest_cash.free_cash_flow

        growth = growth_analysis_service.get_growth_analysis(symbol)

        growth_rate = growth.free_cash_flow_growth.latest

        if growth_rate is None:
            growth_rate = 8.0

        # Prevent unrealistic growth assumptions
        if growth_rate < 0:
            growth_rate = 3.0

        if growth_rate > 25:
            growth_rate = 25.0
        discount_rate = 10.0
        terminal_growth = 3.0

        forecast = forecast_free_cash_flows(
            current_fcf,
            growth_rate,
        )

        pv = discount_cash_flows(
            forecast,
            discount_rate,
        )

        tv = terminal_value(
            forecast[-1],
            discount_rate,
            terminal_growth,
        )

        enterprise_value = pv + (
            tv / ((1 + discount_rate / 100) ** 5)
        )

        shares = profile.market_cap / current_price

        intrinsic_value = enterprise_value / shares

        margin = (
            (intrinsic_value - current_price)
            / current_price
        ) * 100

        if margin > 10:
            recommendation = "BUY"
        elif margin < -10:
            recommendation = "SELL"
        else:
            recommendation = "HOLD"

        return DCFResponse(
            symbol=symbol,
            current_price=round(current_price, 2),
            intrinsic_value=round(intrinsic_value, 2),
            enterprise_value=round(enterprise_value, 2),
            terminal_value=round(tv, 2),
            free_cash_flow_growth=round(growth_rate, 2),
            discount_rate=discount_rate,
            terminal_growth_rate=terminal_growth,
            margin_of_safety=round(margin, 2),
            recommendation=recommendation,
        )


dcf_service = DCFService()
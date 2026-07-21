from backend.schemas.prices import (
    PriceHistoryResponse,
    PricePoint,
)
from backend.services.base_service import BaseService


class PricesService(BaseService):

    def get_historical_prices(
        self,
        symbol: str,
    ) -> PriceHistoryResponse:

        symbol = self.normalize_symbol(symbol)

        history = self.provider.historical_prices(symbol)

        if not history:
            raise ValueError(
                f"No historical prices found for {symbol}"
            )

        prices = sorted(
            history,
            key=lambda x: x["date"],
        )

        closes = [
            float(item["close"])
            for item in prices
        ]

        current_price = closes[-1]

        previous_price = closes[-2]

        change = current_price - previous_price

        change_percent = (
            change / previous_price
        ) * 100

        return PriceHistoryResponse(

            symbol=symbol,

            current_price=current_price,

            change=round(change, 2),

            change_percent=round(
                change_percent,
                2,
            ),

            high_52_week=max(closes),

            low_52_week=min(closes),

            prices=[
                PricePoint(
                    date=item["date"],
                    close=item["close"],
                )
                for item in prices
            ],
        )


prices_service = PricesService()
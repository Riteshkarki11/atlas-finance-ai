from backend.services.base_service import BaseService
from backend.schemas.stock_screener import (
    StockScreenerRequest,
    StockScreenerResponse,
)


class StockScreenerService(BaseService):

    def screen(self, request: StockScreenerRequest) -> StockScreenerResponse:

        print("StockScreenerService.screen() called")

        raw_stocks = self.provider.stock_screener(limit=5)

        print("\n========== RAW STOCKS ==========")
        print(raw_stocks)
        print("================================\n")

        return StockScreenerResponse(
            count=0,
            stocks=[]
        )


stock_screener_service = StockScreenerService()
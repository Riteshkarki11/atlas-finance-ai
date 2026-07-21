from fastapi import APIRouter

from backend.schemas.stock_screener import (
    StockScreenerRequest,
    StockScreenerResponse,
)

from backend.services.stock_screener_service import (
    stock_screener_service,
)

router = APIRouter(
    prefix="/stock-screener",
    tags=["Stock Screener"],
)


@router.post(
    "",
    response_model=StockScreenerResponse,
)
def screen(request: StockScreenerRequest):
    return stock_screener_service.screen(request)
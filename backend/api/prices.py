from fastapi import APIRouter

from backend.schemas.prices import PriceHistoryResponse
from backend.services.prices_service import prices_service

router = APIRouter()


@router.get("/prices/{symbol}", response_model=PriceHistoryResponse)
def get_prices(symbol: str):
    return prices_service.get_historical_prices(symbol)
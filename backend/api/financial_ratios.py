from fastapi import APIRouter

from backend.schemas.financial_ratios import FinancialRatiosResponse
from backend.services.financial_ratios_service import (
    financial_ratios_service,
)

router = APIRouter()


@router.get(
    "/financial-ratios/{symbol}",
    response_model=FinancialRatiosResponse,
)
def get_financial_ratios(symbol: str):
    return financial_ratios_service.get_ratios(symbol)
from fastapi import APIRouter

from backend.schemas.balance_sheet import BalanceSheetResponse
from backend.services.balance_sheet_service import (
    balance_sheet_service,
)

router = APIRouter()


@router.get(
    "/balance-sheet/{symbol}",
    response_model=BalanceSheetResponse,
)
def get_balance_sheet(symbol: str):
    return balance_sheet_service.get_balance_sheet(symbol)
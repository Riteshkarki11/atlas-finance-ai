from fastapi import APIRouter

from backend.schemas.cash_flow import CashFlowResponse
from backend.services.cash_flow_service import cash_flow_service

router = APIRouter()


@router.get(
    "/cash-flow/{symbol}",
    response_model=CashFlowResponse,
)
def get_cash_flow(symbol: str):
    return cash_flow_service.get_cash_flow(symbol)
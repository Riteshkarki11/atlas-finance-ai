from fastapi import APIRouter

from backend.schemas.income_statement import IncomeStatementResponse
from backend.services.income_statement_service import (
    income_statement_service,
)

router = APIRouter()


@router.get(
    "/income-statement/{symbol}",
    response_model=IncomeStatementResponse,
)
def get_income_statement(symbol: str):
    return income_statement_service.get_income_statement(symbol)
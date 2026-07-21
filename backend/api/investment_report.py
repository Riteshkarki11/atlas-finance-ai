from fastapi import APIRouter

from backend.schemas.investment_report import (
    InvestmentReportResponse,
)

from backend.services.investment_report_service import (
    investment_report_service,
)

router = APIRouter(
    prefix="/investment-report",
    tags=["Investment Report"],
)


@router.get(
    "/{symbol}",
    response_model=InvestmentReportResponse,
)
def get_report(symbol: str):
    return investment_report_service.get_report(symbol)
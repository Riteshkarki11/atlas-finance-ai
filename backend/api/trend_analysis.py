from fastapi import APIRouter

from backend.schemas.trend_analysis import TrendAnalysisResponse
from backend.services.trend_analysis_service import trend_analysis_service

router = APIRouter()


@router.get(
    "/trend-analysis/{symbol}",
    response_model=TrendAnalysisResponse,
)
def get_trend_analysis(symbol: str):
    return trend_analysis_service.get_trend_analysis(symbol)
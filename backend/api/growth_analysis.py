from fastapi import APIRouter

from backend.schemas.growth_analysis import GrowthAnalysisResponse
from backend.services.growth_analysis_service import growth_analysis_service

router = APIRouter()


@router.get(
    "/growth-analysis/{symbol}",
    response_model=GrowthAnalysisResponse,
)
def get_growth_analysis(symbol: str):
    return growth_analysis_service.get_growth_analysis(symbol)
from fastapi import APIRouter

from backend.schemas.company_analysis import CompanyAnalysisResponse
from backend.services.company_analysis_service import company_analysis_service

router = APIRouter()


@router.get(
    "/company-analysis/{symbol}",
    response_model=CompanyAnalysisResponse,
)
def get_company_analysis(symbol: str):

    return company_analysis_service.get_company_analysis(symbol)
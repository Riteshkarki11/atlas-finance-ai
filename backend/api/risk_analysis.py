from fastapi import APIRouter

from backend.schemas.risk_analysis import (
    RiskAnalysisRequest,
    RiskAnalysisResponse,
)

from backend.services.risk_analysis_service import (
    risk_analysis_service,
)

router = APIRouter()


@router.post(
    "",
    response_model=RiskAnalysisResponse,
)
def analyze(request: RiskAnalysisRequest):

    return risk_analysis_service.analyze(request)
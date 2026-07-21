from fastapi import APIRouter

from backend.schemas.portfolio_analyzer import (
    PortfolioAnalyzerRequest,
    PortfolioAnalyzerResponse,
)

from backend.services.portfolio_analyzer_service import (
    portfolio_analyzer_service,
)

router = APIRouter(
    prefix="/portfolio-analyzer",
    tags=["Portfolio Analyzer"],
)


@router.post(
    "",
    response_model=PortfolioAnalyzerResponse,
)
def analyze(
    request: PortfolioAnalyzerRequest,
):
    return portfolio_analyzer_service.analyze(request)
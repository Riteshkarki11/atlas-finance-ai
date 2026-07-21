from pydantic import BaseModel

from backend.schemas.company import CompanyProfile
from backend.schemas.financial_ratios import FinancialRatiosResponse
from backend.schemas.growth_analysis import GrowthAnalysisResponse
from backend.schemas.trend_analysis import TrendAnalysisResponse
from backend.schemas.dcf import DCFResponse


class CompanyAnalysisResponse(BaseModel):
    profile: CompanyProfile
    financial_ratios: FinancialRatiosResponse
    growth_analysis: GrowthAnalysisResponse
    trend_analysis: TrendAnalysisResponse
    dcf: DCFResponse
    
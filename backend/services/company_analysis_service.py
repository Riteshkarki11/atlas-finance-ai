from backend.schemas.company_analysis import CompanyAnalysisResponse

from backend.services.base_service import BaseService
from backend.services.company_service import company_service
from backend.services.financial_ratios_service import financial_ratios_service
from backend.services.growth_analysis_service import growth_analysis_service
from backend.services.trend_analysis_service import trend_analysis_service
from backend.services.dcf_service import dcf_service


class CompanyAnalysisService(BaseService):

    def get_company_analysis(self, symbol: str):

        symbol = self.normalize_symbol(symbol)

        return CompanyAnalysisResponse(

            profile=company_service.get_company_profile(symbol),

            financial_ratios=financial_ratios_service.get_ratios(symbol),

            growth_analysis=growth_analysis_service.get_growth_analysis(symbol),

            trend_analysis=trend_analysis_service.get_trend_analysis(symbol),

            dcf=dcf_service.get_dcf(symbol),

        )


company_analysis_service = CompanyAnalysisService()
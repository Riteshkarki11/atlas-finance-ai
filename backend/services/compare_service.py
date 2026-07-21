from backend.schemas.compare import (
    CompareResponse,
    CompanyRanking,
)

from backend.services.base_service import BaseService
from backend.services.investment_report_service import (
    investment_report_service,
)


class CompareService(BaseService):

    def compare(self, symbols: list[str]):

        companies = []

        for symbol in symbols:

            report = investment_report_service.get_report(symbol)

            companies.append(
                {
                    "symbol": symbol.upper(),
                    "score": report.score,
                    "recommendation": report.recommendation,
                }
            )

        companies.sort(
            key=lambda x: x["score"],
            reverse=True,
        )

        rankings = []

        for index, company in enumerate(companies, start=1):

            rankings.append(
                CompanyRanking(
                    rank=index,
                    symbol=company["symbol"],
                    score=company["score"],
                    recommendation=company["recommendation"],
                )
            )

        return CompareResponse(
            ranking=rankings
        )


compare_service = CompareService()
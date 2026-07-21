from backend.services.base_service import BaseService
from backend.schemas.risk_analysis import (
    RiskAnalysisRequest,
    RiskAnalysisResponse,
    RiskHolding,
)


class RiskAnalysisService(BaseService):

    def analyze(self, request: RiskAnalysisRequest):

        holdings = []

        total_beta = 0

        total_volatility = 0

        count = len(request.holdings)

        for holding in request.holdings:

            profile = self.provider.company_profile(
                holding.symbol
            )

            beta = profile.beta if profile.beta else 1.0

            history = self.provider.historical_prices(
                holding.symbol
            )

            prices = [price.close for price in history.prices[:30]]

            if len(prices) > 1:
                volatility = (
                    max(prices) - min(prices)
                ) / max(prices) * 100
            else:
                volatility = 0

            total_beta += beta
            total_volatility += volatility

            holdings.append(
                RiskHolding(
                    symbol=holding.symbol,
                    beta=round(beta, 2),
                    volatility=round(volatility, 2),
                )
            )

        portfolio_beta = round(total_beta / count, 2)

        portfolio_volatility = round(
            total_volatility / count,
            2,
        )

        if portfolio_beta < 0.8:
            portfolio_risk = "Low"

        elif portfolio_beta < 1.2:
            portfolio_risk = "Moderate"

        else:
            portfolio_risk = "High"

        return RiskAnalysisResponse(
            portfolio_beta=portfolio_beta,
            portfolio_volatility=portfolio_volatility,
            portfolio_risk=portfolio_risk,
            holdings=holdings,
        )


risk_analysis_service = RiskAnalysisService()
from backend.services.base_service import BaseService
from backend.schemas.portfolio_analyzer import (
    PortfolioAnalyzerRequest,
    PortfolioAnalyzerResponse,
    HoldingAnalysis,
    SectorAllocation,
)


class PortfolioAnalyzerService(BaseService):

    def analyze(self, request: PortfolioAnalyzerRequest):

        holdings = []
        total_value = 0

        # Store total market value by sector
        sector_totals = {}

        for holding in request.holdings:

            # Get latest stock price
            history = self.provider.historical_prices(
                holding.symbol
            )

            latest_price = history.prices[0].close

            # Calculate holding market value
            market_value = latest_price * holding.shares

            # Get company profile
            profile = self.provider.company_profile(
                holding.symbol
            )

            sector = profile.sector

            # Add to total portfolio value
            total_value += market_value

            # Add market value to sector total
            sector_totals[sector] = (
                sector_totals.get(sector, 0) + market_value
            )

            # Save holding details
            holdings.append(
                HoldingAnalysis(
                    symbol=holding.symbol,
                    shares=holding.shares,
                    current_price=latest_price,
                    market_value=market_value,
                )
            )

        # -----------------------------
        # Diversification & Risk Scores
        # -----------------------------
        largest_weight = max(
            holding.market_value / total_value
            for holding in holdings
        )

        diversification_score = round(
            (1 - largest_weight) * 100,
            2
        )

        risk_score = round(
            largest_weight * 100,
            2
        )

        # -----------------------------
        # Sector Allocation
        # -----------------------------
        sector_allocation = []

        for sector, value in sector_totals.items():

            percentage = (value / total_value) * 100

            sector_allocation.append(
                SectorAllocation(
                    sector=sector,
                    percentage=round(percentage, 2),
                )
            )

        # -----------------------------
        # Final Response
        # -----------------------------
        return PortfolioAnalyzerResponse(
            portfolio_value=round(total_value, 2),
            total_holdings=len(holdings),
            holdings=holdings,
            sector_allocation=sector_allocation,
            diversification_score=diversification_score,
            risk_score=risk_score,
        )


portfolio_analyzer_service = PortfolioAnalyzerService()
from backend.schemas.growth_analysis import (
    GrowthAnalysisResponse,
    GrowthMetric,
)

from backend.services.base_service import BaseService
from backend.utils.math_utils import percentage_change


class GrowthAnalysisService(BaseService):

    def get_growth_analysis(self, symbol: str):

        symbol = self.normalize_symbol(symbol)

        # Get financial statements
        income = self.provider.income_statement(symbol).statements
        balance = self.provider.balance_sheet(symbol).statements
        cash = self.provider.cash_flow(symbol).statements

        # Latest and previous year
        latest_income = income[0]
        previous_income = income[1]

        latest_balance = balance[0]
        previous_balance = balance[1]

        latest_cash = cash[0]
        previous_cash = cash[1]

        # Calculate growth
        revenue_growth = percentage_change(
            latest_income.revenue,
            previous_income.revenue,
        )

        net_income_growth = percentage_change(
            latest_income.net_income,
            previous_income.net_income,
        )

        eps_growth = percentage_change(
            latest_income.eps,
            previous_income.eps,
        )

        free_cash_flow_growth = percentage_change(
            latest_cash.free_cash_flow,
            previous_cash.free_cash_flow,
        )

        asset_growth = percentage_change(
            latest_balance.total_assets,
            previous_balance.total_assets,
        )

        equity_growth = percentage_change(
            latest_balance.total_stockholders_equity,
            previous_balance.total_stockholders_equity,
        )

        return GrowthAnalysisResponse(
            symbol=symbol,
            revenue_growth=GrowthMetric(latest=revenue_growth),
            net_income_growth=GrowthMetric(latest=net_income_growth),
            eps_growth=GrowthMetric(latest=eps_growth),
            free_cash_flow_growth=GrowthMetric(latest=free_cash_flow_growth),
            asset_growth=GrowthMetric(latest=asset_growth),
            equity_growth=GrowthMetric(latest=equity_growth),
        )


growth_analysis_service = GrowthAnalysisService()
from backend.schemas.trend_analysis import (
    TrendAnalysisResponse,
    TrendPoint,
)

from backend.services.base_service import BaseService
from backend.utils.math_utils import percentage_change


class TrendAnalysisService(BaseService):

    def get_trend_analysis(self, symbol: str):

        symbol = self.normalize_symbol(symbol)

        income = self.provider.income_statement(symbol).statements
        balance = self.provider.balance_sheet(symbol).statements
        cash = self.provider.cash_flow(symbol).statements

        revenue_growth = []
        net_income_growth = []
        eps_growth = []
        free_cash_flow_growth = []
        asset_growth = []
        equity_growth = []

        for i in range(len(income) - 1):

            current_income = income[i]
            previous_income = income[i + 1]

            current_balance = balance[i]
            previous_balance = balance[i + 1]

            current_cash = cash[i]
            previous_cash = cash[i + 1]

            year = current_income.date[:4]

            revenue_growth.append(
                TrendPoint(
                    year=year,
                    growth=percentage_change(
                        current_income.revenue,
                        previous_income.revenue,
                    ),
                )
            )

            net_income_growth.append(
                TrendPoint(
                    year=year,
                    growth=percentage_change(
                        current_income.net_income,
                        previous_income.net_income,
                    ),
                )
            )

            eps_growth.append(
                TrendPoint(
                    year=year,
                    growth=percentage_change(
                        current_income.eps,
                        previous_income.eps,
                    ),
                )
            )

            free_cash_flow_growth.append(
                TrendPoint(
                    year=year,
                    growth=percentage_change(
                        current_cash.free_cash_flow,
                        previous_cash.free_cash_flow,
                    ),
                )
            )

            asset_growth.append(
                TrendPoint(
                    year=year,
                    growth=percentage_change(
                        current_balance.total_assets,
                        previous_balance.total_assets,
                    ),
                )
            )

            equity_growth.append(
                TrendPoint(
                    year=year,
                    growth=percentage_change(
                        current_balance.total_stockholders_equity,
                        previous_balance.total_stockholders_equity,
                    ),
                )
            )

        revenue_growth.reverse()
        net_income_growth.reverse()
        eps_growth.reverse()
        free_cash_flow_growth.reverse()
        asset_growth.reverse()
        equity_growth.reverse()

        return TrendAnalysisResponse(
            symbol=symbol,
            revenue_growth=revenue_growth,
            net_income_growth=net_income_growth,
            eps_growth=eps_growth,
            free_cash_flow_growth=free_cash_flow_growth,
            asset_growth=asset_growth,
            equity_growth=equity_growth,
        )


trend_analysis_service = TrendAnalysisService()
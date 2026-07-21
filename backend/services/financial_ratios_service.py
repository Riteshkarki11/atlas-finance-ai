from backend.schemas.financial_ratios import (
    CashFlowRatios,
    FinancialRatiosResponse,
    LeverageRatios,
    LiquidityRatios,
    ProfitabilityRatios,
)
from backend.services.base_service import BaseService
from backend.utils.math_utils import (
    safe_divide,
    safe_round,
    to_percentage,
)


class FinancialRatiosService(BaseService):
    """
    Calculates key financial ratios using the latest
    Income Statement, Balance Sheet, and Cash Flow Statement.
    """

    def get_ratios(self, symbol: str) -> FinancialRatiosResponse:
        symbol = self.normalize_symbol(symbol)

        income_response = self.provider.income_statement(symbol)
        balance_response = self.provider.balance_sheet(symbol)
        cash_response = self.provider.cash_flow(symbol)

        if (
            not income_response.statements
            or not balance_response.statements
            or not cash_response.statements
        ):
            raise ValueError(f"No financial data available for {symbol}")

        income = income_response.statements[0]
        balance = balance_response.statements[0]
        cash = cash_response.statements[0]

        # Liquidity
        current_ratio = safe_divide(
            balance.total_current_assets,
            balance.total_current_liabilities,
        )

        # Leverage
        debt_to_equity = safe_divide(
            balance.total_debt,
            balance.total_stockholders_equity,
        )

        # Profitability
        gross_margin = safe_divide(
            income.gross_profit,
            income.revenue,
        )

        operating_margin = safe_divide(
            income.operating_income,
            income.revenue,
        )

        net_margin = safe_divide(
            income.net_income,
            income.revenue,
        )

        roe = safe_divide(
            income.net_income,
            balance.total_stockholders_equity,
        )

        roa = safe_divide(
            income.net_income,
            balance.total_assets,
        )

        # Cash Flow
        free_cash_flow_margin = safe_divide(
            cash.free_cash_flow,
            income.revenue,
        )

        return FinancialRatiosResponse(
            symbol=symbol,

            liquidity=LiquidityRatios(
                current_ratio=safe_round(current_ratio),
            ),

            leverage=LeverageRatios(
                debt_to_equity=safe_round(debt_to_equity),
            ),

            profitability=ProfitabilityRatios(
                gross_margin=to_percentage(gross_margin),
                operating_margin=to_percentage(operating_margin),
                net_margin=to_percentage(net_margin),
                roe=to_percentage(roe),
                roa=to_percentage(roa),
            ),

            cash_flow=CashFlowRatios(
                free_cash_flow_margin=to_percentage(
                    free_cash_flow_margin,
                ),
            ),
        )


financial_ratios_service = FinancialRatiosService()
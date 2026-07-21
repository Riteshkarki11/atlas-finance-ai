class StrengthEngine:
    """
    Detects financial strengths of a company.
    """

    @staticmethod
    def detect(analysis) -> list[str]:

        strengths = []

        # Profitability
        if analysis.financial_ratios.profitability.roe >= 20:
            strengths.append("Excellent Return on Equity")

        if analysis.financial_ratios.profitability.net_margin >= 20:
            strengths.append("High Net Profit Margin")

        # Growth
        if analysis.growth_analysis.revenue_growth.latest >= 10:
            strengths.append("Strong Revenue Growth")

        if analysis.growth_analysis.eps_growth.latest >= 15:
            strengths.append("Strong EPS Growth")

        # Liquidity
        if analysis.financial_ratios.liquidity.current_ratio >= 1.5:
            strengths.append("Healthy Liquidity")

        # Debt
        if analysis.financial_ratios.leverage.debt_to_equity <= 1:
            strengths.append("Healthy Debt Level")

        # Valuation
        if analysis.dcf.margin_of_safety >= 10:
            strengths.append("Trading Below Intrinsic Value")

        return strengths
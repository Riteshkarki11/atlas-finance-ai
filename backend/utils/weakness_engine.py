class WeaknessEngine:
    """
    Detects financial weaknesses and risks.
    """

    @staticmethod
    def detect(analysis) -> list[str]:

        risks = []

        # Profitability
        if analysis.financial_ratios.profitability.roe < 10:
            risks.append("Low Return on Equity")

        if analysis.financial_ratios.profitability.net_margin < 10:
            risks.append("Low Profit Margin")

        # Growth
        if analysis.growth_analysis.revenue_growth.latest < 5:
            risks.append("Weak Revenue Growth")

        # Debt
        if analysis.financial_ratios.leverage.debt_to_equity > 2:
            risks.append("High Debt Level")

        # Liquidity
        if analysis.financial_ratios.liquidity.current_ratio < 1:
            risks.append("Weak Liquidity")

        # Valuation
        if analysis.dcf.margin_of_safety < 0:
            risks.append("Potentially Overvalued")

        # Beta
        if analysis.profile.beta and analysis.profile.beta > 1.5:
            risks.append("High Market Volatility")

        return risks
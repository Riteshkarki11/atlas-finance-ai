class ExplanationEngine:
    """
    Generates an AI-style investment summary.
    """

    @staticmethod
    def generate(
        analysis,
        recommendation: str,
        score: float,
        strengths: list[str],
        risks: list[str],
    ) -> str:

        company = analysis.profile.company_name

        roe = analysis.financial_ratios.profitability.roe
        margin = analysis.financial_ratios.profitability.net_margin
        revenue_growth = analysis.growth_analysis.revenue_growth.latest
        beta = analysis.profile.beta
        mos = analysis.dcf.margin_of_safety

        summary = (
            f"{company} received an overall investment score of "
            f"{score:.1f}/100 with a {recommendation} recommendation. "
            f"The company reports a Return on Equity of {roe:.2f}% "
            f"and a Net Profit Margin of {margin:.2f}%, indicating "
            f"strong profitability. Revenue grew by "
            f"{revenue_growth:.2f}% over the latest period."
        )

        if mos > 0:
            summary += (
                f" The DCF valuation suggests the stock is "
                f"undervalued by approximately {mos:.2f}%."
            )

        else:
            summary += (
                f" The DCF valuation suggests the stock is "
                f"overvalued by approximately {abs(mos):.2f}%."
            )

        if beta > 1.5:
            summary += (
                " Investors should note that the stock has a "
                "higher-than-average market risk."
            )

        if strengths:
            summary += (
                " Key strengths include "
                + ", ".join(strengths[:3]).lower()
                + "."
            )

        if risks:
            summary += (
                " Primary risks include "
                + ", ".join(risks[:2]).lower()
                + "."
            )

        return summary
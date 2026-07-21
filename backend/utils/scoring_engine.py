class ScoringEngine:
    """
    AI Scoring Engine
    Scores every company on a scale of 0–100.
    """

    @staticmethod
    def valuation_score(upside):

        if upside is None:
            return 50

        if upside >= 30:
            return 100
        elif upside >= 20:
            return 90
        elif upside >= 10:
            return 80
        elif upside >= 5:
            return 70
        elif upside >= 0:
            return 60
        elif upside >= -10:
            return 40
        else:
            return 20

    @staticmethod
    def growth_score(revenue_growth, eps_growth):

        revenue_growth = revenue_growth or 0
        eps_growth = eps_growth or 0

        avg = (revenue_growth + eps_growth) / 2

        if avg >= 25:
            return 100
        elif avg >= 15:
            return 90
        elif avg >= 10:
            return 80
        elif avg >= 5:
            return 70
        elif avg >= 0:
            return 60
        else:
            return 30

    @staticmethod
    def profitability_score(roe, net_margin):

        roe = roe or 0
        net_margin = net_margin or 0

        score = 0

        if roe >= 25:
            score += 50
        elif roe >= 15:
            score += 40
        elif roe >= 10:
            score += 30
        else:
            score += 15

        if net_margin >= 20:
            score += 50
        elif net_margin >= 10:
            score += 40
        elif net_margin >= 5:
            score += 30
        else:
            score += 15

        return score

    @staticmethod
    def liquidity_score(current_ratio):

        if current_ratio is None:
            return 50

        if current_ratio >= 2:
            return 100
        elif current_ratio >= 1.5:
            return 90
        elif current_ratio >= 1:
            return 70
        else:
            return 40

    @staticmethod
    def leverage_score(debt_to_equity):

        if debt_to_equity is None:
            return 50

        if debt_to_equity <= 0.3:
            return 100
        elif debt_to_equity <= 0.7:
            return 90
        elif debt_to_equity <= 1:
            return 70
        elif debt_to_equity <= 2:
            return 50
        else:
            return 20

    @staticmethod
    def risk_score(beta, volatility=None):

        beta = beta or 1
        volatility = volatility or 20

        score = 100
        score -= abs(beta - 1) * 20
        score -= volatility * 0.5

        return max(0, min(100, score))

    @staticmethod
    def overall_score(
        valuation,
        growth,
        profitability,
        liquidity,
        leverage,
        risk,
    ):

        return round(
            valuation * 0.25
            + growth * 0.20
            + profitability * 0.20
            + liquidity * 0.10
            + leverage * 0.10
            + risk * 0.15,
            2,
        )
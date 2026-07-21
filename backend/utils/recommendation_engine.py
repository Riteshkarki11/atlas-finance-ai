class RecommendationEngine:
    """
    Converts AI scores into investment recommendations.
    """

    @staticmethod
    def recommendation(score: float) -> str:

        if score >= 85:
            return "BUY"

        elif score >= 70:
            return "HOLD"

        return "SELL"

    @staticmethod
    def grade(score: float) -> str:

        if score >= 95:
            return "A+"

        elif score >= 90:
            return "A"

        elif score >= 80:
            return "B+"

        elif score >= 70:
            return "B"

        elif score >= 60:
            return "C"

        return "D"

    @staticmethod
    def confidence(score: float) -> int:
        """
        Estimate confidence based on score.
        """

        if score >= 90:
            return 95

        elif score >= 80:
            return 90

        elif score >= 70:
            return 85

        elif score >= 60:
            return 75

        return 65
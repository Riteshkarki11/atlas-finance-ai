from backend.schemas.investment_report import InvestmentReportResponse
from backend.services.base_service import BaseService
from backend.services.company_analysis_service import (
    company_analysis_service,
)
from backend.utils.scoring_engine import ScoringEngine
from backend.utils.recommendation_engine import RecommendationEngine
from backend.utils.strength_engine import StrengthEngine
from backend.utils.weakness_engine import WeaknessEngine
from backend.utils.explanation_engine import ExplanationEngine

class InvestmentReportService(BaseService):

    def get_report(self, symbol: str):

        analysis = company_analysis_service.get_company_analysis(symbol)

        # -----------------------------
        # Extract Metrics
        # -----------------------------

        roe = analysis.financial_ratios.profitability.roe
        net_margin = analysis.financial_ratios.profitability.net_margin

        current_ratio = analysis.financial_ratios.liquidity.current_ratio
        debt_to_equity = analysis.financial_ratios.leverage.debt_to_equity

        revenue_growth = analysis.growth_analysis.revenue_growth.latest
        eps_growth = analysis.growth_analysis.eps_growth.latest

        upside = analysis.dcf.margin_of_safety

        beta = analysis.profile.beta
        volatility = None

        # -----------------------------
        # AI Scores
        # -----------------------------

        valuation_score = ScoringEngine.valuation_score(
            upside
        )

        growth_score = ScoringEngine.growth_score(
            revenue_growth,
            eps_growth,
        )

        profitability_score = ScoringEngine.profitability_score(
            roe,
            net_margin,
        )

        liquidity_score = ScoringEngine.liquidity_score(
            current_ratio,
        )

        leverage_score = ScoringEngine.leverage_score(
            debt_to_equity,
        )

        risk_score = ScoringEngine.risk_score(
            beta,
            None,
        )

        overall_score = ScoringEngine.overall_score(
            valuation_score,
            growth_score,
            profitability_score,
            liquidity_score,
            leverage_score,
            risk_score,
        )

        # -----------------------------
        # Recommendation
        # -----------------------------

        recommendation = RecommendationEngine.recommendation(
            overall_score
        )

        # -----------------------------
        # Grade
        # -----------------------------

        grade = RecommendationEngine.grade(
            overall_score
        )
        # -----------------------------
        # Strengths
        # -----------------------------
        confidence = RecommendationEngine.confidence(
            overall_score
        )

        strengths = StrengthEngine.detect(analysis)

        risks = WeaknessEngine.detect(analysis)

        # -----------------------------
        # Summary
        # -----------------------------

        summary = ExplanationEngine.generate(
            analysis=analysis,
            recommendation=recommendation,
            score=overall_score,
            strengths=strengths,
            risks=risks,
        )

        # -----------------------------
        # Response
        # -----------------------------

        return InvestmentReportResponse(
            symbol=symbol.upper(),

            company_name=analysis.profile.company_name,
            exchange=analysis.profile.exchange,
            sector=analysis.profile.sector,
            industry=analysis.profile.industry,
            country=analysis.profile.country,
            currency=analysis.profile.currency,
            market_cap=analysis.profile.market_cap,
            logo=analysis.profile.logo,

            summary=summary,

            recommendation=recommendation,
            confidence=confidence,

            score=overall_score,
            grade=grade,

            valuation_score=valuation_score,
            growth_score=growth_score,
            profitability_score=profitability_score,
            liquidity_score=liquidity_score,
            leverage_score=leverage_score,
            risk_score=risk_score,
            margin_of_safety=analysis.dcf.margin_of_safety,
            intrinsic_value=analysis.dcf.intrinsic_value,

            strengths=strengths,
            risks=risks,
        )


investment_report_service = InvestmentReportService()
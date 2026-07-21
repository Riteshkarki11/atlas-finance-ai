import httpx

from backend.config.config import settings
from backend.providers.base_provider import BaseProvider
from backend.schemas.search import SearchResult
from backend.schemas.company import CompanyProfile
from backend.schemas.income_statement import IncomeStatement, IncomeStatementResponse
from backend.schemas.balance_sheet import BalanceSheet, BalanceSheetResponse
from backend.schemas.cash_flow import CashFlowStatement, CashFlowResponse
from backend.schemas.prices import PriceHistoryResponse

class FMPProvider(BaseProvider):
    """
    Financial Modeling Prep Provider
    """

    SEARCH_URL = "https://financialmodelingprep.com/stable/search-name"
    PROFILE_URL = "https://financialmodelingprep.com/stable/profile"
    HISTORICAL_URL = "https://financialmodelingprep.com/stable/historical-price-eod/full"
    INCOME_STATEMENT_URL = "https://financialmodelingprep.com/stable/income-statement"
    BALANCE_SHEET_URL = "https://financialmodelingprep.com/stable/balance-sheet-statement"
    CASH_FLOW_URL = "https://financialmodelingprep.com/stable/cash-flow-statement"
    STOCK_SCREENER_URL = "https://financialmodelingprep.com/stable/company-screener"
    RATIOS_URL = "https://financialmodelingprep.com/stable/ratios"
    def search(self, query: str) -> list[SearchResult]:
        params = {
            "query": query,
            "apikey": settings.FMP_API_KEY,
        }

        try:
            with httpx.Client(timeout=10.0) as client:
                response = client.get(
                    self.SEARCH_URL,
                    params=params,
                )

            response.raise_for_status()

            data = response.json()

            return [
                SearchResult(
                    symbol=item.get("symbol"),
                    company_name=item.get("name"),
                    exchange=item.get("exchange"),
                    sector=None,
                    industry=None,
                    country=None,
                )
                for item in data
            ]

        except httpx.HTTPStatusError as e:
            print(f"FMP HTTP Error ({e.response.status_code}): {e}")
            return []

        except httpx.RequestError as e:
            print(f"FMP Network Error: {e}")
            return []

    def company_profile(self, symbol: str) -> CompanyProfile:
        params = {
            "symbol": symbol,
            "apikey": settings.FMP_API_KEY,
        }

        try:
            with httpx.Client(timeout=10.0) as client:
                response = client.get(
                    self.PROFILE_URL,
                    params=params,
                )

            response.raise_for_status()

            data = response.json()

            if not data:
                raise ValueError("Company not found.")

            company = data[0]

            return CompanyProfile(
                symbol=company.get("symbol"),
                company_name=company.get("companyName"),
                exchange=company.get("exchange"),
                sector=company.get("sector"),
                industry=company.get("industry"),
                country=company.get("country"),
                currency=company.get("currency"),
                market_cap=company.get("marketCap"),
                employees=company.get("fullTimeEmployees"),
                ceo=company.get("ceo"),
                website=company.get("website"),
                description=company.get("description"),
                logo=company.get("image"),
                beta=company.get("beta"),
            )

        except httpx.HTTPStatusError as e:
            print(f"FMP HTTP Error ({e.response.status_code}): {e}")
            raise

        except httpx.RequestError as e:
            print(f"FMP Network Error: {e}")
            raise

    def historical_prices(self, symbol: str):
        params = {
            "symbol": symbol,
            "apikey": settings.FMP_API_KEY,
        }

        try:
            with httpx.Client(timeout=10.0) as client:
                response = client.get(
                    self.HISTORICAL_URL,
                    params=params,
                )

            response.raise_for_status()

            data = response.json()

            return data()

        except httpx.HTTPStatusError as e:
            print(f"FMP HTTP Error ({e.response.status_code}): {e}")
            raise

        except httpx.RequestError as e:
            print(f"FMP Network Error: {e}")
            raise

    def income_statement(self, symbol: str) -> IncomeStatementResponse:

        params = {
            "symbol": symbol,
            "apikey": settings.FMP_API_KEY,
        }

        try:
            with httpx.Client(timeout=10.0) as client:
                response = client.get(
                    self.INCOME_STATEMENT_URL,
                    params=params,
                )

            response.raise_for_status()

            data = response.json()

            return IncomeStatementResponse(
                symbol=symbol.strip().upper(),
                statements=[
                    IncomeStatement(
                        date=item.get("date"),
                        period=item.get("period"),
                        revenue=item.get("revenue"),
                        cost_of_revenue=item.get("costOfRevenue"),
                        gross_profit=item.get("grossProfit"),
                        operating_income=item.get("operatingIncome"),
                        net_income=item.get("netIncome"),
                        eps=item.get("eps"),
                    )
                    for item in data
                ],
            )

        except httpx.HTTPStatusError as e:
            print(f"HTTP Error ({e.response.status_code}): {e}")
            raise

        except httpx.RequestError as e:
            print(f"Network Error: {e}")
            raise

    def balance_sheet(self, symbol: str) -> BalanceSheetResponse:

        params = {
            "symbol": symbol,
            "apikey": settings.FMP_API_KEY,
        }

        with httpx.Client(timeout=10.0) as client:
            response = client.get(
                self.BALANCE_SHEET_URL,
                params=params,
            )

        response.raise_for_status()

        data = response.json()

        return BalanceSheetResponse(
            symbol=symbol.strip().upper(),
            statements=[
                BalanceSheet(
                    date=item.get("date"),
                    period=item.get("period"),
                    cash_and_cash_equivalents=item.get("cashAndCashEquivalents"),
                    total_current_assets=item.get("totalCurrentAssets"),
                    total_assets=item.get("totalAssets"),
                    total_current_liabilities=item.get("totalCurrentLiabilities"),
                    total_liabilities=item.get("totalLiabilities"),
                    total_stockholders_equity=item.get("totalStockholdersEquity"),
                    total_debt=item.get("totalDebt"),
                )
                for item in data
            ],
        )    

    def cash_flow(self, symbol: str) -> CashFlowResponse:

        params = {
            "symbol": symbol,
            "apikey": settings.FMP_API_KEY,
        }

        with httpx.Client(timeout=10.0) as client:
            response = client.get(
                self.CASH_FLOW_URL,
                params=params,
            )

        response.raise_for_status()

        data = response.json()

        return CashFlowResponse(
            symbol=symbol.strip().upper(),
            statements=[
                CashFlowStatement(
                    date=item.get("date"),
                    period=item.get("period"),
                    operating_cash_flow=item.get("operatingCashFlow"),
                    capital_expenditure=item.get("capitalExpenditure"),
                    free_cash_flow=item.get("freeCashFlow"),
                    net_cash_from_investing=item.get("netCashUsedForInvestingActivites"),
                    net_cash_from_financing=item.get("netCashUsedProvidedByFinancingActivities"),
                    net_change_in_cash=item.get("netChangeInCash"),
                )
                for item in data
            ],
        )

    def stock_screener(
        self,
        market_cap_more_than: float | None = None,
        market_cap_lower_than: float | None = None,
        sector: str | None = None,
        industry: str | None = None,
        limit: int = 100,
    ):
        params = {
            "apikey": settings.FMP_API_KEY,
            "limit": limit,
        }

        if market_cap_more_than:
            params["marketCapMoreThan"] = market_cap_more_than

        if market_cap_lower_than:
            params["marketCapLowerThan"] = market_cap_lower_than

        if sector:
            params["sector"] = sector

        if industry:
            params["industry"] = industry

        print("\n========== STOCK SCREENER ==========")
        print("URL:", self.STOCK_SCREENER_URL)
        print("Params:", params)

        try:
            with httpx.Client(timeout=20.0) as client:
                response = client.get(
                    self.STOCK_SCREENER_URL,
                    params=params,
                )

            print("Status Code:", response.status_code)
            print("Response:")
            print(response.text)
            print("====================================\n")

            response.raise_for_status()

            return response.json()

        except httpx.HTTPStatusError as e:
            print(f"HTTP Error ({e.response.status_code}): {e}")
            return []

        except httpx.RequestError as e:
            print(f"Network Error: {e}")
            return []

    def financial_ratios(self, symbol: str):

        params = {
            "symbol": symbol,
            "apikey": settings.FMP_API_KEY,
        }

        with httpx.Client(timeout=10.0) as client:
            response = client.get(
                self.RATIOS_URL,
                params=params,
            )

        response.raise_for_status()

        return response.json()
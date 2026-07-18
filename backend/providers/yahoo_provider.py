from backend.providers.base_provider import BaseProvider
from backend.schemas.search import SearchResult


class YahooProvider(BaseProvider):
    """
    Yahoo Finance implementation.
    """

    def search(self, query: str) -> list[SearchResult]:

        companies = [
            SearchResult(
                symbol="AAPL",
                company_name="Apple Inc.",
                exchange="NASDAQ",
            ),
            SearchResult(
                symbol="MSFT",
                company_name="Microsoft Corporation",
                exchange="NASDAQ",
            ),
        ]

        return companies
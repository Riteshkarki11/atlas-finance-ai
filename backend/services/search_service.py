from backend.providers.base_provider import BaseProvider
from backend.providers.fmp_provider import FMPProvider
from backend.schemas.search import SearchResponse


class SearchService:
    """
    Service responsible for searching publicly traded companies.

    This service communicates with the configured data provider
    (FMP, Alpha Vantage, Yahoo Finance, etc.) and returns
    standardized search results.
    """

    def __init__(self, provider: BaseProvider):
        self.provider = provider

    def search_company(self, query: str) -> SearchResponse:
        """
        Search companies by ticker symbol or company name.

        Args:
            query (str): Company name or ticker symbol.

        Returns:
            SearchResponse: Standardized search results.

        Raises:
            ValueError: If the search query is empty.
        """

        query = query.strip()

        if not query:
            raise ValueError("Search query cannot be empty.")

        results = self.provider.search(query)

        return SearchResponse(
            query=query,
            total_results=len(results),
            results=results,
        )


search_service = SearchService(FMPProvider())
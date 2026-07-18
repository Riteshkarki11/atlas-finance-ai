from backend.providers.base_provider import BaseProvider
from backend.providers.yahoo_provider import YahooProvider
from backend.schemas.search import SearchResponse


class SearchService:
    """
    Business logic for company search.
    """

    def __init__(self, provider: BaseProvider):
        self.provider = provider

    def search_company(self, query: str) -> SearchResponse:

        results = self.provider.search(query)

        return SearchResponse(
            query=query,
            total_results=len(results),
            results=results,
        )


search_service = SearchService(YahooProvider())
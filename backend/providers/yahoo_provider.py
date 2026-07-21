import httpx

from backend.providers.base_provider import BaseProvider
from backend.schemas.search import SearchResult


class YahooProvider(BaseProvider):
    SEARCH_URL = "https://query1.finance.yahoo.com/v1/finance/search"

    HEADERS = {
        "User-Agent": (
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/138.0.0.0 Safari/537.36"
        )
    }

    def search(self, query: str) -> list[SearchResult]:
        return []
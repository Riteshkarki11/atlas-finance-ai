from abc import ABC, abstractmethod
from backend.schemas.search import SearchResult


class BaseProvider(ABC):
    """
    Base interface for all market data providers.
    """

    @abstractmethod
    def search(self, query: str) -> list[SearchResult]:
        """
        Search companies by name or ticker.
        """
        pass
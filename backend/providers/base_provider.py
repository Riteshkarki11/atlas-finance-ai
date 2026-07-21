from abc import ABC, abstractmethod

from backend.schemas.search import SearchResult


class BaseProvider(ABC):

    @abstractmethod
    def search(self, query: str) -> list[SearchResult]:
        pass
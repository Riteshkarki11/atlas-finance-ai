from backend.providers.fmp_provider import FMPProvider


class BaseService:
    provider = FMPProvider()

    @staticmethod
    def normalize_symbol(symbol: str) -> str:
        return symbol.strip().upper()
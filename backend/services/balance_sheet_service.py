from backend.schemas.balance_sheet import BalanceSheetResponse
from backend.services.base_service import BaseService


class BalanceSheetService(BaseService):

    def get_balance_sheet(self, symbol: str):
        symbol = self.normalize_symbol(symbol)
        return self.provider.balance_sheet(symbol)


balance_sheet_service = BalanceSheetService()
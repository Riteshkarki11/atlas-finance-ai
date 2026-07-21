from backend.schemas.cash_flow import CashFlowResponse
from backend.services.base_service import BaseService


class CashFlowService(BaseService):

    def get_cash_flow(self, symbol: str):
        symbol = self.normalize_symbol(symbol)
        return self.provider.cash_flow(symbol)

cash_flow_service = CashFlowService()
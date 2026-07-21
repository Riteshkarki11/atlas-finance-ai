from backend.services.base_service import BaseService


class IncomeStatementService(BaseService):

    def get_income_statement(self, symbol: str):
        symbol = self.normalize_symbol(symbol)
        return self.provider.income_statement(symbol)


income_statement_service = IncomeStatementService()
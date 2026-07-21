from backend.services.base_service import BaseService


class CompanyService(BaseService):

    def get_company_profile(self, symbol: str):
        symbol = self.normalize_symbol(symbol)
        return self.provider.company_profile(symbol)


company_service = CompanyService()
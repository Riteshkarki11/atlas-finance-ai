from fastapi import APIRouter

from backend.schemas.company import CompanyProfile
from backend.services.company_service import company_service

router = APIRouter()


@router.get("/company/{symbol}", response_model=CompanyProfile)
def get_company(symbol: str):
    return company_service.get_company_profile(symbol)
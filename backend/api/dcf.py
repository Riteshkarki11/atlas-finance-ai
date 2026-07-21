from fastapi import APIRouter

from backend.schemas.dcf import DCFResponse
from backend.services.dcf_service import dcf_service

router = APIRouter()


@router.get(
    "/dcf/{symbol}",
    response_model=DCFResponse,
)
def get_dcf(symbol: str):
    return dcf_service.get_dcf(symbol)
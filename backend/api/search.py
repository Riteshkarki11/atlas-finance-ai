from fastapi import APIRouter

from backend.schemas.search import SearchResponse
from backend.services.search_service import search_service

router = APIRouter()


@router.get("/search", response_model=SearchResponse)
def search(query: str):
    return search_service.search_company(query)
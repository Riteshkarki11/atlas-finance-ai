from fastapi import APIRouter

from backend.schemas.compare import (
    CompareRequest,
    CompareResponse,
)

from backend.services.compare_service import (
    compare_service,
)

router = APIRouter(tags=["Compare"])


@router.post(
    "/compare",
    response_model=CompareResponse,
)
def compare(request: CompareRequest):

    return compare_service.compare(
        request.symbols
    )
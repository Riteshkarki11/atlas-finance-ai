from fastapi import FastAPI

from backend.config.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

@app.get("/")
def home():
    return {
        "message": "Welcome to Atlas Finance AI"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Routers
from backend.api.search import router as search_router
from backend.api.company import router as company_router
from backend.api.prices import router as prices_router
from backend.api.income_statement import router as income_statement_router
from backend.api.balance_sheet import router as balance_sheet_router
from backend.api.cash_flow import router as cash_flow_router
from backend.api.financial_ratios import router as financial_ratios_router
from backend.api.growth_analysis import router as growth_analysis_router
from backend.api.trend_analysis import router as trend_analysis_router
from backend.api.dcf import router as dcf_router
from backend.api.company_analysis import router as company_analysis_router
from backend.api.investment_report import router as investment_report_router
from backend.api.stock_screener import router as stock_screener_router
from backend.api.portfolio_analyzer import router as portfolio_router
from backend.api import risk_analysis
from backend.api import compare

app = FastAPI(
    title="Atlas Finance AI API",
    description="Financial Modeling, DCF Valuation, and Stock Analytics Engine",
    version="1.0.0",
)

# CORS Configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routers (Included directly or under /api/v1)
api_prefix = "/api/v1"

app.include_router(search_router, prefix=api_prefix)
app.include_router(company_router, prefix=api_prefix)
app.include_router(prices_router, prefix=api_prefix)
app.include_router(income_statement_router, prefix=api_prefix) 
app.include_router(balance_sheet_router, prefix=api_prefix)
app.include_router(cash_flow_router, prefix=api_prefix)
app.include_router(financial_ratios_router, prefix=api_prefix)
app.include_router(growth_analysis_router, prefix=api_prefix)
app.include_router(trend_analysis_router, prefix=api_prefix)
app.include_router(dcf_router, prefix=api_prefix)
app.include_router(company_analysis_router, prefix=api_prefix)
app.include_router(investment_report_router, prefix=api_prefix)
app.include_router(stock_screener_router, prefix=api_prefix)
app.include_router(portfolio_router, prefix=api_prefix)
app.include_router(
    risk_analysis.router,
    prefix=f"{api_prefix}/risk-analysis",
    tags=["Risk Analysis"],
)
app.include_router(compare.router, prefix=api_prefix)


@app.get("/")
def home():
    return {
        "message": "Welcome to Atlas Finance AI Engine",
        "docs": "http://localhost:8000/docs"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
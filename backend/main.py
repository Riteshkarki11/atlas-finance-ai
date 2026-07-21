from fastapi import FastAPI

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
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(search_router)
app.include_router(company_router)
app.include_router(prices_router)
app.include_router(income_statement_router) 
app.include_router(balance_sheet_router)
app.include_router(cash_flow_router)
app.include_router(financial_ratios_router)
app.include_router(growth_analysis_router)
app.include_router(trend_analysis_router)
app.include_router(dcf_router)
app.include_router(company_analysis_router)
app.include_router(investment_report_router)
app.include_router(stock_screener_router)
app.include_router(portfolio_router)
app.include_router(
    risk_analysis.router,
    prefix="/risk-analysis",
    tags=["Risk Analysis"],
)
app.include_router(compare.router)

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

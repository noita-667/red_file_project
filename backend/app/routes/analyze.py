from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.service.analyze_service import run_analysis, save_analysis
from app.service.table_service import list_tables
from app.database import get_db

router = APIRouter()


@router.get("/analyze")
def analyze(table: str, db: Session = Depends(get_db)):
    result = run_analysis(table)
    save_analysis(table, result, db)
    return {"table": table, **result}


@router.get("/analyze/all")
def analyze_all(db: Session = Depends(get_db)):
    results = {}
    for table in list_tables():
        result = run_analysis(table)
        save_analysis(table, result, db)
        results[table] = result
    return results

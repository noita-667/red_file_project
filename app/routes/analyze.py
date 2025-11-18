from fastapi import APIRouter
from app.services.analyze_service import (
    load_table, detect_missing, detect_duplicates,
    detect_type_anomalies, detect_outliers
)
from app.services.table_service import list_tables

router = APIRouter()

@router.get("/analyze")
def analyze(table: str):
    df = load_table(table)
    return {
        "table": table,
        "missing_values": detect_missing(df),
        "duplicates": detect_duplicates(df),
        "datatype_anomalies": detect_type_anomalies(df),
        "outliers": detect_outliers(df)
    }

#  Analyse toutes les tables !
@router.get("/analyze/all")
def analyze_all():
    results = {}
    tables = list_tables()  # récupère toutes les tables réelles dans MySQL

    for table in tables:
        df = load_table(table)
        results[table] = {
            "missing_values": detect_missing(df),
            "duplicates": detect_duplicates(df),
            "datatype_anomalies": detect_type_anomalies(df),
            "outliers": detect_outliers(df)
        }

    return results

from sqlalchemy import inspect
from app.database import get_engine

SYSTEM_TABLES = {"users", "cleaning_logs", "analysis_reports"}

def list_tables() -> list[str]:
    return [t for t in inspect(get_engine()).get_table_names() if t not in SYSTEM_TABLES]

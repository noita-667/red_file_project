from sqlalchemy import inspect
from app.database import get_engine

def list_tables():
    inspector = inspect(get_engine())
    return inspector.get_table_names()

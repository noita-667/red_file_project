from fastapi import APIRouter
from app.services.table_service import list_tables

router = APIRouter()

# retuourne liste des tables
@router.get("/tables")
def get_tables():
    return list_tables()

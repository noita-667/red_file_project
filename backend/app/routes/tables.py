from fastapi import APIRouter
from app.service.table_service import list_tables

router = APIRouter()

@router.get("/tables")
def get_tables():
    return list_tables()

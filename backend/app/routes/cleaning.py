from fastapi import APIRouter
from app.schemas.cleaning_rules import CleaningRules
from app.services.cleaning_service import clean_data

router = APIRouter()

@router.post("/clean")
def clean(rules: CleaningRules):
    return clean_data(rules.table, rules.dict())

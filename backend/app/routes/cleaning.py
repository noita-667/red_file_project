from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.shema.cleaning_rules import CleaningRules
from app.service.cleaning_service import clean_data
from app.database import get_db

router = APIRouter()


@router.post("/clean")
def clean(rules: CleaningRules, db: Session = Depends(get_db)):
    return clean_data(rules.table, rules.dict(), db)

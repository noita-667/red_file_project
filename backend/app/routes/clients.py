from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.service.client_service import get_all_clients, get_client_detail

router = APIRouter()

@router.get("/clients")
def list_clients(db: Session = Depends(get_db)):
    return get_all_clients(db)

@router.get("/clients/{client_id}")
def client_detail(client_id: int, db: Session = Depends(get_db)):
    result = get_client_detail(client_id, db)
    if not result:
        raise HTTPException(status_code=404, detail="Client introuvable")
    return result

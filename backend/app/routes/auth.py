from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.shema.login_shema import Login
from app.service.auth_service import verify_credentials
from app.database import get_db

router = APIRouter()

@router.post("/login")
def login(data: Login, db: Session = Depends(get_db)):
    if verify_credentials(data.email, data.password, db):
        return {"token": "fake-jwt-token"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

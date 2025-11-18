from fastapi import APIRouter, HTTPException
from app.schemas.login_schema import Login
from app.services.auth_service import verify_credentials

router = APIRouter()

# vérification login + création token
@router.post("/login")
def login(data: Login):
    if verify_credentials(data.email, data.password):
        return {"token": "fake-jwt-token"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

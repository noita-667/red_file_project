from fastapi import APIRouter, HTTPException
from app.schemas.login_schema import Login
from app.services.auth_service import verify_credentials

router = APIRouter()

@router.post("/login")
def login(data: Login):
    if verify_credentials(data.email, data.password):
        return {"token": "fake-token"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

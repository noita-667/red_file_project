import bcrypt
from sqlalchemy.orm import Session
from app.models.models import User


def verify_credentials(email: str, password: str, db: Session) -> bool:
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return False
    return bcrypt.checkpw(password.encode(), user.password_hash.encode())
